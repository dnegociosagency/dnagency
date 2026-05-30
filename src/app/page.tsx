import Hero from "@/components/home/Hero";
import LogoTicker from "@/components/home/LogoTicker";
import ServicesSection from "@/components/home/ServicesSection";
import ManifestoScrollSection from "@/components/home/ManifestoScrollSection";
import ProcessSection from "@/components/home/ProcessSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TeamSection from "@/components/home/TeamSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LogoTicker />
      <ServicesSection />
      <ManifestoScrollSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
