"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/ui/use-scroll";
import MagneticButton from "@/components/ui/MagneticButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isAcademy = pathname === "/academy";
  const [isJJMoto, setIsJJMoto] = useState(false);
  const [showAcademyHeader, setShowAcademyHeader] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    if (
      pathname.startsWith("/jj-moto-pecas") ||
      pathname.includes("jjmoto") ||
      hostname.includes("jjmoto") ||
      hostname.includes("jj-moto-pecas")
    ) {
      setIsJJMoto(true);
    } else {
      setIsJJMoto(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isAcademy) return;
    const handleScroll = () => {
      const coursesSection = document.getElementById("courses-showcase");
      if (coursesSection) {
        const rect = coursesSection.getBoundingClientRect();
        setShowAcademyHeader(rect.top <= window.innerHeight * 0.8);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAcademy]);

  const isHome = pathname === "/";
  const [showHomeHeader, setShowHomeHeader] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setShowHomeHeader(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isPlatformRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    isJJMoto;

  if (!mounted || isPlatformRoute) return null;

  const isVisible = isAcademy ? showAcademyHeader : (isHome ? showHomeHeader : true);

  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#servicos" },
    { label: "Method", href: "/#metodo" },
    { label: "About", href: "/sobre" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex items-center justify-center px-4 transition-all duration-500",
          scrolled ? "pt-4" : "pt-8",
          !isVisible && "opacity-0 pointer-events-none -translate-y-full"
        )}
      >
        <div
          className={cn(
            "w-full max-w-5xl flex items-center justify-between pl-6 pr-3 py-3 rounded-full transition-all duration-500",
            // Premium Clean White SaaS Glassmorphism
            "bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
            scrolled ? "scale-[0.98] shadow-[0_10px_40px_rgba(0,0,0,0.1)]" : ""
          )}
        >
          {/* Logo - Anchored left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DN Logo"
              width={80}
              height={32}
              // Logo needs to be visible against white background
              className="object-contain brightness-0 transition-all duration-500" 
              style={{ height: "30px", width: "auto" }}
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation - Centered Perfectly */}
          <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gray-900 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - Anchored right, larger, premium look */}
          <div className="hidden md:flex items-center">
            <a
              href="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-2.5 text-[15px] font-semibold bg-gradient-to-r from-[#2f6b65] to-[#3b8780] text-white hover:to-[#469e96] rounded-full shadow-[0_4px_14px_0_rgba(47,107,101,0.3)] hover:shadow-[0_6px_20px_rgba(47,107,101,0.4)] hover:-translate-y-[1px] transition-all duration-300 ease-out flex items-center gap-2">
                Book a Call
              </button>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center pr-2">
            <button
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 px-6"
          >
            <button 
              className="absolute top-8 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-900"
              onClick={() => setOpen(false)}
            >
              <X size={28} strokeWidth={2} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-extrabold tracking-tight text-gray-900 hover:text-[#2f6b65] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 + 0.05, duration: 0.3 }}
              className="flex flex-col items-center gap-4 w-full max-w-xs mt-4"
            >
              <a
                href="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                <button className="w-full px-6 py-4 text-lg font-bold bg-gradient-to-r from-[#2f6b65] to-[#3b8780] text-white hover:to-[#469e96] rounded-full shadow-[0_8px_20px_rgba(47,107,101,0.3)] transition-all duration-300">
                  Book a Strategy Call
                </button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
