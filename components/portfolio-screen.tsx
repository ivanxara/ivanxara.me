"use client";

import React, { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

interface Project {
  title: string;
  role: string;
  colors: [string, string];
  technologies: string[];
}

interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  description: string;
}

const projects: Project[] = [
  {
    title: "monarch",
    role: "Design & Dev",
    colors: ["#2b2a28", "#141414"],
    technologies: ["Next.js", "Supabase", "Stripe"],
  },
  {
    title: "astra",
    role: "Design & Dev",
    colors: ["#3a3834", "#171715"],
    technologies: ["Next.js", "Motion", "CMS"],
  },
  {
    title: "northstar",
    role: "Product Redesign",
    colors: ["#262523", "#101010"],
    technologies: ["Dashboard", "System", "UX"],
  },
  {
    title: "kite",
    role: "Concept & Dev",
    colors: ["#34312d", "#181715"],
    technologies: ["Fintech", "UI", "Prototype"],
  },
];

const experience: ExperienceItem[] = [
  {
    organization: "Demo Studio",
    role: "Product Engineer",
    period: "2024 — Present",
    description:
      "Crafting product interfaces, shaping frontend systems, and translating design direction into polished builds.",
  },
  {
    organization: "Independent Work",
    role: "Frontend Developer",
    period: "2022 — 2024",
    description:
      "Built websites, product MVPs, and visual systems with a focus on clarity, speed, and art direction.",
  },
  {
    organization: "Startup Projects",
    role: "UI Designer",
    period: "2021 — 2022",
    description:
      "Explored early-stage concepts through interface design, product thinking, and rapid prototyping.",
  },
];

const textReveal: Variants = {
  hidden: { y: "120%", rotate: 2 },
  visible: (custom: number) => ({
    y: "0%",
    rotate: 0,
    transition: {
      duration: 1.1,
      delay: custom * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="mb-10 sm:mb-12"
    >
      <h2 className="text-[11px] font-black uppercase tracking-[0.38em] text-[var(--muted)]">
        {children}
      </h2>
    </motion.div>
  );
}

function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent<HTMLElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center overflow-hidden py-16"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(420px circle at ${x}px ${y}px, rgba(20, 20, 20, 0.035), transparent 78%)`,
          ),
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <div className="overflow-hidden pb-4">
          <motion.h1
            custom={0}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="text-[clamp(3rem,8vw,6.4rem)] font-black leading-[0.87] tracking-[-0.08em] text-[var(--ink)]"
          >
            Building software
            <br />
            <span className="text-black/72">elegant</span>
            <br />
            and effortless.
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 max-w-md"
        >
          <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
            Independent developer and designer crafting high-performance
            interfaces with visual precision and clean product thinking.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-black/[0.03] text-[var(--ink)]"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="mb-6 max-w-4xl text-[clamp(1.9rem,5vw,4rem)] font-black leading-[1.03] tracking-[-0.07em] text-[var(--ink)]">
            bridging the gap between{" "}
            <span className="italic text-black/72">design intent</span> and
            functional systems.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Focused on making digital experiences feel seamless, useful, and
            visually intentional without overcomplicating the product.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const workContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const previewWidth = 320;
  const previewHeight = 210;

  const yTarget = useMemo(() => {
    if (hoveredIndex === null) return 0;
    return -(previewHeight * hoveredIndex);
  }, [hoveredIndex]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = workContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(event.clientX - rect.left - previewWidth / 2);
    mouseY.set(event.clientY - rect.top - previewHeight / 2);
  };

  return (
    <section id="work" className="py-24 sm:py-32">
      <SectionHeader>Selected Works</SectionHeader>

      <div
        ref={workContainerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex flex-col border-t border-[var(--line)]">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex cursor-none flex-col justify-between gap-5 border-b border-[var(--line)] py-12 transition-all sm:py-16 lg:flex-row lg:items-center"
            >
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                <h3
                  className={cn(
                    "text-[clamp(2.35rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.08em] transition-colors duration-500",
                    hoveredIndex === index || hoveredIndex === null
                      ? "text-[var(--ink)]"
                      : "text-[color:rgba(20,20,20,0.26)]",
                  )}
                >
                  {project.title}
                </h3>
              </div>

              <div className="relative z-10 flex flex-col items-start gap-2 lg:items-end lg:text-right">
                <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-500 group-hover:text-[var(--ink)]">
                  {project.role}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:rgba(20,20,20,0.5)] transition-colors duration-500 group-hover:text-[var(--muted)]">
                  {project.technologies.join(" / ")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-50 hidden md:block">
          <motion.div
            className="absolute overflow-hidden rounded-[1.5rem] border border-white/14 shadow-[0_28px_90px_rgba(0,0,0,0.14)]"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.82,
            }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: previewWidth,
              height: previewHeight,
              x: springX,
              y: springY,
            }}
          >
            <motion.div
              animate={{ y: yTarget }}
              transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 w-full"
            >
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="relative w-full overflow-hidden"
                  style={{
                    height: previewHeight,
                    background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})`,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_34%)]" />
                  <div className="absolute inset-4 rounded-[1.15rem] border border-white/12 bg-white/6 backdrop-blur-[4px]" />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/72">
                      <span>{project.role}</span>
                      <span>Demo</span>
                    </div>

                    <div>
                      <p className="text-3xl font-black uppercase tracking-[-0.06em] text-white/22">
                        {project.title}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/74"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <SectionHeader>Journey</SectionHeader>

      <div className="flex flex-col border-t border-[var(--line)]">
        {experience.map((item, index) => (
          <motion.div
            key={`${item.organization}-${item.role}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
            className="grid grid-cols-1 gap-5 border-b border-[var(--line)] py-12 sm:py-16 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-3">
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[color:rgba(20,20,20,0.48)]">
                {item.period}
              </span>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <h3 className="text-[clamp(1.7rem,4vw,3.1rem)] font-black tracking-[-0.07em] text-[var(--ink)]">
                {item.organization}
              </h3>
              <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                {item.role}
              </span>
            </div>

            <div className="lg:col-span-5">
              <p className="max-w-md text-sm leading-relaxed text-[color:rgba(20,20,20,0.72)] sm:text-base">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-[var(--line)] bg-transparent px-6 pb-12 pt-24 text-[var(--ink)] sm:px-8 sm:pt-28"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <h2 className="mb-10 text-[clamp(3.2rem,10vw,6.4rem)] font-black leading-none tracking-[-0.08em]">
          let&apos;s talk.
        </h2>

        <div className="mb-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="mailto:hello@demo.studio"
            className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-black/[0.03] px-7 py-4 text-sm font-black transition-transform hover:scale-[1.03] sm:text-base"
          >
            <Mail className="h-5 w-5" />
            email me
          </a>

          <a
            href="#"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] bg-black/[0.03] transition-colors hover:bg-black/[0.06]"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href="#"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] bg-black/[0.03] transition-colors hover:bg-black/[0.06]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-center md:flex-row">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] opacity-55">
            © 2026 ivan xara.
          </p>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] opacity-55">
            Portugal — Worldwide
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export function PortfolioScreen() {
  return (
    <aside className="flex h-full w-full bg-[var(--frame)] p-3 sm:p-4 lg:w-[58%] lg:pr-1">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-[#f3f1ec]">
        <div className="portfolio-scroll relative flex-1 overflow-y-auto">
          <div className="group mx-auto flex w-full max-w-6xl flex-col px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
          </div>

          <ContactSection />
        </div>
      </div>
    </aside>
  );
}
