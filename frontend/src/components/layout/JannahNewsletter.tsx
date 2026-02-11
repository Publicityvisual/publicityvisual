"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export function JannahNewsletter() {
  return (
    <div className="bg-gradient-to-br from-[#f14d5d] to-[#f9a23c] p-8 rounded-lg text-white relative overflow-hidden group shadow-2xl">
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700 rotate-12">
        <Mail size={120} />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Mantente al día</h3>
        <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-6">Suscríbete para recibir lo mejor de PV en tu correo.</p>
        
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="Introduce tu email"
            className="w-full bg-white/10 border border-white/20 rounded-sm py-3 px-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all font-bold"
          />
          <button className="w-full bg-[#101214] text-white py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2">
            Suscribirse <Send size={12} />
          </button>
        </div>
        
        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-4">No enviamos spam. Respetamos tu privacidad.</p>
      </div>
    </div>
  );
}
