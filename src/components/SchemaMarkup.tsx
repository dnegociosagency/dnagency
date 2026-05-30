/**
 * Componente de Schema.org JSON-LD para SEO
 * Inclui: Organization, WebSite, FAQPage
 * Inserido no layout raiz como Server Component (sem "use client")
 */

const BASE_URL = "https://www.agenciadnegocios.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DN Agency",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "DN Agency is a premium conversion-first web design and digital growth agency serving businesses across the US and Canada.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://calendar.app.google/TJ85TG2Do9uLhC2K7",
    availableLanguage: ["English", "Portuguese"],
  },
  sameAs: [
    "https://www.instagram.com/dnagency",
    "https://www.linkedin.com/company/dnagency",
  ],
  areaServed: ["US", "CA"],
  serviceType: [
    "Web Design",
    "Landing Page Design",
    "Paid Media Management",
    "Digital Marketing",
    "SEO",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DN Agency",
  url: BASE_URL,
  description:
    "Premium conversion-first web design and digital growth agency.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to see measurable results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We focus on both immediate traction and long-term scaling. During the first few weeks, we optimize tracking and creative assets. Most of our clients see an increase in qualified pipeline and leads within the first 30 days.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with my specific industry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialize in performance growth and conversion. If your business has a validated product or service â€” whether you run a local clinic, gym, barbershop, restaurant, or premium B2B offer â€” our growth systems can be custom-fitted to acquire your ideal clients.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum budget required to start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We don't sell generic packages; our strategies are tailored to your current revenue and scaling goals. Book a call with us so we can design a custom roadmap that aligns with your unit economics.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in your scope of work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike traditional agencies that sell social media posts or basic templates, we deliver full-funnel solutions: high-converting premium web design, technical SEO, and advanced media buying (Google, Meta, TikTok) â€” all engineered to maximize your return on ad spend.",
      },
    },
  ],
};

export default function SchemaMarkup() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
