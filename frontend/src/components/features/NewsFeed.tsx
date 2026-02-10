"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Share2, Loader2, ArrowRight } from "lucide-react";
import { Article, fetchNews } from "@/lib/api";

interface NewsFeedProps {
  initialArticles: Article[];
}

export function NewsFeed({ initialArticles }: NewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const nextPage = page + 1;
      const newArticles = await fetchNews(6, '', '', nextPage);
      
      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        const currentIds = new Set(articles.map(a => a.id));
        const uniqueNewArticles = newArticles.filter(a => !currentIds.has(a.id));
        
        if (uniqueNewArticles.length === 0) {
             setHasMore(false);
        } else {
             setArticles([...articles, ...uniqueNewArticles]);
             setPage(nextPage);
        }
      }
    } catch (error) {
      console.error("Error loading more news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b-2 border-brand-secondary pb-2 mb-8">
        <h3 className="text-xl font-display font-black uppercase bg-brand-secondary text-white px-6 py-2 inline-block tracking-wider">
            Últimas Noticias
        </h3>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {articles.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id} className="group">
                <article className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                  <div className="relative w-full md:w-1/3 aspect-video md:aspect-[4/3] overflow-hidden rounded-lg flex-shrink-0">
                    <Image 
                      src={article.image_url || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800"} 
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase text-brand-primary">
                        {article.category || "General"}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 flex flex-col">
                    <div className="mb-2">
                        <h2 className="text-xl md:text-2xl font-display font-bold leading-tight text-gray-800 group-hover:text-brand-primary transition-colors">
                        {article.title}
                        </h2>
                    </div>
                    
                    <p className="hidden md:block text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {article.description || "Descubre los detalles de esta noticia exclusiva en nuestra plataforma..."}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-400 gap-4 font-medium">
                            <span className="flex items-center gap-1"><Clock size={14}/> {new Date(article.published_at).toLocaleDateString()}</span>
                            <span className="hidden sm:flex items-center gap-1 hover:text-brand-primary transition-colors"><Share2 size={14}/> Compartir</span>
                        </div>
                        <span className="text-xs font-bold text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            LEER MÁS <ArrowRight size={12} />
                        </span>
                    </div>
                  </div>
                </article>
            </Link>
        ))}
      </div>
      
      <div className="text-center py-10">
        {hasMore ? (
            <button 
                onClick={loadMore}
                disabled={loading}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-200 bg-brand-primary font-display uppercase tracking-widest hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin mr-2" size={16} />}
              {loading ? "Cargando..." : "Cargar Más Noticias"}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
        ) : (
            <p className="text-gray-400 text-sm upppercase tracking-widest font-medium">Fin del contenido</p>
        )}
      </div>
    </div>
  );
}

