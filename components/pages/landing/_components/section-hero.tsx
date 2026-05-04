"use client";

import { AnimationReveal } from "@/components/animations";
import { Heading, Paragraph } from "@/components/typography";

export function SectionHero() {
  return (
    <section
      id="top"
      className="landing-hero-height relative flex scroll-mt-28 flex-col justify-center overflow-hidden pb-16 pt-32 sm:justify-end sm:pb-20"
    >
      <div className="relative z-10 flex flex-col">
        <div>
          <AnimationReveal trigger="mount" delay={0.08} duration={1.3}>
            <Heading as="h1" variant="heading-1" className="select-none">
              ivan
            </Heading>
          </AnimationReveal>

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

        <AnimationReveal
          trigger="mount"
          delay={0.6}
          duration={0.9}
          className="mt-10 max-w-sm sm:mt-14 sm:max-w-md"
        >
          <Paragraph className="text-sm leading-7 text-foreground/68 sm:text-base sm:leading-8">
            Developer working across Zoho systems, web apps, internal tools,
            and SaaS workflows, with a focus on turning complex business logic
            into useful software.
          </Paragraph>
        </AnimationReveal>
      </div>
    </section>
  );
}
