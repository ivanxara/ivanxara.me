"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { PortfolioChatDesktop } from "@/components/chat/chat-desktop";
import { PortfolioChatMobile } from "@/components/chat/chat-mobile";
import {
  CHAT_FOCUS_EVENT,
  INITIAL_MESSAGE,
  createChatRequestMetadata,
  resetChatSessionId,
  resizeTextarea,
  type PortfolioChatMessage,
} from "@/components/chat/chat-shared";
import {
  askPortfolioChat,
  type ChatRequestMetadata,
  type ChatResponse,
} from "@/utils/chat";

const SESSION_COOLDOWN_SECONDS = 3;

type ChatRequest = {
  messages: PortfolioChatMessage[];
  metadata: ChatRequestMetadata;
};

type PortfolioChatProps = {
  variant?: "panel" | "mobile";
  onClose?: () => void;
  mobileDrawerOpen?: boolean;
  onMobileDrawerOpenChange?: (open: boolean) => void;
};

export function PortfolioChat(props: PortfolioChatProps) {
  const variant = props.variant ?? "panel";
  const [messages, setMessages] = useState<PortfolioChatMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownRemainingSeconds, setCooldownRemainingSeconds] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelTextareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = variant === "mobile";
  const mobileDrawerOpen = isMobile ? Boolean(props.mobileDrawerOpen) : false;

  const chatMutation = useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: ({ messages: nextMessages, metadata }) =>
      askPortfolioChat(nextMessages, metadata),
    onSuccess: (reply, request) => {
      if (reply.retryAfterSeconds) {
        setCooldownUntil(Date.now() + reply.retryAfterSeconds * 1000);
      }

      setMessages([
        ...request.messages,
        {
          role: "assistant",
          content: reply.message,
          isError: reply.status !== "success",
        },
      ]);
    },
    onError: (_, request) => {
      setMessages([
        ...request.messages,
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
  }, [messages, chatMutation.isPending, mobileDrawerOpen]);

  useEffect(() => {
    resizeTextarea(panelTextareaRef, 120);
  }, [input, mobileDrawerOpen]);

  useEffect(() => {
    const focusInput = () => {
      panelTextareaRef.current?.focus();
    };

    window.addEventListener(CHAT_FOCUS_EVENT, focusInput);

    return () => {
      window.removeEventListener(CHAT_FOCUS_EVENT, focusInput);
    };
  }, [isMobile, mobileDrawerOpen]);

  useEffect(() => {
    if (!isMobile || !mobileDrawerOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      panelTextareaRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isMobile, mobileDrawerOpen]);

  useEffect(() => {
    if (!cooldownUntil) {
      setCooldownRemainingSeconds(0);
      return;
    }

    const updateCooldown = () => {
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((cooldownUntil - Date.now()) / 1000),
      );
      setCooldownRemainingSeconds(nextRemainingSeconds);

      if (nextRemainingSeconds === 0) {
        setCooldownUntil(null);
      }
    };

    updateCooldown();
    const intervalId = window.setInterval(updateCooldown, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [cooldownUntil]);

  const submitMessage = (value: string) => {
    const content = value.trim();

    if (!content || chatMutation.isPending || cooldownRemainingSeconds > 0) {
      return false;
    }

    const nextMessages: PortfolioChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];

    setMessages(nextMessages);
    setInput("");
    setCooldownUntil(Date.now() + SESSION_COOLDOWN_SECONDS * 1000);
    chatMutation.mutate({
      messages: nextMessages,
      metadata: createChatRequestMetadata(),
    });
    return true;
  };

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  };

  const resetConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setCooldownUntil(null);
    chatMutation.reset();
    resetChatSessionId();
  };

  const sharedProps = {
    messages,
    input,
    isPending: chatMutation.isPending,
    cooldownRemainingSeconds,
    isSendDisabled:
      !input.trim() || chatMutation.isPending || cooldownRemainingSeconds > 0,
    scrollRef,
    onInputChange: setInput,
    onSubmit: submitMessage,
    onReset: resetConversation,
  };

  if (!isMobile) {
    return (
      <PortfolioChatDesktop
        {...sharedProps}
        textareaRef={panelTextareaRef}
        onKeyDown={handlePanelKeyDown}
        onClose={props.onClose}
      />
    );
  }

  return (
    <PortfolioChatMobile
      {...sharedProps}
      isOpen={mobileDrawerOpen}
      panelTextareaRef={panelTextareaRef}
      onOpenChange={props.onMobileDrawerOpenChange}
      onPanelKeyDown={handlePanelKeyDown}
    />
  );
}
