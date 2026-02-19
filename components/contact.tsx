// components/contact.tsx
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="pt-40 pb-20 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[15vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase">
              Let&apos;s <br /> <span className="text-primary italic">Talk.</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <p className="text-2xl md:text-3xl font-medium leading-tight opacity-80">
              Have a project in mind or just want to say hello? I&apos;m always open to new opportunities.
            </p>
            
            <a
              href="mailto:hello@ivanxara.dev"
              className="group relative inline-flex items-center gap-4 text-3xl md:text-5xl font-bold tracking-tighter hover:text-primary transition-colors"
            >
              hello@ivanxara.dev
              <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-4 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-background/10 gap-8">
          <div className="flex gap-8">
            <a href="https://github.com" className="hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest">Github</a>
            <a href="https://linkedin.com" className="hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest">Linkedin</a>
          </div>
          
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40">
            © 2026 Ivan Xara. Architecting with intent.
          </p>
        </div>
      </div>
    </section>
  );
}