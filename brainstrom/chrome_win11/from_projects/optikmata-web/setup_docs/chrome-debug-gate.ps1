# C:\bridge\chrome-debug-gate.ps1
# Least-privilege gatekeeper for the bridge Chrome debug instance.
# Allowed actions: status | kill | launch:<ProfileName> | tunnel | scan [start] [end]
#
# IMPORTANT: this runs as the forced command of the scoped SSH key (command=...),
# i.e. inside the OpenSSH SERVICE session (session 0, no desktop). It must NOT try
# to Start-Process Chrome directly here -- Chrome launched in session 0 has no
# desktop and will not bind --remote-debugging-port. Instead, 'launch' writes the
# wanted profile (and, if needed, a free port) to a file and triggers the scheduled
# task 'BridgeChromeDebug', which is configured with InteractiveToken so it runs in
# the user's LOGGED-ON desktop session (where Chrome gets a window + binds a port).
#
# 'tunnel' delegates to bridge-tunnel.ps1, which opens the reverse forward
# Win11:port -> linux:port as a SCHEDULED TASK (BridgeChromeTunnel). Doing it via a
# scheduled task -- not a direct child ssh -R -- is required: a child ssh -R of this
# session is killed the moment the agent's 'ssh win11' returns, tearing the tunnel
# down. The scheduled task is owned by the Task Scheduler service and survives.
# This agent->Win11 connection uses 'restrict' (no forwarding), but the tunnel is a
# FRESH outbound ssh from Win11 to linux, so 'restrict' does not block it.
#
# PORT DISCOVERY: VS Code (stable + Insiders) auto-forwards the Chrome DevTools
# port and squats on the whole 922x range AND whatever fixed port we pick. To stay
# robust, the *live* debug port is read from C:\bridge\debug_port.txt (if present),
# falling back to $DebugPort. `launch` auto-scans for a free port when a non-Chrome
# process holds the configured one, and both the launcher and this script honor that file.

param(
  [Parameter(Position=0)] [string]$Action = ''
)

$ErrorActionPreference = 'Stop'

# Honor the action the Linux client actually sent. OpenSSH sets SSH_ORIGINAL_COMMAND
# whenever a forced `command=` is in play, even if the command string ignores it --
# so `ssh win11 launch:Profile 14` reaches us here. (Without this, every call fell
# back to `status` and `launch`/`kill` never ran.)
if ([string]::IsNullOrWhiteSpace($Action)) {
  if ($env:SSH_ORIGINAL_COMMAND) { $Action = $env:SSH_ORIGINAL_COMMAND.Trim() }
}
if ([string]::IsNullOrWhiteSpace($Action)) { $Action = 'status' }

# --- strict whitelist: only these paths are ever touched ---
$ChromeExe       = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$UserDataDir     = "$env:LOCALAPPDATA\ChromeDebugProfile"
$AllowedProfiles = @('Profile 14', 'Profile 2')   # extend as needed
$DebugPort       = 18322   # default; 922x + 18322 range are often taken by VS Code
$PortFile        = 'C:\bridge\debug_port.txt'
$TaskName        = 'BridgeChromeDebug'
$WantedFile      = 'C:\bridge\wanted_profile.txt'
$TunnelFile      = 'C:\bridge\bridge-tunnel.ps1'

