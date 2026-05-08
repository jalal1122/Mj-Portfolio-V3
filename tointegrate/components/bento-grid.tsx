"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const techStack = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
  backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "Redis"],
  tools: ["Docker", "AWS", "Vercel", "Git", "Figma", "Prisma"],
}

function PhilosophyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-2 row-span-2 p-8 md:p-10 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] flex flex-col justify-between group hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300"
    >
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Philosophy</span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 leading-tight text-balance">
          Code should be
          <br />
          <span className="text-accent">poetry in motion.</span>
        </h3>
      </div>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
        I believe in writing clean, maintainable code that stands the test of time. 
        Every line serves a purpose, every function tells a story.
      </p>
    </motion.div>
  )
}

function GitHubCard() {
  const [commits] = useState([
    { day: 0, count: 3 },
    { day: 1, count: 5 },
    { day: 2, count: 2 },
    { day: 3, count: 8 },
    { day: 4, count: 4 },
    { day: 5, count: 6 },
    { day: 6, count: 1 },
    { day: 7, count: 7 },
    { day: 8, count: 3 },
    { day: 9, count: 9 },
    { day: 10, count: 4 },
    { day: 11, count: 2 },
    { day: 12, count: 6 },
    { day: 13, count: 5 },
  ])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="col-span-2 p-6 md:p-8 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">GitHub Impact</span>
          <p className="text-3xl md:text-4xl font-bold mt-2">1,247+</p>
          <p className="text-sm text-muted-foreground">contributions this year</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">42</p>
          <p className="text-xs text-muted-foreground">repositories</p>
        </div>
      </div>

      {/* Stylized Heat Map */}
      <div className="flex items-end gap-1 h-20">
        {commits.map((commit, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${(commit.count / 10) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex-1 rounded-sm bg-accent/20 hover:bg-accent/40 transition-colors"
            style={{ minHeight: 4 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function StackCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="col-span-1 row-span-2 p-6 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300 overflow-hidden"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The Stack</span>

      <div className="mt-6 space-y-4">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] md:text-xs font-medium bg-secondary/50 text-foreground/80 rounded border border-[oklch(1_0_0/0.08)] hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function TerminalCard() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([
    "$ whoami",
    "ahmad-raza",
    "$ cat skills.txt",
    "Full-Stack Development",
    "System Architecture",
    "UI/UX Engineering",
    "$ _"
  ])

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim().toLowerCase()
      let response = ""

      switch (cmd) {
        case "help":
          response = "Commands: help, skills, contact, clear"
          break
        case "skills":
          response = "React, Next.js, Node.js, TypeScript, MongoDB..."
          break
        case "contact":
          response = "ahmad@example.com | github.com/ahmadraza"
          break
        case "clear":
          setOutput([])
          setInput("")
          return
        default:
          response = `Command not found: ${cmd}`
      }

      setOutput([...output.slice(0, -1), `$ ${input}`, response, "$ _"])
      setInput("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="col-span-1 p-4 bg-[oklch(0.03_0_0)] rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-accent/30 transition-colors duration-300 font-mono text-xs"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[oklch(1_0_0/0.08)]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-muted-foreground text-[10px]">terminal</span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-1 h-24 overflow-y-auto text-[10px] md:text-xs">
        {output.map((line, i) => (
          <p key={i} className={line.startsWith("$") ? "text-accent" : "text-muted-foreground"}>
            {line === "$ _" ? (
              <span>
                $ <span className="animate-blink">▌</span>
              </span>
            ) : (
              line
            )}
          </p>
        ))}
      </div>

      {/* Input */}
      <div className="mt-2 pt-2 border-t border-[oklch(1_0_0/0.08)]">
        <div className="flex items-center gap-1">
          <span className="text-accent">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="type 'help'"
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
          />
        </div>
      </div>
    </motion.div>
  )
}

function CurrentFocusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="col-span-1 p-6 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Currently</span>
      <p className="text-lg md:text-xl font-semibold mt-3 leading-snug">
        Building AI-powered
        <br />
        <span className="text-accent">SaaS products</span>
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-xs text-muted-foreground">In development</span>
      </div>
    </motion.div>
  )
}

export function BentoGrid() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">The DNA</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PhilosophyCard />
          <StackCard />
          <GitHubCard />
          <TerminalCard />
          <CurrentFocusCard />
        </div>
      </div>
    </section>
  )
}
