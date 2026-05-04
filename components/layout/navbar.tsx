"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePortfolioChat } from "@/components/chat/portfolio-chat-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAVBAR_ITEMS } from "@/utils/constants";
import { trackVisitorClick } from "@/utils/visitor-clicks";

export function Navbar({ onOpenChat }: { onOpenChat?: () => void }) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");
  const openChatFromContext = usePortfolioChat();
  const handleOpenChat = onOpenChat ?? openChatFromContext;
  const trackAskAiClick = () => {
    trackVisitorClick({
      clickId: "ask_ai",
    });
  };
  const getNavHref = (target: string) => {
    if (isHome) {
      return target;
    }

    if (isProjectPage && target === "#contact") {
      return "#contact";
    }

    return `/${target}`;
  };
  const isActiveNavItem = (href: string) => isHome && activeSection === href;

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        navbarRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsMobileNavOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const sections = NAVBAR_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    ).filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const scrollContainer =
      navbarRef.current?.closest<HTMLElement>(".portfolio-scroll") ?? null;
    const scrollRoot =
      scrollContainer &&
      scrollContainer.scrollHeight > scrollContainer.clientHeight
        ? scrollContainer
        : null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        root: scrollRoot,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <div className="sticky top-0 z-30 px-3 pt-3">
      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-0 bg-background/20 backdrop-blur-[1px] md:hidden" />
      ) : null}
      <div
        ref={navbarRef}
        className="relative z-10 mx-auto flex w-full max-w-[min(92vw,22rem)] flex-col overflow-visible rounded-[1.45rem] border border-border bg-background/80 px-1.5 py-1 shadow-sm backdrop-blur-md md:max-w-fit md:rounded-full"
      >
        <div className="flex h-9 items-center justify-between gap-1.5 px-2">
          <Link
            href={isHome ? "#top" : "/#top"}
            className="min-w-0 rounded-full px-2.5 py-1 text-xs font-black tracking-[-0.04em] text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
          >
            ivan xará ✌️
          </Link>

          <div className="hidden h-4 w-px bg-border md:block" />

          <nav
            aria-label="Section navigation"
            className="hidden items-center md:flex gap-1"
          >
            {NAVBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={getNavHref(item.href)}
                aria-current={isActiveNavItem(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
                  isActiveNavItem(item.href) &&
                    "bg-accent text-accent-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}

            <>
              <div className="hidden h-4 w-px bg-border md:block" />

              <Button
                type="button"
                variant="unstyled"
                size="xs"
                onClick={() => {
                  trackAskAiClick();
                  handleOpenChat?.();
                }}
                className="rounded-full px-2.5 py-1 text-xs font-medium tracking-wide text-primary transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
              >
                <Sparkles className="size-3" />
                Ask AI
              </Button>
            </>
          </nav>

          <Button
            type="button"
            variant="unstyled"
            size="xs"
            onClick={() => {
              trackAskAiClick();
              handleOpenChat?.();
              setIsMobileNavOpen(false);
            }}
            className="ml-auto rounded-full px-2.5 py-1 text-xs font-medium tracking-wide text-primary transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground md:hidden"
          >
            <Sparkles className="size-3" />
            Ask AI
          </Button>

          <Button
            type="button"
            variant="unstyled"
            size="icon-xs"
            aria-label={
              isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMobileNavOpen((current) => !current)}
            className="rounded-full text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground md:hidden"
          >
            {isMobileNavOpen ? (
              <X className="size-3.5" />
            ) : (
              <Menu className="size-3.5" />
            )}
          </Button>

          {isMobileNavOpen ? (
            <div
              id="mobile-navigation-menu"
              role="menu"
              className="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-border bg-background/95 p-2 text-foreground shadow-sm backdrop-blur-md md:hidden"
            >
              <nav
                aria-label="Mobile section navigation"
                className="flex flex-col"
              >
                {NAVBAR_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={getNavHref(item.href)}
                    role="menuitem"
                    aria-current={
                      isActiveNavItem(item.href) ? "page" : undefined
                    }
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      "flex min-h-10 w-full items-center rounded-full px-3 py-2 text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      isActiveNavItem(item.href) &&
                        "bg-accent text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
