"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Cloud, Menu, X, ChevronDown, Facebook, Twitter, Instagram } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";
import { MegaMenu } from "./MegaMenu";
import { ReadingProgress } from "./ReadingProgress";

const MOCK_POSTS = [
  { title: "El futuro de la producción digital 2026", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", date: "Hace 1 hora" },
  { title: "Nuevas cámaras 12K para streaming Pro", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800", date: "Hace 5 horas" },
  { title: "Estrategias de contenido para Media Hubs", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", date: "Ayer" },
  { title: "PV Fusion: La alianza con T Entertainment", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800", date: "Hace 3 días" },
];

const NAV_LINKS = [
  { name: "Inicio", href: "/", icon: true },
  { name: "Mundial", href: "#", color: "var(--color-world)" },
  { name: "Tecnología", href: "#", color: "var(--color-tech)" },
  { name: "Entretenimiento", href: "#", color: "var(--color-gaming)" },
  { name: "Estilo de Vida", href: "#", color: "var(--color-health)" },
  { name: "Viajes", href: "#", color: "var(--color-travel)" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={cn(
      "z-50 transition-all duration-500 w-full border-b backdrop-blur-md",
      isScrolled 
        ? "fixed top-0 bg-white/80 dark:bg-[#0a0c0e]/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-white/20 dark:border-white/5" 
        : "relative bg-white dark:bg-[#101214] border-gray-100 dark:border-white/5"
    )}>
      <ReadingProgress />
      <div className="jannah-container flex items-center justify-between h-[50px]">
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center h-full">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              onMouseEnter={() => setActiveMegaMenu(link.name)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="h-full"
            >
              <Link
                href={link.href}
                className="h-full px-4 flex items-center text-[13px] font-black uppercase tracking-tight text-gray-700 dark:text-gray-200 hover:text-[#f14d5d] dark:hover:text-[#f14d5d] transition-colors relative group"
              >
                <span className="flex items-center gap-1.5">
                  {link.name}
                  {link.name !== "Inicio" && <ChevronDown size={10} className="text-gray-400" />}
                </span>
                {/* Jannah Style Indicator */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f14d5d] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              
              <AnimatePresence>
                {activeMegaMenu === link.name && link.name !== "Inicio" && (
                  <MegaMenu 
                    category={link.name} 
                    posts={MOCK_POSTS} 
                    isOpen={true} 
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-700 dark:text-gray-200"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Brand for sticky mobile view */}
        <div className={cn("lg:hidden transition-opacity", isScrolled ? "opacity-100" : "opacity-0")}>
          <span className="font-black text-lg uppercase tracking-tighter">
            P<span className="text-[#f14d5d]">V</span>
          </span>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 border-r border-gray-100 dark:border-white/5 text-gray-400 hover:text-[#f14d5d] transition-colors"
          >
            <Search size={18} />
          </button>
          
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 border-r border-gray-100 dark:border-white/5 text-gray-400 hover:text-[#f14d5d] transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-2 pl-2 text-[11px] font-bold text-gray-400">
            <Cloud size={18} className="text-[#00a0d2]" />
            <span className="hidden sm:inline">24°C</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[60] lg:hidden bg-gradient-to-br from-[#f14d5d] to-[#7b5db6] text-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black italic tracking-tighter">PV MEDIA</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/20">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Síguenos</p>
              <div className="flex gap-4">
                <div className="p-3 bg-white/10 rounded-full"><Facebook size={20} /></div>
                <div className="p-3 bg-white/10 rounded-full"><Twitter size={20} /></div>
                <div className="p-3 bg-white/10 rounded-full"><Instagram size={20} /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
