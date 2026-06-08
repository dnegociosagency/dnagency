import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Blog | DN Agency",
  description: "Articles, tips, and strategies about Digital Marketing, Paid Traffic, and Sales by DN Agency.",
};

export default function BlogPage() {
  return (
    <div className="w-full bg-[--color-brand-darker] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Blog Header */}

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Insights & <span className="text-[--color-brand-primary]">Strategy</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Follow our articles and discover the best digital marketing tactics to boost your company&apos;s results.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-[--color-brand-dark] border border-white/5 rounded-3xl overflow-hidden group hover:border-[--color-brand-primary]/50 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="h-64 overflow-hidden relative block">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[--color-brand-primary] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              </Link>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <Link href={`/blog/${post.slug}`} className="block group/title">
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover/title:text-[--color-brand-primary] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-white/60 mb-8 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[--color-brand-primary] font-semibold hover:text-white transition-colors">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 bg-[--color-brand-primary]/10 border border-[--color-brand-primary]/20 rounded-3xl p-10 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss an Update
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Get the best digital marketing strategies delivered straight to your inbox, once a week.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" action="#">
            <input 
              type="email" 
              placeholder="Your best email address" 
              className="flex-1 bg-[--color-brand-dark] border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-[--color-brand-primary] transition-colors"
              required
            />
            <button 
              type="submit"
              className="bg-[--color-brand-primary] text-white px-8 py-4 rounded-full font-bold hover:bg-[#255651] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
