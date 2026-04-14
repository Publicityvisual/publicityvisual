import { useState } from 'react'
import { 
  Menu, X, Search, Bell, User, ChevronRight, Clock, Eye, 
  TrendingUp, Zap, Music, Monitor, Globe, Share2,
  Filter
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Tipos
interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  views: string
  image: string
  featured?: boolean
  tags: string[]
}

interface Category {
  name: string
  icon: React.ReactNode
  slug: string
}

// Datos de ejemplo - Contenido generado por IA
const categories: Category[] = [
  { name: 'Tecnología', icon: <Zap size={18} />, slug: 'tech' },
  { name: 'Música', icon: <Music size={18} />, slug: 'music' },
  { name: 'Entretenimiento', icon: <Monitor size={18} />, slug: 'entertainment' },
  { name: 'Actualidad', icon: <Globe size={18} />, slug: 'news' },
  { name: 'Tendencias', icon: <TrendingUp size={18} />, slug: 'trending' },
]

const articles: Article[] = [
  {
    id: 1,
    title: "La Revolución de la IA Generativa: Cómo Está Transformando la Industria Creativa en 2026",
    excerpt: "Desde la creación de contenido hasta el diseño de experiencias personalizadas, la inteligencia artificial generativa está redefiniendo los límites de la creatividad humana. Analizamos los últimos avances y sus implicaciones éticas.",
    category: "Tecnología",
    author: "María González",
    date: "Hace 2 horas",
    readTime: "8 min",
    views: "12.4K",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    featured: true,
    tags: ["IA", "Tecnología", "Creatividad"]
  },
  {
    id: 2,
    title: "El Nuevo Álbum de The Weeknd Rompe Récords en Streaming Global",
    excerpt: "'Hurry Up Tomorrow' se convierte en el álbum más escuchado en las primeras 24 horas en la historia de las plataformas digitales.",
    category: "Música",
    author: "Carlos Ramírez",
    date: "Hace 4 horas",
    readTime: "5 min",
    views: "8.9K",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=350&fit=crop",
    tags: ["Música", "The Weeknd", "Streaming"]
  },
  {
    id: 3,
    title: "Apple Vision Pro 2: Rumores y Expectativas para el 2026",
    excerpt: "Los nuevos prototipos sugieren pantallas 8K por ojo y un precio más accesible. ¿Será este el momento de la realidad mixta masiva?",
    category: "Tecnología",
    author: "Ana Martínez",
    date: "Hace 6 horas",
    readTime: "6 min",
    views: "15.2K",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&h=350&fit=crop",
    tags: ["Apple", "VR", "Tecnología"]
  },
  {
    id: 4,
    title: "Festival de Cannes 2026: Las Películas Más Esperadas",
    excerpt: "Desde thrillers psicológicos hasta dramas íntimos, la 79ª edición del festival promete ser una de las más memorables de la última década.",
    category: "Entretenimiento",
    author: "Pedro Sánchez",
    date: "Hace 8 horas",
    readTime: "7 min",
    views: "6.7K",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=350&fit=crop",
    tags: ["Cine", "Festival", "Cannes"]
  },
  {
    id: 5,
    title: "Crisis Climática: Los Acuerdos de París Cumplen 10 Años",
    excerpt: "Un análisis exhaustivo de los avances y retrocesos en la lucha contra el cambio climático desde la histórica firma del acuerdo.",
    category: "Actualidad",
    author: "Laura Torres",
    date: "Hace 10 horas",
    readTime: "10 min",
    views: "9.3K",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=350&fit=crop",
    tags: ["Clima", "Medio Ambiente", "Política"]
  },
  {
    id: 6,
    title: "DeepSeek V4: La IA China que Compite con GPT-5",
    excerpt: "El nuevo modelo de lenguaje chino demuestra capacidades superiores en razonamiento matemático y comprensión contextual.",
    category: "Tecnología",
    author: "Diego Chen",
    date: "Hace 12 horas",
    readTime: "6 min",
    views: "22.1K",
    image: "https://images.unsplash.com/photo-1676299081847-09b7593a5d5d?w=600&h=350&fit=crop",
    tags: ["IA", "China", "Tecnología"]
  }
]

