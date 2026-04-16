"use client";

import {
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ImperativePanelHandle,
} from "@/components/ui/resizable";
import { PortfolioChatProvider } from "@/components/layout/portfolio-chat-context";
import { PortfolioChat } from "@/components/shared/portfolio-chat";

const CHAT_OPEN_SIZE = 32;
const CHAT_MIN_SIZE = 8;
const CHAT_MAX_SIZE = 45;

export function PortfolioLayout({ children }: { children: ReactNode }) {
  const chatPanelRef = useRef<ImperativePanelHandle>(null);
  const mobileChatRef = useRef<HTMLDivElement>(null);
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);

  const openChat = () => {
    if (window.matchMedia("(min-width: 1480px)").matches) {
      chatPanelRef.current?.resize(CHAT_OPEN_SIZE);
      setIsChatCollapsed(false);
      return;
    }

    mobileChatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const content = isValidElement(children)
    ? cloneElement(children as ReactElement<{ onOpenChat?: () => void }>, {
        onOpenChat: openChat,
      })
    : children;

  return (
    <PortfolioChatProvider onOpenChat={openChat}>
      <main className="h-screen overflow-hidden bg-background text-foreground">
        <div className="frame-glow pointer-events-none fixed inset-0" />

        <section className="relative h-screen w-full overflow-hidden bg-frame">
          <div className="flex h-full w-full flex-col min-[1480px]:hidden">
            {content}
            <div ref={mobileChatRef} className="min-h-[34rem]">
              <PortfolioChat />
            </div>
          </div>

          <div className="hidden h-full w-full min-[1480px]:flex">
            <ResizablePanelGroup
              autoSaveId="portfolio-layout"
              direction="horizontal"
              className="h-full w-full"
            >
              <ResizablePanel
                defaultSize={100 - CHAT_OPEN_SIZE}
                minSize={0}
                className="min-w-0 overflow-hidden"
              >
                {content}
              </ResizablePanel>

              <ResizableHandle
                disabled={isChatCollapsed}
                onDoubleClick={() => {
                  chatPanelRef.current?.collapse();
                }}
                className={`shrink-0 bg-transparent transition-colors duration-200 ${
                  isChatCollapsed
                    ? "pointer-events-none w-0 opacity-0"
                    : "group relative w-4 cursor-col-resize"
                }`}
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.08] transition-colors duration-200 group-hover:bg-white/[0.16]" />
              </ResizableHandle>

              <ResizablePanel
                ref={chatPanelRef}
                defaultSize={CHAT_OPEN_SIZE}
                minSize={CHAT_MIN_SIZE}
                maxSize={CHAT_MAX_SIZE}
                collapsible
                collapsedSize={0}
                onCollapse={() => setIsChatCollapsed(true)}
                onExpand={() => setIsChatCollapsed(false)}
                onResize={(size) => {
                  if (size <= CHAT_MIN_SIZE) {
                    chatPanelRef.current?.collapse();
                  }
                }}
                className="min-w-0 overflow-hidden bg-frame transition-[border-color] duration-200"
              >
                <div
                  className={`h-full overflow-hidden transition-opacity duration-200 ${
                    isChatCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <PortfolioChat onClose={() => chatPanelRef.current?.collapse()} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>
      </main>
    </PortfolioChatProvider>
  );
}
