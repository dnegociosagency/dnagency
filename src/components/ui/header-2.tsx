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

  // Logo / nav color: true = sobre seÃ§Ã£o escura (logo branca), false = seÃ§Ã£o clara (logo preta)
  const [isDarkSection, setIsDarkSection] = useState(true);

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

  // DetecÃ§Ã£o dinÃ¢mica de seÃ§Ã£o via scroll â€” leve e performÃ¡tico
  useEffect(() => {
    if (typeof window === "undefined") return;

    const NAVBAR_MIDPOINT = 40; // ponto vertical do centro da navbar

    const updateTheme = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      let currentTheme = "dark"; // padrÃ£o escuro

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= NAVBAR_MIDPOINT && rect.bottom >= NAVBAR_MIDPOINT) {
          currentTheme = section.getAttribute("data-theme") ?? "dark";
        }
      });

      setIsDarkSection(currentTheme === "dark");
    };

    window.addEventListener("scroll", updateTheme, { passive: true });
    // Roda imediatamente e ao montar
    updateTheme();

    return () => window.removeEventListener("scroll", updateTheme);
  }, [mounted]);

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

  const isPlatformRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    isJJMoto;

  if (!mounted || isPlatformRoute) return null;

  const isVisible = isAcademy ? showAcademyHeader : true;

  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#servicos" },
    { label: "Method", href: "/#metodo" },
    { label: "About", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Academy", href: "/academy" },
  ];

  // Cores adaptativas baseadas na seÃ§Ã£o
  const navLinkClass = isDarkSection
    ? "text-white/70 hover:text-white"
    : "text-[#0a1211]/70 hover:text-[#0a1211]";

  const hamburgerClass = isDarkSection ? "text-white" : "text-[#0a1211]";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex items-center justify-center px-4 transition-all duration-500",
          scrolled ? "pt-4" : "pt-6",
          !isVisible && "opacity-0 pointer-events-none -translate-y-full"
        )}
      >
        <div
          className={cn(
            "w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 border backdrop-blur-lg",
            scrolled
              ? "bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-xl scale-[0.98]"
              : "bg-[var(--glass-bg)]/40 border-[var(--glass-border)] shadow-md"
          )}
        >
          {/* Logo â€” branca sobre dark, preta sobre light */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DN Logo"
              width={80}
              height={32}
              className={cn(
                "object-contain transition-all duration-500",
                isDarkSection ? "invert-0" : "invert"
              )}
              style={{ height: "32px", width: "auto" }}
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-all duration-300 relative group py-1",
                  navLinkClass
                )}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2f6b65] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagneticButton className="px-6 py-2 text-sm font-bold bg-[#2f6b65] text-white hover:bg-[#255651] border-none shadow-[0_0_15px_rgba(47,107,101,0.3)] transition-all duration-300">
                Book a Call
              </MagneticButton>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className={cn(
                "p-1.5 rounded-full hover:bg-black/5 transition-colors",
                hamburgerClass
              )}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 z-40 bg-[#040807]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 px-6"
          >
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-extrabold tracking-tight text-white hover:text-[#2f6b65] transition-colors"
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
              className="flex flex-col items-center gap-4 w-full max-w-xs"
            >
              <a
                href="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                <button className="w-full px-6 py-3.5 text-base font-bold bg-[#2f6b65] text-white hover:bg-[#255651] rounded-full shadow-[0_0_20px_rgba(47,107,101,0.3)] transition-all duration-300">
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
