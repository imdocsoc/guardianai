\# GuardianAI Case Manager



GuardianAI is a security-first case management system built to demonstrate modern full-stack engineering practices.



\## Current Stack



\- \*\*Frontend:\*\* Next.js

\- \*\*Backend API:\*\* Fastify

\- \*\*ORM:\*\* Prisma

\- \*\*Database:\*\* PostgreSQL

\- \*\*Infrastructure:\*\* Docker

\- \*\*Language:\*\* TypeScript

\- \*\*Frontend Hosting:\*\* Vercel



\## Current Features



\### Health \& Diagnostics

\- `GET /health`

\- `GET /db-check`



\### Cases API

\- `GET /cases`

\- `GET /cases/:id`

\- `POST /cases`

\- `PATCH /cases/:id`

\- `DELETE /cases/:id`



\## Architecture Overview



GuardianAI is structured as a monorepo:



```text

guardianai/

├─ apps/

│  ├─ web/        # Next.js frontend

│  └─ api/        # Fastify API

├─ packages/      # shared code (planned)

├─ docs/          # architecture and runbook

├─ infra/         # infrastructure (planned)

└─ docker-compose.yml



\## Local Setup



\### 1. Start database

```bash

docker compose up -d




