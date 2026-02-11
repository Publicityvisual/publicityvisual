"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlignLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { askAI } from "@/lib/ai-engine";

export function AIInsightsWidget() {
  const [mood, setMood] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      const response = await askAI(
        "Analiza el clima de las noticias de hoy: Tecnología, Media Hubs y Futuro Digital. Dame un resumen corto de 2 o 3 líneas sobre el 'Mood' o sentimiento general de la industria hoy.",
        "Eres un analista de tendencias de Publicity Visual. Tu tono es sofisticado, visionario y vibrante."
      );
      setMood(response);
      setLoading(false);
    }
    fetchInsights();
  }, []);

  return (
    <div className="jannah-card p-6 overflow-hidden relative group">
      {/* Decorative Gradient Background */}
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-[#f14d5d]/20 to-[#f9a23c]/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f14d5d] to-[#f9a23c] flex items-center justify-center text-white shadow-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">PV Intelligence</h4>
              <p className="text-[12px] font-black uppercase tracking-tight text-gray-800 dark:text-white">Clima de Información</p>
            </div>
          </div>
          <TrendingUp size={20} className="text-[#00d2c1]" />
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse w-3/4"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-300 italic font-medium">
              "{mood}"
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#f14d5d]">Tendencia: Positiva</span>
              <button className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 dark:hover:text-white flex items-center gap-1 transition-colors">
                <AlignLeft size={10} /> Análisis Completo
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
