"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringRefPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return;
    }

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const animate = () => {
      const { x, y } = targetRef.current;
      ringRefPos.current.x += (x - ringRefPos.current.x) * 0.18;
      ringRefPos.current.y += (y - ringRefPos.current.y) * 0.18;

      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      ring.style.transform = `translate3d(${ringRefPos.current.x - 15}px, ${ringRefPos.current.y - 15}px, 0)`;

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const move = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const updateHoverState = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [role='button'], [data-cursor-hover='true']");
      if (interactive) {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.opacity = "0.55";
      } else {
        ring.style.width = "30px";
        ring.style.height = "30px";
        ring.style.opacity = "0.38";
      }
    };

    rafRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-orb pointer-events-none fixed z-[100] h-1.5 w-1.5 rounded-full bg-[var(--primary)] opacity-0"
        style={{ left: 0, top: 0, willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="cursor-orb pointer-events-none fixed z-[99] h-[30px] w-[30px] rounded-full border border-[var(--primary)]/40 opacity-0"
        style={{ left: 0, top: 0, willChange: "transform,width,height,opacity", transition: "width 160ms ease, height 160ms ease, opacity 160ms ease" }}
      />
    </>
  );
}
