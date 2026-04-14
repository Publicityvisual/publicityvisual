# 🔥 DESPLIEGUE AUTOMÁTICO - GUÍA COMPLETA

## URL del Proyecto
- **Sitio Web**: https://publicity-visual-1a5a0.firebaseapp.com
- **Repositorio**: https://github.com/Publicityvisual/publicityvisual
- **Firebase Project**: publicity-visual-1a5a0

---

## 🚀 Opción 1: Despliegue Manual (Inmediato)

### Paso 1: Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### Paso 2: Login en Firebase
```bash
firebase login
```
(Se abrirá navegador para autenticar)

### Paso 3: Seleccionar Proyecto
```bash
firebase use publicity-visual-1a5a0
```

### Paso 4: Desplegar
```bash
firebase deploy
```

**Listo!** El sitio estará en: https://publicity-visual-1a5a0.web.app

---

## 🤖 Opción 2: GitHub Actions (100% Automático)

Para que cada push a `main` despliegue automáticamente:

### Paso 1: Obtener Service Account

1. Ve a: https://console.firebase.google.com/project/publicity-visual-1a5a0/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. Se descarga un archivo `.json` (guárdalo seguro)

### Paso 2: Agregar a GitHub Secrets

1. Ve a: https://github.com/Publicityvisual/publicityvisual/settings/secrets/actions
2. Click **"New repository secret"**
3. 
   - **Name**: `FIREBASE_SERVICE_ACCOUNT_PUBLICITY_VISUAL_1A5A0`
   - **Value**: Copia TODO el contenido del archivo `.json` descargado
4. Click **"Add secret"**

### Paso 3: Push a main

```bash
git add .
git commit -m "Trigger deployment"
git push origin main
```

GitHub Actions automáticamente:
1. Instala dependencias
2. Compila el proyecto
3. Despliega a Firebase

**Ver estado**: https://github.com/Publicityvisual/publicityvisual/actions

---

## 📊 Estado Actual

- ✅ Proyecto creado (React + Vite + TypeScript)
- ✅ Build funciona correctamente
- ✅ Repo en GitHub configurado
- ✅ GitHub Actions workflow creado
- ⚠️ **PENDIENTE**: Service Account en GitHub Secrets
- ⚠️ **PENDIENTE**: Primer despliegue

---

## 🔧 Troubleshooting

### Error: "Site Not Found"
El proyecto no ha sido desplegado aún. Sigue Opción 1 o 2 arriba.

### Error: "Permission denied"
Verifica que tienes acceso al proyecto Firebase `publicity-visual-1a5a0`

### Error en GitHub Actions
1. Ve a: https://github.com/Publicityvisual/publicityvisual/actions
2. Revisa el error del workflow
3. Normalmente falta el Service Account o está mal configurado

---

## 📱 Características del Sitio

- ✅ Diseño profesional tipo medio de prensa
- ✅ 6 noticias de ejemplo generadas por IA
- ✅ Categorías: Tecnología, Música, Entretenimiento, Actualidad
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Newsletter subscription
- ✅ Tendencias / Trending
- ✅ Footer con redes sociales

---

## 🎨 Personalización

Edita estos archivos para personalizar:

- `src/App.tsx` - Contenido y noticias
- `src/index.css` - Colores y estilos
- `tailwind.config.js` - Configuración Tailwind

Colores actuales:
- Primary: Azul `#3b82f6` (brand-600)
- Background: Gris `#f9fafb`
- Texto: Gris oscuro `#111827`

---

## 🚀 Próximos Pasos Sugeridos

1. [ ] Desplegar sitio (manual o automático)
2. [ ] Conectar dominio personalizado
3. [ ] Integrar API de noticias reales
4. [ ] Agregar autenticación de usuarios
5. [ ] Panel de admin para gestionar noticias
6. [ ] Integrar GPT-4 para generar contenido automático

---

**¿Necesitas ayuda con algún paso?**
