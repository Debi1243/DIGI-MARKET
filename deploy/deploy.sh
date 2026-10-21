#!/usr/bin/env bash
# Redeploy now instead of waiting for the server's one-minute check.
# The server builds whatever is on GitHub's main branch, so push first.
# Needs Tailscale up and SSH key access to arsh@100.68.184.37.
set -euo pipefail

HOST="${DEPLOY_HOST:-arsh@100.68.184.37}"
DIR="${DEPLOY_DIR:-/home/arsh/zoominfotos}"

ssh "$HOST" "$DIR/deploy/auto-deploy.sh --force"
