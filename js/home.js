"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        initHeroParallax();
        initStatusLabelMotion();
        initSectionReveal();
        initImageFallbacks();
    }

    function initHeroParallax() {
        const hero = document.querySelector(".home-hero");

        if (!hero || prefersReducedMotion()) return;

        const radar = hero.querySelector(".home-hero__radar");
        const crosshair = hero.querySelector(".home-hero__crosshair");
        const camera = hero.querySelector(".home-hero__camera-wrap");
        const frame = hero.querySelector(".home-hero__frame");
        const dots = hero.querySelectorAll(".home-hero__dot");

        let ticking = false;

        const update = () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight || 1;
            const progress = clamp(scrollY / heroHeight, 0, 1);

            if (radar) {
                radar.style.transform = `translate3d(0, ${progress * 36}px, 0) rotate(${progress * 32}deg)`;
            }

            if (crosshair) {
                crosshair.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
            }

            if (camera) {
                camera.style.transform = `translate3d(0, ${progress * 24}px, 0)`;
            }

            if (frame) {
                frame.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
            }

            dots.forEach((dot, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                dot.style.transform = `translate3d(${direction * progress * 18}px, ${progress * 22}px, 0)`;
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

    function initStatusLabelMotion() {
        const labels = document.querySelectorAll(".home-hero__status");

        if (!labels.length || prefersReducedMotion()) return;

        labels.forEach((label, index) => {
            label.style.animation = `homeStatusFloat ${index === 0 ? "5.6s" : "6.4s"} ease-in-out infinite`;
            label.style.animationDelay = `${index * 0.45}s`;
        });

        injectHomeKeyframes();
    }

    function injectHomeKeyframes() {
        if (document.getElementById("homePageMotionStyles")) return;

        const style = document.createElement("style");
        style.id = "homePageMotionStyles";
        style.textContent = `
      @keyframes homeStatusFloat {
        0%, 100% {
          transform: translate3d(0, 0, 0);
        }

        50% {
          transform: translate3d(0, -8px, 0);
        }
      }
    `;

        document.head.appendChild(style);
    }

    function initSectionReveal() {
        const sections = document.querySelectorAll(
            ".home-services, .home-process, .home-protection, .home-quote"
        );

        if (!sections.length) return;

        sections.forEach((section) => {
            section.classList.add("home-reveal");
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
        if (document.getElementById("homeRevealStyles")) return;

        const style = document.createElement("style");
        style.id = "homeRevealStyles";
        style.textContent = `
      .home-reveal {
        opacity: 0;
        transform: translateY(18px);
        transition:
          opacity 700ms ease,
          transform 700ms ease;
      }

      .home-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;

        document.head.appendChild(style);
    }

    function initImageFallbacks() {
        const images = document.querySelectorAll(".home-page img");

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
        const parent = image.closest(".photo-card, .home-hero__camera-wrap, .protection-panel, .home-hero__bg");

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