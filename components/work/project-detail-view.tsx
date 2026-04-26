"use client";

import { useScroll, useTransform } from "framer-motion";
import { Code2, ListTree, MonitorPlay, Sparkles, Zap } from "lucide-react";
import { useState, useRef } from "react";
import {
  ProjectHeroBanner,
  ProjectResultsSection,
  ProjectStoryMode,
  ProjectToc,
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
  const [storyMode, setStoryMode] = useState(false);
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
    results: [
      { label: "Page Speed", value: "92+", hint: "Lighthouse performance score on optimized route." },
      { label: "Engagement", value: "+38%", hint: "Higher user interaction after UX redesign." },
      { label: "Delivery", value: "2x faster", hint: "Reusable modules reduced iteration time." },
    ],
    storySections: [
      {
        title: "Problem",
        content:
          "The product required a reliable full-stack architecture that could support rapid feature launches without sacrificing maintainability.",
      },
      {
        title: "Constraints",
        content:
          "Tight timeline, evolving requirements, and the need for smooth performance on mid-range mobile devices.",
      },
      {
        title: "Approach",
        content:
          "Built modular UI and API layers with reusable patterns, clear ownership boundaries, and early performance profiling.",
      },
      {
        title: "Result",
        content:
          "Shipped a polished experience with predictable development velocity and measurable engagement improvements.",
      },
    ],
  };

  return (
    <div className="relative -mt-24 min-h-screen bg-[var(--background)]" ref={containerRef}>
      <ProjectHeroBanner image={projectData.image} title={projectData.title} tagline={projectData.tagline} y={y} opacity={opacity} />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-1.5 text-sm text-[var(--text-secondary)]">
            <Sparkles className="h-4 w-4" />
            Case-study storytelling
          </div>
          <button
            type="button"
            onClick={() => setStoryMode((state) => !state)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-4 py-2 text-sm font-semibold hover:border-[var(--primary)] transition-colors"
          >
            <ListTree className="h-4 w-4" />
            {storyMode ? "Standard Mode" : "Story Mode"}
          </button>
        </div>
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)_320px] gap-10 lg:gap-14">
          <div className="hidden lg:block">
            <ProjectToc showStoryMode={storyMode} />
          </div>

          <div className="space-y-16">
            <ProjectOverviewAndInnovations description={projectData.description} features={projectData.features} />
            <ProjectResultsSection results={projectData.results} />
            {storyMode ? <ProjectStoryMode sections={projectData.storySections} /> : null}
          </div>

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
