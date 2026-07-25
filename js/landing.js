
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : landing.js
   Version     : 3.0
   Status      : 🔒 LOCKED
   Purpose     : Landing Page Controller

                  Owns
                  • Landing Page Initialization
                  • Begin Journey Button
                  • Journey Reset
                  • Entrance Animation

   ========================================================================== */

(() => {

    'use strict';

    const Landing = {

        /* ==========================================================
           INITIALIZE
           ========================================================== */

        init() {

            this.resetJourney();

            this.cacheElements();

            this.bindEvents();

            this.animate();

        },

        /* ==========================================================
           RESET
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

        cacheElements() {

            this.startButton =
                document.querySelector(".primary-button");

        },

        /* ==========================================================
           EVENTS
           ========================================================== */

        bindEvents() {

            if (this.startButton) {

                this.startButton.addEventListener(
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
           SIMPLE ENTRANCE ANIMATION
           ========================================================== */

        animate() {

            const card =
                document.querySelector(".landing-card");

            if (!card) return;

            card.style.opacity = "0";
            card.style.transform = "translateY(24px)";

            requestAnimationFrame(() => {

                card.style.transition =
                    "opacity .6s ease, transform .6s ease";

                card.style.opacity = "1";
                card.style.transform = "translateY(0)";

            });

        }

    };

    /* ==============================================================
       AUTO START
       ============================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        () => Landing.init()
    );

})();

