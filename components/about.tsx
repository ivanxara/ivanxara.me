// components/about.tsx
"use client";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 grid md:grid-cols-2 gap-24">
      <div>
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
          The Approach
        </h2>
        <p className="text-3xl font-medium leading-tight tracking-tight">
          I believe that great software is invisible. It should solve complex
          problems through simple, predictable interfaces.
        </p>
      </div>
      <div className="space-y-12">
        <div className="h-px bg-border w-full" />
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">
              Philosophy
            </h4>
            <p className="text-sm text-muted-foreground">
              User-centered, performance-first, and strictly minimalist.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">
              Stack
            </h4>
            <p className="text-sm text-muted-foreground">
              Next.js, TypeScript, Zoho Creator, Supabase, Framer Motion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
