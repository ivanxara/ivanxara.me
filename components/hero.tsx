"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col px-6 md:px-12 bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* 1. Structural Spacer for Fixed Navbar */}
      <div className="h-24 md:h-32 shrink-0" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative z-10"
      >
        {/* 2. Direct Greeting */}
        <motion.div variants={item} className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-medium text-muted-foreground tracking-tight">
            Hello, I&apos;m <span className="text-foreground font-bold">Ivan</span> 
          </h1>
          <motion.span 
            className="text-2xl md:text-3xl"
            animate={{ rotate: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            👋
          </motion.span>
        </motion.div>

        {/* 3. Rounded Identity Pill */}
        <motion.div variants={item} className="mb-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-foreground text-background shadow-lg shadow-foreground/5">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
              Full Stack Engineer
            </h2>
          </div>
        </motion.div>

        {/* 4. Duality Description */}
        <motion.div variants={item} className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            Architecting <span className="text-foreground font-medium">Zoho Ecosystems</span> by day. <br className="hidden md:block" />
            Building independent <span className="text-foreground font-medium">SaaS products</span> by night.
          </p>
          
          <div className="h-px w-12 bg-border hidden md:block" />
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60">Based in</span>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Portugal, PT</span>
          </div>
        </motion.div>

        {/* 5. Minimalist CTA / Scroll Indicator */}
        <motion.div
          variants={item}
          className="mt-20 flex items-center gap-4"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-border hover:border-primary hover:text-primary transition-colors duration-300"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.a>
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
            Scroll to discover
          </span>
        </motion.div>
      </motion.div>

      {/* 6. Refined Background Texture */}
      {/* Subtle blur orbs using your theme colors */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Decorative vertical line (Branding) */}
      <div className="absolute left-6 md:left-12 bottom-0 w-[1px] h-32 bg-gradient-to-t from-border to-transparent hidden lg:block" />
    </section>
  );
}