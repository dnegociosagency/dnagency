import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { Header } from "@/components/ui/header-2";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";
import { Providers } from "@/lib/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Agência DN",
    default: "Agência DN | Marketing Digital & Performance",
  },
  description: "Agência de marketing digital focada em performance, tráfego pago e desenvolvimento de alta conversão.",
  keywords: ["marketing digital", "tráfego pago", "performance", "web design", "agência de marketing", "conversão"],
  authors: [{ name: "Agência DN" }],
  openGraph: {
    title: "Agência DN | Performance e Estratégia",
    description: "Aceleramos o crescimento da sua empresa com estratégias de marketing focadas em ROI.",
    url: "https://agenciadn.com.br",
    siteName: "Agência DN",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agência DN | Performance e Estratégia",
    description: "Aceleramos o crescimento da sua empresa com estratégias de marketing focadas em ROI.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`dark ${inter.variable} font-sans antialiased`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <Preloader />
        <Providers>
          <SmoothScroll>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScroll>
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
