"use client";

import { AnimationReveal } from "@/components/animations";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Heading } from "@/components/typography";
import { SectionBlock } from "@/components/shared/section-block";
import { MY_SOCIALS, MY_EMAIL } from "@/utils/constants";
import { trackVisitorClick } from "@/utils/visitor-clicks";

export function Footer() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-border pb-28 lg:pb-12 pt-4 mt-20"
    >
      <PageWrapper>
        <SectionBlock title="Get in touch" className="max-w-5xl pb-0">
          <AnimationReveal>
            <a
              href={`mailto:${MY_EMAIL}`}
              onClick={() =>
                trackVisitorClick({
                  clickId: "email",
                })
              }
              className="group block"
            >
              <Heading
                variant="heading-2"
                className="transition-colors duration-500 group-hover:text-primary"
              >
                {MY_EMAIL}
              </Heading>
            </a>
          </AnimationReveal>

          <AnimationReveal className="mt-12 flex items-center gap-6">
            {MY_SOCIALS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() =>
                  trackVisitorClick({
                    clickId: `social:${link.label.toLowerCase()}`,
                  })
                }
                className="group flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground"
                target="_blank"
              >
                <link.icon className="size-3" />
                {link.label}
              </a>
            ))}
          </AnimationReveal>

          <div className="mt-28 flex flex-col justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-40">
              © 2026 ivan xará
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-40">
              Portugal — Worldwide
            </p>
          </div>
        </SectionBlock>
      </PageWrapper>
    </section>
  );
}
