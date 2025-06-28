# Publicity Visual - Plataforma de Noticias en Tiempo Real

Plataforma de noticias profesional que agrega, procesa y muestra noticias en tiempo real con marcas de agua y procesamiento automático de contenido multimedia.

## 🚀 Características Principales

- 📰 **Noticias en Tiempo Real**: Obtiene noticias de múltiples fuentes confiables
- 🖼️ **Procesamiento de Imágenes**: Añade marcas de agua automáticamente a las imágenes
- 🎬 **Soporte para Videos**: Procesa y marca videos con el logo de Publicity Visual
- 🔍 **Búsqueda Avanzada**: Encuentra noticias por categorías y palabras clave
- 📱 **Diseño Responsive**: Se adapta a cualquier dispositivo
- ⚡ **Rendimiento Optimizado**: Carga rápida incluso con contenido multimedia pesado

## 🏗️ Estructura del Proyecto

```
publicity-new/
├── media/               # Archivos multimedia procesados
├── templates/           # Plantillas HTML
│   └── index.html      # Plantilla principal
├── .env                # Variables de entorno
├── main.py             # Aplicación principal FastAPI
├── media_processor.py  # Procesamiento de imágenes/videos
├── news_fetcher.py     # Obtención de noticias
└── requirements.txt    # Dependencias de Python
```

## 🚀 Instalación Rápida

1. Clona el repositorio y accede al directorio:
   ```bash
   git clone https://github.com/tu-usuario/publicity-visual-news.git
   cd publicity-visual-news
   ```

2. Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   # En Windows:
   .\venv\Scripts\activate
   # En Linux/Mac:
   source venv/bin/activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones
   ```

5. Inicia el servidor:
   ```bash
   uvicorn main:app --reload
   ```

   La aplicación estará disponible en: `http://localhost:8000`

## 🛠️ Uso

### Obtener noticias

```http
GET /api/news
```

Parámetros:
- `query`: Término de búsqueda (opcional)
- `category`: Categoría de noticias (opcional)
- `language`: Código de idioma (por defecto: "es")
- `limit`: Número máximo de resultados (por defecto: 10)

### Procesar imagen con marca de agua

El sistema procesa automáticamente las imágenes de las noticias, añadiendo el logo de Publicity Visual y el texto de copyright.

## 🌐 Interfaz Web

La interfaz web incluye:

- 📰 Portada con noticias destacadas
- 🔍 Búsqueda por categorías y palabras clave
- 📱 Diseño responsive
- ⚡ Carga rápida con lazy loading de imágenes

## 🚀 Despliegue en Producción

1. Configura un servidor con Python 3.8+
2. Instala las dependencias del sistema:
   ```bash
   sudo apt-get update
   sudo apt-get install -y ffmpeg
   ```
3. Configura un servidor web como Nginx como proxy inverso
4. Configura SSL con Let's Encrypt
5. Usa un proceso manager como PM2 o Supervisor para mantener el servidor en ejecución

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@publicityvisual.com
- Documentación: [docs.publicityvisual.com](https://docs.publicityvisual.com)

## 🌟 Características Futuras

- [ ] Sistema de suscripciones
- [ ] Comentarios en noticias
- [ ] Panel de administración
- [ ] Exportación de noticias a PDF
- [ ] Integración con redes sociales

---

<div align="center">
  <h3>🚀 ¿Listo para comenzar?</h3>
  <p>Clona el repositorio y despliega tu propio portal de noticias con marcas de agua automáticas.</p>
  
  ```bash
  git clone https://github.com/tu-usuario/publicity-visual-news.git
  cd publicity-visual-news
  pip install -r requirements.txt
  uvicorn main:app --reload
  ```
  
  <p>Visita <a href="http://localhost:8000">http://localhost:8000</a> para ver la aplicación en acción.</p>
</div>
