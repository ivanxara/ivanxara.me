"use client";

import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Removed Lenis due to installation issues.
  // Using native CSS smooth scroll instead.
  return <>{children}</>;
}
