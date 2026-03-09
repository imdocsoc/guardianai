//1st
//import Fastify from "fastify";
//import { PrismaClient } from "@prisma/client";

//const app = Fastify({ logger: true });
//const prisma = new PrismaClient();

//app.get("/health", async () => {
//  return { ok: true, service: "guardianai-api" };
//});

//app.get("/db-check", async () => {
//  const caseCount = await prisma.case.count();
//  const userCount = await prisma.user.count();
//  const auditCount = await prisma.auditEvent.count();

//  return {
//    ok: true,
//    cases: caseCount,
//    users: userCount,
//    audits: auditCount,
//  };
//});

//const port = Number(process.env.PORT ?? 4000);
//const host = process.env.HOST ?? "0.0.0.0";

//app.listen({ port, host }).catch((err) => {
//  app.log.error(err);
//  process.exit(1);
//});

//2nd
//import Fastify from "fastify";
//import { PrismaClient } from "@prisma/client";
//import { caseRoutes } from "./routes/cases";

//const app = Fastify({ logger: true });
//const prisma = new PrismaClient();

//app.get("/health", async () => {
//  return { ok: true, service: "guardianai-api" };
//});

//app.get("/db-check", async () => {
//  const caseCount = await prisma.case.count();
//  const userCount = await prisma.user.count();
//  const auditCount = await prisma.auditEvent.count();

//  return {
//    ok: true,
//    cases: caseCount,
//    users: userCount,
//    audits: auditCount,
//  };
//});

//await app.register(caseRoutes);

//const port = Number(process.env.PORT ?? 4000);
//const host = process.env.HOST ?? "0.0.0.0";

//app.listen({ port, host }).catch((err) => {
//  app.log.error(err);
//  process.exit(1);
//});

//3rd
import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { caseRoutes } from "./routes/cases";

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

const start = async () => {
  try {
    await app.register(caseRoutes);

    const port = Number(process.env.PORT ?? 4000);
    const host = process.env.HOST ?? "0.0.0.0";

    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();