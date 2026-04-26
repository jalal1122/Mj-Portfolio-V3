"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Journey" },
  { href: "/projects", label: "Work" },
  { href: "/metrics", label: "Metrics" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full pt-3 md:pt-4">
      <div className="section-wrap flex justify-center">
        <div className="glass-panel w-full max-w-[880px] rounded-2xl md:rounded-full border border-[var(--card-border)] px-3 py-2">
          <div className="flex items-center justify-between gap-2 md:hidden">
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((state) => !state)}
              className="h-8 w-8 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)]"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div className="text-sm font-semibold text-[var(--foreground)]">Menu</div>
            <ThemeToggle />
          </div>

          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const routePath = item.href.split("#")[0];
              const active = pathname === routePath && !item.href.includes("#");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-2.5 lg:px-4 py-1.5 text-xs lg:text-sm font-semibold transition-colors",
                    active ? "text-[var(--secondary)]" : "text-[var(--primary-foreground)]",
                  )}
                >
                  {active ? (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 w-[70%] mx-auto h-[3px] rounded-full bg-[var(--secondary)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {item.label}
                </Link>
              );
            })}
            <div className="pl-1">
              <ThemeToggle />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="md:hidden mt-2 grid grid-cols-2 gap-2"
              >
                {navItems.map((item) => {
                  const routePath = item.href.split("#")[0];
                  const active = pathname === routePath && !item.href.includes("#");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-center text-sm font-semibold transition-colors",
                        active
                          ? "text-[var(--secondary)] border-[var(--secondary)]/40 bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)]"
                          : "text-[var(--primary-foreground)] border-[var(--card-border)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
