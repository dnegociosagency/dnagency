import { Metadata } from "next";
import HeroCinematico from "@/components/sobre/HeroCinematico";
import CaosParaEstrategia from "@/components/sobre/CaosParaEstrategia";
import PandemiaProvaDeFogo from "@/components/sobre/PandemiaProvaDeFogo";
import NascimentoAgencia from "@/components/sobre/NascimentoAgencia";
import ExpansaoGlobal from "@/components/sobre/ExpansaoGlobal";
import LadoHumano from "@/components/sobre/LadoHumano";
import PrincipiosProposito from "@/components/sobre/PrincipiosProposito";
import FinalCinematico from "@/components/sobre/FinalCinematico";

export const metadata: Metadata = {
  title: "About Us | DN Agency",
  description: "Discover the story and growth engineering behind DN Agency. From frustrated clients to a global conversion-first agency helping businesses across the US & Canada.",
  alternates: {
    canonical: "https://www.agenciadnegocios.com/sobre",
  },
  openGraph: {
    title: "About Us | DN Agency",
    description: "Discover the story and growth engineering behind DN Agency. From frustrated clients to a global conversion-first agency.",
    url: "https://www.agenciadnegocios.com/sobre",
    images: ["/og-image.png"],
  },
};

export default function SobrePage() {
  return (
    <div className="selection:bg-[--color-brand-primary] selection:text-white">
      <HeroCinematico />
      <CaosParaEstrategia />
      <PandemiaProvaDeFogo />
      <NascimentoAgencia />
      <ExpansaoGlobal />
      <LadoHumano />
      <PrincipiosProposito />
      <FinalCinematico />
    </div>
  );
}
