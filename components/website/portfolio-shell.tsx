"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { PortfolioChat } from "@/components/portfolio-chat";

export function PortfolioShell({ screen }: { screen: ReactNode }) {
  const chatPanelRef = useRef<ImperativePanelHandle>(null);
  const hasInitializedWideLayout = useRef(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const [isWideLayout, setIsWideLayout] = useState(false);

  const chatScreen = <PortfolioChat />;

  const toggleChatPanel = () => {
    if (chatPanelRef.current?.isCollapsed()) {
      chatPanelRef.current.expand(32);
      return;
    }

    chatPanelRef.current?.collapse();
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1480px)");
    const updateLayout = () => setIsWideLayout(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (!isWideLayout) {
      hasInitializedWideLayout.current = false;
      setIsChatCollapsed(true);
      return;
    }

    if (hasInitializedWideLayout.current) {
      return;
    }

    hasInitializedWideLayout.current = true;
    chatPanelRef.current?.collapse();
  }, [isWideLayout]);

  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <div className="frame-glow pointer-events-none fixed inset-0" />

      <section className="relative flex h-screen w-full overflow-hidden bg-frame">
        {!isWideLayout && (
          <div className="flex h-full w-full flex-col gap-0">
            {screen}
            <div className="min-h-[34rem]">{chatScreen}</div>
          </div>
        )}

        {isWideLayout && (
          <PanelGroup
            autoSaveId="portfolio-layout"
            direction="horizontal"
            className="h-full w-full"
          >
            <Panel defaultSize={58} minSize={42} className="min-w-0 overflow-hidden">
              {screen}
            </Panel>

            <PanelResizeHandle
              onClick={toggleChatPanel}
              onDoubleClick={toggleChatPanel}
              aria-label={isChatCollapsed ? "Expand chat" : "Collapse chat"}
              aria-expanded={!isChatCollapsed}
              className="group relative flex w-3 shrink-0 cursor-col-resize items-stretch justify-center bg-frame focus:outline-none"
            >
              <div className="pointer-events-none my-4 flex w-full items-center justify-center">
                <div className="h-full w-px rounded-full bg-white/8 transition-colors duration-200 group-hover:bg-white/18 group-focus:bg-white/18" />
              </div>
            </PanelResizeHandle>

            <Panel
              ref={chatPanelRef}
              defaultSize={42}
              minSize={18}
              collapsible
              collapsedSize={0}
              onCollapse={() => setIsChatCollapsed(true)}
              onExpand={() => setIsChatCollapsed(false)}
              className="min-w-0 overflow-hidden"
            >
              {chatScreen}
            </Panel>
          </PanelGroup>
        )}
      </section>
    </main>
  );
}
