#!/usr/bin/env bash
# fetch_screenshots.sh — pull screenshots from Win11 into the CWD over the
# least-privilege scoped SSH key (ssh screenshot ... -> screenshot-sync.ps1).
#
# The Win11 side is READ-ONLY and path-locked to C:\Users\ryoro\Pictures\Screenshots.
# This script never edits/deletes anything on Win11; it only decodes Base64 bytes
# sent back over the SSH session and writes them locally.
#
# Usage:
#   ./scripts/fetch_screenshots.sh list                      # list remote filenames
#   ./scripts/fetch_screenshots.sh get "Screenshot ....png"  # fetch ONE
#   ./scripts/fetch_screenshots.sh all                       # fetch ALL + metadata
#   ./scripts/fetch_screenshots.sh "Screenshot ....png"      # same as get
#
# Output dirs (created if missing):
#   docs/TEMP_IMAGES/screenshots/   <- the image files
#   docs/TEMP_IMAGES/metadata/      <- <name>.yaml beside each image
#
# Requires on Linux: ssh (with ~/.ssh/config Host "screenshot"), base64, file, stat.

set -euo pipefail

SSH_HOST="${SSH_SCREENSHOT_HOST:-screenshot}"
SHOTS_DIR="docs/TEMP_IMAGES/screenshots"
META_DIR="docs/TEMP_IMAGES/metadata"

mkdir -p "$SHOTS_DIR" "$META_DIR"

# Decode one "::FILE:: <name>\n<base64...>" block stream from stdin into a file,
# then write a sidecar <name>.yaml with size + timestamp + source.
decode_and_meta() {
  local name b64 tmp
  while IFS= read -r line; do
    if [[ "$line" == "::FILE:: "* ]]; then
      name="${line#::FILE:: }"
      b64=""
      # accumulate base64 lines until next sentinel or EOF
      while IFS= read -r -t 5 chunk; do
        if [[ "$chunk" == "::FILE:: "* ]]; then
          # next file starts: flush current, then handle new name
          flush_current "$name" "$b64"
          name="${chunk#::FILE:: }"
          b64=""
          continue
        fi
        b64+="$chunk"
      done
      flush_current "$name" "$b64"
      break
    fi
  done
}

flush_current() {
  local name="$1" b64="$2"
  [ -z "$name" ] && return
  local out="$SHOTS_DIR/$name"
  printf '%s' "$b64" | base64 -d > "$out"
  local bytes mime mtime
  bytes=$(stat -c%s "$out" 2>/dev/null || echo 0)
  mime=$(file -b --mime-type "$out" 2>/dev/null || echo "application/octet-stream")
  mtime=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  cat > "$META_DIR/${name%.*}.yaml" <<YAML
image: "$name"
source_host: "$SSH_HOST"
source_path: "C:\\Users\\ryoro\\Pictures\\Screenshots\\$name"
fetched_at: "$mtime"
bytes: $bytes
mime: "$mime"
local_path: "$SHOTS_DIR/$name"
YAML
  echo "  saved $out ($bytes bytes, $mime)"
}

case "${1:-all}" in
  list)
    ssh "$SSH_HOST" list
    ;;
  get|all|"")
    [ "${1:-all}" = "get" ] && shift
    if [ "${1:-all}" = "all" ]; then
      echo "Fetching ALL from Win11 (read-only)..."
      ssh "$SSH_HOST" get-all | decode_and_meta
    else
      local_name="${1:-}"
      echo "Fetching '$local_name' from Win11 (read-only)..."
      ssh "$SSH_HOST" get "$local_name" | decode_and_meta
    fi
    ;;
  *)
    echo "Usage: $0 [list|get <name>|all|<name>]" >&2
    exit 2
    ;;
esac
