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
  title: "Sobre Nós | D' Negócios",
  description: "Descubra a história e a engenharia por trás da D' Negócios. De clientes frustrados a uma agência global de performance pura.",
};

export default function SobrePage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[--color-brand-primary] selection:text-white">
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
