"use client";

import type { KeyboardEvent, RefObject } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ChatPanel, type PortfolioChatMessage } from "@/components/chat/chat-shared";

type PortfolioChatMobileProps = {
  messages: PortfolioChatMessage[];
  input: string;
  isPending: boolean;
  cooldownRemainingSeconds: number;
  isSendDisabled: boolean;
  isOpen: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
  panelTextareaRef: RefObject<HTMLTextAreaElement | null>;
  onOpenChange?: (open: boolean) => void;
  onInputChange: (value: string) => void;
  onPanelKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
  onReset: () => void;
};

export function PortfolioChatMobile({
  messages,
  input,
  isPending,
  cooldownRemainingSeconds,
  isSendDisabled,
  isOpen,
  scrollRef,
  panelTextareaRef,
  onOpenChange,
  onInputChange,
  onPanelKeyDown,
  onSubmit,
  onReset,
}: PortfolioChatMobileProps) {
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-4xl h-[80dvh]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-3">
            <div className="h-1.5 w-12 rounded-full bg-border" />
          </div>
          <SheetTitle className="sr-only">Ivan Assistant</SheetTitle>
          <ChatPanel
            messages={messages}
            input={input}
            hasConversation={messages.length > 1}
            isPending={isPending}
            cooldownRemainingSeconds={cooldownRemainingSeconds}
            isSendDisabled={isSendDisabled}
            scrollRef={scrollRef}
            textareaRef={panelTextareaRef}
            onInputChange={onInputChange}
            onKeyDown={onPanelKeyDown}
            onSubmit={onSubmit}
            onReset={onReset}
            onClose={() => onOpenChange?.(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
