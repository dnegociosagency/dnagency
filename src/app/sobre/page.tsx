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
  title: "Sobre Nós",
  description: "Conheça a história e a engenharia de crescimento por trás da DN Agency. De clientes frustrados a uma agência focada em conversão que ajuda empresas no Brasil e no exterior.",
  alternates: {
    canonical: "https://www.agenciadnegocios.com/sobre",
  },
  openGraph: {
    title: "Sobre Nós | DN Agency",
    description: "Conheça a história e a engenharia de crescimento por trás da DN Agency. De clientes frustrados a uma agência global focada em conversão.",
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
