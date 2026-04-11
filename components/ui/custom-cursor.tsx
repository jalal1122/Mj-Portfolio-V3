"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setActive(true);
    };

    const updateHoverState = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        setHoveringInteractive(false);
        return;
      }
      const interactive = target.closest("a, button, input, textarea, select, [role='button'], [data-cursor-hover='true']");
      setHoveringInteractive(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateHoverState);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  if (!active || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] h-2.5 w-2.5 rounded-full bg-[var(--primary)]"
        style={{ left: 0, top: 0 }}
        animate={{ x: position.x - 5, y: position.y - 5 }}
        transition={{ type: "spring", stiffness: 700, damping: 40 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[99] h-8 w-8 rounded-full border border-[var(--primary)]/45"
        style={{ left: 0, top: 0 }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: hoveringInteractive ? 1.65 : 1,
          opacity: hoveringInteractive ? 0.45 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    </>
  );
}
