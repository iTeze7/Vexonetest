/* ===== VEXONE Building Solutions — Main Script ===== */

(function () {
  "use strict";

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".header__nav");
  const headerCta = document.querySelector(".header__cta");

  menuToggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    headerCta?.classList.toggle("open");
  });

  // Close mobile menu on nav link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      headerCta?.classList.remove("open");
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ===== HERO SLIDESHOW =====
  const slides = document.querySelectorAll(".hero__slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);

  indicators.forEach((btn) => {
    btn.addEventListener("click", () => {
      goToSlide(parseInt(btn.dataset.index, 10));
    });
  });

  // ===== ANIMATED COUNTERS =====
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 16);

        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // For about-cards, also trigger bar animation
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== SECTION DIVIDERS =====
  const dividers = document.querySelectorAll(".section-divider");
  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          dividerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  dividers.forEach((d) => dividerObserver.observe(d));

  // ===== STEP ICONS SCALE-IN =====
  const stepIcons = document.querySelectorAll(".step__icon");
  const iconObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          iconObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  stepIcons.forEach((icon) => iconObserver.observe(icon));

  // ===== STEPS PROGRESS LINE =====
  const stepsProgress = document.getElementById("stepsProgress");
  if (stepsProgress) {
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stepsProgress.classList.add("visible");
            progressObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    progressObserver.observe(stepsProgress.parentElement);
  }

  // ===== ABOUT CARDS BAR ANIMATION =====
  const aboutCards = document.querySelectorAll(".about-card");
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  aboutCards.forEach((card) => cardObserver.observe(card));

  // ===== WHATSAPP FLOAT ENTRANCE =====
  const waFloat = document.querySelector(".whatsapp-float");
  if (waFloat) {
    setTimeout(() => waFloat.classList.add("visible"), 1500);
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const message = document.getElementById("contactMessage").value;
    const url = `https://wa.me/5500000000000?text=${encodeURIComponent(
      `Olá, meu nome é ${name}. ${message}`
    )}`;
    window.open(url, "_blank");
    contactForm.reset();
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
