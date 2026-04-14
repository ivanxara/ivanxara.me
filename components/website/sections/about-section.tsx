"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { fadeUp } from "@/components/website/motion";

export function AboutSection({ progress }: { progress: MotionValue<number> }) {
  const sectionY = useTransform(progress, [0, 1], [0, -36]);

  return (
    <section id="about" className="scroll-mt-28 py-20 sm:py-28">
      <motion.div className="max-w-5xl" style={{ y: sectionY }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="mb-6 max-w-4xl text-[clamp(1.9rem,5vw,4rem)] font-black leading-[1.03] tracking-[-0.07em] text-ink">
            bridging the gap between{" "}
            <span className="italic text-accent">design intent</span>{" "}
            and functional systems.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Focused on making digital experiences feel seamless, useful, and
            visually intentional without overcomplicating the product.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
