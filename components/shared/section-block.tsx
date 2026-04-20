"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./section-title";

export function SectionBlock({
  title,
  children,
  className = "",
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-20", className)}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
