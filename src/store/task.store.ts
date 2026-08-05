import { create } from "zustand";
import { taskService } from "@/services/task.service";
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
    }
  },

  createTask: async (payload) => {
    const task = await taskService.create(payload);
    set((state) => ({ tasks: [task, ...state.tasks] }));
    return task;
  },

  updateTask: async (id, payload) => {
    const updated = await taskService.update(id, payload);
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? updated : t)),
    }));
    return updated;
  },

  deleteTask: async (id) => {
    await taskService.delete(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    }));
  },

  setFilters: (filters) => {
    set({ activeFilters: filters });
  },

  clearError: () => set({ error: null }),
}));