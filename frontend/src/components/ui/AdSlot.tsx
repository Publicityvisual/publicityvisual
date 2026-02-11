"use client";

import { cn } from "@/lib/utils";

interface AdSlotProps {
  type: "leaderboard" | "rectangle" | "sidebar";
  className?: string;
  label?: string;
}

export function AdSlot({ type, className, label = "Publicidad" }: AdSlotProps) {
  const styles = {
    leaderboard: "w-full min-h-[90px] md:min-h-[120px] mb-8",
    rectangle: "w-full aspect-[300/250] max-w-[300px] mx-auto",
    sidebar: "w-full aspect-square mb-12",
  };

  return (
    <div className={cn(
      "bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-sm flex items-center justify-center relative group overflow-hidden",
      styles[type],
      className
    )}>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-200 dark:border-white/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-200 dark:border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-200 dark:border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-200 dark:border-white/20"></div>

      <div className="text-center">
        <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.3em] block mb-1">
          {label}
        </span>
        <span className="text-[9px] font-bold text-gray-300 dark:text-white/10 uppercase tracking-widest hidden group-hover:block transition-all italic">
          {type === "leaderboard" ? "728 x 90 BANNERS" : type === "rectangle" ? "300 x 250 ADS" : "300 x 300 SIDEBAR"}
        </span>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
}
