"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import relevoAiLanding from "@/assets/img/relevoai_dark_landing.png";
import { PortfolioHeader } from "@/components/layout/header";
import { SectionBlock, SectionTitle } from "@/components/project/section-title";
import { TechnologyBadge } from "@/components/project/technology-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const techStack = [
  {
    key: "nextjs",
    label: "Next.js",
    detail:
      "Used for app structure, routing, server rendering, and API endpoints.",
  },
  {
    key: "typescript",
    label: "TypeScript",
    detail:
      "Used for type safety, shared models, and more reliable frontend and backend code.",
  },
  {
    key: "supabase",
    label: "Supabase",
    detail:
      "Used for authentication, database access, and persisted application data.",
  },
  {
    key: "gemini",
    label: "Gemini AI",
    detail:
      "Used to generate structured AI output from prompts and user-provided context.",
  },
  {
    key: "stripe",
    label: "Stripe",
    detail:
      "Used for payments, subscriptions, billing flows, and webhook-based state updates.",
  },
  {
    key: "tailwind",
    label: "Tailwind CSS",
    detail:
      "Used for building responsive interfaces quickly with reusable utility classes.",
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
            side="bottom"
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
          className="px-6 pb-20 pt-8 sm:px-10 sm:pb-24 sm:pt-10 lg:px-14"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 sm:gap-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.55fr)] lg:items-end">
              <div className="max-w-4xl">
                <p className="mb-5 text-[10px] font-black uppercase tracking-[0.26em] text-accent/75">
                  Project Case Study
                </p>
                <h1 className="text-[clamp(4.2rem,11vw,9rem)] font-black leading-[0.84] tracking-[-0.08em] text-ink">
                  relevoai
                </h1>
              </div>

              <div className="max-w-sm lg:justify-self-end">
                <p className="text-[13px] leading-[1.85] text-muted">
                  Full-stack trading SaaS with AI-generated plans, protected
                  dashboard flows, and subscription-based access.
                </p>
                <div className="mt-6 h-px w-full bg-ink/8" />
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted/72">
                  <span>Full-stack</span>
                  <span>AI workflow</span>
                  <span>Subscriptions</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.4rem] bg-[#0d0f14] shadow-[0_36px_90px_rgba(0,0,0,0.14)]">
              <Image
                src={relevoAiLanding}
                alt="Relevo AI landing page"
                priority
                className="h-auto w-full"
                sizes="100vw"
              />
            </div>
          </div>
        </section>

        <section className="text-ink">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-14 sm:px-10 sm:pb-28 sm:pt-16 lg:px-14 lg:pt-20">
            <SectionBlock title="Goal / Description">
              <div className="max-w-4xl">
                <h2 className="max-w-3xl text-[clamp(2rem,4.3vw,4.2rem)] font-black leading-[0.94] tracking-[-0.075em] text-ink">
                  Full-stack SaaS for AI-generated trading plans.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-[1.95] text-muted sm:text-[15px]">
                  RelevoAI combines a landing page, Supabase authentication, a
                  protected dashboard, chart capture, Gemini-based analysis, and
                  Stripe subscriptions in one full product flow.
                </p>

                <div className="mt-24">
                  <SectionTitle>Stack</SectionTitle>
                  <div className="mt-10">
                    <TechRow />
                  </div>
                </div>
              </div>
            </SectionBlock>

            <SectionBlock title="Key Features" className="pt-8 sm:pt-10">
              <div className="max-w-4xl">
                <p className="max-w-2xl text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-[0.98] tracking-[-0.06em] text-ink">
                  The core work is in the pipeline: capture market data,
                  validate access, generate structured output, and turn it into
                  a clear product experience.
                </p>

                <div className="mt-14 space-y-10">
                  {featureCards.map((feature) => (
                    <article
                      key={feature.id}
                      className="border-t border-ink/8 pt-8 first:border-t-0 first:pt-0"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-accent/78">
                        {feature.id}
                      </span>
                      <h3 className="mt-3 max-w-xl text-[clamp(1.3rem,2vw,1.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-ink">
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted">
                        {feature.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </SectionBlock>
          </div>
        </section>
      </div>
    </div>
  );
}
