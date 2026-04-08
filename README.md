# GuardianAI Case Manager

GuardianAI is a security-first case management system built to demonstrate modern full-stack engineering practices, cloud deployment discipline, and production-minded architecture.

## Live URLs

- Frontend: `https://guardianai-web.vercel.app`
- API: `https://api.socrateszayas.com`
- Health Check: `https://api.socrateszayas.com/health`

## Current Stack

- **Frontend:** Next.js
- **Backend API:** Fastify
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Infrastructure:** Docker
- **Reverse Proxy:** Nginx
- **TLS/SSL:** Let's Encrypt (Certbot)
- **Cloud Host:** AWS EC2
- **Frontend Hosting:** Vercel
- **Language:** TypeScript

## Current Features

### Health & Diagnostics
- `GET /health`
- `GET /db-check`

### Cases API
- `GET /cases`
- `GET /cases/:id`
- `POST /cases`
- `PATCH /cases/:id`
- `DELETE /cases/:id`

### Frontend
- View live cases from the deployed API
- Create cases from the production UI
- Integrated production frontend-to-backend flow over HTTPS

## Deployment Architecture

GuardianAI is deployed as a split frontend/backend system:

- **Vercel** hosts the Next.js frontend
- **AWS EC2** hosts Docker containers for:
  - Fastify API
  - PostgreSQL database
- **Nginx** proxies HTTPS traffic to the API container
- **Certbot / Let's Encrypt** manages TLS certificates
- **Vercel environment variables** point the frontend to the production API

## Monorepo Structure

```text
guardianai/
├─ apps/
│  ├─ web/        # Next.js frontend
│  └─ api/        # Fastify API
├─ packages/      # shared code (planned)
├─ docs/          # architecture and runbook
├─ infra/         # infrastructure (planned)
└─ docker-compose.yml
```

## Local Development

### 1. Start PostgreSQL

```bash
docker compose up -d```

### 2. Install dependencies

```bash
npm install```

### 3. Run API

```bash
npm run dev:api```

### 4. Run frontend

```bash
npm run dev:web```

## Environment Variables

### Local frontend

File: `apps/web/.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000```

### Local API

File: `apps/api/.env`

```DATABASE_URL="postgresql://guardianai:guardianai_dev_pw@localhost:5432/guardianai"
PORT=4000
HOST=0.0.0.0```

## Server API (EC2)

File: `~/guardianai/apps/api/.env`

```DATABASE_URL="postgresql://guardianai:guardianai_dev_pw@db:5432/guardianai"
PORT=4000
HOST=0.0.0.0```

## Production frontend (Vercel)

```env
NEXT_PUBLIC_API_BASE_URL=https://api.socrateszayas.com```

## Production Verification

### Frontend

`https://guardianai-web.vercel.app/cases`

### API

`https://api.socrateszayas.com/health`

Expected health response:

`{"ok":true,"service":"guardianai-api"}`

## Current Status

Implemented:

* Dockerized PostgreSQL
* Prisma schema and migrations
* Cases CRUD API
* Zod request validation
* Service layer separation
* Vercel frontend deployment
* AWS EC2 API deployment
* Nginx reverse proxy
* HTTPS with Let's Encrypt
* Production CORS handling
* Live create-case flow from production UI

Planned:

* Edit/Delete UI
* Authentication / admin protection
* Audit logging expansion
* Repeatable deployment workflow
* AI-assisted case retrieval and search

## Purpose

This project is part of a professional portfolio intended to demonstrate:

* backend API design
* database modeling
* cloud deployment
* infrastructure discipline
* security-minded architecture
* production troubleshooting and integration