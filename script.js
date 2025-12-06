/**
 * Trust Hospital & Diagnostic - Main Script
 * Production-ready JavaScript for website interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // ELEMENTS
  // =========================================
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobileToggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const statNumbers = document.querySelectorAll(".stat-number");

  // =========================================
  // PRELOADER
  // =========================================
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  });

  // =========================================
  // STICKY HEADER
  // =========================================
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Show/hide back to top button
    if (currentScroll > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);

  // =========================================
  // MOBILE MENU TOGGLE
  // =========================================
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      navbar.classList.toggle("active");
      document.body.style.overflow = navbar.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        mobileToggle.classList.remove("active");
        navbar.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // =========================================
  // ACTIVE NAV LINK ON SCROLL
  // =========================================
  const sections = document.querySelectorAll("section[id]");

  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
  };

  window.addEventListener("scroll", highlightNavLink);

  // =========================================
  // SMOOTH SCROLLING
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // =========================================
  // BACK TO TOP
  // =========================================
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // =========================================
  // COUNTER ANIMATION
  // =========================================
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  // =========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // =========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  // Observer for fade animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(".fade-up, .fade-in");
  animatedElements.forEach((el) => fadeObserver.observe(el));

  // Observer for counter animation
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe stat numbers
  statNumbers.forEach((stat) => counterObserver.observe(stat));

  // =========================================
  // SERVICE CARDS HOVER EFFECT
  // =========================================
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // =========================================
  // DOCTOR CARDS HOVER EFFECT
  // =========================================
  const doctorCards = document.querySelectorAll(".doctor-card");
  doctorCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(-10px)";
      } else {
        this.style.transform = "scale(1.05) translateY(-10px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(0)";
      } else {
        this.style.transform = "scale(1.05)";
      }
    });
  });

  // =========================================
  // FEATURE CARDS ENTRANCE ANIMATION
  // =========================================
  const featureCards = document.querySelectorAll(".feature-card");
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("appear");
          }, index * 100);
          featureObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  featureCards.forEach((card) => featureObserver.observe(card));

  // =========================================
  // PARALLAX EFFECT ON HERO
  // =========================================
  const heroSection = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg img");

  if (heroSection && heroBg) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroHeight = heroSection.offsetHeight;

      if (scrolled < heroHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // =========================================
  // TYPING EFFECT FOR HERO TITLE (Optional)
  // =========================================
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.style.opacity = "1";
  }

  // =========================================
  // FORM VALIDATION (For future use)
  // =========================================
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\d\s\-+()]{10,}$/;
    return re.test(phone);
  };

  // =========================================
  // LAZY LOADING IMAGES
  // =========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // =========================================
  // ACCESSIBILITY IMPROVEMENTS
  // =========================================
  // Handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Close mobile menu on Escape
    if (e.key === "Escape" && navbar.classList.contains("active")) {
      mobileToggle.classList.remove("active");
      navbar.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Focus trap for mobile menu
  const focusableElements = navbar.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  // =========================================
  // SMOOTH REVEAL ON PAGE LOAD
  // =========================================
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);

  // =========================================
  // CONSOLE MESSAGE
  // =========================================
  console.log(
    "%c Trust Hospital & Diagnostic ",
    "background: linear-gradient(135deg, #0077b6, #20c997); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;"
  );
  console.log("Website developed with ❤️ for better healthcare.");
});

// =========================================
// UTILITY FUNCTIONS
// =========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
