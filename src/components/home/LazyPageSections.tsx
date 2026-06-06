"use client";

/**
 * LazyPageSections — Client Component wrapper
 * `ssr: false` with next/dynamic requires a Client Component boundary.
 * The Server Component (page.tsx) renders this wrapper, which handles
 * deferred loading of all below-the-fold sections.
 */
import dynamic from "next/dynamic";

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

export default function LazyPageSections() {
  return (
    <>
      <ManifestoScrollSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
