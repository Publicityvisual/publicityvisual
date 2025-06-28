from fastapi import FastAPI, Request, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.sessions import SessionMiddleware
import os
from pathlib import Path

from config import config

# Crear directorios necesarios
os.makedirs('media/articles', exist_ok=True)
os.makedirs('media/images', exist_ok=True)
os.makedirs('media/videos', exist_ok=True)
os.makedirs('logs', exist_ok=True)

# Inicializar la aplicación
app = FastAPI(
    title="Publicity Visual",
    description="Plataforma de noticias digitales en tiempo real",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configuración de middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    SessionMiddleware,
    secret_key=config.SECRET_KEY,
    session_cookie="publicity_session",
    max_age=14 * 24 * 60 * 60  # 14 días
)

# Configuración de archivos estáticos y plantillas
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Incluir rutas
from . import routes  # noqa: E402

# Configurar contexto para plantillas
@app.middleware("http")
async def add_template_context(request: Request, call_next):
    request.state.config = config
    response = await call_next(request)
    return response

# Manejo de errores
from fastapi import HTTPException
from fastapi.responses import JSONResponse

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    if request.url.path.startswith('/api/'):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )
    return templates.TemplateResponse(
        "error.html",
        {"request": request, "error": exc},
        status_code=exc.status_code
    )

# Variables globales para plantillas
@app.middleware("http")
async def add_global_template_vars(request: Request, call_next):
    request.state.global_vars = {
        "app_name": config.APP_NAME,
        "app_slogan": config.APP_SLOGAN,
        "social_media": config.SOCIAL_MEDIA,
        "company_info": config.COMPANY_INFO,
        "current_year": 2025,
        "enable_ads": config.ENABLE_ADS,
        "ad_client": config.AD_CLIENT,
        "ad_slot": config.AD_SLOT,
    }
    response = await call_next(request)
    return response
