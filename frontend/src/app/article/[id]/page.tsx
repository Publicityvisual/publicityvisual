import { fetchNews } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import Image from "next/image";
import { Metadata } from "next";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const articles = await fetchNews(50);
  const article = articles.find(a => a.id === params.id) || articles[0];

  if (!article) {
    return {
      title: 'Noticia no encontrada - Publicity Visual',
    };
  }

  return {
    title: `${article.title} - Publicity Visual`,
    description: article.description || 'Lee más sobre esta noticia en Publicity Visual',
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image_url || 'https://via.placeholder.com/1200x630'],
      type: 'article',
      publishedTime: article.published_at,
      authors: ['Publicity Visual'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image_url || 'https://via.placeholder.com/1200x630'],
    },
  };
}



import { MOCK_ARTICLES } from "@/lib/api";

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((article) => ({
    id: article.id,
  }));
}

// export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: PageProps) {
  // In a real app, we would have a fetchArticleById(id)
  // For now, we fetch news and find the one that matches or fallback
  const articles = await fetchNews(50); 
  const article = articles.find(a => a.id === params.id) || articles[0];

  if (!article) {
    return <div>Noticia no encontrada</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ReadingProgress />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-6 flex gap-2 uppercase font-bold tracking-wider">
          <span>Inicio</span> / <span>{article.category || "Noticias"}</span> / <span className="text-gray-800 truncate max-w-[200px]">{article.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            
            <header className="mb-8">
              <span className="bg-jannah-blue text-white text-xs font-bold px-2 py-1 rounded mb-4 inline-block uppercase">
                {article.category || "General"}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                     <User size={16} />
                   </div>
                   <span className="font-bold text-gray-700">Redacción</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{article.published_at || "Hace 2 horas"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>{article.source || "Fuente Externa"}</span>
                </div>
              </div>
            </header>

            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image 
                src={article.image_url || "https://via.placeholder.com/1200x800"} 
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-body">
              <p className="text-xl font-medium text-gray-900 mb-8 leading-loose border-l-4 border-jannah-blue pl-6 italic">
                {article.description || "Resumen de la noticia no disponible."}
              </p>
              
              {/* Simulated Content Body */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Análisis Profundo</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Share Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 size={18} /> Compartir este artículo
              </h4>
              <div className="flex gap-2">
                <button className="bg-[#3b5998] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold hover:opacity-90 transition-opacity">
                  <Facebook size={16} /> Facebook
                </button>
                <button className="bg-[#1da1f2] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold hover:opacity-90 transition-opacity">
                  <Twitter size={16} /> Twitter
                </button>
                 <button className="bg-[#0077b5] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold hover:opacity-90 transition-opacity">
                  <Linkedin size={16} /> LinkedIn
                </button>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
