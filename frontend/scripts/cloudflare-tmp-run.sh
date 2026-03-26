#!/usr/bin/env bash

set -euo pipefail

MODE="${1:-dry-run}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
RUN_DIR="$(mktemp -d "${TMPDIR:-/tmp}/lider-frontend-cloudflare.XXXXXX")"

cleanup() {
  rm -rf "$RUN_DIR"
}

trap cleanup EXIT

# Build and deploy from a Linux-native path to avoid WSL mounted-drive stalls.
tar -C "$SOURCE_DIR" --exclude=node_modules --exclude=dist -cf - . | tar -C "$RUN_DIR" -xf -

cd "$RUN_DIR"

npm ci
npm run build

case "$MODE" in
  build)
    ;;
  dry-run)
    npx wrangler deploy --dry-run
    ;;
  deploy)
    npx wrangler deploy
    ;;
  *)
    echo "Usage: $0 [build|dry-run|deploy]" >&2
    exit 1
    ;;
esac
