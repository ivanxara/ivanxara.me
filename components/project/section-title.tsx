"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations/motion";

export function SectionTitle({ children,  }: { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="mb-12 flex items-center gap-4 sm:mb-14"
    >
      {/* <span className="font-mono text-[11px] text-accent opacity-60">
        {number}
      </span>
      <div className="h-px w-8 bg-accent opacity-20" /> */}
      <h2 className="text-[10px] font-black uppercase tracking-[0.24em] text-muted/56">
        {children}
      </h2>
    </motion.div>
  );
}
