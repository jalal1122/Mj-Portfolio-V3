"use client";

import { motion } from "framer-motion";
import type { GitHubMetrics } from "@/lib/github";
import { ContributionsCard, ImpactCard, LanguageBreakdownCard } from "@/components/metrics/metrics-sections";

type MetricsViewProps = {
  metrics: GitHubMetrics;
};

export function MetricsView({ metrics }: MetricsViewProps) {
  const contributions = metrics.contributions;

  const getContributionColor = (level: number) => {
    const colors = [
      "var(--muted)",
      "color-mix(in srgb, var(--secondary) 25%, transparent)",
      "color-mix(in srgb, var(--secondary) 50%, transparent)",
      "var(--secondary)",
    ];
    return colors[level];
  };

  const languageData = metrics.languageData;

  return (
    <div className="relative -mt-24 -mb-24 min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-14 sm:mb-24" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)]">Metrics &amp; Stats</h2>
          <p className="text-base sm:text-xl sub-heading" style={{ color: "var(--text-secondary)" }}>
            Data-driven insights into development activity and impact for @{metrics.username}.
          </p>
        </motion.div>

        <div className="space-y-6">
          <ContributionsCard contributions={contributions} getContributionColor={getContributionColor} />

          <div className="grid lg:grid-cols-2 gap-6">
            <LanguageBreakdownCard languageData={languageData} />
            <ImpactCard impact={metrics.impact} />
          </div>
        </div>
      </div>
    </div>
  );
}
