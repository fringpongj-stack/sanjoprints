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
const WHATSAPP_NUMBER = "2547462855644";


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
const serviceSelect = document.getElementById("inquireService");
const specificService = document.getElementById("specificService");

const services = {
  printing: [
    "Black & White Printing",
    "Colour Printing",
    "Photocopying",
    "Large Format Printing"
  ],

  scanning: [
    "Document Scanning",
    "Photo Scanning",
    "ID Scanning"
  ],

  computer: [
    "Typing",
    "Document Editing",
    "CV Preparation",
    "Internet Services",
    "File Conversion"
  ],

  graphic: [
    "Logo Design",
    "Poster Design",
    "Flyer Design",
    "Business Card Design",
    "Social Media Design",
    "Banner Design"
  ],

  kra: [
    "KRA PIN Registration",
    "KRA PIN Retrieval",
    "Tax Returns",
    "Tax Compliance Certificate",
    "iTax Services"
  ],

  passport: [
    "Passport Photos",
    "Visa Photos",
    "ID Photos"
  ],

  online: [
    "Job Applications",
    "College Applications",
    "Government Applications",
    "Online Account Registration"
  ],

  binding: [
    "Spiral Binding",
    "Comb Binding",
    "Book Binding"
  ],

  lamination: [
    "A4 Lamination",
    "A3 Lamination",
    "ID Card Lamination",
    "Document Lamination"
  ]
};

serviceSelect.addEventListener("change", function () {
  const selectedService = this.value;

  // Clear previous options
  specificService.innerHTML =
    '<option value="">Choose specific service</option>';

  // If nothing selected
  if (!selectedService) {
    specificService.style.display = "none";
    specificService.required = false;
    return;
  }

  // Add specific services
  services[selectedService].forEach(function (service) {
    const option = document.createElement("option");

    option.value = service;
    option.textContent = service;

    specificService.appendChild(option);
  });

  specificService.style.display = "block";
  specificService.required = true;
});

