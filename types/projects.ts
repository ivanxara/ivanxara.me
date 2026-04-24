import type { StaticImageData } from "next/image";
import type { TechnologyIconKey } from "@/types/technologies";

export type ProjectFeatureItem = {
  title: string;
  copy: string;
};

export type IProject = {
  slug: string;
  title: string;
  role: string;
  technologies: TechnologyIconKey[];
  image?: StaticImageData;
  eyebrow?: string;
  overviewTitle?: string;
  overviewAccent?: string;
  overview?: string[];
  repository?: {
    url?: string;
    private?: boolean;
  };
  featureIntro?: string;
  featureCards?: ProjectFeatureItem[];
  playSection?: boolean;
  galleryLayout?: "desktop" | "mobile";
  gallery?: StaticImageData[];
};
