import { z } from "zod";

const priorityEnum = z.enum(["low", "medium", "high"]);
const effortEnum = z.enum(["quick", "medium", "long"]);
const statusEnum = z.enum(["pending", "completed", "postponed"]);

export const createTaskFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000).optional(),
  priority: priorityEnum.optional(),
  effort: effortEnum.optional(),
  dueDate: z.date().optional(),
  category: z.string().trim().max(50).optional(),
});

export const updateTaskFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000).optional(),
  priority: priorityEnum.optional(),
  effort: effortEnum.optional(),
  status: statusEnum.optional(),
  dueDate: z.date().optional(),
  category: z.string().trim().max(50).optional(),
});

export type CreateTaskFormInput = z.infer<typeof createTaskFormSchema>;
export type UpdateTaskFormInput = z.infer<typeof updateTaskFormSchema>;