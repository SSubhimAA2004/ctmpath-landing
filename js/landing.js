
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : landing.js
   Version     : 2.0
   Status      : 🔒 LOCKED
   Purpose     : Landing Page Controller

                  Owns
                  • Landing Page Initialization
                  • Begin Journey Button
                  • Journey Reset
                  • Navigation

                  Owns NO
                  • Assessment Logic
                  • Storage Logic
                  • API Logic
                  • Business Rules
   ========================================================================== */

'use strict';

/* ==========================================================================
   LANDING CONTROLLER
   ========================================================================== */

const LandingPage = (() => {

    /* ======================================================================
       ELEMENTS
       ====================================================================== */

    let beginButton = null;

    /* ======================================================================
       CACHE DOM
       ====================================================================== */

    function cacheDom() {

        beginButton = document.getElementById(

            'beginJourneyButton'

        );

    }

    /* ======================================================================
       EVENTS
       ====================================================================== */

    function bindEvents() {

        if (beginButton) {

            beginButton.addEventListener(

                'click',

                startJourney

            );

        }

    }

    /* ======================================================================
       START JOURNEY
       ====================================================================== */

    function startJourney() {

        /*
            A completely new visitor always begins with
            a clean session.
        */

        App.reset();

        Router.go(

            Router.ROUTES.REGISTRATION

        );

    }

    /* ======================================================================
       ANIMATION
       ====================================================================== */

    function animate() {

        document.body.classList.add(

            'landing-loaded'

        );

    }

    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function init() {

        cacheDom();

        bindEvents();

        animate();

        console.info(

            'CTM PATH™ Landing Page Ready.'

        );

    }

    /* ======================================================================
       PUBLIC
       ====================================================================== */

    return {

        init

    };

})();

/* ==========================================================================
   PAGE LOAD
   ========================================================================== */

document.addEventListener(

    'DOMContentLoaded',

    () => {

        LandingPage.init();

    }

);

/* ==========================================================================
   End of File

   File   : landing.js

   Status : 🔒 LOCKED
   ========================================================================== */

