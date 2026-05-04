"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { AnimationReveal, motionEase } from "@/components/animations";
import { Heading, Paragraph } from "@/components/typography";
import { SectionBlock } from "@/components/shared/section-block";
import { PROJECT_LIST } from "@/utils/projects";
import { TECHNOLOGY_META } from "@/utils/technologies";
import { trackVisitorClick } from "@/utils/visitor-clicks";

const PREVIEW = {
  width: 400,
  height: 230,
  framePadding: 8,
  frameRadius: "1.4rem",
  imageRadius: "1rem",
} as const;

const previewContentHeight = PREVIEW.height - PREVIEW.framePadding * 2;

export function SectionProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 108, damping: 22, mass: 0.7 });
  const y = useSpring(mouseY, { stiffness: 108, damping: 22, mass: 0.7 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    mouseX.set(event.clientX - bounds.left - PREVIEW.width / 2);
    mouseY.set(event.clientY - bounds.top - PREVIEW.height / 2);
  };

  return (
    <section id="work">
      <SectionBlock title="Selected Works" className="-scroll-mt-28">
        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex flex-col">
            {PROJECT_LIST.map((project, index) => {
              const isActive = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && !isActive;

              return (
                <AnimationReveal key={project.slug} delay={index * 0.08}>
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={() =>
                      trackVisitorClick({
                        clickId: `project:${project.slug}`,
                      })
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative flex cursor-pointer flex-col justify-between gap-5 overflow-hidden py-12 sm:py-16 lg:flex-row lg:items-center ${
                      index < PROJECT_LIST.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-y-2 -left-4 -right-4 hidden rounded-4xl md:block"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(196,168,130,0.04), rgba(130,150,196,0.03), transparent 70%)",
                      }}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.48, ease: motionEase.smooth }}
                    />

                    <div
                      className={`relative z-10 flex min-w-0 flex-col gap-5 md:gap-6 lg:max-w-2xl lg:transition-transform lg:duration-500 ${
                        isActive ? "lg:translate-x-4" : "lg:translate-x-0"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-4xl border border-border bg-card md:hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 0px"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-accent" />
                        )}
                      </div>

                      <Heading
                        as="h3"
                        variant="heading-2"
                        className={`md:transition-colors md:duration-500 ${
                          isDimmed ? "md:text-foreground/20" : "text-foreground"
                        }`}
                      >
                        {project.title}
                      </Heading>
                      {project.summary ? (
                        <Paragraph
                          variant="muted"
                        >
                          {project.summary}
                        </Paragraph>
                      ) : null}
                    </div>

                    <div className="relative z-10 flex flex-col items-start gap-2 lg:items-end lg:text-right">
                      <div className="flex flex-col items-start gap-2 lg:items-end">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider transition-colors duration-500">
                          {project.role}
                        </span>
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                          {project.technologies.map((technologyKey) => {
                            const technology = TECHNOLOGY_META[technologyKey];
                            const Icon = technology.icon;

                            return (
                              <span
                                key={`${project.slug}-${technologyKey}`}
                                aria-label={technology.label}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-muted-foreground"
                              >
                                <Icon
                                  aria-hidden="true"
                                  className="h-4 w-4 text-foreground"
                                />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimationReveal>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-0 z-50 hidden md:block">
            <motion.div
              className="absolute overflow-hidden border border-border bg-card shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{
                opacity: hoveredIndex === null ? 0 : 1,
                scale: hoveredIndex === null ? 0.82 : 1,
              }}
              transition={{ duration: 0.28, ease: motionEase.smooth }}
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
                    y:
                      hoveredIndex === null
                        ? 0
                        : -(previewContentHeight * hoveredIndex),
                  }}
                  transition={{ duration: 0.52, ease: motionEase.smooth }}
                  className="absolute left-0 top-0 w-full"
                >
                  {PROJECT_LIST.map((project) => (
                    <div
                      key={project.title}
                      className="relative w-full overflow-hidden bg-background"
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
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-accent" />
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionBlock>
    </section>
  );
}
