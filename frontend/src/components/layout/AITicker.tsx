"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateTrendingTitles } from "@/lib/ai-engine";

export function AITicker() {
  const [titles, setTitles] = useState<string[]>(["Cargando inteligencia PV..."]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTitles = async () => {
      const news = await generateTrendingTitles();
      if (news && news.length > 0) setTitles(news);
    };

    fetchTitles();
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="flex items-center gap-2 h-full">
      <span className="bg-[#f14d5d] px-2 py-0.5 rounded-sm uppercase tracking-wider text-[10px] shrink-0 font-black">
        AI Trending
      </span>
      <div className="overflow-hidden w-[300px] md:w-[600px] h-4 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute inset-0 whitespace-nowrap text-[11px] font-bold text-white/90 uppercase"
          >
            {titles[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
