"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations/motion";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="flex items-center gap-4"
    >
      <h2 className="text-[10px] font-black uppercase tracking-[0.24em] text-muted/56">
        {children}
      </h2>
    </motion.div>
  );
}

export function SectionBlock({
  title,
  children,
  className = "",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${className}`.trim()}>
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-14 sm:mt-16">{children}</div>
    </section>
  );
}
