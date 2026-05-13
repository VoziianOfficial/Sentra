"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        initServiceHeroMotion();
        initOverviewMotion();
        initQuoteMotion();
        initSectionReveal();
        initImageFallbacks();
    }

    function initServiceHeroMotion() {
        const hero = document.querySelector(".service-hero");

        if (!hero || prefersReducedMotion()) return;

        const radar = hero.querySelector(".service-hero__radar");
        const crosshair = hero.querySelector(".service-hero__crosshair");
        const panel = hero.querySelector(".service-hero__panel");
        const dots = hero.querySelectorAll(".service-hero__dot");

        let ticking = false;

        const update = () => {
            const progress = clamp(window.scrollY / (hero.offsetHeight || 1), 0, 1);

            if (radar) {
                radar.style.transform = `translate3d(0, ${progress * 30}px, 0) rotate(${progress * 30}deg)`;
            }

            if (crosshair) {
                crosshair.style.transform = `translate3d(${progress * -18}px, ${progress * -22}px, 0)`;
            }

            if (panel) {
                panel.style.transform = `translate3d(0, ${progress * 10}px, 0)`;
            }

            dots.forEach((dot, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                dot.style.transform = `translate3d(${direction * progress * 14}px, ${progress * 16}px, 0)`;
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

    function initOverviewMotion() {
        const section = document.querySelector(".service-overview");

        if (!section || prefersReducedMotion()) return;

        const media = section.querySelector(".service-overview__media");
        const target = section.querySelector(".service-overview__target");

        let ticking = false;

        const update = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);

            if (media) {
                media.style.transform = `translate3d(0, ${progress * -12}px, 0)`;
            }

            if (target) {
                target.style.transform = `translate3d(0, ${progress * -22}px, 0) rotate(${progress * 18}deg)`;
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

    function initQuoteMotion() {
        const quote = document.querySelector(".service-quote");

        if (!quote || prefersReducedMotion()) return;

        const radar = quote.querySelector(".service-quote__radar");

        let ticking = false;

        const update = () => {
            const rect = quote.getBoundingClientRect();
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

    function initSectionReveal() {
        const sections = document.querySelectorAll(
            ".service-overview, .provider-fit, .related-services, .service-quote"
        );

        if (!sections.length) return;

        sections.forEach((section) => {
            section.classList.add("service-reveal");
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
        if (document.getElementById("serviceRevealStyles")) return;

        const style = document.createElement("style");
        style.id = "serviceRevealStyles";
        style.textContent = `
            .service-reveal {
                opacity: 0;
                transform: translateY(18px);
                transition:
                    opacity 700ms ease,
                    transform 700ms ease;
            }

            .service-reveal.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;

        document.head.appendChild(style);
    }

    function initImageFallbacks() {
        const images = document.querySelectorAll(".service-detail-page img");

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
            ".service-hero__bg, .service-overview__media, .photo-card"
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