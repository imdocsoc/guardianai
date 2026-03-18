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

  // PATCH /cases/:id
  app.patch("/cases/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const body = request.body as {
      title?: string;
      description?: string | null;
      status?: string;
    };

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
      data: {
        title: body.title ?? existingCase.title,
        description:
          body.description !== undefined
            ? body.description
            : existingCase.description,
        status: body.status ?? existingCase.status,
      },
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