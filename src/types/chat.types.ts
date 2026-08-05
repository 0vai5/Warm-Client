export type ChatRole = "user" | "assistant";

export interface AmbiguousCandidate {
  taskId: string;
  title: string;
  confidence: number;
}

export interface ChatMessage {
  id: string; // client-generated, since backend doesn't return message ids here
  role: ChatRole;
  content: string;
  functionCalled?: string | null;
  ambiguousCandidates?: AmbiguousCandidate[];
}

export interface SendMessagePayload {
  content: string;
}

export interface AgentResult {
  reply: string;
  functionCalled: string | null;
  ambiguousCandidates?: AmbiguousCandidate[];
}