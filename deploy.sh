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
sleep 5

echo "==> Checking local API health"
curl -f http://localhost:4000/health

echo
echo "==> Checking public API health"
curl -f https://api.socrateszayas.com/health

echo
echo "==> Deployment complete"