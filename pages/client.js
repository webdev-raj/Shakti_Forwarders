// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate client logos
document.querySelectorAll('.client-logo').forEach((logo, index) => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(20px)';
    logo.style.transition = `all 0.5s ease ${index * 0.2}s`;
    observer.observe(logo);
});

// Active navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact form animation (if added later)
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.3
});

// Add parallax effect to hero backgrounds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const mission = document.querySelector('.mission-section');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (mission) {
        const missionTop = mission.offsetTop;
        const missionScroll = scrolled - missionTop;
        if (missionScroll > -500 && missionScroll < 500) {
            mission.style.transform = `translateY(${missionScroll * 0.3}px)`;
        }
    }
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click animation for client logos
document.querySelectorAll('.client-logo').forEach(logo => {
    logo.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});