// Simple scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const framerElements = document.querySelectorAll(".framer-element");
  const header = document.getElementById("main-header");

  // Header scroll effect - transparent when at top (guarded)
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // Initialize header state
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    }
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  // Set initial state and observe elements
  framerElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Smooth scrolling for navigation links (guard target existence)
  document.querySelectorAll("nav a, .footer-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // WhatsApp booking button functionality (guarded)
  const whatsappBtn = document.getElementById("whatsapp-book-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
      // Replace with your actual WhatsApp number and message
      const phoneNumber = "27686451330"; // Replace with your number
      const message =
        "Hello! I would like to book an appointment with MacMatlox Studio.";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappURL, "_blank");
    });
  }

  // Service card animations
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// --- JAVASCRIPT FOR SCROLL TRIGGER (Conceptual) ---

// To see the two pillars (01 and 02) swap places, you would need to toggle
// the 'slide-right' class on the 'servicesWrapper' element.

// This is a manual example to demonstrate the sliding effect:
const wrapper = document.getElementById("servicesWrapper");
let isSlid = true; // Start showing Pillar 2, as per the initial combined screenshot

function toggleSlide() {
  if (!wrapper) return; // guard if element missing
  if (isSlid) {
    // Shows Pillar 1 (Talent Management)
    wrapper.classList.remove("slide-right");
  } else {
    // Shows Pillar 2 (Digital Solutions Division)
    wrapper.classList.add("slide-right");
  }
  isSlid = !isSlid;
}

// Add a click event to the main section to see the sliding effect:
// document.querySelector('.what-we-do-section').addEventListener('click', toggleSlide);

// For actual "scroll down" triggering, you would replace the click event
// with an Intersection Observer that monitors scroll position.

