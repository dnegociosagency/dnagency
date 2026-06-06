"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MagneticButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  children: React.ReactNode;
  className?: string;
};

export default function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Cache the bounding rect — only re-read on resize, not every mousemove
  const rectCache = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  // Refresh cache on resize
  useEffect(() => {
    const updateRect = () => { rectCache.current = null; };
    window.addEventListener("resize", updateRect, { passive: true });
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  // Cache rect on mouseenter (layout is stable at this point)
  const handleMouseEnter = useCallback(() => {
    if (ref.current) rectCache.current = ref.current.getBoundingClientRect();
  }, []);

  // Use RAF to batch the position update — prevents forced reflow on every event
  const handleMouse = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const { clientX, clientY } = e;
    rafId.current = requestAnimationFrame(() => {
      const rect = rectCache.current ?? ref.current?.getBoundingClientRect();
      if (!rect) return;
      const middleX = clientX - (rect.left + rect.width / 2);
      const middleY = clientY - (rect.top + rect.height / 2);
      setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    });
  }, []);

  const reset = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setPosition({ x: 0, y: 0 });
  }, []);

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-full font-medium transition-all duration-300",
        "border border-transparent",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
