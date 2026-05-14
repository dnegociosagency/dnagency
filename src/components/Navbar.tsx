"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./ui/MagneticButton";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ui/curtain-theme-toggle";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const links = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/#servicos" },
    { name: "Método", href: "/#metodo" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Blog", href: "/blog" },
    { name: "Cursos", href: "/academy" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-6 px-4 transition-all duration-300`}
      >
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isScrolled
              ? "bg-[--color-brand-darker]/70 backdrop-blur-md border border-[--color-border-white-10] shadow-lg"
              : "bg-transparent border border-transparent"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="DN Logo" width={80} height={32} className="object-contain brightness-200 dark:brightness-100" style={{ height: "32px", width: "auto" }} loading="eager" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[--foreground] opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Desktop & Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-9 h-9">
              <ThemeToggle variant="icon" defaultTheme="dark" duration={550} />
            </div>
            <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-6 py-2 text-sm font-bold bg-[--color-brand-primary] text-white hover:bg-[#3b8780] border-none shadow-[0_0_15px_rgba(47,107,101,0.4)]">
                Falar com Especialista
              </MagneticButton>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative w-9 h-9">
              <ThemeToggle variant="icon" defaultTheme="dark" duration={550} />
            </div>
            <button
              className="text-[--foreground] p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[--background]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-[--foreground] hover:text-[--color-brand-primary] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 flex flex-col items-center gap-6">
              <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                <MagneticButton className="px-8 py-3 text-lg font-bold bg-[--color-brand-primary] text-white hover:bg-[#3b8780] shadow-[0_0_20px_rgba(47,107,101,0.4)]">
                  Falar com Especialista
                </MagneticButton>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
