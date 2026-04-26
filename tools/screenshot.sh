#!/usr/bin/env bash
# Capture screenshot.png (1500x1000) and tn.png (900x600) via Playwright.
# Usage:
#   tools/screenshot.sh                   # captures from http://localhost:1313/
#   tools/screenshot.sh https://your.url  # captures from a deployed URL
#
# Run after `cd exampleSite && hugo server` is up, or against the live site.
# Required for Hugo Themes gallery submission.

set -eu

URL="${1:-http://localhost:1313/}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/images"

mkdir -p "$OUT"

npx --yes playwright@1 install --with-deps chromium >/dev/null

npx --yes playwright@1 screenshot \
    --viewport-size=1500,1000 \
    --full-page=false \
    "$URL" "$OUT/screenshot.png"

npx --yes playwright@1 screenshot \
    --viewport-size=900,600 \
    --full-page=false \
    "$URL" "$OUT/tn.png"

echo "Wrote $OUT/screenshot.png and $OUT/tn.png"
