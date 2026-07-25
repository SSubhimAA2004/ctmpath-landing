
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 3.0
   Status      : 🔒 LOCKED
   Architecture: Multi-Page Application (MPA)

   Purpose
   --------------------------------------------------------------------------
   Shared Application Core

   Responsibilities

   ✓ Create CTM Namespace
   ✓ Create Global State
   ✓ Store Application Metadata
   ✓ Journey Reset
   ✓ Shared Utility Methods

   Does NOT

   ✗ Perform Routing
   ✗ Initialize Page Controllers
   ✗ Handle Registration
   ✗ Handle Assessment
   ✗ Communicate with Google Apps Script

========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   APPLICATION CORE
========================================================================== */

window.CTM.App = (() => {

    /* ======================================================================
       APPLICATION CONSTANTS
    ====================================================================== */

    const VERSION = "3.0";

    const APPLICATION_NAME = "CTM PATH™";

    /* ======================================================================
       GLOBAL STATE
    ====================================================================== */

    const state = {

        visitorId: null,

        visitor: null,

        registration: null,

        assessment: null,

        kalaChakra: null,

        diagnosis: null,

        prescription: null,

        language: "ta",

        startedAt: null

    };

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function initialize() {

        state.startedAt = new Date().toISOString();

    }

                      /* ======================================================================
       GET STATE
    ====================================================================== */

    function getState() {

        return state;

    }

    /* ======================================================================
       SET VISITOR
    ====================================================================== */

    function setVisitor(visitor) {

        state.visitor = visitor || null;

        if (visitor && visitor.visitorId) {

            state.visitorId = visitor.visitorId;

        }

    }

    /* ======================================================================
       SET LANGUAGE
    ====================================================================== */

    function setLanguage(language) {

        state.language = language || "ta";

    }

    /* ======================================================================
       RESET JOURNEY
    ====================================================================== */

    function reset() {

        state.visitorId = null;

        state.visitor = null;

        state.registration = null;

        state.assessment = null;

        state.kalaChakra = null;

        state.diagnosis = null;

        state.prescription = null;

        state.language = "ta";

        state.startedAt = new Date().toISOString();

        if (

            window.StorageService &&

            typeof window.StorageService.resetJourney === "function"

        ) {

            window.StorageService.resetJourney();

        }

    }

    /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        VERSION,

        APPLICATION_NAME,

        initialize,

        getState,

        setVisitor,

        setLanguage,

        reset

    };

})();

/* ==========================================================================
   AUTO INITIALIZATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        window.CTM.App.initialize();

    }

);

/* ==========================================================================
   END OF FILE
========================================================================== */
