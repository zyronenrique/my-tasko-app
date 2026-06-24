import { z } from "zod";

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
  dueDate: z.iso.date().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
export type TaskFormData = z.infer<typeof createTaskSchema>;
