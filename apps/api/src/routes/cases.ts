import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createCaseSchema, updateCaseSchema } from "../schemas/case.ts";
import {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} from "../services/caseService.ts";

function requireAdminKey(request: FastifyRequest, reply: FastifyReply) {
  const configuredAdminKey = process.env.ADMIN_KEY;

  if (!configuredAdminKey) {
    reply.status(500).send({
      error: "admin protection is not configured",
    });
    return false;
  }

  const providedAdminKey = request.headers["x-admin-key"];

  if (
    typeof providedAdminKey !== "string" ||
    providedAdminKey !== configuredAdminKey
  ) {
    reply.status(401).send({
      error: "unauthorized",
    });
    return false;
  }

  return true;
}

export async function caseRoutes(app: FastifyInstance) {
  app.get("/cases", async () => {
    const cases = await getAllCases();
    return { cases };
  });

  app.get("/cases/:id", async (request, reply) => {
    const params = request.params as { id: string };

    const foundCase = await getCaseById(params.id);

    if (!foundCase) {
      return reply.status(404).send({
        error: "case not found",
      });
    }

    return { case: foundCase };
  });

  app.post("/cases", async (request, reply) => {
    if (!requireAdminKey(request, reply)) return;

    const parsed = createCaseSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: parsed.error.flatten(),
      });
    }

    const newCase = await createCase(parsed.data);

    return reply.status(201).send({ case: newCase });
  });

  app.patch("/cases/:id", async (request, reply) => {
    if (!requireAdminKey(request, reply)) return;

    const params = request.params as { id: string };
    const parsed = updateCaseSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: parsed.error.flatten(),
      });
    }

    const existingCase = await getCaseById(params.id);

    if (!existingCase) {
      return reply.status(404).send({
        error: "case not found",
      });
    }

    const updated = await updateCase(params.id, parsed.data);

    return { case: updated };
  });

  app.delete("/cases/:id", async (request, reply) => {
    if (!requireAdminKey(request, reply)) return;

    const params = request.params as { id: string };

    const existingCase = await getCaseById(params.id);

    if (!existingCase) {
      return reply.status(404).send({
        error: "case not found",
      });
    }

    await deleteCase(params.id);

    return reply.status(204).send();
  });
}