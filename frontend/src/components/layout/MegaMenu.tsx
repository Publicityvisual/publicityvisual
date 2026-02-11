"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full left-0 w-full bg-white dark:bg-[#1b1c1e] border-b border-gray-100 dark:border-white/5 shadow-2xl z-40 hidden lg:block"
    >
      <div className="jannah-container py-8 px-4">
        <div className="grid grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-3 border border-gray-100 dark:border-white/5 shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <h4 className="text-[12px] font-black uppercase leading-tight text-gray-800 dark:text-white group-hover:text-[#f14d5d] transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                {post.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
