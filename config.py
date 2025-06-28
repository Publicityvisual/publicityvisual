import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Directorio base
BASE_DIR = Path(__file__).resolve().parent

# Configuración de la aplicación
class Config:
    # Configuración general
    APP_NAME = "Publicity Visual"
    APP_SLOGAN = "Noticias que Importan y se Comparten"
    APP_DESCRIPTION = "Medio de Prensa Digital Independiente con base en Querétaro. Informamos con raíz, sin partidos, sin sesgos."
    
    # Configuración de la base de datos
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', f'sqlite:///{BASE_DIR}/publicity.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración de seguridad
    SECRET_KEY = os.getenv('SECRET_KEY', 'clave-secreta-predeterminada-cambiar-en-produccion')
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT', 'sal-segura-cambiar-en-produccion')
    
    # Configuración de archivos
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'media')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'webp'}
    
    # Configuración de correo
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'true').lower() == 'true'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', '')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'notificaciones@publicityvisual.com')
    
    # Configuración de la aplicación
    ARTICLES_PER_PAGE = 10
    COMMENTS_PER_PAGE = 20
    
    # Configuración de publicidad
    ENABLE_ADS = os.getenv('ENABLE_ADS', 'false').lower() == 'true'
    AD_CLIENT = os.getenv('AD_CLIENT', 'ca-pub-xxxxxxxxxxxxxx')
    AD_SLOT = os.getenv('AD_SLOT', 'xxxxxxxxxx')
    
    # Configuración de redes sociales
    SOCIAL_MEDIA = {
        'facebook': 'https://facebook.com/publicityvisual',
        'twitter': 'https://twitter.com/publicityvisual',
        'instagram': 'https://instagram.com/publicityvisual',
        'youtube': 'https://youtube.com/@publicityvisual',
        'tiktok': 'https://tiktok.com/@publicityvisual'
    }
    
    # Configuración de la empresa
    COMPANY_INFO = {
        'name': 'Publicity Visual',
        'address': 'Querétaro, México',
        'email': 'contacto@publicityvisual.com',
        'phone': '+52 442 123 4567',
        'working_hours': 'Lun-Vie 9:00 AM - 6:00 PM'
    }
    
    # Configuración de SEO
    META_DESCRIPTION = "Publicity Visual - Medio de Prensa Digital Independiente con noticias de última hora en Querétaro y México."
    META_KEYWORDS = "noticias, Querétaro, México, periodismo digital, noticias en tiempo real"
    
    # Configuración de caché
    CACHE_TYPE = 'redis'
    CACHE_REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    CACHE_DEFAULT_TIMEOUT = 300  # 5 minutos

# Configuración de desarrollo
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = True
    TEMPLATES_AUTO_RELOAD = True

# Configuración de producción
class ProductionConfig(Config):
    DEBUG = False
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Configuración de seguridad adicional para producción
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = 'DENY'

# Configuración de pruebas
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False

# Seleccionar configuración según el entorno
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
