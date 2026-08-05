import api from "@/lib/axios";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  ListTasksFilters,
} from "@/types/task.types";

interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const taskService = {
  async list(filters?: ListTasksFilters): Promise<Task[]> {
    const { data } = await api.get<APIResponse<{ tasks: Task[] }>>("/tasks", {
      params: filters,
    });
    if (!data.data) throw new Error(data.message || "Failed to fetch tasks");
    return data.data.tasks;
  },

  async getById(id: string): Promise<Task> {
    const { data } = await api.get<APIResponse<{ task: Task }>>(
      `/tasks/${id}`,
    );
    if (!data.data) throw new Error(data.message || "Task not found");
    return data.data.task;
  },

  async create(payload: CreateTaskPayload): Promise<Task> {
    const { data } = await api.post<APIResponse<{ task: Task }>>(
      "/tasks",
      payload,
    );
    if (!data.data) throw new Error(data.message || "Failed to create task");
    return data.data.task;
  },

  async update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    const { data } = await api.patch<APIResponse<{ task: Task }>>(
      `/tasks/${id}`,
      payload,
    );
    if (!data.data) throw new Error(data.message || "Failed to update task");
    return data.data.task;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`, { params: { confirmed: "true" } });
  },
};