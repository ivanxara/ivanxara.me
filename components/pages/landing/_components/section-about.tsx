"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { SectionBlock } from "@/components/shared/section-block";
import { fadeUp } from "@/lib/animations/motion";

export function SectionAbout({
  progress,
  enableDepthMotion,
}: {
  progress: MotionValue<number>;
  enableDepthMotion?: boolean;
}) {
  const sectionY = useTransform(progress, [0, 1], [0, -36]);

  return (
    <motion.section
      id="about"
      style={enableDepthMotion ? { y: sectionY } : undefined}
    >
      <SectionBlock title="About" className="scroll-mt-28">
        <div className="max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2 className="mb-6 max-w-4xl text-[clamp(1.9rem,5vw,4rem)] font-black leading-[1.03] tracking-[-0.07em] text-foreground">
              turning{" "}
              <span className="italic text-primary">complex operations</span>{" "}
              into clear, scalable digital systems.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Core work centered on Zoho CRM and Zoho Creator, with a focus on
              automations, custom modules, and internal tools. When a product
              needs more than low-code alone, the stack extends into Next.js,
              TypeScript, and Supabase to deliver stronger workflows,
              visibility, and user experience.
            </p>
          </motion.div>
        </div>
      </SectionBlock>
    </motion.section>
  );
}
