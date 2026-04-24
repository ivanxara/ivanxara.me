"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionBlock } from "@/components/shared/section-block";
import { fadeUp } from "@/lib/animations/motion";
import { MY_SOCIALS, MY_EMAIL } from "@/utils/constants";

export function Footer({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const sectionY = useTransform(progress, [0, 1], [0, 18]);

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 border-t border-border pb-28 lg:pb-12 pt-4"
      style={{ y: sectionY }}
    >
      <PageWrapper>
        <SectionBlock title="Get in touch" className="max-w-5xl pb-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <a href={`mailto:${MY_EMAIL}`} className="group block">
              <h2 className="text-[clamp(2rem,5.5vw,5.2rem)] font-black leading-[0.9] tracking-[-0.06em] text-foreground transition-colors duration-500 group-hover:text-primary">
                {MY_EMAIL}
              </h2>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 flex items-center gap-6"
          >
            {MY_SOCIALS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground"
                target="_blank"
              >
                <link.icon className="size-3" />
                {link.label}
              </a>
            ))}
          </motion.div>

          <div className="mt-28 flex flex-col justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-muted-foreground opacity-40">
              © 2026 ivan xará
            </p>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-muted-foreground opacity-40">
              Portugal — Worldwide
            </p>
          </div>
        </SectionBlock>
      </PageWrapper>
    </motion.section>
  );
}
