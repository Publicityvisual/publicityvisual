"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface Post {
  title: string;
  image: string;
  date: string;
}

interface MegaMenuProps {
  category: string;
  posts: Post[];
  isOpen: boolean;
}

export function MegaMenu({ category, posts, isOpen }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-[50px] left-0 w-full bg-white dark:bg-[#1b1c1e] border-b border-gray-100 dark:border-white/5 shadow-2xl z-40 overflow-hidden"
    >
      <div className="jannah-container py-10 flex gap-10">
        {/* Left: Category Sidebar */}
        <div className="w-48 shrink-0 border-r border-gray-100 dark:border-white/5 hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f14d5d] mb-6">Explorar {category}</p>
          <ul className="space-y-4">
            {["Más Recientes", "Tendencias", "Populares", "Revisiones"].map((item) => (
              <li key={item} className="flex items-center justify-between text-[12px] font-black uppercase transition-colors hover:text-[#f14d5d] cursor-pointer group">
                {item}
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Posts Grid */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 shadow-md">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h4 className="text-[13px] font-black uppercase leading-tight group-hover:text-[#f14d5d] transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{post.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
