import ProjectDetailScreen from "@/components/pages/project-details/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/utils/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug as keyof typeof PROJECTS];

  if (!project) {
    return {
      title: "Project Not Found | Ivan Xara",
    };
  }

  return {
    title: `${project.title} | Ivan Xara`,
    description:
      project.overview?.[0] ??
      `${project.title} project case study by Ivan Xara.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS[slug as keyof typeof PROJECTS];

  if (!project) {
    notFound();
  }

  return <ProjectDetailScreen project={project} />;
}
