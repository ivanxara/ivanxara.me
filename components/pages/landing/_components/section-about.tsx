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
              turning{" "}
              <span className="italic text-primary">complex operations</span>{" "}
              into clear, scalable digital systems.
            </Heading>
            <Paragraph className="max-w-2xl">
              Core work centered on Zoho CRM and Zoho Creator, with a focus on
              automations, custom modules, and internal tools. When a product
              needs more than low-code alone, the stack extends into Next.js,
              TypeScript, and Supabase to deliver stronger workflows,
              visibility, and user experience.
            </Paragraph>
          </AnimationReveal>
        </div>
      </SectionBlock>
    </section>
  );
}
