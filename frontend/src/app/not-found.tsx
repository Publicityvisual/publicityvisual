"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/layout/MainHeader";
import { Navbar } from "@/components/layout/Navbar";
import { JannahFooter } from "@/components/layout/JannahFooter";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#101214]">
      <TopBar />
      <MainHeader />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-12">
        <div className="text-center max-w-xl mx-auto bg-white dark:bg-[#1b1c1e] p-16 shadow-xl border border-gray-100 dark:border-white/5 rounded-sm">
          <div className="text-9xl font-black text-gray-100 dark:text-white/5 mb-8">404</div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-white uppercase tracking-tight mb-4">Página No Encontrada</h1>
          <p className="text-gray-400 font-medium mb-12">Lo sentimos, la noticia o sección que buscas no está disponible en nuestro hub.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-[#f14d5d] text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-[#d94452] transition-colors flex items-center justify-center gap-2"
            >
              <Home size={14} /> Inicio
            </Link>
          </div>
        </div>
      </main>

      <JannahFooter />
    </div>
  );
}
