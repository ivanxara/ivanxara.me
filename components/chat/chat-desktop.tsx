"use client";

import type { KeyboardEvent, RefObject } from "react";
import { ChatPanel, type PortfolioChatMessage } from "@/components/chat/chat-shared";

type PortfolioChatDesktopProps = {
  messages: PortfolioChatMessage[];
  input: string;
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

export function PortfolioChatDesktop({
  messages,
  input,
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
}: PortfolioChatDesktopProps) {
  return (
    <div className="h-full min-w-0 lg:min-w-[22rem] xl:min-w-[30rem]">
      <ChatPanel
        messages={messages}
        input={input}
        hasConversation={messages.length > 1}
        isPending={isPending}
        cooldownRemainingSeconds={cooldownRemainingSeconds}
        isSendDisabled={isSendDisabled}
        scrollRef={scrollRef}
        textareaRef={textareaRef}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        onReset={onReset}
        onClose={onClose}
      />
    </div>
  );
}
