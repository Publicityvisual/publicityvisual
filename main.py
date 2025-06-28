import os
import uvicorn
from fastapi import FastAPI, HTTPException, Depends, status, Request, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import json
import random
from pathlib import Path

# Importar módulos personalizados
from media_processor import MediaProcessor
from news_fetcher import NewsFetcher

# Configuración
BASE_DIR = Path(__file__).resolve().parent
CACHE_DIR = BASE_DIR / "cache"
MEDIA_DIR = BASE_DIR / "media"
TEMPLATES_DIR = BASE_DIR / "templates"

# Crear directorios necesarios
for directory in [CACHE_DIR, MEDIA_DIR, TEMPLATES_DIR]:
    directory.mkdir(exist_ok=True)

# Configuración de la aplicación
app = FastAPI(title="Publicity Visual - Plataforma de Noticias")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de plantillas
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

# Inicializar componentes
media_processor = MediaProcessor(logo_path=str(BASE_DIR / "logo.png"), opacity=0.8)
news_fetcher = NewsFetcher(api_keys={
    'newsapi': os.getenv('NEWSAPI_KEY', ''),
    'google_news': None
})

# Modelos de datos
class NewsArticle(BaseModel):
    id: str
    title: str
    description: str
    url: str
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    published_at: datetime
    source: str
    category: str
    language: str = "es"
    processed: bool = False
    processed_image_url: Optional[str] = None
    processed_video_url: Optional[str] = None

class NewsResponse(BaseModel):
    status: str = "success"
    count: int
    articles: List[NewsArticle]

# Rutas de la API
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Página principal"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/news", response_model=NewsResponse)
async def get_news(
    query: str = None,
    category: str = None,
    language: str = "es",
    limit: int = 10
):
    """Obtener noticias de múltiples fuentes"""
    try:
        # Obtener noticias
        articles = news_fetcher.get_news(
            query=query or category,
            language=language,
            limit=limit
        )
        
        # Procesar artículos
        processed_articles = []
        for article in articles:
            # Crear ID único para el artículo
            article_id = f"{hash(article['url'])}"
            
            # Procesar imagen si existe
            processed_image_url = None
            if article.get('image_url'):
                try:
                    processed_image_path = media_processor.add_watermark_to_image(
                        article['image_url'],
                        str(MEDIA_DIR / f"{article_id}.jpg")
                    )
                    processed_image_url = f"/media/{article_id}.jpg"
                except Exception as e:
                    print(f"Error al procesar imagen: {e}")
            
            # Crear objeto de artículo procesado
            processed_article = NewsArticle(
                id=article_id,
                title=article['title'],
                description=article['description'],
                url=article['url'],
                image_url=article.get('image_url'),
                published_at=article.get('published_at', datetime.utcnow().isoformat()),
                source=article.get('source', 'Desconocido'),
                category=article.get('category', 'General'),
                language=language,
                processed=bool(processed_image_url),
                processed_image_url=processed_image_url
            )
            processed_articles.append(processed_article)
        
        return NewsResponse(
            count=len(processed_articles),
            articles=processed_articles
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Servir archivos estáticos
app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")

# Tarea en segundo plano para mantener el caché actualizado
async def update_news_cache():
    """Actualiza periódicamente la caché de noticias"""
    while True:
        try:
            # Obtener noticias de diferentes categorías
            categories = ["tecnología", "política", "deportes", "entretenimiento", "economía"]
            for category in categories:
                news_fetcher.get_news(query=category, limit=5)
                print(f"Actualizada caché para categoría: {category}")
        except Exception as e:
            print(f"Error al actualizar caché: {e}")
        
        # Esperar 1 hora antes de la próxima actualización
        import asyncio
        await asyncio.sleep(3600)

# Evento de inicio de la aplicación
@app.on_event("startup")
async def startup_event():
    # Iniciar tarea en segundo plano para actualizar la caché
    import asyncio
    asyncio.create_task(update_news_cache())

# Iniciar la aplicación
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=4
    )

