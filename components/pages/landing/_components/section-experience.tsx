"use client";

import { AnimationReveal } from "@/components/animations";
import { Heading, Paragraph } from "@/components/typography";
import { SectionBlock } from "@/components/shared/section-block";
import { EARLY_EXPERIENCE_NOTE, MY_EXPERIENCE } from "@/utils/constants";

export function SectionExperience() {
  return (
    <section id="experience">
      <SectionBlock title="Experience" className="scroll-mt-28">
        <AnimationReveal amount={0.35}>
          <Heading as="p" variant="heading-2" className="max-w-4xl">
            a bit of background.
          </Heading>
          <Paragraph className="mt-6 max-w-2xl text-foreground/68">
            The main things worth knowing: I work with real client systems,
            ship web products, and care about the business rules behind the
            interface.
          </Paragraph>
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
                <Paragraph variant="muted" className="text-primary">
                  {item.period}
                </Paragraph>
                <Heading as="h3" variant="heading-3" className="mt-4">
                  {item.organization}
                </Heading>
                <Paragraph
                  variant="muted"
                  className="font-semibold lowercase tracking-tight"
                >
                  {item.role}
                </Paragraph>
              </div>

              <div className="lg:pt-1">
                <Paragraph
                  variant="muted"
                  className="max-w-xl text-base leading-8 tracking-tight text-foreground/68"
                >
                  {item.description}
                </Paragraph>
                {item.highlights?.length ? (
                  <ul className="mt-7 max-w-xl">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlight}
                        className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 last:border-b-0 border-b border-border py-4 text-sm leading-7 text-muted-foreground"
                      >
                        <span className="text-xs font-black text-primary/70">
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </AnimationReveal>
          ))}
        </div>
        <AnimationReveal amount={0.25} className="mt-8 max-w-2xl">
          <Paragraph variant="muted" className="text-foreground/50">
            {EARLY_EXPERIENCE_NOTE}
          </Paragraph>
        </AnimationReveal>
      </SectionBlock>
    </section>
  );
}
