"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ImperativePanelHandle,
} from "@/components/ui/resizable";
import { PortfolioChatProvider } from "@/components/chat/portfolio-chat-context";
import { PortfolioChat } from "@/components/chat/portfolio-chat";
import { ChevronLeft } from "lucide-react";

const CHAT_OPEN_SIZE = 30;
const CHAT_PEEK_SIZE = 5;
const CHAT_COLLAPSED_ARROW_SIZE = 18;
const CHAT_COLLAPSED_ARROW_PADDING = 12;
const CHAT_COLLAPSED_FALLBACK_SIZE = 2.2;
const CHAT_MIN_SIZE = 24;
const CHAT_MAX_SIZE = 52;
const CHAT_FOCUS_EVENT = "portfolio-chat:focus-input";
const DESKTOP_CHAT_MEDIA_QUERY = "(min-width: 64rem)";
const FRAME_GLOW_BACKGROUND =
  "radial-gradient(circle at 14% 18%, rgba(196, 168, 130, 0.06), transparent 18%), radial-gradient(circle at 84% 22%, rgba(130, 150, 196, 0.04), transparent 15%)";
type DesktopChatState = "collapsed" | "peeking" | "open";

function getChatCollapsedSize() {
  const collapsedWidth =
    CHAT_COLLAPSED_ARROW_SIZE + CHAT_COLLAPSED_ARROW_PADDING * 2;

  return (collapsedWidth / window.innerWidth) * 100;
}

export function PortfolioLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const chatPanelRef = useRef<ImperativePanelHandle>(null);
  const [desktopChatState, setDesktopChatState] =
    useState<DesktopChatState>("collapsed");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  const [chatCollapsedSize, setChatCollapsedSize] = useState(
    CHAT_COLLAPSED_FALLBACK_SIZE,
  );
  const isStandaloneRoute = pathname.startsWith("/secret/chats/");
  const isChatOpen = desktopChatState === "open";
  const isChatPeeking = desktopChatState === "peeking";
  const isChatCollapsed = desktopChatState !== "open";
  const chatPreviewOpacity = isChatOpen
    ? "opacity-100"
    : isChatPeeking
      ? "opacity-50"
      : "opacity-10";
  const chatChevronOpacity = isChatPeeking ? "opacity-70" : "opacity-40";
  const isDesktopViewport = () =>
    window.matchMedia(DESKTOP_CHAT_MEDIA_QUERY).matches;

  const focusChatInput = () => {
    window.dispatchEvent(new CustomEvent(CHAT_FOCUS_EVENT));
  };

  const openChat = () => {
    if (isDesktopViewport()) {
      setDesktopChatState("open");
      chatPanelRef.current?.resize(CHAT_OPEN_SIZE);
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
      if (!isChatOpen) {
        openChat();
        return;
      }

      setDesktopChatState("collapsed");
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

  const peekChat = () => {
    if (!isDesktopViewport() || desktopChatState !== "collapsed") {
      return;
    }

    setDesktopChatState("peeking");
    chatPanelRef.current?.resize(CHAT_PEEK_SIZE);
  };

  const collapseChatPreview = () => {
    if (!isDesktopViewport() || desktopChatState !== "peeking") {
      return;
    }

    setDesktopChatState("collapsed");
    chatPanelRef.current?.collapse();
  };

  useEffect(() => {
    if (isStandaloneRoute) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "k"
      ) {
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
  }, [desktopChatState, isStandaloneRoute]);

  useEffect(() => {
    if (isStandaloneRoute) {
      return;
    }

    const syncCollapsedSize = () => {
      const nextSize = getChatCollapsedSize();
      setChatCollapsedSize(nextSize);

      if (desktopChatState === "collapsed") {
        chatPanelRef.current?.resize(nextSize);
      }
    };

    syncCollapsedSize();
    window.addEventListener("resize", syncCollapsedSize);

    return () => {
      window.removeEventListener("resize", syncCollapsedSize);
    };
  }, [desktopChatState, isStandaloneRoute]);

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
              direction="horizontal"
              variant="layout"
            >
              <ResizablePanel
                defaultSize={100 - chatCollapsedSize}
                minSize={0}
                variant="content"
              >
                {children}
              </ResizablePanel>

              <ResizableHandle
                variant="divider"
                collapsed={!isChatOpen}
                disabled={!isChatOpen}
                onDoubleClick={() => {
                  setDesktopChatState("collapsed");
                  chatPanelRef.current?.collapse();
                }}
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors duration-200 group-hover:bg-border" />
              </ResizableHandle>

              <ResizablePanel
                ref={chatPanelRef}
                defaultSize={chatCollapsedSize}
                minSize={chatCollapsedSize}
                maxSize={CHAT_MAX_SIZE}
                collapsible
                collapsedSize={chatCollapsedSize}
                onCollapse={() => setDesktopChatState("collapsed")}
                onResize={(size) => {
                  if (desktopChatState === "open" && size <= CHAT_MIN_SIZE) {
                    setDesktopChatState("collapsed");
                    chatPanelRef.current?.collapse();
                  }
                }}
                variant="sidebar"
              >
                <div className="h-full w-full relative">
                  {!isChatOpen && (
                    <div
                      className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${chatChevronOpacity}`}
                      style={{
                        paddingInline: CHAT_COLLAPSED_ARROW_PADDING,
                      }}
                    >
                      <ChevronLeft
                        className="text-sidebar-foreground"
                        size={CHAT_COLLAPSED_ARROW_SIZE}
                        strokeWidth={2.25}
                      />
                    </div>
                  )}
                  <div
                    className={`h-full overflow-hidden transition-opacity duration-200 ${chatPreviewOpacity} ${
                      isChatPeeking
                        ? "cursor-pointer"
                        : isChatOpen
                          ? ""
                          : "cursor-ew-resize"
                    }`}
                    onClick={() => {
                      if (isChatPeeking) {
                        openChat();
                      }
                    }}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        peekChat();
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") {
                        collapseChatPreview();
                      }
                    }}
                  >
                    <div
                      className={`h-full ${isChatOpen ? "" : "pointer-events-none"}`}
                    >
                      <PortfolioChat
                        onClose={() => {
                          setDesktopChatState("collapsed");
                          chatPanelRef.current?.collapse();
                        }}
                      />
                    </div>
                  </div>
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
