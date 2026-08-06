import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/store/chat.store";
import ChatBubble from "./ChatBubble";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChatPane = () => {
  const { messages, isSending, error, sendMessage } = useChatStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isSending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;
    setInput("");
    sendMessage(trimmed);
  };

  return (
    <div className="flex flex-col gap-3 md:h-full">
      <div
        ref={scrollRef}
        className="max-h-[50vh] space-y-4 overflow-y-auto scroll-fade scrollbar-none md:max-h-none md:min-h-0 md:flex-1"
      >
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Tell Warm what's on your mind — it'll structure it into tasks.
          </p>
        )}

        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}

        {isSending && (
          <p className="font-mono text-[11px] text-muted-foreground">
            Warm is thinking…
          </p>
        )}

        {error && (
          <p className="font-mono text-[11px] text-destructive">{error}</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border pt-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say what's on your mind…"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPane;
