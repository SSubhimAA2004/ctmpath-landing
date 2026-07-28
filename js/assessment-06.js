
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-06.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 8 — ASSESSMENT 06
                 Inner Peace™

   Purpose     :
   Inner Peace™ assessment page controller.

   Responsibilities:

   • Initialize Inner Peace™ page.
   • Load Inner Peace™ questions.
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
   INNER PEACE CONTROLLER
   ========================================================================== */


CTMPATH.Assessment06 = {


    version:

        "1.0",



    pillarId:

        "innerPeace",



    page:

        8,



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Assessment06.init = function() {


    if (

        CTMPATH.Assessment06.initialized

    ) {


        return;



    }



    CTMPATH.Assessment06.loadQuestions();



    CTMPATH.Assessment06.bindEvents();



    CTMPATH.Assessment06.initialized = true;



};




/* ==========================================================================
   LOAD QUESTIONS

   Uses frontend question repository.

   ========================================================================== */


CTMPATH.Assessment06.loadQuestions = function() {


    const assessment =

        CTMPATH.getQuestionsByPillar(

            CTMPATH.Assessment06.pillarId

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

   File        : assessment-06.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Assessment06.bindEvents = function() {


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


                CTMPATH.Assessment06.next();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Assessment06.previous();



            }

        );



    }



};




/* ==========================================================================
   NEXT ACTION

   Moves to Assessment 07.

   ========================================================================== */


CTMPATH.Assessment06.next = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            9

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PREVIOUS ACTION

   Returns to Financial Freedom™ assessment.

   ========================================================================== */


CTMPATH.Assessment06.previous = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            7

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Assessment06.activate = function() {


    CTMPATH.Assessment06.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 8

        ) {


            CTMPATH.Assessment06.activate();



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

            "assessment-06-page"

        );



        if (page) {


            CTMPATH.Assessment06.activate();



        }



    }

);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-06.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   QUESTION RENDERING HOOK

   Delegates rendering responsibility to shared assessment layer.

   ========================================================================== */


CTMPATH.Assessment06.render = function() {


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


                ${CTMPATH.Assessment06.createRatingOptions(

                    question.id

                )}


            </div>


        `;



        container.appendChild(

            card

        );



    });



    CTMPATH.Assessment06.bindRatingEvents();



    return true;



};




/* ==========================================================================
   CREATE RATING OPTIONS

   Presentation helper only.

   ========================================================================== */


CTMPATH.Assessment06.createRatingOptions = function(questionId) {


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


CTMPATH.Assessment06.bindRatingEvents = function() {


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

   File        : assessment-06.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   AFTER LOAD REFRESH

   Ensures question interface renders after initialization.

   ========================================================================== */


CTMPATH.Assessment06.refresh = function() {


    CTMPATH.Assessment06.render();



};




/* ==========================================================================
   ASSESSMENT READY EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_ASSESSMENT_READY",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 8

        ) {


            CTMPATH.Assessment06.refresh();



        }



    }

);




/* ==========================================================================
   RESTORE RESPONSES

   Restores temporary frontend selections.

   ========================================================================== */


CTMPATH.Assessment06.restoreResponses = function() {


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


CTMPATH.Assessment06.reset = function() {


    const container = document.getElementById(

        "question-container"

    );



    if (container) {


        container.innerHTML = "";



    }



    CTMPATH.Assessment06.initialized = false;



};




/* ==========================================================================
   END OF FILE

   File:

   js/assessment-06.js


   Status:

   STAGE 8 — ASSESSMENT 06 CONTROLLER COMPLETE


   Next:

   STAGE 9 — ASSESSMENT 07

   Growth & Mastery™

   ========================================================================== */
