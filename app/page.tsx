"use client";

import { PortfolioChat } from "@/components/portfolio-chat";
import { PortfolioScreen } from "@/components/portfolio-screen";

export default function Page() {
  return (
    <main className="h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="frame-glow pointer-events-none fixed inset-0" />

      <section className="relative flex h-screen w-full overflow-hidden bg-[var(--frame)]">
        <div className="flex h-full w-full flex-col gap-0 lg:flex-row">
          <PortfolioScreen />
          <PortfolioChat />
        </div>
      </section>
    </main>
  );
}
