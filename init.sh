#!/bin/bash

# Script de inicialización para Publicity Visual
# Este script configura el entorno de desarrollo

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

# Función para imprimir advertencias
print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar si se está ejecutando como root
if [ "$EUID" -eq 0 ]; then 
    print_warning "No se recomienda ejecutar este script como root"
    read -p "¿Desea continuar de todos modos? [s/N] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

# Verificar si se tiene curl instalado
if ! command -v curl &> /dev/null; then
    print_message "Instalando curl..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y curl
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install curl
    else
        print_warning "No se pudo instalar curl automáticamente. Por favor, instálalo manualmente."
        exit 1
    fi
fi

# Verificar si se tiene Python instalado
if ! command -v python3 &> /dev/null; then
    print_message "Python 3 no está instalado. Por favor, instálalo desde https://www.python.org/downloads/"
    exit 1
fi

# Verificar la versión de Python
PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
if [[ "$PYTHON_VERSION" < "3.8" ]]; then
    print_warning "Se requiere Python 3.8 o superior. Versión actual: $PYTHON_VERSION"
    exit 1
fi

# Verificar si se tiene pip instalado
if ! command -v pip3 &> /dev/null; then
    print_message "Instalando pip..."
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py
    rm get-pip.py
fi

# Crear y activar entorno virtual
if [ ! -d "venv" ]; then
    print_message "Creando entorno virtual..."
    python3 -m venv venv
fi

print_message "Activando entorno virtual..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Actualizar pip
print_message "Actualizando pip..."
pip install --upgrade pip

# Instalar dependencias
print_message "Instalando dependencias de Python..."
pip install -r requirements.txt

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    print_message "Creando archivo .env..."
    cp .env.example .env
    print_warning "Por favor, configura las variables de entorno en el archivo .env"
else
    print_message "El archivo .env ya existe. Verifica que las configuraciones sean correctas."
fi

# Crear directorios necesarios
print_message "Creando directorios necesarios..."
mkdir -p media cache logs

# Instalar FFmpeg si no está instalado
if ! command -v ffmpeg &> /dev/null; then
    print_warning "FFmpeg no está instalado. Es necesario para el procesamiento de videos."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_message "Instalando FFmpeg..."
        sudo apt-get update && sudo apt-get install -y ffmpeg
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        print_message "Instalando FFmpeg con Homebrew..."
        brew install ffmpeg
    else
        print_warning "Por favor, instala FFmpeg manualmente desde https://ffmpeg.org/download.html"
    fi
fi

# Instalar Redis si no está instalado
if ! command -v redis-cli &> /dev/null; then
    print_warning "Redis no está instalado. Es necesario para el caché."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_message "Instalando Redis..."
        sudo apt-get update && sudo apt-get install -y redis-server
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        print_message "Instalando Redis con Homebrew..."
        brew install redis
    else
        print_warning "Por favor, instala Redis manualmente desde https://redis.io/download"
    fi
fi

# Verificar si se tiene Docker instalado (opcional)
if ! command -v docker &> /dev/null; then
    print_warning "Docker no está instalado. Es opcional pero recomendado para despliegue."
    print_message "Puedes instalarlo desde https://docs.docker.com/get-docker/"
fi

# Mensaje final
print_message "¡Configuración completada!"
echo -e "\nPara iniciar el servidor de desarrollo, ejecuta:\n"
echo -e "  source venv/bin/activate  # En Linux/Mac"
echo -e "  .\\venv\\Scripts\\activate  # En Windows"
echo -e "  uvicorn main:app --reload\n"
echo -e "La aplicación estará disponible en: ${GREEN}http://localhost:8000${NC}\n"

# Preguntar si se desea iniciar el servidor ahora
read -p "¿Deseas iniciar el servidor ahora? [s/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    uvicorn main:app --reload
fi
