# Script de despliegue manual a Firebase
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PUBLICITY VISUAL - DESPLIEGUE MANUAL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar build
Write-Host "[1] Compilando proyecto..." -ForegroundColor Yellow
npm run build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Falló el build" -ForegroundColor Red
    exit 1
}
Write-Host "  OK - Build exitoso" -ForegroundColor Green

# Verificar dist
if (-not (Test-Path "dist\index.html")) {
    Write-Host "ERROR: No se encontró dist/index.html" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2] Verificando Firebase CLI..." -ForegroundColor Yellow
$firebase = Get-Command firebase -ErrorAction SilentlyContinue
if (-not $firebase) {
    Write-Host "  Instalando Firebase CLI..." -ForegroundColor Gray
    npm install -g firebase-tools 2>&1 | Out-Null
}
Write-Host "  OK - Firebase CLI listo" -ForegroundColor Green

Write-Host ""
Write-Host "[3] Configuración de despliegue:" -ForegroundColor Yellow
Write-Host "  Proyecto: publicity-visual-1a5a0" -ForegroundColor White
Write-Host "  URL: https://publicity-visual-1a5a0.web.app" -ForegroundColor White
Write-Host ""

Write-Host "[4] INSTRUCCIONES PARA DESPLEGAR:" -ForegroundColor Green
Write-Host ""
Write-Host "  Opción A - Despliegue manual:" -ForegroundColor Cyan
Write-Host "    1. Ejecuta: firebase login" -ForegroundColor White
Write-Host "    2. Ejecuta: firebase deploy" -ForegroundColor White
Write-Host ""
Write-Host "  Opción B - Configurar GitHub Actions:" -ForegroundColor Cyan
Write-Host "    1. Ve a: https://console.firebase.google.com/project/publicity-visual-1a5a0/settings/serviceaccounts/adminsdk" -ForegroundColor White
Write-Host "    2. Click 'Generate new private key'" -ForegroundColor White
Write-Host "    3. Copia el JSON y guárdalo" -ForegroundColor White
Write-Host "    4. Ve a GitHub: https://github.com/Publicityvisual/publicityvisual/settings/secrets/actions" -ForegroundColor White
Write-Host "    5. Crea secret: FIREBASE_SERVICE_ACCOUNT_PUBLICITY_VISUAL_1A5A0" -ForegroundColor White
Write-Host "    6. Pega el contenido del JSON" -ForegroundColor White
Write-Host "    7. Push a main y se despliega automático" -ForegroundColor White
Write-Host ""

Write-Host "[5] Archivos listos para despliegue:" -ForegroundColor Yellow
Get-ChildItem dist | Select-Object -First 10 | ForEach-Object {
    $size = if ($_.PSIsContainer) { "[DIR]" } else { "$([math]::Round($_.Length/1KB, 2)) KB" }
    Write-Host "  $size - $($_.Name)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  EJECUTA: firebase deploy" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
