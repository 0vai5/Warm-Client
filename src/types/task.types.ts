export type TaskPriority = "low" | "medium" | "high";
export type TaskEffort = "quick" | "medium" | "long";
export type TaskStatus = "pending" | "completed" | "postponed";

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  effort: TaskEffort;
  status: TaskStatus;
  dueDate: string; // ISO string from backend
  completedAt?: string;
  postponeCount: number;
  category?: string;
  isAiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: TaskPriority;
  effort?: TaskEffort;
  dueDate?: string;
  category?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  effort?: TaskEffort;
  status?: TaskStatus;
  dueDate?: string;
  category?: string;
}

export interface ListTasksFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  dueWithin?: "today" | "week" | "overdue";
}