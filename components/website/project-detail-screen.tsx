"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { PortfolioProject } from "@/components/website/content";
import { PortfolioBackdrop } from "@/components/website/backdrop";
import { fadeUp } from "@/components/website/motion";
import { SectionTitle } from "@/components/website/section-title";

export function ProjectDetailScreen({
  project,
}: {
  project: PortfolioProject;
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
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-12">
            <div className="sticky top-0 z-30 mb-12 pt-2 sm:pt-4">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex w-fit max-w-full items-center gap-4 rounded-full border border-white/8 bg-[rgba(14,14,16,0.72)] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:px-5"
              >
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ink"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Link>
                <span className="h-4 w-px bg-line" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em] text-muted">
                  Project Overview
                </span>
              </motion.div>
            </div>

            <section className="pb-14 pt-8 sm:pb-20 sm:pt-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end"
              >
                <div>
                  <div className="mb-8 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.28em] text-muted opacity-50">
                    <span>{project.year}</span>
                    <span className="h-px w-6 bg-line" />
                    <span>{project.role}</span>
                  </div>

                  <h1 className="max-w-4xl text-[clamp(3.7rem,11vw,8rem)] font-black leading-[0.88] tracking-[-0.08em] text-ink">
                    {project.title}
                  </h1>

                  <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
                    {project.overview}
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/6 bg-white/[0.025] p-6 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-muted">
                    Core Stack
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-ink-secondary"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="pb-16"
            >
              <div
                className="relative overflow-hidden rounded-[2rem] border border-white/[0.06]"
                style={{
                  background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_34%)]" />
                {project.image ? (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(min-width: 1280px) 1100px, 92vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-end p-8 sm:p-12">
                    <div className="max-w-xl">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/50">
                        Selected work
                      </p>
                      <p className="mt-4 text-4xl font-black uppercase tracking-[-0.07em] text-white/18 sm:text-6xl">
                        {project.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            <section className="grid gap-8 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <SectionTitle>Context</SectionTitle>
                <div className="space-y-6 rounded-[2rem] border border-white/6 bg-white/[0.02] p-6 sm:p-8">
                  <div>
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-muted">
                      Challenge
                    </p>
                    <p className="text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-muted">
                      Outcome
                    </p>
                    <p className="text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <SectionTitle>What I Led</SectionTitle>
                <div className="rounded-[2rem] border border-white/6 bg-white/[0.02] p-6 sm:p-8">
                  <div className="space-y-4">
                    {project.contributions.map((contribution, index) => (
                      <div
                        key={contribution}
                        className="flex gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="pt-0.5 font-mono text-[11px] text-accent/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
                          {contribution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="pb-8"
            >
              <div className="flex flex-col gap-6 rounded-[2.2rem] border border-white/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-muted">
                    Explore More
                  </p>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.95] tracking-[-0.07em] text-ink">
                    Back to selected works and the wider portfolio system.
                  </h2>
                </div>

                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-accent/30 hover:bg-accent/10"
                >
                  View all projects
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </aside>
  );
}
