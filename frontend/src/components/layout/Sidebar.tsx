"use client";

import { Facebook, Twitter, Instagram, Youtube, TrendingUp, Sun, Cloud, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="space-y-8 w-full sticky top-24">
      
      {/* Weather Widget (Mock) */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
        <div className="relative z-10 flex justify-between items-start">
            <div>
                <span className="text-blue-100 text-xs font-bold uppercase tracking-wider">Madrid, ES</span>
                <h3 className="text-4xl font-display font-bold mt-2">24°</h3>
                <p className="text-blue-100 text-sm mt-1">Soleado</p>
            </div>
            <Sun className="text-yellow-300 animate-spin-slow" size={48} />
        </div>
        <div className="mt-6 flex justify-between text-xs text-blue-100 border-t border-white/20 pt-4">
            <div className="flex flex-col items-center">
                <span>Lun</span>
                <Cloud size={14} className="my-1"/>
                <span>22°</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Mar</span>
                <Sun size={14} className="my-1"/>
                <span>25°</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Mié</span>
                <Sun size={14} className="my-1"/>
                <span>27°</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Jue</span>
                <Cloud size={14} className="my-1"/>
                <span>23°</span>
            </div>
        </div>
        {/* Background blobs */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Social Counter Widget */}
      <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
        <h4 className="text-sm font-bold border-b border-gray-100 pb-3 mb-5 uppercase tracking-wider flex items-center justify-between">
          <span>Síguenos</span>
          <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <a href="#" className="bg-[#1877f2]/10 hover:bg-[#1877f2] hover:text-white text-[#1877f2] transition-all p-3 text-center rounded-lg flex flex-col items-center group">
            <Facebook size={20} className="mb-1 group-hover:scale-110 transition-transform"/>
            <span className="block font-bold text-sm">12K</span>
            <span className="text-[10px] opacity-70 uppercase font-medium">Fans</span>
          </a>
          <a href="#" className="bg-[#1da1f2]/10 hover:bg-[#1da1f2] hover:text-white text-[#1da1f2] transition-all p-3 text-center rounded-lg flex flex-col items-center group">
            <Twitter size={20} className="mb-1 group-hover:scale-110 transition-transform"/>
            <span className="block font-bold text-sm">5K</span>
            <span className="text-[10px] opacity-70 uppercase font-medium">Followers</span>
          </a>
          <a href="#" className="bg-[#e1306c]/10 hover:bg-[#e1306c] hover:text-white text-[#e1306c] transition-all p-3 text-center rounded-lg flex flex-col items-center group">
            <Instagram size={20} className="mb-1 group-hover:scale-110 transition-transform"/>
            <span className="block font-bold text-sm">25K</span>
            <span className="text-[10px] opacity-70 uppercase font-medium">Followers</span>
          </a>
          <a href="#" className="bg-[#ff0000]/10 hover:bg-[#ff0000] hover:text-white text-[#ff0000] transition-all p-3 text-center rounded-lg flex flex-col items-center group">
            <Youtube size={20} className="mb-1 group-hover:scale-110 transition-transform"/>
            <span className="block font-bold text-sm">1M</span>
            <span className="text-[10px] opacity-70 uppercase font-medium">Subs</span>
          </a>
        </div>
      </div>

      {/* Financial Ticker (Mock) */}
      <div className="bg-gray-900 mx-auto w-full p-4 rounded-xl text-white">
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Mercados</h4>
            <ArrowUpRight size={14} className="text-green-500" />
          </div>
          <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">S&P 500</span>
                  <span className="text-green-400">+1.24%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">NASDAQ</span>
                  <span className="text-green-400">+0.98%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">EUR/USD</span>
                  <span className="text-red-400">-0.12%</span>
              </div>
          </div>
      </div>

      {/* Ad Space */}
      <div className="bg-brand-secondary p-6 rounded-xl text-center min-h-[300px] flex flex-col items-center justify-center text-gray-500 border border-gray-800 relative overflow-hidden group">
        <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 border border-gray-600 px-2 py-1 rounded">Publicidad</span>
        <h3 className="relative z-10 text-2xl font-display font-black text-white leading-tight mb-4">ESPACIO DISPONIBLE</h3>
        <button className="relative z-10 bg-white text-black text-xs font-bold uppercase px-4 py-2 rounded hover:bg-gray-200 transition-colors">Contactar</button>
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary via-gray-900 to-brand-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700"/>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Most Popular / Trending */}
      <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
        <h4 className="text-sm font-bold border-b border-gray-100 pb-3 mb-5 uppercase tracking-wider flex items-center gap-2 text-brand-secondary">
          <TrendingUp size={16} className="text-brand-accent" />
          <span>Lo Más Leído</span>
        </h4>
        
        <div className="flex flex-col gap-6">
            {/* Trending Item 1 */}
            <Link href="#" className="flex gap-4 group">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <span className="absolute top-0 left-0 bg-brand-accent text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center z-10 rounded-br-lg">1</span>
                    <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200" alt="News" fill className="object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="flex flex-col justify-center">
                     <span className="text-[10px] text-brand-accent font-bold uppercase mb-1">Tecnología</span>
                     <h3 className="text-sm font-bold leading-snug text-gray-800 group-hover:text-brand-primary transition-colors line-clamp-3">
                        El nuevo chip cuántico rompe todos los récords de velocidad
                     </h3>
                </div>
            </Link>

             {/* Trending Item 2 */}
             <Link href="#" className="flex gap-4 group">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <span className="absolute top-0 left-0 bg-brand-secondary text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center z-10 rounded-br-lg">2</span>
                    <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=200" alt="News" fill className="object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="flex flex-col justify-center">
                     <span className="text-[10px] text-brand-primary font-bold uppercase mb-1">Negocios</span>
                     <h3 className="text-sm font-bold leading-snug text-gray-800 group-hover:text-brand-primary transition-colors line-clamp-3">
                        Las acciones tecnológicas se disparan tras el anuncio de la FED
                     </h3>
                </div>
            </Link>

            {/* Trending Item 3 */}
            <Link href="#" className="flex gap-4 group">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <span className="absolute top-0 left-0 bg-gray-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center z-10 rounded-br-lg">3</span>
                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="News" fill className="object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="flex flex-col justify-center">
                     <span className="text-[10px] text-brand-accent font-bold uppercase mb-1">Viral</span>
                     <h3 className="text-sm font-bold leading-snug text-gray-800 group-hover:text-brand-primary transition-colors line-clamp-3">
                        Video: Un meteorito ilumina el cielo nocturno en Madrid
                     </h3>
                </div>
            </Link>
        </div>
      </div>
    </aside>
  );
}
