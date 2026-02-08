"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  SiNextdotjs,
  SiStripe,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Next.js": SiNextdotjs,
  Stripe: SiStripe,
  PostgreSQL: SiPostgresql,
  React: SiReact,
  "Node.js": SiNodedotjs,
  TypeScript: SiTypescript,
  Zoho: () => <span className="text-[10px] font-semibold">Z</span>,
  API: () => <span className="text-[9px] font-semibold">API</span>,
  D3: () => <span className="text-[10px] font-semibold">D3</span>,
};

const projects = [
  {
    title: "ShopFlow",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "CRM Integration",
    image: "/projects/crm.jpg",
    tags: ["Zoho", "API", "Node.js"],
  },
  {
    title: "Metricly",
    image: "/projects/analytics.jpg",
    tags: ["React", "D3", "TypeScript"],
  },
  {
    title: "HelpDesk Pro",
    image: "/projects/support.jpg",
    tags: ["Zoho", "React", "API"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card border border-border/50">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-base font-medium tracking-tight">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5">
            {project.tags.map((tag) => {
              const Icon = iconMap[tag];
              return (
                <div
                  key={tag}
                  className="w-6 h-6 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground"
                  title={tag}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work" className="pb-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm text-muted-foreground mb-8"
      >
        selected work
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
