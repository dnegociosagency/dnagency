import dynamic from "next/dynamic";

// --- Above the fold: loaded immediately for LCP/FCP ---
import Hero from "@/components/home/Hero";
import LogoTicker from "@/components/home/LogoTicker";
import ServicesSection from "@/components/home/ServicesSection";

// --- Below the fold: deferred to reduce initial JS bundle ---
const ManifestoScrollSection = dynamic(
  () => import("@/components/home/ManifestoScrollSection"),
  { ssr: false }
);
const ProcessSection = dynamic(
  () => import("@/components/home/ProcessSection"),
  { ssr: false }
);
const PricingSection = dynamic(
  () => import("@/components/home/PricingSection"),
  { ssr: false }
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
  { ssr: false }
);
const TeamSection = dynamic(
  () => import("@/components/home/TeamSection"),
  { ssr: false }
);
const FAQSection = dynamic(
  () => import("@/components/home/FAQSection"),
  { ssr: false }
);
const CTASection = dynamic(
  () => import("@/components/home/CTASection"),
  { ssr: false }
);

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

