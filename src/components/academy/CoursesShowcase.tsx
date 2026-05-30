"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { TrendingUp, Filter, Rocket, Target, Crown, Handshake } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "High-Level Digital Strategy",
    description: "Deconstructing multi-million dollar businesses and applying it to your agency.",
    icon: TrendingUp,
    color: "from-blue-500/20 to-blue-500/5",
    glowColor: "rgba(59, 130, 246, 0.4)",
    badge: "Module 1",
  },
  {
    id: 2,
    title: "Conversion Machine",
    description: "Architecture of high-converting funnels and aggressive sales processes.",
    icon: Filter,
    color: "from-purple-500/20 to-purple-500/5",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "Module 2",
  },
  {
    id: 3,
    title: "Growth Hacking & Scale",
    description: "Turn the key from unpredictable scaling to systemic growth.",
    icon: Rocket,
    color: "from-[--color-brand-primary]/20 to-[--color-brand-primary]/5",
    glowColor: "rgba(47, 107, 101, 0.4)",
    badge: "Module 3",
  },
  {
    id: 4,
    title: "Mastering Paid Traffic",
    description: "Advanced acquisition strategies that maximize your ROI.",
    icon: Target,
    color: "from-red-500/20 to-red-500/5",
    glowColor: "rgba(239, 68, 68, 0.4)",
    badge: "Module 4",
  },
  {
    id: 5,
    title: "Premium Branding",
    description: "How to position your brand to charge 10x more for the same services.",
    icon: Crown,
    color: "from-amber-500/20 to-amber-500/5",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badge: "Module 5",
  },
  {
    id: 6,
    title: "High-Ticket Closing",
    description: "Persuasive scripts and objection handling to close high-ticket deals.",
    icon: Handshake,
    color: "from-emerald-500/20 to-emerald-500/5",
    glowColor: "rgba(16, 185, 129, 0.4)",
    badge: "Module 6",
  },
];

function MagneticCourseCard({ course, index, isMobile }: { course: typeof courses[0], index: number, isMobile: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="relative group h-full"
      onMouseMove={handleMouseMove}
    >
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-3xl"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                ${course.glowColor},
                transparent 80%
              )
            `,
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full bg-brand-darker/85 backdrop-blur-2xl border border-brand-white/5 rounded-3xl p-8 overflow-hidden transform-gpu transition-all duration-500 hover:-translate-y-1">
        {/* Subtle background gradient inside card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20`} />

        {/* Top section: Badge and Icon */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <span className="px-3 py-1 bg-brand-white/5 border border-brand-white/10 rounded-full text-xs font-semibold tracking-widest uppercase text-brand-white/70">
            {course.badge}
          </span>
          <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-brand-dark/50 border border-brand-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transform-gpu rotate-y-12 rotate-x-12 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
            <course.icon className="w-8 h-8 text-brand-white drop-shadow-[0_0_15px_rgba(47,107,101,0.3)]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow">
          <h3 className="text-2xl font-bold text-brand-white mb-3 tracking-tight">
            {course.title}
          </h3>
          <p className="text-brand-white/60 text-base font-light leading-relaxed mb-8">
            {course.description}
          </p>
        </div>
        
        {/* Footer CTA */}
        <div className="relative z-10 mt-auto pt-4 border-t border-brand-white/5">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] font-medium text-[--color-brand-primary] group-hover:text-brand-white transition-colors cursor-pointer">
            Learn More
            <span className="w-6 h-[1px] bg-[--color-brand-primary] group-hover:bg-brand-white group-hover:w-10 transition-all duration-300" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoursesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="courses-showcase" ref={containerRef} className="relative bg-[var(--color-brand-dark)] py-32 px-4 md:px-8 overflow-hidden min-h-screen transition-colors duration-300">
      {/* Subtle Parallax Background Layer */}
      <motion.div 
        style={isMobile ? {} : { y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[--color-brand-primary] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#2f6b65] opacity-[0.06] dark:opacity-10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-brand-white tracking-tight mb-4">
            One platform. <span className="text-[--color-brand-primary]">Multiple arsenals.</span>
          </h2>
          <p className="text-brand-white/60 text-xl font-light max-w-2xl mx-auto">
            Choose the perfect course for your agency&apos;s current stage and unlock your next level of revenue.
          </p>
        </div>

        {/* 3-Column Grid for Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <MagneticCourseCard key={course.id} course={course} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

