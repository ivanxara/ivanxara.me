"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { usePortfolioChat } from "@/components/chat/portfolio-chat-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAVBAR_ITEMS } from "@/utils/constants";

export function Navbar({
  progress,
  onOpenChat,
  onNavigateSection,
}: {
  progress: MotionValue<number>;
  onOpenChat?: () => void;
  onNavigateSection?: (target: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");
  const openChatFromContext = usePortfolioChat();
  const handleOpenChat = onOpenChat ?? openChatFromContext;
  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    target: string,
    shouldNavigateLocally: boolean,
  ) => {
    if (!shouldNavigateLocally || !onNavigateSection) {
      return;
    }

    event.preventDefault();
    onNavigateSection(target);
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

  useMotionValueEvent(progress, "change", (value) => {
    setScrolled(value > 0.02);
  });

  return (
    <div className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(14, 14, 16, 0.82)"
            : "rgba(14, 14, 16, 0.4)",
          borderColor: scrolled
            ? "rgba(232, 230, 225, 0.08)"
            : "rgba(232, 230, 225, 0.04)",
        }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-sm sm:max-w-md flex-col overflow-hidden rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-6">
          <Link
            href={isHome ? "#top" : "/#top"}
            onClick={(event) => handleSectionClick(event, "#top", isHome)}
            className="text-[12px] font-black tracking-[-0.04em] text-foreground sm:text-[13px]"
          >
            ivan xará ✌️
          </Link>

          <nav
            aria-label="Section navigation"
            className="hidden flex-wrap items-center justify-end gap-0 md:flex"
          >
            {NAVBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={getNavHref(item.href)}
                onClick={(event) =>
                  handleSectionClick(
                    event,
                    item.href,
                    isHome || (isProjectPage && item.href === "#contact"),
                  )
                }
                className="rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase text-muted-foreground transition-all duration-300 hover:bg-white/[0.04] hover:text-foreground sm:text-[11px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            type="button"
            variant="glass"
            size="nav-chip"
            onClick={handleOpenChat ?? undefined}
            aria-label="Open chat with suggestion chip"
            aria-expanded={false}
            className="hidden md:inline-flex"
          >
            <Sparkles className="size-3 text-primary" />
            <span className="text-[11px] font-medium tracking-[0.03em]">
              Ask AI
            </span>
          </Button>

          <DropdownMenu
            open={isMobileNavOpen}
            onOpenChange={setIsMobileNavOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="glass"
                size="icon-sm"
                aria-label="Open navigation menu"
                aria-expanded={isMobileNavOpen}
                className="md:hidden"
              >
                <Menu className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={10}
              className="w-56 rounded-[1.25rem] border border-white/[0.08] bg-[#141416]/95 p-2 text-white shadow-[0_18px_48px_rgba(0,0,0,0.42)] backdrop-blur-xl md:hidden"
            >
              <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/45">
                Navigation
              </DropdownMenuLabel>
              <nav
                aria-label="Mobile section navigation"
                className="flex flex-col gap-1"
              >
                {NAVBAR_ITEMS.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="rounded-2xl px-0 py-0 focus:bg-white/[0.06] focus:text-white"
                  >
                    <Link
                      href={getNavHref(item.href)}
                      onClick={(event) => {
                        handleSectionClick(
                          event,
                          item.href,
                          isHome || (isProjectPage && item.href === "#contact"),
                        );
                        setIsMobileNavOpen(false);
                      }}
                      className="block rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-muted-foreground transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </nav>
              <DropdownMenuSeparator className="mx-0 my-2 bg-white/[0.08]" />
              <DropdownMenuItem
                onSelect={() => {
                  handleOpenChat?.();
                  setIsMobileNavOpen(false);
                }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-white/72 focus:bg-white/[0.06] focus:text-white"
              >
                <Sparkles className="size-4 text-primary" />
                Ask AI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </div>
  );
}
