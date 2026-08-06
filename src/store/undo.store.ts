import { create } from "zustand";
import { undoService } from "@/services/undo.service";
import { useTaskStore } from "@/store/task.store";
import type { UndoAction } from "@/types/undo.types";

interface UndoState {
  history: UndoAction[];
  isLoading: boolean;
  isUndoing: boolean;
  error: string | null;

  fetchHistory: () => Promise<void>;
  undoAction: (undoId?: string) => Promise<void>;
}

export const useUndoStore = create<UndoState>((set, get) => ({
  history: [],
  isLoading: false,
  isUndoing: false,
  error: null,

  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const history = await undoService.getHistory();
      set({ history, isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load undo history";
      set({ isLoading: false, error: message });
    }
  },

  undoAction: async (undoId) => {
    set({ isUndoing: true, error: null });
    try {
      await undoService.undo(undoId);
      set({ isUndoing: false });

      // the task board changed as a result of the undo — refresh both
      // the board and the history list so the UI reflects reality
      useTaskStore.getState().fetchTasks();
      get().fetchHistory();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Undo failed";
      set({ isUndoing: false, error: message });
    }
  },
}));