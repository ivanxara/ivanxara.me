"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { fadeTransition } from "@/components/animations";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={fadeTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
