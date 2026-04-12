"use client";

import { useRef, useState } from "react";
import { PortfolioChat } from "@/components/portfolio-chat";
import { PortfolioScreen } from "@/components/portfolio-screen";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";

export default function Page() {
  const chatPanelRef = useRef<ImperativePanelHandle>(null);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const toggleChatPanel = () => {
    if (chatPanelRef.current?.isCollapsed()) {
      chatPanelRef.current.expand(32);
      return;
    }

    chatPanelRef.current?.collapse();
  };

  return (
    <main className="h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="frame-glow pointer-events-none fixed inset-0" />

      <section className="relative flex h-screen w-full overflow-hidden bg-[var(--frame)]">
        <div className="flex h-full w-full flex-col gap-0 lg:hidden">
          <PortfolioScreen />
          <PortfolioChat />
        </div>

        <PanelGroup
          autoSaveId="portfolio-layout"
          direction="horizontal"
          className="hidden h-full w-full lg:flex"
        >
          <Panel defaultSize={58} minSize={42}>
            <PortfolioScreen />
          </Panel>

          <PanelResizeHandle
            onDoubleClick={toggleChatPanel}
            className="group relative flex w-16 items-stretch justify-center bg-[var(--frame)] focus:outline-none"
          >
            <div className="pointer-events-none my-4 flex w-full items-center justify-center">
              <div className="h-full w-px rounded-full bg-white/8 transition-colors duration-200 group-hover:bg-white/18 group-focus:bg-white/18" />
            </div>

            <button
              type="button"
              aria-label={isChatCollapsed ? "Expand chat" : "Collapse chat"}
              aria-expanded={!isChatCollapsed}
              onClick={toggleChatPanel}
              className={`absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[#181818] text-white/72 transition-all duration-200 hover:text-white ${
                isChatCollapsed
                  ? "top-1/2 -translate-y-1/2 opacity-100"
                  : "top-6 opacity-0 group-hover:opacity-100 focus:opacity-100"
              }`}
            >
              {isChatCollapsed ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </PanelResizeHandle>

          <Panel
            ref={chatPanelRef}
            defaultSize={42}
            minSize={18}
            collapsible
            collapsedSize={0}
            onCollapse={() => setIsChatCollapsed(true)}
            onExpand={() => setIsChatCollapsed(false)}
          >
            <PortfolioChat />
          </Panel>
        </PanelGroup>
      </section>
    </main>
  );
}
