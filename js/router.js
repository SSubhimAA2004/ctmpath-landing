
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : js/router.js
   Version     : 8.0
   Status      : PRODUCTION
   Architecture: LOCKED

   Responsibility
   --------------------------------------------------------------------------
   • Screen Navigation
   • Route Management
   • Screen Visibility

   This file SHALL NOT

   ✗ Call Google Apps Script
   ✗ Access Google Sheets
   ✗ Perform Validation
   ✗ Manipulate Assessment Data
   ✗ Generate Reports

========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

window.CTM.Router = (function () {

    /* ======================================================================
       ROUTES
    ====================================================================== */

    const ROUTES = {

        landing: "screen01",

        registration: "screen02",

        assessment: "screen03",

        kalaChakra: "screen04",

        diagnosis: "screen05",

        prescription: "screen06",

        completion: "screen07"

    };

    /* ======================================================================
       MODULE STATE
    ====================================================================== */

    let currentScreen = null;

    let screenElements = [];

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function initialize() {

        screenElements = Array.from(

            document.querySelectorAll(

                ".screen"

            )

        );

        go(

            ROUTES.landing

        );

    }

                         /* ======================================================================
       HIDE ALL SCREENS
    ====================================================================== */

    function hideAllScreens() {

        screenElements.forEach(function (screen) {

            screen.classList.remove(

                "active"

            );

            screen.setAttribute(

                "aria-hidden",

                "true"

            );

        });

    }

    /* ======================================================================
       SHOW SCREEN
    ====================================================================== */

    function showScreen(screenId) {

        const screen =

            document.getElementById(

                screenId

            );

        if (!screen) {

            console.error(

                "Screen not found:",

                screenId

            );

            return false;

        }

        screen.classList.add(

            "active"

        );

        screen.setAttribute(

            "aria-hidden",

            "false"

        );

        currentScreen = screenId;

        return true;

    }

    /* ======================================================================
       SCROLL TO TOP
    ====================================================================== */

    function scrollToTop() {

        window.scrollTo({

            top: 0,

            left: 0,

            behavior: "instant"

        });

    }

    /* ======================================================================
       GO TO SCREEN
    ====================================================================== */

    function go(screenId) {

        hideAllScreens();

        if (

            !showScreen(

                screenId

            )

        ) {

            return false;

        }

        scrollToTop();

        return true;

    }

                         /* ======================================================================
       CURRENT SCREEN
    ====================================================================== */

    function current() {

        return currentScreen;

    }

    /* ======================================================================
       REFRESH CURRENT SCREEN
    ====================================================================== */

    function refresh() {

        if (!currentScreen) {

            return;

        }

        go(currentScreen);

    }

    /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        initialize,

        go,

        current,

        refresh,

        routes: ROUTES

    };

})();

/* ==========================================================================
   AUTO INITIALIZATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        window.CTM.Router.initialize();

    }

);

/* ==========================================================================
   END OF FILE
========================================================================== */
