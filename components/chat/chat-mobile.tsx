"use client";

import type { KeyboardEvent, RefObject } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
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
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="h-[80svh] max-h-[80svh] rounded-t-4xl border-border bg-sidebar p-0 text-sidebar-foreground outline-none">
        <DrawerTitle className="sr-only">Ivan Assistant</DrawerTitle>
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
      </DrawerContent>
    </Drawer>
  );
}
