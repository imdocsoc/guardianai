# GuardianAI Architecture (Draft)

## Goal
Security-first case management with AI-assisted document search.

## Components
- Web: Next.js (apps/web)
- API: Fastify (apps/api)
- Shared: shared types/utils (packages/shared)

## Next Steps
- Auth (JWT + RBAC)
- Cases CRUD
- Audit log
- Document upload (S3)
- RAG Q&A (OpenAI + embeddings)