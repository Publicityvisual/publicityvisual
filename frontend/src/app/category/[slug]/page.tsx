import { fetchNews } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { NewsFeed } from "@/components/features/NewsFeed";

interface CategoryPageProps {
  params: { slug: string };
}



import { MOCK_ARTICLES } from "@/lib/api";

export async function generateStaticParams() {
  const categories = Array.from(new Set(MOCK_ARTICLES.map((article) => article.category.toLowerCase().replace(/\s+/g, '-'))));
  // Add standard categories that might not be in mock data but are in nav
  const standardCategories = ["mundo", "politica", "economia", "tecnologia", "cultura", "deportes"];
  const allCategories = Array.from(new Set([...categories, ...standardCategories]));
  
  return allCategories.map((slug) => ({
    slug: slug,
  }));
}

// export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = params.slug;
  // Decode slug if needed (e.g. "ciencia-y-salud" -> "ciencia")
  // For now we pass the slug directly as the API expects simple categories or handles mapping
  const articles = await fetchNews(20, category);

  if (!articles || articles.length === 0) {
    // Optionally handle empty category gracefully or 404
    // notFound(); 
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const displayTitle = capitalize(category.replace(/-/g, " "));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb / Header */}
        <div className="mb-8 border-b-2 border-jannah-blue pb-4">
            <span className="text-xs font-bold uppercase text-gray-400 mb-2 block">Explorando Categoría</span>
            <h1 className="text-4xl font-extrabold text-gray-900 uppercase">
                {displayTitle}
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Article List */}
          <div className="lg:col-span-2">
            {articles.length > 0 ? (
                <NewsFeed initialArticles={articles} />
            ) : (
                <div className="text-center py-20 bg-white rounded shadow-sm">
                    <p className="text-gray-500 text-lg">No hay noticias en esta categoría por el momento.</p>
                    <button className="mt-4 text-jannah-blue font-bold hover:underline">Volver al Inicio</button>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <Sidebar />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
