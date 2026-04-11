"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="fixed top-0 z-50 w-full pt-4">
      <div className="section-wrap flex justify-center">
        <div className="glass-panel rounded-full border border-[var(--card-border)] px-3 py-2">
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const routePath = item.href.split("#")[0];
              const active = pathname === routePath && !item.href.includes("#");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold transition-colors",
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
            {/* <div className="hidden md:block pl-1">
              <Link href="/admin" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                Admin
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
