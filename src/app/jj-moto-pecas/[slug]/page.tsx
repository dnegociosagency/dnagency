import { notFound } from "next/navigation";
import { Metadata } from "next";
import { UNIDADES } from "@/lib/jj-moto-pecas-data";
import BackgroundEffects from "@/components/jj-moto-pecas/BackgroundEffects";
import HeroSection from "@/components/jj-moto-pecas/HeroSection";
import QuickLinks from "@/components/jj-moto-pecas/QuickLinks";
import ProductsGrid from "@/components/jj-moto-pecas/ProductsGrid";
import GallerySlider from "@/components/jj-moto-pecas/GallerySlider";
import FeaturesSection from "@/components/jj-moto-pecas/FeaturesSection";
import ContactArea from "@/components/jj-moto-pecas/ContactArea";
import MapEmbed from "@/components/jj-moto-pecas/MapEmbed";
import FloatingWhatsapp from "@/components/jj-moto-pecas/FloatingWhatsapp";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Geração de metadados dinâmicos e SEO local de alto desempenho
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unidade = UNIDADES[slug.toLowerCase()];

  if (!unidade) {
    return {
      title: "Unidade Não Encontrada | JJ Moto Peças",
    };
  }

  const title = `JJ Moto Peças | ${unidade.unidade} - Cartão Digital`;
  const description = `Confira o telefone, WhatsApp, endereço, horário de funcionamento e faça um orçamento de peças e acessórios para sua motocicleta na unidade da JJ Moto Peças em ${unidade.unidade}.`;

  return {
    title,
    description,
    keywords: [
      "moto peças",
      "autopeças moto",
      "escapamento esportivo",
      "capacete de moto",
      "pneu de moto",
      "lubrificante de moto",
      unidade.unidade,
      "JJ Moto Peças",
      `JJ Moto Peças ${unidade.unidade}`
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/logos/logo_jj_moto_pecas.png",
          width: 800,
          height: 600,
          alt: `JJ Moto Peças ${unidade.unidade}`,
        },
      ],
    },
    alternates: {
      canonical: `/jj-moto-pecas/${unidade.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Geração de caminhos estáticos em build time para carregamento ultra rápido (SSG)
export async function generateStaticParams() {
  return Object.keys(UNIDADES).map((slug) => ({
    slug,
  }));
}

export default async function JJMotoPecasPage({ params }: PageProps) {
  const { slug } = await params;
  const unidade = UNIDADES[slug.toLowerCase()];

  if (!unidade) {
    notFound();
  }

  return (
    <div className="relative w-full min-h-screen text-jj-white overflow-hidden bg-jj-black pb-24">
      {/* Efeitos de fundo e luzes neon */}
      <BackgroundEffects />

      {/* Estrutura visual da landing page premium */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Seção Principal (Hero) */}
        <HeroSection unidade={unidade} />

        {/* Linha separadora estética com neon vermelho */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-jj-red to-transparent opacity-70 my-4" />

        {/* Links rápidos para contatos e redes */}
        <QuickLinks unidade={unidade} />

        {/* Vitrine de Produtos interativos 3D */}
        <ProductsGrid unidade={unidade} />

        {/* Galeria Carrossel de fotos reais */}
        <GallerySlider />

        {/* Seção Diferenciais competitivos */}
        <FeaturesSection />

        {/* Cartões modernos de Informação de Contato */}
        <ContactArea unidade={unidade} />

        {/* Seção Localização no Mapa */}
        <MapEmbed unidade={unidade} />

        {/* Assinatura simplificada premium no rodapé do cartão */}
        <footer className="w-full max-w-xl text-center py-8 px-6 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-jj-silver/30 font-bold">
            © {new Date().getFullYear()} JJ Moto Peças · Todos os direitos reservados
          </p>
          <p className="text-[8px] uppercase tracking-[0.2em] text-jj-silver/15 mt-1">
            Desenvolvido por Agência DN
          </p>
        </footer>
      </div>

      {/* Botão de WhatsApp Flutuante Pulsante */}
      <FloatingWhatsapp unidade={unidade} />
    </div>
  );
}
