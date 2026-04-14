#!/usr/bin/env bash
set -e

echo "==> Moving into project directory"
cd ~/guardianai

echo "==> Pulling latest code from GitHub"
git pull

echo "==> Rebuilding and restarting containers"
docker compose down --remove-orphans
docker compose up -d --build --force-recreate

echo "==> Current container status"
docker compose ps

echo "==> Waiting for API to come up"
for i in {1..20}; do
  if curl -fsS http://localhost:4000/health > /dev/null; then
    echo "==> Local API is healthy"
    break
  fi
  echo "   ...waiting ($i)"
  sleep 2
done

echo "==> Local API health response"
curl -fsS http://localhost:4000/health
echo

echo "==> Public API health response"
curl -fsS https://api.socrateszayas.com/health
echo

echo "==> Deployment complete"