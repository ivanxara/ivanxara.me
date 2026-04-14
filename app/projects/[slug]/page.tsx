import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  projects,
} from "@/components/website/content";
import { ProjectDetailScreen } from "@/components/website/project-detail-screen";
import { PortfolioShell } from "@/components/website/portfolio-shell";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ivan Xara",
    };
  }

  return {
    title: `${project.title} | Ivan Xara`,
    description: project.overview,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <PortfolioShell screen={<ProjectDetailScreen project={project} />} />;
}
