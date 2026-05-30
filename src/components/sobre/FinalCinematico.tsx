"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCinematico() {
  return (
    <section data-theme="light" className="relative min-h-screen bg-white flex flex-col items-center justify-center py-32 overflow-hidden border-t border-[#0a1211]/10 transition-colors duration-300">
      
      {/* Intense glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-[#2f6b65]/5 to-[#2f6b65]/10 opacity-30 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Mock Logo or text representing DN Agency */}
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#0a1211] to-[#0a1211]/50 tracking-tighter">
            {"DN Agency"}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-4xl font-light text-[#0a1211] mb-4">
            You don&apos;t need another agency.
          </h3>
          <p className="text-lg md:text-2xl text-[#0a1211]/65 font-light mb-16">
            You need a partner who understands your reality and helps build your future.
          </p>

          <a 
            href="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-[#2f6b65] px-12 font-medium text-white transition-all duration-300 hover:bg-[#255651] hover:scale-105 hover:shadow-[0_0_40px_rgba(47,107,101,0.35)]"
          >
            <span className="mr-2 text-lg">Scale my business</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </motion.div>
      </div>

    </section>
  );
}

