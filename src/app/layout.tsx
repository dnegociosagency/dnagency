import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header-2";
import Footer from "@/components/Footer";
import { Providers } from "@/lib/query-provider";
import SchemaMarkup from "@/components/SchemaMarkup";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ClientShell from "@/components/ClientShell";

const BASE_URL = "https://www.agenciadnegocios.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | DN Agency",
    default: "DN Agency | Sites Premium Focados em Conversão & Crescimento",
  },
  description: "A DN Agency é uma agência premium de sites e crescimento por performance. Criamos sites personalizados, landing pages de alta conversão e escalamos campanhas de tráfego pago no Google e nas redes sociais para empresas no Brasil e no exterior.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  authors: [{ name: "DN Agency" }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "DN Agency | Design Premium & Crescimento Digital",
    description: "Escalamos empresas com sites focados em conversão e marketing digital de alta performance.",
    url: BASE_URL,
    siteName: "DN Agency",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DN Agency — Sites Premium Focados em Conversão & Crescimento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DN Agency | Design Premium & Crescimento Digital",
    description: "Escalamos empresas com sites focados em conversão e marketing digital de alta performance.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="dark font-sans antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts CDN to cut CSS critical path latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Satoshi Font for Body/Menu */}
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />
        <SchemaMarkup />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
        <Providers>
          <ClientShell>
            <Header />
            <main className="flex-grow">
              <ErrorBoundary name="MainPageContent">
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
          </ClientShell>
        </Providers>
      </body>
    </html>
  );
}
