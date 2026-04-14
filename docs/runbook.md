# GuardianAI Runbook

## Local Development

### Start the database
```bash
docker compose up -d```

### Run the API
```Bash
npm run dev:api```

### Run the frontend
```Bash
npm run dev:web```

## Local Health Checks

### API health
`http://localhost:4000/health`

### Database connectivity
`http://localhost:4000/db-check`

## Production Endpoints

### Frontend
`https://guardianai-web.vercel.app`

### API
`https://api.socrateszayas.com`

### Health
`https://api.socrateszayas.com/health`

## Current API Endpoints

### Public read endpoints

`GET /health`
`GET /db-check`
`GET /cases`
`GET /cases/:id`

### Protected write endpoints

'POST /cases`
`PATCH /cases/:id`
`DELETE /cases/:id`

### Protected routes require:

header: `x-admin-key`
value: the configured `ADMIN_KEY`

## Environment Variables

### Local API

File: `apps/api/.env`

```Environment
DATABASE_URL="postgresql://guardianai:guardianai_dev_pw@localhost:5432/guardianai"
PORT=4000
HOST=0.0.0.0
ADMIN_KEY=your-local-admin-key```

### Server API (EC2)

File: `~/guardianai/apps/api/.env`

```Environment
DATABASE_URL="postgresql://guardianai:guardianai_dev_pw@db:5432/guardianai"
PORT=4000
HOST=0.0.0.0
ADMIN_KEY=your-production-admin-key```

### Local frontend
File: `apps/web/.env.local`

`NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`

### Production frontend (Vercel)
```Environment
NEXT_PUBLIC_API_BASE_URL=https://api.socrateszayas.com```

## Deployment Procedure

### SSH into EC2:
```Bash
ssh -i ~/.ssh/guardianai-key.pem ubuntu@3.19.28.47```

### Move into the project:
```Bash
cd ~/guardianai```

### Run the deployment script:
```Bash
bash deploy.sh```

## Manual Deployment Fallback
If the script is unavailable, run:
```Bash
cd ~/guardianai
git pull
docker compose down --remove-orphans
docker compose up -d --build --force-recreate
docker compose ps
curl -f http://localhost:4000/health
curl -f https://api.socrateszayas.com/health```

## AWS Notes

### EC2 host responsibilities
* runs Docker
* hosts API container
* hosts PostgreSQL container
* runs Nginx
* serves TLS certificates via Certbot

### Nginx responsibilities
listen on `ports 80 and 443`
proxy traffic for `api.socrateszayas.com`
forward requests to `localhost:4000`

### Security group expectations
`HTTP 80 → public`
`HTTPS 443 → public`
`SSH 22 → admin-only access`
`port 4000 → not public`

## Troubleshooting

### Check container status
```Bash
docker compose ps```

### Check API logs
```Bash
docker logs guardianai_api --tail 100```

### Check DB logs
```Bash
docker logs guardianai_db --tail 100```

### Check local API health on EC2
```Bash
curl http://localhost:4000/health```

### Check public API health
```Bash
curl https://api.socrateszayas.com/health```

### Common failure modes
* API container missing from compose file
* server .env missing ADMIN_KEY
* stale container not recreated after code changes
* CORS mismatch after Vercel URL changes
* HTTPS working but Nginx not proxying

