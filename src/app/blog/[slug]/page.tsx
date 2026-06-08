import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Article Not Found | DN Agency",
    };
  }
  return {
    title: `${post.title} | DN Agency`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Helper function to render text highlighting text between asterisks *like this*
  const renderTextWithBold = (text: string) => {
    if (!text) return "";
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-white">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-[--color-brand-darker] min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-[--color-brand-primary] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="w-full">
          <div className="mb-8">
            <span className="text-[--color-brand-primary] font-bold text-xs uppercase tracking-wider bg-[--color-brand-primary]/10 border border-[--color-brand-primary]/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-6 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm border-b border-white/5 pb-8">
              <span>Published on {post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden mb-12 shadow-2xl relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-white/70">
            {post.content.map((section, idx) => {
              switch (section.type) {
                case "p":
                  return (
                    <p key={idx} className="text-lg md:text-xl leading-relaxed mb-6 font-normal">
                      {renderTextWithBold(section.text || "")}
                    </p>
                  );
                case "h2":
                  return (
                    <h2 key={idx} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 tracking-tight border-b border-white/5 pb-2">
                      {section.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={idx} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 tracking-tight">
                      {section.text}
                    </h3>
                  );
                case "quote":
                  return (
                    <blockquote key={idx} className="border-l-4 border-[--color-brand-primary] pl-6 my-8 italic text-white/95 text-xl font-medium bg-white/5 py-5 pr-4 rounded-r-2xl">
                      {renderTextWithBold(section.text || "")}
                    </blockquote>
                  );
                case "list":
                  return (
                    <ul key={idx} className="space-y-4 my-8 pl-2">
                      {section.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex gap-3 text-lg leading-relaxed items-start">
                          <span className="text-[--color-brand-primary] text-xl leading-none font-bold select-none shrink-0">•</span>
                          <div className="text-white/75">{renderTextWithBold(item)}</div>
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Author Signature Section */}
          <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-[--color-brand-primary]/20 shrink-0 border border-white/10 relative">
              <img 
                src="/team/donis.png" 
                alt="Donis Alfredo" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Written by Donis Alfredo</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Founder & Strategic Director at D' Negocios Agency. Specialist in Google Local Services Ads (GLSA), Google Verification, and paid traffic strategies. Dedicated to helping North American home service subcontractors secure exclusive, high-ticket leads and scale their operations.
              </p>
            </div>
          </div>

          {/* Premium Conversion CTA Card */}
          <div className="mt-16 bg-gradient-to-br from-[--color-brand-primary]/10 to-[--color-brand-primary]/5 border border-[--color-brand-primary]/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[--color-brand-primary]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[--color-brand-primary]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {post.cta.text}
              </h3>
              <p className="text-white/60 mb-8 text-base">
                Partner with D' Negocios Agency to implement these strategies in your business. We build independent streams of phone calls, handle your Google Verification paperwork, and optimize your ad budget so you only pay for results.
              </p>
              
              {post.cta.type === "calendly" ? (
                <a 
                  href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[--color-brand-primary] text-white px-8 py-4 rounded-full font-bold hover:bg-[#255651] transition-all hover:scale-[1.02] shadow-lg shadow-[--color-brand-primary]/20 text-center"
                >
                  Schedule Your Free Call
                </a>
              ) : post.cta.type === "phone" ? (
                <a 
                  href="tel:+18575242481" 
                  className="inline-block bg-[--color-brand-primary] text-white px-8 py-4 rounded-full font-bold hover:bg-[#255651] transition-all hover:scale-[1.02] shadow-lg shadow-[--color-brand-primary]/20 text-center"
                >
                  Call +1 (857) 524-2481
                </a>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[--color-brand-primary] text-white px-8 py-4 rounded-full font-bold hover:bg-[#255651] transition-all hover:scale-[1.02] shadow-lg shadow-[--color-brand-primary]/20 text-center"
                  >
                    Book Free Audit (Google Calendar)
                  </a>
                  <a 
                    href="tel:+18575242481" 
                    className="w-full sm:w-auto bg-transparent border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-full font-bold transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 text-[--color-brand-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call +1 (857) 524-2481
                  </a>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
