"use client";

import { type CSSProperties, type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function SpotlightCard({ children, className, style }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !cardRef.current) {
      return;
    }
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      data-cursor-hover="true"
      style={style}
      className={cn("glass-panel interactive-card interactive-glow rounded-2xl border border-[var(--card-border)]", className)}
    >
      {children}
    </div>
  );
}
