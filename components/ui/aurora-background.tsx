"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-44 -left-28 h-[440px] w-[440px] rounded-full blur-[120px]"
        style={{ background: "rgba(79, 131, 255, 0.22)" }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] -right-28 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "rgba(143, 119, 255, 0.2)" }}
        animate={{ x: [0, -70, 20, 0], y: [0, -30, 35, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-130px] left-[35%] h-[320px] w-[320px] rounded-full blur-[100px]"
        style={{ background: "rgba(122, 163, 255, 0.16)" }}
        animate={{ x: [0, 45, -20, 0], y: [0, -35, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
