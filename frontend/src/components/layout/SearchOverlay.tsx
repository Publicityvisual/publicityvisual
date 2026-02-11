"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai-engine";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAISearch = async () => {
    if (!query) return;
    setIsAiLoading(true);
    setAiResponse("");
    const result = await askAI(
      `Busca y resume información sobre: ${query}. Actúa como un motor de búsqueda inteligente del Media Hub.`,
      "Eres PV Intelligence, el motor de búsqueda semántica de Publicity Visual."
    );
    setAiResponse(result);
    setIsAiLoading(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#101214]/95 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={32} strokeWidth={3} />
          </button>

          <div className="w-full max-w-4xl text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative mb-8"
            >
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
                placeholder="ESCRIBE PARA BUSCAR CON IA..."
                className="w-full bg-transparent border-b-2 border-white/10 py-6 text-2xl md:text-5xl font-black text-white uppercase tracking-tighter focus:outline-none focus:border-[#f14d5d] transition-colors placeholder:text-white/10"
              />
              <button 
                onClick={handleAISearch}
                disabled={isAiLoading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#f14d5d] transition-colors"
              >
                {isAiLoading ? <Loader2 className="animate-spin" size={32} /> : <Sparkles size={32} />}
              </button>
            </motion.div>

            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-8 bg-white/5 rounded-sm border-l-4 border-[#f14d5d] text-left max-w-2xl mx-auto"
                >
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f14d5d] mb-4 flex items-center gap-2">
                    <Sparkles size={12} /> PV Intelligence Insights
                  </h4>
                  <p className="text-lg text-gray-200 leading-relaxed font-medium">
                    {aiResponse}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Trending:</span>
              {["Tecnología", "IA", "Media Hub", "Estrategia"].map((tag) => (
                <button 
                  key={tag}
                  className="text-[10px] font-black uppercase tracking-widest text-[#f14d5d] hover:text-white transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
