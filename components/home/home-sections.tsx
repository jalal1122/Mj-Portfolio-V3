"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Quote, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type HeroSectionProps = {
  heroImageSrc: string;
};

export function HeroSection({ heroImageSrc }: HeroSectionProps) {
  return (
    <section className="relative sm:h-screen flex items-center justify-center overflow-hidden pt-8 sm:pt-0">
      <div className="absolute inset-0 opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
            <h1 className="tracking-tight text-[var(--foreground)]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Muhammad Jalal.
            </h1>
          </motion.div>

          <motion.p className="mb-12 max-w-xl" style={{ color: "var(--text-secondary)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Junior Developer &amp; AI Enthusiast specializing in the MERN stack and Next.js.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/projects" className="relative group inline-block w-full sm:w-auto">
              <motion.button
                className="relative w-full sm:w-auto px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-all bg-[var(--primary)] text-[var(--primary-foreground)] overflow-hidden border border-transparent hover:border-white/25"
                style={{ boxShadow: "0 18px 46px color-mix(in srgb, var(--primary) 30%, transparent)" }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96, y: 0 }}
              >
                <span className="relative z-10 tracking-wide">Explore Work</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>

            <Link href="/contact" className="relative group inline-block w-full sm:w-auto">
              <motion.button
                className="relative w-full sm:w-auto px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all border text-[var(--foreground)] overflow-hidden backdrop-blur-md"
                style={{ background: "var(--glass-bg)", borderColor: "var(--card-border)" }}
                whileHover={{
                  borderColor: "color-mix(in srgb, var(--primary) 55%, white)",
                  color: "var(--primary)",
                  y: -3,
                  boxShadow: "0 16px 40px color-mix(in srgb, var(--primary) 28%, transparent)",
                }}
                whileTap={{ scale: 0.96, y: 0 }}
              >
                <span className="relative z-10 tracking-wide">Contact Me</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] aspect-square mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          data-cursor-hover="true"
        >
          <div className="absolute inset-0 w-full h-full z-10 rounded-3xl overflow-hidden ">
            <Image
              src={heroImageSrc}
              alt="Hero portrait"
              fill
              sizes="(max-width: 1024px) 80vw, 460px"
              className="object-cover object-top"
              priority
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
  );
}

type CoreTechnologiesSectionProps = {
  techStack: string[];
};

