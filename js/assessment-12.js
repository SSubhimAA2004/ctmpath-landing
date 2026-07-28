
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-12.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 14 — ASSESSMENT 12
                 Legacy & Vision™

   Purpose     :
   Legacy & Vision™ assessment page controller.

   Responsibilities:

   • Initialize Legacy & Vision™ page.
   • Load Legacy & Vision™ questions.
   • Connect with assessment engine.
   • Handle page navigation.

   Does NOT:

   • Calculate scores.
   • Evaluate responses.
   • Generate diagnosis.
   • Persist assessment results.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   LEGACY & VISION CONTROLLER
   ========================================================================== */


CTMPATH.Assessment12 = {


    version:

        "1.0",



    pillarId:

        "legacyVision",



    page:

        14,



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Assessment12.init = function() {


    if (

        CTMPATH.Assessment12.initialized

    ) {


        return;



    }



    CTMPATH.Assessment12.loadQuestions();



    CTMPATH.Assessment12.bindEvents();



    CTMPATH.Assessment12.initialized = true;



};




/* ==========================================================================
   LOAD QUESTIONS

   Uses frontend question repository.

   ========================================================================== */


CTMPATH.Assessment12.loadQuestions = function() {


    const assessment =

        CTMPATH.getQuestionsByPillar(

            CTMPATH.Assessment12.pillarId

        );



    if (!assessment) {


        return;



    }



    if (

        CTMPATH.AssessmentEngine

    ) {


        CTMPATH.AssessmentEngine.load(

            assessment

        );



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-12.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Assessment12.bindEvents = function() {


    const nextButton = document.getElementById(

        "assessment-next-btn"

    );



    const backButton = document.getElementById(

        "assessment-back-btn"

    );



    if (nextButton) {


        nextButton.addEventListener(

            "click",

            function() {


                CTMPATH.Assessment12.complete();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Assessment12.previous();



            }

        );



    }



};




/* ==========================================================================
   COMPLETE ASSESSMENT ACTION

   Moves to KALA CHAKRA™.

   Backend submission is handled
   by shared assessment engine.

   ========================================================================== */


CTMPATH.Assessment12.complete = function() {


    if (

        CTMPATH.AssessmentEngine &&

        typeof CTMPATH.AssessmentEngine.complete ===

            "function"

    ) {


        CTMPATH.AssessmentEngine.complete();



    }



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
   PREVIOUS ACTION

   Returns to Spirit & Alignment™ assessment.

   ========================================================================== */


CTMPATH.Assessment12.previous = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            13

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Assessment12.activate = function() {


    CTMPATH.Assessment12.init();



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-12.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 14

        ) {


            CTMPATH.Assessment12.activate();



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

            "assessment-12-page"

        );



        if (page) {


            CTMPATH.Assessment12.activate();



        }



    }

);




/* ==========================================================================
   QUESTION RENDERING HOOK

   Delegates rendering responsibility
   to shared assessment layer.

   ========================================================================== */


CTMPATH.Assessment12.render = function() {


    if (

        !CTMPATH.AssessmentEngine

    ) {


        return false;



    }



    const container = document.getElementById(

        "question-container"

    );



    if (!container) {


        return false;



    }



    const questionSet =

        CTMPATH.AssessmentEngine.currentAssessment;



    if (!questionSet) {


        return false;



    }



    container.innerHTML = "";



    questionSet.questions.forEach(function(question, index) {



        const card = document.createElement(

            "div"

        );



        card.className =

            "question-card";



        card.innerHTML = `


            <div class="question-number">

                Question ${index + 1}

            </div>


            <div class="question-text">

                ${question.text}

            </div>


            <div class="rating-scale">


                ${CTMPATH.Assessment12.createRatingOptions(

                    question.id

                )}


            </div>


        `;



        container.appendChild(

            card

        );



    });



    CTMPATH.Assessment12.bindRatingEvents();



    return true;



};




/* ==========================================================================
   CREATE RATING OPTIONS

   Presentation helper only.

   ========================================================================== */


CTMPATH.Assessment12.createRatingOptions = function(questionId) {


    let html = "";



    for (

        let i = 1;

        i <= 10;

        i++

    ) {


        html += `


            <div class="rating-option">


                <input

                    type="radio"

                    id="${questionId}_${i}"

                    name="${questionId}"

                    value="${i}">


                <label

                    for="${questionId}_${i}">


                    ${i}


                </label>


            </div>


        `;



    }



    return html;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-12.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   RATING EVENT HANDLER

   Stores temporary responses through assessment engine.

   ========================================================================== */


CTMPATH.Assessment12.bindRatingEvents = function() {


    const options = document.querySelectorAll(

        ".rating-option input"

    );



    options.forEach(function(option) {



        option.addEventListener(

            "change",

            function() {


                CTMPATH.AssessmentEngine.recordResponse(

                    option.name,

                    option.value

                );



            }

        );



    });



};




/* ==========================================================================
   AFTER LOAD REFRESH

   Ensures question interface renders after initialization.

   ========================================================================== */


CTMPATH.Assessment12.refresh = function() {


    CTMPATH.Assessment12.render();



};




/* ==========================================================================
   ASSESSMENT READY EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_ASSESSMENT_READY",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 14

        ) {


            CTMPATH.Assessment12.refresh();



        }



    }

);




/* ==========================================================================
   RESTORE RESPONSES

   Restores temporary frontend selections.

   ========================================================================== */


CTMPATH.Assessment12.restoreResponses = function() {


    if (

        !CTMPATH.AssessmentEngine

    ) {


        return;



    }



    const responses =

        CTMPATH.AssessmentEngine.getResponses();



    Object.keys(responses).forEach(function(questionId) {



        const value = responses[questionId];



        const option = document.querySelector(

            `input[name="${questionId}"][value="${value}"]`

        );



        if (option) {


            option.checked = true;



        }



    });



};




/* ==========================================================================
   RESET PAGE STATE

   Clears only current UI state.

   ========================================================================== */


CTMPATH.Assessment12.reset = function() {


    const container = document.getElementById(

        "question-container"

    );



    if (container) {


        container.innerHTML = "";



    }



    CTMPATH.Assessment12.initialized = false;



};




/* ==========================================================================
   END OF FILE

   File:

   js/assessment-12.js


   Status:

   STAGE 14 — ASSESSMENT 12 CONTROLLER COMPLETE


   Next:

   STAGE 15 — KALA CHAKRA™

   ========================================================================== */
