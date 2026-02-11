"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GridItemProps {
  size: "large" | "small";
  category: string;
  categoryColor: string;
  title: string;
  image: string;
  date: string;
}

function GridItem({ size, category, categoryColor, title, image, date }: GridItemProps) {
  const isLarge = size === "large";
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden group cursor-pointer rounded-lg shadow-lg border border-white/10 ${
        isLarge ? "h-[450px] lg:h-[500px]" : "h-[220px] lg:h-[245px]"
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span 
          className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white w-fit mb-4 rounded-sm shadow-lg"
          style={{ backgroundColor: categoryColor }}
        >
          {category}
        </span>
        <h3 className={`font-black text-white leading-tight uppercase transition-colors group-hover:text-white/80 ${
          isLarge ? "text-xl md:text-3xl" : "text-sm md:text-base"
        }`}>
          {title}
        </h3>
        <div className="flex items-center gap-3 mt-3 text-[10px] font-bold text-white/50 uppercase tracking-widest">
          <span>Publicity Visual</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{date}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function JannahBigGrid1() {
  const items = [
    {
      size: "large" as const,
      category: "Tecnología",
      categoryColor: "#00a0d2",
      title: "La Inteligencia Artificial revoluciona la Producción Audiovisual",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200",
      date: "Hace 2 horas"
    },
    {
      size: "small" as const,
      category: "Mundial",
      categoryColor: "#f14d5d",
      title: "Nuevas Alianzas Globales en el Entretenimiento 2026",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800",
      date: "Hace 4 horas"
    },
    {
      size: "small" as const,
      category: "Cine",
      categoryColor: "#7b5db6",
      title: "Estrenos que marcarán la tendencia esta temporada",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
      date: "Ayer"
    },
    {
      size: "small" as const,
      category: "Viajes",
      categoryColor: "#ff9800",
      title: "Los destinos visuales más impactantes de Europa",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      date: "Hace 3 días"
    },
    {
      size: "small" as const,
      category: "Social",
      categoryColor: "#00d2c1",
      title: "Impacto de las redes sociales en la marca digital",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      date: "Hace 1 semana"
    }
  ];

  return (
    <section className="bg-white dark:bg-transparent py-10">
      <div className="jannah-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-[10px]">
          {/* Left Column (Large Item) */}
          <GridItem {...items[0]} />

          {/* Right Column (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-[10px]">
            {items.slice(1).map((item, i) => (
              <GridItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
