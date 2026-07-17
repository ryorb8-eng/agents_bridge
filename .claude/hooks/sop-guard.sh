#!/usr/bin/env bash
# SOP GUARD — agents_bridge (Rule 1/2/3/4/13/18)
# Blokir Bash yang mengekSEKUSI cara terlarang (raw ssh -R/-N, ssh win11 di luar
# whitelist, scp/sftp/rsync, kill di band agent 20120-20130).
# PENTING: substring di dalam quote ('...' / "...") DIHAPUS sebelum match, supaya
# prosa (pesan commit, echo, dokumentasi) yang kebetulan mengandung kata terlarang
# TIDAK memicu hook. Eksekusi ssh asli tidak di-quote -> tetap keblokir.
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

# Strip quoted substrings (prosa pesan/echo/doc tidak memicu).
CMD_CLEAN="$(printf '%s' "$CMD" | python3 -c 'import sys,re
s=sys.stdin.read()
s=re.sub(r"'"'"'[^'"'"']*'"'"'"," ",s)
s=re.sub(r"\"[^\"]*\""," ",s)
print(s)')"

# Rule 1/3: RAW ssh -R -> blokir (pakai bridge_cdp_tunnel.sh).
if printf '%s' "$CMD_CLEAN" | grep -Eq '(^| )ssh[[:space:]].*-R([[:space:]]|$)'; then
  emit_deny 'SOP #1/#3: JANGAN buka tunnel dengan raw "ssh -R". Gunakan wrapper resmi:
  bash /home/s/TASK/agents_bridge/bridge_cdp_tunnel.sh "Profile 14"   (atau "Profile 2")
  Script itu yg memanggil "ssh win11 launch:<Profile>" lalu "ssh win11 tunnel" (scheduled task BridgeChromeTunnel).'
  exit 0
fi
# Rule 3: raw ssh -N (bukan via bridge_cdp_tunnel.sh).
if printf '%s' "$CMD_CLEAN" | grep -Eq '(^| )ssh[[:space:]][A-Za-z0-9_@.-]+[[:space:]].*-N([[:space:]]|$)'; then
  emit_deny 'SOP #3: JANGAN buka tunnel dengan "ssh -N". Tunel balik WAJIB via scheduled task BridgeChromeTunnel (lewat bridge_cdp_tunnel.sh). Raw ssh -N akan mati saat session agent kembali.'
  exit 0
fi
# Rule 2: ssh win11 harus subcommand whitelist.
if printf '%s' "$CMD_CLEAN" | grep -Eq '(^| )ssh[[:space:]]+win11([[:space:]]|$)'; then
  if ! printf '%s' "$CMD_CLEAN" | grep -Eq 'ssh[[:space:]]+win11[[:space:]]+(status|kill|launch:Profile 14|launch:Profile 2|tunnel|scan)([[:space:]]|$)'; then
    emit_deny 'SOP #2: "ssh win11" hanya boleh dengan subcommand whitelist: status | kill | launch:Profile 14 | launch:Profile 2 | tunnel | scan. Jangan jalankan shell bebas / profil lain di Win11.'
    exit 0
  fi
fi
# Rule 4: scp/sftp/rsync ambil gambar -> fetch_screenshots.sh (read-only ssh screenshot).
if printf '%s' "$CMD_CLEAN" | grep -Eq '(^| )(scp|sftp|rsync)[[:space:]]'; then
  emit_deny 'SOP #4: JANGAN scp/sftp/rsync ambil gambar dari Win11. Gunakan wrapper read-only:
  ./scripts/fetch_screenshots.sh list|get "<name>"|all
  (internal: ssh screenshot list|get <name>|get-all - kunci read-only, tidak tulis/hapus di Win11).'
  exit 0
fi
# Rule 13: jangan kill/fuser/reap listener di band agent 20120-20130.
if printf '%s' "$CMD_CLEAN" | grep -Eq '(kill|fuser[[:space:]].*-k|pkill|reap)[[:space:]].*(2012[0-9]|20130)'; then
  emit_deny 'SOP #13: Port 20120-20130 adalah band AGENT (bisa ada agent berjalan). JANGAN kill/fuser -k/pkill/reap di sana. Bila harus sentuh server, cek dulu ss -ltnp / lsof -i :PORT dan pastikan tidak ada agent aktif.'
  exit 0
fi

echo "$INPUT"; exit 0
