"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import MagneticButton from "@/components/ui/MagneticButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const pathname = usePathname();
  
  const isAcademy = pathname === "/academy";
  const [showAcademyHeader, setShowAcademyHeader] = useState(false);

  useEffect(() => {
    if (!isAcademy) return;
    
    const handleScroll = () => {
      const coursesSection = document.getElementById("courses-showcase");
      if (coursesSection) {
        const rect = coursesSection.getBoundingClientRect();
        // Show header when the top of the courses section reaches the middle of the screen
        if (rect.top <= window.innerHeight * 0.8) {
          setShowAcademyHeader(true);
        } else {
          setShowAcademyHeader(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAcademy]);

  const isVisible = isAcademy ? showAcademyHeader : true;

  const links = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Método", href: "/#metodo" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Cursos", href: "/academy" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-6 px-4 transition-all duration-500",
          scrolled ? "pt-4" : "pt-6",
          !isVisible && "opacity-0 pointer-events-none -translate-y-full"
        )}
      >
        <div
          className={cn(
            "w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
            scrolled
              ? "bg-[--color-brand-darker]/70 backdrop-blur-md border border-[--color-border-white-10] shadow-lg"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DN Logo"
              width={80}
              height={32}
              className="object-contain brightness-200 dark:brightness-100"
              style={{ height: "32px", width: "auto" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[--foreground] opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
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

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative w-9 h-9">
              <ThemeToggle variant="icon" defaultTheme="dark" duration={550} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative z-50 text-[--foreground]"
              onClick={() => setOpen(!open)}
            >
              <MenuToggleIcon open={open} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[--background] bg-opacity-95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-bold text-[--foreground] hover:text-[--color-brand-primary] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="mt-4 flex flex-col items-center gap-6">
              <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
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
