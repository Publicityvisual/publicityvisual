"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, PlayCircle, BarChart2 } from "lucide-react"; // Added Icons
import { Article } from "@/lib/api";

interface HeroGridProps {
  articles: Article[];
}

export function HeroGrid({ articles }: HeroGridProps) {
  if (!articles || articles.length < 3) return null;

  // We take 4 articles for a nice grid: 1 large, 2 small stacked, 1 medium tall
  const featured = articles[0];
  const sideStacked = articles.slice(1, 3);
  const sideTall = articles[3];

  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[550px]">
          
          {/* 1. Main Feature (2 cols wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 relative group overflow-hidden rounded-2xl shadow-sm h-[400px] lg:h-full cursor-pointer"
          >
            <Link href={`/article/${featured.id}`} className="block h-full w-full">
                <Image 
                src={featured.image_url || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600"} 
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                    {featured.category || "Exclusiva"}
                    </span>
                    <span className="text-white/80 text-xs flex items-center gap-1 font-medium bg-black/30 px-2 py-1 rounded-sm backdrop-blur-sm">
                        <BarChart2 size={12} /> Tendencia
                    </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 leading-snug group-hover:text-gray-100 transition-colors">
                    {featured.title}
                </h2>
                
                <p className="text-gray-300 text-sm md:text-base line-clamp-2 md:w-3/4 mb-4 font-light">
                    {featured.description}
                </p>

                <div className="flex items-center text-gray-400 text-xs gap-4 font-medium">
                    <span className="flex items-center gap-1"><Clock size={14} /> Hace 2 horas</span>
                    <span className="text-white/60">por Redacción</span>
                </div>
                </div>
            </Link>
          </motion.div>

          {/* 2. Side Stacked (1 col wide) */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            {sideStacked.map((article, index) => (
               <motion.div 
               key={article.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 * (index + 1) }}
               className="relative flex-1 group overflow-hidden rounded-2xl shadow-sm min-h-[200px]"
             >
                <Link href={`/article/${article.id}`} className="block h-full w-full">
                    <Image 
                        src={article.image_url || "https://via.placeholder.com/800"} 
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                        <span className="bg-brand-primary/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm mb-2 inline-block uppercase tracking-wide">
                            {article.category || "Actualidad"}
                        </span>
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:underline decoration-brand-accent underline-offset-4">
                            {article.title}
                        </h3>
                    </div>
                 </Link>
             </motion.div>
            ))}
          </div>

          {/* 3. Tall Feature (1 col wide) - "Opinion" or Special */}
          {sideTall && (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1 relative group overflow-hidden rounded-2xl shadow-sm h-[300px] lg:h-full hidden lg:block"
            >
                <Link href={`/article/${sideTall.id}`} className="block h-full w-full">
                    <Image 
                        src={sideTall.image_url || "https://via.placeholder.com/600x800"} 
                        alt={sideTall.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                     {/* Darker overlay for text legibility */}
                    <div className="absolute inset-0 bg-brand-secondary/40 group-hover:bg-brand-secondary/30 transition-colors" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <PlayCircle size={20} />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                            En Foco
                        </span>
                        <h3 className="text-xl font-display font-bold text-white leading-tight mb-2">
                        {sideTall.title}
                        </h3>
                        <div className="h-0.5 w-10 bg-brand-accent group-hover:w-full transition-all duration-500"></div>
                    </div>
                </Link>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

