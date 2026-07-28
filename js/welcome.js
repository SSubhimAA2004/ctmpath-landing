
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : welcome.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 1 — WELCOME™

   Purpose     :
   Welcome page interaction controller.

   Responsibilities:

   • Initialize Welcome page.
   • Bind CTA button events.
   • Trigger journey navigation.
   • Handle page-level interactions.

   Does NOT:

   • Create visitors.
   • Store user data.
   • Call backend services.
   • Execute assessment logic.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   WELCOME CONTROLLER
   ========================================================================== */


CTMPATH.Welcome = {


    version:

        "1.0",



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Welcome.init = function() {


    if (

        CTMPATH.Welcome.initialized

    ) {


        return;



    }



    CTMPATH.Welcome.bindEvents();



    CTMPATH.Welcome.initialized = true;



};




/* ==========================================================================
   EVENT BINDING
   ========================================================================== */


CTMPATH.Welcome.bindEvents = function() {


    const button = document.getElementById(

        "begin-journey-btn"

    );



    if (!button) {


        return;



    }



    button.addEventListener(

        "click",

        function() {


            CTMPATH.Welcome.beginJourney();



        }

    );



};




/* ==========================================================================
   BEGIN JOURNEY ACTION

   Moves user to Registration™ page.

   ========================================================================== */


CTMPATH.Welcome.beginJourney = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            2

        );



        return true;



    }



    return false;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : welcome.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   PAGE ACTIVATION HANDLER

   Called when navigation loads Welcome™ page.

   ========================================================================== */


CTMPATH.Welcome.activate = function() {


    CTMPATH.Welcome.init();



};




/* ==========================================================================
   RESET STATE

   Clears only page-level state.

   Does NOT affect journey data.

   ========================================================================== */


CTMPATH.Welcome.reset = function() {


    CTMPATH.Welcome.initialized = false;



};




/* ==========================================================================
   PAGE LOADED EVENT LISTENER

   Navigation dispatches:

   CTMPATH_PAGE_LOADED

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 1

        ) {


            CTMPATH.Welcome.activate();



        }



    }

);




/* ==========================================================================
   DIRECT PAGE LOAD SUPPORT

   Handles initial application loading.

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function() {


        const page = document.getElementById(

            "welcome-page"

        );



        if (page) {


            CTMPATH.Welcome.activate();



        }



    }

);




/* ==========================================================================
   END OF FILE

   File:

   js/welcome.js


   Status:

   STAGE 1 — WELCOME™ CONTROLLER COMPLETE


   Next:

   STAGE 2 — REGISTRATION™

   ========================================================================== */
