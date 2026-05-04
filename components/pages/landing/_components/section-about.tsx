"use client";

import { AnimationReveal } from "@/components/animations";
import { Heading, Paragraph } from "@/components/typography";
import { SectionBlock } from "@/components/shared/section-block";

export function SectionAbout() {
  return (
    <section id="about">
      <SectionBlock title="About" className="scroll-mt-28">
        <div className="max-w-5xl">
          <AnimationReveal amount={0.35}>
            <Heading variant="heading-2" className="mb-6 max-w-4xl">
              I like useful things, quiet interfaces, and work that has a real
              reason to exist.
            </Heading>
            <Paragraph className="max-w-2xl">
              I am based in Portugal and spend most of my time somewhere between
              business logic, product ideas, and small details that make
              software feel less heavy to use. Outside the serious parts, I
              still like making things feel a little different when there is
              room for it.
            </Paragraph>
          </AnimationReveal>
        </div>
      </SectionBlock>
    </section>
  );
}
