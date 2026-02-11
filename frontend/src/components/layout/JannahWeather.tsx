"use client";

import { motion } from "framer-motion";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

export function JannahWeather() {
  return (
    <div className="jannah-card overflow-hidden">
      <div className="bg-gradient-to-br from-[#00a0d2] to-[#3498db] p-8 text-white text-center relative overflow-hidden group">
        <Sun className="absolute -right-2 -top-2 opacity-20 group-hover:scale-110 transition-transform duration-700" size={80} />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">El Tiempo</h4>
        <div className="flex items-center justify-center gap-4">
          <Cloud className="text-white" size={48} />
          <div className="text-left">
            <span className="text-4xl font-black leading-none tracking-tighter">24°</span>
            <span className="text-[10px] font-bold block uppercase tracking-widest opacity-80">Nublado</span>
          </div>
        </div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest">CDMX, México</p>
      </div>
      
      <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-white/5">
        {[
          { day: "MIE", temp: "22°", icon: <CloudRain size={16} /> },
          { day: "JUE", temp: "25°", icon: <Sun size={16} /> },
          { day: "VIE", temp: "23°", icon: <Wind size={16} /> },
          { day: "SAB", temp: "26°", icon: <Sun size={16} /> },
        ].map((item, i) => (
          <div key={i} className="py-4 flex flex-col items-center justify-center gap-2">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{item.day}</span>
            <div className="text-[#00a0d2]">{item.icon}</div>
            <span className="text-[10px] font-black text-gray-700 dark:text-gray-200">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
