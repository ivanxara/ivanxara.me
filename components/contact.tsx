"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";

const links = [
  { name: "Email", href: "mailto:hello@ivanxara.dev", icon: Mail },
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm text-muted-foreground mb-8"
      >
        {"let's connect"}
      </motion.p>

      <div className="flex flex-wrap gap-3">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            target={link.name !== "Email" ? "_blank" : undefined}
            rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border/50 rounded-full text-sm font-medium hover:border-border transition-colors"
          >
            <link.icon className="w-4 h-4 text-muted-foreground" />
            {link.name}
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
