// ============ LOADING SCREEN ============
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.loader-wrapper');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved theme
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
    if (html.getAttribute('data-theme') === 'dark') {
        icon.className = 'bi bi-sun-fill';
    } else {
        icon.className = 'bi bi-moon-stars-fill';
    }
}

// ============ NAVIGATION ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');

// Scroll effects
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar background
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Active section
    updateActiveSection();
});

// Active section update
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

// Mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============ COUNTER ANIMATION ============
const experienceNumber = document.querySelector('.experience-number');

function animateCounter() {
    const target = parseInt(experienceNumber.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
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

// Intersection Observer for counter
const aboutSection = document.getElementById('about');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounter();
            counterAnimated = true;
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
        
        // Validation
        if (!name || !email) {
            showNotification("Iltimos, ism va email maydonlarini to'ldiring!", 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification("Iltimos, to'g'ri email manzil kiriting!", 'error');
            return;
        }
        
        // Simulate sending
        const formData = { name, email, phone, message };
        console.log('Form submitted:', formData);
        
        showNotification("Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.", 'success');
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
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
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
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============ PRODUCT CARD ANIMATION ============
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.btn-product').style.background = 'var(--primary)';
        this.querySelector('.btn-product').style.color = 'white';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.btn-product').style.background = 'transparent';
        this.querySelector('.btn-product').style.color = 'var(--primary)';
    });
});

// ============ NEWSLETTER FORM ============
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value.trim();
        
        if (email) {
            showNotification("Obuna bo'lganingiz uchun rahmat!", 'success');
            this.reset();
        }
    });
}

// ============ INITIALIZE ============
console.log('🎨 GilAM Zavodi - Premium veb-sayt muvaffaqiyatli ishga tushdi!');
console.log('🌙 Dark mode qo\'llab-quvvatlanadi');
console.log('📱 To\'liq responsive dizayn');