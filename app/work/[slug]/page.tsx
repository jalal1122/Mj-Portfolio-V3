import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/content";
import { ProjectDetailView } from "@/components/work/project-detail-view";

type Params = { params: Promise<{ slug: string }> };

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project: any = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
