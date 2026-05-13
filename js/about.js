"use strict";

/* ==========================================================
   Sentra — About Page Script
   Handles:
   - subtle hero motion
   - platform media motion
   - CTA radar motion
   - section reveal
   - image fallback classes
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        initAboutHeroMotion();
        initPlatformMediaMotion();
        initCtaMotion();
        initSectionReveal();
        initImageFallbacks();
    }

    /* ==========================================================
       HERO MOTION
       ========================================================== */

    function initAboutHeroMotion() {
        const hero = document.querySelector(".about-hero");

        if (!hero || prefersReducedMotion()) return;

        const radar = hero.querySelector(".about-hero__radar");
        const crosshair = hero.querySelector(".about-hero__crosshair");
        const notice = hero.querySelector(".about-hero__notice");
        const dots = hero.querySelectorAll(".about-hero__dot");

        let ticking = false;

        const update = () => {
            const progress = clamp(window.scrollY / (hero.offsetHeight || 1), 0, 1);

            if (radar) {
                radar.style.transform = `translate3d(0, ${progress * 34}px, 0) rotate(${progress * 32}deg)`;
            }

            if (crosshair) {
                crosshair.style.transform = `translate3d(${progress * -18}px, ${progress * -24}px, 0)`;
            }

            if (notice) {
                notice.style.transform = `translate3d(0, ${progress * 18}px, 0)`;
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

    /* ==========================================================
       PLATFORM MEDIA MOTION
       ========================================================== */

    function initPlatformMediaMotion() {
        const section = document.querySelector(".platform-model");

        if (!section || prefersReducedMotion()) return;

        const media = section.querySelector(".platform-model__media");
        const target = section.querySelector(".platform-model__target");

        let ticking = false;

        const update = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);

            if (media) {
                media.style.transform = `translate3d(0, ${progress * -14}px, 0)`;
            }

            if (target) {
                target.style.transform = `translate3d(0, ${progress * -24}px, 0) rotate(${progress * 18}deg)`;
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

    /* ==========================================================
       CTA MOTION
       ========================================================== */

    function initCtaMotion() {
        const cta = document.querySelector(".about-cta");

        if (!cta || prefersReducedMotion()) return;

        const radar = cta.querySelector(".about-cta__radar");

        let ticking = false;

        const update = () => {
            const rect = cta.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);

            if (radar) {
                radar.style.transform = `rotate(${progress * 64}deg)`;
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

    /* ==========================================================
       SECTION REVEAL
       ========================================================== */

    function initSectionReveal() {
        const sections = document.querySelectorAll(
            ".platform-model, .platform-help, .trust-strip, .about-cta"
        );

        if (!sections.length) return;

        sections.forEach((section) => {
            section.classList.add("about-reveal");
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
        if (document.getElementById("aboutRevealStyles")) return;

        const style = document.createElement("style");
        style.id = "aboutRevealStyles";
        style.textContent = `
      .about-reveal {
        opacity: 0;
        transform: translateY(18px);
        transition:
          opacity 700ms ease,
          transform 700ms ease;
      }

      .about-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;

        document.head.appendChild(style);
    }

    /* ==========================================================
       IMAGE FALLBACKS
       ========================================================== */

    function initImageFallbacks() {
        const images = document.querySelectorAll(".about-page img");

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
        const parent = image.closest(".about-hero__bg, .platform-model__media");

        if (parent) {
            parent.classList.add("is-image-missing");
        }

        image.style.display = "none";
    }

    /* ==========================================================
       HELPERS
       ========================================================== */

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
})();