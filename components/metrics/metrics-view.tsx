"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";
import { Activity, Code, TrendingUp } from "lucide-react";
import type { GitHubMetrics } from "@/lib/github";

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
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-24" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="mb-4 text-[var(--foreground)]">Metrics &amp; Stats</h2>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Data-driven insights into development activity and impact for @{metrics.username}.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="rounded-2xl p-8 relative overflow-hidden group glass-panel border interactive-card interactive-glow"
            style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)", opacity: 0.15 }}
            />

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

              <div className="flex items-center gap-6 mt-6">
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
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              className="rounded-2xl p-8 relative overflow-hidden group glass-panel border interactive-card interactive-glow"
              style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: 0.15 }}
              />

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

                <div className="flex items-center gap-8">
                  <div style={{ width: 180, height: 180 }}>
                    <PieChart width={180} height={180}>
                      <Pie data={languageData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                        {languageData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>

                  <div className="space-y-3">
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
            </motion.div>

            <motion.div
              className="rounded-2xl p-8 relative overflow-hidden group glass-panel border interactive-card interactive-glow"
              style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{ background: "radial-gradient(circle, #D946EF 0%, transparent 70%)", opacity: 0.15 }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center border" style={{ background: "rgba(217, 70, 239, 0.1)", borderColor: "rgba(217, 70, 239, 0.2)" }}>
                    <TrendingUp size={24} style={{ color: "#D946EF" }} />
                  </div>
                  <h3 className="text-[var(--foreground)]">Impact</h3>
                </div>

                <div className="space-y-8">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                    <div className="mb-2" style={{ fontSize: "48px", fontWeight: 800, color: "#6366F1", lineHeight: 1 }}>
                      {metrics.impact.repos}+
                    </div>
                    <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Public Repositories</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                    <div className="mb-2" style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1, color: "var(--secondary)" }}>
                      {metrics.impact.stars}
                    </div>
                    <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Total Stars</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
