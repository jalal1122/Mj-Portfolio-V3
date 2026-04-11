import { HomeView } from "@/components/home/home-view";
import { getProjects, getTechnologies } from "@/lib/content";
import { coreTechs } from "@/lib/site-data";

export default async function Home() {
  const [projects, technologies] = await Promise.all([getProjects(), getTechnologies()]);
  const techNames = technologies.length ? technologies.map((item: any) => item.name) : coreTechs;

  return <HomeView projects={projects as any} technologies={techNames as typeof coreTechs} />;
}
