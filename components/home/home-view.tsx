"use client";

import {
  Activity,
  Code2,
  Globe2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  BuildStackDNASection,
  CoreTechnologiesSection,
  HeroSection,
  TestimonialsSection,
  TrustedCompaniesSection,
} from "@/components/home/home-sections";
import { coreTechs } from "@/lib/site-data";
import { getSafeImageSrc } from "@/lib/image";

type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  slug: string;
};

type HomeViewProps = {
  projects: ProjectItem[];
  technologies: typeof coreTechs;
  homeContent: {
    heroImageUrl?: string;
    trustedCompanies?: { name: string; color?: string }[];
    testimonials?: { text: string; name: string; role: string }[];
  };
};

export function HomeView({ projects, technologies, homeContent }: HomeViewProps) {
  const [expandedTestimonials, setExpandedTestimonials] = useState<Record<number, boolean>>({});
  const heroImageSrc = getSafeImageSrc(homeContent.heroImageUrl);
  const techStack = technologies.length ? technologies : coreTechs;
  const trustCards = (homeContent.trustedCompanies?.length ? homeContent.trustedCompanies : [
    { name: "Tech4edges", color: "var(--primary)" },
    { name: "Anora", color: "var(--secondary)" },
    { name: "Nextt", color: "#8B5CF6" },
    { name: "DevMates", color: "#F59E0B" },
  ]).map((item, index) => {
    const icons = [Globe2, Zap, Activity, Code2];
    return {
      ...item,
      icon: icons[index % icons.length],
      color: item.color || "var(--primary)",
    };
  });
  const trustLoop = [...trustCards, ...trustCards, ...trustCards, ...trustCards];
  const trustLoopForward = [...trustCards, ...trustCards, ...trustCards];
  const trustLoopReverse = [...trustCards].reverse().concat([...trustCards].reverse(), [...trustCards].reverse());
  const testimonials = homeContent.testimonials?.length
    ? homeContent.testimonials
    : [
        {
          text: "Muhammad's technical expertise and dedication to delivering quality solutions made our collaboration seamless. His MERN stack skills are top-notch.",
          name: "Sarah Johnson",
          role: "Product Manager at Tech4edges",
        },
        {
          text: "Working with Jalal on our event platform was a game-changer. He brought innovative solutions and maintained excellent code quality throughout the project.",
          name: "Ahmed Khan",
          role: "Co-founder at Nextt",
        },
        {
          text: "His ability to scale applications and manage complex systems is impressive. A reliable developer who consistently delivers beyond expectations.",
          name: "Emily Chen",
          role: "CTO at StartupHub",
        },
      ];

  return (
    <div className="relative sm:-mt-24 sm:min-h-screen">
      <HeroSection heroImageSrc={heroImageSrc} projectCount={projects.length || 12} responseTimeLabel="under 24 hours" />
      <BuildStackDNASection />
      <CoreTechnologiesSection techStack={techStack} />
      <TrustedCompaniesSection trustLoop={trustLoop} trustLoopForward={trustLoopForward} trustLoopReverse={trustLoopReverse} />
      <TestimonialsSection
        testimonials={testimonials}
        expandedTestimonials={expandedTestimonials}
        onToggleExpanded={(index) =>
          setExpandedTestimonials((state) => ({
            ...state,
            [index]: !state[index],
          }))
        }
      />

      <section className="hidden">
        {projects.map((project) => (
          <Link key={project._id} href={`/work/${project.slug}`}>
            {project.title}
          </Link>
        ))}
      </section>
    </div>
  );
}
