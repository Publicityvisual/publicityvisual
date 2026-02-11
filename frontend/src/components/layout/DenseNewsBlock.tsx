"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface Post {
  title: string;
  image: string;
  category: string;
  date: string;
  excerpt?: string;
}

interface DenseNewsBlockProps {
  title: string;
  mainPost: Post;
  subPosts: Post[];
  accentColor?: string;
}

export function DenseNewsBlock({ title, mainPost, subPosts, accentColor = "#f14d5d" }: DenseNewsBlockProps) {
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const categories = ["TODOS", ...new Set(subPosts.map(p => p.category))];
  
  const filteredPosts = activeCategory === "TODOS" 
    ? subPosts 
    : subPosts.filter(p => p.category === activeCategory);

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-3 relative gap-4">
        <div className="flex items-center gap-4">
          <span className="w-[3px] h-6" style={{ backgroundColor: accentColor }}></span>
          <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight">{title}</h2>
        </div>
        
        {/* Ajax Tabs */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${
                activeCategory === cat ? "text-[#f14d5d]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100 dark:bg-white/5">
          <div className="h-full w-24" style={{ backgroundColor: accentColor }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group cursor-pointer jannah-card p-4 hover:border-[#f14d5d]/30"
        >
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-5">
            <Image 
              src={mainPost.image} 
              alt={mainPost.title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-xl rounded-sm" style={{ backgroundColor: accentColor }}>
                {mainPost.category}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-black text-gray-800 dark:text-white leading-tight uppercase group-hover:text-[#f14d5d] transition-colors line-clamp-2">
            {mainPost.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 line-clamp-3 leading-relaxed font-medium">
            {mainPost.excerpt || "Descubre las últimas tendencias y análisis exclusivos en Publicity Visual Media Hub."}
          </p>
          <div className="flex items-center gap-3 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Publicity Visual</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{mainPost.date}</span>
          </div>
        </motion.div>

        {/* Dense List Posts with Ajax Animation */}
        <div className="space-y-6 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filteredPosts.slice(0, 4).map((post, i) => (
              <motion.div 
                key={post.title}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-5 group cursor-pointer items-center jannah-card p-3 hover:translate-x-1"
              >
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest mb-1.5 inline-block" style={{ color: accentColor }}>
                    {post.category}
                  </span>
                  <h4 className="text-[13px] font-black text-gray-800 dark:text-white leading-tight uppercase group-hover:text-[#f14d5d] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                    {post.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
