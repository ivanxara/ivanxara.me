"use client";

import type { KeyboardEvent, RefObject } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  ChatPanel,
  getSubmitTitle,
  type PortfolioChatMessage,
} from "@/components/chat/chat-shared";

type PortfolioChatMobileProps = {
  messages: PortfolioChatMessage[];
  input: string;
  isPending: boolean;
  cooldownRemainingSeconds: number;
  isSendDisabled: boolean;
  isOpen: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
  composerTextareaRef: RefObject<HTMLTextAreaElement | null>;
  panelTextareaRef: RefObject<HTMLTextAreaElement | null>;
  onOpenChange?: (open: boolean) => void;
  onInputChange: (value: string) => void;
  onPanelKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onComposerKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
  onSubmitFromComposer: () => void;
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
  composerTextareaRef,
  panelTextareaRef,
  onOpenChange,
  onInputChange,
  onPanelKeyDown,
  onComposerKeyDown,
  onSubmit,
  onSubmitFromComposer,
  onReset,
}: PortfolioChatMobileProps) {
  const assistantMessagesCount =
    messages.filter((msg) => msg.role === "assistant").length - 1;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-10 z-40 flex justify-center px-4 min-[1080px]:hidden">
        <div className="pointer-events-auto w-full max-w-sm  md:max-w-md">
          <div className="rounded-4xl bg-sidebar shadow-lg">
            <div
              data-portfolio-chat-root="true"
              className="flex items-center gap-2 px-2 py-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange?.(true)}
                title="Open chat"
                className="shrink-0 relative"
              >
                <MessageCircle className="h-4 w-4" />
                {assistantMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                    {assistantMessagesCount}
                  </span>
                )}
              </Button>
              <textarea
                ref={composerTextareaRef}
                value={input}
                onChange={(event) => onInputChange(event.target.value)}
                onKeyDown={onComposerKeyDown}
                placeholder="Ask about Ivan..."
                rows={1}
                className="min-h-10 max-h-24 flex-1 resize-none bg-transparent px-1 py-2 text-[14px] text-foreground placeholder:text-muted-foreground/90 focus:outline-none"
              />
              <Button
                type="button"
                variant="chat-send"
                size="icon"
                onClick={onSubmitFromComposer}
                disabled={isSendDisabled}
                title={getSubmitTitle(cooldownRemainingSeconds)}
                className="shrink-0"
              >
                {cooldownRemainingSeconds > 0 ? (
                  <span className="text-[11px] font-semibold">
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

      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-4xl max-h-[85dvh]">
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
