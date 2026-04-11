"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code2, MonitorPlay, Zap } from "lucide-react";
import { useRef } from "react";

type TechItem = { _id?: string; name?: string } | string;

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
    tech: (project.techStack ?? []).map((item) => (typeof item === "string" ? item : item.name || "Tech")),
    role: "Full Stack Developer",
    timeline: "2 Months",
    image: project.cloudinaryImageUrl,
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
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-full" style={{ y, opacity }}>
          <div className="absolute inset-0 bg-[var(--background)]/40 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent z-20" />
          <Image src={projectData.image} alt={projectData.title} fill className="object-cover" />
        </motion.div>

        <div className="absolute top-32 left-6 z-30">
          <Link href="/projects">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border text-sm font-medium transition-colors"
              style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
              whileHover={{ scale: 1.05, color: "var(--foreground)" }}
            >
              <ArrowLeft size={16} /> Back to Work
            </motion.button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 pb-12 z-30">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[var(--foreground)] tracking-tight">{projectData.title}</h1>
              <p className="text-xl md:text-2xl text-[var(--secondary)] max-w-2xl font-light">{projectData.tagline}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-16">
          <motion.div
            className="lg:col-span-2 space-y-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <section>
              <h3 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Overview</h3>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {projectData.description}
                <br />
                <br />
                We approached this challenge by deeply integrating user feedback into our iterative development cycles,
                leading to a perfectly tailored platform architecture. The implementation of modern micro-interactions
                ensured a premium feel while maintaining strictly accessible contrast and usability ratios.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Key Innovations</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {projectData.features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    className="p-8 rounded-2xl glass-panel border interactive-card interactive-glow group"
                    style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <feature.icon size={32} className="text-[var(--primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">{feature.title}</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl glass-panel border interactive-card interactive-glow" style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Role</span>
                  <p className="text-[var(--foreground)] mt-1 font-medium">{projectData.role}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Timeline</span>
                  <p className="text-[var(--foreground)] mt-1 font-medium">{projectData.timeline}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-3 block">Technologies</span>
                  <div className="flex flex-wrap gap-2">
                    {projectData.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-semibold border"
                        style={{
                          background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                          borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col gap-4">
                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={18} /> Live Preview
                  </a>
                ) : null}
                {project.githubLink ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border bg-transparent text-[var(--foreground)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <Code2 size={18} /> Source Code
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
