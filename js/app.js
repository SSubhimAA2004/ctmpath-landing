
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 1.0
   Status      : DEVELOPMENT

   Purpose:
   Application bootstrap controller.

   Responsibilities:

   • Start application.
   • Initialize shared systems.
   • Coordinate module loading.
   • Manage global application state.

   Does NOT:

   • Own page-specific behaviour.
   • Calculate scores.
   • Generate reports.

   ========================================================================== */


/* ==========================================================================
   GLOBAL APPLICATION NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};




/* ==========================================================================
   APPLICATION CORE
   ========================================================================== */


CTMPATH.App = {


    version:

        "1.0",



    initialized:

        false,



    currentPage:

        null,



    state:

        {}



};




/* ==========================================================================
   APPLICATION INITIALIZATION
   ========================================================================== */


CTMPATH.App.init = function() {


    if (

        CTMPATH.App.initialized

    ) {


        return;



    }



    CTMPATH.App.loadModules();



    CTMPATH.App.restoreSession();



    CTMPATH.App.startNavigation();



    CTMPATH.App.initialized = true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   MODULE LOADING

   Initializes shared application systems.

   ========================================================================== */


CTMPATH.App.loadModules = function() {


    const modules = [


        "API",

        "Storage",

        "Navigation",

        "AssessmentEngine",

        "Scoring",

        "Report"


    ];



    modules.forEach(function(moduleName) {



        if (

            CTMPATH[moduleName]

        ) {


            console.log(

                moduleName +

                " initialized"

            );



        }



    });



};




/* ==========================================================================
   SESSION RESTORATION

   Restores visitor journey state.

   ========================================================================== */


CTMPATH.App.restoreSession = function() {


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.getSession ===

            "function"

    ) {


        CTMPATH.App.state =

            CTMPATH.Storage.getSession()

            || {};



    }



};




/* ==========================================================================
   NAVIGATION START

   Starts page routing system.

   ========================================================================== */


CTMPATH.App.startNavigation = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.init ===

            "function"

    ) {


        CTMPATH.Navigation.init();



    }



};




/* ==========================================================================
   APPLICATION READY EVENT

   ========================================================================== */


CTMPATH.App.ready = function() {


    document.dispatchEvent(

        new CustomEvent(

            "CTMPATH_APP_READY"

        )

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   PAGE CHANGE HANDLER

   Receives navigation events.

   ========================================================================== */


CTMPATH.App.onPageChange = function(pageNumber) {


    CTMPATH.App.currentPage = pageNumber;



    document.dispatchEvent(

        new CustomEvent(

            "CTMPATH_PAGE_LOADED",

            {

                detail:

                {

                    page: pageNumber

                }

            }

        )

    );



};




/* ==========================================================================
   GLOBAL ERROR HANDLER

   Application-level error capture.

   ========================================================================== */


CTMPATH.App.handleError = function(error) {


    console.error(

        "CTM PATH™ Application Error:",

        error

    );



    document.dispatchEvent(

        new CustomEvent(

            "CTMPATH_APP_ERROR",

            {

                detail:

                {

                    error: error

                }

            }

        )

    );



};




/* ==========================================================================
   APPLICATION RESET

   Clears local journey state.

   ========================================================================== */


CTMPATH.App.reset = function() {


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.clearSession ===

            "function"

    ) {


        CTMPATH.Storage.clearSession();



    }



    CTMPATH.App.state = {};

    CTMPATH.App.currentPage = null;



};




/* ==========================================================================
   DOM READY

   Application startup trigger.

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function() {


        CTMPATH.App.init();



        CTMPATH.App.ready();



    }

);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   GET APPLICATION STATE

   Provides current journey state.

   ========================================================================== */


CTMPATH.App.getState = function() {


    return CTMPATH.App.state;



};




/* ==========================================================================
   UPDATE APPLICATION STATE

   Updates global temporary state.

   Persistent storage handled separately
   by storage.js.

   ========================================================================== */


CTMPATH.App.updateState = function(

    key,

    value

) {


    CTMPATH.App.state[key] = value;



};




/* ==========================================================================
   GET CURRENT PAGE

   ========================================================================== */


CTMPATH.App.getCurrentPage = function() {


    return CTMPATH.App.currentPage;



};




/* ==========================================================================
   VERSION INFORMATION

   ========================================================================== */


CTMPATH.App.getVersion = function() {


    return CTMPATH.App.version;



};




/* ==========================================================================
   END OF FILE

   File:

   js/app.js


   Status:

   APPLICATION CONTROLLER COMPLETE


   ========================================================================== */
