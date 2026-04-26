"use client";

import Link from "next/link";
import { Mail, Copy, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/mjdevstudio", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/jalal1122", icon: FaGithub },
  { label: "Instagram", href: "https://www.instagram.com/jalalkhan2084/?hl=en", icon: FaInstagram },
];

export function FooterProfileSection() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Muhammad Jalal</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        Junior MERN Stack Developer crafting modern, scalable, and user-focused digital products.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="mailto:jk4350649@gmail.com"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
        >
          <Mail size={14} />
          jk4350649@gmail.com
        </Link>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText("jk4350649@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--card-border)] px-2.5 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>
    </div>
  );
}

export function FooterExploreSection() {
  const pathname = usePathname();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Explore</p>
      <div className="mt-3 space-y-2 text-sm">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block transition-colors ${
              pathname === link.href
                ? "text-[var(--primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FooterConnectSection() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Connect</p>
      <div className="mt-3 flex items-center gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="h-10 w-10 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-[var(--text-secondary)]">Open to freelance work, internships, and collaborative product builds.</p>
      <p className="mt-5 text-xs text-[var(--muted)]">© {new Date().getFullYear()} Muhammad Jalal. All rights reserved.</p>
    </div>
  );
}