export function CoreTechnologiesSection({ techStack }: CoreTechnologiesSectionProps) {
  return (
    <section id="metrics" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-12 grid-cols-1 gap-6">
          <motion.div className="lg:col-span-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SpotlightCard className="w-full rounded-2xl p-4 sm:p-8">
              <h3 className="mb-8">Core Technologies</h3>
              <div className="relative overflow-hidden flex flex-col gap-4">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--glass-bg)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--glass-bg)] to-transparent z-10 pointer-events-none" />
                <motion.div className="flex gap-4 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                  {[...techStack].map((tech, idx) => (
                    <div
                      key={`row1-${idx}`}
                      className="px-6 py-3 w-full rounded-full whitespace-nowrap border transition-colors"
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
                <motion.div className="flex gap-4 w-max" animate={{ x: ["-50%", "0%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
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
            </SpotlightCard>
          </motion.div>

          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <SpotlightCard className="rounded-2xl p-4 sm:p-8">
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
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type TrustCard = {
  name: string;
  color: string;
  icon: LucideIcon;
};

type TrustedCompaniesSectionProps = {
  trustLoop: TrustCard[];
  trustLoopForward: TrustCard[];
  trustLoopReverse: TrustCard[];
};

export function TrustedCompaniesSection({ trustLoop, trustLoopForward, trustLoopReverse }: TrustedCompaniesSectionProps) {
  return (
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
        <motion.div className="text-center mb-10 sm:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ borderColor: "var(--card-border)", background: "var(--glass-bg)" }}>
            <ShieldCheck size={16} style={{ color: "var(--secondary)" }} />
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--secondary)" }}>
              Trust &amp; Reliability
            </span>
          </div>
          <h2 className="mb-4">Trusted By The Best</h2>
          <p className="text-base sm:text-xl max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Collaborating with innovative companies, visionary startups, and forward-thinking teams.
          </p>
        </motion.div>

        <div className="relative hidden lg:flex overflow-hidden group py-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <motion.div className="flex gap-8 items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            {trustLoop.map((company, index) => {
              const Icon = company.icon;
              return (
                <SpotlightCard key={`${company.name}-${index}`} className="flex flex-col items-center justify-center p-8 rounded-2xl w-[250px] group/card backdrop-blur-md">
                  <Icon size={42} color={company.color} className="mb-4 opacity-80 group-hover/card:opacity-100 transition-opacity" />
                  <h4 className="group-hover/card:text-[var(--primary)] transition-colors" style={{ fontSize: "20px", fontWeight: 700 }}>
                    {company.name}
                  </h4>
                </SpotlightCard>
              );
            })}
          </motion.div>
        </div>

        <div className="relative lg:hidden space-y-3 overflow-hidden py-2">
          <div className="absolute inset-y-0 left-0 w-14 sm:w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

          <motion.div className="flex gap-3 sm:gap-4 items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
            {trustLoopForward.map((company, index) => {
              const Icon = company.icon;
              return (
                <SpotlightCard key={`mobile-forward-${company.name}-${index}`} className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl w-[150px] sm:w-[185px] group/card backdrop-blur-md">
                  <Icon size={26} color={company.color} className="mb-2 sm:mb-3 opacity-80 group-hover/card:opacity-100 transition-opacity" />
                  <h4 className="group-hover/card:text-[var(--primary)] transition-colors text-[15px] sm:text-base font-semibold text-center leading-tight">
                    {company.name}
                  </h4>
                </SpotlightCard>
              );
            })}
          </motion.div>

          <motion.div className="flex gap-3 sm:gap-4 items-center w-max" animate={{ x: ["-50%", "0%"] }} transition={{ duration: 17, repeat: Infinity, ease: "linear" }}>
            {trustLoopReverse.map((company, index) => {
              const Icon = company.icon;
              return (
                <SpotlightCard key={`mobile-reverse-${company.name}-${index}`} className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl w-[150px] sm:w-[185px] group/card backdrop-blur-md">
                  <Icon size={26} color={company.color} className="mb-2 sm:mb-3 opacity-80 group-hover/card:opacity-100 transition-opacity" />
                  <h4 className="group-hover/card:text-[var(--primary)] transition-colors text-[15px] sm:text-base font-semibold text-center leading-tight">
                    {company.name}
                  </h4>
                </SpotlightCard>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type TestimonialsSectionProps = {
  testimonials: { text: string; name: string; role: string }[];
  expandedTestimonials: Record<number, boolean>;
  onToggleExpanded: (index: number) => void;
};

export function TestimonialsSection({ testimonials, expandedTestimonials, onToggleExpanded }: TestimonialsSectionProps) {
  return (
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
            <SpotlightCard key={testimonial.name} className="rounded-2xl p-8">
              <div className="relative">
                <Quote size={32} className="text-[var(--primary)] opacity-20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`${testimonial.name}-${i}`} size={16} style={{ color: "var(--secondary)", fill: "var(--secondary)" }} />
                  ))}
                </div>
                <p
                  className="mb-3 leading-relaxed"
                  style={{
                    color: "var(--text-secondary)",
                    ...(expandedTestimonials[index]
                      ? {}
                      : {
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }),
                  }}
                >
                  "{testimonial.text}"
                </p>
                {testimonial.text.length > 180 ? (
                  <button
                    type="button"
                    onClick={() => onToggleExpanded(index)}
                    className="mb-5 text-xs font-semibold text-[var(--secondary)] hover:opacity-90"
                  >
                    {expandedTestimonials[index] ? "Show less" : "More"}
                  </button>
                ) : null}
                <div className="border-t pt-4" style={{ borderColor: "var(--card-border)" }}>
                  <h4 className="mb-1" style={{ fontSize: "16px" }}>
                    {testimonial.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{testimonial.role}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
