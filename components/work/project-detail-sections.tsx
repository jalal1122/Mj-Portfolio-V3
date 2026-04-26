"use client";

import { motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, type LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type FeatureItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

type TechBadge = {
  label: string;
  color?: string;
};

type ProjectHeroBannerProps = {
  image: string;
  title: string;
  tagline: string;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
};

export function ProjectHeroBanner({ image, title, tagline, y, opacity }: ProjectHeroBannerProps) {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-[var(--background)]/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent z-20" />
        <Image src={image} alt={title} fill className="object-cover" sizes="100vw" />
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
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[var(--foreground)] tracking-tight">{title}</h1>
            <p className="text-xl md:text-2xl text-[var(--secondary)] max-w-2xl font-light">{tagline}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type ProjectOverviewAndInnovationsProps = {
  description: string;
  features: FeatureItem[];
};

export function ProjectOverviewAndInnovations({ description, features }: ProjectOverviewAndInnovationsProps) {
  return (
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
          {description}
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
          {features.map((feature) => (
            <SpotlightCard key={feature.title} className="p-8 rounded-2xl group">
              <feature.icon size={32} className="text-[var(--primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">{feature.title}</h4>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {feature.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

type ProjectMetaCardProps = {
  role: string;
  timeline: string;
  tech: TechBadge[];
  liveLink?: string;
  githubLink?: string;
};

export function ProjectMetaCard({ role, timeline, tech, liveLink, githubLink }: ProjectMetaCardProps) {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <SpotlightCard className="p-8 rounded-2xl">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Role</span>
            <p className="text-[var(--foreground)] mt-1 font-medium">{role}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Timeline</span>
            <p className="text-[var(--foreground)] mt-1 font-medium">{timeline}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-3 block">Technologies</span>
            <div className="flex flex-wrap gap-2">
              {tech.map((item) => {
                const color = item.color || "var(--primary)";
                return (
                  <span
                    key={item.label}
                    className="px-3 py-1 rounded-md text-xs font-semibold border"
                    style={{
                      background: `color-mix(in srgb, ${color} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${color} 24%, transparent)`,
                      color,
                    }}
                  >
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col gap-4">
          {liveLink ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={18} /> Live Preview
            </a>
          ) : null}
          {githubLink ? (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border bg-transparent text-[var(--foreground)] transition-colors"
              style={{ borderColor: "var(--border)" }}
            >
              <Code2 size={18} /> Source Code
            </a>
          ) : null}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
