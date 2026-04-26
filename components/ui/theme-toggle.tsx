"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/providers/theme-provider";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <button
        className="h-8 w-8 rounded-full glass-panel border border-[var(--card-border)]"
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-8 w-8 rounded-full border border-[var(--card-border)] flex items-center justify-center transition-transform hover:scale-105"
      style={{ background: "linear-gradient(140deg, rgba(79,131,255,0.35), rgba(143,119,255,0.18))" }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
