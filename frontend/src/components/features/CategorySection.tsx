import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Article } from "@/lib/api";

interface CategorySectionProps {
  title: string;
  articles: Article[];
  color?: string; // Hex color for the category accent
}

export function CategorySection({ title, articles, color = "#0056b3" }: CategorySectionProps) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between border-b-2 mb-6" style={{ borderColor: color }}>
        <h3 
          className="text-lg font-display font-bold uppercase text-white px-4 py-1.5 inline-block tracking-wide rounded-t-sm"
          style={{ backgroundColor: color }}
        >
          {title}
        </h3>
        <Link href={`/category/${title.toLowerCase()}`} className="text-xs uppercase font-bold text-gray-400 hover:text-brand-primary flex items-center gap-1 transition-colors">
            Ver Todo <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Main Featured Article */}
        <Link href={`/article/${mainArticle.id}`} className="group block h-full">
            <div className="relative w-full h-64 md:h-full min-h-[350px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                    src={mainArticle.image_url || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800"}
                    alt={mainArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col justify-end w-full">
                    <span 
                        className="text-[10px] font-bold uppercase mb-3 inline-block px-2 py-0.5 rounded text-white w-fit tracking-wider"
                        style={{ backgroundColor: color }}
                    >
                        {mainArticle.category || "Destacado"}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight group-hover:text-gray-200 transition-colors">
                        {mainArticle.title}
                    </h2>
                    <div className="flex items-center text-gray-300 text-xs gap-3">
                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(mainArticle.published_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </Link>

        {/* Right: List of 4 Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {sideArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`} className="group flex flex-col gap-3">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                        <Image
                            src={article.image_url || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400"}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-base leading-snug group-hover:text-brand-primary transition-colors line-clamp-3 text-gray-800">
                            {article.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 block mt-2 font-medium">
                            {new Date(article.published_at).toLocaleDateString()}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
