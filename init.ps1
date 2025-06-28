# Script de inicialización para Publicity Visual en Windows
# Este script configura el entorno de desarrollo en Windows

# Colores para la salida
$Green = @{
    ForegroundColor = 'Green'
}

$Yellow = @{
    ForegroundColor = 'Yellow'
}

# Función para imprimir mensajes
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" @Green
}

# Función para imprimir advertencias
function Write-WarningMsg {
    param([string]$Message)
    Write-Host "[WARNING] $Message" @Yellow
}

# Verificar si se está ejecutando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    Write-WarningMsg "No se recomienda ejecutar este script como administrador"
    $continue = Read-Host "¿Desea continuar de todos modos? [s/N]"
    if ($continue -ne 's' -and $continue -ne 'S') {
        exit 1
    }
}

# Verificar si se tiene Python instalado
$python = Get-Command python -ErrorAction SilentlyContinue

if (-not $python) {
    $python = Get-Command python3 -ErrorAction SilentlyContinue
}

if (-not $python) {
    Write-WarningMsg "Python no está instalado o no está en el PATH"
    $installPython = Read-Host "¿Desea abrir la página de descarga de Python? [s/N]"
    if ($installPython -eq 's' -or $installPython -eq 'S') {
        Start-Process "https://www.python.org/downloads/"
    }
    exit 1
}

# Verificar la versión de Python
$pythonVersion = & $python.Source --version 2>&1 | Select-String -Pattern "Python (\d+\.\d+)" | ForEach-Object { $_.Matches.Groups[1].Value }

if ([version]$pythonVersion -lt [version]"3.8") {
    Write-WarningMsg "Se requiere Python 3.8 o superior. Versión actual: $pythonVersion"
    exit 1
}

Write-Info "Python $pythonVersion detectado"

# Verificar si se tiene pip instalado
$pip = Get-Command pip -ErrorAction SilentlyContinue

if (-not $pip) {
    $pip = Get-Command pip3 -ErrorAction SilentlyContinue
}

if (-not $pip) {
    Write-Info "Instalando pip..."
    $webClient = New-Object System.Net.WebClient
    $url = "https://bootstrap.pypa.io/get-pip.py"
    $getPipPath = "$env:TEMP\get-pip.py"
    $webClient.DownloadFile($url, $getPipPath)
    & $python.Source $getPipPath
    Remove-Item $getPipPath -Force
    
    # Actualizar PATH para incluir pip
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    $pip = Get-Command pip -ErrorAction SilentlyContinue
    
    if (-not $pip) {
        Write-WarningMsg "No se pudo instalar pip. Por favor, instálalo manualmente."
        exit 1
    }
}

# Crear y activar entorno virtual
if (-not (Test-Path "venv")) {
    Write-Info "Creando entorno virtual..."
    & $python.Source -m venv venv
}

Write-Info "Activando entorno virtual..."
& ".\venv\Scripts\Activate.ps1"

# Actualizar pip
Write-Info "Actualizando pip..."
python -m pip install --upgrade pip

# Instalar dependencias
Write-Info "Instalando dependencias de Python..."
pip install -r requirements.txt

# Crear archivo .env si no existe
if (-not (Test-Path ".env")) {
    Write-Info "Creando archivo .env..."
    Copy-Item ".env.example" -Destination ".env" -Force
    Write-WarningMsg "Por favor, configura las variables de entorno en el archivo .env"
} else {
    Write-Info "El archivo .env ya existe. Verifica que las configuraciones sean correctas."
}

# Crear directorios necesarios
Write-Info "Creando directorios necesarios..."
@("media", "cache", "logs") | ForEach-Object {
    if (-not (Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ | Out-Null
    }
}

# Verificar si se tiene FFmpeg instalado
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpeg) {
    Write-WarningMsg "FFmpeg no está instalado. Es necesario para el procesamiento de videos."
    $installFfmpeg = Read-Host "¿Desea descargar FFmpeg? [s/N]"
    if ($installFfmpeg -eq 's' -or $installFfmpeg -eq 'S') {
        Start-Process "https://ffmpeg.org/download.html"
    }
}

# Verificar si se tiene Docker instalado (opcional)
$docker = Get-Command docker -ErrorAction SilentlyContinue

if (-not $docker) {
    Write-WarningMsg "Docker no está instalado. Es opcional pero recomendado para despliegue."
    $installDocker = Read-Host "¿Desea abrir la página de descarga de Docker Desktop? [s/N]"
    if ($installDocker -eq 's' -or $installDocker -eq 'S') {
        Start-Process "https://www.docker.com/products/docker-desktop/"
    }
}

# Mensaje final
Write-Info "¡Configuración completada!"
Write-Host "`nPara iniciar el servidor de desarrollo, ejecuta:`" -NoNewline
Write-Host "`n`n  .\venv\Scripts\Activate.ps1" @Green
Write-Host "  uvicorn main:app --reload --port 8080`n" @Green
Write-Host "La aplicación estará disponible en: " -NoNewline
Write-Host "http://localhost:8080`n" @Green

# Preguntar si se desea iniciar el servidor ahora
$startServer = Read-Host "¿Deseas iniciar el servidor ahora? [s/N]"
if ($startServer -eq 's' -or $startServer -eq 'S') {
    uvicorn main:app --reload --port 8080
}
