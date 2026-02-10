import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-secondary text-gray-400 py-16 border-t border-gray-900 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6 md:col-span-1">
             <div className="flex flex-col gap-2">
                <div className="w-10 h-10 bg-brand-primary text-white flex items-center justify-center font-bold text-xl rounded-sm mb-2">P</div>
                <div className="text-2xl font-display font-black text-white uppercase tracking-tighter leading-none">
                Publicity<span className="text-brand-primary">Visual</span>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Líderes en periodismo digital. Comprometidos con la verdad, la innovación y la narrativa visual de alto impacto. Tu fuente confiable en un mundo complejo.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Column 2: Sections */}
          <div>
            <h4 className="text-white font-bold uppercase mb-6 text-sm tracking-wider">Secciones</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/category/mundo" className="hover:text-brand-primary transition-colors">Mundo</Link></li>
              <li><Link href="/category/politica" className="hover:text-brand-primary transition-colors">Política</Link></li>
              <li><Link href="/category/economia" className="hover:text-brand-primary transition-colors">Economía & Negocios</Link></li>
              <li><Link href="/category/tecnologia" className="hover:text-brand-primary transition-colors">Tecnología e IA</Link></li>
              <li><Link href="/category/cultura" className="hover:text-brand-primary transition-colors">Cultura y Estilo</Link></li>
              <li><Link href="/category/opinion" className="hover:text-brand-primary transition-colors">Opinión</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h4 className="text-white font-bold uppercase mb-6 text-sm tracking-wider">Corporativo</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Quiénes Somos</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Equipo Editorial</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Código de Ética</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Anúnciate con Nosotros</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Trabaja Aquí</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase mb-6 text-sm tracking-wider flex items-center gap-2">
                Newsletter <span className="bg-brand-accent text-[8px] px-1.5 py-0.5 rounded text-white">NUEVO</span>
            </h4>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-xs mb-4 text-gray-400">Análisis exclusivo y las noticias más importantes cada mañana.</p>
                <form className="flex flex-col gap-3">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="email" 
                        placeholder="tucorreo@ejemplo.com" 
                        className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-xs focus:border-brand-primary outline-none text-white transition-colors"
                    />
                </div>
                <button className="w-full bg-brand-primary text-white font-bold uppercase text-[10px] py-3 rounded-lg hover:bg-blue-600 transition-colors tracking-widest shadow-lg shadow-brand-primary/20">
                    Suscribirse Gratis
                </button>
                </form>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-wide">
          <p>&copy; {new Date().getFullYear()} Publicity Visual Media Group. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
             <Link href="#" className="hover:text-white transition-colors">Política de Cookies</Link>
             <Link href="#" className="hover:text-white transition-colors">Términos de Uso</Link>
             <Link href="#" className="hover:text-white transition-colors">Mapa del Sitio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
