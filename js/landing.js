
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : landing.js
   Version     : 4.0
   Status      : 🔒 LOCKED
   Purpose     : Landing Page Controller

                  Owns
                  • Landing Page Initialization
                  • Journey Reset
                  • CTA Navigation
                  • Premium Entrance Animation
                  • Interactive Card Effects

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

            this.animateEntrance();

            this.enableCardEffects();

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
           CACHE ELEMENTS
           ========================================================== */

        cacheDOM() {

            this.hero =
                document.querySelector(".hero");

            this.discoverCards =
                document.querySelectorAll(".discover-card");

            this.areaCards =
                document.querySelectorAll(".area-card");

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
           START JOURNEY
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
           PAGE ENTRANCE
           ========================================================== */

        animateEntrance() {

            const sections = document.querySelectorAll(

                ".hero,\
                 .discover,\
                 .life-areas,\
                 .closing-message,\
                 .landing-cta"

            );

            sections.forEach((section, index) => {

                section.style.opacity = "0";

                section.style.transform =
                    "translateY(30px)";

                section.style.transition =
                    "opacity .7s ease, transform .7s ease";

                setTimeout(() => {

                    section.style.opacity = "1";

                    section.style.transform =
                        "translateY(0)";

                }, 180 * index);

            });

        },

        /* ==========================================================
           CARD INTERACTION
           ========================================================== */

        enableCardEffects() {

            const cards = [

                ...this.discoverCards,

                ...this.areaCards

            ];

            cards.forEach(card => {

                card.addEventListener("mouseenter", () => {

                    card.style.transform =
                        "translateY(-8px) scale(1.02)";

                });

                card.addEventListener("mouseleave", () => {

                    card.style.transform =
                        "translateY(0) scale(1)";

                });

            });

        }

    };

    /* ==============================================================
       DOM READY
       ============================================================== */

    document.addEventListener(

        "DOMContentLoaded",

        () => Landing.init()

    );

})();

