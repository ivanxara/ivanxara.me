"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { usePortfolioChat } from "@/components/layout/portfolio-chat-context";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
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
  const [isMac, setIsMac] = useState(false);
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

  useEffect(() => {
    const navigatorWithUAData = navigator as Navigator & {
      userAgentData?: { platform?: string };
    };
    const platform =
      navigatorWithUAData.userAgentData?.platform ?? navigator.platform ?? "";

    setIsMac(/mac/i.test(platform));
  }, []);

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
        className="mx-auto flex w-fit max-w-full flex-col overflow-hidden rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-6">
          <Link
            href={isHome ? "#top" : "/#top"}
            onClick={(event) => handleSectionClick(event, "#top", isHome)}
            className="text-[12px] font-black tracking-[-0.04em] text-foreground sm:text-[13px]"
          >
            ivan xara ✌️
          </Link>

          <nav
            aria-label="Section navigation"
            className="flex flex-wrap items-center justify-end gap-0"
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
          >
            <Sparkles className="size-[0.7rem] text-primary/80" />
            <span className="text-[10px] font-medium tracking-[0.03em]">
              Ask AI
            </span>
            <KbdGroup variant="navbar">
              <Kbd variant="navbar">
                {isMac ? "⌘" : "Ctrl"}
              </Kbd>
              <Kbd variant="navbar">
                K
              </Kbd>
            </KbdGroup>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
