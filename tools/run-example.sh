#!/usr/bin/env bash
# run-example.sh — Serve onion/exampleSite locally with the local theme.
#
# Place this file in tools/ at the repo root, then run from anywhere:
#     chmod +x tools/run-example.sh
#     ./tools/run-example.sh                 # default: http://localhost:1313
#     tools/run-example.sh -D                # include drafts
#     ./run-example.sh --bind 0.0.0.0 -p 1414  # from inside tools/
#
# Any extra args are forwarded verbatim to `hugo server`.
#
# Hugo binary resolution: prefers <repo-root>/bin/hugo if present (useful for
# pinning a specific extended build alongside the repo), otherwise falls back
# to whatever `hugo` is on PATH.
#
# Why the symlink dance: Hugo's --themesDir expects a directory that *contains*
# a folder whose name matches the theme (`onion`). The conventional
# `hugo server --themesDir ../..` from inside exampleSite/ only works when the
# checkout directory is itself named "onion". Building a throwaway themesDir
# with a symlink named "onion" makes this script work no matter what the
# clone directory is called.

set -euo pipefail

# Script lives in <repo-root>/tools/, so repo root is one level up.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
THEME_NAME="onion"
EXAMPLE_DIR="${REPO_ROOT}/exampleSite"

# Prefer the repo-bundled binary at <repo-root>/bin/hugo when present, so a
# pinned extended build wins over whatever the system has on PATH.
if [[ -x "${REPO_ROOT}/bin/hugo" ]]; then
  HUGO_BIN="${REPO_ROOT}/bin/hugo"
elif command -v hugo >/dev/null; then
  HUGO_BIN="$(command -v hugo)"
else
  echo "✗ hugo not found — drop a binary at ${REPO_ROOT}/bin/hugo or install from https://gohugo.io/" >&2
  exit 1
fi

# Sanity checks — fail loudly with a useful message rather than letting Hugo
# emit a vague "theme not found".
[[ -f "${REPO_ROOT}/theme.toml" ]] || {
  echo "✗ theme.toml not found at ${REPO_ROOT} — is tools/ at the repo root?" >&2
  exit 1
}
[[ -d "${EXAMPLE_DIR}" ]] || {
  echo "✗ exampleSite/ not found at ${EXAMPLE_DIR}" >&2
  exit 1
}

# Build a temp themes dir containing a single symlink: <tmp>/onion -> repo root.
TMP_THEMES="$(mktemp -d)"
trap 'rm -rf "${TMP_THEMES}"' EXIT
ln -sfn "${REPO_ROOT}" "${TMP_THEMES}/${THEME_NAME}"

echo "→ hugo:       ${HUGO_BIN}"
echo "→             $("${HUGO_BIN}" version)"
echo "→ repo root:  ${REPO_ROOT}"
echo "→ themesDir:  ${TMP_THEMES} (contains ${THEME_NAME} → repo root)"
echo "→ source:     ${EXAMPLE_DIR}"
echo

cd "${EXAMPLE_DIR}"
exec "${HUGO_BIN}" server \
  --themesDir "${TMP_THEMES}" \
  --theme "${THEME_NAME}" \
  "$@"
