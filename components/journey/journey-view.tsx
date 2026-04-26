"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
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

  const journeyNodes = [
    ...experienceNodes,
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

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[2px] bg-[var(--muted)]">
            <motion.div className="w-full origin-top" style={{ height: lineHeight, background: "linear-gradient(to bottom, #6366F1, #10B981)" }} />
          </div>

          <div className="space-y-14 sm:space-y-24">
            {journeyNodes.map((node, index) => (
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
      </div>
    </div>
  );
}
