"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import relevoAiLanding from "@/assets/img/relevoai_dark_landing.png";
import { PortfolioHeader } from "@/components/layout/header";
import { SectionTitle } from "@/components/project/section-title";
import { TechnologyBadge } from "@/components/project/technology-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const techStack = [
  { key: "nextjs", label: "Next.js", detail: "App Router landing, auth, dashboard, and API routes." },
  {
    key: "typescript",
    label: "TypeScript",
    detail: "Shared types for forms, AI output, and database records.",
  },
  {
    key: "supabase",
    label: "Supabase",
    detail: "SSR auth, profile data, subscriptions, and persisted analyses.",
  },
  {
    key: "gemini",
    label: "Gemini AI",
    detail: "Structured JSON trading-plan generation from prompt plus chart images.",
  },
  {
    key: "stripe",
    label: "Stripe",
    detail: "Checkout, billing portal, subscriptions, and webhook sync.",
  },
  {
    key: "tailwind",
    label: "Tailwind CSS",
    detail: "Responsive UI system for landing pages and dashboard screens.",
  },
] as const;

const featureCards = [
  {
    id: "01",
    title: "Analysis Pipeline",
    copy: "TradingView screenshots from multiple timeframes are captured, passed into the server flow, and stored as a completed analysis record in Supabase.",
  },
  {
    id: "02",
    title: "Structured AI Output",
    copy: "Gemini returns structured trading data through a strict schema, including entries, stop loss, take-profit targets, confidence, and tags.",
  },
  {
    id: "03",
    title: "Auth and Billing",
    copy: "Protected routes, subscription checks, Stripe checkout, and webhook processing are connected so access always reflects real billing state.",
  },
] as const;

function TechRow() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {techStack.map((technology) => (
        <Tooltip key={technology.key}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-full border border-ink/10 px-4 py-2 text-left transition-colors hover:border-ink/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              <TechnologyBadge technology={technology.key} compact />
              <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink-secondary">
                {technology.label}
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="max-w-xs rounded-xl bg-ink px-3 py-2 text-[12px] leading-[1.6] text-paper shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
          >
            {technology.detail}
          </TooltipContent>
        </Tooltip>
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
    <div className="h-full bg-paper">
      <div ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden">
        <PortfolioHeader progress={progress} onOpenChat={onOpenChat} />

        <section
          id="top"
          className="pb-14 pt-6 sm:pb-16 sm:pt-8"
        >
          <div className="w-full">
            <div className="relative">
              <Image
                src={relevoAiLanding}
                alt="Relevo AI landing page"
                priority
                className="h-auto w-full"
                sizes="100vw"
              />

              <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-20 lg:px-10 lg:pb-10">
                <div className="max-w-4xl">
                  <h1 className="max-w-4xl text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.065em] text-white">
                    relevoai
                  </h1>
                  <p className="mt-3 max-w-[24rem] text-[12px] leading-[1.8] text-white/72">
                    Full-stack trading SaaS with AI-generated plans, protected
                    dashboard flows, and subscription-based access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-ink">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-14 sm:px-10 sm:pb-28 sm:pt-16 lg:px-14 lg:pt-20">
            <section className="py-12 sm:py-14">
              <SectionTitle>Goal / Description</SectionTitle>

              <div className="max-w-4xl">
                <h2 className="max-w-3xl text-[clamp(2rem,4.3vw,4.2rem)] font-black leading-[0.94] tracking-[-0.075em] text-ink">
                  Full-stack SaaS for AI-generated trading plans.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-[1.95] text-muted sm:text-[15px]">
                  RelevoAI combines a landing page, Supabase authentication, a
                  protected dashboard, chart capture, Gemini-based analysis,
                  and Stripe subscriptions in one full product flow.
                </p>

                <div className="mt-12">
                  <SectionTitle>Stack</SectionTitle>
                  <p className="max-w-2xl text-sm leading-[1.95] text-muted sm:text-[15px]">
                    Next.js App Router powers the app, Supabase handles auth
                    and data, Gemini generates typed AI output, Stripe manages
                    billing, and Puppeteer captures market charts.
                  </p>
                  <TechRow />
                </div>

                <div className="mt-12 max-w-2xl">
                  <SectionTitle>Technical Focus</SectionTitle>
                  <p className="text-sm leading-[1.95] text-muted sm:text-[15px]">
                    The main challenge was connecting AI generation, screenshot
                    capture, subscription gating, and stored analysis results
                    into one reliable end-to-end flow.
                  </p>
                </div>
              </div>
            </section>

            <section className="pt-6 pb-12 sm:pt-8 sm:pb-14">
              <SectionTitle>Key Features</SectionTitle>

              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                <div className="max-w-lg">
                  <p className="text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-[0.98] tracking-[-0.06em] text-ink">
                    The main work is in the pipeline: capture market data,
                    control access, generate structured output, and present it
                    clearly in the dashboard.
                  </p>
                </div>

                <div className="space-y-8">
                  {featureCards.map((feature) => (
                    <article key={feature.id} className="max-w-xl">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-accent/78">
                        {feature.id}
                      </span>
                      <h3 className="mt-3 text-[clamp(1.25rem,2vw,1.8rem)] font-black leading-[1.03] tracking-[-0.045em] text-ink">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.85] text-muted">
                        {feature.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
