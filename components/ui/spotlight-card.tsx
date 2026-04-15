"use client";

import { type CSSProperties, type PointerEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function SpotlightCard({ children, className, style }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const updateSpotlightPosition = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={updateSpotlightPosition}
      onPointerEnter={updateSpotlightPosition}
      data-cursor-hover="true"
      style={style}
      className={cn("glass-panel interactive-card interactive-glow rounded-2xl border border-[var(--card-border)]", className)}
    >
      {children}
    </div>
  );
}
