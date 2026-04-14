"use client";

import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { navigationItems } from "@/components/website/content";

export function PortfolioHeader({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    setScrolled(value > 0.02);
  });

  return (
    <div className="sticky top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
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
          <a
            href="#top"
            className="text-[12px] font-black tracking-[-0.04em] text-ink sm:text-[13px]"
          >
            ivan xara ✌️
          </a>

          <nav
            aria-label="Section navigation"
            className="flex flex-wrap items-center justify-end gap-0"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase  text-muted transition-all duration-300 hover:bg-white/[0.04] hover:text-ink sm:text-[11px]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.div>
    </div>
  );
}
