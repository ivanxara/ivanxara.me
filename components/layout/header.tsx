"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { navigationItems } from "@/config/portfolio-content";
import { usePortfolioChat } from "@/components/layout/portfolio-chat-context";

export function PortfolioHeader({
  progress,
  onOpenChat,
}: {
  progress: MotionValue<number>;
  onOpenChat?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const openChatFromContext = usePortfolioChat();
  const handleOpenChat = onOpenChat ?? openChatFromContext;

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
        className="mx-auto flex w-fit max-w-full flex-col overflow-hidden rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-6">
          <Link
            href={isHome ? "#top" : "/#top"}
            className="text-[12px] font-black tracking-[-0.04em] text-ink sm:text-[13px]"
          >
            ivan xara ✌️
          </Link>

          <nav
            aria-label="Section navigation"
            className="flex flex-wrap items-center justify-end gap-0"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={isHome ? item.href : `/${item.href}`}
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
            className="flex px-2.5 py-1.5 cursor-pointer items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/72 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
          >
            <Sparkles className="size-3 text-accent/80" />
            <span className="text-[11px] font-medium tracking-[0.06em]">
              Ask AI
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
