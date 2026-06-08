import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.isPublished || (post.publishedAt && post.publishedAt > new Date())) {
    return {
      title: "Not Found",
      description: "Post not found."
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt ? post.publishedAt.toISOString() : undefined,
      authors: ["DN Agency"],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.image ? [post.image] : undefined,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post || !post.isPublished || (post.publishedAt && post.publishedAt > new Date())) {
    notFound();
  }

  // Preparar JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seoTitle || post.title,
    "image": post.image ? [post.image] : [],
    "datePublished": post.publishedAt ? post.publishedAt.toISOString() : undefined,
    "dateModified": post.updatedAt ? post.updatedAt.toISOString() : undefined,
    "author": [{
      "@type": "Person",
      "name": post.author?.name || "DN Agency Team"
    }]
  };

  let faqSchema = null;
  if (post.faq) {
    try {
      const faqs = JSON.parse(post.faq);
      if (Array.isArray(faqs) && faqs.length > 0) {
        faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        };
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="w-full bg-[--color-brand-darker] min-h-screen pt-32 pb-20">
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
      )}

      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
        </Link>

        {/* Post Header */}
        <div className="mb-12">
          {post.category && (
            <div className="inline-block bg-[--color-brand-primary]/20 text-[--color-brand-primary] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
              {post.category}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-6 text-sm text-white/40 border-t border-b border-white/5 py-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("pt-BR") : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author?.name || "DN Agency Team"}</span>
            </div>
          </div>
        </div>

        {/* Post Cover */}
        {post.image && (
          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/5 bg-[#0a1211]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Post Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[--color-brand-primary] prose-p:text-white/70 prose-li:text-white/70"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* CTA */}
        {post.cta && (
          <div className="mt-20 bg-gradient-to-r from-[--color-brand-primary]/20 to-transparent border border-[--color-brand-primary]/30 rounded-3xl p-10 md:p-14 text-center">
            <h3 className="text-3xl font-black text-white mb-4">Pronto para escalar seus resultados?</h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">{post.cta}</p>
            <a 
              href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[--color-brand-primary] text-white rounded-full font-bold hover:bg-[#255651] transition-all shadow-[0_4px_20px_rgba(47,107,101,0.4)] hover:-translate-y-1"
            >
              Agende uma Sessão Estratégica
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
