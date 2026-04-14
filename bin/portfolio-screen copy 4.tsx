"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Clock } from "lucide-react";
import { EditorCursor } from "@/components/editor-cursor";
import { FigmaSelectionFrame } from "../components/figma-selection-frame";

/* ─────────────────────────── Data ─────────────────────────── */

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
    organization: "loba",
    role: "zoho developer",
    period: "2023 — present",
    description:
      "architecting end-to-end zoho solutions, scripting, and system integrations.",
  },
  {
    organization: "univ. of aveiro",
    role: "software dev",
    period: "2021 — 2023",
    description:
      "deep dive into software development fundamentals, databases, and hands-on projects.",
  },
];

/* ─────────────────────────── Animations ─────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const letterReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -45, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ─────────────────────────── Helpers ─────────────────────────── */

function SectionLabel({
  children,
  number,
}: {
  children: ReactNode;
  number: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="mb-12 flex items-center gap-4 sm:mb-14"
    >
      <span className="font-mono text-[11px] text-[var(--accent)] opacity-60">
        {number}
      </span>
      <div className="h-px w-8 bg-[var(--accent)] opacity-20" />
      <h2 className="text-[11px] font-black uppercase tracking-[0.38em] text-[var(--muted)]">
        {children}
      </h2>
    </motion.div>
  );
}

/* ── Live local time widget ── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Lisbon",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/60 px-3.5 py-1.5 backdrop-blur-md"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[11px] tracking-wider text-[var(--muted)]">
        {time || "--:--:--"}
      </span>
      <span className="text-[10px] text-[var(--muted)] opacity-60">PT</span>
    </motion.div>
  );
}

/* ─────────────────────────── Backdrop ─────────────────────────── */

function LayeredBackdrop({ progress }: { progress: MotionValue<number> }) {
  const driftA = useTransform(progress, [0, 1], [0, -80]);
  const driftB = useTransform(progress, [0, 1], [0, -140]);
  const driftC = useTransform(progress, [0, 1], [0, -200]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-[-8%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(196,168,130,0.07),rgba(196,168,130,0)_70%)] blur-3xl"
        style={{ y: driftA }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[-10%] top-[22%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(130,150,196,0.05),rgba(130,150,196,0)_70%)] blur-3xl"
        style={{ y: driftB }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[18%] top-[52%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(130,196,160,0.04),rgba(130,196,160,0)_72%)] blur-3xl"
        style={{ y: driftC }}
      />
    </div>
  );
}

/* ─────────────────────────── Scroll progress ─────────────────────────── */

function ScrollProgressIndicator({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="rgba(232,230,225,0.06)"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength }}
          transform="rotate(-90 18 18)"
          opacity={0.5}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────── Header ─────────────────────────── */

