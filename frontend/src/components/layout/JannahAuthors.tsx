"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserPlus } from "lucide-react";

const AUTHORS = [
  { name: "Daniel Kov", role: "Chief Editor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", posts: 124 },
  { name: "Sofia Rivera", role: "AI Analyst", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", posts: 86 },
  { name: "Marco Polo", role: "Tech Scout", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", posts: 52 },
];

export function JannahAuthors() {
  return (
    <div className="jannah-card p-6">
      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
        <span className="w-1 h-3 bg-gradient-to-b from-[#f14d5d] to-[#f9a23c]" />
        Nuestra Red
      </h4>
      
      <div className="space-y-6">
        {AUTHORS.map((author, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-md group-hover:border-[#f14d5d] transition-colors">
                <Image src={author.avatar} alt={author.name} fill className="object-cover" />
              </div>
              <div>
                <h5 className="text-[13px] font-black text-gray-800 dark:text-white uppercase tracking-tight group-hover:text-[#f14d5d] transition-colors">{author.name}</h5>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{author.role}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-800 dark:text-white">{author.posts}</span>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Posts</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-3 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#f14d5d] hover:border-[#f14d5d]/50 transition-all flex items-center justify-center gap-2">
        <UserPlus size={12} /> Unirte al Equipo
      </button>
    </div>
  );
}
