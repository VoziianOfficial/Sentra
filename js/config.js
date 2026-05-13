"use strict";

window.SITE_CONFIG = {
    companyName: "Sentra",
    companyId: "Sentra Provider Matching LLC",

    brand: {
        shortName: "Sentra",
        tagline: "Compare local security provider options with clarity.",
        logoLabel: "Sentra home",
        logoText: "Sentra",
        logoAccent: "CONNECT"
    },

    phone: "(877) 555-0186",
    phoneHref: "tel:+18775550186",
    phoneLabel: "Call Sentra at (877) 555-0186",
    phoneButtonText: "(877) 555-0186",

    email: "hello@sentramatch.com",

    address: {
        line1: "1428 Congress Ave, Suite 210",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
        full: "1428 Congress Ave, Suite 210, Austin, TX 78701, USA"
    },

    serviceArea: "United States",

    footerText: "© 2026 Sentra Provider Matching LLC. All rights reserved.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "Sentra is an independent provider matching platform. We do not install, repair, monitor, or perform security services directly. Provider availability, pricing, licensing, insurance, timelines, and service details vary by provider and location. Users should verify all provider credentials and project details before hiring.",

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html",
            hasDropdown: true
        },
        {
            label: "How It Works",
            href: "index.html#process"
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        }
    ],

    services: [
        {
            id: "cctv-systems",
            title: "CCTV Systems",
            shortTitle: "CCTV",
            href: "cctv-systems.html",
            icon: "camera",
            image: "./assets/images/services-card.jpg",
            heroImage: "./assets/images/cctv-hero.jpg",
            status: "Camera Coverage",
            summary:
                "Compare local providers for camera system planning, placement, installation quotes, and security coverage options.",
            cardText:
                "Compare camera system providers for homes, storefronts, offices, and multi-area properties.",
            heroTitle: "Compare CCTV System Providers",
            heroAccent: "CCTV",
            heroText:
                "Explore independent provider options for security camera projects, property coverage planning, and quote requests.",
            pageKicker: "CCTV Provider Matching",
            pageIntro:
                "Sentra helps users compare local CCTV system provider options. Providers are independent, and project scope, pricing, availability, and credentials should be verified directly before hiring.",
            evaluationPoints: [
                "Camera placement and coverage goals",
                "Indoor, outdoor, or multi-zone needs",
                "Recording, access, and maintenance expectations"
            ]
        },
        {
            id: "alarm-systems",
            title: "Alarm Systems",
            shortTitle: "Alarms",
            href: "alarm-systems.html",
            icon: "bell-ring",
            image: "./assets/images/service-alarm.jpg",
            heroImage: "./assets/images/alarm-hero.jpg",
            status: "Alert Ready",
            summary:
                "Find provider options for alarm system quotes, keypad setups, sensors, alerts, and property-specific requirements.",
            cardText:
                "Review alarm provider options for residential and business security needs.",
            heroTitle: "Compare Alarm System Providers",
            heroAccent: "Alarm",
            heroText:
                "Request information from independent providers for alarm systems, sensor coverage, and property-specific alert needs.",
            pageKicker: "Alarm Provider Matching",
            pageIntro:
                "Sentra helps connect users with independent alarm system providers. Users should confirm licensing, insurance, monitoring terms, equipment details, and quote information directly with any provider.",
            evaluationPoints: [
                "Entry points, sensors, and keypad needs",
                "Alert preferences and monitoring options",
                "Property size and installation timeline"
            ]
        },
        {
            id: "access-control",
            title: "Access Control",
            shortTitle: "Access",
            href: "access-control.html",
            icon: "scan-face",
            image: "./assets/images/service-access.jpg",
            heroImage: "./assets/images/access-hero.jpg",
            status: "Entry Control",
            summary:
                "Connect with providers for access control quotes, entry management systems, card readers, and keypad options.",
            cardText:
                "Compare provider options for secure entry, door access, and access management systems.",
            heroTitle: "Compare Access Control Providers",
            heroAccent: "Access",
            heroText:
                "Explore independent provider options for door access, keypad entry, card systems, and property access control planning.",
            pageKicker: "Access Control Matching",
            pageIntro:
                "Sentra helps users compare access control provider options. System compatibility, installation requirements, pricing, credentials, and timelines should be reviewed directly with each provider.",
            evaluationPoints: [
                "Door count and entry points",
                "Keypad, card, or managed access needs",
                "User roles, schedules, and system compatibility"
            ]
        },
        {
            id: "security-monitoring",
            title: "Security Monitoring",
            shortTitle: "Monitoring",
            href: "security-monitoring.html",
            icon: "monitor-check",
            image: "./assets/images/service-monitoring.jpg",
            heroImage: "./assets/images/monitoring-hero.jpg",
            status: "Signal Review",
            summary:
                "Compare provider options for monitoring-related services, alerts, connected systems, and ongoing security support.",
            cardText:
                "Review local provider options for monitoring-related security service requests.",
            heroTitle: "Compare Security Monitoring Providers",
            heroAccent: "Monitoring",
            heroText:
                "Request provider information for monitoring-related security services, connected system support, and alert options.",
            pageKicker: "Monitoring Provider Matching",
            pageIntro:
                "Sentra does not monitor properties directly. The platform helps users compare independent provider options for monitoring-related service requests. Users should verify terms, pricing, availability, response details, and provider credentials.",
            evaluationPoints: [
                "Existing or new security system needs",
                "Alert preferences and service terms",
                "Provider coverage and availability by area"
            ]
        }
    ],

    forms: {
        hero: {
            zipPlaceholder: "ZIP Code",
            servicePlaceholder: "Service Type",
            propertyPlaceholder: "Property Type",
            submitText: "Get Started",
            successMessage:
                "Thank you. Your request has been received. Provider options may vary by location and service type.",
            errorMessage:
                "Please complete the required fields before submitting your request."
        },

        quote: {
            title: "Request Quotes. Stay Protected.",
            zipPlaceholder: "ZIP Code",
            propertyPlaceholder: "Property Type",
            servicePlaceholder: "Service Type",
            submitText: "Get Quotes",
            successMessage:
                "Your quote request was submitted. Independent provider availability may vary by area.",
            errorMessage:
                "Please enter your ZIP code and select a service type."
        },

        contact: {
            title: "Tell us what you need protected.",
            namePlaceholder: "Full Name",
            phonePlaceholder: "Phone Number",
            emailPlaceholder: "Email Address",
            zipPlaceholder: "ZIP Code",
            servicePlaceholder: "Service Type",
            messagePlaceholder: "Briefly describe your security project",
            submitText: "Send Request",
            successMessage:
                "Thank you. Your message has been received. Sentra helps connect users with independent provider options.",
            errorMessage:
                "Please complete all required fields with valid information."
        },

        propertyTypes: [
            "Home",
            "Business",
            "Office",
            "Retail",
            "Multi-Unit Property",
            "Other"
        ]
    },

    faq: {
        general: [
            {
                question: "How does Sentra help compare security providers?",
                answer:
                    "Sentra helps users submit basic project details and compare independent local provider options for security-related services. Provider availability, pricing, and service details vary by location and provider."
            },
            {
                question: "Does Sentra install security systems directly?",
                answer:
                    "No. Sentra is not a security contractor and does not install, repair, or monitor systems directly. Providers listed or contacted through the platform are independent."
            },
            {
                question: "Are providers independent?",
                answer:
                    "Yes. Security providers are independent businesses. Users should verify licensing, insurance, quotes, equipment details, monitoring terms, timelines, and warranties before hiring."
            },
            {
                question: "Does provider availability vary by location?",
                answer:
                    "Yes. Provider availability may vary by ZIP code, property type, service category, and project scope."
            }
        ],

        contact: [
            {
                question: "What happens after I submit a request?",
                answer:
                    "Your request details may be used to help connect you with relevant independent provider options. Availability and response timing can vary by area and service type."
            },
            {
                question: "Are quote requests usually free?",
                answer:
                    "Submitting a request through Sentra is free. Any inspection, service, equipment, or installation costs should be confirmed directly with the provider."
            },
            {
                question: "What should I verify before choosing a provider?",
                answer:
                    "Verify licensing, insurance, written estimates, equipment details, monitoring terms, warranty information, project timeline, and all service conditions before hiring."
            }
        ]
    },

    socialProof: {
        eyebrow: "Provider Matching",
        title: "Security decisions need clarity before commitment.",
        items: [
            {
                label: "Independent",
                value: "Platform",
                text: "Sentra helps users compare provider options. It does not perform security work directly."
            },
            {
                label: "Focused",
                value: "4 Services",
                text: "CCTV systems, alarm systems, access control, and security monitoring."
            },
            {
                label: "Location Based",
                value: "USA",
                text: "Provider availability may vary by ZIP code, service type, and project details."
            }
        ]
    },

    sectionNavigation: {
        home: [
            {
                number: "01",
                label: "Hero",
                target: "hero"
            },
            {
                number: "02",
                label: "Services",
                target: "services"
            },
            {
                number: "03",
                label: "Process",
                target: "process"
            },
            {
                number: "04",
                label: "Feed",
                target: "security-ticker"
            },
            {
                number: "05",
                label: "Protection",
                target: "protection"
            },
            {
                number: "06",
                label: "Compare",
                target: "provider-factors"
            },
            {
                number: "07",
                label: "Quote",
                target: "quote"
            }
        ],

        services: [
            {
                number: "01",
                label: "Overview",
                target: "services-hero"
            },
            {
                number: "02",
                label: "Categories",
                target: "service-index"
            },
            {
                number: "03",
                label: "Ticker",
                target: "security-ticker"
            },
            {
                number: "04",
                label: "Logic",
                target: "matching-logic"
            },
            {
                number: "05",
                label: "Quote",
                target: "service-cta"
            }
        ],

        about: [
            {
                number: "01",
                label: "About",
                target: "about-hero"
            },
            {
                number: "02",
                label: "Model",
                target: "platform-model"
            },
            {
                number: "03",
                label: "Help",
                target: "platform-help"
            },
            {
                number: "04",
                label: "Trust",
                target: "trust-strip"
            },
            {
                number: "05",
                label: "Decision",
                target: "about-proof"
            },
            {
                number: "06",
                label: "Start",
                target: "about-cta"
            }
        ],

        contact: [
            {
                number: "01",
                label: "Contact",
                target: "contact-hero"
            },
            {
                number: "02",
                label: "Form",
                target: "contact-form"
            },
            {
                number: "03",
                label: "Methods",
                target: "quick-contact"
            },
            {
                number: "04",
                label: "Area",
                target: "service-area"
            },
            {
                number: "05",
                label: "FAQ",
                target: "contact-faq"
            }
        ]
    },

    tickerItems: [
        {
            label: "CCTV Systems",
            href: "cctv-systems.html",
            isService: true
        },
        {
            label: "Alarm Systems",
            href: "alarm-systems.html",
            isService: true
        },
        {
            label: "Access Control",
            href: "access-control.html",
            isService: true
        },
        {
            label: "Security Monitoring",
            href: "security-monitoring.html",
            isService: true
        },
        {
            label: "Verified Providers",
            href: "contact.html",
            isService: false
        },
        {
            label: "24/7 Support",
            href: "contact.html",
            isService: false
        },
        {
            label: "Get Matched",
            href: "contact.html",
            isService: false
        },
        {
            label: "Area Coverage",
            href: "contact.html",
            isService: false
        },
        {
            label: "Provider Matching",
            href: "about.html",
            isService: false
        }
    ],

    pageMeta: {
        "index.html": {
            title: "Sentra | Compare Local Security Provider Options",
            description:
                "Compare independent local security provider options for CCTV systems, alarm systems, access control, and security monitoring requests."
        },
        "services.html": {
            title: "Security Service Categories | Sentra",
            description:
                "Review security service categories and compare independent provider options for CCTV systems, alarm systems, access control, and security monitoring."
        },
        "about.html": {
            title: "About Sentra | Security Provider Matching Platform",
            description:
                "Learn how Sentra helps users compare independent security provider options while keeping the process clear, professional, and aggregator-safe."
        },
        "contact.html": {
            title: "Contact Sentra | Request Security Provider Options",
            description:
                "Contact Sentra to request local security provider options for CCTV systems, alarm systems, access control, or security monitoring."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Sentra",
            description:
                "Read the Sentra privacy policy for information about data practices related to the security provider matching platform."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Sentra",
            description:
                "Read the Sentra cookie policy for information about cookies and similar technologies used on this website."
        },
        "terms-of-service.html": {
            title: "Terms of Service | Sentra",
            description:
                "Review the terms of service for using the Sentra security provider matching website."
        },
        "cctv-systems.html": {
            title: "CCTV System Provider Options | Sentra",
            description:
                "Compare independent local provider options for CCTV system quote requests, camera coverage planning, and security camera projects."
        },
        "alarm-systems.html": {
            title: "Alarm System Provider Options | Sentra",
            description:
                "Compare independent provider options for alarm systems, sensors, keypad setups, and property alert needs."
        },
        "access-control.html": {
            title: "Access Control Provider Options | Sentra",
            description:
                "Compare independent provider options for access control, secure entry systems, card readers, and keypad access projects."
        },
        "security-monitoring.html": {
            title: "Security Monitoring Provider Options | Sentra",
            description:
                "Compare independent provider options for monitoring-related security service requests and connected system support."
        }
    },

    cookieBanner: {
        storageKey: "sentra_policy_choice",
        title: "Privacy & Cookie Notice",
        text:
            "Sentra uses cookies and similar technologies to support site functionality, improve user experience, and understand basic website activity.",
        accept: "Accept",
        decline: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    }
};