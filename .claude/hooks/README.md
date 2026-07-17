# SOP Enforcement Hooks — agents_bridge

Hook di sini memaksa agent memakai **cara spesifik** yang SUDAH ditentukan di CWD
`.md`, bukan narasi umum. Semua hook adalah PreToolUse `matcher: Bash` yang
`deny` (blokir) command yang melanggar, atau `echo` input kembali (lewat) kalau aman.

| Hook | Aturan | Blokir | Cara resmi yang diwajibkan |
|------|--------|--------|-----------------------------|
| `sop-guard.sh` | #1/#2/#3/#4/#13/#18 | raw `ssh -R`/`-N`, `ssh win11` di luar whitelist, `scp`/`sftp`/`rsync`, kill di port 20120–20130 | `bridge_cdp_tunnel.sh "Profile 14"`, `fetch_screenshots.sh`, dll (lihat map) |
| `vision-guard.sh` | #5/#23 | embed `data:image/...;base64,` di command | publish ke GitHub raw URL, atau `BRIDGE_IMAGE_PATH` + Ctrl+U (tanpa base64 di context) |
| `transport-guard.sh` | #6/#31 | `BRIDGE_MODE=continue` + `*_new.ts`; gemini di Profile 14 | new/visi → `_new.ts`; continue → `_continue.ts`+`BRIDGE_CHAT_URL`; gemini WAJIB Profile 2 |
| `browser-cleanup-guard.sh` | #15/#28 | `killall`/`pkill chrome`, `playwright-cli close/detach` tanpa `-s=bridge`, `rm` profile playwright | `playwright-cli -s=bridge close` / `detach` (graceful, max 3x) |

**Tidak di-hook (di-enforce oleh mekanisme lain):**
- Rule #14 (trailer `CodeName: AVA`) — diterapkan otomatis oleh binary via `attribution.commit`;
  hook yang memblokir commit tanpa flag `--trailer` akan menggagalkan SEMUA commit, jadi sengaja
  tidak di-hook.
- Rule #12 (ADR-0004), #16 (CDE), #17 (Readiness), #27 (Architect authority), dst. — bersifat
  prosedural/judgmental; dijalankan lewat skill + SOP, bukan regex command (lihat `docs/SOP_ENFORCEMENT_MAP.md`).

## Test

Jalankan (command luar bersih, tidak memicu guard):
```
python3 .claude/hooks/test_hooks.py
```
Harus `OK=19 BAD=0` (termasuk `git-trailer-gate` sebelum diputus; setelah diputus baseline 18/18
untuk 4 hook aktif — sesuaikan `test_hooks.py` bila hook berubah). Test case opaque di `test_hooks.py`.

## Cara kerja

Input Claude Code hook = JSON `{"tool_name","tool_input":{"command"}}` di stdin.
Hook parse `tool_name` + `command`; kalau melanggar → cetak
`{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"..."}}`
dan `exit 0`. Kalau aman → `echo "$INPUT"` (lewat). Hook TIDAK PERNAH bohong-memblokir.
