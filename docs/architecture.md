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



GuardianAI is a modular case management backend designed with a separation of concerns between routing, business logic, and data persistence.



\## Components



\### API Layer

\- Fastify

\- Handles routing and request lifecycle



\### Service Layer

\- Business logic (planned expansion)



\### Data Layer

\- Prisma ORM

\- PostgreSQL database



\### Infrastructure

\- Docker container for database

\- Local development environment



\## Data Flow



Client → API → Prisma → PostgreSQL → Response



\## Design Principles



\- Separation of concerns

\- Type safety (TypeScript)

\- Minimal surface area for security

\- Extensible architecture for AI integration



\## Future Enhancements



\- Authentication (JWT)

\- Role-based access control

\- AI-assisted case search (RAG)

\- Cloud deployment (AWS/GCP)

