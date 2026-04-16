"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { askPortfolioChat, type ChatMessage } from "@/utils/chat";

type PortfolioChatMessage = ChatMessage & {
  isError?: boolean;
};

const STARTER_PROMPTS = [
  "What's Ivan like to work with?",
  "What is Ivan working on right now?",
  "Which projects stand out the most?",
  "Why should someone hire Ivan?",
];

const INITIAL_MESSAGE: PortfolioChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Ivan's manager. I can give you a quick sense of how he works, what he's doing now, and where he stands out.",
};

function TypingDots() {
  return (
    <div className="flex items-center gap-[5px] px-1 py-1">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-muted opacity-50"
          style={{
            animation: "typing-bounce 1.2s ease-in-out infinite",
            animationDelay: `${index * 0.18}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

function ChatBubble({ message }: { message: PortfolioChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-[1.15rem] px-4 py-3 text-[13px] leading-relaxed sm:text-sm ${
          isUser
            ? "bg-white/[0.07] text-ink"
            : message.isError
              ? "border border-red-400/20 bg-red-500/10 text-red-100"
              : "border border-white/[0.05] bg-white/[0.03] text-chat-paper"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export function PortfolioChat({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<PortfolioChatMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = useMutation<string, Error, PortfolioChatMessage[]>({
    mutationFn: askPortfolioChat,
    onSuccess: (reply, nextMessages) => {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    },
    onError: (_, nextMessages) => {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I can't answer that right now. Please try again in a moment.",
          isError: true,
        },
      ]);
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, chatMutation.isPending]);

  useEffect(() => {
    const element = textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  }, [input]);

  const submitMessage = (value: string) => {
    const content = value.trim();

    if (!content || chatMutation.isPending) {
      return;
    }

    const nextMessages: PortfolioChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];

    setMessages(nextMessages);
    setInput("");
    chatMutation.mutate(nextMessages);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  };

  const resetConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    chatMutation.reset();
  };

  const hasConversation = messages.length > 1;
  return (
    <section className="flex h-full w-full min-w-[30rem] flex-col overflow-hidden bg-frame text-chat-paper">
      <div className="border-b border-white/[0.06] px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-md">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent/70">
              Manager Notes
            </p>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.3rem)] font-extrabold leading-[0.96] tracking-[-0.06em] text-ink">
              Ask about Ivan.
            </h2>
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            {hasConversation && (
              <button
                type="button"
                onClick={resetConversation}
                title="Reset conversation"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-white/[0.05] hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                title="Close chat"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-white/[0.05] hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 max-w-md text-[13px] leading-6 text-muted sm:text-sm">
          A softer, quicker way to get the gist. Ask about his strengths, what
          he is building, or the kind of work he is best at.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          className="chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5"
        >
          {messages.map((message, index) => (
            <ChatBubble key={`${message.role}-${index}`} message={message} />
          ))}

          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.03] px-4 py-3">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-white/[0.06] px-5 py-5">
          {!hasConversation && (
            <div className="mb-3 flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitMessage(prompt)}
                  className="cursor-pointer rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-white/58 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.05] hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-[1.2rem] border border-white/[0.07] bg-white/[0.03] transition-colors duration-200 focus-within:border-white/[0.14]">
            <div className="flex flex-col gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ivan..."
                rows={1}
                className="max-h-[160px] min-h-[84px] w-full resize-none bg-transparent px-4 py-3.5 text-[14px] text-ink placeholder:text-muted focus:outline-none sm:text-sm"
              />
              <div className="flex items-center justify-between gap-3 px-3 pb-3">
                <p className="text-[10px] font-medium text-muted opacity-45">
                  Enter to send · Shift+Enter for a new line
                </p>
                <button
                  type="button"
                  onClick={() => submitMessage(input)}
                  disabled={!input.trim() || chatMutation.isPending}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.72] text-background transition-colors duration-200 hover:bg-white/[0.86] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
