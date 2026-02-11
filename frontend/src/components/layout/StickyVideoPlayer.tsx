"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function StickyVideoPlayer() {
  const [isSticky, setIsSticky] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isDismissed) return <div ref={containerRef} className="aspect-video bg-black/10 rounded-lg flex items-center justify-center"><Play className="text-white/20" size={48} /></div>;

  return (
    <>
      <div ref={containerRef} className="aspect-video bg-black rounded-lg relative overflow-hidden group">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1"
          title="PV Fusion Highlight"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <AnimatePresence>
        {isSticky && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-80 aspect-video bg-black rounded-xl shadow-2xl z-[100] overflow-hidden border-2 border-[#f14d5d]/50"
          >
            <button 
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full z-10 hover:bg-[#f14d5d] transition-colors"
            >
              <X size={14} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1"
              title="PV Fusion Mini Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-[9px] font-black text-white uppercase tracking-widest truncate">PV News: Estrategia Digital 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
