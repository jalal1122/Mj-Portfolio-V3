import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/", icon: FaGithub },
  { label: "Instagram", href: "https://instagram.com/", icon: FaInstagram },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--card-border)]/70 bg-[var(--glass-bg)]/65 backdrop-blur-xl">
      <div className="section-wrap py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Muhammad Jalal</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Junior MERN Stack Developer crafting modern, scalable, and user-focused digital products.
          </p>
          <Link
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <Mail size={14} />
            hello@example.com
          </Link>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Explore</p>
          <div className="mt-3 space-y-2 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

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
      </div>
    </footer>
  );
}
