
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : router.js
   Version     : 1.0
   Status      : 🔒 LOCKED
   Purpose     : Application Router

                  Owns
                  • Page Navigation
                  • Route Validation
                  • Journey Progression
                  • Navigation Guards

                  Owns NO
                  • UI Rendering
                  • Business Logic
                  • Storage
                  • API Communication
   ========================================================================== */

'use strict';

/* ==========================================================================
   ROUTER
   ========================================================================== */

const Router = (() => {

    /* ======================================================================
       ROUTES
       ====================================================================== */

    const ROUTES = {

        LANDING: 'landing.html',

        REGISTRATION: 'registration.html',

        ASSESSMENT: 'assessment.html',

        KALACHAKRA: 'kaalachakra.html',

        DIAGNOSIS: 'diagnosis.html',

        PRESCRIPTION: 'prescription.html',

        COMPLETION: 'completion.html'

    };

    /* ======================================================================
       JOURNEY ORDER
       ====================================================================== */

    const JOURNEY = [

        ROUTES.LANDING,

        ROUTES.REGISTRATION,

        ROUTES.ASSESSMENT,

        ROUTES.KALACHAKRA,

        ROUTES.DIAGNOSIS,

        ROUTES.PRESCRIPTION,

        ROUTES.COMPLETION

    ];

    /* ======================================================================
       CURRENT PAGE
       ====================================================================== */

    function currentPage() {

        const path = window.location.pathname;

        return path.substring(path.lastIndexOf('/') + 1);

    }

    /* ======================================================================
       VALID ROUTE
       ====================================================================== */

    function isValidRoute(page) {

        return JOURNEY.includes(page);

    }

    /* ======================================================================
       INDEX
       ====================================================================== */

    function pageIndex(page) {

        return JOURNEY.indexOf(page);

    }

    /* ======================================================================
       CAN NAVIGATE
       ====================================================================== */

    function canNavigate(target) {

        if (!isValidRoute(target)) {

            return false;

        }

        const current = currentPage();

        if (!isValidRoute(current)) {

            return true;

        }

        return pageIndex(target) <= pageIndex(current) + 1;

    }

    /* ======================================================================
       GO
       ====================================================================== */

    function go(page) {

        if (!canNavigate(page)) {

            console.warn('Navigation blocked:', page);

            return;

        }

        StorageService.saveCurrentPage(page);

        window.location.href = page;

    }

    /* ======================================================================
       NEXT
       ====================================================================== */

    function next() {

        const current = currentPage();

        const index = pageIndex(current);

        if (index === -1) return;

        if (index >= JOURNEY.length - 1) return;

        go(JOURNEY[index + 1]);

    }

    /* ======================================================================
       PREVIOUS
       ====================================================================== */

    function previous() {

        const current = currentPage();

        const index = pageIndex(current);

        if (index <= 0) return;

        go(JOURNEY[index - 1]);

    }

    /* ======================================================================
       RESTART
       ====================================================================== */

    function restart() {

        StorageService.resetJourney();

        go(ROUTES.LANDING);

    }

    /* ======================================================================
       RESUME
       ====================================================================== */

    function resume() {

        const saved = StorageService.getCurrentPage();

        if (!saved) {

            go(ROUTES.LANDING);

            return;

        }

        go(saved);

    }

    /* ======================================================================
       FIRST PAGE
       ====================================================================== */

    function isFirstPage() {

        return currentPage() === ROUTES.LANDING;

    }

    /* ======================================================================
       LAST PAGE
       ====================================================================== */

    function isLastPage() {

        return currentPage() === ROUTES.COMPLETION;

    }

    /* ======================================================================
       CURRENT STEP
       ====================================================================== */

    function currentStep() {

        return pageIndex(currentPage()) + 1;

    }

    /* ======================================================================
       TOTAL STEPS
       ====================================================================== */

    function totalSteps() {

        return JOURNEY.length;

    }

    /* ======================================================================
       PROGRESS
       ====================================================================== */

    function progress() {

        return Math.round(

            (currentStep() / totalSteps()) * 100

        );

    }

    /* ======================================================================
       NAVIGATION GUARD
       ====================================================================== */

    function protect() {

        const current = currentPage();

        if (!isValidRoute(current)) {

            return;

        }

        const saved = StorageService.getCurrentPage();

        if (!saved) {

            return;

        }

        const allowed = pageIndex(saved);

        const currentIndex = pageIndex(current);

        if (currentIndex > allowed + 1) {

            go(saved);

        }

    }

    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function init() {

        protect();

        StorageService.saveCurrentPage(

            currentPage()

        );

    }

    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        ROUTES,

        JOURNEY,

        init,

        go,

        next,

        previous,

        resume,

        restart,

        protect,

        currentPage,

        currentStep,

        totalSteps,

        progress,

        isValidRoute,

        isFirstPage,

        isLastPage

    };

})();

/* ==========================================================================
   AUTO INITIALIZE
   ========================================================================== */

document.addEventListener(

    'DOMContentLoaded',

    () => {

        Router.init();

    }

);

/* ==========================================================================
   End of File

   File : router.js

   Status : 🔒 LOCKED
   ========================================================================== */
