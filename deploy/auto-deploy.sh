#!/usr/bin/env bash
# Runs on the DevLab server from cron every minute: when GitHub's main branch has new commits,
# pull them and rebuild the site. A failed build leaves the running site untouched.
#   --force   rebuild even if nothing changed (used by deploy.sh)
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-main}"
cd "$DIR"

# One deploy at a time; a build can outlast the one-minute cron interval.
exec 9>"$DIR/deploy/.deploy.lock"
flock -n 9 || exit 0

git fetch -q origin "$BRANCH"
current="$(git rev-parse HEAD)"
latest="$(git rev-parse "origin/$BRANCH")"
if [[ "$current" == "$latest" && "${1:-}" != "--force" ]]; then
  exit 0
fi

echo "[$(date '+%F %T')] deploying ${latest:0:7}: $(git log -1 --format=%s "$latest")"
# Untracked secrets (deploy/.env) are left alone by reset.
git reset -q --hard "$latest"

cd deploy
profile=()
if grep -qs '^CLOUDFLARE_TUNNEL_TOKEN=.' .env; then profile=(--profile tunnel); fi
if docker compose "${profile[@]}" up -d --build --quiet-pull >/dev/null 2>&1; then
  docker image prune -f >/dev/null
  echo "[$(date '+%F %T')] live: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:30030/)"
else
  echo "[$(date '+%F %T')] BUILD FAILED for ${latest:0:7}; previous version still running. Rerun: $0 --force"
  exit 1
fi
