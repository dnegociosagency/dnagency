import React from "react";
import HeroMacBook from "@/components/academy/HeroMacBook";
import CoursesShowcase from "@/components/academy/CoursesShowcase";
import ConversionWhite from "@/components/academy/ConversionWhite";
import AcademyCheckout from "@/components/academy/AcademyCheckout";
import PixelWipeTransition from "@/components/ui/PixelWipeTransition";

export const metadata = {
  title: "Academy | Agência DN",
  description: "Não é apenas um curso. É um ecossistema. Descubra o futuro dos seus negócios.",
};

export default function AcademyPage() {
  return (
    <main className="bg-[#000000] min-h-screen text-white overflow-x-hidden selection:bg-[--color-brand-primary] selection:text-white">
      <HeroMacBook />
      
      {/* Transição Suave: Hero (Preto) → CoursesShowcase (Dark) */}
      <PixelWipeTransition
        fromColor="#000000"
        cols={18}
        rows={5}
        pattern="diagonal"
        duration={800}
        height={60}
      />

      <CoursesShowcase />
      <ConversionWhite />
      <AcademyCheckout />
    </main>
  );
}
