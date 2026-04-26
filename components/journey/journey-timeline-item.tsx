"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type JourneyTimelineItemProps = {
  icon: LucideIcon;
  title: string;
  content: string;
  color: string;
  timeframe?: string;
  index: number;
};

export function JourneyTimelineItem({ icon: Icon, title, content, color, timeframe, index }: JourneyTimelineItemProps) {
  return (
    <motion.div
      className="relative pl-16 sm:pl-24"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="absolute left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
        style={{
          background: `${color}20`,
          border: `2px solid ${color}`,
          boxShadow: `0px 0px 24px ${color}40`,
        }}
        whileHover={{ scale: 1.1, boxShadow: `0px 0px 32px ${color}60` }}
      >
        <Icon size={18} style={{ color }} />
      </motion.div>

      <SpotlightCard className="rounded-2xl p-4 sm:p-8">
        <div className="relative z-10">
          <h3 className="mb-4" style={{ color }}>
            {title}
          </h3>
          {timeframe ? (
            <p className="mb-4 text-sm uppercase tracking-[0.12em]" style={{ color: "color-mix(in srgb, var(--foreground) 60%, transparent)" }}>
              {timeframe}
            </p>
          ) : null}
          <p className="mb-6 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            {content}
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
