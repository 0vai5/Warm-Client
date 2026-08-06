import { create } from "zustand";
import { chatService } from "@/services/chat.service";
import { useTaskStore } from "@/store/task.store";
import type { ChatMessage } from "@/types/chat.types";

interface ChatState {
  messages: ChatMessage[];
  isSending: boolean;
  error: string | null;

  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isSending: false,
  error: null,

  sendMessage: async (content) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    // show the user's message immediately, before the agent responds
    set((state) => ({
      messages: [...state.messages, userMessage],
      isSending: true,
      error: null,
    }));

    try {
      const result = await chatService.sendMessage({ content });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.reply,
        functionCalled: result.functionCalled,
        ambiguousCandidates: result.ambiguousCandidates,
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isSending: false,
      }));

      // the agent created/updated/deleted a task — refresh the board so
      // the user sees it without a manual reload (PRD: "AI never acts silently")
      if (result.functionCalled) {
        useTaskStore.getState().fetchTasks();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to reach the assistant";
      set({ isSending: false, error: message });
    }
  },

  clearError: () => set({ error: null }),
}));
