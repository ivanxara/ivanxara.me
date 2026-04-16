import type { StaticImageData } from "next/image";
import type { TechnologyIconKey } from "@/types/technologies";

export type PortfolioProjectMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type PortfolioProjectHighlight = {
  title: string;
  description: string;
};

export type PortfolioProjectGalleryItem = {
  title: string;
  description: string;
  image: StaticImageData;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  role: string;
  year: string;
  colors: [string, string];
  technologies: TechnologyIconKey[];
  image?: StaticImageData;
  overview: string;
  challenge: string;
  outcome: string;
  contributions: string[];
  intro?: string;
  metrics?: PortfolioProjectMetric[];
  highlights?: PortfolioProjectHighlight[];
  gallery?: PortfolioProjectGalleryItem[];
};
