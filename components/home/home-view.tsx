"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Code2,
  Globe2,
  Quote,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { coreTechs } from "@/lib/site-data";

type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  slug: string;
};

type HomeViewProps = {
  projects: ProjectItem[];
  technologies: typeof coreTechs;
};

export function HomeView({ projects, technologies }: HomeViewProps) {
  const techStack = technologies.length ? technologies : coreTechs;
  const trustCards = [
    { name: "Tech4edges", icon: Globe2, color: "var(--primary)" },
    { name: "Anora", icon: Zap, color: "var(--secondary)" },
    { name: "Nextt", icon: Activity, color: "#8B5CF6" },
    { name: "DevMates", icon: Code2, color: "#F59E0B" },
  ];
  const trustLoop = [...trustCards, ...trustCards, ...trustCards, ...trustCards];
  const testimonials = [
    {
      text: "Muhammad's technical expertise and dedication to delivering quality solutions made our collaboration seamless. His MERN stack skills are top-notch.",
      name: "Sarah Johnson",
      role: "Product Manager at Tech4edges",
    },
    {
      text: "Working with Jalal on our event platform was a game-changer. He brought innovative solutions and maintained excellent code quality throughout the project.",
      name: "Ahmed Khan",
      role: "Co-founder at Nextt",
    },
    {
      text: "His ability to scale applications and manage complex systems is impressive. A reliable developer who consistently delivers beyond expectations.",
      name: "Emily Chen",
      role: "CTO at StartupHub",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          /> */}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <motion.p
              className="uppercase tracking-[0.2em] mb-6 text-[var(--text-secondary)]"
              style={{ fontSize: "12px", fontWeight: 600 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              BSIT | AGRICULTURE UNIVERSITY PESHAWAR
            </motion.p>

            <motion.div className="flex items-center gap-6 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-[3px]" style={{ borderColor: "var(--primary)" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1656313965911-a4aef45a18ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Muhammad Jalal"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--background)]" />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <h1 className="tracking-tight text-[var(--foreground)]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Muhammad Jalal.
              </h1>
            </motion.div>

            <motion.p className="mb-12 max-w-xl" style={{ color: "var(--text-secondary)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Junior Developer &amp; AI Enthusiast specializing in the MERN stack and Next.js.
            </motion.p>

            <motion.div className="flex gap-6 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link href="/projects" className="relative group inline-block">
                <motion.div
                  className="absolute inset-0 rounded-lg blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(45deg, var(--primary), var(--secondary), var(--primary))",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.button
                  className="relative px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all bg-[var(--primary)] text-[var(--primary-foreground)] overflow-hidden border border-transparent hover:border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 w-1/2 h-full skew-x-12 opacity-0 group-hover:opacity-30 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                      filter: "blur(4px)",
                    }}
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "200%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 tracking-wide">Explore Work</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/contact" className="relative group inline-block">
                <motion.button
                  className="relative px-8 py-4 rounded-lg font-semibold transition-all border text-[var(--foreground)] overflow-hidden backdrop-blur-md"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--card-border)" }}
                  whileHover={{ borderColor: "var(--primary)", color: "var(--primary)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"
                    style={{ background: "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)" }}
                    initial={{ scale: 0.5 }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <motion.div
                      className="absolute top-0 left-0 h-[1px] w-[50px]"
                      style={{ background: "linear-gradient(90deg, transparent, var(--primary))" }}
                      animate={{ x: [-50, 200] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <span className="relative z-10 tracking-wide">Contact Me</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center relative w-full max-w-[500px] aspect-square mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-cursor-hover="true"
          >
            <div className="absolute inset-0 w-full h-full pointer-events-auto z-10 flex items-center justify-center">
              <iframe
                src="https://my.spline.design/reactiveorb-vdYIfZBIAMx2bUw2Uugojnmq/"
                width="100%"
                height="100%"
                style={{ border: "none", background: "transparent" }}
                title="Spline 3D Integration"
              />
            </div>
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none z-0"
              style={{ background: "radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 60%)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      <section id="metrics" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2 rounded-2xl p-8 relative overflow-hidden group glass-panel interactive-card interactive-glow"
              style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: 0.15 }}
              />
              <h3 className="mb-8">Core Technologies</h3>
              <div className="relative overflow-hidden flex flex-col gap-4">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--glass-bg)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--glass-bg)] to-transparent z-10 pointer-events-none" />
                <motion.div
                  className="flex gap-4 w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {[...techStack, ...techStack].map((tech, idx) => (
                    <div
                      key={`row1-${idx}`}
                      className="px-6 py-3 rounded-full whitespace-nowrap border transition-colors"
                      style={{
                        color: "var(--primary)",
                        background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  className="flex gap-4 w-max"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {[...techStack].reverse().concat([...techStack].reverse()).map((tech, idx) => (
                    <div
                      key={`row2-${idx}`}
                      className="px-6 py-3 rounded-full whitespace-nowrap border transition-colors"
                      style={{
                        color: "var(--secondary)",
                        background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                        borderColor: "color-mix(in srgb, var(--secondary) 20%, transparent)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl p-8 relative overflow-hidden group glass-panel interactive-card interactive-glow"
              style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)", opacity: 0.15 }}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 border"
                  style={{
                    background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                    borderColor: "color-mix(in srgb, var(--secondary) 20%, transparent)",
                  }}
                >
                  <Code2 size={24} style={{ color: "var(--secondary)" }} />
                </div>
                <h3 className="mb-4">Current Focus</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Building scalable platforms &amp; managing fleets of mobile applications.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-40">
          <motion.div
            className="w-[600px] h-[600px] rounded-full blur-[120px] absolute"
            style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ borderColor: "var(--card-border)", background: "var(--glass-bg)" }}>
              <ShieldCheck size={16} style={{ color: "var(--secondary)" }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--secondary)" }}>
                Trust &amp; Reliability
              </span>
            </div>
            <h2 className="mb-4">Trusted By The Best</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Collaborating with innovative companies, visionary startups, and forward-thinking teams.
            </p>
          </motion.div>

          <div className="relative flex overflow-hidden group py-4">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <motion.div className="flex gap-8 items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
              {trustLoop.map((company, index) => {
                const Icon = company.icon;
                return (
                  <motion.div
                    key={`${company.name}-${index}`}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl glass-panel interactive-card interactive-glow w-[250px] group/card backdrop-blur-md"
                    style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)", background: "var(--glass-bg)" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={42} color={company.color} className="mb-4 opacity-80 group-hover/card:opacity-100 transition-opacity" />
                    <h4 className="group-hover/card:text-[var(--primary)] transition-colors" style={{ fontSize: "20px", fontWeight: 700 }}>
                      {company.name}
                    </h4>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="mb-4">What People Say</h2>
            <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
              Feedback from clients and collaborators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="rounded-2xl p-8 relative overflow-hidden group glass-panel interactive-card interactive-glow"
                style={{ borderColor: "var(--card-border)", boxShadow: "var(--shadow-float)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div
                  className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: 0.15 }}
                />
                <div className="relative">
                  <Quote size={32} className="text-[var(--primary)] opacity-20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={`${testimonial.name}-${i}`} size={16} style={{ color: "var(--secondary)", fill: "var(--secondary)" }} />
                    ))}
                  </div>
                  <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4" style={{ borderColor: "var(--card-border)" }}>
                    <h4 className="mb-1" style={{ fontSize: "16px" }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden">
        {projects.map((project) => (
          <Link key={project._id} href={`/work/${project.slug}`}>
            {project.title}
          </Link>
        ))}
      </section>
    </div>
  );
}
