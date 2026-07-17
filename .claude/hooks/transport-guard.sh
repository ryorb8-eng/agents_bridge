#!/usr/bin/env bash
# TRANSPORT GUARD — agents_bridge (Rule 6/31)
# Ingatkan (BLOCK) eksekusi transport salah:
#  - BRIDGE_MODE=continue dipakai bersama *_new.ts (rancu: continue = re-open url sesi).
#  - gemini dijalankan di profil selain Profile 2 (gemini HARUS Profile 2).
# Substring di dalam quote ('...' / "...") DIHAPUS sebelum match -> prosa tidak memicu.
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

CMD_CLEAN="$(printf '%s' "$CMD" | python3 -c 'import sys,re
s=sys.stdin.read()
s=re.sub(r"'"'"'[^'"'"']*'"'"'"," ",s)
s=re.sub(r"\"[^\"]*\""," ",s)
print(s)')"

if printf '%s' "$CMD_CLEAN" | grep -q 'BRIDGE_MODE=continue' && printf '%s' "$CMD_CLEAN" | grep -Eq 'bridge-cdp-[a-z]+_new\.ts'; then
  emit_deny 'SOP #31: BRIDGE_MODE=continue dipakai bersama *_new.ts itu rancu. Untuk lanjut session yg SAMA, jalankan *_continue.ts dan set BRIDGE_CHAT_URL=<url sesi>. Untuk chat BARU/visi, pakai _new.ts (mode default, tanpa BRIDGE_MODE=continue).'
  exit 0
fi

if printf '%s' "$CMD_CLEAN" | grep -Eq 'bridge-cdp-gemini' && printf '%s' "$CMD_CLEAN" | grep -q 'Profile 14'; then
  emit_deny 'SOP #6: Gemini HARUS di Profile 2 (bukan Profile 14). Jalankan dengan CDP mengarah ke profil Gemini (Profile 2): BRIDGE_CDP=...:18322 BRIDGE_MODE=send BRIDGE_PROMPT="..." npx tsx gemini/bridge-cdp-gemini_new.ts. Jangan override ke Profile 14.'
  exit 0
fi

echo "$INPUT"; exit 0
