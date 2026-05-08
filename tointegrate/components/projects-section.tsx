"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const projects = [
  {
    id: "01",
    title: "FINTECH DASHBOARD",
    category: "Web Application",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    year: "2024",
    color: "oklch(0.75 0.15 180)",
  },
  {
    id: "02",
    title: "E-COMMERCE PLATFORM",
    category: "Full-Stack",
    tech: ["React", "Node.js", "MongoDB"],
    year: "2024",
    color: "oklch(0.7 0.18 300)",
  },
  {
    id: "03",
    title: "AI CONTENT STUDIO",
    category: "SaaS Product",
    tech: ["Next.js", "OpenAI", "Prisma"],
    year: "2024",
    color: "oklch(0.8 0.2 60)",
  },
  {
    id: "04",
    title: "REAL-TIME ANALYTICS",
    category: "Dashboard",
    tech: ["React", "WebSocket", "D3.js"],
    year: "2023",
    color: "oklch(0.75 0.2 160)",
  },
]

function ProjectItem({ 
  project, 
  onHover, 
  onLeave 
}: { 
  project: typeof projects[0]
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group block py-8 md:py-12 border-b border-[oklch(1_0_0/0.08)] first:border-t hover:border-[oklch(1_0_0/0.15)] transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        {/* Project Number */}
        <span className="text-sm font-mono text-muted-foreground w-12">
          {project.id}
        </span>

        {/* Project Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight flex-1 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Project Meta */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Category</p>
            <p className="text-sm font-medium">{project.category}</p>
          </div>
          <div className="hidden md:block">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Year</p>
            <p className="text-sm font-medium">{project.year}</p>
          </div>

          {/* Arrow */}
          <div className="w-12 h-12 rounded-full border border-[oklch(1_0_0/0.1)] flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <svg
              className="w-5 h-5 text-muted-foreground group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tech Tags - Mobile */}
      <div className="flex gap-2 mt-4 md:hidden">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-[10px] uppercase tracking-wider bg-secondary/50 text-muted-foreground rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

function ImagePreview({ 
  activeProject, 
  mouseX, 
  mouseY 
}: { 
  activeProject: typeof projects[0] | null
  mouseX: ReturnType<typeof useSpring>
  mouseY: ReturnType<typeof useSpring>
}) {
  if (!activeProject) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="fixed w-80 h-48 md:w-96 md:h-56 pointer-events-none z-50 hidden lg:block"
    >
      <div
        className="w-full h-full rounded-lg overflow-hidden border border-[oklch(1_0_0/0.1)]"
        style={{
          background: `linear-gradient(135deg, ${activeProject.color} 0%, oklch(0.1 0 0) 100%)`,
        }}
      >
        {/* Placeholder project preview */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-[oklch(1_0_0/0.1)] flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-foreground/70">{activeProject.title}</p>
            <p className="text-[10px] text-foreground/50 mt-1">{activeProject.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 20)
      mouseY.set(e.clientY - 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 lg:px-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">Selected Works</h2>
        </motion.div>

        <div>
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              onHover={() => setActiveProject(project)}
              onLeave={() => setActiveProject(null)}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <ImagePreview activeProject={activeProject} mouseX={springX} mouseY={springY} />
    </section>
  )
}
