
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosis.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 16 — DIAGNOSIS™

   Purpose     :
   Diagnosis™ page controller.

   Responsibilities:

   • Initialize diagnosis page.
   • Load backend-generated diagnosis data.
   • Render personal insights.
   • Handle journey navigation.

   Does NOT:

   • Calculate diagnosis.
   • Interpret assessment responses.
   • Generate recommendations.

   Backend owns:

   • Diagnosis generation.
   • Pattern analysis.
   • Transformation pathway.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   DIAGNOSIS CONTROLLER
   ========================================================================== */


CTMPATH.Diagnosis = {


    version:

        "1.0",



    initialized:

        false,



    page:

        16,



    data:

        null



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Diagnosis.init = function() {


    if (

        CTMPATH.Diagnosis.initialized

    ) {


        return;



    }



    CTMPATH.Diagnosis.loadData();



    CTMPATH.Diagnosis.bindEvents();



    CTMPATH.Diagnosis.initialized = true;



};




/* ==========================================================================
   LOAD DIAGNOSIS DATA

   Receives backend-generated diagnosis.

   ========================================================================== */


CTMPATH.Diagnosis.loadData = function() {


    if (

        CTMPATH.API &&

        typeof CTMPATH.API.getDiagnosis ===

            "function"

    ) {


        CTMPATH.API.getDiagnosis()

            .then(function(response) {


                CTMPATH.Diagnosis.data = response;



                CTMPATH.Diagnosis.render();



            });



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosis.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Diagnosis.bindEvents = function() {


    const pathButton = document.getElementById(

        "diagnosis-path-btn"

    );



    const nextButton = document.getElementById(

        "diagnosis-next-btn"

    );



    const backButton = document.getElementById(

        "diagnosis-back-btn"

    );



    if (pathButton) {


        pathButton.addEventListener(

            "click",

            function() {


                CTMPATH.Diagnosis.openPath();



            }

        );



    }



    if (nextButton) {


        nextButton.addEventListener(

            "click",

            function() {


                CTMPATH.Diagnosis.openPath();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Diagnosis.back();



            }

        );



    }



};




/* ==========================================================================
   RENDER DIAGNOSIS

   Presentation only.

   Uses backend-generated data.

   ========================================================================== */


CTMPATH.Diagnosis.render = function() {


    if (

        !CTMPATH.Diagnosis.data

    ) {


        return false;



    }



    const profile = document.getElementById(

        "diagnosis-profile"

    );



    const insight = document.getElementById(

        "core-insight"

    );



    const strengths = document.getElementById(

        "strengths-container"

    );



    const growth = document.getElementById(

        "growth-container"

    );



    const summary = document.getElementById(

        "life-pattern-summary"

    );




    if (profile) {


        profile.innerHTML = `


            <h2>

                ${CTMPATH.Diagnosis.data.title || ""}

            </h2>


            <p>

                ${CTMPATH.Diagnosis.data.summary || ""}

            </p>


        `;



    }



    if (insight) {


        insight.innerHTML =

            CTMPATH.Diagnosis.data.coreInsight || "";



    }



    CTMPATH.Diagnosis.renderList(

        strengths,

        CTMPATH.Diagnosis.data.strengths

    );



    CTMPATH.Diagnosis.renderList(

        growth,

        CTMPATH.Diagnosis.data.growthAreas

    );



    if (summary) {


        summary.innerHTML =

            CTMPATH.Diagnosis.data.lifePattern || "";



    }



    return true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosis.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   RENDER LIST HELPER

   Presentation helper only.

   ========================================================================== */


CTMPATH.Diagnosis.renderList = function(

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

            "insight-item";



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
   OPEN TRANSFORMATION PATH™

   Moves user to next journey stage.

   ========================================================================== */


CTMPATH.Diagnosis.openPath = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            17

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   BACK TO KALA CHAKRA™

   ========================================================================== */


CTMPATH.Diagnosis.back = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            15

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   REFRESH DATA

   ========================================================================== */


CTMPATH.Diagnosis.refresh = function() {


    CTMPATH.Diagnosis.loadData();



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosis.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Diagnosis.activate = function() {


    CTMPATH.Diagnosis.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 16

        ) {


            CTMPATH.Diagnosis.activate();



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

            "diagnosis-page"

        );



        if (page) {


            CTMPATH.Diagnosis.activate();



        }



    }

);




/* ==========================================================================
   EMPTY STATE HANDLER

   Handles unavailable diagnosis data.

   ========================================================================== */


CTMPATH.Diagnosis.showEmptyState = function() {


    const profile = document.getElementById(

        "diagnosis-profile"

    );



    if (!profile) {


        return;



    }



    profile.innerHTML = `


        <h2>

            Preparing Your Diagnosis™

        </h2>


        <p>

            Your personalised insight report
            is being prepared.

        </p>


    `;



};




/* ==========================================================================
   ERROR HANDLER

   Presentation-safe error handling.

   ========================================================================== */


CTMPATH.Diagnosis.handleError = function(error) {


    console.error(

        "Diagnosis™ loading error:",

        error

    );



    CTMPATH.Diagnosis.showEmptyState();



};




/* ==========================================================================
   END OF FILE

   File:

   js/diagnosis.js


   Status:

   STAGE 16 — DIAGNOSIS™ CONTROLLER COMPLETE


   Next:

   STAGE 17 — TRANSFORMATION PATH™

   ========================================================================== */
