// ============ LOADING SCREEN ============
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.loader-wrapper');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = html.getAttribute('data-theme') === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
}

// ============ HERO SLIDER ============
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide change
setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        showSlide(currentSlide);
    });
});

// ============ NAVIGATION ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
    
    updateActiveSection();
    handleScrollReveal();
});

function updateActiveSection() {
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
            navItems.forEach(item => item.classList.remove('active'));
            if (navItems[index]) {
                navItems[index].classList.add('active');
            }
        }
    });
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ SCROLL REVEAL ============
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('visible');
        }
    });
}

// Initial check
handleScrollReveal();

// ============ COUNTER ANIMATION ============
const experienceNumber = document.querySelector('.experience-number');

function animateCounter() {
    if (!experienceNumber || experienceNumber.dataset.animated) return;
    
    const target = parseInt(experienceNumber.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    experienceNumber.dataset.animated = 'true';
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            experienceNumber.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            experienceNumber.textContent = target;
        }
    };
    
    updateCounter();
}

const aboutSection = document.getElementById('about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        const formData = { name, email, phone, message };
        console.log('Form submitted:', formData);
        
        showNotification('Your message has been sent successfully! We will contact you within 24 hours.', 'success');
        contactForm.reset();
    });
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// ============ PRODUCT CARD HOVER ============
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const btn = this.querySelector('.btn-product');
        if (btn) {
            btn.style.background = 'var(--primary-dark)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const btn = this.querySelector('.btn-product');
        if (btn) {
            btn.style.background = 'var(--primary)';
        }
    });
});

// ============ GALLERY LIGHTBOX ============
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const title = this.querySelector('h4').textContent;
        const desc = this.querySelector('p').textContent;
        
        // Simple lightbox effect
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        lightbox.innerHTML = `
            <img src="${imgSrc}" style="max-width: 90%; max-height: 70vh; border-radius: 20px;">
            <h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">${title}</h3>
            <p style="color: #ccc; margin-top: 0.5rem;">${desc}</p>
        `;
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
        
        document.body.appendChild(lightbox);
    });
});

// ============ NEWSLETTER FORM ============
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value.trim();
        
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        }
    });
}

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('div[style*="position: fixed"][style*="background: rgba(0,0,0,0.9)"]');
        if (lightbox) {
            lightbox.remove();
        }
    }
});

// ============ INITIALIZE ============
console.log('🎨 GilAM Factory - Premium Website Launched Successfully!');
console.log('🌐 Visit us: www.gilam.uz');
console.log('📞 Contact: +998 71 123-45-67');
console.log('🌙 Dark mode supported');
console.log('📱 Fully responsive design');