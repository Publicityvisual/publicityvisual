"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Post {
  title: string;
  image: string;
  category: string;
  date: string;
}

interface ContentBlockProps {
  title: string;
  posts: Post[];
  accentColor: string;
  layout: "grid" | "list";
}

export function JannahContentBlock({ title, posts, accentColor, layout }: ContentBlockProps) {
  return (
    <div className="mb-16">
      {/* Block Header */}
      <div className="flex items-center justify-between mb-8 pb-3 relative">
        <div className="flex items-center gap-4">
          <span className="w-[3px] h-6" style={{ backgroundColor: accentColor }} />
          <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight">{title}</h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100 dark:bg-white/5">
          <div className="h-full w-24" style={{ backgroundColor: accentColor }} />
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
          Explorar <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Block Content */}
      <div className={`grid gap-8 ${layout === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}>
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group cursor-pointer ${layout === "list" ? "flex flex-col md:flex-row gap-6 items-start" : ""}`}
          >
            {/* Thumbnail */}
            <div className={`relative overflow-hidden rounded-[4px] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 ${
              layout === "list" ? "w-full md:w-56 shrink-0 aspect-[16/10]" : "aspect-[16/10] mb-4"
            }`}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Info */}
            <div className="flex-grow">
              <span 
                className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm text-white mb-3 inline-block"
                style={{ backgroundColor: accentColor }}
              >
                {post.category}
              </span>
              <h3 className={`font-black text-gray-800 dark:text-white leading-snug group-hover:text-[#f14d5d] transition-colors ${
                layout === "list" ? "text-xl" : "text-base"
              }`}>
                {post.title}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest">{post.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
