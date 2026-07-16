# C:\bridge\bridge-tunnel.ps1
# Least-privilege reverse-tunnel launcher, invoked by the SECOND scoped Win11 key
# (the "tunnel key" in authorized_keys, forced command). It runs ON WIN11 and opens
# the reverse tunnel  Win11:port  ->  linux:port  so the Linux bridge can reach
# the Chrome debug port via localhost:port.
#
# SAFETY / scope:
#   - Only ever runs `ssh -N -R <port>:localhost:<port> linux` using WIN11's
#     existing key/config for the `linux` host (same as the user's manual command).
#   - `command=` + `restrict` on the tunnel key mean the Linux agent can ONLY trigger
#     THIS — no shell, no other forwarding. The inner ssh is a fresh outbound
#     connection governed by Win11's own linux key, so `restrict` (which only binds
#     the agent->Win11 connection) does not block it.
#   - `BatchMode=yes` + `ExitOnForwardFailure=yes` => fail fast (no hung agent) if
#     Win11 cannot reach linux unattended (e.g. passphrase prompt).
#   - The port comes from C:\bridge\debug_port.txt (written by the gatekeeper on
#     relocation); falls back to 18322. The Chrome debug listener is verified to
#     actually be listening on Win11 before the tunnel is opened.
#
# PERSISTENCE (why a scheduled task, not Start-Process):
#   A direct child `ssh -R` of this forced-command session gets KILLED the moment
#   the triggering SSH connection closes (sshd tears down the session's process
#   tree). We instead run the inner ssh from a SCHEDULED TASK owned by the Task
#   Scheduler service, so it is fully detached from the sshd session and stays up
#   after the agent's `ssh win11tunnel` returns. This is the SAME pattern as
#   register-task.ps1 / BridgeChromeDebug, which is proven to persist across logon
#   sessions. `Register-ScheduledTask -Force` makes it idempotent: re-running
#   rebuilds the task (picking up a relocated port) and restarts it.

$ErrorActionPreference = 'Stop'

$PortFile    = 'C:\bridge\debug_port.txt'
$DefaultPort = 18322
$TaskName    = 'BridgeChromeTunnel'
$LinuxHost   = 'linux'

$port = $DefaultPort
if (Test-Path $PortFile) {
  $v = (Get-Content -Path $PortFile -Raw).Trim()
  if ($v -match '^\d+$') { $port = [int]$v }
}

# Verify Chrome debug is actually listening on Win11 at this port (else tunnel is useless).
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
             Select-Object -First 1
if (-not $listener) {
  Write-Error "REJECTED: no listener on Win11 port $port (run launch:<Profile> first)"
  exit 7
}

# (Re)create + start the scheduled task that holds the reverse tunnel. -Force makes
# it idempotent (also picks up a relocated port). Interactive = runs in the logged-on
# desktop (same as BridgeChromeDebug). We deliberately use the SAME minimal task
# construction register-task.ps1 uses (Action + Principal + Register-ScheduledTask),
# because New-ScheduledTaskSettingsSet options like -DontStopIfGoingToSleep are not
# available on this Windows build.
# Pin the forward target to 127.0.0.1 (not 'localhost'): on Win11 'localhost'
# resolves to ::1 first, but Chrome debug binds IPv4 127.0.0.1 only. Forwarding to
# ::1 yields a connection that reaches Linux but gets an empty reply from Chrome.
$action = New-ScheduledTaskAction -Execute 'ssh.exe' -Argument (
  "-N -o ExitOnForwardFailure=yes -o BatchMode=yes -R ${port}:127.0.0.1:${port} $LinuxHost")
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive
Register-ScheduledTask -TaskName $TaskName -Action $action -Principal $principal -Force |
  Out-Null
Start-ScheduledTask -TaskName $TaskName

# Give the inner ssh a moment to authenticate + connect, then confirm the task is
# actually Running (if it can't reach linux unattended, ssh exits and the task falls
# back to Ready).
Start-Sleep -Seconds 3
$state = (Get-ScheduledTask -TaskName $TaskName).State
if ($state -ne 'Running') {
  Write-Error "REJECTED: BridgeChromeTunnel task state=$state (expected Running). Win11 cannot reach '$LinuxHost' unattended? Check key/config."
  exit 8
}

"TUNNEL-OPEN port=$port Win11->linux (task $TaskName holding ssh)"