// Componentes
const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PV</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Publicity Visual</h1>
              <p className="text-xs text-gray-500">Medio de Prensa IA</p>
            </div>
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {categories.map((cat) => (
            <a key={cat.slug} href={`#${cat.slug}`} className="nav-link flex items-center gap-2">
              {cat.icon}
              {cat.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  </nav>
)

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed left-0 top-0 h-full w-72 bg-white z-50 shadow-xl lg:hidden"
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PV</span>
              </div>
              <span className="font-bold text-gray-900">Menú</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categorías</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  {cat.icon}
                  <span className="font-medium text-gray-700">{cat.name}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

const FeaturedArticle = ({ article }: { article: Article }) => (
  <article className="article-card group cursor-pointer">
    <div className="relative h-64 md:h-96 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-brand-600 text-white text-sm font-medium rounded-full">
            {article.category}
          </span>
          <span className="text-white/80 text-sm flex items-center gap-1">
            <Clock size={14} /> {article.date}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
          {article.title}
        </h2>
        <p className="text-white/90 text-base md:text-lg line-clamp-2 max-w-3xl">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
          <span>Por {article.author}</span>
          <span>•</span>
          <span>{article.readTime} de lectura</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {article.views}
          </span>
        </div>
      </div>
    </div>
  </article>
)

const ArticleCard = ({ article }: { article: Article }) => (
  <article className="article-card group cursor-pointer flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-md">
        {article.category}
      </span>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
        {article.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{article.date}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} /> {article.views}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        {article.tags.map((tag) => (
          <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </article>
)

const Newsletter = () => (
  <section className="bg-brand-900 rounded-2xl p-8 md:p-12 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
      Mantente Informado con IA
    </h2>
    <p className="text-brand-100 max-w-xl mx-auto mb-6">
      Recibe las noticias más importantes generadas por nuestra IA profesional directamente en tu correo.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="tu@email.com"
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
      />
      <button className="bg-white text-brand-900 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
        Suscribirse
      </button>
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PV</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Publicity Visual</h3>
              <p className="text-sm text-gray-400">Medio de Prensa Potenciado por IA</p>
            </div>
          </div>
          <p className="text-gray-400 max-w-sm">
            Noticias, análisis y contenido de calidad generado con inteligencia artificial de última generación.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Secciones</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <a href={`#${cat.slug}`} className="hover:text-white transition-colors">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-3">
            {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <Share2 size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>© 2026 Publicity Visual. Contenido generado con IA.</p>
      </div>
    </div>
  </footer>
)

// App Principal
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  const featuredArticle = articles.find(a => a.featured)
  const regularArticles = articles.filter(a => !a.featured)
  const filteredArticles = activeCategory === 'all' 
    ? regularArticles 
    : regularArticles.filter(a => a.category === categories.find(c => c.slug === activeCategory)?.name)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Últimas Noticias
            </h1>
            <p className="text-gray-600">
              Contenido actualizado generado por IA profesional
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium">
              <Filter size={16} />
              Filtrar
            </button>
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-2 bg-white rounded-lg shadow-sm border-none text-sm font-medium focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-8">
            <FeaturedArticle article={featuredArticle} />
          </section>
        )}

        {/* Article Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Más Noticias</h2>
            <a href="#" className="flex items-center gap-1 text-brand-600 font-medium hover:underline">
              Ver todas <ChevronRight size={18} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-12">
          <Newsletter />
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <h2 className="section-title flex items-center gap-2">
            <TrendingUp className="text-brand-600" />
            Tendencias del Momento
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {articles.slice(0, 5).map((article, index) => (
                <a
                  key={article.id}
                  href="#"
                  className="flex items-start gap-4 group p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl font-bold text-brand-200 group-hover:text-brand-600 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.views} vistas</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
