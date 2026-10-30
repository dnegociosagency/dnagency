"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// O site é escrito em português. Os outros idiomas são traduzidos pelo Google Tradutor,
// que lê o cookie "googtrans" (/pt/<idioma>) ao carregar a página.

const FlagBR = () => (
  <svg viewBox="0 0 28 20" className="h-full w-full">
    <rect width="28" height="20" fill="#009b3a" />
    <path d="M14 2.5 25.5 10 14 17.5 2.5 10z" fill="#fedf00" />
    <circle cx="14" cy="10" r="4.4" fill="#002776" />
  </svg>
);

const FlagUS = () => (
  <svg viewBox="0 0 28 20" className="h-full w-full">
    <rect width="28" height="20" fill="#fff" />
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
    ))}
    <rect width="12" height={(20 / 13) * 7} fill="#3c3b6e" />
  </svg>
);

const FlagES = () => (
  <svg viewBox="0 0 28 20" className="h-full w-full">
    <rect width="28" height="20" fill="#aa151b" />
    <rect y="5" width="28" height="10" fill="#f1bf00" />
  </svg>
);

const LANGUAGES = [
  { code: "pt", name: "Português", short: "PT", Flag: FlagBR },
  { code: "en", name: "English", short: "EN", Flag: FlagUS },
  { code: "es", name: "Español", short: "ES", Flag: FlagES },
];

function readLangCookie() {
  const match = document.cookie.match(/googtrans=\/pt\/([a-z]{2})/);
  return match ? match[1] : "pt";
}

function setLangCookie(code: string) {
  const host = window.location.hostname;
  const rootDomain = host.replace(/^www\./, "");
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  // Limpa o cookie em todas as variações de domínio que o Google pode ter usado
  for (const domain of ["", `; domain=${host}`, `; domain=.${rootDomain}`]) {
    document.cookie = `googtrans=; ${expired}; path=/${domain}`;
  }
  if (code !== "pt") {
    document.cookie = `googtrans=/pt/${code}; path=/`;
    document.cookie = `googtrans=/pt/${code}; path=/; domain=.${rootDomain}`;
  }
}

// O Google Tradutor troca nós de texto do DOM por <font>, o que faz o React quebrar
// ao remover/inserir esses nós depois. Esse patch evita o crash quando a tradução está ativa.
function patchDomForTranslation() {
  const w = window as unknown as { __dnTranslatePatched?: boolean };
  if (w.__dnTranslatePatched) return;
  w.__dnTranslatePatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, refNode: Node | null): T {
    if (refNode && refNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, refNode) as T;
  };
}

function loadGoogleTranslate() {
  if (document.getElementById("google-translate-script")) return;
  patchDomForTranslation();

  const w = window as unknown as {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: new (opts: object, id: string) => unknown } };
  };
  w.googleTranslateElementInit = () => {
    new w.google!.translate.TranslateElement(
      { pageLanguage: "pt", includedLanguages: "pt,en,es", autoDisplay: false },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function LanguageSelector({ variant = "light" }: { variant?: "light" | "menu" }) {
  const [isOpen, setIsOpen] = useState(false);
  // O Header só renderiza no cliente (após montar), então o cookie já pode ser lido aqui
  const [current] = useState(() => {
    const code = typeof document === "undefined" ? "pt" : readLangCookie();
    return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (current.code !== "pt") loadGoogleTranslate();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [current.code]);

  const changeLanguage = (code: string) => {
    setIsOpen(false);
    if (code === current.code) return;
    setLangCookie(code);
    window.location.reload();
  };

  if (variant === "menu") {
    return (
      <div className="notranslate flex items-center justify-center gap-3" translate="no">
        {LANGUAGES.map(({ code, name, Flag }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            aria-label={name}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              current.code === code
                ? "border-[#2f6b65] bg-[#2f6b65]/10 text-[#2f6b65]"
                : "border-gray-200 text-gray-500 hover:text-gray-900"
            )}
          >
            <span className="h-3.5 w-5 overflow-hidden rounded-[2px] shadow-sm">
              <Flag />
            </span>
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="notranslate relative" ref={dropdownRef} translate="no">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <span className="h-3.5 w-5 overflow-hidden rounded-[2px] shadow-sm">
          <current.Flag />
        </span>
        <span>{current.short}</span>
        <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl z-50"
          >
            {LANGUAGES.map(({ code, name, Flag }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
                  current.code === code
                    ? "bg-[#2f6b65]/5 font-semibold text-[#2f6b65]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <span className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-sm">
                  <Flag />
                </span>
                {name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contêiner exigido pelo widget do Google (fica oculto) */}
      <div id="google_translate_element" style={{ display: "none" }} />
    </div>
  );
}
