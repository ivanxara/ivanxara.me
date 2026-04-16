"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import relevoAiLanding from "@/assets/img/relevoai_dark_landing.png";
import { PortfolioHeader } from "@/components/layout/header";
import { TechnologyBadge } from "@/components/project/technology-badge";

const techStack = [
  { key: "nextjs", label: "Next.js", detail: "For the website and app pages." },
  {
    key: "typescript",
    label: "TypeScript",
    detail: "For safer and cleaner code.",
  },
  {
    key: "supabase",
    label: "Supabase",
    detail: "For auth and database features.",
  },
  {
    key: "gemini",
    label: "Gemini AI",
    detail: "For AI-generated trading insights.",
  },
  {
    key: "stripe",
    label: "Stripe",
    detail: "For payments and subscriptions.",
  },
  {
    key: "tailwind",
    label: "Tailwind CSS",
    detail: "For fast and responsive styling.",
  },
] as const;

const featureCards = [
  {
    id: "01",
    title: "Clear user flow",
    copy: "Users can move from the landing page to the app in a simple and smooth way.",
  },
  {
    id: "02",
    title: "AI analysis screen",
    copy: "The app helps users choose options, run analysis, and read the results easily.",
  },
  {
    id: "03",
    title: "Subscription system",
    copy: "Paid access is built into the product with simple upgrade and locked-state screens.",
  },
] as const;

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent/70">
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-[clamp(2rem,4vw,4rem)] font-black leading-[0.92] tracking-[-0.07em] text-ink">
        {title}
      </h2>
      <div className="h-px w-full bg-ink/8" />
    </div>
  );
}

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
          className="px-6 pb-16 pt-32 sm:px-10 sm:pb-20 lg:px-14"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 sm:gap-16">
            <div className="relative z-10 flex min-h-[calc(100dvh-10rem)] flex-col justify-end">
              <h1 className="max-w-4xl text-[clamp(5rem,16vw,13rem)] font-black leading-[0.85] tracking-[-0.065em] text-ink">
                relevoai
              </h1>
            </div>

            <Image
              src={relevoAiLanding}
              alt="Relevo AI landing page"
              priority
              className="h-auto w-full"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>
        </section>

        <section className="text-ink">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-28 pt-20 sm:px-10 sm:pb-32 sm:pt-24 lg:px-14 lg:pt-28">
              <section className="pb-20 sm:pb-24">
                <SectionLabel
                  eyebrow="01 — Goal / Description"
                  title="A simple product page for an AI trading tool."
                />

                <div className="mt-12 max-w-3xl space-y-6">
                  <p className="max-w-2xl text-[clamp(1.6rem,3vw,2.75rem)] font-black leading-[1.02] tracking-[-0.055em] text-ink">
                    The goal is to make the product feel clear, modern, and
                    easy to use from the first screen.
                  </p>
                  <p className="text-[15px] leading-[1.9] text-muted">
                    RelevoAI is demo content for a project page.
                  </p>
                  <p className="text-[15px] leading-[1.9] text-muted">
                    It shows a landing page, product flow, payments, and AI
                    analysis in a clean way.
                  </p>
                </div>
              </section>

              <section className="py-20 sm:py-24">
                <SectionLabel
                  eyebrow="02 — Tech Used"
                  title="A small modern stack used to build the product."
                />

                <div className="mt-12 max-w-3xl space-y-6">
                  <p className="max-w-xl text-[clamp(1.6rem,3vw,2.75rem)] font-black leading-[1.02] tracking-[-0.055em] text-ink">
                    The stack is simple, practical, and good for building a
                    polished web app.
                  </p>
                  <p className="text-[15px] leading-[1.9] text-muted">
                    These tools cover the front end, backend, payments, and AI
                    features used in the project.
                  </p>
                  <TechRow />
                </div>
              </section>

              <section className="pt-20 sm:pt-24">
                <SectionLabel
                  eyebrow="03 — Key Features"
                  title="The main parts of the product experience."
                />

                <div className="mt-14 grid gap-12">
                  {featureCards.map((feature) => (
                    <article
                      key={feature.id}
                      className="grid gap-4 border-b border-ink/8 pb-12 sm:grid-cols-[4rem_1fr] sm:gap-8 lg:grid-cols-[4rem_1fr_0.85fr]"
                    >
                      <span className="pt-1 text-[11px] font-black uppercase tracking-[0.2em] text-accent/55">
                        {feature.id}
                      </span>
                      <h3 className="max-w-xl text-[clamp(1.45rem,2.2vw,2.2rem)] font-black leading-[1.02] tracking-[-0.045em] text-ink">
                        {feature.title}
                      </h3>
                      <p className="text-[14px] leading-[1.85] text-muted">
                        {feature.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
          </div>
        </section>
      </div>
    </div>
  );
}
