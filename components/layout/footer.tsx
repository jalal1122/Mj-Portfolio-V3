import { FooterConnectSection, FooterExploreSection, FooterProfileSection } from "@/components/layout/footer-sections";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--card-border)]/70 bg-[var(--glass-bg)]/65 backdrop-blur-xl">
      <div className="section-wrap py-12 grid gap-10 md:grid-cols-3">
        <FooterProfileSection />
        <FooterExploreSection />
        <FooterConnectSection />
      </div>
    </footer>
  );
}
