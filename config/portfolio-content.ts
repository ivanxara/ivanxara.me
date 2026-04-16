import relevoai from "@/assets/img/relevoai_dark_landing.png";
import type { NavigationItem } from "@/types/content";
import type { PortfolioProject } from "@/types/projects";

export const navigationItems: NavigationItem[] = [
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const projects: PortfolioProject[] = [
  {
    slug: "zoho2git",
    title: "zoho2git",
    role: "Design & Development",
    year: "2024",
    colors: ["#111827", "#020617"],
    technologies: ["nextjs", "typescript", "supabase", "tailwind"],
    image: relevoai,
    overview:
      "Internal platform built to sync and version Zoho CRM, Recruit, and Creator functions into Git with a cleaner engineering workflow.",
    challenge:
      "Zoho scripting usually lives inside isolated products, which makes structured versioning, review, and deployment discipline much harder than in modern app stacks.",
    outcome:
      "z2g brought DevOps thinking into the Zoho ecosystem with real-time visibility, faster collaboration, and a much safer path for managing production scripts.",
    intro:
      "I treated zoho2git as an internal product rather than a utility script. The goal was to give teams a clear operational surface for syncing Zoho code, auditing changes, reviewing previous versions, and pushing updates into a real repository workflow.",
    contributions: [
      "Designed the product direction and end-to-end UX for technical users.",
      "Built the app with Next.js 14, TypeScript, Supabase, and TanStack tooling.",
      "Created a workflow focused on traceability, synchronization, and operational confidence.",
    ],
    metrics: [
      {
        label: "Connected surfaces",
        value: "CRM / Creator / Recruit",
        detail:
          "One internal system spanning the main Zoho scripting environments.",
      },
      {
        label: "Versioning model",
        value: "Snapshots per resource",
        detail:
          "Changes are normalized, compared, and stored before new code replaces the old state.",
      },
      {
        label: "Operational layer",
        value: "Realtime logs",
        detail:
          "Teams can inspect events, errors, and project activity without leaving the product.",
      },
    ],
    highlights: [
      {
        title: "A real product shell for a messy internal workflow",
        description:
          "Instead of exposing raw sync actions, the platform frames the work around projects, connected Zoho apps, repository context, and a calmer navigation model for technical teams.",
      },
      {
        title: "Selective refresh instead of blind full imports",
        description:
          "The CRM and Creator flows compare remote metadata against database state so only changed resources are refreshed, which keeps the process faster and easier to trust.",
      },
      {
        title: "Version history before each overwrite",
        description:
          "When code changes, the previous record is stored as a version snapshot. That makes the interface useful not just for syncing, but for reviewing and recovering work over time.",
      },
      {
        title: "Push to Bitbucket as part of the same flow",
        description:
          "Repositories can be created on demand and project code is pushed using a path structure organized by application, app name, and resource type, bringing Zoho scripts closer to standard engineering practice.",
      },
    ],
    gallery: [
      {
        title: "Creator resources with code inspection",
        description:
          "A split view for browsing workflows, opening the active script, and reviewing code in a more structured environment than Zoho normally provides.",
        image: relevoai,
      },
      {
        title: "Logs and project observability",
        description:
          "A searchable logs area with filters, realtime updates, and export actions so teams can inspect execution history without digging through fragmented systems.",
        image: relevoai,
      },
      {
        title: "Repository mapping and external Git context",
        description:
          "The product links each application surface to its Bitbucket destination, helping users understand where synced code lives and how it is organized.",
        image: relevoai,
      },
    ],
  },
  {
    slug: "relevoai",
    title: "relevo.ai",
    role: "Design & Development",
    year: "2024",
    colors: ["#2e2218", "#120d09"],
    technologies: ["nextjs", "typescript", "supabase", "gemini", "stripe"],
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
    role: "Design & Development",
    year: "2024",
    colors: ["#1f2b33", "#0b1014"],
    technologies: ["nuxt", "vue", "typescript", "supabase", "stripe"],
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
    role: "Design & Development",
    year: "2023",
    colors: ["#3b2318", "#140b08"],
    technologies: ["nextjs", "typescript", "supabase", "gemini"],
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
