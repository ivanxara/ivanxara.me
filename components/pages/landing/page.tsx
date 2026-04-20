"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { PortfolioBackdrop } from "@/components/layout/portfolio-backdrop";
import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionAbout } from "@/components/pages/landing/_components/section-about";
import { Footer } from "@/components/layout/footer";
import { SectionExperience } from "@/components/pages/landing/_components/section-experience";
import { SectionHero } from "@/components/pages/landing/_components/section-hero";
import { SectionProjects } from "@/components/pages/landing/_components/section-projects";

export function PortfolioScreen({ onOpenChat }: { onOpenChat?: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });

  return (
    <aside className="flex h-full w-full bg-frame p-3 sm:p-4">
      <div className="noise-overlay relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-paper">
        {/* <PortfolioBackdrop progress={progress} /> */}

        <div
          ref={scrollRef}
          className="portfolio-scroll relative flex-1 overflow-y-auto"
        >
          <Navbar progress={progress} onOpenChat={onOpenChat} />

          <PageWrapper>
            <SectionHero progress={progress} />
            <SectionExperience progress={progress} />
            <SectionAbout progress={progress} />
            <SectionProjects progress={progress} />
          </PageWrapper>

          <Footer progress={progress} />
        </div>
      </div>
    </aside>
  );
}
