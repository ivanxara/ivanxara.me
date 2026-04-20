import type { IconType } from "react-icons";
import {
  SiGooglegemini,
  SiNextdotjs,
  SiNuxt,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import type { TechnologyIconKey } from "@/types/technologies";

export const TECHNOLOGY_META: Record<
  TechnologyIconKey,
  { label: string; detail: string; icon: IconType }
> = {
  nextjs: {
    label: "Next.js",
    detail:
      "App Router, server actions, protected layouts, and API routes for a full-stack product surface.",
    icon: SiNextdotjs,
  },
  typescript: {
    label: "TypeScript",
    detail:
      "Shared contracts across forms, AI payloads, database inserts, and dashboard rendering.",
    icon: SiTypescript,
  },
  supabase: {
    label: "Supabase",
    detail:
      "Authentication, relational data, subscription-aware access control, and persisted analysis history.",
    icon: SiSupabase,
  },
  gemini: {
    label: "Gemini AI",
    detail:
      "Schema-constrained multimodal generation with deterministic JSON output instead of free-form text.",
    icon: SiGooglegemini,
  },
  stripe: {
    label: "Stripe",
    detail:
      "Checkout, subscription lifecycle sync, webhook idempotency, and revenue-critical state updates.",
    icon: SiStripe,
  },
  nuxt: {
    label: "Nuxt",
    detail:
      "Used for application structure, routing, and production-ready Vue delivery.",
    icon: SiNuxt,
  },
  vue: {
    label: "Vue",
    detail: "Used to build reactive interfaces and reusable UI components.",
    icon: SiVuedotjs,
  },
  tailwind: {
    label: "Tailwind CSS",
    detail:
      "Used to ship a premium landing-to-dashboard experience without losing iteration speed.",
    icon: SiTailwindcss,
  },
};
