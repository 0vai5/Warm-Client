import { create } from "zustand";
import { taskService } from "@/services/task.service";
import { toast } from "@/components/ui/toast";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  ListTasksFilters,
} from "@/types/task.types";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  activeFilters: ListTasksFilters;

  fetchTasks: (filters?: ListTasksFilters) => Promise<void>;
  createTask: (payload: CreateTaskPayload) => Promise<Task>;
  updateTask: (id: string, payload: UpdateTaskPayload) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: ListTasksFilters) => void;
  clearError: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  activeFilters: {},

  fetchTasks: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const appliedFilters = filters ?? get().activeFilters;
      const tasks = await taskService.list(appliedFilters);
      set({ tasks, isLoading: false, activeFilters: appliedFilters });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      set({ isLoading: false, error: message });
      toast.add({
        title: "Could not load tasks",
        description: message,
        type: "error",
      });
    }
  },

  createTask: async (payload) => {
    try {
      const task = await taskService.create(payload);
      set((state) => ({ tasks: [task, ...state.tasks] }));
      toast.add({
        title: "Task created",
        description: task.title,
        type: "success",
      });
      return task;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create task";
      toast.add({
        title: "Task creation failed",
        description: message,
        type: "error",
      });
      throw err;
    }
  },

  updateTask: async (id, payload) => {
    try {
      const updated = await taskService.update(id, payload);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === id ? updated : t)),
      }));
      toast.add({
        title: "Task updated",
        description: updated.title,
        type: "success",
      });
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update task";
      toast.add({
        title: "Task update failed",
        description: message,
        type: "error",
      });
      throw err;
    }
  },

  deleteTask: async (id) => {
    try {
      await taskService.delete(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
      }));
      toast.add({
        title: "Task deleted",
        type: "success",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      toast.add({
        title: "Task deletion failed",
        description: message,
        type: "error",
      });
      throw err;
    }
  },

  setFilters: (filters) => {
    set({ activeFilters: filters });
  },

  clearError: () => set({ error: null }),
}));
