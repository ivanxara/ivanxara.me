"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { PortfolioBackdrop } from "@/components/layout/portfolio-backdrop";
import { PortfolioHeader } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";

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
        <PortfolioBackdrop progress={progress} />

        <div
          ref={scrollRef}
          className="portfolio-scroll relative flex-1 overflow-y-auto"
        >
          <div className="group mx-auto flex w-full max-w-6xl flex-col px-6 pb-10 pt-4 sm:px-8 sm:pb-12 sm:pt-5 lg:px-12">
            <PortfolioHeader progress={progress} onOpenChat={onOpenChat} />
            <HeroSection progress={progress} />
            <ExperienceSection progress={progress} />
            <AboutSection progress={progress} />
            <ProjectsSection progress={progress} />
          </div>

          <ContactSection progress={progress} />
        </div>
      </div>
    </aside>
  );
}
