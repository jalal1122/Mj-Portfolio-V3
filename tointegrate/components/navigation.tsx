"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "top-4" : "top-6"
      }`}
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-[oklch(0.08_0_0/0.9)] backdrop-blur-xl border-[oklch(1_0_0/0.1)]"
            : "bg-[oklch(0.1_0_0/0.6)] backdrop-blur-md border-[oklch(1_0_0/0.08)]"
        }`}
      >
        {/* Logo */}
        <a href="#" className="px-4 py-2 text-sm font-bold text-foreground tracking-tight">
          AR<span className="text-accent">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Command Menu Trigger */}
        <button
          className="hidden md:flex items-center gap-2 px-3 py-1.5 ml-2 text-xs text-muted-foreground bg-secondary/50 rounded-md border border-[oklch(1_0_0/0.08)] hover:bg-secondary hover:text-foreground transition-all duration-200"
          onClick={() => alert("Command menu coming soon!")}
        >
          <span className="font-mono">⌘K</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden px-3 py-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isMobileMenuOpen ? (
              <path d="M5 5L15 15M15 5L5 15" />
            ) : (
              <>
                <path d="M3 6H17" />
                <path d="M3 10H17" />
                <path d="M3 14H17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-[oklch(0.08_0_0/0.95)] backdrop-blur-xl rounded-2xl border border-[oklch(1_0_0/0.1)]"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
