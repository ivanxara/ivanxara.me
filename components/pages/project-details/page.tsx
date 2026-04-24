"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PortfolioBackdrop } from "@/components/layout/portfolio-backdrop";
import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionBlock } from "@/components/shared/section-block";
import { ZoomableImage } from "@/components/shared/zoomable-image";
import { PlayGameDialog } from "@/components/pages/project-details/_components/play-game-dialog";
import { Footer } from "@/components/layout/footer";
import { fadeUp } from "@/lib/animations/motion";
import { SiGithub } from "react-icons/si";
import { TECHNOLOGY_META } from "@/utils/technologies";
import type { IProject } from "@/types/projects";
import { Badge } from "@/components/ui/badge";
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectDetailScreen({
  onOpenChat,
  project,
}: {
  onOpenChat?: () => void;
  project: IProject;
}) {
  const isMobileGallery = project.galleryLayout === "mobile";
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });
  const heroY = useTransform(progress, [0, 1], [0, -60]);
  const overviewY = useTransform(progress, [0, 1], [0, -36]);
  const featuresY = useTransform(progress, [0, 1], [0, -24]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const driftX = useSpring(rawX, { stiffness: 35, damping: 22, mass: 1 });
  const driftY = useSpring(rawY, { stiffness: 35, damping: 22, mass: 1 });
  const scrollToSection = useCallback(
    (hash: string, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      const sectionId = hash.replace(/^#/, "");

      if (!container || !sectionId) {
        return;
      }

      const section = container.querySelector<HTMLElement>(`#${sectionId}`);

      if (!section) {
        return;
      }

      section.scrollIntoView({ behavior, block: "start" });

      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
    },
    [],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollProgress = () => {
      const scrollableHeight = container.scrollHeight - container.clientHeight;
      const nextProgress =
        scrollableHeight <= 0 ? 0 : container.scrollTop / scrollableHeight;

      scrollYProgress.set(nextProgress);
    };

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawX.set(((e.clientX - cx) / cx) * 14);
      rawY.set(((e.clientY - cy) / cy) * 9);
    };

    updateScrollProgress();
    container.addEventListener("scroll", updateScrollProgress);
    window.addEventListener("mousemove", onMove);
    return () => {
      container.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("mousemove", onMove);
    };
  }, [rawX, rawY, scrollYProgress]);

  if (!project.image) {
    return null;
  }

  return (
    <aside className="flex h-full w-full bg-sidebar p-3 sm:p-4">
      <div className="noise-overlay relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-card">
        <PortfolioBackdrop progress={progress} />

        <div
          ref={scrollRef}
          className="portfolio-scroll relative flex-1 overflow-y-auto overflow-x-hidden"
        >
          <PageWrapper>
            <Navbar
              progress={progress}
              onOpenChat={onOpenChat}
              onNavigateSection={scrollToSection}
            />

            <section
              id="top"
              className="relative flex lg:min-h-[calc(100dvh-6rem)] scroll-mt-28 flex-col justify-end pt-24 lg:pt-32 pb-20"
            >
              <div className="relative z-10 flex flex-col">
                <motion.div style={{ y: heroY }}>
                  <motion.div style={{ x: driftX, y: driftY }}>
                    <div className="overflow-hidden">
                      <motion.h1
                        initial={{ y: "108%" }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.08,
                          duration: 1.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="select-none text-4xl sm:text-7xl md:text-[5rem] lg:text-[8rem] font-black tracking-[-0.065em] text-foreground"
                      >
                        {project.title}
                      </motion.h1>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.28,
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden rounded-[1.85rem] bg-[#0b0b0d] shadow-xl sm:rounded-[2.25rem] mt-4"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} landing page`}
                    unoptimized={true}
                    className="h-auto w-full max-h-200.5 object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </section>

            <motion.section id="overview" style={{ y: overviewY }}>
              <SectionBlock title="Project Overview" className="scroll-mt-28">
                <div className="max-w-5xl">
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    <h2 className="mb-6 max-w-4xl text-[clamp(1.9rem,5vw,4rem)] font-black leading-[1.03] tracking-[-0.07em] text-foreground">
                      {project.overviewTitle}{" "}
                      <span className="italic text-primary">
                        {project.overviewAccent}
                      </span>
                    </h2>
                    {project.overview?.map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className={
                          index === 0
                            ? "max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base"
                            : "mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>

                  {project.repository ? (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className={cn(
                        "mt-8 flex flex-wrap gap-3",
                        project.repository.private && "cursor-not-allowed",
                      )}
                    >
                      <a
                        href={project.repository.url}
                        className="group flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SiGithub className="size-3" />
                        GitHub Repository
                        {project.repository.private && (
                          <LockIcon className="size-3" />
                        )}
                      </a>
                    </motion.div>
                  ) : null}

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-12 flex flex-wrap gap-3"
                  >
                    {project.technologies.map((technologyKey) => {
                      const technology = TECHNOLOGY_META[technologyKey];
                      const Icon = technology.icon;

                      return (
                        <div
                          key={technologyKey}
                          className="flex items-center gap-2.5 rounded-full border border-foreground/10 px-4 py-2 text-left"
                        >
                          <span
                            aria-label={technology.label}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-muted-foreground"
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-4 w-4 text-foreground"
                            />
                          </span>
                          <span className="text-[13px] font-semibold tracking-[-0.02em] text-muted-foreground">
                            {technology.label}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </SectionBlock>
            </motion.section>

            <motion.section id="features" style={{ y: featuresY }}>
              <SectionBlock title="Key Features" className="scroll-mt-28">
                <div className="max-w-4xl">
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    <p className="max-w-2xl text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-[0.98] tracking-[-0.06em] text-foreground">
                      {project.featureIntro}
                    </p>
                  </motion.div>

                  <div className="mt-14 space-y-10">
                    {project.featureCards?.map((feature, index) => (
                      <motion.article
                        key={feature.title}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.28 }}
                        transition={{ delay: index * 0.08 }}
                        className="border-t border-foreground/8 pt-8 first:border-t-0 first:pt-0"
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/78">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-3 max-w-xl text-[clamp(1.3rem,2vw,1.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted-foreground">
                          {feature.copy}
                        </p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </SectionBlock>
            </motion.section>

            {project.playSection && project.slug === "my-game" ? (
              <SectionBlock title="Play" className="scroll-mt-28">
                <PlayGameDialog title={project.title} />
              </SectionBlock>
            ) : null}

            {project.gallery?.length ? (
              <SectionBlock title="Gallery" className="scroll-mt-28">
                <div
                  className={
                    isMobileGallery
                      ? "grid justify-center gap-5 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid gap-5 md:grid-cols-2"
                  }
                >
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={image.src}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.22 }}
                      transition={{ delay: index * 0.08 }}
                      className={
                        isMobileGallery ? "mx-auto w-full max-w-[22rem]" : ""
                      }
                    >
                      <ZoomableImage
                        src={image}
                        alt={`${project.title} gallery image ${index + 1}`}
                        wrapperClassName={
                          isMobileGallery
                            ? "mx-auto aspect-[9/19.5] max-w-[22rem] rounded-[1.75rem] bg-[#0b0b0d] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.14)]"
                            : undefined
                        }
                        className={
                          isMobileGallery
                            ? "h-full w-full rounded-[1.25rem] object-cover"
                            : "rounded-2xl"
                        }
                        unoptimized={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </SectionBlock>
            ) : null}
          </PageWrapper>

          <Footer progress={progress} />
        </div>
      </div>
    </aside>
  );
}
