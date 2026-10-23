#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ "$(git branch --show-current)" != "pages" ]]; then
  echo "Deploy from the pages branch: git switch pages" >&2
  exit 1
fi

npm run build
git add -A

if ! git diff --cached --quiet; then
  git commit -m "${1:-Update Snap Circle website}"
fi

git push origin pages
echo "Published source and built site to the pages branch."
