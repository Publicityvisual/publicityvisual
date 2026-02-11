"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const BREAKING_NEWS = [
  "PV Intelligence detecta nuevas tendencias para 2026",
  "T Entertainment anuncia alianza estratégica para Media Hub",
  "Nuevos sensores 12K revolucionan el streaming digital",
  "Publicity Visual alcanza el 'Diamond Standard' en diseño",
];

export function JannahBreakingNews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="jannah-container mb-8">
      <div className="bg-white dark:bg-[#101214] border border-gray-100 dark:border-white/5 p-1 flex items-center gap-4 rounded-sm shadow-sm overflow-hidden">
        <div className="bg-[#f14d5d] text-white px-4 py-2 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shrink-0">
          <Zap size={12} fill="currentColor" />
          Urgente
        </div>
        
        <div className="flex-grow overflow-hidden relative h-10 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              className="text-[11px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight truncate cursor-pointer hover:text-[#f14d5d] transition-colors"
            >
              {BREAKING_NEWS[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex border-l border-gray-100 dark:border-white/5 h-10 divide-x divide-gray-100 dark:divide-white/5 shrink-0">
          <button 
            onClick={() => setIndex((prev) => (prev - 1 + BREAKING_NEWS.length) % BREAKING_NEWS.length)}
            className="px-3 hover:text-[#f14d5d] transition-colors text-gray-400"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => setIndex((prev) => (prev + 1) % BREAKING_NEWS.length)}
            className="px-3 hover:text-[#f14d5d] transition-colors text-gray-400"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
