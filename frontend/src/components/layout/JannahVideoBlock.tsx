"use client";

import { motion } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";
import Image from "next/image";
import { StickyVideoPlayer } from "./StickyVideoPlayer";

interface VideoPost {
  title: string;
  image: string;
  category: string;
  duration: string;
}

interface JannahVideoBlockProps {
  title: string;
  posts: VideoPost[];
  accentColor?: string;
}

export function JannahVideoBlock({ title, posts, accentColor = "#f14d5d" }: JannahVideoBlockProps) {
  return (
    <div className="mb-16 bg-[#1b1c1e] p-8 rounded-lg border border-white/5 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-3 relative">
        <div className="flex items-center gap-4 text-white">
          <span className="w-[3px] h-6" style={{ backgroundColor: accentColor }}></span>
          <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
          <div className="h-full w-24" style={{ backgroundColor: accentColor }}></div>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
          Ver Canal <Play size={10} fill="currentColor" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sticky Video Area */}
        <div className="lg:col-span-2">
          <StickyVideoPlayer />
          <div className="mt-6">
            <span className="px-3 py-1 bg-[#f14d5d] text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block rounded-sm">Featured Video</span>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-[#f14d5d] transition-colors">
              PV Fusion: La Nueva Era de la Producción Multimedia Global
            </h3>
          </div>
        </div>

        {/* Sidebar Playlist */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-[#f14d5d] uppercase tracking-[0.2em] mb-4">Próximos Videos</p>
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 group cursor-pointer items-center p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="relative w-24 h-16 shrink-0 rounded-md overflow-hidden bg-black">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={16} className="text-white" fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-[12px] font-black text-white/90 leading-tight uppercase truncate group-hover:text-[#f14d5d] transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{post.category}</span>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">• {post.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
