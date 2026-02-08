"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="py-8"
    >
      <nav className="flex items-center justify-between">
        <span className="text-sm tracking-wide text-muted-foreground">
          ivan xara
        </span>

        <div className="flex items-center gap-5">
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-[18px] h-[18px]" />
          </motion.a>
          <motion.a
            href="mailto:hello@ivanxara.dev"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-[18px] h-[18px]" />
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
