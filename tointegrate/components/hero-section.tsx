"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function LiveStatus() {
  const [time, setTime] = useState<string>("")
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const peshawarTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now)
      setTime(peshawarTime)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap items-center gap-4 md:gap-6 mb-8"
    >
      {/* Status Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/30 rounded-full border border-[oklch(1_0_0/0.08)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Available for new ventures
        </span>
      </div>

      {/* Location & Time */}
      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        <span>Peshawar, PK</span>
        <span className="text-[oklch(1_0_0/0.3)]">|</span>
        <span className="font-mono">{time || "--:--"} PKT</span>
        <span className="text-[oklch(1_0_0/0.3)]">|</span>
        <span>28°C</span>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <LiveStatus />

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
            >
              Full-Stack MERN & Next.js Developer
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight mb-8 text-balance"
            >
              Engineering
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
                high-performance
              </span>
              <br />
              digital realities<span className="text-accent">.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
            >
              Crafting scalable web applications and immersive digital experiences 
              with modern technologies. Turning complex problems into elegant solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-all duration-300"
              >
                View Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 text-foreground font-semibold rounded-full border border-[oklch(1_0_0/0.2)] hover:bg-secondary/50 transition-all duration-300"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right Content - Stylized Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96 mx-auto lg:mx-0">
              {/* Geometric Frame */}
              <div className="absolute inset-0 border border-[oklch(1_0_0/0.1)] rounded-lg" />
              <div className="absolute inset-2 border border-[oklch(1_0_0/0.08)]" />
              <div className="absolute inset-4 bg-gradient-to-br from-secondary/50 to-transparent rounded-sm overflow-hidden">
                {/* Abstract Profile Representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Stylized avatar representation */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-muted to-secondary border border-[oklch(1_0_0/0.1)] flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-extrabold text-foreground/20">AR</span>
                    </div>
                    {/* Accent ring */}
                    <div className="absolute -inset-4 rounded-full border border-accent/20" />
                    <div className="absolute -inset-8 rounded-full border border-[oklch(1_0_0/0.05)]" />
                  </div>
                </div>
                {/* Grid overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(oklch(1 0 0) 1px, transparent 1px),
                                      linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[oklch(1_0_0/0.2)] flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
