"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "How to Scale Your Sales with Paid Traffic in 2026",
    excerpt: "Discover the latest campaign optimization strategies on Meta and Google Ads to maximize your ROAS.",
    category: "Paid Traffic",
    date: "May 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Why Your Landing Page Doesn't Convert (And How to Fix It)",
    excerpt: "The most common mistakes on sales pages and how to apply copywriting and UX design to double your conversion rate.",
    category: "Web Design",
    date: "May 5, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Strategic SEO",
    excerpt: "Learn how to rank your business at the top of Google without relying solely on paid ads.",
    category: "SEO",
    date: "April 28, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Branding vs Performance: Which to Prioritize?",
    excerpt: "Understand why the strongest brands in the market balance brand-building with direct response ads.",
    category: "Strategy",
    date: "April 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  }
];

export default function BlogClient() {
  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      
      {/* Dark Header */}
      <div className="w-full bg-[--color-brand-darker] pt-32 pb-32 relative">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6"
          >
            Insights & <span className="text-[--color-brand-primary]">Strategy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Follow our articles and discover the best digital marketing tactics to boost your company&apos;s results.
          </motion.p>
        </div>
      </div>

      {/* Main Light Container */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              key={post.id} 
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden group hover:border-[--color-brand-primary]/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[--color-brand-primary] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[--color-brand-primary] transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-8 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <Link href="#" className="inline-flex items-center gap-2 text-[--color-brand-primary] font-bold hover:text-[#255651] transition-colors">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 bg-white border border-gray-200 shadow-lg rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-light]/30 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Never Miss an Update
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg">
              Get the best digital marketing strategies delivered straight to your inbox, once a week.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" action="#">
              <input 
                type="email" 
                placeholder="Your best email address" 
                className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[--color-brand-primary] focus:ring-2 focus:ring-[--color-brand-primary]/20 transition-all shadow-sm"
                required
              />
              <button 
                type="submit"
                className="bg-[--color-brand-primary] text-white px-8 py-4 rounded-full font-bold hover:bg-[#255651] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
