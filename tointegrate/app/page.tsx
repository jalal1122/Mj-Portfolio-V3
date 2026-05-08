import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TechTicker } from "@/components/tech-ticker"
import { BentoGrid } from "@/components/bento-grid"
import { ProjectsSection } from "@/components/projects-section"
import { TrustSection } from "@/components/trust-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <TechTicker />
      <BentoGrid />
      <ProjectsSection />
      <TrustSection />
      <FooterSection />
    </main>
  )
}
