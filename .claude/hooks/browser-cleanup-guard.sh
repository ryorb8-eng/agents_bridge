#!/usr/bin/env bash
# BROWSER CLEANUP GUARD — agents_bridge (Rule 15)
# Pastikan cleanup browser WAJIB graceful: detach/close lewat playwright-cli -s=bridge,
# jangan kill-all / pkill chrome / hapus temp profile milik user.
set -u
emit_deny() {
  REASON="$1" python3 -c 'import json,os;print(json.dumps({"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":os.environ["REASON"]}}))'
}
INPUT="$(cat)"
TOOL="$(printf '%s' "$INPUT" | python3 -c 'import sys,json
try: print(json.load(sys.stdin).get("tool_name",""))
except: print("")')"
CMD="$(printf '%s' "$INPUT" | python3 -c 'import sys,json
try: print(json.load(sys.stdin).get("tool_input",{}).get("command",""))
except: print("")')"

if [ "$TOOL" != "Bash" ]; then echo "$INPUT"; exit 0; fi

if printf '%s' "$CMD" | grep -Eq '(^| )(killall|pkill)[[:space:]].*chrome'; then
  emit_deny 'SOP #15: JANGAN kill-all / pkill chrome (ikut menewaskan tab user asli & profile). Cleanup WAJIB graceful:
  playwright-cli -s=bridge close     # tutup page/context, biarkan Chrome jalan
  playwright-cli -s=bridge detach    # lepas CDP, biarkan Chrome + tab user utuh
  Max 3x percobaan; kalau gagal setelah 3x, catat FAILED_CLOSE_ATTEMPT (PID, args, profile) di laporan.'
  exit 0
fi

if printf '%s' "$CMD" | grep -Eq 'playwright-cli[[:space:]].*(close|detach)'; then
  if ! printf '%s' "$CMD" | grep -Eq 'playwright-cli[[:space:]].*-s=bridge'; then
    emit_deny 'SOP #15/#28: playwright-cli close/detach WAJIB pakai session ter-named: "playwright-cli -s=bridge close" (atau detach). Tanpa -s=bridge berisiko menutup context/tab yang bukan punya bridge.'
    exit 0
  fi
fi

if printf '%s' "$CMD" | grep -Eq 'rm[[:space:]].*playwright_chromiumdev_profile'; then
  emit_deny 'SOP #15: JANGAN "rm" temp profile playwright (termasuk "rm -rf"). Tutup graceful dulu (playwright-cli -s=bridge close/detach, max 3x). Hapus profile hanya sebagai upaya terakhir & wajib dicatat di laporan sebagai FAILED_CLOSE_ATTEMPT.'
  exit 0
fi

echo "$INPUT"; exit 0
