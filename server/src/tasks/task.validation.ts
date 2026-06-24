import { z } from "zod";

export const getTasksSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  remark: z.enum([
    "IN_COMPLETE",
    "COMPLETE",
  ]).optional(),
  status: z.enum([
    "ACTIVE",
    "INACTIVE",
  ]).optional(),
  sortBy: z.enum([
    "createdAt",
    "updatedAt",
    "title",
    "dueDate",
  ]).default("createdAt"),
  order: z.enum([
    "asc",
    "desc",
  ]).default("desc"),
});

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  remark: z.enum([
    "IN_COMPLETE",
    "COMPLETE",
  ]).optional(),
  status: z.enum([
    "ACTIVE",
    "INACTIVE",
  ]).optional(),
  dueDate: z.iso.datetime().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
export type GetTasksQuery = z.infer<typeof getTasksSchema>;
