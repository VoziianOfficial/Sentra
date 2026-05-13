"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initServicesPage);

    function initServicesPage() {
        initServicesHeroMotion();
        initCtaMotion();
        initSectionReveal();
        initImageFallbacks();
    }

    function initServicesHeroMotion() {
        const hero = document.querySelector(".services-hero");

        if (!hero || prefersReducedMotion()) return;

        const radar = hero.querySelector(".services-hero__radar");
        const crosshair = hero.querySelector(".services-hero__crosshair");
        const dots = hero.querySelectorAll(".services-hero__dot");
        const panel = hero.querySelector(".services-hero__panel");

        let ticking = false;

        const update = () => {
            const progress = clamp(window.scrollY / (hero.offsetHeight || 1), 0, 1);

            if (radar) {
                radar.style.transform = `translate3d(0, ${progress * 32}px, 0) rotate(${progress * 28}deg)`;
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

    function initCtaMotion() {
        const cta = document.querySelector(".services-cta");

        if (!cta || prefersReducedMotion()) return;

        const radar = cta.querySelector(".services-cta__radar");
        const media = cta.querySelector(".services-cta__media");

        let ticking = false;

        const update = () => {
            const rect = cta.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);

            if (radar) {
                radar.style.transform = `rotate(${progress * 60}deg)`;
            }

            if (media) {
                media.style.transform = `translate3d(0, ${progress * -10}px, 0)`;
            }

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

    function initSectionReveal() {
        const sections = document.querySelectorAll(
            ".service-index, .services-ticker-section, .matching-logic, .services-cta"
        );

        if (!sections.length) return;

        sections.forEach((section) => {
            section.classList.add("services-reveal");
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
        if (document.getElementById("servicesRevealStyles")) return;

        const style = document.createElement("style");
        style.id = "servicesRevealStyles";
        style.textContent = `
      .services-reveal {
        opacity: 0;
        transform: translateY(18px);
        transition:
          opacity 700ms ease,
          transform 700ms ease;
      }

      .services-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;

        document.head.appendChild(style);
    }

    function initImageFallbacks() {
        const images = document.querySelectorAll(".services-page img");

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
        const parent = image.closest(
            ".photo-card, .services-hero__bg, .services-cta__media"
        );

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