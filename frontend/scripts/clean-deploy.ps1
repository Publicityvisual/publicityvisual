# Publicity Visual: Zero-Downtime Clean Deployment Script
# Este script asegura que no queden restos de caché antiguos (como el texto "Reset")

Write-Host "🚀 Iniciando limpieza profunda de Publicity Visual..." -ForegroundColor Cyan

# 1. Borrar carpetas de caché y build
$folders = @(".next", "out", "node_modules/.cache")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "🗑️ Borrando $folder..." -ForegroundColor Yellow
        Remove-Item -Path $folder -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# 2. Reinstalar dependencias (opcional, pero ayuda si hay errores extraños)
# Write-Host "📦 Verificando dependencias..." -ForegroundColor Cyan
# npm install

# 3. Construir el proyecto
Write-Host "🏗️ Construyendo aplicación (Next.js 15)..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en la construcción. Despliegue cancelado." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 4. Desplegar a Firebase
Write-Host "🌐 Desplegando en la nube..." -ForegroundColor Cyan
npx firebase deploy --only hosting --non-interactive --project gen-lang-client-0045400907

Write-Host "✅ ¡Publicity Visual está actualizado y libre de caché!" -ForegroundColor Green
