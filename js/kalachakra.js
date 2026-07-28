
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : kalachakra.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 15 — KALA CHAKRA™

   Purpose     :
   KALA CHAKRA™ visualization controller.

   Responsibilities:

   • Initialize KALA CHAKRA™ page.
   • Receive pillar summary data.
   • Render life balance visualization.
   • Handle journey navigation.

   Does NOT:

   • Calculate pillar scores.
   • Generate diagnosis.
   • Modify backend results.
   • Create recommendations.

   Backend owns:

   • Score calculation.
   • Pillar analysis.
   • Life balance interpretation.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   KALA CHAKRA CONTROLLER
   ========================================================================== */


CTMPATH.KalaChakra = {


    version:

        "1.0",



    initialized:

        false,



    page:

        15,



    pillars:

        []



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.KalaChakra.init = function() {


    if (

        CTMPATH.KalaChakra.initialized

    ) {


        return;



    }



    CTMPATH.KalaChakra.loadData();



    CTMPATH.KalaChakra.bindEvents();



    CTMPATH.KalaChakra.initialized = true;



};




/* ==========================================================================
   LOAD DATA

   Receives backend-generated KALA CHAKRA™ data.

   ========================================================================== */


CTMPATH.KalaChakra.loadData = function() {


    if (

        CTMPATH.API &&

        typeof CTMPATH.API.getKalaChakra ===

            "function"

    ) {


        CTMPATH.API.getKalaChakra()

            .then(function(response) {


                CTMPATH.KalaChakra.pillars =

                    response.pillars || [];



                CTMPATH.KalaChakra.render();



            });



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : kalachakra.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.KalaChakra.bindEvents = function() {


    const diagnosisButton = document.getElementById(

        "kalachakra-diagnosis-btn"

    );



    const nextButton = document.getElementById(

        "kalachakra-next-btn"

    );



    const homeButton = document.getElementById(

        "kalachakra-home-btn"

    );



    if (diagnosisButton) {


        diagnosisButton.addEventListener(

            "click",

            function() {


                CTMPATH.KalaChakra.openDiagnosis();



            }

        );



    }



    if (nextButton) {


        nextButton.addEventListener(

            "click",

            function() {


                CTMPATH.KalaChakra.openDiagnosis();



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
   RENDER KALA CHAKRA™

   Presentation only.

   ========================================================================== */


CTMPATH.KalaChakra.render = function() {


    const wheel = document.getElementById(

        "kalachakra-wheel"

    );



    const grid = document.getElementById(

        "pillar-summary-grid"

    );



    if (!wheel || !grid) {


        return false;



    }



    wheel.innerHTML = "";

    grid.innerHTML = "";




    CTMPATH.KalaChakra.pillars.forEach(function(pillar) {



        const pillarCard = document.createElement(

            "div"

        );



        pillarCard.className =

            "pillar-card";



        pillarCard.innerHTML = `


            <h3>

                ${pillar.name}

            </h3>


            <div class="pillar-score">

                ${pillar.score}

            </div>


            <p>

                ${pillar.status}

            </p>


        `;



        grid.appendChild(

            pillarCard

        );



    });



    CTMPATH.KalaChakra.renderWheel();



    return true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : kalachakra.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   WHEEL RENDERING

   Presentation layer only.

   Uses backend-provided pillar values.

   ========================================================================== */


CTMPATH.KalaChakra.renderWheel = function() {


    const wheel = document.getElementById(

        "kalachakra-wheel"

    );



    if (!wheel) {


        return false;



    }



    const container = document.createElement(

        "div"

    );



    container.className =

        "chakra-wheel-container";



    CTMPATH.KalaChakra.pillars.forEach(function(pillar, index) {



        const spoke = document.createElement(

            "div"

        );



        spoke.className =

            "chakra-spoke";



        spoke.dataset.index = index;



        spoke.innerHTML = `


            <span class="chakra-label">

                ${pillar.name}

            </span>


            <span class="chakra-value">

                ${pillar.score}

            </span>


        `;



        container.appendChild(

            spoke

        );



    });



    wheel.appendChild(

        container

    );



    return true;



};




/* ==========================================================================
   OPEN DIAGNOSIS

   Moves user to diagnosis stage.

   ========================================================================== */


CTMPATH.KalaChakra.openDiagnosis = function() {


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

   Allows page refresh without recalculation.

   ========================================================================== */


CTMPATH.KalaChakra.refresh = function() {


    CTMPATH.KalaChakra.loadData();



};




/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.KalaChakra.activate = function() {


    CTMPATH.KalaChakra.init();



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : kalachakra.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 15

        ) {


            CTMPATH.KalaChakra.activate();



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

            "kalachakra-page"

        );



        if (page) {


            CTMPATH.KalaChakra.activate();



        }



    }

);




/* ==========================================================================
   EMPTY STATE HANDLER

   Handles cases where backend data
   has not yet arrived.

   ========================================================================== */


CTMPATH.KalaChakra.showEmptyState = function() {


    const wheel = document.getElementById(

        "kalachakra-wheel"

    );



    if (!wheel) {


        return;



    }



    wheel.innerHTML = `


        <div class="empty-state">


            <h3>

                Your Life Map Is Loading™

            </h3>


            <p>

                Preparing your KALA CHAKRA™ visualization.

            </p>


        </div>


    `;



};




/* ==========================================================================
   ERROR HANDLER

   Presentation-safe error handling.

   ========================================================================== */


CTMPATH.KalaChakra.handleError = function(error) {


    console.error(

        "KALA CHAKRA™ loading error:",

        error

    );



    CTMPATH.KalaChakra.showEmptyState();



};




/* ==========================================================================
   END OF FILE

   File:

   js/kalachakra.js


   Status:

   STAGE 15 — KALA CHAKRA™ CONTROLLER COMPLETE


   Next:

   STAGE 16 — DIAGNOSIS™

   ========================================================================== */

