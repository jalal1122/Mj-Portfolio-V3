"use client"

import { motion } from "framer-motion"

const techItems = [
  { name: "Next.js", type: "filled" },
  { name: "React", type: "outline" },
  { name: "TypeScript", type: "filled" },
  { name: "Node.js", type: "outline" },
  { name: "MongoDB", type: "filled" },
  { name: "PostgreSQL", type: "outline" },
  { name: "Tailwind CSS", type: "filled" },
  { name: "GraphQL", type: "outline" },
  { name: "Docker", type: "filled" },
  { name: "AWS", type: "outline" },
  { name: "Prisma", type: "filled" },
  { name: "Redis", type: "outline" },
]

function TechItem({ name, type }: { name: string; type: string }) {
  if (type === "outline") {
    return (
      <span
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
        style={{
          WebkitTextStroke: "1px oklch(1 0 0 / 0.3)",
          WebkitTextFillColor: "transparent",
        }}
      >
        {name}
      </span>
    )
  }

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground/80">
      {name}
    </span>
  )
}

export function TechTicker() {
  const items = [...techItems, ...techItems] // Duplicate for seamless loop

  return (
    <section className="relative py-12 overflow-hidden border-y border-[oklch(1_0_0/0.08)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex"
      >
        <div className="animate-marquee flex items-center gap-8 md:gap-12 whitespace-nowrap">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-8 md:gap-12">
              <TechItem name={item.name} type={item.type} />
              <span className="text-accent text-2xl">✦</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  )
}
