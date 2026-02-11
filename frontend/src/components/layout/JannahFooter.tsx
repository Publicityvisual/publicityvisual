"use client";

import Link from "next/link";

export function JannahFooter() {
  return (
    <footer className="bg-[#1b1c1e] text-white pt-16 pb-8">
      <div className="jannah-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div>
            <h4 className="text-2xl font-black uppercase tracking-tighter mb-6">
              Publicity<span className="text-[#f14d5d]">Visual</span>
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              El Media Hub más influyente para la nueva era digital. Producción de élite, estrategia global y entretenimiento sin límites en alianza con T Entertainment.
            </p>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/5 flex items-center gap-2 text-white/40">
              <span className="w-1 h-3 bg-[#f14d5d]" />
              Categorías
            </h4>
            <ul className="space-y-3 text-[13px] font-bold text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Tecnología</li>
              <li className="hover:text-white cursor-pointer transition-colors">Entretenimiento</li>
              <li className="hover:text-white cursor-pointer transition-colors">Mundo</li>
              <li className="hover:text-white cursor-pointer transition-colors">Estilo de Vida</li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/5 flex items-center gap-2 text-white/40">
              <span className="w-1 h-3 bg-[#f14d5d]" />
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3 text-[13px] font-bold text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Sobre Nosotros</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
              <li className="hover:text-white cursor-pointer transition-colors">Publicidad</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacidad</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/5 flex items-center gap-2 text-white/40">
              <span className="w-1 h-3 bg-[#f14d5d]" />
              Suscríbete
            </h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full bg-white/5 border border-white/5 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-[#f14d5d] transition-colors"
                disabled
              />
              <button className="w-full mt-3 bg-[#f14d5d] py-3 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-[#d94452] transition-colors">
                Unirse
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © 2026 Publicity Visual Media Hub. Todos los derechos reservados.
          </p>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-6">
            <span>Powered by Jannah</span>
            <span>Design by Antigravity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
