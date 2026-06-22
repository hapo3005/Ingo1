document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("[data-header]");
    const navLinks = document.querySelectorAll(".navbar-collapse .nav-link, .navbar-collapse .btn");
    const navbarCollapse = document.querySelector("#mainNavigation");
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const contactForm = document.querySelector("[data-contact-form]");
    const formSuccess = document.querySelector("[data-form-success]");

    function updateHeaderState() {
        if (!header) return;

        if (window.scrollY > 16) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    }

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (!navbarCollapse) return;

            const isOpen = navbarCollapse.classList.contains("show");

            if (isOpen && window.bootstrap) {
                const collapseInstance =
                    window.bootstrap.Collapse.getInstance(navbarCollapse) ||
                    new window.bootstrap.Collapse(navbarCollapse, { toggle: false });

                collapseInstance.hide();
            }
        });
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.14,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (formSuccess) {
                formSuccess.hidden = false;
                formSuccess.focus?.();
            }
        });
    }
});