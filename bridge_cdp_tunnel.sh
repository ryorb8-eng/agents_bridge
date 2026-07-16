#!/usr/bin/env bash
#
# bridge_cdp_tunnel.sh  —  launch the Win11 Chrome-debug profile and surface the
# live CDP port + BRIDGE_CDP for the transports.
#
# WHAT THIS DOES (from Linux):
#   1. ssh win11 "launch:<Profile>"  -> the scoped gatekeeper on Win11 kills any old
#      Chrome owner, auto-relocates the port if VS Code (remote-ssh extension) squats
#      it, launches the debug Chrome, and reports the live port, e.g.
#      "LISTENING port=18180 pid=... name=chrome".
#   2. Parses that port.
#   3. ssh win11 "tunnel"  -> the gatekeeper opens the reverse tunnel Win11:port ->
#      linux:port. The tunnel runs in a WIN11 SCHEDULED TASK (BridgeChromeTunnel) so
#      it survives this SSH session closing (a direct child ssh -R gets killed when
#      the triggering session ends). The agent no longer needs MASTER to open the
#      tunnel by hand (so a restart/error won't leave it stuck).
#   4. Polls http://localhost:<port>/json/version until the tunnel is up.
#   5. Surfaces `export BRIDGE_CDP=http://localhost:<port>` + the transport command.
#
# DRIVEN VIA GATEKEEPER: all actions go through C:\bridge\chrome-debug-gate.ps1 on
# Win11 (a single scoped SSH key with a forced command=). The script tries the
# gatekeeper invocation `ssh win11 <action>` first; if that does not apply (e.g. a
# temporary plain shell key with no forced command), it falls back to invoking the
# .ps1 directly over `ssh win11`. Same result either way.
#
# USAGE:
#   ./bridge_cdp_tunnel.sh "Profile 14"        # launch + open tunnel + wait
#   ./bridge_cdp_tunnel.sh "Profile 2" 60      # Profile 2, wait up to 60s
#   source ./bridge_cdp_tunnel.sh "Profile 14"   # also export BRIDGE_CDP into THIS shell
#
# REQUIRES: ~/.ssh/config Host "win11" pointing at 192.168.1.8. Win11 side must have
#   C:\bridge\{chrome-debug-gate.ps1,bridge-tunnel.ps1} deployed. See the setup doc.

set -euo pipefail

PROFILE="${1:-Profile 14}"
WAIT="${2:-30}"                       # seconds to poll for the tunnel to come up
REMOTE="${WIN11_SSH_HOST:-win11}"     # ssh host alias from ~/.ssh/config

GATE="C:\\bridge\\chrome-debug-gate.ps1"

# Run a gatekeeper action. Uses the forced-command form when the key is scoped;
# falls back to invoking the script directly when the key is a plain shell.
run_gate() {
  local action="$1"
  local out rc
  # forced-command form: action is the SSH "command". Works once authorized_keys
  # pins command= to the gatekeeper.
  if out="$(ssh "$REMOTE" "$action" 2>&1)"; then rc=0; else rc=$?; fi
  if [[ "$rc" -eq 0 && ("$out" == *LISTENING* || "$out" == *TUNNEL-OPEN* || "$out" == *KILLED* || "$out" == *NOT-LISTENING* || "$out" == *RELOCATED* || "$out" == *LAUNCH-TIMEOUT*) ]]; then
    printf '%s\n' "$out"; return 0
  fi
  # fallback: invoke the script directly (temporary plain key)
  if out="$(ssh "$REMOTE" "powershell -NoProfile -ExecutionPolicy Bypass -File $GATE \"$action\"" 2>&1)"; then rc=0; else rc=$?; fi
  printf '%s\n' "$out"; return "$rc"
}

# --- 1) launch on Win11 via the gatekeeper ---
echo "[bridge] launching Chrome debug profile: $PROFILE"
OUT="$(run_gate "launch:$PROFILE")" && RC=0 || RC=$?
echo "$OUT"
if [[ "$RC" -ne 0 || "$OUT" != *LISTENING* ]]; then
  echo "[bridge] launch failed (see output above). Aborting." >&2
  exit 1
fi

# --- 2) extract the LISTENING port ---
PORT="$(printf '%s\n' "$OUT" | grep 'LISTENING' | grep -oE 'port=[0-9]+' | tail -1 | cut -d= -f2)"
if [[ -z "$PORT" ]]; then
  echo "[bridge] ERROR: launch did not report 'LISTENING port=...' (timeout/locked?)." >&2
  exit 2
fi
echo "[bridge] debug port on Win11: $PORT"

# --- 3) open the tunnel (Win11 scheduled task holds the reverse forward) ---
echo "[bridge] opening reverse tunnel (Win11 scheduled task BridgeChromeTunnel)"
TUNOUT="$(run_gate "tunnel")" && TRC=0 || TRC=$?
echo "$TUNOUT"
if [[ "$TRC" -ne 0 || ! "$TUNOUT" =~ TUNNEL-OPEN ]]; then
  echo "[bridge] tunnel failed (see above). Win11 cannot reach 'linux' unattended?" >&2
  exit 4
fi

# --- 4) wait for the tunnel to come up on the Linux side ---
echo "[bridge] waiting up to ${WAIT}s for http://localhost:$PORT/json/version ..."
READY=0
for ((i = 0; i < WAIT; i++)); do
  if curl -s -o /dev/null --max-time 2 "http://localhost:$PORT/json/version"; then
    READY=1
    break
  fi
  sleep 1
done
if [[ "$READY" -ne 1 ]]; then
  # Self-heal: a stale listener can exist with NO Chrome behind it (a previous
  # ssh -R whose Win11 side died but the Linux sshd never reaped it). If we see
  # a dead listener, reap it (needs root) and re-open the tunnel once.
  if ss -ltn 2>/dev/null | grep -q ":$PORT"; then
    echo "[bridge] listener on $PORT but no Chrome behind it (zombie forward). Reaping..."
    if PID=$(sudo -n ss -ltnp 2>/dev/null | grep ":$PORT" | grep -oE 'pid=[0-9]+' | head -1 | cut -d= -f2) && [[ -n "$PID" ]]; then
      echo s | sudo -S kill "$PID" 2>/dev/null || sudo kill "$PID" 2>/dev/null || \
        echo "[bridge] could not reap (need 'sudo kill $PID'); run it manually, then re-run this script."
      sleep 1
      TUNOUT="$(run_gate "tunnel")" || true
      echo "$TUNOUT"
      for ((i = 0; i < WAIT; i++)); do
        curl -s -o /dev/null --max-time 2 "http://localhost:$PORT/json/version" && { READY=1; break; }
        sleep 1
      done
    else
      echo "[bridge] (no sudo rights to reap; ask MASTER to run the reap command and retry.)"
    fi
  fi
fi
if [[ "$READY" -ne 1 ]]; then
  echo "[bridge] TIMEOUT: tunnel not up on localhost:$PORT. Retry, or check the tunnel task." >&2
  exit 3
fi
echo "[bridge] CDP reachable: $(curl -s --max-time 3 http://localhost:$PORT/json/version | head -c 140)"

# --- 5) surface the env for the transport ---
if [[ "${BASH_SOURCE[0]}" != "${0}" ]]; then
  # sourced: export into the caller's shell
  export BRIDGE_CDP="http://localhost:$PORT"
  echo "[bridge] BRIDGE_CDP exported in this shell."
else
  echo "[bridge] ready. Then:"
  echo "        export BRIDGE_CDP=http://localhost:$PORT"
  echo "        npx tsx <remote>/<transport>.ts"
fi
