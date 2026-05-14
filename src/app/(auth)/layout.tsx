import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#040807] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[--color-brand-primary] opacity-[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900 opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-900 opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* Top Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center gap-2 group">
          <Zap className="w-8 h-8 text-[--color-brand-primary] group-hover:scale-110 transition-transform duration-500" />
          <span className="text-2xl font-black text-white tracking-tight">Agência DN</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0a1211]/80 backdrop-blur-2xl py-10 px-4 sm:px-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:rounded-3xl">
          {children}
        </div>
      </div>
      
      {/* Footer minimal */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Agência DN. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
