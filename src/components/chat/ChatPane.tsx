import React, { useRef, useState, useEffect } from "react";
import { useChatStore } from "@/store/chat.store";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MessageItem from "./MessageItem";
import Loader from "@/components/Loader";
import { PaperPlaneRight } from "@phosphor-icons/react";

export default function ChatPane() {
  const { messages, sendMessage, isSending, error, clearError } =
    useChatStore();
  const [value, setValue] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // auto-scroll to bottom on new messages
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      // keep error visible briefly then clear
      const t = setTimeout(() => clearError(), 4000);
      return () => clearTimeout(t);
    }
  }, [error, clearError]);

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    // clear input immediately so text vanishes on send
    setValue("");
    try {
      await sendMessage(trimmed);
    } catch (e) {
      // sendMessage handles error state in store
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-1">
        {/* <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Assistant
        </p>
        <div className="text-xs text-muted-foreground">AI</div> */}
      </div>

      <div className="relative flex min-h-0 py-4 flex-1 flex-col">
        {/* scrollable list with fade overlays and hidden scrollbar */}
        <div
          ref={listRef}
          className="no-scrollbar scroll-fade flex min-h-0 flex-1 flex-col gap-3 overflow-auto pr-2 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No messages yet. Ask the assistant something.
            </p>
          )}

          {messages.map((m) => (
            <MessageItem key={m.id} message={m} />
          ))}

          {/* temporary typing indicator bubble when sending */}
          {isSending && (
            <div className="flex w-full justify-start">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
                  AI
                </div>
                <div className="rounded-md bg-muted px-3 py-2 text-xs">
                  <Loader />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="mt-2 sticky bottom-0 z-10 flex w-full items-end gap-2 bg-transparent pt-3">
        <div className="flex-1">
          <Textarea
            placeholder="Message the assistant (Ctrl+Enter to send)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
          />
        </div>

        <div className="shrink-0">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => void handleSend()}
            disabled={isSending}
            aria-label="Send message"
          >
            <PaperPlaneRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