// Hide it when page loads
specificService.style.display = "none";
specificService.required = false;
  });

});
/* ==========================================================
   SANJO PRINTS — DYNAMIC INQUIRY SYSTEM
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("dynamicInquiryForm");

  if (!form) return;


  /* ==========================================================
     SERVICE DATA
  ========================================================== */

  const serviceData = {

    "Printing & Photocopying": [

      {
        name: "Book Printing",
        icon: "fa-book",
        fields: "printing"
      },

      {
        name: "Booklet Printing",
        icon: "fa-book-open",
        fields: "printing"
      },

      {
        name: "Brochure Printing",
        icon: "fa-file-lines",
        fields: "printing"
      },

      {
        name: "Business Card Printing",
        icon: "fa-address-card",
        fields: "printing"
      },

      {
        name: "Flyer Printing",
        icon: "fa-file",
        fields: "printing"
      },

      {
        name: "Poster Printing",
        icon: "fa-image",
        fields: "printing"
      },

      {
        name: "Calendar Printing",
        icon: "fa-calendar",
        fields: "printing"
      }

    ],


    /* =========================
       BINDING
    ========================= */

    "Binding": [

      {
        name: "Spiral Binding",
        icon: "fa-circle-notch",
        fields: "spiralBinding"
      },

      {
        name: "Comb Binding",
        icon: "fa-bars",
        fields: "combBinding"
      },

      {
        name: "Tape Binding",
        icon: "fa-tape",
        fields: "tapeBinding"
      },

      {
        name: "Hard Cover Binding",
        icon: "fa-book-open",
        fields: "hardCoverBinding"
      },

      {
        name: "Soft Cover Binding",
        icon: "fa-file",
        fields: "softCoverBinding"
      },

      {
        name: "Project Binding",
        icon: "fa-folder",
        fields: "projectBinding"
      }

    ],


    /* =========================
       LAMINATION
    ========================= */

    "Lamination": [

      {
        name: "A4 Lamination",
        icon: "fa-file",
        fields: "lamination"
      },

      {
        name: "A3 Lamination",
        icon: "fa-file",
        fields: "lamination"
      },

      {
        name: "ID Card Lamination",
        icon: "fa-id-card",
        fields: "lamination"
      },

      {
        name: "Certificate Lamination",
        icon: "fa-certificate",
        fields: "lamination"
      },

      {
        name: "Photo Lamination",
        icon: "fa-image",
        fields: "lamination"
      },

      {
        name: "Document Lamination",
        icon: "fa-file-lines",
        fields: "lamination"
      }

    ],


    /* =========================
       SCANNING
    ========================= */

    "Scanning": [

      {
        name: "Document Scanning",
        icon: "fa-file-lines",
        fields: "scanning"
      },

      {
        name: "Photo Scanning",
        icon: "fa-image",
        fields: "scanning"
      },

      {
        name: "ID Scanning",
        icon: "fa-id-card",
        fields: "scanning"
      },

      {
        name: "Passport Scanning",
        icon: "fa-passport",
        fields: "scanning"
      },

      {
        name: "Bulk Document Scanning",
        icon: "fa-files",
        fields: "scanning"
      },

      {
        name: "Scan to PDF",
        icon: "fa-file-pdf",
        fields: "scanning"
      },

      {
        name: "Scan to Email",
        icon: "fa-envelope",
        fields: "scanning"
      }

    ],


    /* =========================
       GRAPHIC DESIGN
    ========================= */

    "Graphic Design": [

      {
        name: "Logo Design",
        icon: "fa-pen-nib",
        fields: "design"
      },

      {
        name: "Business Card Design",
        icon: "fa-address-card",
        fields: "design"
      },

      {
        name: "Poster Design",
        icon: "fa-image",
        fields: "design"
      },

      {
        name: "Flyer Design",
        icon: "fa-file",
        fields: "design"
      },

      {
        name: "Brochure Design",
        icon: "fa-book-open",
        fields: "design"
      },

      {
        name: "Banner Design",
        icon: "fa-panorama",
        fields: "design"
      },

      {
        name: "Invitation Design",
        icon: "fa-envelope",
        fields: "design"
      },

      {
        name: "Certificate Design",
        icon: "fa-certificate",
        fields: "design"
      },

      {
        name: "Social Media Design",
        icon: "fa-share-nodes",
        fields: "design"
      },

      {
        name: "Letterhead Design",
        icon: "fa-file-lines",
        fields: "design"
      }

    ],


    /* =========================
       KRA
    ========================= */

    "KRA Services": [

      {
        name: "KRA PIN Registration",
        icon: "fa-id-card",
        fields: "kra"
      },

      {
        name: "KRA Returns",
        icon: "fa-file-invoice",
        fields: "kra"
      },

      {
        name: "KRA PIN Retrieval",
        icon: "fa-key",
        fields: "kra"
      },

      {
        name: "KRA Account Assistance",
        icon: "fa-user",
        fields: "kra"
      }

    ],


    /* =========================
       PASSPORT
    ========================= */

    "Passport Photos": [

      {
        name: "Passport Photo",
        icon: "fa-camera",
        fields: "passport"
      },

      {
        name: "Visa Photo",
        icon: "fa-image",
        fields: "passport"
      },

      {
        name: "ID Photo",
        icon: "fa-id-card",
        fields: "passport"
      }

    ],


    /* =========================
       ONLINE APPLICATIONS
    ========================= */

    "Online Applications": [

      {
        name: "Government Application",
        icon: "fa-building",
        fields: "online"
      },

      {
        name: "Job Application",
        icon: "fa-briefcase",
        fields: "online"
      },

      {
        name: "School / University Application",
        icon: "fa-graduation-cap",
        fields: "online"
      },

      {
        name: "Other Online Application",
        icon: "fa-globe",
        fields: "online"
      }

    ],


    /* =========================
       STATIONERY
    ========================= */

    "Stationery": [

      {
        name: "Receipt Books",
        icon: "fa-receipt",
        fields: "stationery"
      },

      {
        name: "Invoice Books",
        icon: "fa-file-invoice",
        fields: "stationery"
      },

      {
        name: "Letterheads",
        icon: "fa-file-lines",
        fields: "stationery"
      },

      {
        name: "Business Cards",
        icon: "fa-address-card",
        fields: "stationery"
      }

    ]

  };


  /* ==========================================================
     STATE
  ========================================================== */

  let inquiry = {

    service: "",

    subservice: "",

    fieldType: "",

    details: {}

  };


  /* ==========================================================
     ELEMENTS
  ========================================================== */

  const steps = document.querySelectorAll(".inquiry-step");

  const progressSteps =
    document.querySelectorAll(".progress-step");

  const subserviceContainer =
    document.getElementById("subserviceContainer");

  const specificFields =
    document.getElementById("specificFields");

  const selectedServiceText =
    document.getElementById("selectedServiceText");

  const selectedSubserviceText =
    document.getElementById("selectedSubserviceText");

  const inquiryReview =
    document.getElementById("inquiryReview");


  /* ==========================================================
     CHANGE STEP
  ========================================================== */

  function goToStep(number) {

    steps.forEach(step => {

      step.classList.toggle(
        "active",
        Number(step.dataset.stepContent) === number
      );

    });


    progressSteps.forEach(step => {

      const stepNumber =
        Number(step.dataset.step);

      step.classList.toggle(
        "active",
        stepNumber <= number
      );

    });

  }


  /* ==========================================================
     SERVICE SELECTED
  ========================================================== */

  document.querySelectorAll(".service-choice")
    .forEach(button => {

      button.addEventListener("click", () => {

        inquiry.service =
          button.dataset.service;

        inquiry.subservice = "";

        inquiry.details = {};

        selectedServiceText.textContent =
          inquiry.service;


        renderSubservices();

        goToStep(2);

      });

    });


  /* ==========================================================
     RENDER SUBSERVICES
  ========================================================== */

  function renderSubservices() {

    subserviceContainer.innerHTML = "";

    const services =
      serviceData[inquiry.service] || [];


    services.forEach(item => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "subservice-option";


      button.innerHTML = `

        <span class="subservice-option-left">

          <input type="radio"
                 name="selectedSubservice">

          <i class="fa-solid ${item.icon}"></i>

          <strong>${item.name}</strong>

        </span>

        <i class="fa-solid fa-chevron-right"></i>

      `;


      button.addEventListener("click", () => {

        inquiry.subservice =
          item.name;

        inquiry.fieldType =
          item.fields;


        selectedSubserviceText.textContent =
          item.name;


        renderSpecificFields(item.fields);


        goToStep(3);

      });


      subserviceContainer.appendChild(button);

    });

  }


  /* ==========================================================
     SPECIFIC FIELDS
  ========================================================== */

  function renderSpecificFields(type) {

    let html = "";


    /* =========================
       GENERAL PRINTING
    ========================= */

    if (type === "printing") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              placeholder="e.g. 10"
              required>

          </div>


          <div class="form-group">

            <label>Paper Size *</label>

            <select name="paperSize" required>

              <option value="">Choose size</option>
              <option>A4</option>
              <option>A3</option>
              <option>A5</option>
              <option>Other</option>

            </select>

          </div>


          <div class="form-group">

            <label>Print Colour *</label>

            <select name="printColor" required>

              <option value="">Choose</option>
              <option>Black & White</option>
              <option>Colour</option>

            </select>

          </div>


          <div class="form-group">

            <label>Pages</label>

            <input
              type="number"
              name="pages"
              min="1"
              placeholder="Number of pages">

          </div>


          <div class="form-group specific-field-full">

            <label>Upload Document</label>

            <div class="file-upload">

              <i class="fa-solid fa-cloud-arrow-up"></i>

              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">

              <small>
                PDF, DOC, DOCX, JPG or PNG
              </small>

            </div>

          </div>

        </div>

      `;

    }


    /* =========================
       SPIRAL / COMB / TAPE
    ========================= */

    else if (
      type === "spiralBinding" ||
      type === "combBinding" ||
      type === "tapeBinding"
    ) {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              placeholder="e.g. 2"
              required>

          </div>


          <div class="form-group">

            <label>Number of Pages *</label>

            <input
              type="number"
              name="pages"
              min="1"
              placeholder="e.g. 85"
              required>

          </div>


          <div class="form-group">

            <label>Paper Size *</label>

            <select name="paperSize" required>

              <option value="">Choose size</option>
              <option>A4</option>
              <option>A3</option>
              <option>A5</option>

            </select>

          </div>


          <div class="form-group">

            <label>Cover Type *</label>

            <select name="coverType" required>

              <option value="">Choose cover</option>
              <option>Clear Front Cover</option>
              <option>Black Front & Back</option>
              <option>Clear Front & Back</option>
              <option>Card Cover</option>

            </select>

          </div>


          <div class="form-group specific-field-full">

            <label>Upload Document</label>

            <div class="file-upload">

              <i class="fa-solid fa-cloud-arrow-up"></i>

              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx">

              <small>
                Upload your project/document
              </small>

            </div>

          </div>


          <div class="form-group specific-field-full">

            <label>Additional Instructions</label>

            <textarea
              name="instructions"
              rows="3"
              placeholder="Any special instructions?">
            </textarea>

          </div>

        </div>

      `;

    }


    /* =========================
       HARD COVER
    ========================= */

    else if (type === "hardCoverBinding") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Number of Pages *</label>

            <input
              type="number"
              name="pages"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Paper Size *</label>

            <select name="paperSize" required>

              <option value="">Choose size</option>
              <option>A4</option>
              <option>A3</option>
              <option>A5</option>

            </select>

          </div>


          <div class="form-group">

            <label>Cover Colour</label>

            <select name="coverColor">

              <option>Black</option>
              <option>Blue</option>
              <option>Red</option>
              <option>Green</option>
              <option>Other</option>

            </select>

          </div>


          <div class="form-group specific-field-full">

            <label>Title / Text on Cover</label>

            <input
              type="text"
              name="coverText"
              placeholder="e.g. PROJECT REPORT 2026">

          </div>


          <div class="form-group specific-field-full">

            <label>Upload Document</label>

            <div class="file-upload">

              <i class="fa-solid fa-cloud-arrow-up"></i>

              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx">

            </div>

          </div>

        </div>

      `;

    }


    /* =========================
       SOFT COVER
    ========================= */

    else if (type === "softCoverBinding") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Number of Pages *</label>

            <input
              type="number"
              name="pages"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Paper Size *</label>

            <select name="paperSize" required>

              <option value="">Choose size</option>
              <option>A4</option>
              <option>A5</option>

            </select>

          </div>


          <div class="form-group">

            <label>Cover Type</label>

            <select name="coverType">

              <option>Clear Cover</option>
              <option>Card Cover</option>
              <option>Printed Cover</option>

            </select>

          </div>


          <div class="form-group specific-field-full">

            <label>Upload Document</label>

            <div class="file-upload">

              <i class="fa-solid fa-cloud-arrow-up"></i>

              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx">

            </div>

          </div>

        </div>

      `;

    }


    /* =========================
       PROJECT BINDING
    ========================= */

    else if (type === "projectBinding") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Number of Pages *</label>

            <input
              type="number"
              name="pages"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Paper Size *</label>

            <select name="paperSize" required>

              <option value="">Choose size</option>
              <option>A4</option>
              <option>A3</option>

            </select>

          </div>


          <div class="form-group">

            <label>Project Type</label>

            <select name="projectType">

              <option>University Project</option>
              <option>School Project</option>
              <option>Research Project</option>
              <option>Business Report</option>
              <option>Other</option>

            </select>

          </div>


          <div class="form-group specific-field-full">

            <label>Upload Project</label>

            <div class="file-upload">

              <i class="fa-solid fa-cloud-arrow-up"></i>

              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx">

            </div>

          </div>


          <div class="form-group specific-field-full">

            <label>Additional Instructions</label>

            <textarea
              name="instructions"
              rows="3"
              placeholder="Tell us anything else we should know">
            </textarea>

          </div>

        </div>

      `;

    }


    /* =========================
       LAMINATION
    ========================= */

    else if (type === "lamination") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Material Type</label>

            <select name="materialType">

              <option>Document</option>
              <option>Certificate</option>
              <option>ID Card</option>
              <option>Photo</option>
              <option>Other</option>

            </select>

          </div>


          <div class="form-group">

            <label>Finish</label>

            <select name="finish">

              <option>Glossy</option>
              <option>Matte</option>

            </select>

          </div>


          <div class="form-group">

            <label>Thickness</label>

            <select name="thickness">

              <option>75 microns</option>
              <option>125 microns</option>

            </select>

          </div>

        </div>

      `;

    }


    /* =========================
       SCANNING
    ========================= */

    else if (type === "scanning") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Pages *</label>

            <input
              type="number"
              name="pages"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Scan Type</label>

            <select name="scanType">

              <option>Black & White</option>
              <option>Colour</option>

            </select>

          </div>


          <div class="form-group">

            <label>Output Format</label>

            <select name="outputFormat">

              <option>PDF</option>
              <option>JPG</option>
              <option>PNG</option>

            </select>

          </div>


          <div class="form-group">

            <label>Send To</label>

            <select name="delivery">

              <option>Email</option>
              <option>WhatsApp</option>
              <option>USB</option>
              <option>Collect at shop</option>

            </select>

          </div>

        </div>

      `;

    }


    /* =========================
       GRAPHIC DESIGN
    ========================= */

    else if (type === "design") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group specific-field-full">

            <label>Design Purpose *</label>

            <input
              type="text"
              name="designPurpose"
              placeholder="What will the design be used for?"
              required>

          </div>


          <div class="form-group">

            <label>Preferred Style</label>

            <input
              type="text"
              name="style"
              placeholder="Modern, professional, simple...">

          </div>


          <div class="form-group">

            <label>Preferred Colours</label>

            <input
              type="text"
              name="colors"
              placeholder="e.g. Blue and white">

          </div>


          <div class="form-group specific-field-full">

            <label>Upload Reference</label>

            <div class="file-upload">

              <i class="fa-solid fa-cloud-arrow-up"></i>

              <input
                type="file"
                name="reference"
                accept="image/*,.pdf">

            </div>

          </div>


          <div class="form-group specific-field-full">

            <label>Design Instructions</label>

            <textarea
              name="instructions"
              rows="4"
              placeholder="Tell us what you want designed">
            </textarea>

          </div>

        </div>

      `;

    }


    /* =========================
       KRA
    ========================= */

    else if (type === "kra") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Service Type *</label>

            <select name="kraType" required>

              <option value="">Choose</option>
              <option>PIN Registration</option>
              <option>Returns</option>
              <option>PIN Retrieval</option>
              <option>Account Assistance</option>

            </select>

          </div>


          <div class="form-group">

            <label>KRA PIN</label>

            <input
              type="text"
              name="kraPin"
              placeholder="If applicable">

          </div>


          <div class="form-group specific-field-full">

            <label>What assistance do you need?</label>

            <textarea
              name="instructions"
              rows="4"
              placeholder="Describe what you need help with">
            </textarea>

          </div>

        </div>

      `;

    }


    /* =========================
       PASSPORT
    ========================= */

    else if (type === "passport") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Number of Copies *</label>

            <input
              type="number"
              name="copies"
              min="1"
              value="1"
              required>

          </div>


          <div class="form-group">

            <label>Photo Type</label>

            <select name="photoType">

              <option>Passport</option>
              <option>Visa</option>
              <option>ID</option>

            </select>

          </div>


          <div class="form-group specific-field-full">

            <label>Additional Instructions</label>

            <textarea
              name="instructions"
              rows="3"
              placeholder="Any special requirements?">
            </textarea>

          </div>

        </div>

      `;

    }


    /* =========================
       ONLINE
    ========================= */

    else if (type === "online") {

      html = `

        <div class="form-group">

          <label>What application do you need help with? *</label>

          <textarea
            name="instructions"
            rows="5"
            required
            placeholder="Tell us what you need help applying for...">
          </textarea>

        </div>

      `;

    }


    /* =========================
       STATIONERY
    ========================= */

    else if (type === "stationery") {

      html = `

        <div class="specific-fields-grid">

          <div class="form-group">

            <label>Quantity *</label>

            <input
              type="number"
              name="quantity"
              min="1"
              required>

          </div>


          <div class="form-group">

            <label>Size</label>

            <select name="paperSize">

              <option>A4</option>
              <option>A5</option>
              <option>Other</option>

            </select>

          </div>


          <div class="form-group specific-field-full">

            <label>Additional Instructions</label>

            <textarea
              name="instructions"
              rows="4"
              placeholder="Tell us what you need">
            </textarea>

          </div>

        </div>

      `;

    }


    specificFields.innerHTML = html;


    /* File display */

    const fileInputs =
      specificFields.querySelectorAll(
        'input[type="file"]'
      );

    fileInputs.forEach(input => {

      input.addEventListener("change", () => {

        if (input.files.length) {

          input.parentElement.querySelector("small")
            .textContent =
            input.files[0].name;

        }

      });

    });

  }


  /* ==========================================================
     NEXT FROM STEP 3
  ========================================================== */

  const step3 =
    document.querySelector(
      '[data-step-content="3"]'
    );


  const nextButton =
    document.createElement("button");

  nextButton.type = "button";

  nextButton.className =
    "btn btn-primary";

  nextButton.innerHTML =
    `Continue <i class="fa-solid fa-arrow-right"></i>`;


  step3.appendChild(nextButton);


  nextButton.addEventListener("click", () => {

    if (!validateSpecificFields()) {
      return;
    }

    collectSpecificDetails();

    buildReview();

    goToStep(4);

  });


  /* ==========================================================
     VALIDATE STEP 3
  ========================================================== */

  function validateSpecificFields() {

    const fields =
      specificFields.querySelectorAll(
        "input, select, textarea"
      );

    for (const field of fields) {

      if (
        field.hasAttribute("required") &&
        !field.value.trim()
      ) {

        field.focus();

        field.reportValidity();

        return false;

      }

    }

    return true;

  }


  /* ==========================================================
     COLLECT DETAILS
  ========================================================== */

  function collectSpecificDetails() {

    inquiry.details = {};

    const fields =
      specificFields.querySelectorAll(
        "input, select, textarea"
      );


    fields.forEach(field => {

      if (field.type === "file") {

        if (field.files.length) {

          inquiry.details[field.name] =
            field.files[0].name;

        }

      }

      else if (field.value.trim()) {

        inquiry.details[field.name] =
          field.value.trim();

      }

    });

  }


  /* ==========================================================
     REVIEW
  ========================================================== */

  function buildReview() {

    let html = `

      <div class="review-title">
        Your Service
      </div>

      <div class="review-row">
        <span>Service</span>
        <strong>${escapeHtml(inquiry.service)}</strong>
      </div>

      <div class="review-row">
        <span>Specific Service</span>
        <strong>${escapeHtml(inquiry.subservice)}</strong>
      </div>

    `;


    Object.entries(inquiry.details)
      .forEach(([key, value]) => {

        const label =
          formatLabel(key);

        html += `

          <div class="review-row">

            <span>${escapeHtml(label)}</span>

            <strong>
              ${escapeHtml(value)}
            </strong>

          </div>

        `;

      });


    inquiryReview.innerHTML = html;

  }


  /* ==========================================================
     FORMAT FIELD LABEL
  ========================================================== */

  function formatLabel(text) {

    return text

      .replace(/([A-Z])/g, " $1")

      .replace(/^./, char =>
        char.toUpperCase()
      );

  }


  /* ==========================================================
     BACK BUTTONS
  ========================================================== */

  document.querySelectorAll(".back-step")
    .forEach(button => {

      button.addEventListener("click", () => {

        const target =
          Number(button.dataset.back);

        goToStep(target);

      });

    });


  /* ==========================================================
     SUBMIT
  ========================================================== */

  form.addEventListener("submit", event => {

    event.preventDefault();


    const name =
      document.getElementById(
        "inquiryName"
      ).value.trim();


    const phone =
      document.getElementById(
        "inquiryPhone"
      ).value.trim();


    const email =
      document.getElementById(
        "inquiryEmail"
      ).value.trim();


    const preferred =
      document.getElementById(
        "preferredOption"
      ).value;


    if (!name || !phone) {

      alert(
        "Please enter your name and phone number."
      );

      return;

    }


    let message =

`*NEW SANJO PRINTS INQUIRY*

----------------------------

*CUSTOMER DETAILS*

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

----------------------------

*SERVICE*

Service: ${inquiry.service}
Specific Service: ${inquiry.subservice}

----------------------------

*ORDER DETAILS*
`;


    Object.entries(inquiry.details)
      .forEach(([key, value]) => {

        message +=
          `\n${formatLabel(key)}: ${value}`;

      });


    message += `

----------------------------

Preferred Option: ${preferred}

----------------------------

Sent from Sanjo Prints Website`;


    const whatsappNumber =
      "254742855644";


    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${
        encodeURIComponent(message)
      }`;


    window.open(
      whatsappURL,
      "_blank"
    );

  });


  /* ==========================================================
     ESCAPE HTML
  ========================================================== */

  function escapeHtml(value) {

    return String(value)

      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;")

      .replace(/'/g, "&#039;");

  }


});
