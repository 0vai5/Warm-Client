import api from "@/lib/axios";
import type { SendMessagePayload, AgentResult } from "@/types/chat.types";

interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const chatService = {
  async sendMessage(payload: SendMessagePayload): Promise<AgentResult> {
    const { data } = await api.post<APIResponse<{ result: AgentResult }>>(
      "/agent/message",
      payload,
    );
    if (!data.data) throw new Error(data.message || "Failed to send message");
    return data.data.result;
  },
};