document.addEventListener("DOMContentLoaded", () => {

    /*
     * PAGE LOADER
     */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 350);
    });


    /*
     * MOBILE MENU
     */

    const menuButton = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    menuButton?.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        document.body.classList.toggle("menu-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            document.body.classList.remove("menu-open");
            menuButton?.setAttribute("aria-expanded", "false");
            menuButton?.setAttribute("aria-label", "Open menu");
        });
    });


    /*
     * SCROLL REVEALS
     */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    if ("IntersectionObserver" in window) {
        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }


    /*
     * BEFORE / AFTER SLIDER
     */

    const comparison = document.querySelector(".comparison");

    if (comparison) {

        const after = comparison.querySelector(".comparison-after");
        const handle = comparison.querySelector(".comparison-handle");

        let dragging = false;

        const updateSlider = (clientX) => {

            const rect = comparison.getBoundingClientRect();

            let percentage =
                ((clientX - rect.left) / rect.width) * 100;

            percentage = Math.max(5, Math.min(95, percentage));

            after.style.clipPath =
                `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;

            handle.style.left = `${percentage}%`;
        };

        const startDrag = (event) => {
            dragging = true;
            updateSlider(event.clientX);
        };

        const stopDrag = () => {
            dragging = false;
        };

        const drag = (event) => {
            if (!dragging) return;
            updateSlider(event.clientX);
        };

        comparison.addEventListener("pointerdown", startDrag);
        window.addEventListener("pointerup", stopDrag);
        window.addEventListener("pointermove", drag);

    }


    /*
     * HEADER SCROLL EFFECT
     */

    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.background = "rgba(11,13,14,.85)";
            header.style.backdropFilter = "blur(14px)";
            header.style.borderBottom = "1px solid rgba(255,255,255,.08)";
        } else {
            header.style.background = "transparent";
            header.style.backdropFilter = "none";
            header.style.borderBottom = "0";
        }

    });


    /*
     * SERVICE ROW MICRO INTERACTION
     */

    document.querySelectorAll(".service-row").forEach(row => {

        row.addEventListener("mouseenter", () => {
            row.querySelector(".service-number").style.color = "#fff";
        });

        row.addEventListener("mouseleave", () => {
            row.querySelector(".service-number").style.color = "";
        });

    });


    /*
     * FAQ
     *
     * Only one question open at a time.
     */

    const faqDetails = document.querySelectorAll(".faq-list details");

    faqDetails.forEach(detail => {

        detail.addEventListener("toggle", () => {

            if (!detail.open) return;

            faqDetails.forEach(other => {
                if (other !== detail) {
                    other.removeAttribute("open");
                }
            });

        });

    });


    /*
     * SMOOTH INTERNAL LINKS
     */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "auto"
                        : "smooth"
            });

        });

    });

});
