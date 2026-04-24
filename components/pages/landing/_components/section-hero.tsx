"use client";

import {
  motion,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";

export function SectionHero({ progress }: { progress: MotionValue<number> }) {
  const scrollY = useTransform(progress, [0, 1], [0, -60]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const driftX = useSpring(rawX, { stiffness: 35, damping: 22, mass: 1 });
  const driftY = useSpring(rawY, { stiffness: 35, damping: 22, mass: 1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawX.set(((e.clientX - cx) / cx) * 14);
      rawY.set(((e.clientY - cy) / cy) * 9);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <section
      id="top"
      className="relative flex  lg:min-h-[calc(100dvh-6rem)] scroll-mt-28 flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-20"
    >
      {/* Vertical tag — right edge, barely visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="select-none font-mono text-[9px] uppercase tracking-[0.38em] text-muted-foreground opacity-[0.15]">
          zoho developer + full-stack builder — portugal
        </span>
      </motion.div>

      <div className="relative z-10 flex flex-col">
        {/* Scroll parallax wrapper */}
        <motion.div style={{ y: scrollY }}>
          {/* Mouse parallax wrapper */}
          <motion.div style={{ x: driftX, y: driftY }}>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.08,
                  duration: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="select-none text-[clamp(5rem,16vw,13rem)] font-black tracking-[-0.065em] leading-none text-foreground"
              >
                ivan
              </motion.h1>
            </div>

            {/* Aumenta pt para dar espaço ao acento — mt igual para compensar */}
            <div className="overflow-hidden -mt-4 md:-mt-14">
              <motion.span
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.22,
                  duration: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="select-none text-[clamp(5rem,16vw,13rem)] font-black tracking-[-0.065em] leading-none text-foreground"
                style={{ marginLeft: "clamp(2.6rem, 18vw, 10.5rem)" }}
              >
                xará
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Descriptor — só isto, sem bordas, sem meta */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.9, ease: "easeOut" }}
          className="mt-14 max-w-[20rem] text-[12px] leading-[1.8] text-muted-foreground opacity-40"
        >
          Zoho developer building CRM, Creator, and full-stack systems that turn
          complex business workflows into software people can actually use.
        </motion.p>
      </div>
    </section>
  );
}
