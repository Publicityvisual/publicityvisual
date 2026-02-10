"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, User, X, ChevronDown, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fetchNews, Article } from "@/lib/api";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounce Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          const results = await fetchNews(5, "", searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <>
      {/* Top Bar - Premium Dark */}
      <div className="bg-brand-secondary text-gray-400 text-[11px] py-1.5 hidden md:block border-b border-white/5 tracking-wide">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-gray-300 font-medium">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
              Mercado Abierto
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              {/* Social Icons Placeholder - cleaner */}
              <a href="#" className="hover:text-white transition-colors">
                FB
              </a>
              <a href="#" className="hover:text-white transition-colors">
                TW
              </a>
              <a href="#" className="hover:text-white transition-colors">
                IG
              </a>
            </div>
            <div className="h-3 w-px bg-white/10"></div>
            <Link
              href="/login"
              className="flex items-center gap-2 hover:text-white transition-colors font-medium"
            >
              <User size={13} /> Suscríbete
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "bg-white transition-all duration-300 z-50 border-b border-gray-100",
          isScrolled
            ? "fixed top-0 w-full shadow-md py-2 bg-white/95 backdrop-blur-sm"
            : "relative py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo - Modern Typography */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary text-white flex items-center justify-center font-bold text-lg rounded-sm">
                P
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-black tracking-tighter text-brand-secondary group-hover:text-brand-primary transition-colors uppercase leading-none">
                Publicity<span className="text-brand-primary">Visual</span>
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <ul className="flex gap-1 font-display font-medium text-sm uppercase text-gray-600 tracking-wide">
                {[
                  "Mundo",
                  "Política",
                  "Economía",
                  "Tecnología",
                  "Cultura",
                  "Deportes",
                ].map((item) => (
                  <li key={item} className="relative group">
                    <Link
                      href={`/category/${item.toLowerCase()}`}
                      className="px-3 py-2 hover:text-brand-primary hover:bg-gray-50 rounded-md transition-all flex items-center gap-1"
                    >
                      {item}{" "}
                      <ChevronDown
                        size={12}
                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>

                    {/* Mega Menu - Glassmorphism */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 w-64">
                      <div className="bg-white shadow-xl rounded-lg border border-gray-100 p-1 overflow-hidden">
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 rounded-md"
                        >
                          Últimas en {item}
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 rounded-md"
                        >
                          Opinión
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 rounded-md"
                        >
                          Reportajes
                        </a>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-50 text-xs text-gray-500 rounded-md font-bold"
                        >
                          VER TODO
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-50 rounded-full transition-all"
                >
                  <Search size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-50 rounded-full transition-all relative">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border border-white"></span>
                </button>
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay - Full Screen Cinematic */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[60] flex flex-col pt-24 px-4"
          >
            <div className="container mx-auto max-w-4xl relative">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute -top-16 right-0 p-2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={32} />
              </button>

              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">
                Buscador Global
              </h2>
              <div className="relative mb-12 group">
                <input
                  type="text"
                  autoFocus
                  placeholder="Escribe tu búsqueda..."
                  className="w-full text-4xl md:text-6xl font-display font-bold border-b-2 border-gray-100 py-6 pr-12 focus:outline-none focus:border-brand-primary transition-colors bg-transparent placeholder-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary transition-colors"
                  size={48}
                />
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isSearching && (
                  <div className="col-span-full text-center text-gray-400 py-10">
                    Buscando en los archivos...
                  </div>
                )}

                {!isSearching &&
                  searchResults.length > 0 &&
                  searchResults.map((article) => (
                    <Link
                      href={`/article/${article.id}`}
                      key={article.id}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group cursor-pointer border border-transparent hover:border-gray-100 hover:shadow-lg">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
                          {article.image_url && (
                            <Image
                              src={article.image_url}
                              alt=""
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider mb-1 px-2 py-0.5 bg-blue-50 w-fit rounded-full">
                            {article.category}
                          </span>
                          <h3 className="font-bold text-lg leading-snug text-gray-800 group-hover:text-brand-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-50 flex flex-col pt-20 px-6 lg:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-500"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col gap-8">
              <ul className="space-y-6 font-display font-bold text-2xl text-gray-800">
                {[
                  "Inicio",
                  "Mundo",
                  "Política",
                  "Economía",
                  "Tecnología",
                  "Cultura",
                ].map((item) => (
                  <li key={item} className="border-b border-gray-100 pb-4">
                    <Link
                      href={
                        item === "Inicio"
                          ? "/"
                          : `/category/${item.toLowerCase()}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between"
                    >
                      {item}
                      <ChevronDown
                        size={20}
                        className="-rotate-90 opacity-30"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 mt-auto mb-8">
                <button className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg mb-2">
                  Suscríbete Ahora
                </button>
                <Link
                  href="/login"
                  className="w-full py-4 bg-gray-100 text-center font-bold rounded-lg text-gray-700"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
