"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Rss } from "lucide-react";
import { AITicker } from "./AITicker";

export function TopBar() {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-[#2c2d31] text-white py-2 hidden md:block">
      <div className="jannah-container flex items-center justify-between text-[11px] font-bold">
        <div className="flex items-center gap-4">
          <AITicker />
        </div>

        <div className="flex items-center gap-6">
          <span className="text-white/40 border-r border-white/10 pr-6 uppercase">{currentDate}</span>
          <div className="flex items-center gap-4">
            <Facebook size={14} className="hover:text-[#3b5998] cursor-pointer transition-colors" />
            <Twitter size={14} className="hover:text-[#1da1f2] cursor-pointer transition-colors" />
            <Instagram size={14} className="hover:text-[#e1306c] cursor-pointer transition-colors" />
            <Youtube size={14} className="hover:text-[#ff0000] cursor-pointer transition-colors" />
            <Rss size={14} className="hover:text-[#ff6600] cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
