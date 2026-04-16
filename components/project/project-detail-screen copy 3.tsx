"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import relevoAiLanding from "@/assets/img/relevoai_dark_landing.png";
import { PortfolioBackdrop } from "@/components/layout/portfolio-backdrop";
import { PortfolioHeader } from "@/components/layout/header";
import { SectionTitle } from "@/components/project/section-title";
import { TechnologyBadge } from "@/components/project/technology-badge";

const techStack = [
  { key: "nextjs", label: "Next.js" },
  { key: "typescript", label: "TypeScript" },
  { key: "supabase", label: "Supabase" },
  { key: "gemini", label: "Gemini AI" },
  { key: "stripe", label: "Stripe" },
  { key: "tailwind", label: "Tailwind" },
] as const;

const highlights = [
  {
    id: "01",
    title: "Landing to app flow",
    copy: "A single product journey spanning marketing, signup, account access, and premium upgrade moments.",
  },
  {
    id: "02",
    title: "AI analysis workflow",
    copy: "Trading-plan generation built around asset selection, settings, loading states, and a clearer results surface.",
  },
  {
    id: "03",
    title: "Subscription architecture",
    copy: "Stripe was integrated into the product flow itself so billing and gated access felt native to the experience.",
  },
];

function HeroPoster() {
  return (
    <section id="top" className="pt-10 sm:pt-12">
      <div className="relative overflow-hidden bg-[#07080b] shadow-[0_40px_120px_rgba(0,0,0,0.34)]">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,7,10,0.08),rgba(6,7,10,0.2)_34%,rgba(6,7,10,0.78)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(75,107,255,0.18),transparent_22%)]" />

        <Image
          src={relevoAiLanding}
          alt="Relevo AI landing page"
          priority
          className="h-[70svh] min-h-[34rem] w-full object-cover object-top lg:h-[82svh] lg:min-h-[46rem]"
          sizes="(min-width: 1280px) 1200px, 100vw"
        />

        <div className="absolute inset-x-5 bottom-5 z-20 sm:inset-x-8 sm:bottom-8">
          <div className="max-w-4xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent/90">
              development case study
            </p>
            <h1 className="mt-4 text-[clamp(3.4rem,10vw,8.2rem)] font-black leading-[0.84] tracking-[-0.09em] text-white">
              relevoai
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-[1.85] text-white/60 sm:text-[15px]">
              AI trading platform focused on premium front-end execution,
              account flows, subscription gating, and productized analysis
              generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:max-w-3xl">
      {techStack.map((technology) => (
        <div key={technology.key} className="flex items-center gap-3">
          <TechnologyBadge technology={technology.key} compact />
          <span className="text-sm font-semibold tracking-[-0.02em] text-ink-secondary">
            {technology.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetailScreen({
  onOpenChat,
}: {
  onOpenChat?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });

  return (
    <aside className="flex h-full w-full bg-frame p-3 sm:p-4 lg:pr-0">
      <div className="noise-overlay relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-paper">
        <PortfolioBackdrop progress={progress} />

        <div
          ref={scrollRef}
          className="portfolio-scroll relative flex-1 overflow-y-auto"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-4 sm:px-8 sm:pt-5 lg:px-12">
            <PortfolioHeader progress={progress} onOpenChat={onOpenChat} />

            <HeroPoster />

            <section className="py-16 sm:py-20">
              <SectionTitle>Goal / Description</SectionTitle>

              <div className="max-w-4xl">
                <h2 className="max-w-3xl text-[clamp(2rem,4.3vw,4.2rem)] font-black leading-[0.94] tracking-[-0.075em] text-ink">
                  Build a premium SaaS product around AI-generated trading
                  analysis without losing clarity.
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-[1.95] text-muted sm:text-[15px]">
                  RelevoAI combines a high-conversion landing page, auth flows,
                  subscription handling, and an analysis dashboard that turns
                  multiple market inputs into a more usable trading-plan
                  experience.
                </p>

                <SectionTitle>Tech Used</SectionTitle>
                <TechGrid />
              </div>
            </section>

            <section className="pb-16 sm:pb-20">
              <SectionTitle>Key Features</SectionTitle>

              <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="max-w-lg">
                  <p className="text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-[0.98] tracking-[-0.06em] text-ink">
                    The page now opens with one dominant visual idea and keeps
                    the technical story underneath it.
                  </p>
                </div>

                <div className="space-y-10">
                  {highlights.map((item) => (
                    <article key={item.id} className="max-w-xl">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-accent/78">
                        {item.id}
                      </span>
                      <h3 className="mt-3 text-[clamp(1.25rem,2vw,1.8rem)] font-black leading-[1.03] tracking-[-0.045em] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.85] text-muted">
                        {item.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}
