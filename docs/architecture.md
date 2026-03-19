# GuardianAI Architecture (Draft)

## Goal

Security-first case management with AI-assisted document search.

## Components

* Web: Next.js (apps/web)
* API: Fastify (apps/api)
* Shared: shared types/utils (packages/shared)

## Next Steps

* Auth (JWT + RBAC)
* Cases CRUD
* Audit log
* Document upload (S3)
* RAG Q\&A (OpenAI + embeddings)



## UPDATE:

\# GuardianAI Architecture



\## Overview



GuardianAI is a modular case management application designed around a clean separation 

between presentation, API logic, data access, and infrastructure.



The current implementation focuses on backend stability, persistence, and maintainable structure.



\## System Components



\### Frontend

\- \*\*Framework:\*\* Next.js

\- \*\*Purpose:\*\* user-facing application and portfolio-facing demo

\- \*\*Hosting:\*\* Vercel



\### Backend API

\- \*\*Framework:\*\* Fastify

\- \*\*Purpose:\*\* expose REST endpoints for case management

\- \*\*Language:\*\* TypeScript



\### ORM

\- \*\*Tool:\*\* Prisma

\- \*\*Purpose:\*\* model application data and manage database queries/migrations



\### Database

\- \*\*Engine:\*\* PostgreSQL

\- \*\*Runtime:\*\* Docker container



\## Monorepo Structure



```text

guardianai/

├─ apps/

│  ├─ web/

│  └─ api/

├─ packages/

├─ docs/

├─ infra/

└─ docker-compose.yml

