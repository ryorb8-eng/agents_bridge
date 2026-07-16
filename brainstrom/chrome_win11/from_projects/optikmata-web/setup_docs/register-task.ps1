# register-task.ps1  (run ONCE on Win11, as Admin / your user)
#
# Daftarkan scheduled task 'BridgeChromeDebug' yang berjalan di INTERACTIVE session
# (desktop kamu yang sedang login), sehingga Chrome debug bisa bind port 18322.
# Tanpa task ini, gatekeeper gagal melaunch Chrome (karena gatekeeper jalan di
# session 0 / service, no desktop).
#
# Cara pakai: jalankan file ini di PowerShell Win11 (klik kanan -> Run with PowerShell,
# atau:  powershell -ExecutionPolicy Bypass -File register-task.ps1 )

$TaskName  = 'BridgeChromeDebug'
$LaunchPs1 = 'C:\bridge\chrome-debug-launch.ps1'

# 1. Pastikan folder + launcher ada (launcher harus sudah ada sebelum task dibuat).
if (-not (Test-Path $LaunchPs1)) {
  Write-Error "REJECTED: $LaunchPs1 tidak ditemukan. Salin chrome-debug-launch.ps1 ke C:\bridge\ dulu."
  exit 1
}

# 2. Hapus task lama (jika ada) agar registrasi bersih / idempoten.
$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existing) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "Task lama '$TaskName' dihapus, akan didaftarkan ulang."
}

# 3. Daftarkan task (interactive session = desktop kamu).
$action    = New-ScheduledTaskAction -Execute 'powershell.exe' `
              -Argument "-NoProfile -ExecutionPolicy Bypass -File $LaunchPs1"
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERNAME" -LogonType Interactive
Register-ScheduledTask -TaskName $TaskName -Action $action -Principal $principal `
  -Description 'Start bridge Chrome debug (interactive session) on demand' | Out-Null

# 4. Verifikasi.
$t = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($t) {
  $t | Select-Object TaskName, State, @{n='RunAs';e={$t.Principal.UserId}}, @{n='Logon';e={$t.Principal.LogonType}}
  Write-Host "OK: task '$TaskName' terdaftar. State harus 'Ready'."
} else {
  Write-Error "GAGAL: task '$TaskName' tidak terdaftar."
  exit 2
}
