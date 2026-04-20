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
  repository?: string;
  featureIntro?: string;
  featureCards?: ProjectFeatureItem[];
  gallery?: StaticImageData[];
};
