import { JourneyView, type ExperienceItem } from "@/components/journey/journey-view";
import { getExperiences } from "@/lib/content";

export default async function AboutPage() {
  const experiences = await getExperiences();
  return <JourneyView experiences={experiences as ExperienceItem[]} />;
}
