# C:\bridge\screenshot-sync.ps1
#
# LEAST-PRIVILEGE, READ-ONLY screenshot synchroniser for the bridge.
# Runs ONLY as the forced command of a dedicated scoped SSH key:
#   command="powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\bridge\screenshot-sync.ps1",restrict,from="192.168.1.3",no-pty,no-agent-forwarding,no-X11-forwarding,no-port-forwarding <pubkey>
#
# SECURITY MODEL:
#   * This script has NO write/delete path into the user's machine. It ONLY reads
#     files from a single whitelisted folder and emits them to stdout as Base64.
#   * The folder is fixed at C:\Users\ryoro\Pictures\Screenshots. Any attempt to read
#     outside it (relative "..", symlink, absolute elsewhere) is REJECTED.
#   * No Remove-Item / Move-Item / Set-Content on the source — the source is never
#     modified or deleted by this script.
#   * Filenames come from a trusted directory listing (Get-ChildItem), never from raw
#     string interpolation into a shell.
#   * Subfolders ARE walked (recursive list / get-all / list-sub), but every resolved
#     path is still confined to $ScreenDir by the safe-path guard below — a symlinked
#     subfolder that escapes Screenshots is skipped, never read.
#
# The Linux side decodes the Base64. (Base64 over SSH avoids any SFTP/scp grant and
# keeps the key's surface to "run this one script, get bytes back".)
#
# Nested files are emitted with their RELATIVE path from $ScreenDir (e.g.
# "TARGET\foo.png"); the Linux side converts "\" to "/" and writes a real nested
# folder, preserving the subfolder layers.

$ErrorActionPreference = 'Stop'

# --- whitelist: the ONLY folder this key may read ---
$ScreenDir = 'C:\Users\ryoro\Pictures\Screenshots'

function Write-Usage {
  @"
screenshot-sync — read-only Screenshots sync
  list            list ALL filenames under $ScreenDir (recursive; relative paths)
  list-sub <sub>  list filenames inside ONE subfolder (relative to $ScreenDir)
  get <name>      emit Base64 of one file (name may include a subfolder,
                  e.g. "TARGET\foo.png")
  get-all         emit Base64 of EVERY file (recursive; nested paths preserved)
  help            this message
"@
}

# The action is whatever the caller passed as the SSH "command" (OpenSSH puts the
# forced-command's trailing args into SSH_ORIGINAL_COMMAND; if the key is used as
# `ssh screenshot list`, that string arrives here).
$raw = $env:SSH_ORIGINAL_COMMAND
if ([string]::IsNullOrWhiteSpace($raw)) { $raw = $args -join ' ' }
$parts = ($raw.Trim() -split '\s+')
$action = if ($parts.Count -ge 1) { $parts[0].ToLower() } else { 'help' }
# Filenames contain spaces; join everything after the action back into one name.
$arg    = if ($parts.Count -ge 2) { ($parts[1..($parts.Count - 1)] -join ' ') } else { '' }

function Assert-SafeChild {
  param([string]$Name)
  # Resolve the candidate child path and ensure it lives INSIDE $ScreenDir.
  $candidate = Join-Path $ScreenDir $Name
  try { $resolved = Resolve-Path -LiteralPath $candidate -ErrorAction Stop }
  catch { Write-Error "REJECTED: file not found: $Name"; exit 2 }
  $rp = $resolved.Path
  if (-not ($rp -eq $ScreenDir -or $rp.StartsWith($ScreenDir + '\'))) {
    Write-Error "REJECTED: path escapes Screenshots folder: $Name"
    exit 3
  }
  # Guard against symlink/ junction escapes: real path must still be inside.
  $real = (Get-Item -LiteralPath $rp).FullName
  if (-not ($real -eq $ScreenDir -or $real.StartsWith($ScreenDir + '\'))) {
    Write-Error "REJECTED: symlink escape: $Name"
    exit 4
  }
  return $rp
}

# Resolve a full path to its RELATIVE form under $ScreenDir, rejecting (returning
# $null) any path that escapes the whitelist (e.g. via symlinked subfolder).
function Resolve-SafeRel {
  param([string]$FullPath)
  try { $real = (Get-Item -LiteralPath $FullPath -ErrorAction Stop).FullName }
  catch { return $null }
  if (-not ($real -eq $ScreenDir -or $real.StartsWith($ScreenDir + '\'))) { return $null }
  return $real.Substring($ScreenDir.Length + 1)  # strip "C:\...\Screenshots\"
}

function Emit-Base64 {
  param([string]$Path, [string]$Name)
  $bytes = [System.IO.File]::ReadAllBytes($Path)
  $b64 = [System.Convert]::ToBase64String($bytes)
  "::FILE:: $Name"
  $b64
}

switch ($action) {
  'list' {
    if (-not (Test-Path $ScreenDir)) { Write-Error "REJECTED: $ScreenDir missing"; exit 5 }
    Get-ChildItem -LiteralPath $ScreenDir -Recurse -File | ForEach-Object {
      $rel = Resolve-SafeRel $_.FullName
      if ($rel) { $rel }
    }
  }
  'list-sub' {
    if ([string]::IsNullOrWhiteSpace($arg)) { Write-Error "REJECTED: list-sub needs a subdir"; exit 1 }
    $p = Assert-SafeChild $arg
    if (-not (Test-Path -LiteralPath $p -PathType Container)) { Write-Error "REJECTED: not a folder: $arg"; exit 6 }
    Get-ChildItem -LiteralPath $p -File | ForEach-Object { $_.Name }
  }
  'get' {
    if ([string]::IsNullOrWhiteSpace($arg)) { Write-Error "REJECTED: get needs a filename"; exit 1 }
    $p = Assert-SafeChild $arg
    Emit-Base64 $p $arg
  }
  'get-all' {
    if (-not (Test-Path $ScreenDir)) { Write-Error "REJECTED: $ScreenDir missing"; exit 5 }
    Get-ChildItem -LiteralPath $ScreenDir -Recurse -File | ForEach-Object {
      $rel = Resolve-SafeRel $_.FullName
      if ($rel) { Emit-Base64 $_.FullName $rel }
    }
  }
  'help' { Write-Usage }
  default {
    Write-Error "REJECTED: unknown action '$action' (allowed: list | list-sub <sub> | get <name> | get-all | help)"
    exit 1
  }
}
