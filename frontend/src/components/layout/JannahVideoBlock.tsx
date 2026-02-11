"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

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
    <div className="mb-16 bg-[#1b1c1e] p-8 rounded-[4px] border border-white/5">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-sm overflow-hidden mb-3 border border-white/5 bg-black">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#f14d5d] flex items-center justify-center text-white shadow-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded-sm text-[8px] font-black text-white">
                {post.duration}
              </div>
            </div>
            <h4 className="text-[12px] font-black leading-tight text-white/90 uppercase group-hover:text-[#f14d5d] transition-colors line-clamp-2">
              {post.title}
            </h4>
            <span className="text-[9px] font-bold text-white/30 mt-2 block uppercase tracking-widest">
              {post.category}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
