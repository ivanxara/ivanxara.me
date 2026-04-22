"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { SectionBlock } from "@/components/shared/section-block";
import { fadeUp } from "@/lib/animations/motion";

export function SectionAbout({ progress }: { progress: MotionValue<number> }) {
  const sectionY = useTransform(progress, [0, 1], [0, -36]);

  return (
    <motion.section id="about" style={{ y: sectionY }}>
      <SectionBlock title="About" className="scroll-mt-28">
        <div className="max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2 className="mb-6 max-w-4xl text-[clamp(1.9rem,5vw,4rem)] font-black leading-[1.03] tracking-[-0.07em] text-foreground">
              bridging the gap between{" "}
              <span className="italic text-primary">design intent</span>{" "}
              and functional systems.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Focused on making digital experiences feel seamless, useful, and
              visually intentional without overcomplicating the product.
            </p>
          </motion.div>
        </div>
      </SectionBlock>
    </motion.section>
  );
}
