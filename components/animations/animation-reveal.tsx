"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { revealTransition } from "@/components/animations/motion";

type AnimationRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  amount?: number;
  once?: boolean;
  trigger?: "view" | "mount";
} & Omit<
  HTMLMotionProps<"div">,
  "animate" | "children" | "initial" | "transition" | "viewport" | "whileInView"
>;

export function AnimationReveal({
  children,
  delay = 0,
  duration = revealTransition.duration,
  y = 36,
  scale,
  amount = 0.3,
  once = true,
  trigger = "view",
  ...props
}: AnimationRevealProps) {
  const initial = {
    opacity: 0,
    y,
    ...(scale !== undefined ? { scale } : {}),
  };
  const visible = {
    opacity: 1,
    y: 0,
    ...(scale !== undefined ? { scale: 1 } : {}),
  };

  return (
    <motion.div
      data-scroll-reveal={trigger}
      initial={initial}
      transition={{ ...revealTransition, delay, duration }}
      {...(trigger === "mount"
        ? { animate: visible }
        : { viewport: { once, amount }, whileInView: visible })}
      {...props}
    >
      {children}
    </motion.div>
  );
}
