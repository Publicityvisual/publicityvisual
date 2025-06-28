from fastapi import APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from typing import Optional, List
from datetime import datetime
import os
import json

from config import config

router = APIRouter()
templates = Jinja2Templates(directory="templates")

# Rutas principales
@router.get("/", response_class=HTMLResponse, include_in_schema=False)
async def home(request: Request):
    """Página principal con las últimas noticias"""
    # Datos de ejemplo - en producción, esto vendría de una base de datos
    featured_articles = [
        {
            "id": 1,
            "title": "Última hora: Noticia destacada del día",
            "summary": "Resumen de la noticia más importante del momento...",
            "category": "Actualidad",
            "image_url": "/static/images/placeholder-news.jpg",
            "published_at": "Hace 2 horas",
            "author": "Equipo Publicity Visual",
            "url": "/noticia/ultima-hora-noticia-destacada"
        },
        # Más artículos destacados...
    ]
    
    latest_news = [
        {
            "id": 2,
            "title": "Título de la noticia más reciente",
            "summary": "Breve resumen de la noticia...",
            "category": "Tecnología",
            "image_url": "/static/images/placeholder-news.jpg",
            "published_at": "Hace 4 horas",
            "author": "Redacción Tecnología",
            "url": "/noticia/titulo-noticia-reciente"
        },
        # Más noticias recientes...
    ]
    
    return templates.TemplateResponse(
        "home.html",
        {
            "request": request,
            "featured_articles": featured_articles,
            "latest_news": latest_news,
            "page_title": "Inicio",
            "meta_description": config.META_DESCRIPTION,
            "meta_keywords": config.META_KEYWORDS
        }
    )

@router.get("/categoria/{category}", response_class=HTMLResponse, include_in_schema=False)
async def category_news(request: Request, category: str):
    """Página de categoría de noticias"""
    # Lógica para obtener noticias por categoría
    return templates.TemplateResponse(
        "category.html",
        {
            "request": request,
            "category": category.capitalize(),
            "page_title": f"Noticias de {category.capitalize()}"
        }
    )

@router.get("/noticia/{slug}", response_class=HTMLResponse, include_in_schema=False)
async def article_detail(request: Request, slug: str):
    """Página de detalle de noticia"""
    # Lógica para obtener el artículo por slug
    article = {
        "title": "Título de la noticia de ejemplo",
        "content": "<p>Contenido completo de la noticia...</p>",
        "category": "Tecnología",
        "image_url": "/static/images/placeholder-news.jpg",
        "published_at": "15 de junio, 2025",
        "author": "Redacción Tecnología",
        "tags": ["tecnología", "innovación", "noticias"],
        "related_articles": []
    }
    
    return templates.TemplateResponse(
        "article_detail.html",
        {
            "request": request,
            "article": article,
            "page_title": article["title"],
            "meta_description": article.get("summary", ""),
            "meta_image": article.get("image_url", "")
        }
    )

# Secciones de la empresa
@router.get("/nosotros", response_class=HTMLResponse, include_in_schema=False)
async def about_us(request: Request):
    """Página de información sobre Publicity Visual"""
    team_members = [
        {
            "name": "Nombre del Fundador",
            "role": "Director General",
            "bio": "Breve biografía del fundador...",
            "image": "/static/images/team/placeholder.jpg"
        },
        # Más miembros del equipo...
    ]
    
    return templates.TemplateResponse(
        "about.html",
        {
            "request": request,
            "page_title": "Sobre Nosotros",
            "team_members": team_members
        }
    )

@router.get("/contacto", response_class=HTMLResponse, include_in_schema=False)
async def contact(request: Request):
    """Página de contacto"""
    return templates.TemplateResponse(
        "contact.html",
        {
            "request": request,
            "page_title": "Contacto"
        }
    )

@router.get(/"publicidad", response_class=HTMLResponse, include_in_schema=False)
async def advertising(request: Request):
    """Página de publicidad y tarifas"""
    ad_packages = [
        {
            "name": "Básico",
            "price": "$5,000 MXN/mes",
            "features": [
                "Anuncio de banner (728x90)",
                "Hasta 50,000 impresiones",
                "Estadísticas básicas"
            ],
            "popular": False
        },
        {
            "name": "Estándar",
            "price": "$10,000 MXN/mes",
            "features": [
                "Anuncio destacado (300x250)",
                "Hasta 150,000 impresiones",
                "Estadísticas avanzadas",
                "Destacado en boletín semanal"
            ],
            "popular": True
        },
        {
            "name": "Premium",
            "price": "$20,000 MXN/mes",
            "features": [
                "Anuncio nativo",
                "Impresiones ilimitadas",
                "Estadísticas premium",
                "Artículo patrocinado incluido",
                "Redes sociales"
            ],
            "popular": False
        }
    ]
    
    return templates.TemplateResponse(
        "advertising.html",
        {
            "request": request,
            "page_title": "Publicidad",
            "ad_packages": ad_packages
        }
    )

# API para búsqueda de noticias
@router.get("/api/search", include_in_schema=True)
async def search_news(q: str, limit: int = 10):
    """API para buscar noticias"""
    # Lógica de búsqueda - en producción, esto buscaría en una base de datos
    results = []
    return {"query": q, "results": results, "total": len(results)}

# Manejo de errores personalizados
@router.get("/404", include_in_schema=False)
async def not_found(request: Request):
    return templates.TemplateResponse(
        "404.html",
        {"request": request, "page_title": "Página no encontrada"},
        status_code=404
    )

@router.get("/500", include_in_schema=False)
async def server_error(request: Request):
    return templates.TemplateResponse(
        "500.html",
        {"request": request, "page_title": "Error del servidor"},
        status_code=500
    )
