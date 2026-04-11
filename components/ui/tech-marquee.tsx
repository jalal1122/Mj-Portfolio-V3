"use client";

import { motion } from "framer-motion";

type TechMarqueeProps = {
  items: string[];
  reverse?: boolean;
};

export function TechMarquee({ items, reverse = false }: TechMarqueeProps) {
  const row = [...items, ...items];
  const targetX = reverse ? ["-50%", "0%"] : ["0%", "-50%"];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: targetX }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="px-4 py-2 rounded-full border border-[var(--card-border)] bg-[var(--glass-bg)] text-sm text-[var(--foreground)] whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
