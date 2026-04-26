import { HomeView } from "@/components/home/home-view";
import { getHomeContent, getProjects, getTechnologies } from "@/lib/content";
import type { HomeContentSummary, ProjectSummary, TechnologySummary } from "@/lib/content-types";
import { coreTechs } from "@/lib/site-data";

export default async function Home() {
  const [projects, technologies, homeContent] = await Promise.all([getProjects(), getTechnologies(), getHomeContent()]);
  const typedProjects = projects as ProjectSummary[];
  const typedTechnologies = technologies as TechnologySummary[];
  const typedHomeContent = homeContent as HomeContentSummary;
  const techNames = typedTechnologies.length ? typedTechnologies.map((item) => item.name) : coreTechs;

  return <HomeView projects={typedProjects} technologies={techNames as typeof coreTechs} homeContent={typedHomeContent} />;
}
