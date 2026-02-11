# PV Purge Script - Reclaim local memory
# This script removes heavy build artifacts that are already safe on GitHub/Firebase

Write-Host "🚀 Iniciando purga de memoria local..." -ForegroundColor Cyan

$folders = @(".next", "out", ".turbo", "dist", "build")

foreach ($f in $folders) {
    if (Test-Path "frontend/$f") {
        Write-Host "🗑️ Eliminando frontend/$f..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force "frontend/$f"
    }
}

# Clear npm cache optionally
# Write-Host "🧹 Limpiando caché de npm..." -ForegroundColor Cyan
# npm cache clean --force

Write-Host "✨ ¡Memoria local liberada! El proyecto está a salvo en GitHub y Firebase." -ForegroundColor Green
