"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Post {
  title: string;
  image: string;
  category: string;
  date: string;
}

interface JannahDenseGridProps {
  posts: Post[];
}

export function JannahDenseGrid({ posts }: JannahDenseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {posts.slice(0, 3).map((post, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group cursor-pointer bg-white dark:bg-[#101214] border border-gray-100 dark:border-white/5 rounded-sm overflow-hidden flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-50 dark:border-white/10 p-1">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#f14d5d] mb-3">{post.category}</span>
          <h3 className="text-[14px] font-black leading-tight text-gray-800 dark:text-gray-100 uppercase group-hover:text-[#f14d5d] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest">{post.date}</p>
        </motion.div>
      ))}
    </div>
  );
}
