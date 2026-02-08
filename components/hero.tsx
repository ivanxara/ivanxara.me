"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="text-2xl font-extrabold tracking-tighter"
      >
        <span className="block">
          {"i'm ivan"} <span className="inline-block ml-1">{"✌️"}</span>
        </span>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="block text-muted-foreground"
        >
          full-stack software engineer · saas & zoho
        </motion.span>
      </motion.h1>
    </section>
  );
}
