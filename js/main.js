// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar la fecha actual
    updateCurrentDate();
    
    // Inicializar el menú móvil
    initMobileMenu();
    
    // Inicializar el botón de ir arriba
    initBackToTop();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar el reproductor de video
    initVideoPlayer();
    
    // Inicializar el carrusel de noticias
    initNewsCarousel();
});

// Función para actualizar la fecha actual
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'America/Mexico_City'
        };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('es-MX', options);
    }
}

// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Función para inicializar el botón de ir arriba
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        // Mostrar/ocultar el botón al hacer scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Desplazamiento suave al hacer clic
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Función para inicializar animaciones al hacer scroll
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.news-card, .category-card, .featured-news, .latest-news, .featured-categories, .newsletter');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Función para inicializar el reproductor de video
function initVideoPlayer() {
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        const playButton = player.querySelector('.play-button');
        
        if (video && playButton) {
            playButton.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.style.display = 'none';
                } else {
                    video.pause();
                    this.style.display = 'flex';
                }
            });
            
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });
            
            video.addEventListener('ended', function() {
                playButton.style.display = 'flex';
            });
        }
    });
}

// Función para inicializar el carrusel de noticias
function initNewsCarousel() {
    const carousels = document.querySelectorAll('.news-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const items = Array.from(track.children);
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        if (items.length === 0) return;
        
        // Configurar el ancho del track
        const itemWidth = items[0].getBoundingClientRect().width;
        track.style.width = `${itemWidth * items.length}px`;
        
        // Crear indicadores de puntos
        if (dotsContainer) {
            items.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('data-index', index);
                dotsContainer.appendChild(dot);
            });
            
            const dots = Array.from(dotsContainer.children);
            
            // Actualizar puntos activos
            const updateDots = (currentIndex) => {
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };
            
            // Navegación por puntos
            dotsContainer.addEventListener('click', e => {
                const dot = e.target.closest('.carousel-dot');
                if (!dot) return;
                
                const index = parseInt(dot.getAttribute('data-index'));
                updateCarousel(index);
                updateDots(index);
            });
        }
        
        let currentIndex = 0;
        
        // Función para actualizar el carrusel
        const updateCarousel = (newIndex) => {
            if (newIndex < 0) newIndex = items.length - 1;
            if (newIndex >= items.length) newIndex = 0;
            
            currentIndex = newIndex;
            track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
            
            if (dotsContainer) {
                updateDots(currentIndex);
            }
        };
        
        // Navegación con botones
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateCarousel(currentIndex - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateCarousel(currentIndex + 1);
            });
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                updateCarousel(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                updateCarousel(currentIndex + 1);
            }
        });
        
        // Navegación táctil
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Deslizamiento a la izquierda
                updateCarousel(currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Deslizamiento a la derecha
                updateCarousel(currentIndex - 1);
            }
        };
    });
}

// Cargar noticias de Publicity Visual
async function loadLatestNews() {
    try {
        const newsContainer = document.querySelector('.news-grid');
        if (!newsContainer) return;
        
        // Mostrar indicador de carga
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading';
        loadingIndicator.innerHTML = '<div class="spinner"></div><p>Cargando las últimas noticias de Publicity Visual...</p>';
        newsContainer.appendChild(loadingIndicator);
        
        // Simular retardo de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Noticias destacadas de Publicity Visual
        const mockNews = [
            {
                title: 'Publicity Visual lanza su nueva plataforma digital',
                excerpt: 'Descubre todas las mejoras y nuevas funcionalidades de nuestra renovada plataforma de noticias.',
                category: 'Actualidad',
                image: 'images/noticia1.jpg',
                date: 'Hoy',
                author: 'Equipo Publicity Visual',
                url: 'noticia-lanzamiento-plataforma.html'
            },
            {
                title: 'Nuevo equipo de periodistas se une a Publicity Visual',
                excerpt: 'Conoce a los nuevos talentos que se suman a nuestra redacción para ofrecerte la mejor cobertura informativa.',
                category: 'Equipo',
                image: 'images/noticia2.jpg',
                date: 'Ayer',
                author: 'Recursos Humanos',
                url: 'noticia-nuevo-equipo.html'
            },
            {
                title: 'Publicity Visual obtiene reconocimiento a la excelencia periodística',
                excerpt: 'Nuestro medio ha sido galardonado por su compromiso con la información veraz y de calidad.',
                category: 'Logros',
                image: 'images/noticia3.jpg',
                date: 'Hace 2 días',
                author: 'Comité Editorial',
                url: 'noticia-reconocimiento.html'
            },
            {
                title: 'Nuevo formato de noticias en video',
                excerpt: 'Estrenamos una nueva sección de noticias en video con lo más relevante de la actualidad.',
                category: 'Novedades',
                image: 'images/noticia4.jpg',
                date: 'Hace 3 días',
                author: 'Departamento de Medios',
                url: 'noticia-videos.html'
            }
        ];
        
        // Limpiar indicador de carga
        newsContainer.removeChild(loadingIndicator);
        
        // Agregar noticias al DOM
        mockNews.forEach(news => {
            const article = document.createElement('article');
            article.className = 'news-card fade-in';
            article.innerHTML = `
                <div class="card-image">
                    <img src="${news.image}" alt="${news.title}">
                    <span class="category">${news.category}</span>
                </div>
                <div class="card-content">
                    <h3><a href="${news.url || '#'}" class="news-title">${news.title}</a></h3>
                    <p class="excerpt">${news.excerpt}</p>
                    <div class="meta">
                        <span class="author"><i class="far fa-user"></i> ${news.author}</span>
                        <span class="date"><i class="far fa-clock"></i> ${news.date}</span>
                        ${news.category ? `<span class="category-tag">${news.category}</span>` : ''}
                    </div>
                </div>
            `;
            
            newsContainer.appendChild(article);
        });
        
    } catch (error) {
        console.error('Error al cargar noticias:', error);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = 'No se pudieron cargar las noticias. Por favor, inténtalo de nuevo más tarde.';
        document.querySelector('.latest-news .container').appendChild(errorElement);
    }
}

// Cargar noticias cuando sea necesario
const loadMoreBtn = document.querySelector('.load-more .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadLatestNews();
    });
}

// Inicializar formularios
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                // Validación de email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (isValid) {
                // Aquí iría el envío del formulario
                console.log('Formulario enviado:', new FormData(form));
                
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
                form.appendChild(successMessage);
                
                // Limpiar formulario después de 3 segundos
                setTimeout(() => {
                    form.reset();
                    successMessage.remove();
                }, 3000);
            }
        });
    });
}

// Inicializar tooltips
function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        element.appendChild(tooltip);
        
        // Posicionar tooltip
        element.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.classList.add('visible');
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
        });
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initForms();
    initTooltips();
    
    // Cargar noticias al final de la página
    if (document.querySelector('.load-more')) {
        loadLatestNews();
    }
});