function Assert-SafePath {
  param([string]$Path)
  $resolved = Resolve-Path -Path $Path -ErrorAction Stop
  $ok = ($resolved.Path -eq $ChromeExe) -or
        ($resolved.Path -eq $UserDataDir) -or
        ($resolved.Path.StartsWith($UserDataDir + '\')) -or
        ($resolved.Path.StartsWith($ChromeExe.Substring(0, $ChromeExe.LastIndexOf('\')) + '\'))
  if (-not $ok) {
    Write-Error "REJECTED: path outside Chrome debug scope: $Path"
    exit 2
  }
}

# Live debug port: file overrides default. Both launcher + gatekeeper use this.
function Get-DebugPort {
  if (Test-Path $PortFile) {
    $v = (Get-Content -Path $PortFile -Raw).Trim()
    if ($v -match '^\d+$') { return [int]$v }
  }
  return $DebugPort
}

# Returns the PID that LISTENs on a port, or $null.
function Get-PortOwner {
  param([int]$Port)
  $p = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
       Select-Object -First 1 -ExpandProperty OwningProcess
  if ($p) { return $p }
  return $null
}

Assert-SafePath $ChromeExe
Assert-SafePath $UserDataDir

switch ($Action) {
  'status' {
    $dp = Get-DebugPort
    $p = Get-PortOwner $dp
    if (-not $p) { "NOT-LISTENING port=$dp"; break }
    $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
    if ($proc.Path -ne $ChromeExe) {
      "OCCUPIED port=$dp pid=$p name=$($proc.Name) path=$($proc.Path) (not debug Chrome)"
    } else {
      "LISTENING port=$dp pid=$p name=$($proc.Name) path=$($proc.Path)"
    }
  }

  'kill' {
    $dp = Get-DebugPort
    $p = Get-PortOwner $dp
    if (-not $p) { "NOT-LISTENING (nothing to kill on port=$dp)"; break }
    $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
    if ($proc.Path -ne $ChromeExe) {
      Write-Error "REJECTED: port $dp owner is not the debug Chrome ($($proc.Path))"
      exit 3
    }
    Stop-Process -Id $p -Force
    "KILLED pid=$p port=$dp"
  }

  'tunnel' {
    # Open the reverse forward Win11:port -> linux:port. Delegates to
    # bridge-tunnel.ps1, which runs the tunnel as a scheduled task (survives this
    # session ending). The port comes from debug_port.txt (set on relocation).
    if (-not (Test-Path $TunnelFile)) {
      Write-Error "REJECTED: $TunnelFile not found. Deploy it to C:\bridge\ first."
      exit 9
    }
    & "$PSScriptRoot\bridge-tunnel.ps1"
  }

  { $_ -like 'launch:*' } {
    $profile = $Action.Split(':', 2)[1]
    if ($AllowedProfiles -notcontains $profile) {
      Write-Error "REJECTED: profile not in whitelist: $profile"
      exit 4
    }

    # 1. Resolve live port. If a NON-Chrome process (VS Code) squats on it, auto-scan
    #    a free alternative and persist it so the launcher also uses it.
    $dp = Get-DebugPort
    $occ = Get-PortOwner $dp
    if ($occ) {
      $op = Get-Process -Id $occ -ErrorAction SilentlyContinue
      if ($op.Path -ne $ChromeExe) {
        # scan a candidate band that avoids VS Code's 922x, the agent band 20120-20130,
        # and other known services (2888/3000/57518/68xx/77xx).
        $found = $null
        for ($cand = 18080; $cand -le 19980 -and -not $found; $cand += 100) {
          if (-not (Get-PortOwner $cand)) { $found = $cand }
        }
        if (-not $found) {
          Write-Error "REJECTED: port $dp occupied by non-Chrome ($($op.Path), pid=$occ) and no free port found in 18080-19980."
          exit 6
        }
        Set-Content -Path $PortFile -Value $found -Encoding ASCII
        "RELOCATED port $dp -> $found (was held by $($op.Name))"
        $dp = $found
      }
    }

    # 2. Kill the old debug instance on the (possibly relocated) port, then relaunch.
    & "$PSScriptRoot\chrome-debug-gate.ps1" kill | Out-Null
    Start-Sleep -Seconds 2
    Set-Content -Path $WantedFile -Value $profile -Encoding ASCII
    $run = schtasks /run /tn $TaskName 2>&1 | Out-String
    if ($run -match 'ERROR|denied') {
      Write-Error "REJECTED: cannot start task '$TaskName': $run"
      exit 5
    }

    # 3. Poll (live port) up to ~20s for Chrome to bind in the desktop session.
    $ok = $false
    for ($i = 0; $i -lt 10; $i++) {
      Start-Sleep -Seconds 2
      $st = & "$PSScriptRoot\chrome-debug-gate.ps1" status
      if ($st -like 'LISTENING*') { $ok = $true; $st; break }
    }
    if (-not $ok) {
      "LAUNCH-TIMEOUT: task '$TaskName' did not bind $dp. Check the task is ENABLED " +
      "and the user is LOGGED ON (InteractiveToken needs an interactive session)."
    }
  }

  { $_ -like 'scan*' } {
    # scan [start] [end] -- report free ports in band (default 18080..19980, step 100).
    $parts = $Action.Split(' ')
    $start = if ($parts.Count -ge 2 -and $parts[1] -match '^\d+$') { [int]$parts[1] } else { 18080 }
    $end   = if ($parts.Count -ge 3 -and $parts[2] -match '^\d+$') { [int]$parts[2] } else { 19980 }
    "SCAN free ports in ${start}..${end} (step 100):"
    $any = $false
    for ($cand = $start; $cand -le $end; $cand += 100) {
      if (-not (Get-PortOwner $cand)) { "  FREE  $cand"; $any = $true }
    }
    if (-not $any) { "  (none free in range)" }
    # Also report what currently holds the configured/default debug ports.
    foreach ($dp in @($DebugPort) + @(if (Test-Path $PortFile) { (Get-Content $PortFile -Raw).Trim() })) {
      $p = Get-PortOwner $dp
      if ($p) { $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
                "  OCCUPY $dp pid=$p $($proc.Name) ($($proc.Path))" }
      else  { "  FREE   $dp (current debug port)" }
    }
  }

  default {
    Write-Error "REJECTED: unknown action '$Action' (allowed: status | kill | launch:<Profile> | tunnel | scan [start] [end])"
    exit 1
  }
}
