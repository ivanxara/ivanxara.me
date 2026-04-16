import ProjectDetailScreen from "@/components/project/project-detail-screen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Demo | Ivan Xara",
  description: "Static demo project page focused on UI and UX presentation.",
};

export default function ProjectPage() {
  return <ProjectDetailScreen />;
}
