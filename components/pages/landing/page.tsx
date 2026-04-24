"use client";

import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionAbout } from "@/components/pages/landing/_components/section-about";
import { Footer } from "@/components/layout/footer";
import { SectionExperience } from "@/components/pages/landing/_components/section-experience";
import { SectionHero } from "@/components/pages/landing/_components/section-hero";
import { SectionProjects } from "@/components/pages/landing/_components/section-projects";

export function PortfolioScreen({ onOpenChat }: { onOpenChat?: () => void }) {
  return (
    <aside className="w-full bg-card lg:flex lg:h-full lg:bg-sidebar lg:p-4">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-card lg:h-full lg:overflow-hidden lg:rounded-4xl lg:noise-overlay">
        <div className="portfolio-scroll relative overflow-x-clip lg:min-h-0 lg:flex-1 lg:overflow-x-hidden lg:overflow-y-auto">
          <Navbar onOpenChat={onOpenChat} />

          <PageWrapper>
            <SectionHero />
            <SectionExperience />
            <SectionAbout />
            <SectionProjects />
          </PageWrapper>

          <Footer />
        </div>
      </div>
    </aside>
  );
}
