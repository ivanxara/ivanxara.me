"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2024 - Present",
    description: "Building custom web solutions and Zoho integrations for clients worldwide.",
  },
  {
    company: "Tech Agency",
    role: "Senior Developer",
    period: "2022 - 2024",
    description: "Led development of enterprise web applications and mentored junior developers.",
  },
  {
    company: "Startup Inc.",
    role: "Frontend Developer",
    period: "2020 - 2022",
    description: "Built and maintained React applications for a growing B2B SaaS platform.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm text-muted-foreground mb-10"
      >
        experience
      </motion.p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="relative pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-muted-foreground bg-background" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-base font-medium tracking-tight">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {exp.role}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-3 max-w-md">
                    {exp.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground md:mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
