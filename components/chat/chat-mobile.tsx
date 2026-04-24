"use client";

import type { KeyboardEvent, RefObject } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const assistantMessagesCount =
    messages.filter((msg) => msg.role === "assistant").length - 1;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-10 z-40 flex justify-center px-4 min-[1080px]:hidden">
        <div className="pointer-events-auto w-fit">
          <Button
            type="button"
            variant="glass"
            size="lg"
            onClick={() => onOpenChange?.(true)}
            title="Open chat"
            className="relative h-12 w-full rounded-full border-white/[0.1] bg-[#141416]/90 px-5 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(0,0,0,0.42)] backdrop-blur-xl"
          >
            <MessageCircle className="size-4" />
            Ask about me
            {assistantMessagesCount > 0 && (
              <span className="absolute right-3 top-1/2 inline-flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-black text-background">
                {assistantMessagesCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-4xl h-[80dvh]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-3">
            <div className="h-1.5 w-12 rounded-full bg-white/12" />
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
