
let lastScroll = 0;
const body = document.body;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    // At the very top of the page
    body.classList.remove("scroll-up", "scroll-down");
  }
  else if (currentScroll > lastScroll) {
    // Scrolling down
    body.classList.add("scroll-down");
    body.classList.remove("scroll-up");
  }
  else if (currentScroll < lastScroll) {
    // Scrolling up
    body.classList.add("scroll-up");
    body.classList.remove("scroll-down");
  }

  lastScroll = currentScroll;
});
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector("#bottom-header nav");

  // Services Dropdown Enhancement
  const servicesDropdowns = document.querySelectorAll('.services-dropdown');
  servicesDropdowns.forEach(function (servicesDropdown) {
    const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
      let hideTimeout;
      servicesDropdown.addEventListener('mouseenter', function () {
        clearTimeout(hideTimeout);
        dropdownContent.style.opacity = '1';
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.pointerEvents = 'auto';
      });
      servicesDropdown.addEventListener('mouseleave', function () {
        hideTimeout = setTimeout(function () {
          dropdownContent.style.opacity = '0';
          dropdownContent.style.visibility = 'hidden';
          dropdownContent.style.pointerEvents = 'none';
        }, 100);
      });
      const servicesTrigger = servicesDropdown.querySelector('.services-trigger');
      if (servicesTrigger) {
        servicesTrigger.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
          }
        });
      }
    }
  });

  menuIcon.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
  // GSAP + ScrollTrigger animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // Respect user's reduced motion preference

    // Default ease
    gsap.defaults({ ease: "power2.out" });

    // Initialize Swiper for hero (if available)
    if (window.Swiper) {
      const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        speed: 900,
        pagination: {
          el: '.hero .swiper-pagination',
          clickable: true
        },
        // navigation: {
        //   nextEl: '.hero .swiper-button-next',
        //   prevEl: '.hero .swiper-button-prev'
        // }
      });

      // Different texts per slide
      const heroCaptions = [
        {
          title: 'Shakti Forwarders',
          subtitle: 'Cost effective, secure, timely solutions for all shipments'
        },
        {
          title: 'Air & Sea Freight Experts',
          subtitle: 'Reliable global shipping with end-to-end visibility'
        }
      ];

      function setHeroCaption(index) {
        const h1 = document.querySelector('.hero-titles h1');
        const p = document.querySelector('.hero-titles p');
        if (!h1 || !p) return;
        const cap = heroCaptions[index % heroCaptions.length];
        // Fade out then in for smoother swap
        gsap.to([h1, p], { opacity: 0, duration: 0.2, onComplete: () => {
          h1.textContent = cap.title;
          p.textContent = cap.subtitle;
          gsap.fromTo([h1, p], { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 });
        }});
      }

      // Initialize caption and update on slide change
      setHeroCaption(heroSwiper.realIndex || 0);
      heroSwiper.on('slideChangeTransitionStart', () => {
        setHeroCaption(heroSwiper.realIndex || 0);
      });
    }
    gsap.from("#logo",{
      y:"-10%",
      duration:1,
      opacity:0,
    })
    gsap.from("nav h2",{
      y:"-100%",
      duration:1,
      opacity:0,
      stagger:0.4
    })
    // Hero intro (plays even if user doesn't scroll)
    const heroTl = gsap.timeline();
    heroTl
      .from(".hero-titles h1", { y: 40, opacity: 0, duration: 0.9 })
      .from(".hero-titles p", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4");

    // Gentle parallax on hero titles while scrolling
    gsap.to(".hero-titles", {
      yPercent: -10,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // About section content
    gsap.from(".about h1, .about p, .about button", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".about-container",
        start: "top 75%",
        once: true
      }
    });

    // About cards
    gsap.from(".card-container .card", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".card-container",
        start: "top 80%",
        once: true
      }
    });

    // Background quote band parallax
    gsap.to(".backkground", {
      yPercent: -10,
      scrollTrigger: {
        trigger: ".backkground",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Services heading
    gsap.from(".services-section h2", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 85%",
        once: true
      }
    });

    // Services cards grid
    gsap.from(".services-grid .service-card", {
      opacity: 0,
      y: 40,
      duration: 0.5,
      stagger: {
        each: 0.1,
        from: "start"
      },
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 80%",
        once: true
      }
    });

    // Footer reveal
    gsap.from(".footer", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        once: true
      }
    });

    // Ensure triggers are correct after images/fonts load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }
});