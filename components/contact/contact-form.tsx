"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Clock3, MapPin, Copy, Check } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { SpotlightCard } from "../ui/spotlight-card";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<"name" | "email" | "message" | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const intentTemplates = [
    {
      label: "Hire for project",
      value: "hire-project",
      template: "Hi Jalal, I want to hire you for a web project. Timeline, scope, and budget details:",
    },
    {
      label: "Freelance",
      value: "freelance",
      template: "Hi Jalal, I have a freelance opportunity. Here are the requirements and expected timeline:",
    },
    {
      label: "Internship",
      value: "internship",
      template: "Hi Jalal, I would like to discuss an internship role. Details about responsibilities and duration:",
    },
    {
      label: "Collab",
      value: "collab",
      template: "Hi Jalal, I’m interested in collaborating on a product. Let’s discuss goals and execution plan:",
    },
  ];
  const socialLinks = [
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com/in/mjdevstudio" },
    { icon: FaGithub, label: "GitHub", href: "https://github.com/jalal1122" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/jalalkhan2084/?hl=en" },
  ];

  const emailIsValid = /\S+@\S+\.\S+/.test(email);
  const nameLooksGood = name.trim().length >= 2;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <motion.div className="text-center mb-10 sm:mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)]">Let&apos;s Connect</h2>
        <p className="text-base sm:text-xl sub-heading" style={{ color: "var(--text-secondary)" }}>
          Have a project in mind or want to collaborate? Drop me a message.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <SpotlightCard className="rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Clock3 size={18} style={{ color: "var(--primary)" }} />
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Response Window</p>
              <p className="text-xs text-[var(--text-secondary)]">Typically within 24 hours</p>
            </div>
          </div>
        </SpotlightCard>
        <SpotlightCard className="rounded-xl p-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} style={{ color: "var(--secondary)" }} />
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Based In</p>
              <p className="text-xs text-[var(--text-secondary)]">Peshawar, Pakistan</p>
            </div>
          </div>
        </SpotlightCard>
        <SpotlightCard className="rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Mail size={18} style={{ color: "var(--primary)" }} />
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Best For</p>
              <p className="text-xs text-[var(--text-secondary)]">Full-stack builds and AI integrations</p>
            </div>
          </div>
        </SpotlightCard>
      </div>

      <SpotlightCard className="rounded-2xl p-5 sm:p-12">
      <motion.div
        className="relative"
        style={{ backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle at 50% 0%, var(--primary) 0%, transparent 50%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <form onSubmit={onSubmit} className="relative z-10 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[var(--foreground)]">Quick start your message</p>
            <div className="flex flex-wrap gap-2">
              {intentTemplates.map((intent) => (
                <button
                  key={intent.value}
                  type="button"
                  onClick={() => {
                    setActiveIntent(intent.value);
                    setMessage(intent.template);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    activeIntent === intent.value
                      ? "border-[var(--primary)] text-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                      : "border-[var(--card-border)] text-[var(--text-secondary)]"
                  }`}
                >
                  {intent.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <motion.input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-lg transition-all outline-none border"
              style={{
                background: "var(--input-background)",
                borderColor: focusedField === "name" ? "var(--primary)" : "var(--border)",
                color: "var(--foreground)",
                boxShadow: focusedField === "name" ? "var(--shadow-glow)" : "none",
              }}
              placeholder="Your name"
              required
            />
            {!nameLooksGood && name.length > 0 ? <p className="mt-1 text-xs text-amber-400">Please enter at least 2 characters.</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-lg transition-all outline-none border"
              style={{
                background: "var(--input-background)",
                borderColor: focusedField === "email" ? "var(--primary)" : "var(--border)",
                color: "var(--foreground)",
                boxShadow: focusedField === "email" ? "var(--shadow-glow)" : "none",
              }}
              placeholder="your.email@example.com"
              required
            />
            {!emailIsValid && email.length > 0 ? <p className="mt-1 text-xs text-amber-400">Please enter a valid email address.</p> : null}
          </div>

          <div>
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <motion.textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              rows={4}
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-lg transition-all outline-none resize-none border"
              style={{
                background: "var(--input-background)",
                borderColor: focusedField === "message" ? "var(--primary)" : "var(--border)",
                color: "var(--foreground)",
                boxShadow: focusedField === "message" ? "var(--shadow-glow)" : "none",
              }}
              placeholder="Tell me about your project..."
              required
            />
            <p className="mt-1 text-xs text-[var(--text-secondary)]">{message.trim().length} characters</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 px-5 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-70"
              style={{ boxShadow: "var(--shadow-glow)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <Send size={18} />
            </motion.button>

            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{
                background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
              }}
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={16} style={{ color: "var(--primary)" }} />
            </motion.div>
          </div>

          {status === "success" ? <p className="text-sm text-emerald-400">Message sent successfully.</p> : null}
          {status === "error" ? <p className="text-sm text-red-400">Failed to send. Please try again.</p> : null}
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText("jk4350649@gmail.com");
              setCopiedEmail(true);
              setTimeout(() => setCopiedEmail(false), 1800);
            }}
            className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            {copiedEmail ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedEmail ? "Email copied" : "Copy contact email"}
          </button>
        </form>
      </motion.div>
      </SpotlightCard>

      <motion.div
        className="mt-12 flex justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl transition-all border"
              style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
              whileHover={{ borderColor: "var(--primary)", boxShadow: "var(--shadow-glow)", y: -4 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <Icon size={20} style={{ color: "var(--secondary)" }} />
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
