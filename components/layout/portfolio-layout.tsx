"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ImperativePanelHandle,
} from "@/components/ui/resizable";
import { PortfolioChatProvider } from "@/components/chat/portfolio-chat-context";
import { PortfolioChat } from "@/components/chat/portfolio-chat";

const CHAT_OPEN_SIZE = 38;
const CHAT_MIN_SIZE = 24;
const CHAT_MAX_SIZE = 52;
const CHAT_FOCUS_EVENT = "portfolio-chat:focus-input";
const DESKTOP_CHAT_MEDIA_QUERY = "(min-width: 64rem)";
const FRAME_GLOW_BACKGROUND =
  "radial-gradient(circle at 14% 18%, rgba(196, 168, 130, 0.06), transparent 18%), radial-gradient(circle at 84% 22%, rgba(130, 150, 196, 0.04), transparent 15%)";

export function PortfolioLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const chatPanelRef = useRef<ImperativePanelHandle>(null);
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  const isStandaloneRoute = pathname.startsWith("/secret/chats/");
  const isDesktopViewport = () =>
    window.matchMedia(DESKTOP_CHAT_MEDIA_QUERY).matches;

  const focusChatInput = () => {
    window.dispatchEvent(new CustomEvent(CHAT_FOCUS_EVENT));
  };

  const openChat = () => {
    if (isDesktopViewport()) {
      chatPanelRef.current?.resize(CHAT_OPEN_SIZE);
      setIsChatCollapsed(false);
      window.requestAnimationFrame(() => {
        focusChatInput();
      });
      return;
    }

    setIsMobileChatOpen(true);

    window.requestAnimationFrame(() => {
      focusChatInput();
    });
  };

  const toggleChat = () => {
    if (isDesktopViewport()) {
      if (isChatCollapsed) {
        openChat();
        return;
      }

      chatPanelRef.current?.collapse();
      return;
    }

    setIsMobileChatOpen((current) => {
      const next = !current;

      if (!current) {
        window.requestAnimationFrame(() => {
          focusChatInput();
        });
      }

      return next;
    });
  };

  useEffect(() => {
    if (isStandaloneRoute) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
        return;
      }

      const target = event.target;
      const isEditableTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable);
      const isInsideChat =
        target instanceof HTMLElement &&
        Boolean(target.closest("[data-portfolio-chat-root='true']"));

      if (isEditableTarget && !isInsideChat) {
        return;
      }

      event.preventDefault();
      toggleChat();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isChatCollapsed, isStandaloneRoute]);

  useEffect(() => {
    if (isStandaloneRoute) {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_CHAT_MEDIA_QUERY);
    const syncLayout = () => {
      setIsDesktopLayout(mediaQuery.matches);
    };

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncLayout);
    };
  }, [isStandaloneRoute]);

  if (isStandaloneRoute) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div
          className="pointer-events-none fixed inset-0"
          style={{ background: FRAME_GLOW_BACKGROUND }}
        />
        <section className="relative min-h-screen w-full bg-sidebar">
          {children}
        </section>
      </main>
    );
  }

  return (
    <PortfolioChatProvider onOpenChat={toggleChat}>
      <main
        className={`min-h-screen bg-background text-foreground ${
          isDesktopLayout ? "lg:h-screen lg:overflow-hidden" : ""
        }`}
      >
        <div
          className="pointer-events-none fixed inset-0"
          style={{ background: FRAME_GLOW_BACKGROUND }}
        />

        <section
          className={`relative min-h-screen w-full bg-sidebar ${
            isDesktopLayout ? "lg:h-screen lg:overflow-hidden" : ""
          }`}
        >
          {isDesktopLayout ? (
            <ResizablePanelGroup
              autoSaveId="portfolio-layout"
              direction="horizontal"
              variant="layout"
            >
              <ResizablePanel
                defaultSize={100 - CHAT_OPEN_SIZE}
                minSize={0}
                variant="content"
              >
                {children}
              </ResizablePanel>

              <ResizableHandle
                variant="divider"
                collapsed={isChatCollapsed}
                disabled={isChatCollapsed}
                onDoubleClick={() => {
                  chatPanelRef.current?.collapse();
                }}
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors duration-200 group-hover:bg-border" />
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
                variant="sidebar"
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
          ) : (
            <div className="flex min-h-screen w-full flex-col">
              {children}
              <PortfolioChat
                variant="mobile"
                mobileSheetOpen={isMobileChatOpen}
                onMobileSheetOpenChange={setIsMobileChatOpen}
              />
            </div>
          )}
        </section>
      </main>
    </PortfolioChatProvider>
  );
}
