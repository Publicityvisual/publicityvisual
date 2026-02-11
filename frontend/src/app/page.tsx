import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/layout/MainHeader";
import { Navbar } from "@/components/layout/Navbar";
import { JannahBigGrid1 } from "@/components/layout/JannahBigGrid1";
import { JannahContentBlock } from "@/components/layout/JannahContentBlock";
import { JannahSocialCounter } from "@/components/layout/JannahSocialCounter";
import { JannahFooter } from "@/components/layout/JannahFooter";
import { JannahSmartAI } from "@/components/layout/JannahSmartAI";
import { JannahTabbedWidget } from "@/components/layout/JannahTabbedWidget";
import { DenseNewsBlock } from "@/components/layout/DenseNewsBlock";
import { JannahNewsletter } from "@/components/layout/JannahNewsletter";
import { JannahVideoBlock } from "@/components/layout/JannahVideoBlock";
import { JannahWeather } from "@/components/layout/JannahWeather";
import { JannahBreakingNews } from "@/components/layout/JannahBreakingNews";
import { JannahDenseGrid } from "@/components/layout/JannahDenseGrid";
import { AIInsightsWidget } from "@/components/layout/AIInsightsWidget";
import { JannahAuthors } from "@/components/layout/JannahAuthors";
import { StickySidebar } from "@/components/layout/StickySidebar";

export default function Home() {
  const techPosts = [
    { title: "Sensores 8K: La nueva frontera del streaming digital", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", category: "Tech", date: "Hace 1 hora" },
    { title: "IA Generativa en el flujo de trabajo PV", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", category: "Tech", date: "Hace 5 horas" },
    { title: "Realidad Aumentada: El futuro de la publicidad", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", category: "Tech", date: "Ayer" },
  ];

  const worldPosts = [
    { title: "Expansión del Media Hub en mercados europeos", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800", category: "Mundial", date: "FEB 10, 2026" },
    { title: "Tendencias de consumo digital para el segundo trimestre", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", category: "Mundial", date: "FEB 09, 2026" },
    { title: "Nuevas regulaciones para transmisiones en vivo", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800", category: "Estrategia", date: "Hace 3 días" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#101214]">
      {/* JANNAH_STABLE_VER_1 */}
      <TopBar />
      <MainHeader />
      <Navbar />
      
      <main className="flex-grow pt-8">
        <JannahBreakingNews />
        <JannahDenseGrid 
          posts={[
            { title: "El ascenso meteórico de la IA en el mundo real", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400", category: "IA", date: "Hace 10 min" },
            { title: "Smart Media: La nueva era del periodismo hub", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400", category: "Medios", date: "Hace 1h" },
            { title: "Producción Audiovisual 12K: Guía Completa", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400", category: "Tech", date: "Desde PV Hub" }
          ]}
        />
        <JannahBigGrid1 />
        
        <div className="jannah-container mt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <JannahContentBlock 
                title="Tecnología & Innovación" 
                posts={techPosts} 
                accentColor="#00a0d2"
                layout="grid"
              />
              
              <JannahContentBlock 
                title="Mundo & Estrategia" 
                posts={worldPosts} 
                accentColor="#f14d5d"
                layout="list"
              />

              <DenseNewsBlock 
                title="Entretenimiento & Cine"
                mainPost={{
                  title: "Blockbusters 2026: Las películas que dominarán la taquilla",
                  image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200",
                  category: "Cine",
                  date: "Hace 2 días",
                  excerpt: "Desde el regreso de franquicias legendarias hasta nuevas apuestas originales, analizamos el panorama cinematográfico del próximo año."
                }}
                subPosts={[
                  { title: "Review: La última joya oculta del streaming", image: "https://images.unsplash.com/photo-1593359677771-482062143881?w=400", category: "Streaming", date: "Hace 4h" },
                  { title: "Festivales de Cine: Lo que debes saber", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed0963c?w=400", category: "Cine", date: "Ayer" },
                  { title: "Nuevas series españolas para el fin de semana", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400", category: "Series", date: "Hace 6h" },
                  { title: "El impacto de la VR en la experiencia del cine", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", category: "Tech", date: "Hace 3 días" }
                ]}
                accentColor="#7b5db6"
              />

              <JannahVideoBlock 
                title="PV Multimedia"
                posts={[
                  { title: "Entrevista exclusiva con T Entertainment", image: "https://images.unsplash.com/photo-1598897619851-20a4d8f2ca64?w=800", category: "Entrevista", duration: "12:45" },
                  { title: "Detrás de cámaras: Producción digital 2026", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800", category: "Behind the scenes", duration: "08:20" },
                  { title: "Especial: El futuro de la IA en la televisión", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", category: "Especial", duration: "15:10" },
                  { title: "Tutorial: Creando contenido cinemático", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fce?w=800", category: "Tutorial", duration: "24:30" }
                ]}
                accentColor="#f14d5d"
              />
            </div>

            <div className="lg:col-span-1">
            <StickySidebar className="space-y-12">
              <JannahSmartAI />
              <AIInsightsWidget />
              <JannahAuthors />
              <JannahWeather />
              <JannahNewsletter />
              <JannahTabbedWidget />
              <JannahSocialCounter />
            </StickySidebar>
            <div className="bg-gray-200 dark:bg-white/5 aspect-square flex items-center justify-center border border-gray-300 dark:border-white/10 rounded-sm mt-12">
                <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.3em]">Ad 300x300</span>
              </div>
          </div>
          </div>
        </div>
      </main>

      <JannahFooter />
    </div>
  );
}
