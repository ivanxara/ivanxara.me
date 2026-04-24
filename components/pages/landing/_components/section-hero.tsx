"use client";

import { AnimationReveal } from "@/components/animations";
import { Heading, Paragraph } from "@/components/typography";

export function SectionHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-10rem)] scroll-mt-28 flex-col justify-center sm:justify-end overflow-hidden pb-16 pt-32 sm:pb-20 lg:min-h-[calc(100dvh-6rem)]"
    >
      {/* Vertical tag — right edge, barely visible */}
      <AnimationReveal
        trigger="mount"
        delay={1.8}
        duration={1.2}
        y={0}
        className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="select-none font-mono text-xs uppercase tracking-widest text-muted-foreground opacity-20">
          zoho developer + full-stack builder — portugal
        </span>
      </AnimationReveal>

      <div className="relative z-10 flex flex-col">
        <div>
          <AnimationReveal trigger="mount" delay={0.08} duration={1.3}>
            <Heading as="h1" variant="heading-1" className="select-none">
              ivan
            </Heading>
          </AnimationReveal>

          {/* Aumenta pt para dar espaço ao acento — mt igual para compensar */}
          <AnimationReveal
            trigger="mount"
            delay={0.22}
            duration={1.3}
            className="-mt-4 md:-mt-14"
            style={{ marginLeft: "clamp(1rem, 10vw, 10rem)" }}
          >
            <Heading as="span" variant="heading-1" className="select-none">
              xará
            </Heading>
          </AnimationReveal>
        </div>

        {/* Descriptor — só isto, sem bordas, sem meta */}
        <AnimationReveal
          trigger="mount"
          delay={1.35}
          duration={0.9}
          y={6}
          className="mt-14 max-w-xs opacity-40"
        >
          <Paragraph variant="compact">
            Zoho developer building CRM, Creator, and full-stack systems that
            turn complex business workflows into software people can actually
            use.
          </Paragraph>
        </AnimationReveal>
      </div>
    </section>
  );
}
