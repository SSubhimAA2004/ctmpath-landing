
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/landing.js
   Version     : 4.0
   Status      : 🔒 LOCKED
   Architecture: Multi-Page Application (MPA)

   Purpose
   --------------------------------------------------------------------------
   Landing Page Controller

   Responsibilities

   ✓ Initialize Landing Page
   ✓ Reset Previous Journey
   ✓ Handle Begin Journey CTA
   ✓ Navigate to Registration Page

   Does NOT

   ✗ Call Google Apps Script
   ✗ Perform Registration
   ✗ Handle Assessment
   ✗ Perform Routing
   ✗ Contain Business Logic

========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.Landing = (() => {

    /* ======================================================================
       MODULE STATE
    ====================================================================== */

    const elements = {

        beginButton: null

    };

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function initialize() {

        cacheElements();

        resetJourney();

        bindEvents();

    }

    /* ======================================================================
       CACHE DOM
    ====================================================================== */

    function cacheElements() {

        elements.beginButton =

            document.querySelector(

                ".primary-button"

            );

    }

    /* ======================================================================
       RESET JOURNEY
    ====================================================================== */

    function resetJourney() {

        if (

            window.CTM.App &&

            typeof window.CTM.App.reset === "function"

        ) {

            window.CTM.App.reset();

        }

    }

    /* ======================================================================
       BIND EVENTS
    ====================================================================== */

    function bindEvents() {

        if (!elements.beginButton) {

            return;

        }

        elements.beginButton.addEventListener(

            "click",

            beginJourney

        );

    }

                          /* ======================================================================
       BEGIN JOURNEY
    ====================================================================== */

    function beginJourney() {

        window.location.href =

            "registration.html";

    }

    /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        initialize,

        beginJourney

    };

})();

/* ==========================================================================
   AUTO INITIALIZATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        if (

            window.CTM.Landing &&

            typeof window.CTM.Landing.initialize === "function"

        ) {

            window.CTM.Landing.initialize();

        }

    }

);

/* ==========================================================================
   END OF FILE
========================================================================== */
