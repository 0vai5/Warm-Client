import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/types/chat.types"

interface ChatBubbleProps {
  message: ChatMessage
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start gap-2.5", isUser && "flex-row-reverse")}>
      <Avatar size="sm">
        <AvatarFallback>{isUser ? "U" : "W"}</AvatarFallback>
      </Avatar>

      <BubbleGroup className={isUser ? "items-end" : "items-start"}>
        <Bubble variant={isUser ? "default" : "muted"} align={isUser ? "end" : "start"}>
          <BubbleContent>{message.content}</BubbleContent>
        </Bubble>

        {/* ambiguous task matches — shown as a soft hint list under the reply */}
        {message.ambiguousCandidates && message.ambiguousCandidates.length > 0 && (
          <Bubble variant="outline" align="start">
            <BubbleContent className="flex flex-col gap-0.5 font-mono text-[11px]">
              {message.ambiguousCandidates.map((c) => (
                <span key={c.taskId}>
                  → {c.title} ({Math.round(c.confidence * 100)}% match)
                </span>
              ))}
            </BubbleContent>
          </Bubble>
        )}
      </BubbleGroup>
    </div>
  )
}

export default ChatBubble