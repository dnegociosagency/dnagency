import Hero from "@/components/home/Hero";
import ConnectionSection from "@/components/home/ConnectionSection";
import LogoTicker from "@/components/home/LogoTicker";
import ServicesSection from "@/components/home/ServicesSection";
import ManifestoScrollSection from "@/components/home/ManifestoScrollSection";
import ProcessSection from "@/components/home/ProcessSection";
import GlobalSection from "@/components/home/GlobalSection";
import EbookSection from "@/components/home/EbookSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TeamSection from "@/components/home/TeamSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import PixelWipeTransition from "@/components/ui/PixelWipeTransition";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ConnectionSection />
      <LogoTicker />
      <ServicesSection />
      <ManifestoScrollSection />

      {/* Transição: ManifestoScroll (escuro) → ProcessSection */}
      <PixelWipeTransition
        fromColor="var(--color-brand-dark, #040807)"
        cols={18}
        rows={5}
        pattern="diagonal"
        duration={800}
        height={60}
      />

      <ProcessSection />
      <GlobalSection />

      {/* Transição: GlobalSection (escuro) → EbookSection */}
      <PixelWipeTransition
        fromColor="var(--color-brand-darker, #0a1211)"
        cols={20}
        rows={6}
        pattern="wave"
        duration={1000}
        height={72}
      />

      <EbookSection />
      <PricingSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
