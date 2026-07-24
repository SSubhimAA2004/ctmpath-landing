
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : app.js
   Version     : 1.0
   Status      : 🔒 LOCKED
   Purpose     : Application Bootstrap

                  Owns
                  • Application Initialization
                  • Global Configuration
                  • Shared Application State
                  • Startup Lifecycle

                  Owns NO
                  • Page Rendering
                  • Assessment Questions
                  • Business Calculations
                  • Page-specific Behaviour
   ========================================================================== */

'use strict';

/* ==========================================================================
   APPLICATION
   ========================================================================== */

const App = (() => {

    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        NAME: 'CTM PATH™ Guided Journey',

        VERSION: '2.0',

        LANGUAGE: 'ta-IN',

        AUTOSAVE: true,

        DEBUG: false

    };

    /* ======================================================================
       GLOBAL STATE
       ====================================================================== */

    const STATE = {

        initialized: false,

        visitor: null,

        assessment: {},

        scores: {},

        journeyStatus: null,

        currentPage: null,

        currentSpoke: 0

    };

    /* ======================================================================
       LOG
       ====================================================================== */

    function log(...args) {

        if (!CONFIG.DEBUG) return;

        console.log('[CTM PATH]', ...args);

    }

    /* ======================================================================
       LOAD STATE
       ====================================================================== */

    function loadState() {

        STATE.visitor =

            StorageService.getVisitor();

        STATE.assessment =

            StorageService.getAssessment();

        STATE.scores =

            StorageService.getScores();

        STATE.journeyStatus =

            StorageService.getJourneyStatus();

        STATE.currentPage =

            StorageService.getCurrentPage();

        STATE.currentSpoke =

            StorageService.getCurrentSpoke() || 0;

    }

    /* ======================================================================
       SAVE STATE
       ====================================================================== */

    function saveState() {

        StorageService.saveVisitor(

            STATE.visitor

        );

        StorageService.saveAssessment(

            STATE.assessment

        );

        StorageService.saveScores(

            STATE.scores

        );

        StorageService.saveJourneyStatus(

            STATE.journeyStatus

        );

        StorageService.saveCurrentPage(

            STATE.currentPage

        );

        StorageService.saveCurrentSpoke(

            STATE.currentSpoke

        );

    }

    /* ======================================================================
       VISITOR
       ====================================================================== */

    function setVisitor(visitor) {

        STATE.visitor = visitor;

        StorageService.saveVisitor(visitor);

    }

    function getVisitor() {

        return STATE.visitor;

    }

    /* ======================================================================
       ASSESSMENT
       ====================================================================== */

    function setAssessment(data) {

        STATE.assessment = data;

        StorageService.saveAssessment(data);

    }

    function getAssessment() {

        return STATE.assessment;

    }

    /* ======================================================================
       SCORES
       ====================================================================== */

    function setScores(scores) {

        STATE.scores = scores;

        StorageService.saveScores(scores);

    }

    function getScores() {

        return STATE.scores;

    }

    /* ======================================================================
       JOURNEY
       ====================================================================== */

    function setJourneyStatus(status) {

        STATE.journeyStatus = status;

        StorageService.saveJourneyStatus(status);

    }

    function getJourneyStatus() {

        return STATE.journeyStatus;

    }

    /* ======================================================================
       PAGE
       ====================================================================== */

    function setCurrentPage(page) {

        STATE.currentPage = page;

        StorageService.saveCurrentPage(page);

    }

    function getCurrentPage() {

        return STATE.currentPage;

    }

    /* ======================================================================
       SPOKE
       ====================================================================== */

    function setCurrentSpoke(spoke) {

        STATE.currentSpoke = spoke;

        StorageService.saveCurrentSpoke(spoke);

    }

    function getCurrentSpoke() {

        return STATE.currentSpoke;

    }

    /* ======================================================================
       RESET
       ====================================================================== */

    function reset() {

        STATE.visitor = null;

        STATE.assessment = {};

        STATE.scores = {};

        STATE.journeyStatus = null;

        STATE.currentPage = null;

        STATE.currentSpoke = 0;

        StorageService.resetJourney();

    }

    /* ======================================================================
       STARTUP
       ====================================================================== */

    async function startup() {

        log('Loading application...');

        loadState();

        if (CONFIG.DEBUG) {

            const ping = await ApiService.safeRequest(

                () => ApiService.ping()

            );

            log('API Status', ping);

        }

        STATE.initialized = true;

        log('Application initialized.');

    }

    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    async function init() {

        if (STATE.initialized) {

            return;

        }

        await startup();

    }

    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        CONFIG,

        STATE,

        init,

        reset,

        log,

        loadState,

        saveState,

        setVisitor,
        getVisitor,

        setAssessment,
        getAssessment,

        setScores,
        getScores,

        setJourneyStatus,
        getJourneyStatus,

        setCurrentPage,
        getCurrentPage,

        setCurrentSpoke,
        getCurrentSpoke

    };

})();

/* ==========================================================================
   APPLICATION BOOTSTRAP
   ========================================================================== */

document.addEventListener(

    'DOMContentLoaded',

    async () => {

        await App.init();

    }

);

/* ==========================================================================
   End of File

   File : app.js

   Status : 🔒 LOCKED
   ========================================================================== */
