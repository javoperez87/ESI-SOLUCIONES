// ESI Web - JavaScript Principal
// Funcionalidades: Navegación móvil, scroll suave, animaciones, formularios

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initHeaderScroll();
    initTypingEffect();
    initCounterAnimation();
});

// =====================================================
// NAVEGACIÓN MÓVIL
// =====================================================
function initMobileNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu && navMenu) {
        // Toggle del menú móvil
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// =====================================================
// SCROLL SUAVE Y NAVEGACIÓN ACTIVA
// =====================================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Actualizar enlace activo basado en la posición del scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// =====================================================
// ANIMACIONES EN SCROLL
// =====================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // Animación especial para las tarjetas de servicios
                if (entry.target.classList.contains('service-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                // Animación especial para elementos del portafolio
                if (entry.target.classList.contains('portfolio-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-form, .stat');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// =====================================================
// EFECTOS DEL HEADER EN SCROLL
// =====================================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Cambiar opacidad del header basado en el scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Ocultar/mostrar header en scroll (opcional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// =====================================================
// EFECTO DE ESCRITURA EN EL HERO
// =====================================================
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    const words = ['Desarrollo Web', 'Apps Móviles', 'Software Personalizado', 'el Futuro Digital'];
    let wordIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let speed = 150;

    function typeEffect() {
        const fullWord = `Desarrollamos ${words[wordIndex]}`;
        
        if (isDeleting) {
            currentText = fullWord.substring(0, currentText.length - 1);
            speed = 75;
        } else {
            currentText = fullWord.substring(0, currentText.length + 1);
            speed = 150;
        }

        heroTitle.textContent = currentText;

        if (!isDeleting && currentText === fullWord) {
            speed = 2000; // Pausa al completar la palabra
            isDeleting = true;
        } else if (isDeleting && currentText === 'Desarrollamos ') {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 200;
        }

        setTimeout(typeEffect, speed);
    }

    // Iniciar el efecto después de un breve delay
    setTimeout(typeEffect, 1000);
}

// =====================================================
// ANIMACIÓN DE CONTADORES
// =====================================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const counterOptions = {
        threshold: 0.7,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = target / 100;
                const duration = 2000; // 2 segundos
                const stepTime = duration / 100;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, stepTime);
                
                counterObserver.unobserve(counter);
            }
        });
    }, counterOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =====================================================
// FORMULARIO DE CONTACTO
// =====================================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validar formulario
        if (validateForm(data)) {
            // Simular envío del formulario
            submitForm(data);
        }
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// =====================================================
// VALIDACIÓN DE FORMULARIO
// =====================================================
function validateForm(data) {
    let isValid = true;
    const form = document.getElementById('contactForm');

    // Limpiar errores previos
    clearFormErrors(form);

    // Validar nombre
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Por favor ingresa un email válido');
        isValid = false;
    }

    // Validar asunto
    if (!data.subject || data.subject.trim().length < 3) {
        showFieldError('subject', 'El asunto debe tener al menos 3 caracteres');
        isValid = false;
    }

    // Validar mensaje
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
        case 'text':
            if (field.name === 'name' && value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            } else if (field.name === 'subject' && value.length < 3) {
                errorMessage = 'El asunto debe tener al menos 3 caracteres';
                isValid = false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor ingresa un email válido';
                isValid = false;
            }
            break;
        default:
            if (field.tagName === 'TEXTAREA' && value.length < 10) {
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                isValid = false;
            }
    }

    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        removeFieldError(field.name);
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        showFieldError(field.name, errorMessage);
    }

    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    
    // Remover error anterior si existe
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Agregar nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    field.classList.add('error');
}

function removeFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearFormErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    const errorFields = form.querySelectorAll('.error');
    
    errorMessages.forEach(error => error.remove());
    errorFields.forEach(field => field.classList.remove('error'));
}

// =====================================================
// ENVÍO DE FORMULARIO
// =====================================================
function submitForm(data) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Mostrar estado de carga
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    // Simular envío (aquí integrarías con tu backend)
    setTimeout(() => {
        // Simular respuesta exitosa
        showFormSuccess();
        
        // Resetear formulario
        document.getElementById('contactForm').reset();
        clearFormErrors(document.getElementById('contactForm'));
        
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        console.log('Datos del formulario:', data);
    }, 2000);
}

function showFormSuccess() {
    // Crear mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-notification';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje enviado correctamente!</h3>
            <p>Nos pondremos en contacto contigo pronto.</p>
        </div>
    `;
    
    // Estilos para el mensaje de éxito
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 350px;
    `;
    
    document.body.appendChild(successMessage);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 5000);
}

// =====================================================
// UTILIDADES ADICIONALES
// =====================================================

// Función para lazy loading de imágenes (si las agregas)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Función para manejar el theme toggle (si quieres agregar modo oscuro)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Función para mostrar tooltips personalizados
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 100);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            }, { once: true });
        });
    });
}

// Agregar estilos CSS para las animaciones de notificación
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .success-content {
        text-align: center;
    }
    
    .success-content i {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .success-content h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    }
    
    .success-content p {
        margin: 0;
        opacity: 0.9;
        font-size: 0.9rem;
    }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Función para mostrar el progreso de scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #06b6d4);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Inicializar funcionalidades adicionales si es necesario
// initLazyLoading();
// initThemeToggle();
// initTooltips();
initScrollProgress();