//1st
//import { FastifyInstance } from "fastify";
//import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();

//export async function caseRoutes(app: FastifyInstance) {

  // GET /cases
//  app.get("/cases", async () => {
//    const cases = await prisma.case.findMany({
//      orderBy: { createdAt: "desc" }
//    });

//    return { cases };
//  });

//}


//2nd
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function caseRoutes(app: FastifyInstance) {
  // GET /cases
  app.get("/cases", async () => {
    const cases = await prisma.case.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { cases };
  });

  // POST /cases
  app.post("/cases", async (request, reply) => {
    const body = request.body as {
      title?: string;
      description?: string;
      status?: string;
    };

    if (!body?.title) {
      return reply.status(400).send({
        error: "title is required",
      });
    }

    const newCase = await prisma.case.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        status: body.status ?? "open",
      },
    });

    return reply.status(201).send({ case: newCase });
  });
}