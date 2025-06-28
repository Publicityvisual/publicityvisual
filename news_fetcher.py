import os
import json
import time
import random
from datetime import datetime, timedelta
import requests
from newspaper import Article, Config
from newsapi import NewsApiClient
from typing import List, Dict, Optional
import logging

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NewsFetcher:
    def __init__(self, api_keys: dict = None):
        """
        Inicializa el recolector de noticias con las claves API necesarias
        
        Args:
            api_keys (dict): Diccionario con claves API para diferentes servicios
        """
        self.api_keys = api_keys or {}
        self.cache_dir = "./news_cache"
        os.makedirs(self.cache_dir, exist_ok=True)
        
        # Configuración para newspaper3k
        self.config = Config()
        self.config.browser_user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        self.config.request_timeout = 10
        
        # Inicializar clientes de API
        self.newsapi = None
        if self.api_keys.get('newsapi'):
            self.newsapi = NewsApiClient(api_key=self.api_keys['newsapi'])
    
    def fetch_from_newsapi(self, query: str = None, language: str = 'es', page_size: int = 10) -> List[Dict]:
        """
        Obtiene noticias de NewsAPI
        
        Args:
            query (str): Término de búsqueda
            language (str): Código de idioma (ej. 'es', 'en')
            page_size (int): Número de resultados a devolver (máx. 100)
            
        Returns:
            List[Dict]: Lista de artículos de noticias
        """
        if not self.newsapi:
            logger.warning("NewsAPI no está configurado. Omite la búsqueda.")
            return []
        
        try:
            # Obtener las últimas noticias
            response = self.newsapi.get_top_headlines(
                q=query,
                language=language,
                page_size=min(page_size, 100)  # NewsAPI tiene un límite de 100
            )
            
            articles = []
            for article in response.get('articles', []):
                processed = {
                    'title': article.get('title', '').strip(),
                    'description': article.get('description', '').strip(),
                    'url': article.get('url', ''),
                    'image_url': article.get('urlToImage', ''),
                    'published_at': article.get('publishedAt', ''),
                    'source': article.get('source', {}).get('name', 'Desconocido'),
                    'category': 'General',
                    'language': language,
                    'api_source': 'newsapi'
                }
                articles.append(processed)
            
            return articles
            
        except Exception as e:
            logger.error(f"Error al obtener noticias de NewsAPI: {str(e)}")
            return []
    
    def fetch_from_google_news(self, query: str = None, language: str = 'es', limit: int = 10) -> List[Dict]:
        """
        Obtiene noticias de Google News mediante web scraping
        
        Args:
            query (str): Término de búsqueda
            language (str): Código de idioma (ej. 'es', 'en')
            limit (int): Número máximo de resultados
            
        Returns:
            List[Dict]: Lista de artículos de noticias
        """
        try:
            # Construir la URL de búsqueda de Google Noticias
            base_url = "https://news.google.com"
            search_query = f"{query} " if query else ""
            url = f"{base_url}/search?q={search_query}when:1d&hl={language}&gl={language.upper()}&ceid={language}:es"
            
            # Configurar headers para parecer un navegador real
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            # Realizar la petición
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            # Parsear la respuesta (esto es un ejemplo simplificado)
            # En un caso real, necesitarías usar BeautifulSoup o similar
            # para extraer los datos de la página de resultados
            
            # Este es un ejemplo de cómo podría verse la respuesta procesada
            # En una implementación real, necesitarías adaptar esto al HTML real de Google Noticias
            articles = []
            for i in range(min(limit, 5)):  # Limitamos a 5 resultados como ejemplo
                articles.append({
                    'title': f"Noticia de ejemplo {i+1} sobre {query}",
                    'description': f"Descripción de la noticia de ejemplo {i+1}",
                    'url': f"https://example.com/noticia-{i+1}",
                    'image_url': f"https://via.placeholder.com/300x200?text=Noticia+{i+1}",
                    'published_at': datetime.now().isoformat(),
                    'source': f"Fuente {i+1}",
                    'category': query.split()[0] if query else 'General',
                    'language': language,
                    'api_source': 'google_news'
                })
            
            return articles
            
        except Exception as e:
            logger.error(f"Error al obtener noticias de Google News: {str(e)}")
            return []
    
    def scrape_article(self, url: str) -> Optional[Dict]:
        """
        Extrae el contenido completo de un artículo de noticias
        
        Args:
            url (str): URL del artículo
            
        Returns:
            Optional[Dict]: Diccionario con el contenido del artículo o None en caso de error
        """
        try:
            article = Article(url, config=self.config)
            article.download()
            article.parse()
            
            return {
                'title': article.title,
                'text': article.text,
                'top_image': article.top_image,
                'images': article.images,
                'videos': article.movies,
                'publish_date': article.publish_date.isoformat() if article.publish_date else None,
                'authors': article.authors,
                'keywords': article.keywords,
                'summary': article.summary
            }
        except Exception as e:
            logger.error(f"Error al extraer el artículo {url}: {str(e)}")
            return None
    
    def get_news(self, query: str = None, language: str = 'es', limit: int = 20) -> List[Dict]:
        """
        Obtiene noticias de múltiples fuentes
        
        Args:
            query (str): Término de búsqueda
            language (str): Código de idioma
            limit (int): Número máximo de resultados
            
        Returns:
            List[Dict]: Lista de artículos de noticias
        """
        all_articles = []
        
        # Obtener noticias de NewsAPI si está configurado
        if self.newsapi:
            newsapi_articles = self.fetch_from_newsapi(query, language, min(limit, 50))
            all_articles.extend(newsapi_articles)
        
        # Obtener noticias de Google News
        google_articles = self.fetch_from_google_news(query, language, min(limit, 10))
        all_articles.extend(google_articles)
        
        # Ordenar por fecha de publicación (más recientes primero)
        all_articles.sort(key=lambda x: x.get('published_at', ''), reverse=True)
        
        # Limitar el número de resultados
        return all_articles[:limit]

# Ejemplo de uso
if __name__ == "__main__":
    # Configurar con tus propias claves API
    api_keys = {
        'newsapi': 'TU_CLAVE_DE_NEWSAPI_AQUI',
        'google_news': None  # No se necesita API key para el scraping básico
    }
    
    fetcher = NewsFetcher(api_keys)
    
    # Obtener noticias sobre tecnología
    print("Obteniendo noticias sobre tecnología...")
    tech_news = fetcher.get_news(query="tecnología", language="es", limit=5)
    
    # Mostrar resultados
    for i, article in enumerate(tech_news, 1):
        print(f"\n--- Noticia {i} ---")
        print(f"Título: {article.get('title')}")
        print(f"Fuente: {article.get('source')}")
        print(f"URL: {article.get('url')}")
        print(f"Fecha: {article.get('published_at')}")
        
        # Obtener contenido completo del primer artículo como ejemplo
        if i == 1 and article.get('url'):
            print("\nExtrayendo contenido completo del primer artículo...")
            full_article = fetcher.scrape_article(article['url'])
            if full_article:
                print(f"\nContenido completo (primeros 200 caracteres):")
                print(full_article.get('text', '')[:200] + "...")
