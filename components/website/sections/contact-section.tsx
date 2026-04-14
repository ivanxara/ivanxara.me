"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { contactLinks } from "@/components/website/content";
import { fadeUp } from "@/components/website/motion";

export function ContactSection({ progress }: { progress: MotionValue<number> }) {
  const sectionY = useTransform(progress, [0, 1], [0, 18]);

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 border-t border-line px-6 pb-12 pt-24 sm:px-8 sm:pt-28"
      style={{ y: sectionY }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-muted opacity-40">
            Get in touch
          </p>
          <a href="mailto:hello@demo.studio" className="group block">
            <h2 className="text-[clamp(2rem,5.5vw,5.2rem)] font-black leading-[0.9] tracking-[-0.06em] text-ink transition-colors duration-500 group-hover:text-accent">
              hello@demo.studio
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
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2.5 text-[13px] font-semibold text-muted transition-colors duration-300 hover:text-ink"
            >
              <span className="font-mono text-[10px] text-muted opacity-30 transition-opacity duration-300 group-hover:opacity-70">
                {link.index}
              </span>
              {link.label}
            </a>
          ))}
        </motion.div>

        <div className="mt-28 flex flex-col justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-muted opacity-40">
            © 2026 ivan xara
          </p>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-muted opacity-40">
            Portugal — Worldwide
          </p>
        </div>
      </div>
    </motion.section>
  );
}
