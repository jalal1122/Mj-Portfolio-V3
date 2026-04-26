"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { JourneyTimelineItem } from "@/components/journey/journey-timeline-item";

export type ExperienceItem = {
  _id: string;
  role: string;
  company: string;
  timeframe: string;
  description: string;
  color?: string;
};

type JourneyViewProps = {
  experiences: ExperienceItem[];
};

const experiencePalette = ["#6366F1", "#8B5CF6", "#D946EF", "#10B981", "#F59E0B", "#0EA5E9"];

export function JourneyView({ experiences }: JourneyViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const experienceNodes = experiences.map((experience, index) => ({
    icon: Briefcase,
    title: `${experience.role} @ ${experience.company}`,
    content: experience.description,
    timeframe: experience.timeframe,
    color: experience.color || experiencePalette[index % experiencePalette.length],
  }));

  const learningNodes = [
    {
      icon: GraduationCap,
      title: "BSIT - Agriculture University Peshawar",
      content: "Strengthened software fundamentals, systems thinking, and practical product development mindset.",
      timeframe: "Academic Foundation",
      color: "#8B5CF6",
    },
    {
      icon: GraduationCap,
      title: "Advanced MERN + Next.js Practice",
      content: "Built full-stack portfolio projects focusing on scalable APIs, polished UI systems, and production deployment.",
      timeframe: "Continuous Learning",
      color: "#10B981",
    },
    {
      icon: GraduationCap,
      title: "AI Product Integration Track",
      content: "Hands-on implementation of AI-assisted workflows, automation patterns, and prompt-driven features for web apps.",
      timeframe: "Current Focus",
      color: "#D946EF",
    },
  ];

  return (
    <div ref={containerRef} className="relative -mt-24 -mb-24 min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-14 sm:mb-24" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)]">The Journey</h2>
          <p className="text-base sm:text-xl sub-heading" style={{ color: "var(--text-secondary)" }}>
            A timeline of growth, experience, and impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="relative">
            <p className="mb-6 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Professional Experience</p>
            <div className="absolute left-4 sm:left-6 top-10 bottom-0 w-[2px] bg-[var(--muted)]">
              <motion.div className="w-full origin-top" style={{ height: lineHeight, background: "linear-gradient(to bottom, #6366F1, #10B981)" }} />
            </div>
            <div className="space-y-14 sm:space-y-24">
              {experienceNodes.map((node, index) => (
                <JourneyTimelineItem
                  key={node.title}
                  icon={node.icon}
                  title={node.title}
                  content={node.content}
                  timeframe={"timeframe" in node ? node.timeframe : undefined}
                  color={node.color}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <p className="mb-6 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Learning Milestones</p>
            <div className="absolute left-4 sm:left-6 top-10 bottom-0 w-[2px] bg-[var(--muted)]">
              <motion.div className="w-full origin-top" style={{ height: lineHeight, background: "linear-gradient(to bottom, #8B5CF6, #D946EF)" }} />
            </div>
            <div className="space-y-14 sm:space-y-24">
              {learningNodes.map((node, index) => (
                <JourneyTimelineItem
                  key={node.title}
                  icon={node.icon}
                  title={node.title}
                  content={node.content}
                  timeframe={node.timeframe}
                  color={node.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
