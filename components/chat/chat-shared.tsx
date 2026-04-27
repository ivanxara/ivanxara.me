"use client";

import type { KeyboardEvent, ReactNode, RefObject } from "react";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/typography";
import type { ChatMessage, ChatRequestMetadata } from "@/utils/chat";

export const CHAT_FOCUS_EVENT = "portfolio-chat:focus-input";
const VISITOR_ID_STORAGE_KEY = "portfolio-chat-visitor-id";
const CHAT_SESSION_ID_STORAGE_KEY = "portfolio-chat-session-id";

const STARTER_PROMPTS = [
  "What makes Ivan stand out?",
  "Which project stands out most?",
  "What does Ivan specialize in?",
  "What problems does Ivan solve?",
];

const INLINE_MARKDOWN_REGEX =
  /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|\*\*([^*]+)\*\*|((?:https?:\/\/[^\s<]+)|(?:www\.[^\s<]+)|(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}))/gi;

export type PortfolioChatMessage = ChatMessage & {
  isError?: boolean;
};

export const INITIAL_MESSAGE: PortfolioChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Ivan Assistant. I can give you a quick sense of how he works, what he's doing now, and where he stands out.",
};

export function createChatRequestMetadata(): ChatRequestMetadata {
  return {
    visitorId: getOrCreateStorageId(VISITOR_ID_STORAGE_KEY),
    chatSessionId: getOrCreateSessionId(),
  };
}

export function resetChatSessionId() {
  const nextSessionId = createId();
  window.sessionStorage.setItem(CHAT_SESSION_ID_STORAGE_KEY, nextSessionId);
}

export function resizeTextarea(
  ref: RefObject<HTMLTextAreaElement | null>,
  maxHeight: number,
) {
  const element = ref.current;

  if (!element) {
    return;
  }

  element.style.height = "auto";
  element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
}

export function getSubmitTitle(cooldownRemainingSeconds: number) {
  return cooldownRemainingSeconds > 0
    ? `Wait ${cooldownRemainingSeconds}s`
    : "Send message";
}

function createId() {
  return crypto.randomUUID();
}

function getOrCreateStorageId(key: string) {
  const existingValue = window.localStorage.getItem(key);

  if (existingValue) {
    return existingValue;
  }

  const nextValue = createId();
  window.localStorage.setItem(key, nextValue);
  return nextValue;
}

function getOrCreateSessionId() {
  const existingValue = window.sessionStorage.getItem(
    CHAT_SESSION_ID_STORAGE_KEY,
  );

  if (existingValue) {
    return existingValue;
  }

  const nextValue = createId();
  window.sessionStorage.setItem(CHAT_SESSION_ID_STORAGE_KEY, nextValue);
  return nextValue;
}

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
  let lastIndex = 0;
  let key = 0;
  const matches = Array.from(content.matchAll(INLINE_MARKDOWN_REGEX));

  matches.forEach((match) => {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(content.slice(lastIndex, matchIndex));
    }

    const [, markdownLabel, markdownHref, boldText, autolinkValue] = match;

    if (markdownLabel && markdownHref) {
      nodes.push(
        <a
          key={`markdown-link-${key++}`}
          href={markdownHref}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-muted-foreground underline-offset-4 transition-colors hover:text-sidebar-foreground"
        >
          {markdownLabel}
        </a>,
      );
    } else if (boldText) {
      nodes.push(
        <strong key={`bold-${key++}`} className="font-semibold text-foreground">
          {boldText}
        </strong>,
      );
    } else if (autolinkValue) {
      nodes.push(
        <a
          key={`autolink-${key++}`}
          href={normalizeHref(autolinkValue)}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-muted-foreground underline-offset-4 transition-colors hover:text-sidebar-foreground"
        >
          {autolinkValue}
        </a>,
      );
    }

    lastIndex = matchIndex + match[0].length;
  });

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex));
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
    <div className="flex items-center gap-1 px-1 py-1">
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
        className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-relaxed sm:text-sm ${
          isUser
            ? "bg-accent text-foreground"
            : message.isError
              ? "border border-red-400/20 bg-red-500/10 text-red-100"
              : "border border-border bg-muted text-sidebar-foreground"
        }`}
      >
        {renderTextWithLinks(message.content)}
      </div>
    </div>
  );
}

type ChatPanelProps = {
  messages: PortfolioChatMessage[];
  input: string;
  hasConversation: boolean;
  isPending: boolean;
  cooldownRemainingSeconds: number;
  isSendDisabled: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onInputChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
  onReset: () => void;
  onClose?: () => void;
};

export function ChatPanel({
  messages,
  input,
  hasConversation,
  isPending,
  cooldownRemainingSeconds,
  isSendDisabled,
  scrollRef,
  textareaRef,
  onInputChange,
  onKeyDown,
  onSubmit,
  onReset,
  onClose,
}: ChatPanelProps) {
  return (
    <section
      data-portfolio-chat-root="true"
      className="flex h-full w-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground rounded-4xl"
    >
      <div className="border-b border-border px-4 py-4 xl:px-5 xl:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-sm xl:max-w-md">
            <p className="text-xs font-black uppercase tracking-widest text-primary/70">
              Ivan Assistant
            </p>
            <Heading variant="heading-4" className="mt-2">
              Ask about Ivan.
            </Heading>
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            {hasConversation && (
              <Button
                type="button"
                variant="chat-icon"
                size="icon"
                onClick={onReset}
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

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-sm xl:max-w-md">
          A quicker way to get the gist. Ask about experience, current work,
          tech stack, strengths, or a specific project.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          className="chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 xl:px-5 xl:py-5"
        >
          {messages.map((message, index) => (
            <ChatBubble key={`${message.role}-${index}`} message={message} />
          ))}

          {isPending && (
            <div className="flex justify-start">
              <div className="rounded-3xl border border-border bg-muted px-4 py-3">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border px-4 py-4 xl:px-5 xl:py-5">
          {!hasConversation && (
            <div className="mb-3 flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <Button
                  key={prompt}
                  type="button"
                  variant="secondary"
                  disabled={isPending || cooldownRemainingSeconds > 0}
                  onClick={() => onSubmit(prompt)}
                  className="rounded-full border border-border bg-muted text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground h-auto px-3.5 py-2 text-xs font-medium"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}

          <div className="rounded-3xl border border-border bg-muted transition-colors duration-200 focus-within:border-ring">
            <div className="flex flex-col gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => onInputChange(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about Ivan..."
                rows={1}
                className="max-h-40 min-h-18 w-full resize-none bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
              />
              <div className="flex items-center justify-between gap-3 px-3 pb-3">
                <p className="text-xs font-medium text-muted-foreground opacity-45">
                  Enter to send · Shift+Enter for a new line
                </p>
                <Button
                  type="button"
                  variant="chat-send"
                  size="icon"
                  onClick={() => onSubmit(input)}
                  disabled={isSendDisabled}
                  title={getSubmitTitle(cooldownRemainingSeconds)}
                  className="min-w-10"
                >
                  {cooldownRemainingSeconds > 0 ? (
                    <span className="text-xs font-semibold">
                      {cooldownRemainingSeconds}s
                    </span>
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
