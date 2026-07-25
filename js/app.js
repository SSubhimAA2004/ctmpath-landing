
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : js/app.js
   Version     : 8.0
   Status      : PRODUCTION
   Architecture: LOCKED

   Responsibility
   --------------------------------------------------------------------------
   • Bootstrap Application
   • Create Global State
   • Initialize Core Modules
   • Coordinate Startup

   This file SHALL NOT

   ✗ Perform Registration
   ✗ Call Google Apps Script
   ✗ Validate Forms
   ✗ Navigate Business Logic
   ✗ Calculate Assessment

========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   APPLICATION MODULE
========================================================================== */

window.CTM.App = (function () {

    /* ======================================================================
       APPLICATION STATE
    ====================================================================== */

    function createInitialState() {

        return {

            visitorId: "",

            visitor: {},

            registration: {},

            assessment: {},

            scores: {},

            diagnosis: {},

            prescription: {},

            currentScreen: "screen01",

            language: "en",

            startedAt: new Date().toISOString()

        };

    }

    /* ======================================================================
       INITIALIZE APPLICATION
    ====================================================================== */

    function initialize() {

        window.CTM.state = createInitialState();

        initializeModules();

    }

                      /* ======================================================================
       INITIALIZE MODULES
    ====================================================================== */

    function initializeModules() {

        if (

            window.CTM.Router &&

            typeof window.CTM.Router.initialize === "function"

        ) {

            window.CTM.Router.initialize();

        }

        if (

            window.CTM.Registration &&

            typeof window.CTM.Registration.initialize === "function"

        ) {

            window.CTM.Registration.initialize();

        }

    }

    /* ======================================================================
       START APPLICATION
    ====================================================================== */

    function startApplication() {

        if (

            window.CTM.Router &&

            typeof window.CTM.Router.go === "function"

        ) {

            window.CTM.Router.go("screen01");

        }

    }

    /* ======================================================================
       RESET APPLICATION
    ====================================================================== */

    function resetApplication() {

        window.CTM.state = createInitialState();

        if (

            window.CTM.Registration &&

            typeof window.CTM.Registration.resetForm === "function"

        ) {

            window.CTM.Registration.resetForm();

        }

        startApplication();

    }

                      /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        initialize,

        startApplication,

        resetApplication

    };

})();

/* ==========================================================================
   AUTO INITIALIZATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        if (

            window.CTM.App &&

            typeof window.CTM.App.initialize === "function"

        ) {

            window.CTM.App.initialize();

        }

    }

);

/* ==========================================================================
   END OF FILE
========================================================================== */
