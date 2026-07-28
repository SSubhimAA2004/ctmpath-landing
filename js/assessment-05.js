
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-05.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 7 — ASSESSMENT 05
                 Financial Freedom™

   Purpose     :
   Financial Freedom™ assessment page controller.

   Responsibilities:

   • Initialize Financial Freedom™ page.
   • Load Financial Freedom™ questions.
   • Connect with assessment engine.
   • Handle page navigation.

   Does NOT:

   • Calculate scores.
   • Evaluate financial responses.
   • Generate diagnosis.
   • Persist assessment results.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   FINANCIAL FREEDOM CONTROLLER
   ========================================================================== */


CTMPATH.Assessment05 = {


    version:

        "1.0",



    pillarId:

        "financialFreedom",



    page:

        7,



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Assessment05.init = function() {


    if (

        CTMPATH.Assessment05.initialized

    ) {


        return;



    }



    CTMPATH.Assessment05.loadQuestions();



    CTMPATH.Assessment05.bindEvents();



    CTMPATH.Assessment05.initialized = true;



};




/* ==========================================================================
   LOAD QUESTIONS

   Uses frontend question repository.

   ========================================================================== */


CTMPATH.Assessment05.loadQuestions = function() {


    const assessment =

        CTMPATH.getQuestionsByPillar(

            CTMPATH.Assessment05.pillarId

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



};/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-05.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 7 — ASSESSMENT 05
                 Financial Freedom™

   Purpose     :
   Financial Freedom™ assessment page controller.

   Responsibilities:

   • Initialize Financial Freedom™ page.
   • Load Financial Freedom™ questions.
   • Connect with assessment engine.
   • Handle page navigation.

   Does NOT:

   • Calculate scores.
   • Evaluate financial responses.
   • Generate diagnosis.
   • Persist assessment results.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   FINANCIAL FREEDOM CONTROLLER
   ========================================================================== */


CTMPATH.Assessment05 = {


    version:

        "1.0",



    pillarId:

        "financialFreedom",



    page:

        7,



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Assessment05.init = function() {


    if (

        CTMPATH.Assessment05.initialized

    ) {


        return;



    }



    CTMPATH.Assessment05.loadQuestions();



    CTMPATH.Assessment05.bindEvents();



    CTMPATH.Assessment05.initialized = true;



};




/* ==========================================================================
   LOAD QUESTIONS

   Uses frontend question repository.

   ========================================================================== */


CTMPATH.Assessment05.loadQuestions = function() {


    const assessment =

        CTMPATH.getQuestionsByPillar(

            CTMPATH.Assessment05.pillarId

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

   File        : assessment-05.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Assessment05.bindEvents = function() {


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


                CTMPATH.Assessment05.next();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Assessment05.previous();



            }

        );



    }



};




/* ==========================================================================
   NEXT ACTION

   Moves to Assessment 06.

   ========================================================================== */


CTMPATH.Assessment05.next = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            8

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PREVIOUS ACTION

   Returns to Character & Integrity™ assessment.

   ========================================================================== */


CTMPATH.Assessment05.previous = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            6

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Assessment05.activate = function() {


    CTMPATH.Assessment05.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 7

        ) {


            CTMPATH.Assessment05.activate();



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

            "assessment-05-page"

        );



        if (page) {


            CTMPATH.Assessment05.activate();



        }



    }

);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-05.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   QUESTION RENDERING HOOK

   Delegates rendering responsibility to shared assessment layer.

   ========================================================================== */


CTMPATH.Assessment05.render = function() {


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


                ${CTMPATH.Assessment05.createRatingOptions(

                    question.id

                )}


            </div>


        `;



        container.appendChild(

            card

        );



    });



    CTMPATH.Assessment05.bindRatingEvents();



    return true;



};




/* ==========================================================================
   CREATE RATING OPTIONS

   Presentation helper only.

   ========================================================================== */


CTMPATH.Assessment05.createRatingOptions = function(questionId) {


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
   RATING EVENT HANDLER

   Stores temporary responses through assessment engine.

   ========================================================================== */


CTMPATH.Assessment05.bindRatingEvents = function() {


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
   CTM PATH™ Guided Journey™

   File        : assessment-05.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   AFTER LOAD REFRESH

   Ensures question interface renders after initialization.

   ========================================================================== */


CTMPATH.Assessment05.refresh = function() {


    CTMPATH.Assessment05.render();



};




/* ==========================================================================
   ASSESSMENT READY EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_ASSESSMENT_READY",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 7

        ) {


            CTMPATH.Assessment05.refresh();



        }



    }

);




/* ==========================================================================
   RESTORE RESPONSES

   Restores temporary frontend selections.

   ========================================================================== */


CTMPATH.Assessment05.restoreResponses = function() {


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


CTMPATH.Assessment05.reset = function() {


    const container = document.getElementById(

        "question-container"

    );



    if (container) {


        container.innerHTML = "";



    }



    CTMPATH.Assessment05.initialized = false;



};




/* ==========================================================================
   END OF FILE

   File:

   js/assessment-05.js


   Status:

   STAGE 7 — ASSESSMENT 05 CONTROLLER COMPLETE


   Next:

   STAGE 8 — ASSESSMENT 06

   Inner Peace™

   ========================================================================== */
