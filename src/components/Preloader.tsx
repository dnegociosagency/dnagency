"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const [isJJMoto, setIsJJMoto] = useState(() => {
    return pathname.startsWith("/jj-moto-pecas") || pathname.includes("jjmoto");
  });

  useEffect(() => {
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    if (pathname.startsWith("/jj-moto-pecas") || pathname.includes("jjmoto") || hostname.includes("jjmoto") || hostname.includes("jj-moto-pecas")) {
      setIsJJMoto(true);
    } else {
      setIsJJMoto(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isJJMoto) {
      setIsLoading(false);
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
      isFirstLoad.current = false;
    }, isFirstLoad.current ? 1800 : 800);

    return () => clearTimeout(timer);
  }, [pathname, isJJMoto]);

  if (isJJMoto) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-[#040807] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Shader Animation */}
          <ShaderAnimation />

          <div className="flex flex-col items-center gap-6 relative z-10">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[--color-brand-primary] text-xs font-medium tracking-[0.3em] uppercase"
            >
              Loading...
            </motion.span>
            
            {/* Sleek Progress Bar */}
            <div className="w-64 h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-[--color-brand-primary] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
