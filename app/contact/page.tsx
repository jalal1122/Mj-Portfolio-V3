import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="sub-heading">Contact</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)]">Let's build something impactful together.</h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Whether you need a polished portfolio, a scalable web platform, or feature support for your existing app, I can help from planning to deployment.
          </p>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>• Full-stack web applications (Next.js, MERN)</p>
            <p>• Performance-focused UI/UX implementation</p>
            <p>• AI-powered features and integrations</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
