// components/work.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";

const projects = [
  {
    title: "athlt.link",
    year: "2024",
    role: "Design & Development",
    colors: ["#F7E38A", "#B6A34A"],
    technologies: ["Nuxt", "Vue", "Supabase"],
  },
  {
    title: "relevoai.com",
    year: "2024",
    role: "Design & Development",
    colors: ["#62D6FF", "#1A7EB3"],
    technologies: ["Next.js", "AI"],
  },
  {
    title: "z2g",
    year: "2024",
    role: "Design & Development",
    colors: ["#B68BFF", "#5E3DD2"],
    technologies: ["Next.js", "Supabase"],
  },
  {
    title: "reidompipas.com",
    year: "2023",
    role: "Design & Development",
    colors: ["#FF9F9F", "#C94C4C"],
    technologies: ["Next.js", "Supabase"],
  },
];

export function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.8 });

  const itemHeight = 140;
  const previewWidth = 400;
  const previewHeight = 240;

  const yTarget = useMemo(() => {
    if (hoveredIndex === null) return 0;
    return -(previewHeight * hoveredIndex);
  }, [hoveredIndex]);

  return (
    <section id="work" className="py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
          Selected Work
        </h2>
        <div className="h-px w-full bg-border" />
      </motion.div>

      <div
        ref={containerRef}
        className="relative"
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          mouseX.set(e.clientX - rect.left - previewWidth / 2);
          mouseY.set(e.clientY - rect.top - previewHeight / 2);
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-between border-b border-border/40 hover:border-foreground transition-colors cursor-pointer"
              style={{ height: itemHeight }}
            >
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className={cn(
                  "text-5xl md:text-7xl font-bold tracking-tight transition-all duration-500",
                  hoveredIndex === i ? "translate-x-4 text-foreground" : "text-muted-foreground"
                )}>
                  {p.title}
                </h3>
                <span className={cn(
                  "text-base md:text-lg transition-all duration-500 delay-75",
                  hoveredIndex === i ? "translate-x-4 opacity-100" : "opacity-0 -translate-y-2"
                )}>
                  {p.role} — {p.year}
                </span>
              </div>
              
              <div className="hidden md:block text-right relative z-10">
                <span className={cn(
                  "text-sm uppercase tracking-widest transition-opacity duration-300",
                  hoveredIndex === i ? "opacity-100" : "opacity-40"
                )}>
                  {p.technologies.join(" / ")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Preview: Restored logic from original work.tsx */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <motion.div
            className="absolute z-20 overflow-hidden rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.8,
            }}
            style={{
              width: previewWidth,
              height: previewHeight,
              x: springX,
              y: springY,
            }}
          >
            <motion.div
              animate={{ y: yTarget }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 w-full"
            >
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="w-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ 
                    height: previewHeight,
                    background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`
                  }}
                >
                  {p.title.charAt(0).toUpperCase()}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}