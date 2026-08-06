import api from "@/lib/axios";
import type { UndoAction } from "@/types/undo.types";

interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const undoService = {
  async getHistory(): Promise<UndoAction[]> {
    const { data } = await api.get<APIResponse<{ actions: UndoAction[] }>>(
      "/agent/undo/history",
    );
    if (!data.data) throw new Error(data.message || "Failed to fetch history");
    return data.data.actions;
  },

  async undo(undoId?: string): Promise<void> {
    await api.post("/agent/undo", undoId ? { undoId } : {});
  },
};