# Configuración inicial
app = FastAPI(title="Publicity Visual AI API")

# Configuración de seguridad
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 horas

# Modelo de datos
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Configuración de seguridad
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Cargar el modelo (esto se ejecutará solo una vez al iniciar)
print("Cargando modelo LLaMA 3...")
model_path = "./models/llama-3-8b-instruct.gguf"  # Asegúrate de tener este archivo

if not os.path.exists(model_path):
    print(f"Error: No se encontró el modelo en {model_path}")
    print("Por favor, descarga el modelo LLaMA 3 y colócalo en la carpeta 'models'")
    exit(1)

# Configuración del modelo
llm = LlamaCpp(
    model_path=model_path,
    n_ctx=2048,
    n_threads=8,
    n_gpu_layers=40,  # Ajustar según tu GPU
    temperature=0.7,
    max_tokens=2000,
    top_p=1,
    verbose=False,
)

# Definir herramientas personalizadas para el agente
def search_news(query: str) -> str:
    """Buscar noticias relevantes"""
    # Implementar búsqueda en base de datos o API de noticias
    return f"Noticias sobre {query}: [Resultados simulados]"

def create_lead(name: str, email: str, interest: str) -> str:
    """Crear un nuevo lead"""
    # Implementar lógica de guardado en base de datos
    return f"Lead creado: {name} ({email}) interesado en {interest}"

# Configurar herramientas del agente
tools = [
    Tool(
        name="Buscar noticias",
        func=search_news,
        description="Útil para buscar noticias recientes"
    ),
    Tool(
        name="Crear lead",
        func=create_lead,
        description="Útil para registrar nuevos leads de clientes"
    )
]

# Plantilla personalizada para el agente
class CustomPromptTemplate(StringPromptTemplate):
    template = """
    Eres un asistente avanzado de Publicity Visual con acceso a herramientas.
    
    Historial de la conversación:
    {history}
    
    Herramientas disponibles:
    {tools}
    
    Usa el siguiente formato:
    
    Pregunta: La pregunta que necesitas responder
    Pensamiento: Piensa en qué hacer a continuación
    Acción: La acción a realizar, debe ser una de: {tool_names}
    Entrada de la acción: La entrada para la acción
    Observación: El resultado de la acción
    ... (este ciclo se puede repetir N veces)
    Pensamiento: Ahora sé la respuesta final
    Respuesta: La respuesta final al usuario
    
    ¡Comienza!
    
    Pregunta: {input}
    {agent_scratchpad}"""
    
    def format(self, **kwargs):
        # Obtener los nombres de las herramientas
        tool_names = ", ".join([tool.name for tool in self.tools])
        # Obtener las descripciones de las herramientas
        tools = "\n".join([f"{tool.name}: {tool.description}" for tool in self.tools])
        # Formatear el prompt
        kwargs["tools"] = tools
        kwargs["tool_names"] = tool_names
        return self.template.format(**kwargs)

# Configurar el agente
prompt = CustomPromptTemplate(
    template=CustomPromptTemplate.template,
    tools=tools,
    input_variables=["input", "history", "agent_scratchpad"]
)

memory = ConversationBufferWindowMemory(k=5)

llm_chain = LLMChain(llm=llm, prompt=prompt)
tool_names = [tool.name for tool in tools]
agent = LLMSingleActionAgent(
    llm_chain=llm_chain,
    output_parser=None,
    stop=["\nObservación:", "\n\tObservación:"],
    allowed_tools=tool_names
)

agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent,
    tools=tools,
    verbose=True,
    memory=memory
)

# Endpoints de la API
@app.post("/api/chat")
async def chat(message: str):
    """Endpoint para interactuar con el agente de IA"""
    try:
        response = agent_executor.run(message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Verificar el estado de la API"""
    return {"status": "ok", "model": "LLaMA 3 8B", "platform": "Publicity Visual AI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
