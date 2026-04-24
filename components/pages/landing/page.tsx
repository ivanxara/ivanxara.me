"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PortfolioBackdrop } from "@/components/layout/portfolio-backdrop";
import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionAbout } from "@/components/pages/landing/_components/section-about";
import { Footer } from "@/components/layout/footer";
import { SectionExperience } from "@/components/pages/landing/_components/section-experience";
import { SectionHero } from "@/components/pages/landing/_components/section-hero";
import { SectionProjects } from "@/components/pages/landing/_components/section-projects";
import { useResponsiveScrollProgress } from "@/lib/hooks/use-responsive-scroll-progress";

export function PortfolioScreen({ onOpenChat }: { onOpenChat?: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { progress, usesPanelScroll } = useResponsiveScrollProgress(scrollRef);
  const enableDepthMotion = usesPanelScroll && !prefersReducedMotion;
  const scrollToSection = useCallback(
    (hash: string, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      const sectionId = hash.replace(/^#/, "");

      if (!container || !sectionId) {
        return;
      }

      const section = container.querySelector<HTMLElement>(`#${sectionId}`);

      if (!section) {
        return;
      }

      section.scrollIntoView({ behavior, block: "start" });

      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
    },
    [],
  );

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const syncHashScroll = () => {
      if (!window.location.hash) {
        return;
      }

      window.requestAnimationFrame(() => {
        scrollToSection(window.location.hash, "smooth");
      });
    };

    syncHashScroll();
    window.addEventListener("hashchange", syncHashScroll);

    return () => {
      window.removeEventListener("hashchange", syncHashScroll);
    };
  }, [pathname, scrollToSection]);

  return (
    <aside className="w-full bg-card lg:flex lg:h-full lg:bg-sidebar lg:p-4">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-card lg:h-full lg:overflow-hidden lg:rounded-[2.5rem] lg:noise-overlay">
        <PortfolioBackdrop
          progress={progress}
          enableMotion={enableDepthMotion}
        />

        <div
          ref={scrollRef}
          className="portfolio-scroll relative overflow-x-clip lg:min-h-0 lg:flex-1 lg:overflow-x-hidden lg:overflow-y-auto"
        >
          <Navbar
            progress={progress}
            onOpenChat={onOpenChat}
            onNavigateSection={scrollToSection}
          />

          <PageWrapper>
            <SectionHero
              progress={progress}
              enableDepthMotion={enableDepthMotion}
            />
            <SectionExperience
              progress={progress}
              enableDepthMotion={enableDepthMotion}
            />
            <SectionAbout
              progress={progress}
              enableDepthMotion={enableDepthMotion}
            />
            <SectionProjects
              progress={progress}
              enableDepthMotion={enableDepthMotion}
            />
          </PageWrapper>

          <Footer progress={progress} enableDepthMotion={enableDepthMotion} />
        </div>
      </div>
    </aside>
  );
}
