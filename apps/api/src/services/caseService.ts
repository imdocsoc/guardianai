import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCases() {
  return prisma.case.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCaseById(id: string) {
  return prisma.case.findUnique({
    where: { id },
  });
}

export async function createCase(data: {
  title: string;
  description?: string | null;
  status?: string;
}) {
  return prisma.case.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      status: data.status ?? "open",
    },
  });
}

export async function updateCase(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    status?: string;
  }
) {
  return prisma.case.update({
    where: { id },
    data,
  });
}

export async function deleteCase(id: string) {
  return prisma.case.delete({
    where: { id },
  });
}