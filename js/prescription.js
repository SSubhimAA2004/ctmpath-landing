
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : prescription.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 17 — PRESCRIPTION™

   Purpose     :
   Prescription™ page controller.

   Responsibilities:

   • Initialize prescription page.
   • Load backend-generated prescription data.
   • Render 30/60/90 day action plan.
   • Handle journey navigation.

   Does NOT:

   • Generate prescription.
   • Calculate recommendations.
   • Modify action plans.

   Backend owns:

   • Prescription generation.
   • Action prioritisation.
   • Transformation roadmap.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   PRESCRIPTION CONTROLLER
   ========================================================================== */


CTMPATH.Prescription = {


    version:

        "1.0",



    initialized:

        false,



    page:

        17,



    data:

        null



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Prescription.init = function() {


    if (

        CTMPATH.Prescription.initialized

    ) {


        return;



    }



    CTMPATH.Prescription.loadData();



    CTMPATH.Prescription.bindEvents();



    CTMPATH.Prescription.initialized = true;



};




/* ==========================================================================
   LOAD PRESCRIPTION DATA

   Receives backend-generated prescription.

   ========================================================================== */


CTMPATH.Prescription.loadData = function() {


    if (

        CTMPATH.API &&

        typeof CTMPATH.API.getPrescription ===

            "function"

    ) {


        CTMPATH.API.getPrescription()

            .then(function(response) {


                CTMPATH.Prescription.data = response;



                CTMPATH.Prescription.render();



            });



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : prescription.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Prescription.bindEvents = function() {


    const nextButton = document.getElementById(

        "prescription-next-btn"

    );



    const ctaButton = document.getElementById(

        "prescription-cta-btn"

    );



    const backButton = document.getElementById(

        "prescription-back-btn"

    );



    const homeButton = document.getElementById(

        "prescription-home-btn"

    );



    if (nextButton) {


        nextButton.addEventListener(

            "click",

            function() {


                CTMPATH.Prescription.openCTA();



            }

        );



    }



    if (ctaButton) {


        ctaButton.addEventListener(

            "click",

            function() {


                CTMPATH.Prescription.openCTA();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Prescription.back();



            }

        );



    }



    if (homeButton) {


        homeButton.addEventListener(

            "click",

            function() {


                CTMPATH.Navigation.goto(

                    1

                );



            }

        );



    }



};




/* ==========================================================================
   RENDER PRESCRIPTION

   Presentation only.

   Uses backend-generated data.

   ========================================================================== */


CTMPATH.Prescription.render = function() {


    if (

        !CTMPATH.Prescription.data

    ) {


        return false;



    }



    const summary = document.getElementById(

        "prescription-summary"

    );



    const thirtyDay = document.getElementById(

        "thirty-day-focus"

    );



    const sixtyDay = document.getElementById(

        "sixty-day-growth"

    );



    const ninetyDay = document.getElementById(

        "ninety-day-transformation"

    );



    const commitment = document.getElementById(

        "commitment-message"

    );



    const actionSummary = document.getElementById(

        "action-summary"

    );




    if (summary) {


        summary.innerHTML = `


            <h2>

                ${CTMPATH.Prescription.data.title || ""}

            </h2>


            <p>

                ${CTMPATH.Prescription.data.summary || ""}

            </p>


        `;



    }



    CTMPATH.Prescription.renderList(

        thirtyDay,

        CTMPATH.Prescription.data.thirtyDay

    );



    CTMPATH.Prescription.renderList(

        sixtyDay,

        CTMPATH.Prescription.data.sixtyDay

    );



    CTMPATH.Prescription.renderList(

        ninetyDay,

        CTMPATH.Prescription.data.ninetyDay

    );



    if (commitment) {


        commitment.innerHTML =

            CTMPATH.Prescription.data.commitment || "";



    }



    CTMPATH.Prescription.renderList(

        actionSummary,

        CTMPATH.Prescription.data.actions

    );



    return true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : prescription.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   RENDER LIST HELPER

   Presentation helper only.

   ========================================================================== */


CTMPATH.Prescription.renderList = function(

    container,

    items

) {


    if (

        !container

    ) {


        return;



    }



    container.innerHTML = "";



    if (

        !items ||

        !Array.isArray(items)

    ) {


        return;



    }



    items.forEach(function(item) {



        const element = document.createElement(

            "div"

        );



        element.className =

            "action-item";



        element.innerHTML = `


            <p>

                ${item}

            </p>


        `;



        container.appendChild(

            element

        );



    });



};




/* ==========================================================================
   OPEN CTA™

   Moves user to final conversion stage.

   ========================================================================== */


CTMPATH.Prescription.openCTA = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            18

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   BACK TO DIAGNOSIS™

   ========================================================================== */


CTMPATH.Prescription.back = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            16

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   REFRESH DATA

   ========================================================================== */


CTMPATH.Prescription.refresh = function() {


    CTMPATH.Prescription.loadData();



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : prescription.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Prescription.activate = function() {


    CTMPATH.Prescription.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 17

        ) {


            CTMPATH.Prescription.activate();



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

            "prescription-page"

        );



        if (page) {


            CTMPATH.Prescription.activate();



        }



    }

);




/* ==========================================================================
   EMPTY STATE HANDLER

   Handles unavailable prescription data.

   ========================================================================== */


CTMPATH.Prescription.showEmptyState = function() {


    const summary = document.getElementById(

        "prescription-summary"

    );



    if (!summary) {


        return;



    }



    summary.innerHTML = `


        <h2>

            Preparing Your Prescription™

        </h2>


        <p>

            Your personalised action plan
            is being prepared.

        </p>


    `;



};




/* ==========================================================================
   ERROR HANDLER

   Presentation-safe error handling.

   ========================================================================== */


CTMPATH.Prescription.handleError = function(error) {


    console.error(

        "Prescription™ loading error:",

        error

    );



    CTMPATH.Prescription.showEmptyState();



};




/* ==========================================================================
   END OF FILE

   File:

   js/prescription.js


   Status:

   STAGE 17 — PRESCRIPTION™ CONTROLLER COMPLETE


   Next:

   STAGE 18 — CTA™

   ========================================================================== */
