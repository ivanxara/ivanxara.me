"use client";

import { useMutation } from "@tanstack/react-query";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  askPortfolioChat,
  type ChatMessage,
  type ChatResponse,
} from "@/utils/chat";

const CHAT_FOCUS_EVENT = "portfolio-chat:focus-input";

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
    "Hi, I'm Ivan Assistant. I can give you a quick sense of how he works, what he's doing now, and where he stands out.",
};

const MARKDOWN_LINK_REGEX =
  /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g;
const URL_OR_EMAIL_REGEX = /((https?:\/\/[^\s<]+)|(www\.[^\s<]+)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}))/gi;

function normalizeHref(value: string) {
  if (value.includes("@") && !value.startsWith("http")) {
    return `mailto:${value}`;
  }

  if (value.startsWith("www.")) {
    return `https://${value}`;
  }

  return value;
}

function renderTextWithLinks(content: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const markdownMatches = Array.from(content.matchAll(MARKDOWN_LINK_REGEX));
  let lastIndex = 0;
  let key = 0;

  const pushPlainText = (text: string) => {
    if (!text) {
      return;
    }

    let segmentLastIndex = 0;
    const matches = Array.from(text.matchAll(URL_OR_EMAIL_REGEX));

    matches.forEach((match) => {
      const matchIndex = match.index ?? 0;

      if (matchIndex > segmentLastIndex) {
        nodes.push(text.slice(segmentLastIndex, matchIndex));
      }

      const value = match[0];
      nodes.push(
        <a
          key={`autolink-${key++}`}
          href={normalizeHref(value)}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-sidebar-foreground"
        >
          {value}
        </a>,
      );

      segmentLastIndex = matchIndex + value.length;
    });

    if (segmentLastIndex < text.length) {
      nodes.push(text.slice(segmentLastIndex));
    }
  };

  markdownMatches.forEach((match) => {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      pushPlainText(content.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <a
        key={`markdown-link-${key++}`}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-sidebar-foreground"
      >
        {match[1]}
      </a>,
    );

    lastIndex = matchIndex + match[0].length;
  });

  if (lastIndex < content.length) {
    pushPlainText(content.slice(lastIndex));
  }

  return nodes.flatMap((node, index) => {
    if (typeof node !== "string") {
      return node;
    }

    return node.split("\n").flatMap((line, lineIndex, array) => {
      const lineNodes: ReactNode[] = [];

      if (line) {
        lineNodes.push(line);
      }

      if (lineIndex < array.length - 1) {
        lineNodes.push(<br key={`break-${index}-${lineIndex}`} />);
      }

      return lineNodes;
    });
  });
}

function TypingDots() {
  return (
    <div className="flex items-center gap-[5px] px-1 py-1">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground opacity-50"
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
            ? "bg-white/[0.07] text-foreground"
            : message.isError
              ? "border border-red-400/20 bg-red-500/10 text-red-100"
              : "border border-white/[0.05] bg-white/[0.03] text-sidebar-foreground"
        }`}
      >
        {renderTextWithLinks(message.content)}
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

  const chatMutation = useMutation<
    ChatResponse,
    Error,
    PortfolioChatMessage[]
  >({
    mutationFn: askPortfolioChat,
    onSuccess: (reply, nextMessages) => {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: reply.message,
          isError: reply.status === "error",
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

  useEffect(() => {
    const focusInput = () => {
      textareaRef.current?.focus();
    };

    window.addEventListener(CHAT_FOCUS_EVENT, focusInput);

    return () => {
      window.removeEventListener(CHAT_FOCUS_EVENT, focusInput);
    };
  }, []);

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
    <section
      data-portfolio-chat-root="true"
      className="flex h-full w-full min-w-[30rem] flex-col overflow-hidden bg-sidebar text-sidebar-foreground"
    >
      <div className="border-b border-white/[0.06] px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-md">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/70">
              Ivan Assistant
            </p>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.3rem)] font-extrabold leading-[0.96] tracking-[-0.06em] text-foreground">
              Ask about Ivan.
            </h2>
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            {hasConversation && (
              <Button
                type="button"
                variant="chat-icon"
                size="icon"
                onClick={resetConversation}
                title="Reset conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            )}

            {onClose && (
              <Button
                type="button"
                variant="chat-icon"
                size="icon"
                onClick={onClose}
                title="Close chat"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        <p className="mt-3 max-w-md text-[13px] leading-6 text-muted-foreground sm:text-sm">
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
                <Button
                  key={prompt}
                  type="button"
                  variant="chat-chip"
                  size="chat-chip"
                  onClick={() => submitMessage(prompt)}
                >
                  {prompt}
                </Button>
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
                className="max-h-[160px] min-h-[84px] w-full resize-none bg-transparent px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
              />
              <div className="flex items-center justify-between gap-3 px-3 pb-3">
                <p className="text-[10px] font-medium text-muted-foreground opacity-45">
                  Enter to send · Shift+Enter for a new line
                </p>
                <Button
                  type="button"
                  variant="chat-send"
                  size="icon"
                  onClick={() => submitMessage(input)}
                  disabled={!input.trim() || chatMutation.isPending}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
