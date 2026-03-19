import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createCaseSchema, updateCaseSchema } from "../schemas/case.ts";

const prisma = new PrismaClient();

export async function caseRoutes(app: FastifyInstance) {
  // GET /cases
  app.get("/cases", async () => {
    const cases = await prisma.case.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { cases };
  });

  // GET /cases/:id
  app.get("/cases/:id", async (request, reply) => {
    const params = request.params as { id: string };

    const foundCase = await prisma.case.findUnique({
      where: { id: params.id },
    });

    if (!foundCase) {
      return reply.status(404).send({
        error: "case not found",
      });
    }

    return { case: foundCase };
  });

  // POST /cases
  app.post("/cases", async (request, reply) => {
  const parsed = createCaseSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: parsed.error.flatten(),
    });
  }

  const newCase = await prisma.case.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      status: parsed.data.status ?? "open",
    },
  });

  return reply.status(201).send({ case: newCase });
});

  // PATCH /cases/:id
  app.patch("/cases/:id", async (request, reply) => {
  const params = request.params as { id: string };

  const parsed = updateCaseSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: parsed.error.flatten(),
    });
  }

  const existingCase = await prisma.case.findUnique({
    where: { id: params.id },
  });

  if (!existingCase) {
    return reply.status(404).send({
      error: "case not found",
    });
  }

  const updatedCase = await prisma.case.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return { case: updatedCase };
});

  // DELETE /cases/:id
  app.delete("/cases/:id", async (request, reply) => {
    const params = request.params as { id: string };

    const existingCase = await prisma.case.findUnique({
      where: { id: params.id },
    });

    if (!existingCase) {
      return reply.status(404).send({
        error: "case not found",
      });
    }

    await prisma.case.delete({
      where: { id: params.id },
    });

    return reply.status(204).send();
  });
}