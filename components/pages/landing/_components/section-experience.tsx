"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { SectionBlock } from "@/components/shared/section-block";
import { fadeUp } from "@/lib/animations/motion";
import { MY_EXPERIENCE } from "@/utils/constants";

export function SectionExperience({
  progress,
  enableDepthMotion,
}: {
  progress: MotionValue<number>;
  enableDepthMotion?: boolean;
}) {
  const sectionY = useTransform(progress, [0, 1], [0, -16]);

  return (
    <motion.section
      id="experience"
      style={enableDepthMotion ? { y: sectionY } : undefined}
    >
      <SectionBlock title="Journey" className="scroll-mt-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="max-w-4xl text-[clamp(1.8rem,4.5vw,4rem)] font-black leading-[1] tracking-[-0.06em] text-foreground">
            based in portugal. building digital systems for real business
            problems.
          </p>
        </motion.div>

        <div className="mt-14 border-t border-border sm:mt-16">
          {MY_EXPERIENCE.map((item, index) => (
            <motion.div
              key={`${item.organization}-${item.role}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1 }}
              className={`grid gap-4 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 ${
                index < MY_EXPERIENCE.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div>
                <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-black leading-[0.95] tracking-[-0.06em] text-foreground">
                  {item.organization}
                </h3>
                <p className="mt-2 text-sm font-semibold lowercase tracking-[-0.02em] text-muted-foreground">
                  {item.role}
                </p>
              </div>

              <div className="lg:pt-1">
                <span className="text-[13px] font-semibold lowercase tracking-[-0.01em] text-primary">
                  {item.period}
                </span>
                <p className="mt-3 max-w-lg text-sm leading-[1.7] lowercase tracking-[-0.01em] text-muted-foreground sm:text-[15px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>
    </motion.section>
  );
}
