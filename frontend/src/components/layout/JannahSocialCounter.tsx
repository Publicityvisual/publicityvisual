"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Rss } from "lucide-react";

const socialData = [
  { name: "Facebook", icon: <Facebook size={16} />, count: "1.2M", label: "Fans", color: "#3b5998" },
  { name: "Twitter", icon: <Twitter size={16} />, count: "850K", label: "Seguidores", color: "#1da1f2" },
  { name: "Instagram", icon: <Instagram size={16} />, count: "450K", label: "Seguidores", color: "#e1306c" },
  { name: "YouTube", icon: <Youtube size={16} />, count: "320K", label: "Suscriptores", color: "#ff0000" },
  { name: "Feed", icon: <Rss size={16} />, count: "15K", label: "Lectores", color: "#ff6600" },
];

export function JannahSocialCounter() {
  return (
    <div className="jannah-card p-6 rounded-lg shadow-xl">
      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
        <span className="w-1 h-3 bg-[#f14d5d]" />
        Mantente Conectado
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {socialData.map((social) => (
          <div 
            key={social.name}
            className="flex items-center justify-between p-3 rounded-sm text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: social.color }}
          >
            <div className="flex items-center gap-3">
              {social.icon}
              <span className="text-[10px] uppercase font-black tracking-widest">{social.name}</span>
            </div>
            <div className="text-right">
              <span className="block text-sm font-black leading-none">{social.count}</span>
              <span className="text-[7px] uppercase font-bold opacity-60 tracking-widest">{social.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
