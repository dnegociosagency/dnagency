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
    "A DN Agency é uma agência premium de sites focados em conversão e crescimento digital, atendendo empresas no Brasil, nos EUA e no Canadá.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://calendar.app.google/TJ85TG2Do9uLhC2K7",
    availableLanguage: ["Portuguese", "English"],
  },
  sameAs: [
    "https://www.instagram.com/dnagency",
    "https://www.linkedin.com/company/dnagency",
  ],
  areaServed: ["BR", "US", "CA"],
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
    "Agência premium de sites focados em conversão e crescimento digital.",
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
      name: "Quanto tempo leva para ver resultados mensuráveis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trabalhamos tanto com tração imediata quanto com escala no longo prazo. Nas primeiras semanas, otimizamos o rastreamento e os criativos. A maioria dos nossos clientes vê um aumento de oportunidades e leads qualificados já nos primeiros 30 dias.",
      },
    },
    {
      "@type": "Question",
      name: "Vocês trabalham com o meu segmento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Somos especialistas em crescimento por performance e conversão. Se o seu negócio tem um produto ou serviço validado — seja uma clínica, academia, barbearia, restaurante ou uma oferta B2B premium — nossos sistemas de crescimento podem ser adaptados para atrair seus clientes ideais.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é o investimento mínimo para começar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não vendemos pacotes genéricos; nossas estratégias são montadas de acordo com o seu faturamento atual e suas metas de crescimento. Agende uma reunião para desenharmos um plano personalizado que faça sentido para o seu caixa.",
      },
    },
    {
      "@type": "Question",
      name: "O que está incluído no trabalho de vocês?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diferente das agências tradicionais que vendem posts para redes sociais ou templates básicos, entregamos soluções de funil completo: sites premium de alta conversão, SEO técnico e gestão avançada de tráfego pago (Google, Meta, TikTok) — tudo pensado para maximizar o retorno sobre o seu investimento em anúncios.",
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
