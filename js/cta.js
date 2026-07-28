
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : cta.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 18 — CTA™

   Purpose     :
   Final CTA™ page controller.

   Responsibilities:

   • Initialize CTA page.
   • Load session completion data.
   • Handle visitor actions.
   • Connect external conversion pathways.

   Does NOT:

   • Process payments.
   • Create reports.
   • Manage external platforms.

   External services own:

   • Calendar booking.
   • Payment.
   • Report delivery.
   • Communication.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   CTA CONTROLLER
   ========================================================================== */


CTMPATH.CTA = {


    version:

        "1.0",



    initialized:

        false,



    page:

        18,



    data:

        null



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.CTA.init = function() {


    if (

        CTMPATH.CTA.initialized

    ) {


        return;



    }



    CTMPATH.CTA.loadData();



    CTMPATH.CTA.bindEvents();



    CTMPATH.CTA.initialized = true;



};




/* ==========================================================================
   LOAD CTA DATA

   Loads completed journey information.

   ========================================================================== */


CTMPATH.CTA.loadData = function() {


    if (

        CTMPATH.API &&

        typeof CTMPATH.API.getCTAData ===

            "function"

    ) {


        CTMPATH.API.getCTAData()

            .then(function(response) {


                CTMPATH.CTA.data = response;



                CTMPATH.CTA.render();



            });



    }



};



/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : cta.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.CTA.bindEvents = function() {


    const bookCallButton = document.getElementById(

        "book-call-btn"

    );



    const joinPathButton = document.getElementById(

        "join-path-btn"

    );



    const downloadButton = document.getElementById(

        "download-report-btn"

    );



    const contactButton = document.getElementById(

        "contact-mentor-btn"

    );




    if (bookCallButton) {


        bookCallButton.addEventListener(

            "click",

            function() {


                CTMPATH.CTA.bookCall();



            }

        );



    }



    if (joinPathButton) {


        joinPathButton.addEventListener(

            "click",

            function() {


                CTMPATH.CTA.joinPath();



            }

        );



    }



    if (downloadButton) {


        downloadButton.addEventListener(

            "click",

            function() {


                CTMPATH.CTA.downloadReport();



            }

        );



    }



    if (contactButton) {


        contactButton.addEventListener(

            "click",

            function() {


                CTMPATH.CTA.contactMentor();



            }

        );



    }



};




/* ==========================================================================
   RENDER CTA SUMMARY

   Presentation only.

   ========================================================================== */


CTMPATH.CTA.render = function() {


    if (

        !CTMPATH.CTA.data

    ) {


        return false;



    }



    const summary = document.getElementById(

        "cta-summary"

    );



    if (summary) {


        summary.innerHTML = `


            <h2>

                ${CTMPATH.CTA.data.name || ""}

            </h2>


            <p>

                ${CTMPATH.CTA.data.message || ""}

            </p>


        `;



    }



    return true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : cta.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   BOOK DISCOVERY CALL

   External calendar integration point.

   ========================================================================== */


CTMPATH.CTA.bookCall = function() {


    if (

        CTMPATH.Config &&

        CTMPATH.Config.calendarURL

    ) {


        window.open(

            CTMPATH.Config.calendarURL,

            "_blank"

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   JOIN CTM PATH™

   External enrolment integration point.

   ========================================================================== */


CTMPATH.CTA.joinPath = function() {


    if (

        CTMPATH.Config &&

        CTMPATH.Config.joinURL

    ) {


        window.open(

            CTMPATH.Config.joinURL,

            "_blank"

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   DOWNLOAD REPORT

   Requests generated report.

   ========================================================================== */


CTMPATH.CTA.downloadReport = function() {


    if (

        CTMPATH.API &&

        typeof CTMPATH.API.downloadReport ===

            "function"

    ) {


        CTMPATH.API.downloadReport();



        return true;



    }



    return false;



};




/* ==========================================================================
   CONTACT MENTOR

   Opens communication channel.

   ========================================================================== */


CTMPATH.CTA.contactMentor = function() {


    if (

        CTMPATH.Config &&

        CTMPATH.Config.contactURL

    ) {


        window.open(

            CTMPATH.Config.contactURL,

            "_blank"

        );



        return true;



    }



    return false;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : cta.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.CTA.activate = function() {


    CTMPATH.CTA.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 18

        ) {


            CTMPATH.CTA.activate();



        }



    }

);




/* ==========================================================================
   DIRECT PAGE LOAD SUPPORT

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function() {


        const page = document.getElementById(

            "cta-page"

        );



        if (page) {


            CTMPATH.CTA.activate();



        }



    }

);




/* ==========================================================================
   EMPTY STATE HANDLER

   Handles unavailable completion data.

   ========================================================================== */


CTMPATH.CTA.showEmptyState = function() {


    const summary = document.getElementById(

        "cta-summary"

    );



    if (!summary) {


        return;



    }



    summary.innerHTML = `


        <h2>

            Your Journey Is Complete™

        </h2>


        <p>

            Choose your next step
            and continue your transformation.

        </p>


    `;



};




/* ==========================================================================
   ERROR HANDLER

   Presentation-safe error handling.

   ========================================================================== */


CTMPATH.CTA.handleError = function(error) {


    console.error(

        "CTA™ loading error:",

        error

    );



    CTMPATH.CTA.showEmptyState();



};




/* ==========================================================================
   END OF FILE

   File:

   js/cta.js


   Status:

   STAGE 18 — CTA™ CONTROLLER COMPLETE


   ========================================================================== */
