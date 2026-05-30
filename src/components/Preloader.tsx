"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const [isJJMoto, setIsJJMoto] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    const isJJMotoRoute =
      pathname.startsWith("/jj-moto-pecas") ||
      pathname.includes("jjmoto") ||
      hostname.includes("jjmoto") ||
      hostname.includes("jj-moto-pecas");
    setIsJJMoto(isJJMotoRoute);

    if (isJJMotoRoute) setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted || isJJMoto) return;

    setIsLoading(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(
      () => {
        setIsLoading(false);
        isFirstLoad.current = false;
      },
      isFirstLoad.current ? 1400 : 600
    );

    return () => clearTimeout(timer);
  }, [pathname, isJJMoto, mounted]);

  if (!mounted || isJJMoto) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-[#040807] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/logo.png"
              alt="DN Agency"
              width={72}
              height={28}
              className="object-contain invert"
              style={{ height: "28px", width: "auto" }}
              priority
            />
          </motion.div>

          {/* Barra de progresso fina */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-10 w-48 h-[1px] bg-white/10 overflow-hidden relative rounded-full"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "105%" }}
              transition={{
                duration: 1.0,
                ease: [0.4, 0, 0.2, 1],
                repeat: Infinity,
              }}
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-[#2f6b65] to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
