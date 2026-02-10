import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-lg mx-auto bg-white p-12 rounded-lg shadow-xl">
          <div className="text-9xl font-extrabold text-jannah-blue mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Página no encontrada</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Lo sentimos, pero la página que buscas no existe, ha sido movida o eliminada. 
            Prueba buscando lo que necesitas o vuelve al inicio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-jannah-blue text-white px-6 py-3 rounded font-bold uppercase text-sm shadow hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Home size={18} /> Volver al Inicio
            </Link>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded font-bold uppercase text-sm border hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Search size={18} /> Buscar Noticia
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
