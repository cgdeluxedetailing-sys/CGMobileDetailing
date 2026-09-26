document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loader = document.querySelector(".page-loader");
    const menuButton = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    const header = document.querySelector(".site-header");
    const revealElements = document.querySelectorAll(".reveal");

    /* PAGE LOADER */
    window.addEventListener("load", () => {
        if (!loader) return;
        window.setTimeout(() => loader.classList.add("hidden"), reduceMotion ? 0 : 350);
    });

    /* MOBILE MENU */
    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open menu");
        }
    };

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("open");
            document.body.classList.toggle("menu-open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1000) closeMobileMenu();
        });
    }

    /* SCROLL REVEALS */
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }

    /* HEADER SCROLL EFFECT */
    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 50);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* SERVICE ROW MICRO INTERACTION */
    document.querySelectorAll(".service-row").forEach(row => {
        const number = row.querySelector(".service-number");
        if (!number) return;

        row.addEventListener("mouseenter", () => {
            number.style.color = "#fff";
        });

        row.addEventListener("mouseleave", () => {
            number.style.color = "";
        });
    });

    /* FAQ: only one open at a time */
    const faqDetails = document.querySelectorAll(".faq-list details");

    faqDetails.forEach(detail => {
        detail.addEventListener("toggle", () => {
            if (!detail.open) return;

            faqDetails.forEach(other => {
                if (other !== detail) other.removeAttribute("open");
            });
        });
    });

    /* SMOOTH INTERNAL LINKS */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);
        });
    });
});
