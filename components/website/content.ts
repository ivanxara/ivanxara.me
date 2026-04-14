import type { StaticImageData } from "next/image";
import z2g from "@/assets/img/z2g_dark_creator.png";
import relevoai from "@/assets/img/relevoai_dark_landing.png";

export type PortfolioProject = {
  slug: string;
  title: string;
  role: string;
  year: string;
  colors: [string, string];
  technologies: string[];
  image?: StaticImageData;
  overview: string;
  challenge: string;
  outcome: string;
  contributions: string[];
};

export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  description: string;
};

export const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const projects: PortfolioProject[] = [
  {
    slug: "z2g",
    title: "z2g",
    role: "Design, Dev, Build & Deploy",
    year: "2024",
    colors: ["#111827", "#020617"],
    technologies: ["Next.js 14", "Supabase", "TanStack"],
    image: z2g,
    overview:
      "Internal platform built to sync and version Zoho CRM, Recruit, and Creator functions into Git with a cleaner engineering workflow.",
    challenge:
      "Zoho scripting usually lives inside isolated products, which makes structured versioning, review, and deployment discipline much harder than in modern app stacks.",
    outcome:
      "z2g brought DevOps thinking into the Zoho ecosystem with real-time visibility, faster collaboration, and a much safer path for managing production scripts.",
    contributions: [
      "Designed the product direction and end-to-end UX for technical users.",
      "Built the app with Next.js 14, TypeScript, Supabase, and TanStack tooling.",
      "Created a workflow focused on traceability, synchronization, and operational confidence.",
    ],
  },
  {
    slug: "relevoai",
    title: "relevoai.com",
    role: "Design, Dev, Build & Deploy",
    year: "2024",
    colors: ["#2e2218", "#120d09"],
    technologies: ["Next.js", "AI", "Stripe"],
    image: relevoai,
    overview:
      "AI-assisted technical analysis platform for traders, combining chart reading support, automated email notifications, and paid access flows.",
    challenge:
      "The product needed to make advanced analysis feel approachable while still supporting trust, clarity, and a clean premium experience.",
    outcome:
      "The final platform blended utility and conversion, connecting AI features with subscription mechanics and a focused product surface.",
    contributions: [
      "Shaped the interface and user journey around chart analysis workflows.",
      "Implemented the platform in Next.js with AI-driven features and Stripe checkout.",
      "Balanced product clarity with a more premium, conversion-aware experience.",
    ],
  },
  {
    slug: "athlt-link",
    title: "athlt.link",
    role: "Design, Dev, Build & Deploy",
    year: "2024",
    colors: ["#1f2b33", "#0b1014"],
    technologies: ["Nuxt", "Vue", "Supabase"],
    overview:
      "Sports scouting platform built around geolocation and digital athlete portfolios, helping discovery feel more direct and data-informed.",
    challenge:
      "The experience had to support both visibility for athletes and efficient filtering for scouts, without becoming visually noisy or overly complex.",
    outcome:
      "The result was a focused scouting product with subscription support and a clearer way to present athlete identity, location, and profile depth.",
    contributions: [
      "Defined a product direction centered on profile quality and discoverability.",
      "Built the application with Nuxt, Vue, and Supabase.",
      "Integrated subscription flows to support a scalable platform model.",
    ],
  },
  {
    slug: "rei-dom-pipas",
    title: "reidompipas.com",
    role: "Design, Dev, Build & Deploy",
    year: "2023",
    colors: ["#3b2318", "#140b08"],
    technologies: ["Next.js", "Supabase", "Backoffice"],
    overview:
      "Restaurant-focused system with a backoffice that automates visual asset creation for Instagram stories based on the daily menu.",
    challenge:
      "The product needed to remove repetitive manual work for the business while still preserving speed, consistency, and visual quality in its daily communication.",
    outcome:
      "The solution streamlined internal operations and made social content generation far more efficient through a purpose-built workflow.",
    contributions: [
      "Designed the backoffice flow around real operational routines.",
      "Built the app with Next.js and Supabase.",
      "Automated the generation of marketing-ready assets from menu data.",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const experience: ExperienceItem[] = [
  {
    organization: "loba",
    role: "zoho developer",
    period: "2023 — present",
    description:
      "architecting end-to-end zoho solutions, scripting, and system integrations.",
  },
  {
    organization: "univ. of aveiro",
    role: "software dev",
    period: "2021 — 2023",
    description:
      "deep dive into software development fundamentals, databases, and hands-on projects.",
  },
];

export const contactLinks = [
  { index: "01", label: "Github", href: "#" },
  { index: "02", label: "LinkedIn", href: "#" },
];
