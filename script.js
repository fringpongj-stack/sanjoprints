/* =========================================================
   SANJO PRINTS
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

// CHANGE THIS TO YOUR REAL WHATSAPP NUMBER.
// Kenya format:
// 2547XXXXXXXX
const WHATSAPP_NUMBER = "254700000000";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();

    initializeMobileMenu();

    initializeHeader();

    initializeSmoothNavigation();

    initializeServiceFilters();

    initializeServiceOrdering();

    initializeFAQ();

    initializeCounters();

    initializeOrderModal();

    initializeContactForm();

    initializeBackToTop();

    initializeCurrentYear();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initializeLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 500);

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const navbar =
        document.getElementById("navbar");

    if (!menuButton || !navbar) return;


    menuButton.addEventListener("click", () => {

        const isOpen =
            navbar.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close mobile menu after clicking a link

    const navLinks =
        navbar.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close when clicking outside

    document.addEventListener("click", event => {

        const clickedInside =
            navbar.contains(event.target) ||
            menuButton.contains(event.target);

        if (!clickedInside) {

            navbar.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function initializeHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function initializeSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (!href || href === "#") return;

            const target =
                document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const header =
                document.getElementById("header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   SERVICE FILTERS
========================================================= */

function initializeServiceFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    if (
        !filterButtons.length ||
        !serviceCards.length
    ) return;


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                serviceCards.forEach(card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                });

            }
        );

    });

}


/* =========================================================
   SERVICE ORDER BUTTONS
========================================================= */

function initializeServiceOrdering() {

    const buttons =
        document.querySelectorAll(
            ".order-service"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service;

                openOrderModal(service);

            }
        );

    });


    const openButtons =
        document.querySelectorAll(
            ".open-order"
        );


    openButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openOrderModal();

            }
        );

    });

}


/* =========================================================
   FAQ
========================================================= */

function initializeFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                // Close all

                faqItems.forEach(otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    if (otherAnswer) {

                        otherAnswer.style.maxHeight =
                            null;

                    }

                });


                // Open clicked item

                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    animateCounter(
                        counter,
                        target
                    );


                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


function animateCounter(
    element,
    target
) {

    let current = 0;

    const duration = 1500;

    const startTime =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                eased * target
            );


        element.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   ORDER MODAL
========================================================= */

function initializeOrderModal() {

    const modal =
        document.getElementById(
            "orderModal"
        );

    const closeButton =
        document.getElementById(
            "modalClose"
        );

    const form =
        document.getElementById(
            "orderForm"
        );


    if (
        !modal ||
        !closeButton ||
        !form
    ) return;


    closeButton.addEventListener(
        "click",
        closeOrderModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeOrderModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeOrderModal();

            }

        }
    );


    form.addEventListener(
        "submit",
        handleOrderSubmit
    );

}


/* =========================================================
   OPEN ORDER MODAL
========================================================= */

function openOrderModal(
    selectedService = ""
) {

    const modal =
        document.getElementById(
            "orderModal"
        );

    const serviceSelect =
        document.getElementById(
            "orderService"
        );


    if (!modal) return;


    if (
        selectedService &&
        serviceSelect
    ) {

        serviceSelect.value =
            selectedService;

    }


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(() => {

        const nameInput =
            document.getElementById(
                "orderName"
            );

        if (nameInput) {

            nameInput.focus();

        }

    }, 200);

}


/* =========================================================
   CLOSE ORDER MODAL
========================================================= */

