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
import { useRef, useState, type MouseEvent } from "react";
import { SectionTitle } from "@/components/project/section-title";
import { TechnologyBadge } from "@/components/project/technology-badge";
import { projects } from "@/config/portfolio-content";
import { fadeUp } from "@/lib/animations/motion";

const PREVIEW = {
  width: 400,
  height: 230,
  framePadding: 8,
  frameRadius: "1.4rem",
  imageRadius: "1rem",
} as const;

const previewContentHeight = PREVIEW.height - PREVIEW.framePadding * 2;

export function ProjectsSection({ progress }: { progress: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 108, damping: 22, mass: 0.7 });
  const y = useSpring(mouseY, { stiffness: 108, damping: 22, mass: 0.7 });
  const sectionY = useTransform(progress, [0, 1], [0, -24]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    mouseX.set(event.clientX - bounds.left - PREVIEW.width / 2);
    mouseY.set(event.clientY - bounds.top - PREVIEW.height / 2);
  };

  return (
    <motion.section
      id="work"
      className="-scroll-mt-28 py-24 sm:py-32"
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
                key={project.slug}
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
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div
                    className={`relative z-10 flex items-center gap-4 transition-transform duration-500 ${
                      isActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  >
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
                      <span className="text-xs font-semibold text-muted uppercase tracking-wider transition-colors duration-500">
                        {project.role}
                      </span>
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {project.technologies.map((technology) => (
                          <TechnologyBadge
                            key={`${project.slug}-${technology}`}
                            technology={technology}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 z-50 hidden md:block">
          <motion.div
            className="absolute overflow-hidden border border-white/[0.08] bg-[#111214] shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: hoveredIndex === null ? 0 : 1,
              scale: hoveredIndex === null ? 0.82 : 1,
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: PREVIEW.width,
              height: PREVIEW.height,
              borderRadius: PREVIEW.frameRadius,
              x,
              y,
              padding: PREVIEW.framePadding,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{ borderRadius: PREVIEW.imageRadius }}
            >
              <motion.div
                animate={{
                  y: hoveredIndex === null ? 0 : -(previewContentHeight * hoveredIndex),
                }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 w-full"
              >
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className="relative w-full overflow-hidden bg-[#0d0d0f]"
                    style={{ height: previewContentHeight }}
                  >
                    {project.image ? (
                      <div className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover object-top"
                          sizes={`${PREVIEW.width - PREVIEW.framePadding * 2}px`}
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-white/[0.04]" />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
