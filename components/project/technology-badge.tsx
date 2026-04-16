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

type TechnologyBadgeProps = {
  technology: TechnologyIconKey;
  compact?: boolean;
};

export function TechnologyBadge({
  technology,
  compact = false,
}: TechnologyBadgeProps) {
  const { icon: Icon, label } = technologies[technology];

  return (
    <span
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full bg-white/[0.04] text-ink-secondary ${
        compact ? "h-8 w-8" : "h-10 w-10"
      }`}
    >
      <Icon
        aria-hidden="true"
        className={compact ? "h-4 w-4 text-ink" : "h-[1.125rem] w-[1.125rem] text-ink"}
      />
    </span>
  );
}

const technologies: Record<
  TechnologyIconKey,
  { label: string; icon: IconType }
> = {
  nextjs: { label: "Next.js", icon: SiNextdotjs },
  supabase: { label: "Supabase", icon: SiSupabase },
  typescript: { label: "TypeScript", icon: SiTypescript },
  gemini: { label: "Google Gemini AI", icon: SiGooglegemini },
  stripe: { label: "Stripe", icon: SiStripe },
  nuxt: { label: "Nuxt 3", icon: SiNuxt },
  vue: { label: "Vue 3", icon: SiVuedotjs },
  tailwind: { label: "Tailwind CSS", icon: SiTailwindcss },
};
