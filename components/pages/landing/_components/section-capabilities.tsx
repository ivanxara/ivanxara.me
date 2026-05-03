"use client";

import { AnimationReveal } from "@/components/animations";
import { SectionBlock } from "@/components/shared/section-block";
import { Heading, Paragraph } from "@/components/typography";

const CAPABILITIES = [
  {
    title: "Zoho and business systems",
    copy: "My main Zoho work is in CRM and Creator: structuring modules, building automations, writing Deluge, creating Creator apps, and building internal integrations around the way teams actually work. I also work with other Zoho apps when the process needs it, including Recruit, Analytics, Desk, Forms, Writer, and WorkDrive.",
  },
  {
    title: "Web products and SaaS",
    copy: "On the web side, I usually work with React, Next.js, TypeScript, Supabase, and Stripe. I build things like public platforms, client websites, admin backoffices, paid flows, profile systems, AI assisted features, and internal tools, with the goal of making the product feel solid in real use.",
  },
];

export function SectionCapabilities() {
  return (
    <section id="capabilities">
      <SectionBlock title="What I Build" className="scroll-mt-28">
        <div className="max-w-5xl">
          <AnimationReveal amount={0.35}>
            <Heading as="p" variant="heading-2" className="max-w-4xl">
              business tools, product work, and the code between them.
            </Heading>
          </AnimationReveal>

          <div className="mt-14 max-w-3xl border-t border-border">
            {CAPABILITIES.map((item, index) => (
              <AnimationReveal
                key={item.title}
                amount={0.25}
                delay={index * 0.08}
                className="border-b border-border py-10"
              >
                <Heading as="h3" variant="heading-3">
                  {item.title}
                </Heading>
                <Paragraph
                  variant="muted"
                  className="mt-4 max-w-2xl"
                >
                  {item.copy}
                </Paragraph>
              </AnimationReveal>
            ))}
          </div>
        </div>
      </SectionBlock>
    </section>
  );
}
