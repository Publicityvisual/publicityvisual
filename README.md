# Publicity Visual 🚀

Medio de prensa digital potenciado por Inteligencia Artificial. Plataforma de noticias con contenido generado profesionalmente por IA.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)

## 🌐 Demo

- **Sitio Web**: https://publicity-visual-1a5a0.firebaseapp.com
- **Repositorio**: https://github.com/Publicityvisual/publicityvisual

## ✨ Características

- 📰 **Noticias en tiempo real** - Contenido generado por IA profesional
- 🎨 **Diseño moderno** - Interfaz elegante con Tailwind CSS
- 📱 **Responsive** - Optimizado para móvil, tablet y desktop
- ⚡ **Rendimiento** - Construido con Vite para carga ultra-rápida
- 🔍 **Categorías** - Tecnología, Música, Entretenimiento, Actualidad
- 📧 **Newsletter** - Suscripción para noticias diarias
- 🤖 **IA Powered** - Contenido indistinguible de humanos

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Build Tool**: Vite 5
- **Icons**: Lucide React
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## 🚀 Despliegue

El proyecto se despliega automáticamente a Firebase Hosting en cada push a `main`.

### Configuración requerida en GitHub:

1. Ir a Settings → Secrets and variables → Actions
2. Agregar el secret: `FIREBASE_SERVICE_ACCOUNT_PUBLICITY_VISUAL_1A5A0` con el service account key de Firebase

## 💻 Desarrollo local

```bash
# Clonar repositorio
git clone https://github.com/Publicityvisual/publicityvisual.git
cd publicityvisual

# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📁 Estructura del proyecto

```
publicityvisual/
├── .github/workflows/     # CI/CD con GitHub Actions
├── src/
│   ├── App.tsx           # Componente principal
│   ├── index.css         # Estilos globales
│   └── main.tsx          # Punto de entrada
├── firebase.json         # Configuración Firebase
├── package.json          # Dependencias
├── tailwind.config.js    # Configuración Tailwind
├── tsconfig.json         # Configuración TypeScript
└── vite.config.ts        # Configuración Vite
```

## 📝 Contenido

Las noticias de ejemplo incluyen:
- Revolución de IA Generativa
- Estrenos musicales
- Avances tecnológicos (Apple Vision Pro 2)
- Eventos de cine (Festival de Cannes)
- Noticias de actualidad

## 🔮 Roadmap

- [ ] Integración con API de noticias reales
- [ ] Sistema de comentarios
- [ ] Panel de administración
- [ ] Generación de contenido con GPT-4
- [ ] App móvil (React Native)
- [ ] Notificaciones push

## 👥 Autor

**Publicity Visual** - Medio de Prensa IA

## 📄 Licencia

Este proyecto es privado y propiedad de Publicity Visual.

---

© 2026 Publicity Visual. Contenido generado con IA.
