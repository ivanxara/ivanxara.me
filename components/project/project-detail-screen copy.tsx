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

// ─── Hero ──────────────────────────────────────────────────────────────────
function HeroPoster() {
  return (
    <section id="top" className="pt-10 sm:pt-12">
      <div className="relative overflow-hidden bg-[#07080b] shadow-[0_60px_140px_rgba(0,0,0,0.42)]">
        {/* Overlays */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,7,10,0.04)_0%,rgba(6,7,10,0.12)_40%,rgba(6,7,10,0.88)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(75,107,255,0.18),transparent_22%)]" />

        {/* Image — full viewport height */}
        <Image
          src={relevoAiLanding}
          alt="Relevo AI landing page"
          priority
          className="h-[100svh] min-h-[40rem] w-full object-cover object-top"
          sizes="(min-width: 1280px) 1200px, 100vw"
        />

        {/* Bottom content block */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
          {/* Thin top divider */}
          <div className="mb-8 h-px w-full bg-white/10" />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Left — identity */}
            <div>
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-accent/80">
                development case study
              </p>
              <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.82] tracking-[-0.1em] text-white">
                relevoai
              </h1>
            </div>

            {/* Right — descriptor chip, aligned to baseline of title */}
            <p className="max-w-xs text-[13px] leading-[1.8] text-white/50 sm:mb-3 sm:text-right">
              AI trading platform focused on premium front‑end execution,
              account flows, subscription gating, and productized analysis
              generation.
            </p>
          </div>
        </div>

        {/* Scroll hint pill */}
        <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 sm:hidden">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 pt-2">
            <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Pills ────────────────────────────────────────────────────────────
function TechRow() {
  return (
    <div className="mt-12 flex flex-wrap gap-3">
      {techStack.map((technology) => (
        <div
          key={technology.key}
          className="flex items-center gap-2.5 rounded-full border border-ink/10 px-4 py-2 transition-colors hover:border-ink/20"
        >
          <TechnologyBadge technology={technology.key} compact />
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink-secondary">
            {technology.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────
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
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-32 pt-4 sm:px-10 sm:pt-5 lg:px-14">
            <PortfolioHeader progress={progress} onOpenChat={onOpenChat} />

            {/* ── Hero ── */}
            <HeroPoster />

            {/* ── Goal / Description ── */}
            <section className="pt-28 sm:pt-36 lg:pt-44">
              {/* Section label */}
              <div className="flex items-center gap-4 pb-16 sm:pb-20">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent/70">
                  01 — Goal
                </span>
                <div className="h-px flex-1 bg-ink/8" />
              </div>

              {/* Full-width headline */}
              <h2 className="text-[clamp(2.2rem,5vw,5rem)] font-black leading-[0.92] tracking-[-0.08em] text-ink">
                Build a premium SaaS product around AI&#8209;generated trading
                analysis without losing clarity.
              </h2>

              {/* Offset body copy — aligns right */}
              <div className="mt-12 flex justify-end">
                <p className="max-w-lg text-[15px] leading-[1.9] text-muted">
                  RelevoAI combines a high‑conversion landing page, auth flows,
                  subscription handling, and an analysis dashboard that turns
                  multiple market inputs into a more usable trading‑plan
                  experience.
                </p>
              </div>

              {/* Tech */}
              <div className="mt-20 border-t border-ink/8 pt-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-muted/60">
                  Tech Stack
                </p>
                <TechRow />
              </div>
            </section>

            {/* ── Key Features ── */}
            <section className="pt-28 sm:pt-36 lg:pt-44">
              {/* Section label */}
              <div className="flex items-center gap-4 pb-16 sm:pb-20">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent/70">
                  02 — Key Features
                </span>
                <div className="h-px flex-1 bg-ink/8" />
              </div>

              {/* Pull quote */}
              <p className="max-w-2xl text-[clamp(1.5rem,2.8vw,2.6rem)] font-black leading-[1.0] tracking-[-0.055em] text-ink">
                The page opens with one dominant visual idea and keeps the
                technical story underneath it.
              </p>

              {/* Feature list — full-width with dividers */}
              <div className="mt-20 divide-y divide-ink/8">
                {highlights.map((item) => (
                  <article
                    key={item.id}
                    className="group grid grid-cols-[3rem_1fr] gap-x-8 py-12 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-12 lg:grid-cols-[5rem_1fr_minmax(0,38%)]"
                  >
                    {/* Number */}
                    <span className="pt-1 text-[11px] font-black uppercase tracking-[0.2em] text-accent/50">
                      {item.id}
                    </span>

                    {/* Title */}
                    <h3 className="text-[clamp(1.3rem,2.2vw,2rem)] font-black leading-[1.05] tracking-[-0.04em] text-ink transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>

                    {/* Copy — third column on lg */}
                    <p className="col-start-2 mt-3 text-[14px] leading-[1.85] text-muted sm:col-start-3 sm:mt-0 sm:self-center">
                      {item.copy}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}
