# Bridge automation: run/switch Chrome DebugProfile from Linux (least-privilege)

**Goal.** Let the Linux Claude CLI session (`s@192.168.1.3`) start / restart / switch
the Win11 Chrome debug instance (`--remote-debugging-port=18322`) and switch its
profile (e.g. `Profile 14` → `Profile 2` when Claude's free limit is hit) — **without**
giving the Linux side any general shell access to the Win11 box. The Linux side can
only touch `C:\Program Files\Google\Chrome\` and the `ChromeDebugProfile` user-data-dir.
Everything else (System32, user files, other disks) is unreachable.

> This is **Opsi B** from the chat: OpenSSH Server on Win11 + a dedicated, scoped key.

---

## 0. Threat model / what this really scopes (read first)

OpenSSH on Windows has **no folder-path allowlist**. You cannot literally say "this key
may only touch `C:\Program Files\Google\Chrome\`". What SSH *can* enforce:

| `authorized_keys` option | Effect |
|---|---|
| `command="..."` | Every connection with this key runs **only** this forced command. Free-form args from the client are ignored. This is the anchor. |
| `restrict` | No PTY, no port-forwarding, no agent-forwarding, no X11. A subagent cannot open an interactive shell or dig a second tunnel. |
| `from="192.168.1.3"` | Only the Linux box's IP is accepted. |

The "folder scope" is achieved **indirectly**: the forced command is a *gatekeeper*
PowerShell script that hard-codes a small whitelist of Chrome-only actions and rejects
anything else. A stray subagent from another CWD can at worst call the gatekeeper — it
has no path to `System32` etc.

**Honest limits (do not over-trust):**
- This is *policy*, not an OS sandbox. A bug in the gatekeeper could be bypassed.
  Mitigation: the script only allows a fixed action list + a strict path whitelist +
  `Stop-Process` only on the PID that *precisely* owns port 18322.
- The gatekeeper runs **as your Win11 user**, so it can do anything you can *within the
  script's logic*. We narrow it via `command=` + whitelist, not via OS isolation.
- Credential isolation only: another CWD's agent that obtains this key can still
  switch the Chrome profile, but cannot read/write outside Chrome debug.

**Claude.ai limit caveat:** the free-tier limit is **per logged-in account**, not per
browser profile. Switching `Profile 14` → `Profile 2` only resets the limit if
`Profile 2` is logged into a *different* Claude account. Same account (or logged out) =
no reset.

---

## 1. Enable OpenSSH Server on Win11 (once)

cek **OpenSSH.Server** apakah sudah tersedia

Cara cek (elevated PowerShell di Win11)

# 1. Apakah capability OpenSSH Server sudah terpasang?
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'

#   State == "Installed"  -> sudah ada, LEWATI langkah install
#   State == "NotPresent" -> belum, jalankan Add-WindowsCapability

# 2. Apakah service sshd sudah ada & jalan?
Get-Service sshd -ErrorAction SilentlyContinue | Select-Object Name, Status, StartType

#   Name=sshd, Status=Running -> server SUDAH jalan, tinggal pastikan auto-start
#   (kosong / tidak ditemukan) -> service belum ada -> install dulu

Singkatnya:
- Kalau Get-WindowsCapability bilang Installed dan Get-Service sshd bilang Running → kamu tinggal lanjut ke langkah 2 (generate key) di file panduan, lewati Add-WindowsCapability.
- Kalau NotPresent → baru jalankan Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0.

---

jika **OpenSSH.Server**  tersedia, lewati tahap ini, jika belum, jalankan tahap ini.

Run in an **elevated** PowerShell (Run as Administrator) on Win11:

```powershell
# Install (if not present)
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# Start + auto-start
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'

# Allow port 22 through the firewall (already done by the capability on most builds)
New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' `
  -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

Confirm it listens:

```powershell
Get-NetTCPConnection -LocalPort 22 -State Listen
```

---

## 2. Generate a dedicated bridge key on Linux (once)

On Linux (`s@192.168.1.3`), **do NOT reuse** the key you use for `ssh linux`. Create a
separate one:

```bash
# on Linux
mkdir -p ~/.ssh && chmod 700 ~/.ssh
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_bridge_win11 -C "bridge-chrome-debug@linux"
# -> press Enter twice (no passphrase, or a passphrase you can feed non-interactively)
```

Copy the **public** key to give to Win11 (do NOT share the private key):

```bash
cat ~/.ssh/id_ed25519_bridge_win11.pub
```

---

## 3. Install the gatekeeper + launcher scripts, and the scheduled task (once)

The Linux key can only invoke `C:\bridge\chrome-debug-gate.ps1` (the gatekeeper).
The gatekeeper runs inside the **OpenSSH service session (session 0, no desktop)**.
Chrome launched there has no desktop and will **NOT** bind `--remote-debugging-port`.
So instead of `Start-Process` directly, the gatekeeper writes the wanted profile and
triggers a **scheduled task configured with `InteractiveToken`** — that task runs in
your **logged-on desktop session**, where Chrome gets a window and binds 18322.

> This is the fix for the earlier failure: `launch` returned `NOT-LISTENING` because
> Chrome was being launched headless-in-session-0.

### 3a. Gatekeeper — `C:\bridge\chrome-debug-gate.ps1`

The only thing the Linux key can invoke. Uses `schtasks /run` to delegate the actual
Chrome start to the interactive task (step 3c).

```powershell
# C:\bridge\chrome-debug-gate.ps1
param([Parameter(Position=0)] [string]$Action = '')
$ErrorActionPreference = 'Stop'

# Honor the action the client sent. OpenSSH sets SSH_ORIGINAL_COMMAND on any forced
# command=, so `ssh win11 launch:Profile 14` reaches us (without this, every call
# fell back to `status` and `launch` never ran).
if ([string]::IsNullOrWhiteSpace($Action)) {
  if ($env:SSH_ORIGINAL_COMMAND) { $Action = $env:SSH_ORIGINAL_COMMAND.Trim() }
}
if ([string]::IsNullOrWhiteSpace($Action)) { $Action = 'status' }

$ChromeExe       = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$UserDataDir     = "$env:LOCALAPPDATA\ChromeDebugProfile"
$AllowedProfiles = @('Profile 14', 'Profile 2')   # extend as needed
$DebugPort       = 18322
$PortFile        = 'C:\bridge\debug_port.txt'   # live port (set on relocation)
$TaskName        = 'BridgeChromeDebug'
$WantedFile      = 'C:\bridge\wanted_profile.txt'

function Assert-SafePath {
  param([string]$Path)
  $resolved = Resolve-Path -Path $Path -ErrorAction Stop
  $ok = ($resolved.Path -eq $ChromeExe) -or ($resolved.Path -eq $UserDataDir) -or
        ($resolved.Path.StartsWith($UserDataDir + '\')) -or
        ($resolved.Path.StartsWith($ChromeExe.Substring(0, $ChromeExe.LastIndexOf('\')) + '\'))
  if (-not $ok) { Write-Error "REJECTED: path outside Chrome debug scope: $Path"; exit 2 }
}
Assert-SafePath $ChromeExe; Assert-SafePath $UserDataDir

function Get-DebugPort {
  if (Test-Path $PortFile) {
    $v = (Get-Content -Path $PortFile -Raw).Trim()
    if ($v -match '^\d+$') { return [int]$v }
  }
  return $DebugPort
}
function Get-PortOwner { param([int]$Port)
  Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty OwningProcess }

switch ($Action) {
  'status' {
    $dp = Get-DebugPort
    $p = Get-PortOwner $dp
    if (-not $p) { "NOT-LISTENING port=$dp"; break }
    $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
    if ($proc.Path -ne $ChromeExe) {
      "OCCUPIED port=$dp pid=$p name=$($proc.Name) path=$($proc.Path) (not debug Chrome)" }
    else { "LISTENING port=$dp pid=$p name=$($proc.Name) path=$($proc.Path)" }
  }
  'kill' {
    $dp = Get-DebugPort
    $p = Get-PortOwner $dp
    if (-not $p) { "NOT-LISTENING (nothing to kill on port=$dp)"; break }
    $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
    if ($proc.Path -ne $ChromeExe) {
      Write-Error "REJECTED: port $dp owner is not the debug Chrome ($($proc.Path))"; exit 3 }
    Stop-Process -Id $p -Force; "KILLED pid=$p port=$dp"
  }
  { $_ -like 'launch:*' } {
    $profile = $Action.Split(':', 2)[1]
    if ($AllowedProfiles -notcontains $profile) {
      Write-Error "REJECTED: profile not in whitelist: $profile"; exit 4 }
    # If a NON-Chrome process (VS Code) squats the port, auto-relocate to a free
    # port and persist it so the launcher uses the same one. Never kill VS Code.
    $dp = Get-DebugPort
    $occ = Get-PortOwner $dp
    if ($occ) {
      $op = Get-Process -Id $occ -ErrorAction SilentlyContinue
      if ($op.Path -ne $ChromeExe) {
        $found = $null
        for ($cand = 18080; $cand -le 19980 -and -not $found; $cand += 100) {
          if (-not (Get-PortOwner $cand)) { $found = $cand } }
        if (-not $found) {
          Write-Error "REJECTED: port $dp occupied by non-Chrome ($($op.Path), pid=$occ), no free port in 18080-19980."; exit 6 }
        Set-Content -Path $PortFile -Value $found -Encoding ASCII
        "RELOCATED port $dp -> $found (was held by $($op.Name))"
        $dp = $found
      }
    }
    & "$PSScriptRoot\chrome-debug-gate.ps1" kill | Out-Null
    Start-Sleep -Seconds 2
    Set-Content -Path $WantedFile -Value $profile -Encoding ASCII
    $run = schtasks /run /tn $TaskName 2>&1 | Out-String
    if ($run -match 'ERROR|denied') { Write-Error "REJECTED: cannot start task: $run"; exit 5 }
    $ok = $false
    for ($i = 0; $i -lt 10; $i++) {
      Start-Sleep -Seconds 2
      $st = & "$PSScriptRoot\chrome-debug-gate.ps1" status
      if ($st -like 'LISTENING*') { $ok = $true; $st; break }
    }
    if (-not $ok) {
      "LAUNCH-TIMEOUT: task '$TaskName' did not bind $dp. Check the task is ENABLED " +
      "and the user is LOGGED ON (InteractiveToken needs an interactive session)." }
  }
  { $_ -like 'scan*' } {
    "SCAN free ports in 18080..19980 (step 100):"
    $any = $false
    for ($cand = 18080; $cand -le 19980; $cand += 100) {
      if (-not (Get-PortOwner $cand)) { "  FREE  $cand"; $any = $true } }
    if (-not $any) { "  (none free in range)" }
    $dp = Get-DebugPort
    $p = Get-PortOwner $dp
    if ($p) { $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
              "  OCCUPY $dp pid=$p $($proc.Name) ($($proc.Path))" }
    else  { "  FREE   $dp (current debug port)" }
  }
  default { Write-Error "REJECTED: unknown action '$Action' (allowed: status|kill|launch:<Profile>|scan)"; exit 1 }
}
```

### 3b. Launcher — `C:\bridge\chrome-debug-launch.ps1`

Runs inside the **interactive desktop session** (via the task). Reads the wanted
profile and starts Chrome with a real window.

```powershell
# C:\bridge\chrome-debug-launch.ps1
$ChromeExe   = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$UserDataDir = "$env:LOCALAPPDATA\ChromeDebugProfile"
$DebugPort   = 18322   # default fallback; honors C:\bridge\debug_port.txt if set
$PortFile    = 'C:\bridge\debug_port.txt'
$WantedFile  = 'C:\bridge\wanted_profile.txt'
if (Test-Path $PortFile) {
  $v = (Get-Content -Path $PortFile -Raw).Trim()
  if ($v -match '^\d+$') { $DebugPort = [int]$v }
}
$profile = 'Profile 14'
if (Test-Path $WantedFile) { $p = (Get-Content -Path $WantedFile -Raw).Trim(); if ($p) { $profile = $p } }
$proc = Start-Process -FilePath $ChromeExe -PassThru -WindowStyle Normal -ArgumentList @(
  "--remote-debugging-port=$DebugPort", "--user-data-dir=$UserDataDir", "--profile-directory=$profile")
"LAUNCHED pid=$($proc.Id) profile=$profile"
```

### 3c. Register the scheduled task (interactive session)

The task runs the launcher in your **logged-on desktop session** (not session 0), so
Chrome gets a window and binds 18322.

**Easiest (recommended):** copy `setup_docs/setup-all.ps1` to Win11 and run it — it
writes both scripts into `C:\bridge\` (embedded, no terminal copy-paste) **and**
registers the task in one go:

```powershell
# on Win11:
powershell -ExecutionPolicy Bypass -File setup-all.ps1
```

**Manual (equivalent):** create `C:\bridge\chrome-debug-launch.ps1` (step 3b), then
register the task as the current user with `InteractiveToken`:

```powershell
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument `
  '-NoProfile -ExecutionPolicy Bypass -File C:\bridge\chrome-debug-launch.ps1'
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERNAME" -LogonType Interactive
Register-ScheduledTask -TaskName 'BridgeChromeDebug' -Action $action -Principal $principal `
  -Description 'Start bridge Chrome debug (interactive session) on demand' | Out-Null
# verify
Get-ScheduledTask -TaskName 'BridgeChromeDebug' | Select-Object TaskName, State
```

> `LogonType Interactive` = the task runs only when you are **logged on**. If you log
> off / lock with no session, the launch will time out (gatekeeper reports
> `LAUNCH-TIMEOUT`). For headless servers use `S4U` instead — but then Chrome has no
> desktop and won't bind 18322, so a logged-on session is required here.
>
> Security: the task runs as **your** user, but only ever launches Chrome from
> `C:\bridge\chrome-debug-launch.ps1` (a fixed file). The Linux key cannot change
> what the task does. Keep `C:\bridge\` writable only by you.

> Note: `Start-Process` launches Chrome detached — it keeps running after the SSH
> session ends, so the agent does not need to hold the connection open.

---

## 4. Register the scoped key in Win11 `authorized_keys`

On Win11, find your OpenSSH `authorized_keys`. Default location for the **user** who
will run Chrome (your login user `ryoro`):

```
C:\Users\ryoro\.ssh\authorized_keys
```

If it does not exist, create it (ACL must deny group/other — the OpenSSH installer
sets this when you first use it; if you create manually, run the `Repair-AuthorizedKeyPermission`
helper or `icacls authorized_keys /inheritance:r /grant ryoro:R`).

Add **one line** for the bridge key, prefixed with the forced command + restrictions.
Paste the public key from step 2 after `ssh-ed25519 AAAA...`:

```
command="powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\bridge\chrome-debug-gate.ps1",restrict,from="192.168.1.3" ssh-ed25519 AAAA...bridge-chrome-debug@linux
```

What each flag does:
- `command="..."` — the key can **only** run the gatekeeper. Any `ssh win11 "whatever"`
  is silently replaced by this command (with no client args passed through).
- `restrict` — no PTY / no forwarding / no agent. A subagent cannot get an interactive
  shell or open another tunnel.
- `from="192.168.1.3"` — only the Linux box's IP is accepted (spoofing source IP for
  TCP is hard, so this is a solid guard).

> NOTE: do **NOT** add `$SSH_ORIGINAL_COMMAND` to the `command=` here. Windows
> OpenSSH runs `command=` via `cmd.exe`, which does not expand `$VAR`, so it would
> be passed literally and rejected. The gatekeeper reads the action from the
> `SSH_ORIGINAL_COMMAND` **env var** that OpenSSH sets on its own.

### 4b. SECOND key — the reverse-tunnel key (so the agent opens `-R` itself)

The bridge key above is `restrict`ed, so it **cannot** open the `-R` tunnel. To let
the agent recover from a restart/error without you opening the tunnel by hand, generate a
**second** ed25519 keypair on Linux (`id_ed25519_bridge_tunnel`) and add a **second
line** to the SAME `authorized_keys`, pointing at the tunnel launcher:

```
command="powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\bridge\bridge-tunnel.ps1",restrict,from="192.168.1.3" ssh-ed25519 BBBB...bridge-tunnel@linux
```

This key's only power: from Win11, run `C:\bridge\bridge-tunnel.ps1`, which opens
`ssh -fN -R <port>:localhost:<port> linux` (the exact same command you ran
manually) using **Win11's own existing `linux` key** — so `restrict` (which only
binds the agent→Win11 link) does not block it. It fails fast (`BatchMode=yes`,
`ExitOnForwardFailure=yes`) if Win11 cannot reach `linux` unattended, so the agent
is never left "stuck" waiting on a manual step. The port is read from
`C:\bridge\debug_port.txt` (written by the gatekeeper on relocation).

> WIN11 must reach `linux` unattended for this to work — i.e. Win11 has a
> passphrase-less key or an ssh-agent for the `linux` host (no interactive prompt).
> If Win11 still needs a passphrase for `linux`, the tunnel key will fast-fail; in
> that case keep opening the tunnel by hand (step 6) until that's set up.

---

## 5. Add `Host win11` to Linux `~/.ssh/config`

On Linux:

```bash
# ~/.ssh/config  (chmod 600)
Host win11
    HostName 192.168.1.8
    User ryoro
    Port 22
    IdentityFile ~/.ssh/id_ed25519_bridge_win11
    IdentitiesOnly yes
    RequestTTY no

# Second key: opens the reverse tunnel on Win11 (runs the tunnel launcher).
Host win11tunnel
    HostName 192.168.1.8
    User ryoro
    Port 22
    IdentityFile ~/.ssh/id_ed25519_bridge_tunnel
    IdentitiesOnly yes
    RequestTTY no
```

(`IdentitiesOnly yes` stops SSH from also offering your default `linux` key. The
`bridge_cdp_tunnel.sh` agent script uses `win11` for `launch` and `win11tunnel`
for the reverse tunnel.)

---

## 6. Test from Linux

```bash
# status (should say NOT-LISTENING if Chrome debug not running yet)
ssh win11
# ^ because of command=, this already runs the gatekeeper 'status'.

# launch Profile 14 (gatekeeper honors the client action now; if a non-Chrome
# process squats 18322 it RELOCATES to a free port and writes it to debug_port.txt):
ssh win11 launch:Profile 14
# -> LISTENING port=... pid=... name=chrome path=C:\Program Files\Google\Chrome\...
#    (a Chrome WINDOW appears on your Win11 desktop under Profile 14)
#    or: RELOCATED port 18322 -> 18xxx ... then LISTENING on the new port
#    or: LAUNCH-TIMEOUT (you are not logged on / task disabled)

# from another Linux shell, re-establish the reverse CDP tunnel (as you do today).
# IF launch reported RELOCATED port 18322 -> 18xxx, use that new port here instead:
ssh -R 18322:localhost:18322 linux
# now the bridge can attach to localhost:18322
curl -s http://localhost:18322/json/version
```

Switching profile when Claude's limit is hit (fully unattended — agent does this):

```bash
# on Linux, as the bridge agent:
ssh win11 launch:Profile 2     # honors action now; relaunches with Profile 2 (interactive)
ssh -R 18322:localhost:18322 linux   # re-establish tunnel (this is the existing user step)
# bridge now drives chat.z.ai / claude.ai under Profile 2
```

> The `-R 18322` tunnel is still **your** manual step (it forwards Win11:port →
> Linux:port). Only the Chrome launch/kill is now automated. If launch RELOCATED the
> port (VS Code squatting), forward the *new* port in both the `-R` and the
> `BRIDGE_CDP=http://localhost:<newport>` the transports use. If you also want the
> tunnel automated, run it from a Linux `systemd --user` service or a tmux session
> that auto-reconnects; that is out of scope here.
>
> **Headless caveat:** `InteractiveToken` needs you **logged on** to Win11. If you
> lock the screen, the session may keep running (interactive session persists while
> locked for the same user); if you **log off / switch user / reboot**, the launch
> times out until you log back on. Keep a session open.

---

## 7. Lock-down verification (do this once)

From Linux, try to break out — all must be **rejected / ignored**:

```bash
ssh win11 status                 # OK -> gatekeeper status
ssh win11 "whoami"               # should run the forced command, NOT whoami
ssh win11 launch:BogusProfile    # REJECTED (not in whitelist)
ssh win11 kill                   # OK only if 18322 owner == debug Chrome
```

Confirm the key **cannot** reach a normal shell: `ssh win11` must never drop you into
a PowerShell prompt — it only returns gatekeeper output (because `command=` overrides
the session and `restrict` removes the PTY).

---

## 8. How the bridge code should call this

The transports (`gpt/`, `claude/`, `z/`) already take `BRIDGE_CDP` — point them at
`http://localhost:18322` after the tunnel is up. To switch profile, the orchestrator
(agent / slash command) runs the two `ssh` calls above. Example helper the bridge can
use (on Linux):

```bash
# bridge_switch_claude_profile.sh  (run on Linux, as the agent)
profile="$1"   # e.g. "Profile 2"
ssh win11 "launch:$profile"
# tunnel is assumed already alive (ssh -R 18322:localhost:18322 linux)
```

No change to the TypeScript transports is required — they only care about
`localhost:18322` being reachable.

---

## Caveats recap

- **Not an OS sandbox.** Scope comes from the gatekeeper's whitelist + `command=`.
  Keep `AllowedProfiles` and `ChromeExe`/`UserDataDir` exact; review the script if you
  change Chrome's install path.
- **Single instance at 18322.** Because `ChromeDebugProfile` is locked by one Chrome
  instance, only one debug profile runs at a time. Sequential switch (kill → relaunch)
  is the supported pattern. For two warm profiles in parallel, you need a *second*
  user-data-dir + a *second* port + a *second* tunnel (see chat Opsi C).
- **VS Code squats the debug port.** Both VS Code (stable) and *VS Code Insiders*
  auto-forward the Chrome DevTools port and grab whatever fixed port you pick (the
  whole `922x` range **and** `18322` were seen occupied by `Code`/`Code - Insiders`).
  Two mitigations are built in: (1) `status`/`kill` **refuse** to touch a non-Chrome
  owner — so VS Code is never killed; (2) `launch` **auto-relocates** to a free port
  in `18080..19980` (persisted to `C:\bridge\debug_port.txt`, which both the launcher
  and gatekeeper honor) and reports `RELOCATED port X -> Y`. If you see relocation,
  update your Linux `ssh -R <Y>:localhost:<Y> linux` tunnel to the new port. You can
  also pre-empt it: `ssh win11 scan` lists free ports, then set `$DebugPort`/`debug_port.txt`
  by hand. (To stop VS Code from grabbing the port entirely, disable its "Forward a port"
  / DevTools-for-VS-Code extension — optional.)
- **Claude limit resets only across accounts**, not profiles. Ensure `Profile 2` logs
  into a different Claude account.
- **Win11 user risk:** the gatekeeper runs as your Win11 user. Anyone who steals the
  private key (`id_ed25519_bridge_win11`) from Linux can switch your debug Chrome
  profile and kill/relaunch it — but nothing else on the box. Store the key with
  `chmod 600` and consider a passphrase if Linux is multi-user.

---

PS C:\WINDOWS\system32>
>> Get-Content "C:\ProgramData\ssh\sshd_config" | Select-String -Pattern "Pubkey|AuthorizedKeys|PasswordAuth|PermitRoot"

#PermitRootLogin prohibit-password
#PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys
#PasswordAuthentication yes
       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys