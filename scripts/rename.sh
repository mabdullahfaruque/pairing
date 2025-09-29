#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR}/.."

# rename this project to the passed in name
# this is a react typescript project so we want to change the name in the
# package json and the html title and anywhere else it appears
NEW_NAME=$1
if [ -z "$NEW_NAME" ]; then
  echo "Usage: $0 <new-name>"
  exit 1
fi

# Update package.json root name
jq --arg NEW_NAME "$NEW_NAME" '.name = $NEW_NAME' "${ROOT_DIR}/package.json" > "${ROOT_DIR}/tmp.json" && mv "${ROOT_DIR}/tmp.json" "${ROOT_DIR}/package.json"

# Update package-lock.json root name AND the nested packages[""] entry (lockfile v3 structure)
if [ -f "${ROOT_DIR}/package-lock.json" ]; then
  jq --arg NEW_NAME "$NEW_NAME" '(.name? // .name) |= $NEW_NAME | (.packages[""]?.name? // .packages[""]?.name) |= $NEW_NAME' "${ROOT_DIR}/package-lock.json" > "${ROOT_DIR}/tmp.json" \
    && mv "${ROOT_DIR}/tmp.json" "${ROOT_DIR}/package-lock.json"
fi

# Update HTML title
sed -i '' -e "s|<title>.*</title>|<title>$NEW_NAME</title>|" "${ROOT_DIR}/index.html"

# Update Playwright basic test PAGE_TITLE constant (if present)
SPEC_FILE="${ROOT_DIR}/tests/basic-pvt.spec.ts"
if [ -f "$SPEC_FILE" ]; then
  if grep -q 'const PAGE_TITLE' "$SPEC_FILE"; then
    # Replace the entire line defining PAGE_TITLE to ensure sync with HTML title
    sed -i '' -E "s|const PAGE_TITLE = \".*\";|const PAGE_TITLE = \"${NEW_NAME}\";|" "$SPEC_FILE"
  else
    echo "Warning: PAGE_TITLE constant not found in $SPEC_FILE (skipped)" >&2
  fi
fi

echo "Project renamed to $NEW_NAME"
echo "Don't forget to update any other references to the old name in your project files."
