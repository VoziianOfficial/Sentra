"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        initContactHeroMotion();
        initMapMotion();
        initSectionReveal();
        initImageFallbacks();
    }

    function initContactHeroMotion() {
        const hero = document.querySelector(".contact-hero");

        if (!hero || prefersReducedMotion()) return;

        const radar = hero.querySelector(".contact-hero__radar");
        const crosshair = hero.querySelector(".contact-hero__crosshair");
        const panel = hero.querySelector(".contact-hero__panel");
        const dots = hero.querySelectorAll(".contact-hero__dot");

        let ticking = false;

        const update = () => {
            const progress = clamp(window.scrollY / (hero.offsetHeight || 1), 0, 1);

            if (radar) {
                radar.style.transform = `translate3d(0, ${progress * 34}px, 0) rotate(${progress * 30}deg)`;
            }

            if (crosshair) {
                crosshair.style.transform = `translate3d(${progress * -18}px, ${progress * -22}px, 0)`;
            }

            if (panel) {
                panel.style.transform = `translate3d(0, ${progress * 18}px, 0)`;
            }

            dots.forEach((dot, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                dot.style.transform = `translate3d(${direction * progress * 16}px, ${progress * 18}px, 0)`;
            });

            ticking = false;
        };

        const requestUpdate = () => {
            if (ticking) return;

            ticking = true;
            window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", requestUpdate, { passive: true });
    }

    function initMapMotion() {
        const map = document.querySelector(".security-map");

        if (!map || prefersReducedMotion()) return;

        const pin = map.querySelector(".security-map__pin");
        const route = map.querySelector(".security-map__route");
        const rings = map.querySelectorAll(".security-map__ring");
        const nodes = map.querySelectorAll(".security-map__node");

        if (pin) {
            pin.style.animation = "securityMapPinPulse 2.8s ease-in-out infinite";
        }

        if (route) {
            route.style.animation = "securityMapRoute 5.4s ease-in-out infinite";
        }

        rings.forEach((ring, index) => {
            ring.style.animation = `securityMapRing ${index === 0 ? "4.8s" : "6.2s"} ease-in-out infinite`;
            ring.style.animationDelay = `${index * 0.35}s`;
        });

        nodes.forEach((node, index) => {
            node.style.animation = "securityMapNode 3.6s ease-in-out infinite";
            node.style.animationDelay = `${index * 0.42}s`;
        });

        injectMapMotionStyles();
    }

    function injectMapMotionStyles() {
        if (document.getElementById("contactMapMotionStyles")) return;

        const style = document.createElement("style");
        style.id = "contactMapMotionStyles";
        style.textContent = `
      @keyframes securityMapPinPulse {
        0%, 100% {
          box-shadow:
            0 0 0 10px rgba(245, 197, 66, 0.12),
            0 0 32px rgba(245, 197, 66, 0.36);
        }

        50% {
          box-shadow:
            0 0 0 16px rgba(245, 197, 66, 0.04),
            0 0 42px rgba(245, 197, 66, 0.46);
        }
      }

      @keyframes securityMapRoute {
        0%, 100% {
          opacity: 0.55;
          filter: brightness(1);
        }

        50% {
          opacity: 1;
          filter: brightness(1.2);
        }
      }

      @keyframes securityMapRing {
        0%, 100% {
          opacity: 0.42;
          transform: translate(-50%, -50%) scale(1);
        }

        50% {
          opacity: 0.82;
          transform: translate(-50%, -50%) scale(1.04);
        }
      }

      @keyframes securityMapNode {
        0%, 100% {
          opacity: 0.58;
        }

        50% {
          opacity: 1;
        }
      }
    `;

        document.head.appendChild(style);
    }

    function initSectionReveal() {
        const sections = document.querySelectorAll(
            ".contact-form-section, .quick-contact, .service-area-map, .contact-faq"
        );

        if (!sections.length) return;

        sections.forEach((section) => {
            section.classList.add("contact-reveal");
        });

        if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
            sections.forEach((section) => {
                section.classList.add("is-visible");
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                rootMargin: "0px 0px -12% 0px",
                threshold: 0.12
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        injectRevealStyles();
    }

    function injectRevealStyles() {
        if (document.getElementById("contactRevealStyles")) return;

        const style = document.createElement("style");
        style.id = "contactRevealStyles";
        style.textContent = `
      .contact-reveal {
        opacity: 0;
        transform: translateY(18px);
        transition:
          opacity 700ms ease,
          transform 700ms ease;
      }

      .contact-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;

        document.head.appendChild(style);
    }

    function initImageFallbacks() {
        const images = document.querySelectorAll(".contact-page img");

        images.forEach((image) => {
            if (image.complete && image.naturalWidth === 0) {
                markImageMissing(image);
                return;
            }

            image.addEventListener("error", () => {
                markImageMissing(image);
            });
        });
    }

    function markImageMissing(image) {
        const parent = image.closest(".contact-hero__bg");

        if (parent) {
            parent.classList.add("is-image-missing");
        }

        image.style.display = "none";
    }

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
})();