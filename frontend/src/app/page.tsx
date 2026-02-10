import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroGrid } from "@/components/features/HeroGrid";
import { Sidebar } from "@/components/layout/Sidebar";
import { NewsFeed } from "@/components/features/NewsFeed";
import { BreakingNewsTicker } from "@/components/features/BreakingNewsTicker";
import { CategorySection } from "@/components/features/CategorySection";
import { fetchNews } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data in parallel for performance
  const [latestArticles, techArticles, worldArticles] = await Promise.all([
    fetchNews(12),
    fetchNews(5, 'tecnología'),
    fetchNews(5, 'mundo')
  ]);

  const feedArticles = latestArticles.slice(3); 

  return (
    <div className="flex flex-col min-h-screen">
      <BreakingNewsTicker articles={latestArticles} />
      <Navbar />
      
      <main className="flex-grow">
        <HeroGrid articles={latestArticles} />
        
        {/* Main Content Area */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Category Blocks */}
              <CategorySection title="Tecnología" articles={techArticles} color="#2563eb" />
              <CategorySection title="Mundo" articles={worldArticles} color="#dc2626" />

              {/* Latest News Feed */}
              <div className="pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
                    <h3 className="text-xl font-bold uppercase bg-black text-white px-4 py-1 inline-block">Últimas Noticias</h3>
                  </div>
                  <NewsFeed initialArticles={feedArticles} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
               <Sidebar />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
