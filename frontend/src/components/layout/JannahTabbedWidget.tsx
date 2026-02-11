"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, MessageSquare } from "lucide-react";
import Image from "next/image";

const POPULAR_POSTS = [
  { title: "El impacto de la IA en los medios tradicionales", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", date: "FEB 10" },
  { title: "Streaming 12K: ¿Realidad o Marketing?", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", date: "FEB 09" },
  { title: "PV Fusion y el futuro del entretenimiento", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800", date: "FEB 08" },
];

const RECENT_POSTS = [
  { title: "Nuevas regulaciones de IA en Europa", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800", date: "Hace 1h" },
  { title: "Cámaras 8K: La guía definitiva", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800", date: "Hace 3h" },
  { title: "Publicidad digital en 2026", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", date: "Ayer" },
];

export function JannahTabbedWidget() {
  const [activeTab, setActiveTab] = useState("popular");

  return (
    <div className="bg-white dark:bg-[#101214] border border-gray-100 dark:border-white/5 rounded-[4px] overflow-hidden">
      <div className="flex border-b border-gray-100 dark:border-white/5">
        {[
          { id: "popular", icon: <Zap size={14} />, label: "Visto" },
          { id: "recent", icon: <Clock size={14} />, label: "Nuevo" },
          { id: "comments", icon: <MessageSquare size={14} />, label: "Chat" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-all relative ${
              activeTab === tab.id ? "text-[#f14d5d]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            {tab.icon}
            <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f14d5d]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            {(activeTab === "popular" ? POPULAR_POSTS : RECENT_POSTS).map((post, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="relative w-16 h-16 shrink-0 rounded-sm overflow-hidden border border-gray-100 dark:border-white/5">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="text-[11px] font-black uppercase leading-tight text-gray-800 dark:text-gray-200 group-hover:text-[#f14d5d] transition-colors line-clamp-2">
                    {post.title}
                  </h5>
                  <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{post.date}</span>
                </div>
              </div>
            ))}
            {activeTab === "comments" && (
              <div className="text-center py-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                  Utiliza PV Intelligence <br /> para iniciar una <br /> conversación inteligente.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
