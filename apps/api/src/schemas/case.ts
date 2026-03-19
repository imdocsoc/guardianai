import { z } from "zod";

export const createCaseSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  status: z.enum(["open", "closed"]).optional(),
});

export const updateCaseSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["open", "closed"]).optional(),
});