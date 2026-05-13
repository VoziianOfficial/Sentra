"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initLegalPage);

    function initLegalPage() {
        initLegalHeroMotion();
        initLegalReveal();
        initActiveLegalLinks();
    }

    function initLegalHeroMotion() {
        const hero = document.querySelector(".legal-hero");

        if (!hero || prefersReducedMotion()) return;

        const radar = hero.querySelector(".legal-hero__radar");
        const dot = hero.querySelector(".legal-hero__dot");
        const meta = hero.querySelector(".legal-hero__meta");

        let ticking = false;

        const update = () => {
            const progress = clamp(window.scrollY / (hero.offsetHeight || 1), 0, 1);

            if (radar) {
                radar.style.transform = `translate3d(0, ${progress * 22}px, 0) rotate(${progress * 34}deg)`;
            }

            if (dot) {
                dot.style.transform = `translate3d(${progress * -14}px, ${progress * 14}px, 0)`;
            }

            if (meta) {
                meta.style.transform = `translate3d(0, ${progress * 8}px, 0)`;
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

    function initLegalReveal() {
        const sections = document.querySelectorAll(
            ".legal-content-section, .legal-contact-strip, .legal-policy-nav"
        );

        if (!sections.length) return;

        sections.forEach((section) => {
            section.classList.add("legal-reveal");
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
        if (document.getElementById("legalRevealStyles")) return;

        const style = document.createElement("style");
        style.id = "legalRevealStyles";
        style.textContent = `
            .legal-reveal {
                opacity: 0;
                transform: translateY(18px);
                transition:
                    opacity 700ms ease,
                    transform 700ms ease;
            }

            .legal-reveal.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;

        document.head.appendChild(style);
    }

    function initActiveLegalLinks() {
        const currentPage = getCurrentPage();

        document
            .querySelectorAll(
                ".legal-sidebar__nav a, .legal-policy-card, .site-footer__links a, .mobile-menu__legal a"
            )
            .forEach((link) => {
                const href = link.getAttribute("href");

                if (!href) return;

                const linkPage = normalizePath(href);
                const isActive = linkPage === currentPage;

                link.classList.toggle("is-active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
    }

    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split("/").pop();

        return page || "index.html";
    }

    function normalizePath(path) {
        const cleanPath = String(path || "").split("#")[0].split("?")[0];

        if (!cleanPath || cleanPath === "/") return "index.html";

        return cleanPath.split("/").pop() || "index.html";
    }

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
})();