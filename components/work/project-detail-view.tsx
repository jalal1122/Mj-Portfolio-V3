"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, MonitorPlay, Zap } from "lucide-react";
import { useRef } from "react";
import {
  ProjectHeroBanner,
  ProjectMetaCard,
  ProjectOverviewAndInnovations,
} from "@/components/work/project-detail-sections";
import { getSafeImageSrc } from "@/lib/image";

type TechItem = { _id?: string; name?: string; color?: string } | string;

type ProjectDetailViewProps = {
  project: {
    title: string;
    description: string;
    cloudinaryImageUrl: string;
    techStack: TechItem[];
    githubLink?: string;
    liveLink?: string;
    slug?: string;
  };
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const title = project.title || "Project Showcase";

  const projectData = {
    title,
    tagline: "Redefining the standard for seamless management and analytics.",
    description:
      project.description ||
      "A comprehensive solution designed to scale gracefully while providing a hyper-intuitive user experience.",
    tech: (project.techStack ?? []).map((item) => ({
      label: typeof item === "string" ? item : item.name || "Tech",
      color: typeof item === "string" ? undefined : item.color,
    })),
    role: "Full Stack Developer",
    timeline: "2 Months",
    image: getSafeImageSrc(project.cloudinaryImageUrl),
    features: [
      {
        title: "Real-time Analytics",
        desc: "Live dashboard tracking key metrics with instant websocket updates.",
        icon: MonitorPlay,
      },
      {
        title: "Secure Authentication",
        desc: "Enterprise-grade security flow with RBAC and session management.",
        icon: Code2,
      },
      {
        title: "Lightning Fast API",
        desc: "Optimized serverless endpoints delivering responses in under 50ms.",
        icon: Zap,
      },
    ],
  };

  return (
    <div className="relative -mt-24 min-h-screen bg-[var(--background)]" ref={containerRef}>
      <ProjectHeroBanner image={projectData.image} title={projectData.title} tagline={projectData.tagline} y={y} opacity={opacity} />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-16">
          <ProjectOverviewAndInnovations description={projectData.description} features={projectData.features} />
          <ProjectMetaCard
            role={projectData.role}
            timeline={projectData.timeline}
            tech={projectData.tech}
            liveLink={project.liveLink}
            githubLink={project.githubLink}
          />
        </div>
      </div>
    </div>
  );
}
