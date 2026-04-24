"use client";

import type { ReactNode } from "react";
import { AnimationReveal } from "@/components/animations";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <AnimationReveal amount={0.4} className="flex items-center gap-4">
      <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/56">
        {children}
      </h2>
    </AnimationReveal>
  );
}
