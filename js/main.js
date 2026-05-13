"use strict";

(function () {
  const config = window.SITE_CONFIG;

  if (!config) {
    console.error("SITE_CONFIG is missing. Make sure /js/config.js loads before /js/main.js.");
    return;
  }

  document.addEventListener("DOMContentLoaded", initSite);

  function initSite() {
    applyPageMeta();

    renderHeader();
    renderFooter();
    renderSectionNavigation();
    renderServiceCards();
    renderRelatedServices();
    renderFaqBlocks();
    renderFaqSchema();
    renderSecurityTicker();
    renderPolicyBanner();

    injectDynamicContent();
    replaceLegacyContent();
    hydrateSelectOptions();

    window.addEventListener("load", () => {
      injectDynamicContent();
      replaceLegacyContent();
    });

    setTimeout(() => {
      injectDynamicContent();
      replaceLegacyContent();
    }, 300);

    setTimeout(() => {
      injectDynamicContent();
      replaceLegacyContent();
    }, 1000);

    initHeaderScroll();
    initServicesDropdown();
    initMobileMenu();
    initFaqAccordions();
    initForms();
    initSmoothAnchors();
    initActiveSectionNavigation();
    preventEmptyLinks();

    document.documentElement.classList.add("site-ready");
  }

  function applyPageMeta() {
    const page = getCurrentPage();
    const meta = config.pageMeta && config.pageMeta[page];

    if (!meta) {
      console.warn(`No pageMeta found for ${page}`);
      return;
    }

    if (meta.title) {
      document.title = meta.title;
    }

    if (meta.description) {
      let description = document.querySelector('meta[name="description"]');

      if (!description) {
        description = document.createElement("meta");
        description.setAttribute("name", "description");
        document.head.appendChild(description);
      }

      description.setAttribute("content", meta.description);
    }
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");

    if (!mount) return;

    mount.innerHTML = `
      <header class="site-header" data-header>
        <div class="site-header__inner">
          <a class="site-logo" href="index.html" aria-label="${escapeAttr(config.brand.logoLabel)}">
            <span class="site-logo__mark" aria-hidden="true">
              ${getIcon("shield")}
            </span>

            <span class="site-logo__text-wrap">
              <span class="site-logo__text" data-company-name>${escapeHtml(config.brand.logoText || config.companyName)}</span>
              <span class="site-logo__accent">${escapeHtml(config.brand.logoAccent || "CONNECT")}</span>
            </span>
          </a>

          <nav class="site-nav" aria-label="Primary navigation">
            <ul class="site-nav__list">
              ${renderDesktopNavigation()}
            </ul>
          </nav>

          <div class="header-actions">
            <a class="icon-action mobile-phone-quick"
               href="${escapeAttr(config.phoneHref)}"
               aria-label="${escapeAttr(config.phoneLabel)}"
               data-phone-link>
              ${getIcon("phone")}
            </a>

            <a class="icon-action"
               href="${escapeAttr(config.phoneHref)}"
               aria-label="${escapeAttr(config.phoneLabel)}"
               data-phone-link>
              ${getIcon("phone")}
            </a>

            <a class="icon-action"
               href="mailto:${escapeAttr(config.email)}"
               aria-label="Email ${escapeAttr(config.companyName)}"
               data-email-link>
              ${getIcon("mail")}
            </a>

            <a class="btn btn--primary" href="contact.html">Get Matched</a>

            <button class="mobile-menu-toggle"
                    type="button"
                    aria-label="Open menu"
                    aria-controls="mobileMenu"
                    aria-expanded="false"
                    data-mobile-menu-open>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </header>

      ${renderMobileMenu()}
    `;
  }

  function renderDesktopNavigation() {
    const page = getCurrentPage();

    return config.navigation
      .map((item) => {
        const isServicesActive =
          item.hasDropdown &&
          (page === "services.html" || config.services.some((service) => service.href === page));

        const isActive = normalizePath(item.href) === page || isServicesActive;

        if (item.hasDropdown) {
          return `
            <li class="site-nav__item site-nav__item--services" data-services-menu>
              <div class="services-nav-control">
                <a class="site-nav__link site-nav__link--services ${isActive ? "is-active" : ""}"
                   href="${escapeAttr(item.href)}">
                  ${escapeHtml(item.label)}
                </a>

                <button class="dropdown-toggle ${isActive ? "is-active" : ""}"
                        type="button"
                        aria-label="Open services menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        data-services-toggle>
                  <span class="dropdown-toggle__chevron" aria-hidden="true">
                    ${getIcon("chevron-down")}
                  </span>
                </button>
              </div>

              <div class="services-dropdown" data-services-dropdown>
                <div class="services-dropdown__grid">
                  <div class="services-dropdown__links">
                    ${config.services.map(renderDropdownServiceLink).join("")}
                  </div>

                  <div class="services-dropdown__helper">
                    <span class="hud-label hud-label--active">Provider Matching</span>
                    <strong>Need help choosing?</strong>
                    <p>Compare providers by service type, property needs, and local availability.</p>
                    <a class="text-link" href="contact.html">Start matching</a>
                  </div>
                </div>
              </div>
            </li>
          `;
        }

        return `
          <li class="site-nav__item">
            <a class="site-nav__link ${isActive ? "is-active" : ""}"
               href="${escapeAttr(item.href)}">
              ${escapeHtml(item.label)}
            </a>
          </li>
        `;
      })
      .join("");
  }

  function renderDropdownServiceLink(service) {
    return `
      <a class="services-dropdown__link" href="${escapeAttr(service.href)}">
        <span class="services-dropdown__icon" aria-hidden="true">
          ${getIcon(service.icon)}
        </span>

        <span>
          <strong>${escapeHtml(service.title)}</strong>
          <span>${escapeHtml(service.status || service.summary)}</span>
        </span>
      </a>
    `;
  }

  function renderMobileMenu() {
    return `
      <div class="mobile-menu" id="mobileMenu" data-mobile-menu inert>
        <div class="mobile-menu__backdrop" data-mobile-menu-close></div>

        <aside class="mobile-menu__panel" aria-label="Mobile navigation">
          <div class="mobile-menu__top">
            <a class="site-logo" href="index.html" aria-label="${escapeAttr(config.brand.logoLabel)}">
              <span class="site-logo__mark" aria-hidden="true">
                ${getIcon("shield")}
              </span>

              <span class="site-logo__text-wrap">
                <span class="site-logo__text">${escapeHtml(config.brand.logoText || config.companyName)}</span>
                <span class="site-logo__accent">${escapeHtml(config.brand.logoAccent || "CONNECT")}</span>
              </span>
            </a>

            <button class="mobile-menu__close"
                    type="button"
                    aria-label="Close menu"
                    data-mobile-menu-close>
              ${getIcon("x")}
            </button>
          </div>

          <div class="mobile-menu__body">
            <div class="mobile-menu__group">
              <span class="mobile-menu__label">Navigation</span>
              ${config.navigation
        .map((item) => {
          return `
      <a class="mobile-menu__link" href="${escapeAttr(item.href)}">
        ${escapeHtml(item.label)}
      </a>
    `;
        })
        .join("")}
            </div>

            <div class="mobile-menu__group">
              <span class="mobile-menu__label">Security Services</span>
              ${config.services
        .map((service) => {
          return `
                    <a class="mobile-menu__service" href="${escapeAttr(service.href)}">
                      ${escapeHtml(service.title)}
                    </a>
                  `;
        })
        .join("")}
            </div>

            <div class="mobile-menu__group">
              <span class="mobile-menu__label">Contact</span>

              <div class="mobile-menu__contact">
                <a href="${escapeAttr(config.phoneHref)}" data-phone-link>
                  <small>Phone</small>
                  <strong data-phone-text>${escapeHtml(config.phone)}</strong>
                </a>

                <a href="mailto:${escapeAttr(config.email)}" data-email-link>
                  <small>Email</small>
                  <strong data-email-text>${escapeHtml(config.email)}</strong>
                </a>
              </div>
            </div>
          </div>

          <div class="mobile-menu__bottom">
            <a class="btn btn--primary" href="contact.html">Get Matched</a>

            <div class="mobile-menu__legal">
              ${config.legalLinks
        .map((link) => {
          return `<a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a>`;
        })
        .join("")}
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  function initHeaderScroll() {
    const header = document.querySelector("[data-header]");

    if (!header) return;

    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function initServicesDropdown() {
    const menu = document.querySelector("[data-services-menu]");
    const toggle = document.querySelector("[data-services-toggle]");

    if (!menu || !toggle) return;

    let closeTimer;

    const openMenu = () => {
      clearTimeout(closeTimer);
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const delayedClose = () => {
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(closeMenu, 220);
    };

    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      if (menu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.addEventListener("mouseenter", openMenu);
    menu.addEventListener("mouseleave", delayedClose);

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  function initMobileMenu() {
    const menu = document.querySelector("[data-mobile-menu]");
    const openButton = document.querySelector("[data-mobile-menu-open]");
    const closeButtons = document.querySelectorAll("[data-mobile-menu-close]");

    if (!menu || !openButton) return;

    let lastFocusedElement = null;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(",");

    const openMenu = () => {
      lastFocusedElement = document.activeElement;

      document.body.classList.add("menu-open");
      menu.classList.add("is-open");
      menu.removeAttribute("inert");
      openButton.setAttribute("aria-expanded", "true");

      const firstFocusable = menu.querySelector(focusableSelector);
      if (firstFocusable) firstFocusable.focus();
    };

    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      menu.classList.remove("is-open");
      menu.setAttribute("inert", "");
      openButton.setAttribute("aria-expanded", "false");

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    };

    openButton.addEventListener("click", openMenu);

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeMenu);
    });

    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");

      if (link) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!menu.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(menu.querySelectorAll(focusableSelector));

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");

    if (!mount) return;

    mount.innerHTML = `
    <footer class="site-footer">
      <div class="container-wide">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a class="site-logo" href="index.html" aria-label="${escapeAttr(config.brand.logoLabel)}">
              <span class="site-logo__mark" aria-hidden="true">
                ${getIcon("shield")}
              </span>

              <span class="site-logo__text-wrap">
                <span class="site-logo__text" data-company-name>${escapeHtml(config.brand.logoText || config.companyName)}</span>
                <span class="site-logo__accent">${escapeHtml(config.brand.logoAccent || "CONNECT")}</span>
              </span>
            </a>

            <p data-legal-notice>${escapeHtml(config.legalNotice)}</p>
          </div>

          <div class="site-footer__col">
            <h3>Company</h3>
            <ul class="site-footer__links">
              ${config.navigation
        .map((item) => {
          return `<li><a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a></li>`;
        })
        .join("")}
            </ul>
          </div>

          <div class="site-footer__col">
            <h3>Our Services</h3>
            <ul class="site-footer__links">
              ${config.services
        .map((service) => {
          return `<li><a href="${escapeAttr(service.href)}">${escapeHtml(service.title)}</a></li>`;
        })
        .join("")}
            </ul>
          </div>

          <div class="site-footer__col">
            <h3>Contact</h3>
            <ul class="site-footer__contact">
              <li>
                ${getIcon("phone")}
                <a href="${escapeAttr(config.phoneHref)}" data-phone-link data-phone-text>
                  ${escapeHtml(config.phone)}
                </a>
              </li>

              <li>
                ${getIcon("mail")}
                <a href="mailto:${escapeAttr(config.email)}" data-email-link data-email-text>
                  ${escapeHtml(config.email)}
                </a>
              </li>

              <li>
                ${getIcon("map-pin")}
                <span data-address-text>${escapeHtml(config.address.full)}</span>
              </li>

              <li>
                ${getIcon("map-pin")}
                <span data-service-area>${escapeHtml(config.serviceArea)}</span>
              </li>
            </ul>
          </div>

          <div class="site-footer__col">
            <h3>Legal</h3>
            <ul class="site-footer__links">
              ${config.legalLinks
        .map((link) => {
          return `<li><a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a></li>`;
        })
        .join("")}
            </ul>
          </div>
        </div>

        <div class="site-footer__disclaimer" data-disclaimer>
          ${escapeHtml(config.disclaimer)}
        </div>

        <div class="site-footer__bottom">
          <span data-footer-text>${escapeHtml(config.footerText)}</span>
          <span data-company-id>${escapeHtml(config.companyId)}</span>
        </div>
      </div>
    </footer>
  `;
  }

  function injectDynamicContent() {
    setText("[data-company-name]", config.companyName);
    setText("[data-company-id]", config.companyId);
    setText("[data-phone-text]", config.phone);
    setText("[data-email-text]", config.email);
    setText("[data-address-text]", config.address.full);
    setText("[data-footer-text]", config.footerText);
    setText("[data-service-area]", config.serviceArea);
    setText("[data-disclaimer]", config.disclaimer);
    setText("[data-legal-notice]", config.legalNotice);

    document.querySelectorAll("[data-phone-link]").forEach((element) => {
      element.setAttribute("href", config.phoneHref);
      element.setAttribute("aria-label", config.phoneLabel);
    });

    document.querySelectorAll("[data-email-link]").forEach((element) => {
      element.setAttribute("href", `mailto:${config.email}`);
      element.setAttribute("aria-label", `Email ${config.companyName}`);
    });

    document.querySelectorAll("[data-phone-label]").forEach((element) => {
      element.textContent = config.phoneLabel;
    });
  }

  function replaceLegacyContent(options = {}) {
    const legacy = config.legacyContent || {};
    const brand = config.brand || {};
    const address = config.address || {};

    const replacements = [];
    const seen = new Set();

    const currentCompanyName = config.companyName || brand.logoText || brand.shortName || "";
    const currentCompanyId = config.companyId || "";
    const currentPhone = config.phone || "";
    const currentPhoneHref = config.phoneHref || "";
    const currentPhoneLabel = config.phoneLabel || "";
    const currentEmail = config.email || "";
    const currentEmailHref = currentEmail ? `mailto:${currentEmail}` : "";
    const currentAddress = address.full || "";

    addReplacementGroup(legacy.companyNames, currentCompanyName);
    addReplacementGroup(legacy.companyIds, currentCompanyId);
    addReplacementGroup(legacy.phones, currentPhone);
    addReplacementGroup(legacy.phoneHrefs, currentPhoneHref);
    addReplacementGroup(legacy.emails, currentEmail);
    addReplacementGroup(legacy.emailHrefs, currentEmailHref);
    addReplacementGroup(legacy.addresses, currentAddress);

    /* Extra common old strings */
    addReplacement("Sentra Provider Matching LLC", currentCompanyId);
    addReplacement("Sentra home", brand.logoLabel || `${currentCompanyName} home`);
    addReplacement("Call Sentra at (877) 555-0186", currentPhoneLabel);
    addReplacement("Sentra", currentCompanyName);
    addReplacement("(877) 555-0186", currentPhone);
    addReplacement("tel:+18775550186", currentPhoneHref);
    addReplacement("hello@sentramatch.com", currentEmail);
    addReplacement("mailto:hello@sentramatch.com", currentEmailHref);
    addReplacement("1428 Congress Ave, Suite 210, Austin, TX 78701, USA", currentAddress);

    replacements.sort((a, b) => b.from.length - a.from.length);

    if (!replacements.length) return;

    replaceHeadContent();
    replaceTextNodes(document.body);
    replaceAttributes(document.body);

    if (!options.skipObserver) {
      setupLegacyContentObserver();
    }

    function addReplacementGroup(values, replacement) {
      if (!Array.isArray(values)) return;

      values.forEach((value) => {
        addReplacement(value, replacement);
      });
    }

    function addReplacement(from, to) {
      if (!from || !to) return;

      const fromString = String(from);
      const toString = String(to);

      if (!fromString.trim()) return;
      if (fromString === toString) return;

      const key = `${fromString}=>${toString}`;

      if (seen.has(key)) return;

      seen.add(key);

      replacements.push({
        from: fromString,
        to: toString
      });
    }

    function replaceTextNodes(root) {
      if (!root) return;

      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;

            if (!parent) return NodeFilter.FILTER_REJECT;

            const tag = parent.tagName.toLowerCase();

            if (["script", "style", "noscript", "svg"].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }

            if (!node.nodeValue || !hasLegacyValue(node.nodeValue)) {
              return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const nodes = [];

      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }

      nodes.forEach((node) => {
        node.nodeValue = replaceString(node.nodeValue);
      });
    }

    function replaceAttributes(root) {
      if (!root) return;

      const attributesToUpdate = [
        "href",
        "aria-label",
        "alt",
        "title",
        "content",
        "placeholder",
        "value",
        "data-label",
        "data-title",
        "data-text"
      ];

      root.querySelectorAll("*").forEach((element) => {
        attributesToUpdate.forEach((attribute) => {
          if (!element.hasAttribute(attribute)) return;

          const currentValue = element.getAttribute(attribute);

          if (!currentValue || !hasLegacyValue(currentValue)) return;

          const nextValue = replaceString(currentValue);

          if (nextValue !== currentValue) {
            element.setAttribute(attribute, nextValue);
          }
        });
      });
    }

    function replaceHeadContent() {
      if (document.title && hasLegacyValue(document.title)) {
        document.title = replaceString(document.title);
      }

      document.querySelectorAll("meta[content]").forEach((meta) => {
        const currentValue = meta.getAttribute("content");

        if (!currentValue || !hasLegacyValue(currentValue)) return;

        const nextValue = replaceString(currentValue);

        if (nextValue !== currentValue) {
          meta.setAttribute("content", nextValue);
        }
      });
    }

    function replaceString(value) {
      let output = String(value || "");

      replacements.forEach(({ from, to }) => {
        output = output.split(from).join(to);
      });

      return output;
    }

    function hasLegacyValue(value) {
      const text = String(value || "");

      return replacements.some(({ from }) => text.includes(from));
    }

    function setupLegacyContentObserver() {
      if (replaceLegacyContent._observer) return;

      let scheduled = false;

      replaceLegacyContent._observer = new MutationObserver(() => {
        if (scheduled) return;

        scheduled = true;

        window.requestAnimationFrame(() => {
          scheduled = false;

          replaceLegacyContent({
            skipObserver: true
          });
        });
      });

      replaceLegacyContent._observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [
          "href",
          "aria-label",
          "alt",
          "title",
          "content",
          "placeholder",
          "value",
          "data-label",
          "data-title",
          "data-text"
        ]
      });
    }
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value || "";
    });
  }

  function hydrateSelectOptions() {
    const serviceSelects = document.querySelectorAll("[data-service-select]");
    const propertySelects = document.querySelectorAll("[data-property-select]");

    serviceSelects.forEach((select) => {
      const placeholder =
        select.getAttribute("data-placeholder") ||
        config.forms.hero.servicePlaceholder ||
        "Service Type";

      select.innerHTML = `
        <option value="">${escapeHtml(placeholder)}</option>
        ${config.services
          .map((service) => {
            return `<option value="${escapeAttr(service.id)}">${escapeHtml(service.title)}</option>`;
          })
          .join("")}
      `;
    });

    propertySelects.forEach((select) => {
      const placeholder =
        select.getAttribute("data-placeholder") ||
        config.forms.hero.propertyPlaceholder ||
        "Property Type";

      select.innerHTML = `
        <option value="">${escapeHtml(placeholder)}</option>
        ${config.forms.propertyTypes
          .map((propertyType) => {
            return `<option value="${escapeAttr(propertyType)}">${escapeHtml(propertyType)}</option>`;
          })
          .join("")}
      `;
    });
  }

  function renderServiceCards() {
    document.querySelectorAll("[data-service-cards]").forEach((mount) => {
      const variant = mount.getAttribute("data-service-cards") || "default";

      mount.innerHTML = config.services
        .map((service) => renderServiceCard(service, variant))
        .join("");
    });
  }

  function renderServiceCard(service, variant) {
    return `
      <a class="photo-card service-card service-card--${escapeAttr(variant)}"
         href="${escapeAttr(service.href)}"
         aria-label="Learn more about ${escapeAttr(service.title)}">
        <img class="photo-card__image"
             src="${escapeAttr(service.image)}"
             alt="${escapeAttr(service.title)}">

        <span class="photo-card__icon" aria-hidden="true">
          ${getIcon(service.icon)}
        </span>

        <div class="photo-card__content">
          <span class="photo-card__status">${escapeHtml(service.status || "Provider Options")}</span>
          <h3>${escapeHtml(service.title)}</h3>
          <p>${escapeHtml(service.cardText || service.summary)}</p>
          <span class="text-link" aria-hidden="true">Learn more</span>
        </div>

        <span class="photo-card__scan" aria-hidden="true"></span>
      </a>
    `;
  }

  function renderRelatedServices() {
    document.querySelectorAll("[data-related-services]").forEach((mount) => {
      const currentServiceId =
        mount.getAttribute("data-current-service") ||
        document.body.getAttribute("data-service-id");

      const relatedServices = config.services
        .filter((service) => service.id !== currentServiceId)
        .slice(0, 3);

      mount.innerHTML = relatedServices
        .map((service) => renderServiceCard(service, "related"))
        .join("");
    });
  }

  function renderSectionNavigation() {
    document.querySelectorAll("[data-section-nav]").forEach((mount) => {
      const key = mount.getAttribute("data-section-nav");
      const items = config.sectionNavigation && config.sectionNavigation[key];

      if (!Array.isArray(items) || !items.length) return;

      mount.classList.add("section-nav");
      mount.setAttribute("aria-label", "Section navigation");

      mount.innerHTML = items
        .map((item) => {
          return `
            <a class="section-nav__link" href="#${escapeAttr(item.target)}" data-section-nav-link="${escapeAttr(item.target)}">
              <span class="section-nav__dot" aria-hidden="true"></span>
              <span class="section-nav__text">
                <span class="section-nav__number">${escapeHtml(item.number)}</span>
                <span>${escapeHtml(item.label)}</span>
              </span>
            </a>
          `;
        })
        .join("");
    });
  }

  function initActiveSectionNavigation() {
    const links = document.querySelectorAll("[data-section-nav-link]");

    if (!links.length || !("IntersectionObserver" in window)) return;

    const byId = new Map();

    links.forEach((link) => {
      const id = link.getAttribute("data-section-nav-link");
      const section = document.getElementById(id);

      if (section) {
        byId.set(id, { link, section });
      }
    });

    if (!byId.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("data-section-nav-link") === id);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    byId.forEach(({ section }) => observer.observe(section));
  }

  function renderSecurityTicker() {
    document.querySelectorAll("[data-security-ticker]").forEach((mount) => {
      const items = Array.isArray(config.tickerItems) ? config.tickerItems : [];
      const doubledItems = [...items, ...items];

      mount.classList.add("security-ticker");

      mount.innerHTML = `
        <div class="security-ticker__track">
          ${doubledItems
          .map((item) => {
            return `
                <a class="security-ticker__item" href="${escapeAttr(item.href)}">
                  ${escapeHtml(item.label)}
                </a>
              `;
          })
          .join("")}
        </div>
      `;
    });
  }

  function renderFaqBlocks() {
    document.querySelectorAll("[data-faq-list]").forEach((mount, blockIndex) => {
      const key = mount.getAttribute("data-faq-list") || "general";
      const items = config.faq && config.faq[key];

      if (!Array.isArray(items) || !items.length) return;

      mount.innerHTML = items
        .map((item, index) => {
          const id = `faq-${key}-${blockIndex}-${index}`;

          return `
            <div class="faq-item">
              <button class="faq-button"
                      type="button"
                      aria-expanded="false"
                      aria-controls="${escapeAttr(id)}"
                      data-faq-button>
                <span class="faq-button__text">${escapeHtml(item.question)}</span>
                <span class="faq-button__icon" aria-hidden="true"></span>
              </button>

              <div class="faq-panel" id="${escapeAttr(id)}" data-faq-panel>
                <div class="faq-panel__inner">
                  <p>${escapeHtml(item.answer)}</p>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
    });
  }

  function initFaqAccordions() {
    document.querySelectorAll("[data-faq-button]").forEach((button) => {
      button.addEventListener("click", () => {
        const panelId = button.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        const isOpen = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isOpen));

        if (panel) {
          panel.classList.toggle("is-open", !isOpen);
        }
      });
    });
  }

  function renderFaqSchema() {
    document.querySelectorAll("[data-faq-schema]").forEach((mount) => {
      const key = mount.getAttribute("data-faq-schema") || "general";
      const items = config.faq && config.faq[key];

      if (!Array.isArray(items) || !items.length) return;

      const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => {
          return {
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          };
        })
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);

      mount.innerHTML = "";
      mount.appendChild(script);
    });
  }

  function initForms() {
    document.querySelectorAll("form[data-form-type]").forEach((form) => {
      form.setAttribute("novalidate", "");

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formType = form.getAttribute("data-form-type") || "quote";
        const messages = config.forms[formType] || config.forms.quote;
        const requiredFields = Array.from(form.querySelectorAll("[data-required]"));
        const status = form.querySelector("[data-form-status]");

        let isValid = true;

        requiredFields.forEach((field) => {
          const value = String(field.value || "").trim();
          const fieldIsValid = validateField(field, value);

          field.classList.toggle("is-invalid", !fieldIsValid);
          field.setAttribute("aria-invalid", String(!fieldIsValid));

          if (!fieldIsValid) {
            isValid = false;
          }
        });

        if (!status) return;

        status.classList.add("is-visible");
        status.classList.toggle("is-success", isValid);
        status.classList.toggle("is-error", !isValid);
        status.textContent = isValid
          ? messages.successMessage || "Your request was submitted."
          : messages.errorMessage || "Please complete the required fields.";

        if (isValid) {
          form.reset();
          hydrateSelectOptions();
        }
      });
    });
  }

  function validateField(field, value) {
    if (!value) return false;

    if (field.type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (field.name === "zip" || field.getAttribute("data-validate") === "zip") {
      return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value);
    }

    return true;
  }

  function renderPolicyBanner() {
    let mount = document.querySelector("[data-policy-banner]");

    if (!mount) {
      mount = document.createElement("div");
      mount.setAttribute("data-policy-banner", "");
      document.body.appendChild(mount);
    }

    const banner = config.cookieBanner;

    if (!banner || !banner.storageKey) return;

    const storedChoice = localStorage.getItem(banner.storageKey);

    mount.classList.add("policy-banner");

    mount.innerHTML = `
      <h2>${escapeHtml(banner.title)}</h2>
      <p>${escapeHtml(banner.text)}</p>

      <div class="policy-banner__links">
        ${banner.links
        .map((link) => {
          return `<a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a>`;
        })
        .join("")}
      </div>

      <div class="policy-banner__actions">
        <button class="btn btn--primary" type="button" data-policy-accept>
          ${escapeHtml(banner.accept)}
        </button>

        <button class="btn btn--outline" type="button" data-policy-decline>
          ${escapeHtml(banner.decline)}
        </button>
      </div>
    `;

    if (!storedChoice) {
      mount.classList.add("is-visible");
    }

    mount.querySelector("[data-policy-accept]")?.addEventListener("click", () => {
      localStorage.setItem(banner.storageKey, "accepted");
      mount.classList.remove("is-visible");
    });

    mount.querySelector("[data-policy-decline]")?.addEventListener("click", () => {
      localStorage.setItem(banner.storageKey, "declined");
      mount.classList.remove("is-visible");
    });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start"
        });
      });
    });
  }

  function preventEmptyLinks() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    return page || "index.html";
  }

  function normalizePath(path) {
    if (!path) return "";

    const cleanPath = path.split("#")[0].split("?")[0];

    if (!cleanPath || cleanPath === "/") return "index.html";

    return cleanPath.split("/").pop() || "index.html";
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function getIcon(name) {
    const icons = {
      shield: `
        <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
          <path d="M24 4.8 39.2 10v11.8c0 9.7-6.2 18.2-15.2 21.4C15 40 8.8 31.5 8.8 21.8V10L24 4.8Z" stroke="currentColor" stroke-width="2.4" />
          <path d="M24 13.2 32 16v6.2c0 5.1-3.2 9.6-8 11.4-4.8-1.8-8-6.3-8-11.4V16l8-2.8Z" stroke="currentColor" stroke-width="2" opacity=".72" />
          <path d="M20 23.5 23 26.5 29 19.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `,
      phone: `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M6.6 3.8 9.2 3l2.1 5-1.5 1.2c.9 1.9 2.4 3.4 4.4 4.5l1.3-1.6 5 2.2-.8 2.6c-.3.9-1.1 1.5-2 1.4C10.7 17.9 6.1 13.3 5.7 6c-.1-1 .4-1.9.9-2.2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
        </svg>
      `,
      mail: `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M4.5 6.5h15v11h-15v-11Z" stroke="currentColor" stroke-width="1.7" />
          <path d="m5.5 7.4 6.5 5 6.5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `,
      "map-pin": `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" stroke="currentColor" stroke-width="1.7" />
          <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor" stroke-width="1.7" />
        </svg>
      `,
      camera: `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M3.5 9.5 13 6.8v7.4L3.5 17V9.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
          <path d="M13 9.2h4.2a3.3 3.3 0 0 1 0 6.6H13" stroke="currentColor" stroke-width="1.7" />
          <path d="M7.8 17.2 9.2 21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M14.8 13h3.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      `,
      "bell-ring": `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M7 17h10l-1.2-2.1V10a3.8 3.8 0 0 0-7.6 0v4.9L7 17Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
          <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M4.8 8.2a7.1 7.1 0 0 1 2.1-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M19.2 8.2a7.1 7.1 0 0 0-2.1-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      `,
      "scan-face": `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M5 8V5h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M16 5h3v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M19 16v3h-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M8 19H5v-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M9 10h.01M15 10h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          <path d="M9.5 15c1.5 1 3.5 1 5 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      `,
      "monitor-check": `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M4 5.5h16v10H4v-10Z" stroke="currentColor" stroke-width="1.7" />
          <path d="M9 20h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M12 15.5V20" stroke="currentColor" stroke-width="1.7" />
          <path d="m9 10.8 2 2 4-4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `,
      "chevron-down": `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `,
      x: `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      `
    };

    return icons[name] || icons.shield;
  }
})();