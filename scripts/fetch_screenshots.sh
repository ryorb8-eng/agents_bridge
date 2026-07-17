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
# Win11 emits:   ::FILE:: <name>\n<base64 lines>\n::FILE:: <next> ...
# (the name may contain spaces; the sentinel line is the delimiter).

set -euo pipefail

SSH_HOST="${SSH_SCREENSHOT_HOST:-screenshot}"
SHOTS_DIR="docs/TEMP_IMAGES/screenshots"
META_DIR="docs/TEMP_IMAGES/metadata"

mkdir -p "$SHOTS_DIR" "$META_DIR"

# Decode the whole SSH stream (stdin) which contains one or more
# "::FILE:: <name>\n<base64...>\n" blocks separated by the next sentinel.
decode_stream() {
  local name="" b64="" line
  # Win11 emits CRLF; strip CR so base64 -d doesn't choke on trailing \r.
  while IFS= read -r line; do
    line="${line%$'\r'}"
    if [[ "$line" == "::FILE:: "* ]]; then
      # flush previous block (if any)
      if [[ -n "$name" ]]; then
        write_one "$name" "$b64"
      fi
      name="${line#::FILE:: }"
      b64=""
    else
      # accumulate base64 for the current file (skip blank/non-base64 lines)
      [[ -z "$line" ]] && continue
      b64+="$line"
    fi
  done
  # flush last block
  if [[ -n "$name" ]]; then
    write_one "$name" "$b64"
  fi
}

write_one() {
  local name="$1" b64="$2"
  local out="$SHOTS_DIR/$name"
  # guard: if b64 empty, skip (avoid writing a 0-byte file)
  if [[ -z "$b64" ]]; then
    echo "  (skip empty block for '$name')"
    return
  fi
  printf '%s' "$b64" | base64 -d > "$out"
  local bytes mime mtime resolution
  bytes=$(stat -c%s "$out" 2>/dev/null || echo 0)
  mime=$(file -b --mime-type "$out" 2>/dev/null || echo "application/octet-stream")
  mtime=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  # Resolution: PNG stores WxH (big-endian, 4-byte each) in the IHDR chunk at
  # offset 16 (width) & 20 (height). od -tu4 is host-endian (little on x86) so it
  # misreads PNG's big-endian width -> read raw hex and combine big-endian via
  # arithmetic. Only valid for image/png.
  if [[ "$mime" == image/png ]]; then
    local hex w h
    hex=$(od -An -tx1 -N 8 -j 16 "$out" 2>/dev/null | tr -d ' \n')
    if [[ -n "$hex" && ${#hex} -eq 16 ]]; then
      w=$((16#${hex:0:8}))
      h=$((16#${hex:8:8}))
      resolution="${w}x${h}"
    fi
  fi
  cat > "$META_DIR/${name%.*}.yaml" <<YAML
image: "$name"
source_host: "$SSH_HOST"
source_path: "C:\\Users\\ryoro\\Pictures\\Screenshots\\$name"
fetched_at: "$mtime"
bytes: $bytes
mime: "$mime"
resolution: "${resolution:-unknown}"
local_path: "$SHOTS_DIR/$name"
YAML
  echo "  saved $out ($bytes bytes, $mime${resolution:+, ${resolution}})"
}

case "${1:-all}" in
  list)
    ssh "$SSH_HOST" list
    ;;
  get)
    shift
    name="${1:-}"
    [ -z "$name" ] && { echo "get needs a filename" >&2; exit 2; }
    echo "Fetching '$name' from Win11 (read-only)..."
    ssh "$SSH_HOST" get "$name" | tr -d '\r' | decode_stream
    ;;
  all)
    echo "Fetching ALL from Win11 (read-only)..."
    ssh "$SSH_HOST" get-all | tr -d '\r' | decode_stream
    ;;
  "")
    echo "Usage: $0 [list|get <name>|all]" >&2
    exit 2
    ;;
  *)
    # bare filename => get
    echo "Fetching '$1' from Win11 (read-only)..."
    ssh "$SSH_HOST" get "$1" | decode_stream
    ;;
esac
