"use client";

export function MainHeader() {
  return (
    <div className="bg-white dark:bg-[#101214] border-b border-gray-100 dark:border-white/5 py-8">
      <div className="jannah-container flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-black tracking-tighter text-[#101214] dark:text-white uppercase leading-none">
            Publicity<span className="text-[#f14d5d]">Visual</span>
          </h1>
          <span className="text-[10px] font-bold text-gray-400 dark:text-white/20 uppercase tracking-[0.3em] mt-2">
            Digital Media & Entertainment Hub
          </span>
        </div>

        {/* Ad Placeholder */}
        <div className="hidden lg:flex w-[728px] h-[90px] bg-gray-100 dark:bg-white/5 items-center justify-center border border-gray-200 dark:border-white/10 rounded-sm overflow-hidden group cursor-pointer relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000" />
          <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.5em]">
            - Advertisement 728 x 90 -
          </span>
        </div>
      </div>
    </div>
  );
}
