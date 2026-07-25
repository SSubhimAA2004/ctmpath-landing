
/* ==========================================================================
   CTM PATH™ Guided Journey v3.1
   File        : js/landing.js
   Version     : 3.1
   Status      : 🔒 LOCKED
   Purpose     : Landing Page Controller

                  Owns
                  • Landing Page Initialization
                  • Journey Reset
                  • CTA Navigation
                  • Premium Entrance Animation
                  • Card Hover Enhancement
                  • Accessibility (Reduced Motion)

   ========================================================================== */

(() => {

    "use strict";

    const Landing = {

        /* ==========================================================
           INITIALIZE
           ========================================================== */

        init() {

            this.resetJourney();

            this.cacheDOM();

            this.bindEvents();

            this.initializeAnimations();

            this.initializeCardEffects();

        },

        /* ==========================================================
           RESET APPLICATION
           ========================================================== */

        resetJourney() {

            if (
                window.CTMApp &&
                typeof window.CTMApp.reset === "function"
            ) {

                window.CTMApp.reset();

            }

        },

        /* ==========================================================
           CACHE DOM
           ========================================================== */

        cacheDOM() {

            this.sections = [

                document.querySelector(".hero"),

                document.querySelector(".discover"),

                document.querySelector(".life-areas"),

                document.querySelector(".closing-message"),

                document.querySelector(".landing-cta")

            ].filter(Boolean);

            this.cards = [

                ...document.querySelectorAll(".discover-card"),

                ...document.querySelectorAll(".area-card")

            ];

            this.ctaButton =
                document.querySelector(".primary-button");

        },

        /* ==========================================================
           EVENTS
           ========================================================== */

        bindEvents() {

            if (this.ctaButton) {

                this.ctaButton.addEventListener(

                    "click",

                    this.beginJourney.bind(this)

                );

            }

        },

        /* ==========================================================
           BEGIN JOURNEY
           ========================================================== */

        beginJourney() {

            if (
                window.Router &&
                window.Router.ROUTES
            ) {

                window.Router.go(

                    window.Router.ROUTES.REGISTRATION

                );

            }

        },

        /* ==========================================================
           PAGE ANIMATION
           ========================================================== */

        initializeAnimations() {

            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {

                return;

            }

            this.sections.forEach((section, index) => {

                section.style.opacity = "0";

                section.style.transform =
                    "translateY(30px)";

                section.style.transition =
                    "opacity .75s ease, transform .75s ease";

                setTimeout(() => {

                    section.style.opacity = "1";

                    section.style.transform =
                        "translateY(0)";

                }, 180 * index);

            });

        },

        /* ==========================================================
           CARD EFFECTS
           ========================================================== */

        initializeCardEffects() {

            if (
                window.matchMedia(
                    "(hover: none)"
                ).matches
            ) {

                return;

            }

            this.cards.forEach(card => {

                card.addEventListener("mouseenter", () => {

                    card.style.transform =
                        "translateY(-8px)";

                });

                card.addEventListener("mouseleave", () => {

                    card.style.transform =
                        "translateY(0)";

                });

            });

        }

    };

    /* ==========================================================
       START
       ========================================================== */

    document.addEventListener(

        "DOMContentLoaded",

        () => Landing.init()

    );

})();

