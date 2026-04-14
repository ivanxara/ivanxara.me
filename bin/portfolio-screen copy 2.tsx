"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { EditorCursor } from "@/components/editor-cursor";

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
    period: "2024 - Present",
    description:
      "Crafting product interfaces, shaping frontend systems, and translating design direction into polished builds.",
  },
  {
    organization: "Independent Work",
    role: "Frontend Developer",
    period: "2022 - 2024",
    description:
      "Built websites, product MVPs, and visual systems with a focus on clarity, speed, and art direction.",
  },
  {
    organization: "Startup Projects",
    role: "UI Designer",
    period: "2021 - 2022",
    description:
      "Explored early-stage concepts through interface design, product thinking, and rapid prototyping.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

interface HeroBackdropLineSegment {
  label: string;
  solid: boolean;
  size: "sm" | "md" | "lg";
}

interface HeroBackdropWordRow {
  words: HeroBackdropLineSegment[];
  top: string;
  direction: "left" | "right";
  offset: string;
}

const heroBackdropWords = [
  {
    words: [
      { label: "Developer", solid: false, size: "md" },
      { label: "Frontend", solid: false, size: "lg" },
      { label: "TypeScript", solid: false, size: "sm" },
      { label: "Systems", solid: false, size: "md" },
      { label: "React", solid: false, size: "sm" },
    ],
    top: "-12%",
    direction: "left" as const,
    offset: "-26%",
  },
  {
    words: [
      { label: "APIs", solid: false, size: "md" },
      { label: "Backend", solid: false, size: "lg" },
      { label: "Cloud", solid: false, size: "sm" },
      { label: "Product", solid: false, size: "md" },
      { label: "Scaling", solid: false, size: "sm" },
    ],
    top: "10%",
    direction: "right" as const,
    offset: "24%",
  },
  {
    words: [
      { label: "Design", solid: false, size: "sm" },
      { label: "Interfaces", solid: false, size: "lg" },
      { label: "Hi", solid: true, size: "md" },
      { label: "Experience", solid: false, size: "md" },
      { label: "UI", solid: false, size: "sm" },
    ],
    top: "30%",
    direction: "left" as const,
    offset: "-6%",
  },
  {
    words: [
      { label: "Database", solid: false, size: "lg" },
      { label: "I'm", solid: true, size: "sm" },
      { label: "Ivan", solid: true, size: "md" },
      { label: "Direction", solid: false, size: "sm" },
      { label: "DevOps", solid: false, size: "md" },
    ],
    top: "50%",
    direction: "right" as const,
    offset: "10%",
  },
  {
    words: [
      { label: "Node", solid: false, size: "sm" },
      { label: "Product", solid: false, size: "lg" },
      { label: "✌️", solid: true, size: "md" },
      { label: "Systems", solid: false, size: "md" },
      { label: "Server", solid: false, size: "sm" },
    ],
    top: "72%",
    direction: "left" as const,
    offset: "-18%",
  },
  {
    words: [
      { label: "Craft", solid: false, size: "sm" },
      { label: "Testing", solid: false, size: "md" },
      { label: "Frontend", solid: false, size: "lg" },
      { label: "Deploy", solid: false, size: "sm" },
      { label: "Performance", solid: false, size: "md" },
    ],
    top: "92%",
    direction: "right" as const,
    offset: "14%",
  },
] satisfies HeroBackdropWordRow[];

function SectionHeader({ children }: { children: ReactNode }) {
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

function LayeredBackdrop({ progress }: { progress: MotionValue<number> }) {
  const driftA = useTransform(progress, [0, 1], [0, -80]);
  const driftB = useTransform(progress, [0, 1], [0, -140]);
  const driftC = useTransform(progress, [0, 1], [0, -200]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-[-8%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(214,168,105,0.18),rgba(214,168,105,0)_70%)] blur-3xl"
        style={{ y: driftA }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[-10%] top-[22%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(126,146,188,0.16),rgba(126,146,188,0)_70%)] blur-3xl"
        style={{ y: driftB }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[18%] top-[52%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(107,144,126,0.12),rgba(107,144,126,0)_72%)] blur-3xl"
        style={{ y: driftC }}
      />
    </div>
  );
}

function HeroBackdropWord({
  words,
  top,
  direction,
  offset,
  progress,
}: {
  words: HeroBackdropLineSegment[];
  top: string;
  direction: "left" | "right";
  offset: string;
  progress: MotionValue<number>;
}) {
  const x = useTransform(
    progress,
    [0, 1],
    direction === "left" ? [0, -420] : [0, 420],
  );
  const y = useTransform(progress, [0, 1], [0, -420]);
  const opacity = useTransform(progress, [0, 0.16, 0.42], [0.28, 0.2, 0]);
  const sizeClasses = {
    sm: "text-[clamp(2.4rem,5.8vw,4.8rem)]",
    md: "text-[clamp(3.1rem,7.6vw,6.3rem)]",
    lg: "text-[clamp(3.9rem,9.2vw,7.6rem)]",
  } as const;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 font-black lowercase leading-[0.88] tracking-[-0.09em] lg:flex lg:items-end lg:gap-[0.22em]"
      style={{ top, marginLeft: offset, x, y }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word.label}-${index}`}
          className={`${sizeClasses[word.size]} ${word.solid ? "text-black" : "text-black/[0.24]"}`}
          style={{ opacity: word.solid ? 1 : opacity }}
        >
          {word.label}
        </motion.span>
      ))}
    </motion.div>
  );
}

function HeroSection({ progress }: { progress: MotionValue<number> }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-8rem)] scroll-mt-28 flex-col items-center justify-center overflow-visible py-16"
    >
      {heroBackdropWords.map((word) => (
        <HeroBackdropWord
          key={`${word.top}-${word.offset}`}
          words={word.words}
          top={word.top}
          direction={word.direction}
          offset={word.offset}
          progress={progress}
        />
      ))}
    </section>
  );
}

function AboutSection({ progress }: { progress: MotionValue<number> }) {
  const layerY = useTransform(progress, [0, 1], [0, -36]);

  return (
    <section id="about" className="scroll-mt-28 py-20 sm:py-28">
      <motion.div className="max-w-5xl" style={{ y: layerY }}>
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
      </motion.div>
    </section>
  );
}

function ProjectsSection({ progress }: { progress: MotionValue<number> }) {
  const workContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });
  const sectionY = useTransform(progress, [0, 1], [0, -24]);

  const previewWidth = 420;
  const previewHeight = 280;
  const yTarget = hoveredIndex === null ? 0 : -(previewHeight * hoveredIndex);

  const handleMouseMove = (event: MouseEvent) => {
    const rect = workContainerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    mouseX.set(event.clientX - rect.left - previewWidth / 2);
    mouseY.set(event.clientY - rect.top - previewHeight / 2);
  };

  return (
    <motion.section
      id="work"
      className="scroll-mt-28 py-24 sm:py-32"
      style={{ y: sectionY }}
    >
      <SectionHeader>Selected Works</SectionHeader>

      <div
        ref={workContainerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex flex-col">
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
              whileHover={{ x: 8 }}
              className={`group relative flex cursor-none flex-col justify-between gap-5 overflow-hidden py-12 transition-all sm:py-16 lg:flex-row lg:items-center ${
                index !== projects.length - 1
                  ? "border-b border-[var(--line)]"
                  : ""
              }`}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-5 left-0 hidden w-full rounded-[2rem] bg-[linear-gradient(90deg,rgba(214,168,105,0.12),rgba(126,146,188,0.07),transparent_70%)] md:block"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.96,
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                <h3
                  className={`text-[clamp(2.35rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.08em] transition-colors duration-500 ${
                    hoveredIndex === index || hoveredIndex === null
                      ? "text-[var(--ink)]"
                      : "text-[color:rgba(20,20,20,0.26)]"
                  }`}
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
    </motion.section>
  );
}

function ExperienceSection({ progress }: { progress: MotionValue<number> }) {
  const timelineStart = "1.25rem";
  const timelineEnd = "3rem";
  const sectionY = useTransform(progress, [0, 1], [0, -12]);

  return (
    <motion.section
      id="experience"
      className="scroll-mt-28 py-24 sm:py-32"
      style={{ y: sectionY }}
    >
      <SectionHeader>Journey</SectionHeader>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-14 max-w-3xl"
      >
        <p className="text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-[0.95] tracking-[-0.07em] text-[var(--ink)]">
          A simple progression from visual exploration into building refined,
          production-ready digital products.
        </p>
      </motion.div>

      <div className="relative max-w-4xl">
        <div
          className="pointer-events-none absolute left-[15.5px] w-px bg-[linear-gradient(180deg,rgba(20,20,20,0.04),rgba(20,20,20,0.18),rgba(20,20,20,0.04))]"
          style={{ top: timelineStart, bottom: timelineEnd }}
        />

        {experience.map((item, index) => (
          <motion.div
            key={`${item.organization}-${item.role}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
            className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-6 py-10 first:pt-0 last:pb-0 sm:gap-8 sm:py-12"
          >
            <div className="relative flex justify-center">
              <motion.span
                animate={index === 0 ? { scale: [1, 1.08, 1] } : undefined}
                transition={
                  index === 0
                    ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
                className={`mt-2 h-4 w-4 rounded-full border shadow-[0_0_0_6px_rgba(243,241,236,0.96)] ${
                  index === 0
                    ? "border-black/15 bg-[var(--ink)]"
                    : "border-black/10 bg-[var(--paper)]"
                }`}
              />
            </div>

            <div className="max-w-3xl">
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[color:rgba(20,20,20,0.4)]">
                  {item.period}
                </p>
                <h3 className="text-[clamp(2rem,5vw,3.7rem)] font-black leading-[0.92] tracking-[-0.08em] text-[var(--ink)]">
                  {item.organization}
                </h3>
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[var(--muted)]">
                  {item.role}
                </p>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:rgba(20,20,20,0.7)] sm:text-base">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ContactSection({ progress }: { progress: MotionValue<number> }) {
  const sectionY = useTransform(progress, [0, 1], [0, 18]);

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 border-t border-[var(--line)] bg-transparent px-6 pb-12 pt-24 text-[var(--ink)] sm:px-8 sm:pt-28"
      style={{ y: sectionY }}
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
            Copyright 2026 ivan xara.
          </p>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] opacity-55">
            Portugal - Worldwide
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function PortfolioScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSpringX = useSpring(cursorX, {
    stiffness: 520,
    damping: 34,
    mass: 0.32,
  });
  const cursorSpringY = useSpring(cursorY, {
    stiffness: 520,
    damping: 34,
    mass: 0.32,
  });
  const [cursorVisible, setCursorVisible] = useState(false);

  const handleCursorMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
    setCursorVisible(true);
  };

  return (
    <aside className="flex h-full w-full bg-[var(--frame)] p-3 sm:p-4 lg:pr-0">
      <div
        ref={frameRef}
        className="relative flex h-full w-full cursor-none flex-col overflow-hidden rounded-[2.5rem] bg-[#f3f1ec]"
        onMouseMove={handleCursorMove}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        <LayeredBackdrop progress={progress} />
        <EditorCursor
          x={cursorSpringX}
          y={cursorSpringY}
          visible={cursorVisible}
        />

        <div
          ref={scrollRef}
          className="portfolio-scroll relative flex-1 overflow-y-auto"
        >
          <div className="group mx-auto flex w-full max-w-6xl flex-col px-6 pb-10 pt-4 sm:px-8 sm:pb-12 sm:pt-5 lg:px-12">
            <HeroSection progress={progress} />
            <AboutSection progress={progress} />
            <ProjectsSection progress={progress} />
            <ExperienceSection progress={progress} />
          </div>

          <ContactSection progress={progress} />
        </div>
      </div>
    </aside>
  );
}
