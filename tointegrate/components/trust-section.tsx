"use client"

import { motion } from "framer-motion"

const clients = [
  { name: "TechCorp", logo: "TC" },
  { name: "DataFlow", logo: "DF" },
  { name: "CloudBase", logo: "CB" },
  { name: "NextGen", logo: "NG" },
  { name: "ByteLabs", logo: "BL" },
  { name: "CodeWave", logo: "CW" },
]

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[oklch(1_0_0/0.08)]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-12"
        >
          Trusted by innovative teams
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/50 border border-[oklch(1_0_0/0.08)] flex items-center justify-center font-bold text-sm group-hover:border-accent/30 transition-colors">
                {client.logo}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{client.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
