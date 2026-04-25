"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Rocket, Users } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

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
              <motion.div
                key={node.title}
                className="relative pl-16 sm:pl-24"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${node.color}20`,
                    border: `2px solid ${node.color}`,
                    boxShadow: `0px 0px 24px ${node.color}40`,
                  }}
                  whileHover={{ scale: 1.1, boxShadow: `0px 0px 32px ${node.color}60` }}
                >
                  <node.icon size={18} style={{ color: node.color }} />
                </motion.div>

                <SpotlightCard className="rounded-2xl p-4 sm:p-8" >
                  <div className="relative z-10">
                    <h3 className="mb-4" style={{ color: node.color }}>
                      {node.title}
                    </h3>
                    {"timeframe" in node && node.timeframe ? (
                      <p className="mb-4 text-sm uppercase tracking-[0.12em]" style={{ color: "color-mix(in srgb, var(--foreground) 60%, transparent)" }}>
                        {node.timeframe}
                      </p>
                    ) : null}
                    <p className="mb-6 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                      {node.content}
                    </p>

                    {"businesses" in node && node.businesses ? (
                      <div className="grid sm:grid-cols-2 gap-4 mt-6">
                        {node.businesses.map((business) => (
                          <SpotlightCard
                            key={business.name}
                            className="p-6 rounded-xl backdrop-blur-md"
                            style={{ background: "var(--glass-bg)", borderColor: `${node.color}40` }}
                          >
                            <h4 className="mb-2 text-[var(--foreground)] text-xl">{business.name}</h4>
                            <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>{business.description}</p>
                          </SpotlightCard>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
