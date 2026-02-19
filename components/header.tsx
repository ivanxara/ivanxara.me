// components/header.tsx
"use client";
import { motion } from "framer-motion";

export function Header() {
  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6"
    >
      <nav className="flex items-center gap-8 px-8 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-border/40 rounded-full shadow-sm">
        <a href="#" className="font-bold tracking-tighter text-lg mr-4">IX.</a>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}