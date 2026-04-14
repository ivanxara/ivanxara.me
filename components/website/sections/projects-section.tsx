"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { projects } from "@/components/website/content";
import { fadeUp } from "@/components/website/motion";
import { SectionTitle } from "@/components/website/section-title";

const previewWidth = 420;
const previewHeight = 280;

export function ProjectsSection({ progress }: { progress: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });
  const sectionY = useTransform(progress, [0, 1], [0, -24]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    mouseX.set(event.clientX - bounds.left - previewWidth / 2);
    mouseY.set(event.clientY - bounds.top - previewHeight / 2);
  };

  return (
    <motion.section
      id="work"
      className="scroll-mt-28 py-24 sm:py-32"
      style={{ y: sectionY }}
    >
      <SectionTitle>Selected Works</SectionTitle>

      <div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex flex-col">
          {projects.map((project, index) => {
            const isActive = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isActive;

            return (
              <motion.div
                key={project.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative flex cursor-pointer flex-col justify-between gap-5 overflow-hidden py-12 transition-all duration-500 sm:py-16 lg:flex-row lg:items-center ${
                    index < projects.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-y-2 -left-4 -right-4 hidden rounded-[2rem] md:block"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(196,168,130,0.04), rgba(130,150,196,0.03), transparent 70%)",
                    }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.96,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="relative z-10 flex items-center gap-4 transition-transform duration-500 group-hover:translate-x-4">
                    <h3
                      className={`text-[clamp(2.35rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.08em] transition-colors duration-500 ${
                        isDimmed ? "text-ink/20" : "text-ink"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="relative z-10 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-6 lg:text-right">
                    <div className="flex flex-col items-start gap-2 lg:items-end">
                      <span className="text-[12px] font-black uppercase tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-ink">
                        {project.role}
                      </span>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-ink/30 transition-colors duration-500 group-hover:text-muted">
                        {project.technologies.join(" / ")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 z-50 hidden md:block">
          <motion.div
            className="absolute overflow-hidden rounded-[1.25rem] shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: hoveredIndex === null ? 0 : 1,
              scale: hoveredIndex === null ? 0.82 : 1,
            }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: previewWidth, height: previewHeight, x, y }}
          >
            <motion.div
              animate={{ y: hoveredIndex === null ? 0 : -(previewHeight * hoveredIndex) }}
              transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 w-full"
            >
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="relative w-full overflow-hidden"
                  style={{ height: previewHeight }}
                >
                  <div className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  {project.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover object-center"
                        sizes={`${previewWidth}px`}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-white/[0.04]" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