function closeOrderModal() {

    const modal =
        document.getElementById(
            "orderModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   ORDER SUBMISSION
========================================================= */

function handleOrderSubmit(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "orderName"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "orderPhone"
            )
            .value
            .trim();


    const service =
        document
            .getElementById(
                "orderService"
            )
            .value;


    const details =
        document
            .getElementById(
                "orderDetails"
            )
            .value
            .trim();


    const delivery =
        document
            .getElementById(
                "orderDelivery"
            )
            .value;


    if (
        !name ||
        !phone ||
        !service ||
        !details
    ) {

        showToast(
            "Please complete all required fields.",
            "error"
        );

        return;

    }


    const message =
        `Hello Sanjo Prints! 👋

I would like to place an order.

*Name:* ${name}

*Phone:* ${phone}

*Service:* ${service}

*Details:* ${details}

*Preferred option:* ${delivery}

Please let me know the price and next steps. Thank you!`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );


    closeOrderModal();

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "contactName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "contactPhone"
                    )
                    .value
                    .trim();


            const service =
                document
                    .getElementById(
                        "contactService"
                    )
                    .value;


            const message =
                document
                    .getElementById(
                        "contactMessage"
                    )
                    .value
                    .trim();


            if (
                !name ||
                !phone ||
                !message
            ) {

                showToast(
                    "Please fill in the required fields.",
                    "error"
                );

                return;

            }


            const whatsappMessage =
                `Hello Sanjo Prints! 👋

I have an enquiry.

*Name:* ${name}

*Phone:* ${phone}

*Service:* ${service || "General enquiry"}

*Message:* ${message}`;


            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=` +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            form.reset();


            showToast(
                "Opening WhatsApp..."
            );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 600
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        },
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

let toastTimer;


function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (
        !toast ||
        !toastMessage
    ) return;


    toastMessage.textContent =
        message;


    const icon =
        toast.querySelector("i");


    if (type === "error") {

        icon.className =
            "fa-solid fa-circle-exclamation";

        icon.style.color =
            "#ef4444";

    } else {

        icon.className =
            "fa-solid fa-circle-check";

        icon.style.color =
            "#16a34a";

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 4000);

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            const navbar =
                document.getElementById(
                    "navbar"
                );

            if (navbar) {

                navbar.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =========================================================
   PREVENT EMPTY SOCIAL LINKS
========================================================= */

document
    .querySelectorAll(
        '.social-links a[href="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showToast(
                    "Social media link coming soon."
                );

            }
        );

    });
    /* =========================
   PORTFOLIO FILTER
========================= */

const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioCards = document.querySelectorAll(".portfolio-card");

portfolioFilters.forEach(filter => {

  filter.addEventListener("click", () => {

    const selectedCategory = filter.dataset.filter;

    portfolioFilters.forEach(btn => {
      btn.classList.remove("active");
    });

    filter.classList.add("active");

    portfolioCards.forEach(card => {

      const cardCategory = card.dataset.category;

      if (
        selectedCategory === "all" ||
        cardCategory === selectedCategory
      ) {

        card.classList.remove("hidden");

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* =========================
   PORTFOLIO IMAGE MODAL
========================= */

function openPortfolioImage(image, title) {

  const modal = document.getElementById("portfolioModal");
  const modalImage = document.getElementById("portfolioModalImage");
  const modalTitle = document.getElementById("portfolioModalTitle");

  modalImage.src = image;
  modalTitle.textContent = title;

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}


function closePortfolioImage() {

  const modal = document.getElementById("portfolioModal");

  modal.classList.remove("active");

  document.body.style.overflow = "";

}


/* CLOSE WHEN CLICKING OUTSIDE */

const portfolioModal = document.getElementById("portfolioModal");

if (portfolioModal) {

  portfolioModal.addEventListener("click", function(event) {

    if (event.target === portfolioModal) {
      closePortfolioImage();
    }

  });

}


/* CLOSE WITH ESCAPE */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closePortfolioImage();
  }

});
/* =========================================================
   SERVICE SUB-SERVICE ACCORDION
========================================================= */

document.querySelectorAll(".subservice-toggle").forEach(button => {

  button.addEventListener("click", function () {

    const currentCard = this.closest(".expandable-service");

    const isAlreadyOpen = currentCard.classList.contains("expanded");

    // Close all other service cards
    document.querySelectorAll(".expandable-service").forEach(card => {
      card.classList.remove("expanded");
    });

    // Open the selected card if it wasn't already open
    if (!isAlreadyOpen) {
      currentCard.classList.add("expanded");
    }

  });

});
