export type UndoActionType = "create" | "update" | "delete";

export interface UndoAction {
  _id: string;
  userId: string;
  taskId: string;
  actionType: UndoActionType;
  previousState?: Record<string, unknown>;
  undone: boolean;
  createdAt: string;
}