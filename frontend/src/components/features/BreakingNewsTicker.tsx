"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/lib/api";
import { Zap } from "lucide-react";

interface BreakingNewsTickerProps {
  articles: Article[];
}

export function BreakingNewsTicker({ articles }: BreakingNewsTickerProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="w-full bg-brand-secondary text-white py-2.5 overflow-hidden flex items-center border-b border-gray-800 shadow-sm relative z-40">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-brand-accent text-white text-[10px] font-bold uppercase px-3 py-1 mr-6 rounded-sm whitespace-nowrap tracking-wider shadow-lg shadow-brand-accent/20">
          <Zap size={12} fill="currentColor" /> Última Hora
        </div>
        <div className="flex-1 overflow-hidden relative h-6 mask-gradient">
           <motion.div 
             className="flex gap-12 absolute whitespace-nowrap items-center h-full"
             animate={{ x: ["0%", "-100%"] }}
             transition={{ 
               repeat: Infinity, 
               duration: 40, 
               ease: "linear" 
             }}
             style={{ width: "fit-content" }}
           >
             {[...articles, ...articles].map((article, idx) => ( // Duplicate for seamless loop
               <Link 
                 key={`${article.id}-${idx}`} 
                 href={`/article/${article.id}`}
                 className="text-xs font-medium hover:text-brand-primary transition-colors flex items-center gap-3 text-gray-300"
               >
                 <span className="w-1 h-1 bg-brand-primary rounded-full inline-block"></span>
                 {article.title}
               </Link>
             ))}
           </motion.div>
           
           {/* Fade gradients for smooth edges */}
           <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-brand-secondary to-transparent z-10 pointer-events-none" />
           <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-brand-secondary to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