// Fixed JavaScript for What We Do Section
document.addEventListener("DOMContentLoaded", function () {
  // 1. Fix for "What We Do" section sliding
  const sectionToObserve = document.querySelector(".what-we-do-section");
  const servicesWrapper = document.getElementById("servicesWrapper");

  if (sectionToObserve && servicesWrapper) {
    const observerOptions = {
      root: null,
      rootMargin: "10px",
      threshold: 0.5, 
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the section comes into view (scrolling down to it)
          // SLIDE RIGHT: Show Pillar 2 (Digital Solutions)
          servicesWrapper.classList.add("slide-right");
        } else {
          // When the section leaves the view (scrolling away from it)
          // SLIDE BACK: Show Pillar 1 (Talent)
          servicesWrapper.classList.remove("slide-right");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(sectionToObserve);
  }

  // 3. Fixed JavaScript for Design Section
  const designSection = document.getElementById("designServices");
  if (designSection) {
    const menuSlides = designSection.querySelectorAll(".menu-slide-word");
    const dynamicBox = document.getElementById("dynamicBox");

    // Content definitions for each service
    const contentMap = {
      "New Branch": `
                    <div class="graphic-image-placeholder" style="background-image: url('assets/WhatsApp Image 2025-12-08 at 09.02.03_d3fb4980.jpg'); background-size: cover; background-position: center;">
                    

                        <h3>New Branch</h3>
                        <p>Introducing our new branch offering comprehensive digital solutions including photography, graphic design, and printing services.</p>
                    </div>
                `,
      "Photography Special": `
                    <div class="graphic-image-placeholder" style="background-image: url('assets/WhatsApp Image 2025-12-02 at 12.18.04_2be999dc.jpg'); background-size: cover; background-position: center;">
                        <h3>Photography Special</h3>
                        <p>Professional photography services for models, brands, and products. Studio and on-location shoots available.</p>
                    </div>
                `,
      "Graphic Design": `
                    <div class="graphic-image-placeholder" style="background-image: url('assets/IMG-20251208-WA0019.jpg'); background-size: cover; background-position: center;">
                        <h3>Graphic Design</h3>
                        <p>Creative graphic design solutions for logos, branding, social media, and marketing materials.</p>
                    </div>
                `,
      "Printing & Branding": `
                    <div class="graphic-image-placeholder" style="background-image: url('assets/IMG-20251208-WA0023.jpg'); background-size: cover; background-position: center;">
                        <h3>Printing & Branding</h3>
                        <p>Complete branding solutions including business cards, banners, merchandise, and corporate identity packages.</p>
                    </div>
                `,
      default: `
                    <div class="graphic-image-placeholder" style="background-color: #1a1f26;">
                        <h3>Select a Service</h3>
                        <p>Choose a service from the menu above to see details.</p>
                    </div>
                `,
    };

    // Function to update active slide
    function updateActiveSlide(index) {
      // Remove active class from all slides
      menuSlides.forEach((slide) => {
        slide.classList.remove("active");
        const loadingLine = slide.querySelector(".loading-line");
        if (loadingLine) loadingLine.style.width = "0";
      });

      // Add active class to current slide and its duplicate
      if (index < 4) {
        menuSlides[index].classList.add("active");
        menuSlides[index + 4].classList.add("active");

        // Animate loading lines
        const loadingLine1 = menuSlides[index].querySelector(".loading-line");
        const loadingLine2 =
          menuSlides[index + 4].querySelector(".loading-line");
        if (loadingLine1) loadingLine1.style.width = "100%";
        if (loadingLine2) loadingLine2.style.width = "100%";

        // Update content
        const service = menuSlides[index].getAttribute("data-service");
        if (contentMap[service]) {
          dynamicBox.innerHTML = contentMap[service];
        } else {
          dynamicBox.innerHTML = contentMap["default"];
        }
      }
    }

    // Manual click functionality
    menuSlides.forEach((slide) => {
      slide.addEventListener("click", function () {
        const service = this.getAttribute("data-service");
        const index = parseInt(this.getAttribute("data-index"));

        // Stop auto-slide temporarily
        clearInterval(autoSlideInterval);

        // Update active slide
        updateActiveSlide(index % 4);

        // Restart auto-slide after 10 seconds
        setTimeout(() => {
          startAutoSlide();
        }, 10000);
      });
    });

    // Auto-slide functionality
    let currentActiveIndex = 0;
    let autoSlideInterval;

    function startAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);

      autoSlideInterval = setInterval(() => {
        currentActiveIndex = (currentActiveIndex + 1) % 4;
        updateActiveSlide(currentActiveIndex);
      }, 5000); // Change every 5 seconds
    }

    // Initialize
    updateActiveSlide(0);
    startAutoSlide();

    // 4. Video autoplay fix for mobile
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
      heroVideo.addEventListener("loadeddata", function () {
        this.play().catch((e) => {
          console.log("Autoplay prevented, waiting for user interaction");
        });
      });

      // Try to play on user interaction
      document.addEventListener(
        "click",
        function playVideoOnce() {
          if (heroVideo.paused) {
            heroVideo.play().catch((e) => {
              console.log("Could not play video:", e);
            });
          }
          document.removeEventListener("click", playVideoOnce);
        },
        { once: true }
      );
    }
  }

  // 5. Smooth scrolling for navigation links
  document.querySelectorAll("nav a, .footer-links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // 6. Header scroll effect
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(26, 31, 38, 0.95)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.backgroundColor = "transparent";
        header.style.backdropFilter = "none";
      }
    });
  }
});

// Consolidated inline script: Projects animation and parallax
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const cards = document.querySelectorAll(".card5");
    const container = document.querySelector(".container4");

    if (cards.length && container) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Start animation when section enters viewport
              let scrollPosition = 0;

              function animateOnScroll() {
                if (!entry.isIntersecting) return;

                const rect = container.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Calculate how much of the section is visible
                const visiblePercentage = Math.max(
                  0,
                  Math.min(
                    100,
                    ((viewportHeight - rect.top) / viewportHeight) * 100
                  )
                );

                // Animate each card
                cards.forEach((card, index) => {
                  const offset = visiblePercentage * 2.1 + index * 15;
                  card.style.transform = `translateX(${offset}px)`;
                });

                requestAnimationFrame(animateOnScroll);
              }

              animateOnScroll();
            } else {
              // Reset when section leaves viewport
              cards.forEach((card) => {
                card.style.transform = "translateX(0)";
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(container);
    }
  }, 300);
});

// Parallax / floating images scroll handler (guarded)
(function () {
  const title = document.getElementById("title");
  const cta = document.getElementById("ctaBtn");
  const images = document.querySelectorAll(".bg-floating-img");

  if (title || cta || images.length) {
    window.addEventListener("scroll", () => {
      let scrollPos = window.scrollY;

      if (title) title.style.transform = `translateY(${scrollPos * -0.12}px)`;
      if (cta) cta.style.transform = `translateY(${scrollPos * -0.18}px)`;

      images.forEach((img, index) => {
        let direction = index % 2 === 0 ? 1 : -1;
        img.style.transform = `translateY(${scrollPos * 0.25 * direction}px)`;
      });
    });
  }
})();
