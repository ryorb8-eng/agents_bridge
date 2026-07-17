#!/usr/bin/env bash
# VISION GUARD — agents_bridge (Rule 5/23)
# Ingatkan (BLOCK) kalau ada yang mau embed base64 image ke prompt/context.
# Cara resmi: publish PNG ke GitHub raw URL (bridge-image-publish) lalu kirim URL,
# atau kirim file lokal lewat Ctrl+U (BRIDGE_IMAGE_PATH) — tanpa base64 di context.
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

if printf '%s' "$CMD" | grep -Eqi 'data:image/[a-zA-Z0-9.+-]+;base64,'; then
  emit_deny 'SOP #5/#23: JANGAN embed base64 image ke prompt/context (bengkak history + over-limit). Kirim gambar dengan cara resmi:
  (1) bridge-image-publish: git add -> commit -> push, lalu pakai RAW URL https://github.com/ryorb8-eng/agents_bridge/raw/refs/heads/main/<path>.png , ATAU
  (2) file lokal lewat Ctrl+U (set BRIDGE_IMAGE_PATH lalu transport *_new.ts menekan Ctrl+U -> filechooser -> setFiles).
  Prompt tetap TEXT-ONLY (docs/prompts/prompt_image-to-markdown.md). Simpan analisis ke description/<name>.md, provenance ke metadata/<name>.yaml.'
  exit 0
fi

echo "$INPUT"; exit 0