function HeaderMenu({ progress }: { progress: MotionValue<number> }) {
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setScrolled(v > 0.02);
  });

  return (
    <div className="sticky top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(14, 14, 16, 0.82)"
            : "rgba(14, 14, 16, 0.4)",
          borderColor: scrolled
            ? "rgba(232, 230, 225, 0.08)"
            : "rgba(232, 230, 225, 0.04)",
        }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex w-fit max-w-full flex-col overflow-hidden rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <a
            href="#top"
            className="text-[12px] font-black tracking-[-0.04em] text-[var(--ink)] sm:text-[13px]"
          >
            ivan xara
          </a>

          <nav
            aria-label="Section navigation"
            className="flex flex-wrap items-center justify-end gap-2 sm:gap-3"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)] transition-all duration-300 hover:bg-white/[0.04] hover:text-[var(--ink)] sm:text-[11px]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function HeroSection({ progress }: { progress: MotionValue<number> }) {
  const titleY = useTransform(progress, [0, 1], [0, -76]);
  const bodyY = useTransform(progress, [0, 1], [0, -28]);
  const heroConstraintsRef = useRef<HTMLElement | null>(null);
  const heroTitle = "Hi im Ivan ✌️";

  return (
    <section
      id="top"
      ref={heroConstraintsRef}
      className="relative flex min-h-[calc(100dvh-8rem)] scroll-mt-28 flex-col items-center justify-center overflow-visible py-16"
    >
      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        {/* Status badge above title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </span>
        </motion.div>

        <motion.div
          className="relative overflow-visible pb-4"
          style={{ y: titleY }}
        >
          <FigmaSelectionFrame constraintsRef={heroConstraintsRef}>
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex flex-wrap items-center justify-center gap-x-[0.12em] lowercase text-[clamp(4.2rem,12vw,8.4rem)] font-black leading-[0.9] tracking-[-0.1em] text-[var(--ink)]"
              style={{ perspective: "600px" }}
            >
              {heroTitle.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  variants={letterReveal}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </FigmaSelectionFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 max-w-xl"
          style={{ y: bodyY }}
        >
          <p className="text-[15px] leading-relaxed text-[var(--muted)] sm:text-[17px]">
            Designer and developer creating clean, memorable digital experiences
            with a sharp eye for detail.
          </p>
        </motion.div>

        {/* Clock + scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 flex items-center gap-6"
        >
          <LiveClock />
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-40"
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── About ─────────────────────────── */

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
            <span className="italic text-[var(--accent)]">design intent</span>{" "}
            and functional systems.
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

/* ─────────────────────────── Projects ─────────────────────────── */

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
    if (!rect) return;
    mouseX.set(event.clientX - rect.left - previewWidth / 2);
    mouseY.set(event.clientY - rect.top - previewHeight / 2);
  };

  return (
    <motion.section
      id="work"
      className="scroll-mt-28 py-24 sm:py-32"
      style={{ y: sectionY }}
    >
      <SectionLabel number="02">Selected Works</SectionLabel>

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
              className={`group relative flex cursor-pointer flex-col justify-between gap-5 overflow-hidden py-12 transition-all duration-500 sm:py-16 lg:flex-row lg:items-center ${
                index !== projects.length - 1
                  ? "border-b border-[var(--line)]"
                  : ""
              }`}
            >
              {/* Hover gradient wash */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-2 -left-4 -right-4 hidden rounded-[2rem] md:block"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(196,168,130,0.04), rgba(130,150,196,0.03), transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.96,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="relative z-10 flex items-center gap-4 transition-transform duration-500 group-hover:translate-x-4">
                {/* Project number */}
                <span className="hidden font-mono text-[12px] text-[var(--muted)] opacity-40 transition-opacity duration-500 group-hover:opacity-80 sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`text-[clamp(2.35rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.08em] transition-colors duration-500 ${
                    hoveredIndex === index || hoveredIndex === null
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink)]/20"
                  }`}
                >
                  {project.title}
                </h3>
              </div>

              <div className="relative z-10 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-6 lg:text-right">
                <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-500 group-hover:text-[var(--ink)]">
                  {project.role}
                </span>
                <span className="hidden h-px w-8 bg-[var(--line)] transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--accent)]/30 lg:block" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink)]/30 transition-colors duration-500 group-hover:text-[var(--muted)]">
                  {project.technologies.join(" / ")}
                </span>

                {/* Arrow indicator on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    x: hoveredIndex === index ? 0 : -8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block"
                >
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Floating preview card ── */}
        <div className="pointer-events-none absolute inset-0 z-50 hidden md:block">
          <motion.div
            className="absolute overflow-hidden rounded-[1.5rem] border border-white/[0.06] shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
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
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_34%)]" />
                  <div className="absolute inset-4 rounded-[1.15rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-[4px]" />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                      <span>{project.role}</span>
                      <span className="flex items-center gap-1">
                        View <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>

                    <div>
                      <p className="text-3xl font-black uppercase tracking-[-0.06em] text-white/16">
                        {project.title}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/50"
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

/* ─────────────────────────── Experience ─────────────────────────── */

function ExperienceSection({ progress }: { progress: MotionValue<number> }) {
  const sectionY = useTransform(progress, [0, 1], [0, -16]);

  return (
    <motion.section
      id="experience"
      className="scroll-mt-28 py-16 sm:py-20"
      style={{ y: sectionY }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="noise-overlay relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-8 text-[var(--ink)] shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      >
        {/* Subtle gradient overlays */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(196,168,130,0.06),transparent_28%),radial-gradient(circle_at_right_top,rgba(130,150,196,0.04),transparent_24%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[8%] top-[8%] h-[88%] w-[34%] rounded-[46%_54%_36%_64%/49%_34%_66%_51%] bg-[linear-gradient(180deg,rgba(196,168,130,0.06),rgba(8,8,10,0))] blur-2xl"
        />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] lg:gap-14">
          <div className="pt-1">
            <div className="inline-flex items-center gap-3 text-[15px] font-semibold lowercase tracking-[-0.03em] text-[var(--muted)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] opacity-30" />
              about
            </div>
          </div>

          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="max-w-5xl text-[clamp(2.2rem,5.4vw,5.2rem)] font-black leading-[0.98] tracking-[-0.08em] text-[var(--ink)]"
            >
              based in portugal. i build robust digital architectures wrapped in
              uncompromising, minimalist aesthetics.
            </motion.p>

            <div className="mt-10 border-t border-[var(--line)]">
              {experience.map((item, index) => (
                <motion.div
                  key={`${item.organization}-${item.role}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08 }}
                  className={`grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.9fr)] lg:gap-12 ${
                    index !== experience.length - 1
                      ? "border-b border-[var(--line)]"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="text-[clamp(2rem,3vw,3.2rem)] font-black leading-[0.92] tracking-[-0.07em] text-[var(--ink)]">
                      {item.organization}
                    </h3>
                    <p className="mt-2 text-[1.05rem] font-semibold lowercase tracking-[-0.03em] text-[var(--muted)]">
                      {item.role}
                    </p>
                  </div>

                  <div className="lg:pt-1">
                    <span className="inline-flex rounded-full bg-[var(--accent-muted)] px-4 py-2 text-[0.95rem] font-semibold lowercase tracking-[-0.02em] text-[var(--accent)] ring-1 ring-[var(--accent)]/10">
                      {item.period}
                    </span>
                    <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.7] lowercase tracking-[-0.02em] text-[var(--muted)] sm:text-[1.1rem]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

/* ─────────────────────────── Contact ─────────────────────────── */

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

        <div className="mb-16 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <a
            href="mailto:hello@demo.studio"
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] px-7 py-4 text-sm font-black transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-[var(--accent-muted)] sm:text-base"
          >
            <Mail className="h-5 w-5 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
            email me
          </a>

          <a
            href="#"
            className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-[var(--accent-muted)]"
          >
            <Github className="h-5 w-5 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
          </a>

          <a
            href="#"
            className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-[var(--accent-muted)]"
          >
            <Linkedin className="h-5 w-5 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
          </a>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-center md:flex-row">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">
            Copyright 2026 ivan xara.
          </p>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">
            Portugal — Worldwide
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

/* ─────────────────────────── Main ─────────────────────────── */

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
    if (!rect) return;
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
    setCursorVisible(true);
  };

  return (
    <aside className="flex h-full w-full bg-[var(--frame)] p-3 sm:p-4 lg:pr-0">
      <div
        ref={frameRef}
        className="noise-overlay relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-[var(--paper)]"
        onMouseMove={handleCursorMove}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        <LayeredBackdrop progress={progress} />
        <ScrollProgressIndicator progress={progress} />
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
            <HeaderMenu progress={progress} />
            <HeroSection progress={progress} />
            <ExperienceSection progress={progress} />
            <AboutSection progress={progress} />
            <ProjectsSection progress={progress} />
          </div>

          <ContactSection progress={progress} />
        </div>
      </div>
    </aside>
  );
}
