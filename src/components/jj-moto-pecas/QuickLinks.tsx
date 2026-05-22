"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

// Ícones de redes sociais SVGs inline personalizados (visto que o lucide-react nesta versão não os exporta)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

interface QuickLinksProps {
  unidade: UnidadeData;
}

export default function QuickLinks({ unidade }: QuickLinksProps) {
  const links = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(unidade.mensagemWhatsapp)}`,
      color: "hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:text-green-400",
      iconColor: "text-green-500",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: unidade.instagram,
      color: "hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:text-pink-400",
      iconColor: "text-pink-500",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: unidade.facebook,
      color: "hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:text-blue-400",
      iconColor: "text-blue-600",
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      href: unidade.youtube,
      color: "hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:text-red-400",
      iconColor: "text-red-600",
    },
    {
      name: "Google Maps",
      icon: MapPin,
      href: unidade.linkMaps,
      color: "hover:border-jj-blue hover:shadow-[0_0_20px_rgba(30,45,134,0.3)] hover:text-blue-300",
      iconColor: "text-jj-blue",
    },
    {
      name: "Telefone",
      icon: Phone,
      href: `tel:${unidade.telefone.replace(/\D/g, "")}`,
      color: "hover:border-jj-red hover:shadow-[0_0_20px_rgba(229,57,53,0.3)] hover:text-red-400",
      iconColor: "text-jj-red",
    },
  ];

  return (
    <section className="relative w-full py-8 px-6 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-silver/40 text-center mb-6">
          Acesso Rápido
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`jj-glass rounded-2xl p-4 flex flex-col items-center justify-center text-center group border border-white/5 transition-all duration-300 cursor-pointer ${link.color}`}
              >
                <div className={`p-2 rounded-xl bg-white/5 mb-2 group-hover:bg-white/10 transition-colors duration-300 ${link.iconColor}`}>
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[11px] font-bold tracking-wider text-jj-silver group-hover:text-jj-white transition-colors">
                  {link.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
