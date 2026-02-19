"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  // Mouse tracking for the subtle background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing the mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="pt-32">
      {/* ... Background and Badge ... */}

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* New Headline: More Authority, Less Generic */}
        <div className="flex flex-col mb-10 items-center justify-center">
          {/* Container 1: Keep overflow-hidden here for the entrance animation */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease, delay: 0.3 }}
              className="block text-[12vw] md:text-[7.5vw] italic font-serif text-primary px-2"
            >
              Fullstack
            </motion.span>
          </div>

          {/* Container 2: REMOVE overflow-hidden so it can overlap the one above */}
          <div className="flex items-center justify-center -mt-[4vw] md:-mt-[4vw]">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className="relative z-10 text-[11vw] md:text-[7vw] leading-none font-bold tracking-[-0.03em]"
            >
              Developer
            </motion.h1>
          </div>
        </div>

        {/* Refined Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          I help companies automate complexity through
          <span className="text-foreground font-medium">
            {" "}
            custom Zoho integrations
          </span>{" "}
          and
          <span className="text-foreground font-medium">
            {" "}
            robust SaaS architecture
          </span>
        </motion.p>

        {/* CTAs and everything else remains the same */}
      </div>
    </section>
  );
}
