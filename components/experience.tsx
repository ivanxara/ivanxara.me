// components/experience.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const journey = [
  {
    organization: "Loba",
    website: "https://loba.com/",
    role: "Zoho Developer",
    period: "2023 - Present",
    description: "Building and evolving end-to-end Zoho solutions, from system architecture and data structures to automation, scripting, and integrations."
  },
  {
    organization: "University of Aveiro",
    website: "https://www.ua.pt/pt/esan",
    role: "Software Development",
    period: "2021 - 2023",
    description: "Focused on software development fundamentals, databases, and hands-on technical projects."
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-6 mb-20"
      >
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground">Career Journey</h2>
        <div className="h-px flex-1 bg-border/50" />
      </motion.div>

      <div className="relative border-l border-border/50 ml-4 md:ml-0 md:pl-0">
        {journey.map((j, i) => (
          <motion.div
            key={j.organization}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative pl-12 pb-24 last:pb-0 group"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:scale-150 transition-all" />
            
            <div className="grid md:grid-cols-[1fr_2.5fr] gap-4 md:gap-12">
              <div className="text-sm font-mono text-muted-foreground pt-1.5 uppercase tracking-tighter">
                {j.period}
              </div>
              
              <div className="space-y-4">
                <a href={j.website} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <h3 className="text-4xl font-black tracking-tighter hover:text-primary transition-colors flex items-center gap-2">
                    {j.organization}
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </a>
                <div className="text-xl font-bold text-foreground/90 italic">
                  {j.role}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  {j.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}