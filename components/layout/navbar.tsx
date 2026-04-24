"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePortfolioChat } from "@/components/chat/portfolio-chat-context";
import { Button } from "@/components/ui/button";
import { NAVBAR_ITEMS } from "@/utils/constants";

export function Navbar({ onOpenChat }: { onOpenChat?: () => void }) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");
  const openChatFromContext = usePortfolioChat();
  const handleOpenChat = onOpenChat ?? openChatFromContext;
  const getNavHref = (target: string) => {
    if (isHome) {
      return target;
    }

    if (isProjectPage && target === "#contact") {
      return "#contact";
    }

    return `/${target}`;
  };

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

  return (
    <div className="sticky top-0 z-30 px-3 pt-3">
      <div
        ref={navbarRef}
        className="relative mx-auto flex w-full max-w-52 md:max-w-fit flex-col overflow-visible rounded-full border border-border bg-background/80 px-1.5 py-1 shadow-sm backdrop-blur-md"
      >
        <div className="flex h-9 items-center justify-between gap-1.5 px-2">
          <Link
            href={isHome ? "#top" : "/#top"}
            className="rounded-full px-2.5 py-1 text-xs font-black tracking-[-0.04em] text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
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
                className="rounded-full px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
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
                onClick={handleOpenChat ?? undefined}
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
            size="icon-xs"
            aria-label="Open navigation menu"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMobileNavOpen((current) => !current)}
            className="rounded-full text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground md:hidden"
          >
            <Menu className="size-3.5" />
          </Button>

          {isMobileNavOpen ? (
            <div
              id="mobile-navigation-menu"
              role="menu"
              className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-border bg-background p-1.5 text-foreground shadow-sm backdrop-blur-md md:hidden"
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
                    onClick={() => setIsMobileNavOpen(false)}
                    className="flex w-full rounded-full px-2.5 py-1.5 text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="my-1 h-px bg-border" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  handleOpenChat?.();
                  setIsMobileNavOpen(false);
                }}
                className="flex w-full items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium tracking-wide text-primary transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <Sparkles className="size-3.5" />
                Ask AI
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
