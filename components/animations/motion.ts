import type { Transition } from "framer-motion";

export const motionEase = {
  emphasized: [0.16, 1, 0.3, 1],
  smooth: [0.22, 1, 0.36, 1],
} as const;

export const revealTransition = {
  duration: 0.9,
  ease: motionEase.emphasized,
} satisfies Transition;

export const fadeTransition = {
  duration: 0.8,
  ease: motionEase.emphasized,
} satisfies Transition;
