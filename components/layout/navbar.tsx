"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { usePortfolioChat } from "@/components/layout/portfolio-chat-context";
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
            className="text-[12px] font-black tracking-[-0.04em] text-ink sm:text-[13px]"
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
                className="rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase  text-muted transition-all duration-300 hover:bg-white/[0.04] hover:text-ink sm:text-[11px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleOpenChat ?? undefined}
            aria-label="Open chat with suggestion chip"
            aria-expanded={false}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-white/72 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
          >
            <Sparkles className="size-[0.7rem] text-accent/80" />
            <span className="text-[10px] font-medium tracking-[0.03em]">
              Ask AI
            </span>
            <KbdGroup className="ml-0.5 hidden items-center gap-0.5 border-l border-white/[0.08] pl-1 md:inline-flex">
              <Kbd className="h-4.5 min-w-4.5 rounded-[0.5rem] border-white/[0.08] bg-black/15 px-0.5 text-[8px] text-white/50 shadow-none">
                {isMac ? "⌘" : "Ctrl"}
              </Kbd>
              <Kbd className="h-4.5 min-w-4.5 rounded-[0.5rem] border-white/[0.08] bg-black/15 px-0.5 text-[8px] text-white/50 shadow-none">
                K
              </Kbd>
            </KbdGroup>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
