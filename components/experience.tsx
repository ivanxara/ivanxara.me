"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const journey = [
  {
    organization: "Loba",
    website: "https://loba.com/",
    role: "Zoho Developer",
    period: "2023 - Present",
    description:
      "Building and evolving end-to-end Zoho solutions, from system architecture and data structures to automation, scripting, and integrations.",
  },
  {
    organization: "University of Aveiro",
    website: "https://www.ua.pt/pt/esan",
    role: "Student - Software Development",
    period: "2021 - 2023",
    description:
      "Focused on software development fundamentals, databases, and hands-on technical projects.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
          Experience
        </h2>
        <div className="h-px w-full bg-border" />
      </motion.div>

      <div className="space-y-16">
        {journey.map((j, i) => (
          <motion.div
            key={j.organization}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 group"
          >
            <div className="text-muted-foreground font-mono text-sm pt-2">
              {j.period}
            </div>
            
            <div className="space-y-4">
              <a
                href={j.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors inline-flex items-center gap-2">
                  {j.organization}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>
              </a>
              <div className="text-xl font-medium text-foreground/80">
                {j.role}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {j.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
