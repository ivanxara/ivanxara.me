"use client";

import { AnimationReveal } from "@/components/animations";
import { Heading, Paragraph } from "@/components/typography";
import { SectionBlock } from "@/components/shared/section-block";
import { MY_EXPERIENCE } from "@/utils/constants";

export function SectionExperience() {
  return (
    <section id="experience">
      <SectionBlock title="Journey" className="scroll-mt-28">
        <AnimationReveal amount={0.35}>
          <Heading as="p" variant="heading-2" className="max-w-4xl">
            based in portugal. building digital systems for real business
            problems.
          </Heading>
        </AnimationReveal>

        <div className="mt-14 border-t border-border sm:mt-16">
          {MY_EXPERIENCE.map((item, index) => (
            <AnimationReveal
              key={`${item.organization}-${item.role}`}
              amount={0.25}
              delay={index * 0.1}
              className={`grid gap-4 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 ${
                index < MY_EXPERIENCE.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div>
                <Heading as="h3" variant="heading-3">
                  {item.organization}
                </Heading>
                <Paragraph
                  variant="muted"
                  className="mt-2 font-semibold lowercase tracking-tight"
                >
                  {item.role}
                </Paragraph>
              </div>

              <div className="lg:pt-1">
                <Paragraph variant="muted" className="text-primary">
                  {item.period}
                </Paragraph>

                <Paragraph
                  variant="muted"
                  className="mt-3 max-w-lg lowercase tracking-tight"
                >
                  {item.description}
                </Paragraph>
              </div>
            </AnimationReveal>
          ))}
        </div>
      </SectionBlock>
    </section>
  );
}
