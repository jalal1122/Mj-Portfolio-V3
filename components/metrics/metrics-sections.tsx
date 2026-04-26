"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";
import { Activity, Code, TrendingUp } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { GitHubMetrics } from "@/lib/github";

type ContributionsCardProps = {
  contributions: number[];
  getContributionColor: (level: number) => string;
};

export function ContributionsCard({ contributions, getContributionColor }: ContributionsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <SpotlightCard className="rounded-2xl p-4 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center border"
              style={{
                background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--secondary) 20%, transparent)",
              }}
            >
              <Activity size={24} style={{ color: "var(--secondary)" }} />
            </div>
            <h3 className="text-[var(--foreground)]">GitHub Activity</h3>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-grid grid-rows-7 gap-[3px]" style={{ gridAutoFlow: "column" }}>
              {contributions.map((level, index) => (
                <motion.div
                  key={`${level}-${index}`}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: getContributionColor(level) }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.001 }}
                  whileHover={{ scale: 1.5, boxShadow: "0px 0px 8px rgba(16, 185, 129, 0.5)" }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[var(--muted)]" />
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Less</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[var(--secondary)]" />
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>More</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

type LanguageBreakdownCardProps = {
  languageData: GitHubMetrics["languageData"];
};

export function LanguageBreakdownCard({ languageData }: LanguageBreakdownCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
      <SpotlightCard className="rounded-2xl p-4 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center border"
              style={{
                background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
              }}
            >
              <Code size={24} style={{ color: "var(--primary)" }} />
            </div>
            <h3 className="text-[var(--foreground)]">Language Breakdown</h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <div style={{ width: 180, height: 180 }}>
              <PieChart width={180} height={180}>
                <Pie data={languageData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {languageData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className="space-y-3 w-full">
              {languageData.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-sm" style={{ background: lang.color }} />
                  <span className="text-[var(--foreground)]" style={{ fontSize: "14px" }}>
                    {lang.name}
                  </span>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{lang.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

type ImpactCardProps = {
  impact: GitHubMetrics["impact"];
};

export function ImpactCard({ impact }: ImpactCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
      <SpotlightCard className="rounded-2xl p-4 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center border" style={{ background: "rgba(217, 70, 239, 0.1)", borderColor: "rgba(217, 70, 239, 0.2)" }}>
              <TrendingUp size={24} style={{ color: "#D946EF" }} />
            </div>
            <h3 className="text-[var(--foreground)]">Impact</h3>
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="mb-2" style={{ fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 800, color: "#6366F1", lineHeight: 1 }}>
                {impact.repos}+
              </div>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Public Repositories</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="mb-2" style={{ fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 800, lineHeight: 1, color: "var(--secondary)" }}>
                {impact.stars}
              </div>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Total Stars</p>
            </motion.div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

const skillClusters = [
  { name: "Frontend", score: 88, color: "#6366F1", tools: ["Next.js", "React", "Tailwind"] },
  { name: "Backend", score: 82, color: "#8B5CF6", tools: ["Node.js", "Express", "MongoDB"] },
  { name: "DevOps", score: 70, color: "#10B981", tools: ["Vercel", "Cloudinary", "CI/CD"] },
  { name: "AI", score: 76, color: "#D946EF", tools: ["Prompt Design", "API Integrations", "Automation"] },
];

export function RoleSkillMapCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}>
      <SpotlightCard className="rounded-2xl p-4 sm:p-8">
        <div className="relative z-10 space-y-6">
          <div>
            <h3 className="text-[var(--foreground)]">Role Skill Map</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Capability clusters across delivery domains.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {skillClusters.map((cluster) => (
              <div key={cluster.name} className="rounded-xl border border-[var(--card-border)] p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--foreground)]">{cluster.name}</p>
                  <p className="text-sm font-semibold" style={{ color: cluster.color }}>{cluster.score}%</p>
                </div>
                <div className="h-2 rounded-full bg-[color-mix(in_srgb,var(--card-border)_60%,transparent)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: cluster.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cluster.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{cluster.tools.join(" • ")}</p>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
