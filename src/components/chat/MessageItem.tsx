import { cn } from "@/lib/utils";
import { type ChatMessage } from "@/types/chat.types";

export default function MessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  // avatar element (You / AI)
  const Avatar = (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
      {isUser ? "You" : "AI"}
    </div>
  );

  return (
    <div
      className={cn(
        "flex w-full items-start",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div className={cn("flex items-start gap-3")}>
        {/* assistant: avatar then bubble; user: bubble then avatar */}
        {!isUser && <div className="mt-1">{Avatar}</div>}

        <div
          className={cn(
            "max-w-[78%] whitespace-pre-wrap rounded-md px-3 py-2 text-xs",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground/90",
          )}
        >
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="text-[13px] leading-snug">{message.content}</div>
          </div>

          {message.functionCalled && (
            <div className="mt-2 rounded border border-border bg-transparent px-2 py-1 text-[11px] font-mono text-muted-foreground">
              Function: {message.functionCalled}
            </div>
          )}

          {message.ambiguousCandidates &&
            message.ambiguousCandidates.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                <div className="text-[11px] font-medium text-muted-foreground">
                  Ambiguous matches
                </div>
                <ul className="text-[11px] text-muted-foreground">
                  {message.ambiguousCandidates.map((c) => (
                    <li
                      key={c.taskId}
                      className="flex items-center justify-between"
                    >
                      <span className="truncate">{c.title}</span>
                      <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                        {Math.round(c.confidence * 100)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {isUser && <div className="mt-1">{Avatar}</div>}
      </div>
    </div>
  );
}
