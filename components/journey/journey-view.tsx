"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Rocket, Users } from "lucide-react";

export function JourneyView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journeyNodes = [
    {
      icon: GraduationCap,
      title: "Education",
      content: "Bachelor of Science in Information Technology, Agriculture University Peshawar.",
      color: "#6366F1",
    },
    {
      icon: Briefcase,
      title: "Experience",
      content: "Junior Developer at Tech4edges.",
      color: "#8B5CF6",
    },
    {
      icon: Rocket,
      title: "Entrepreneurship",
      content: "Co-founder of two innovative ventures in Health & Beauty and Event Management.",
      businesses: [
        { name: "Anora", description: "Health & Beauty platform" },
        { name: "Nextt", description: "Event management platform" },
      ],
      color: "#D946EF",
    },
    {
      icon: Users,
      title: "Communities",
      content: "Founder of DevMates.",
      color: "#10B981",
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-24" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="mb-4 text-[var(--foreground)]">The Journey</h2>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            A timeline of growth, experience, and impact.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[var(--muted)]">
            <motion.div className="w-full origin-top" style={{ height: lineHeight, background: "linear-gradient(to bottom, #6366F1, #10B981)" }} />
          </div>

          <div className="space-y-24">
            {journeyNodes.map((node, index) => (
              <motion.div
                key={node.title}
                className="relative pl-24"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${node.color}20`,
                    border: `2px solid ${node.color}`,
                    boxShadow: `0px 0px 24px ${node.color}40`,
                  }}
                  whileHover={{ scale: 1.1, boxShadow: `0px 0px 32px ${node.color}60` }}
                >
                  <node.icon size={24} style={{ color: node.color }} />
                </motion.div>

                <motion.div
                  className="rounded-2xl p-8 group relative overflow-hidden glass-panel border interactive-card interactive-glow"
                  style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
                  whileHover={{ borderColor: `${node.color}80` }}
                >
                  <motion.div
                    className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle, ${node.color}40 0%, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <h3 className="mb-4" style={{ color: node.color }}>
                      {node.title}
                    </h3>
                    <p className="mb-6 text-lg" style={{ color: "var(--text-secondary)" }}>
                      {node.content}
                    </p>

                    {"businesses" in node && node.businesses ? (
                      <div className="grid sm:grid-cols-2 gap-4 mt-6">
                        {node.businesses.map((business) => (
                          <motion.div
                            key={business.name}
                            className="p-6 rounded-xl border interactive-card interactive-glow backdrop-blur-md"
                            style={{ background: "var(--glass-bg)", borderColor: `${node.color}40` }}
                            whileHover={{ borderColor: node.color, boxShadow: `0px 8px 24px ${node.color}40`, scale: 1.02 }}
                          >
                            <h4 className="mb-2 text-[var(--foreground)] text-xl">{business.name}</h4>
                            <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>{business.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
