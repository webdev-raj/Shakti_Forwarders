// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navigation a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroAbout = document.querySelector('.hero-about');

    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);

    // Add fade-in animation for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effect for logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add typing effect to hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const text = heroTagline.textContent;
        heroTagline.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Add click effect to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add gradient text effect to main heading
    const mainHeading = document.querySelector('.hero h1');
    if (mainHeading) {
        mainHeading.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 0.5s ease-in-out';
        });
    }
});