import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Header } from "@/components/ui/header-2";
import Footer from "@/components/Footer";
import { Providers } from "@/lib/query-provider";
import SchemaMarkup from "@/components/SchemaMarkup";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

// Deferred: Lenis smooth scroll + GSAP ticker only needed after hydration
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
// Deferred: chatbot is never needed for initial render
const Chatbot = dynamic(() => import("@/components/Chatbot/Chatbot"), { ssr: false });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://www.agenciadnegocios.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | DN Agency",
    default: "DN Agency | Premium Conversion-First Web Design & Growth",
  },
  description: "DN Agency is a high-end web design and performance growth agency. We build custom websites, high-converting landing pages, and scale paid search & social campaigns for businesses across the US & Canada.",
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
    title: "DN Agency | Premium Design & Digital Growth",
    description: "We scale businesses across the US and Canada with conversion-first web design and high-performance digital marketing.",
    url: BASE_URL,
    siteName: "DN Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DN Agency — Premium Conversion-First Web Design & Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DN Agency | Premium Design & Digital Growth",
    description: "We scale businesses across the US and Canada with conversion-first web design and high-performance digital marketing.",
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
      lang="en"
      className={`dark ${inter.variable} font-sans antialiased`}
    >
      <head>
        <SchemaMarkup />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <Providers>
          <SmoothScroll>
            <Header />
            <main className="flex-grow">
              <ErrorBoundary name="MainPageContent">
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
          </SmoothScroll>
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
