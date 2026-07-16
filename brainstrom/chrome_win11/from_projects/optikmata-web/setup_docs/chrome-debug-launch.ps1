# C:\bridge\chrome-debug-launch.ps1
# Runs INSIDE the user's LOGGED-ON desktop session (via scheduled task
# BridgeChromeDebug with InteractiveToken). Reads the wanted profile from
# C:\bridge\wanted_profile.txt and starts Chrome debug with that profile.
# The debug port is read from C:\bridge\debug_port.txt if present (so it agrees
# with the gatekeeper's auto-relocation when VS Code squats on the default),
# else falls back to $DebugPort below. Chrome here gets a real desktop and binds.

$ChromeExe   = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$UserDataDir = "$env:LOCALAPPDATA\ChromeDebugProfile"
$DebugPort   = 18322   # default fallback; 922x + this range often taken by VS Code
$PortFile    = 'C:\bridge\debug_port.txt'
$WantedFile  = 'C:\bridge\wanted_profile.txt'

# Honor a persisted port (set by the gatekeeper on relocation).
if (Test-Path $PortFile) {
  $v = (Get-Content -Path $PortFile -Raw).Trim()
  if ($v -match '^\d+$') { $DebugPort = [int]$v }
}

$profile = 'Profile 14'   # default
if (Test-Path $WantedFile) {
  $p = (Get-Content -Path $WantedFile -Raw).Trim()
  if ($p) { $profile = $p }
}

# Start detached so it survives the task's own process tree.
# IMPORTANT: pass the FULL argument string as a SINGLE array element. PowerShell's
# -ArgumentList splits a multi-element array on spaces, so "--profile-directory=Profile 14"
# became two args (--profile-directory=Profile + stray 14) -> Chrome opened a bogus
# "Profile" directory with no account. A single-element array is handed verbatim to
# CreateProcess, so the quoted value stays one token.
$args = "--remote-debugging-port=$DebugPort --user-data-dir=`"$UserDataDir`" --profile-directory=`"$profile`""
$proc = Start-Process -FilePath $ChromeExe -PassThru -WindowStyle Normal -ArgumentList $args
"LAUNCHED pid=$($proc.Id) profile=$profile port=$DebugPort"
