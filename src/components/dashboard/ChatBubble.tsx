import ReactMarkdown from "react-markdown"
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
          <BubbleContent>
            {isUser ? (
              message.content
            ) : (
              <div
                className={cn(
                  "prose-chat",
                  "[&_p]:m-0 [&_p:not(:last-child)]:mb-2",
                  "[&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul:not(:last-child)]:mb-2",
                  "[&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol:not(:last-child)]:mb-2",
                  "[&_li]:mb-0.5",
                  "[&_strong]:font-semibold [&_strong]:text-foreground",
                  "[&_code]:rounded-none [&_code]:bg-background [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[11px]",
                )}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </BubbleContent>
        </Bubble>

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