// Server Component — no "use client" directive
// Above-the-fold sections imported statically for best LCP/FCP.
// Below-the-fold sections are deferred inside LazyPageSections (Client Component).

import Hero from "@/components/home/Hero";
import LogoTicker from "@/components/home/LogoTicker";
import ServicesSection from "@/components/home/ServicesSection";
import LazyPageSections from "@/components/home/LazyPageSections";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LogoTicker />
      <ServicesSection />
      <LazyPageSections />
    </div>
  );
}
