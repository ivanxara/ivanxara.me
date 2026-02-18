"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="flex items-center gap-2">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          ivan xara
        </a>
      </div>

      <nav className="flex items-center gap-6 md:gap-10">
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#work"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Work
          </a>
          <a
            href="#experience"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
        <Button
          asChild
          className="bg-foreground text-background hover:bg-foreground/80 rounded-full px-6 transition-all"
          variant="default"
        >
          <a href="#contact">Let's Connect</a>
        </Button>
      </nav>
    </motion.header>
  );
}

export const Navbar = Header;
