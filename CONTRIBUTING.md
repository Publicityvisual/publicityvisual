# Guía de Contribución

¡Gracias por tu interés en contribuir a Publicity Visual! Valoramos mucho tu tiempo y esfuerzo. Por favor, tómate un momento para revisar estas pautas antes de enviar tu contribución.

## Cómo Contribuir

### 1. Reportar Errores

Si encuentras un error o comportamiento inesperado:

1. Verifica si ya existe un reporte similar en [Issues](https://github.com/tu-usuario/publicity-visual/issues)
2. Si no existe, crea un nuevo issue con:
   - Un título claro y descriptivo
   - Pasos para reproducir el problema
   - Comportamiento esperado vs. comportamiento actual
   - Capturas de pantalla si es relevante
   - Versión del navegador/sistema operativo

### 2. Solicitar Características

¿Tienes una idea para mejorar Publicity Visual?

1. Verifica si ya existe una solicitud similar
2. Crea un nuevo issue con:
   - Descripción detallada de la característica
   - Casos de uso
   - Beneficios esperados
   - Posibles implementaciones (si aplica)

### 3. Contribuir con Código

#### Configuración del Entorno

1. Haz un fork del repositorio
2. Clona tu fork localmente:
   ```bash
   git clone https://github.com/tu-usuario/publicity-visual.git
   cd publicity-visual
   ```
3. Configura el entorno de desarrollo:
   ```bash
   # En Windows
   .\init.ps1
   
   # En Linux/Mac
   chmod +x init.sh
   ./init.sh
   ```

#### Flujo de Trabajo

1. Crea una rama para tu característica/corrección:
   ```bash
   git checkout -b feature/nombre-de-la-caracteristica
   # o
   git checkout -b fix/descripcion-del-fix
   ```

2. Realiza tus cambios siguiendo las guías de estilo

3. Asegúrate de que los tests pasen:
   ```bash
   pytest
   ```

4. Actualiza la documentación si es necesario

5. Haz commit de tus cambios con mensajes descriptivos:
   ```bash
   git commit -m "feat: agregar nueva característica de búsqueda"
   # o
   git commit -m "fix: corregir error en el procesamiento de imágenes"
   ```

6. Haz push a tu fork:
   ```bash
   git push origin tu-rama
   ```

7. Abre un Pull Request (PR) a la rama `main`

### 4. Revisión de Código

- Los PRs deben ser revisados por al menos un mantenedor
- Se pueden solicitar cambios antes de hacer merge
- Los tests deben pasar antes de que se apruebe el PR

## Guía de Estilo

### Código Python

- Sigue PEP 8
- Usa type hints
- Documenta funciones y clases con docstrings
- Mantén las líneas a un máximo de 88 caracteres
- Usa comillas dobles para strings

### JavaScript/TypeScript

- Sigue el estilo de Airbnb
- Usa ES6+ features
- Usa async/await en lugar de callbacks cuando sea posible
- Documenta funciones complejas

### HTML/CSS

- Usa HTML5 semántico
- Sigue las convenciones de BEM para CSS
- Usa variables CSS para colores y tamaños
- Mantén el CSS modular

## Estructura del Proyecto

```
publicity-visual/
├── media/               # Archivos multimedia procesados
├── templates/           # Plantillas HTML
├── nginx/              # Configuración de Nginx
├── .github/            # Configuración de GitHub
│   └── workflows/      # GitHub Actions
├── tests/              # Pruebas automatizadas
├── .env.example        # Variables de entorno de ejemplo
├── .gitignore          # Archivos ignorados por Git
├── docker-compose.yml   # Configuración de Docker Compose
├── init.ps1            # Script de inicialización (Windows)
├── init.sh             # Script de inicialización (Linux/Mac)
├── LICENSE             # Licencia del proyecto
├── main.py             # Aplicación principal
├── media_processor.py  # Procesamiento de imágenes/videos
├── news_fetcher.py     # Obtención de noticias
├── README.md           # Documentación principal
└── requirements.txt    # Dependencias de Python
```

## Reporte de Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor repórtala de manera responsable:

1. No crees un issue público
2. Envía un correo a seguridad@publicityvisual.com con los detalles
3. Incluye "[SEGURIDAD]" en el asunto
4. Proporciona pasos para reproducir la vulnerabilidad

## Preguntas Frecuentes

### ¿Cómo puedo empezar a contribuir?

Revisa los issues etiquetados como "good first issue" o "help wanted". Son excelentes puntos de partida para nuevos contribuidores.

### ¿Qué hago si necesito ayuda?

Puedes:
1. Revisar la documentación
2. Buscar en los issues existentes
3. Abrir un nuevo issue con tus preguntas

### ¿Con qué frecuencia se revisan los PRs?

Intentamos revisar los PRs en un plazo de 1-2 días laborables. Si tu PR no ha recibido atención después de este tiempo, no dudes en mencionar a un mantenedor.

## Agradecimientos

¡Gracias a todos los que han contribuido a hacer de Publicity Visual un proyecto mejor! Tu ayuda es muy valorada.

---

*Última actualización: Junio 2025*
