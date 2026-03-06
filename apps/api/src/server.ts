import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.get("/health", async () => {
  return { ok: true, service: "guardianai-api" };
});

app.get("/db-check", async () => {
  const caseCount = await prisma.case.count();
  const userCount = await prisma.user.count();
  const auditCount = await prisma.auditEvent.count();

  return {
    ok: true,
    cases: caseCount,
    users: userCount,
    audits: auditCount,
  };
});

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? "0.0.0.0";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});