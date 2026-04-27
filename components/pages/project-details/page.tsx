"use client";

import Image from "next/image";
import { AnimationReveal } from "@/components/animations";
import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Heading, Paragraph } from "@/components/typography";
import { SectionBlock } from "@/components/shared/section-block";
import { ZoomableImage } from "@/components/shared/zoomable-image";
import { PlayGameDialog } from "@/components/pages/project-details/_components/play-game-dialog";
import { Footer } from "@/components/layout/footer";
import { SiGithub } from "react-icons/si";
import { TECHNOLOGY_META } from "@/utils/technologies";
import type { IProject } from "@/types/projects";
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackVisitorClick } from "@/utils/visitor-clicks";

export default function ProjectDetailScreen({
  onOpenChat,
  project,
}: {
  onOpenChat?: () => void;
  project: IProject;
}) {
  const isMobileGallery = project.galleryLayout === "mobile";

  if (!project.image) {
    return null;
  }

  return (
    <aside className="w-full bg-card lg:flex lg:h-full lg:bg-sidebar lg:p-4 lg:pr-0">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-card lg:h-full lg:min-h-0 lg:overflow-hidden lg:rounded-4xl lg:noise-overlay">
        <div className="portfolio-scroll relative overflow-x-clip lg:min-h-0 lg:flex-1 lg:overflow-x-hidden lg:overflow-y-auto">
          <PageWrapper>
            <Navbar onOpenChat={onOpenChat} />

            <section
              id="top"
              className="relative flex scroll-mt-28 flex-col justify-end pt-24 pb-20 lg:min-h-[calc(100dvh-6rem)] lg:pt-32"
            >
              <div className="relative z-10 flex flex-col">
                <div className="z-10">
                  <AnimationReveal
                    trigger="mount"
                    delay={0.08}
                    duration={1.3}
                  >
                    <Heading
                      as="h1"
                      variant="heading-1"
                      className="select-none"
                    >
                      {project.title}
                    </Heading>
                  </AnimationReveal>
                </div>

                <AnimationReveal
                  trigger="mount"
                  delay={0.28}
                  duration={1.4}
                  y={60}
                  scale={0.98}
                  className="overflow-hidden rounded-4xl bg-background shadow-xl sm:rounded-4xl"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} landing page`}
                    unoptimized={true}
                    className="h-auto w-full max-h-200.5 object-cover"
                    priority
                  />
                </AnimationReveal>
              </div>
            </section>

            <section id="overview">
              <SectionBlock title="Project Overview" className="scroll-mt-28">
                <div className="max-w-5xl">
                  <AnimationReveal amount={0.35}>
                    <Heading variant="heading-2" className="mb-6 max-w-4xl">
                      {project.overviewTitle}{" "}
                      <span className="italic text-primary">
                        {project.overviewAccent}
                      </span>
                    </Heading>
                    {project.overview?.map((paragraph, index) => (
                      <Paragraph
                        key={paragraph}
                        variant="p"
                        className={index === 0 ? "max-w-3xl" : "mt-4 max-w-3xl"}
                      >
                        {paragraph}
                      </Paragraph>
                    ))}
                  </AnimationReveal>

                  {project.repository ? (
                    <AnimationReveal
                      className={cn(
                        "mt-8 flex flex-wrap gap-3",
                        project.repository.private && "cursor-not-allowed",
                      )}
                    >
                      <a
                        href={project.repository.url}
                        onClick={() =>
                          trackVisitorClick({
                            clickId: `repository:${project.slug}`,
                          })
                        }
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
                    </AnimationReveal>
                  ) : null}

                  <AnimationReveal className="mt-12 flex flex-wrap gap-3">
                    {project.technologies.map((technologyKey) => {
                      const technology = TECHNOLOGY_META[technologyKey];
                      const Icon = technology.icon;

                      return (
                        <div
                          key={technologyKey}
                          className="flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-left"
                        >
                          <span
                            aria-label={technology.label}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-muted-foreground"
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-4 w-4 text-foreground"
                            />
                          </span>
                          <span className="text-sm font-semibold tracking-tight text-muted-foreground">
                            {technology.label}
                          </span>
                        </div>
                      );
                    })}
                  </AnimationReveal>
                </div>
              </SectionBlock>
            </section>

            <section id="features">
              <SectionBlock title="Key Features" className="scroll-mt-28">
                <div className="max-w-4xl">
                  <AnimationReveal amount={0.35}>
                    <Heading as="p" variant="heading-2" className="max-w-2xl">
                      {project.featureIntro}
                    </Heading>
                  </AnimationReveal>

                  <div className="mt-14 space-y-10">
                    {project.featureCards?.map((feature, index) => (
                      <AnimationReveal
                        key={feature.title}
                        amount={0.28}
                        delay={index * 0.08}
                        className="border-t border-border pt-8 first:border-t-0 first:pt-0"
                      >
                        <span className="text-xs font-black uppercase tracking-widest text-primary/78">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Heading
                          as="h3"
                          variant="heading-3"
                          className="mt-3 max-w-xl"
                        >
                          {feature.title}
                        </Heading>
                        <Paragraph
                          variant="muted"
                          className="mt-3 max-w-2xl leading-loose"
                        >
                          {feature.copy}
                        </Paragraph>
                      </AnimationReveal>
                    ))}
                  </div>
                </div>
              </SectionBlock>
            </section>

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
                    <AnimationReveal
                      key={image.src}
                      amount={0.22}
                      delay={index * 0.08}
                      className={
                        isMobileGallery ? "mx-auto w-full max-w-[22rem]" : ""
                      }
                    >
                      <ZoomableImage
                        src={image}
                        alt={`${project.title} gallery image ${index + 1}`}
                        wrapperClassName={
                          isMobileGallery
                            ? "mx-auto aspect-[9/19.5] max-w-[22rem] rounded-4xl bg-background p-2 shadow-2xl"
                            : undefined
                        }
                        className={
                          isMobileGallery
                            ? "h-full w-full rounded-4xl object-cover"
                            : "rounded-2xl"
                        }
                        unoptimized={true}
                      />
                    </AnimationReveal>
                  ))}
                </div>
              </SectionBlock>
            ) : null}
          </PageWrapper>

          <Footer />
        </div>
      </div>
    </aside>
  );
}
