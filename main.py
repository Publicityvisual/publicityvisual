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
from datetime import datetime
import random
from pathlib import Path
from passlib.context import CryptContext

# Importar módulos personalizados
from media_processor import MediaProcessor
from news_fetcher import NewsFetcher

# Intentar importar módulos de IA (LangChain/Llama)
try:
    from langchain_community.llms import LlamaCpp
    from langchain.tools import Tool
    from langchain.prompts import StringPromptTemplate
    from langchain.chains import LLMChain
    from langchain.agents import LLMSingleActionAgent, AgentExecutor
    from langchain.memory import ConversationBufferWindowMemory
    AI_AVAILABLE = True
except ImportError:
    print("Advertencia: LangChain o LlamaCpp no están instalados. El agente de IA no estará disponible.")
    AI_AVAILABLE = False

# Configuración Base
BASE_DIR = Path(__file__).resolve().parent
CACHE_DIR = BASE_DIR / "cache"
MEDIA_DIR = BASE_DIR / "media"
TEMPLATES_DIR = BASE_DIR / "templates"
MODELS_DIR = BASE_DIR / "models"

# Crear directorios necesarios
for directory in [CACHE_DIR, MEDIA_DIR, TEMPLATES_DIR, MODELS_DIR]:
    directory.mkdir(exist_ok=True)

# Configuración de la aplicación
app = FastAPI(title="Publicity Visual - Plataforma de Noticias & AI")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de plantillas y estáticos
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")
app.mount("/css", StaticFiles(directory=BASE_DIR / "css"), name="css")

# --- Componentes de Noticias ---
media_processor = MediaProcessor(logo_path=str(BASE_DIR / "logo.png"), opacity=0.8)
news_fetcher = NewsFetcher(api_keys={
    'newsapi': os.getenv('NEWSAPI_KEY', ''),
    'google_news': None
})

# --- Modelos de Datos (Noticias) ---
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

# --- Seguridad y Usuarios ---
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

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

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- Configuración del Agente de IA ---
agent_executor = None

if AI_AVAILABLE:
    print("Configurando Agente de IA...")
    model_path = str(MODELS_DIR / "llama-3-8b-instruct.gguf")
    
    if os.path.exists(model_path):
        try:
            llm = LlamaCpp(
                model_path=model_path,
                n_ctx=2048,
                n_threads=4, # Ajustado para compatibilidad
                temperature=0.7,
                max_tokens=2000,
                top_p=1,
                verbose=False,
            )

            # Herramientas
            def search_news_tool(query: str) -> str:
                """Buscar noticias relevantes"""
                return f"Noticias sobre {query}: [Resultados simulados]"

            def create_lead_tool(name: str, email: str, interest: str) -> str:
                """Crear un nuevo lead"""
                return f"Lead creado: {name} ({email}) interesado en {interest}"

            tools = [
                Tool(name="Buscar noticias", func=search_news_tool, description="Útil para buscar noticias recientes"),
                Tool(name="Crear lead", func=create_lead_tool, description="Útil para registrar nuevos leads de clientes")
            ]

            # Template
            class CustomPromptTemplate(StringPromptTemplate):
                template: str
                tools: List[Tool]
                
                def format(self, **kwargs) -> str:
                    tool_names = ", ".join([tool.name for tool in self.tools])
                    tools_desc = "\n".join([f"{tool.name}: {tool.description}" for tool in self.tools])
                    kwargs["tools"] = tools_desc
                    kwargs["tool_names"] = tool_names
                    return self.template.format(**kwargs)

            agent_template = """
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

            prompt = CustomPromptTemplate(
                template=agent_template,
                tools=tools,
                input_variables=["input", "history", "agent_scratchpad"]
            )

            memory = ConversationBufferWindowMemory(k=5)
            llm_chain = LLMChain(llm=llm, prompt=prompt)
            tool_names = [tool.name for tool in tools]
            
            # Nota: LLMSingleActionAgent está deprecado en versiones nuevas de LangChain, 
            # pero lo mantenemos para compatibilidad con el código original si se usan versiones viejas.
            # Idealmente se migraría a create_react_agent.
            agent = LLMSingleActionAgent(
                llm_chain=llm_chain,
                output_parser=None, # Requeriría un parser custom, simplificado aquí
                stop=["\nObservación:", "\n\tObservación:"],
                allowed_tools=tool_names
            )

            agent_executor = AgentExecutor.from_agent_and_tools(
                agent=agent,
                tools=tools,
                verbose=True,
                memory=memory
            )
            print("Agente de IA configurado correctamente.")
        except Exception as e:
            print(f"Error al configurar el agente de IA: {e}")
            agent_executor = None
    else:
        print(f"Advertencia: No se encontró el modelo en {model_path}")
        print("El chat de IA responderá con un mensaje por defecto.")
        agent_executor = None

# --- Rutas de la API ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Página principal"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/news", response_model=NewsResponse)
async def get_news(
    query: str = None,
    category: str = None,
    language: str = "es",
    limit: int = 10,
    page: int = 1
):
    """Obtener noticias de múltiples fuentes"""
    try:
        # Calcular offset simulado o real dependiendo del fetcher
        # Nota: NewsAPI usa 'page', así que lo pasamos directo si es compatible
        articles = news_fetcher.get_news(
            query=query or category,
            language=language,
            limit=limit,
            page=page
        )
        
        processed_articles = []
        for article in articles:
            article_id = f"{hash(article['url'])}"
            processed_image_url = None
            if article.get('image_url'):
                try:
                    # En producción, esto debería ser asíncrono o en background
                    processed_image_url = f"/media/{article_id}.jpg"
                except Exception:
                    pass
            
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
        
        return NewsResponse(count=len(processed_articles), articles=processed_articles)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat(message: str):
    """Endpoint para interactuar con el agente de IA"""
    if not agent_executor:
        return {"response": "El sistema de IA no está disponible en este momento (Modelo no cargado o error de configuración)."}
    
    try:
        response = agent_executor.run(message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Verificar el estado de la API"""
    return {
        "status": "ok", 
        "platform": "Publicity Visual AI",
        "ai_available": AI_AVAILABLE and (agent_executor is not None)
    }

# --- Tareas en Segundo Plano ---
async def update_news_cache():
    """Actualiza periódicamente la caché de noticias"""
    while True:
        try:
            categories = ["tecnología", "política", "deportes", "entretenimiento", "economía"]
            # Simulación de actualización
            # for category in categories: news_fetcher.get_news(...)
            pass
        except Exception as e:
            print(f"Error al actualizar caché: {e}")
        
        import asyncio
        await asyncio.sleep(3600)

@app.on_event("startup")
async def startup_event():
    import asyncio
    asyncio.create_task(update_news_cache())

# Iniciar la aplicación
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=1 # Workers reducidos para evitar conflictos con LlamaCpp local
    )
