# GuardianAI Architecture

## Overview

GuardianAI is a modular case management application designed around a clean separation between presentation, API logic, data access, and infrastructure.

The project is deployed as a production-style split architecture with a hosted frontend and a cloud-hosted backend.

## High-Level Architecture

```text
Browser
  ↓
Vercel-hosted Next.js frontend
  ↓ HTTPS
api.socrateszayas.com
  ↓
Nginx reverse proxy on AWS EC2
  ↓
Fastify API container
  ↓
Prisma ORM
  ↓
PostgreSQL container
```

## Monorepo Structure

```text
guardianai/
├─ apps/
│  ├─ web/
│  └─ api/
├─ packages/
├─ docs/
├─ infra/
└─ docker-compose.yml
```

## Backend Structure

```text
apps/api/src/
├─ routes/     # HTTP route handling
├─ schemas/    # Zod validation schemas
├─ services/   # business/data access logic
└─ server.ts   # Fastify bootstrap and infrastructure wiring
```


## System Components



### Frontend

* Framework: Next.js
* Purpose: user-facing application and portfolio-facing demo
* Hosting: Vercel
* Environment variable: `NEXT\_PUBLIC\_API\_BASE\_URL`



### Backend API

* Framework: Fastify
* Purpose: expose REST endpoints for case management
* Language: TypeScript
* Runtime: Docker container on AWS EC2



### ORM

* Tool: Prisma
* Purpose: model application data and manage database access


## Database


* Engine: PostgreSQL
* Runtime: Docker container on AWS EC2



### Reverse Proxy

* Tool: Nginx
* Purpose: terminate HTTPS and proxy requests to the API container



### TLS

* Tool: Certbot / Let's Encrypt
* Purpose: provide HTTPS for `api.socrateszayas.com`



## API Design



### Health Endpoints

* `GET /health`
* `GET /db-check`



### Case Management Endpoints

* `GET /cases`
* `GET /cases/:id`
* `POST /cases`
* `PATCH /cases/:id`
* `DELETE /cases/:id`



## Frontend Flow



### Read Flow

1. Browser requests `/cases`
2. Next.js frontend reads `NEXT\_PUBLIC\_API\_BASE\_URL`
3. Frontend fetches `/cases` from the API
4. API returns data from PostgreSQL
5. Frontend renders cases



### Create Flow

1. User submits the create-case form
2. Browser sends `POST /cases` to the API
3. API validates payload with Zod
4. Prisma writes the case to PostgreSQL
5. Frontend refreshes and displays the new case



## Security and Deployment Notes

* Frontend and backend communicate over HTTPS in production
* Nginx handles TLS termination
* CORS is configured for:

  * local development
  * production Vercel URL
  * Vercel preview deployments

* Public port 4000 was removed from the EC2 security group after HTTPS proxying was established
* Public access now flows through ports 80/443 only



## Design Principles

* Separation of concerns
* Type safety
* Production-minded deployment
* Incremental hardening
* Cloud-ready structure
* Security-first mindset
* Extensibility for future AI features



## Future Enhancements

* Edit/Delete controls in the frontend
* Authentication and admin protection
* Audit logging expansion
* Repeatable deployment automation
* AI retrieval over case documents
* Managed database and secrets handling


