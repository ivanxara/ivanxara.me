"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 pb-12 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-[90rem] mx-auto flex flex-col justify-between min-h-[60vh]">
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              Let's <br /> Talk.
            </h2>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed opacity-90 mb-12">
              Have a project in mind? <br />
              I'm always open to discussing new opportunities.
            </p>
            
            <a
              href="mailto:hello@ivanxara.dev"
              className="inline-flex items-center gap-3 text-2xl md:text-4xl font-bold hover:opacity-70 transition-opacity underline decoration-2 underline-offset-8"
            >
              hello@ivanxara.dev
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-24 border-t border-background/20 mt-auto">
          <div className="flex gap-4">
             <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background text-foreground rounded-full hover:scale-110 transition-transform"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background text-foreground rounded-full hover:scale-110 transition-transform"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-sm font-medium uppercase tracking-widest opacity-60">
            © 2026 Ivan Xara. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
