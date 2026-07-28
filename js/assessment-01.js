
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-01.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 3 — ASSESSMENT 01
                 Purpose™

   Purpose     :
   Purpose™ assessment page controller.

   Responsibilities:

   • Initialize Purpose™ assessment page.
   • Load Purpose™ questions.
   • Render assessment interface.
   • Handle navigation actions.

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
   PURPOSE ASSESSMENT CONTROLLER
   ========================================================================== */


CTMPATH.Assessment01 = {


    version:

        "1.0",



    pillarId:

        "purpose",



    page:

        3,



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Assessment01.init = function() {


    if (

        CTMPATH.Assessment01.initialized

    ) {


        return;



    }



    CTMPATH.Assessment01.loadQuestions();



    CTMPATH.Assessment01.bindEvents();



    CTMPATH.Assessment01.initialized = true;



};




/* ==========================================================================
   LOAD QUESTIONS

   Uses frontend question repository.

   ========================================================================== */


CTMPATH.Assessment01.loadQuestions = function() {


    const assessment =

        CTMPATH.getQuestionsByPillar(

            CTMPATH.Assessment01.pillarId

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

   File        : assessment-01.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Assessment01.bindEvents = function() {


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


                CTMPATH.Assessment01.next();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Assessment01.previous();



            }

        );



    }



};




/* ==========================================================================
   NEXT ACTION

   Moves to next journey step.

   ========================================================================== */


CTMPATH.Assessment01.next = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            4

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PREVIOUS ACTION

   Returns to Registration™.

   ========================================================================== */


CTMPATH.Assessment01.previous = function() {


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
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Assessment01.activate = function() {


    CTMPATH.Assessment01.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 3

        ) {


            CTMPATH.Assessment01.activate();



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

            "assessment-01-page"

        );



        if (page) {


            CTMPATH.Assessment01.activate();



        }



    }

);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-01.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   QUESTION RENDERING HOOK

   Delegates rendering to shared assessment layer.

   This controller does not own UI generation.

   ========================================================================== */


CTMPATH.Assessment01.render = function() {


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


                ${CTMPATH.Assessment01.createRatingOptions(

                    question.id

                )}


            </div>


        `;



        container.appendChild(

            card

        );



    });



    CTMPATH.Assessment01.bindRatingEvents();



    return true;



};




/* ==========================================================================
   CREATE RATING OPTIONS

   Presentation helper only.

   ========================================================================== */


CTMPATH.Assessment01.createRatingOptions = function(questionId) {


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


CTMPATH.Assessment01.bindRatingEvents = function() {


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

   File        : assessment-01.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   AFTER LOAD RENDER

   Ensures questions appear after assessment initialization.

   ========================================================================== */


CTMPATH.Assessment01.refresh = function() {


    CTMPATH.Assessment01.render();



};




/* ==========================================================================
   PAGE READY EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_ASSESSMENT_READY",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 3

        ) {


            CTMPATH.Assessment01.refresh();



        }



    }

);




/* ==========================================================================
   RESTORE PREVIOUS RESPONSES

   Restores frontend session selections.

   Backend remains source of truth.

   ========================================================================== */


CTMPATH.Assessment01.restoreResponses = function() {


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
   ERROR HANDLING

   Controlled frontend feedback.

   ========================================================================== */


CTMPATH.Assessment01.showError = function(message) {


    const container = document.getElementById(

        "assessment-error"

    );



    if (!container) {


        return;



    }



    container.textContent = message;



    container.classList.remove(

        "hidden"

    );



};




/* ==========================================================================
   RESET PAGE

   Clears only current UI state.

   ========================================================================== */


CTMPATH.Assessment01.reset = function() {


    const container = document.getElementById(

        "question-container"

    );



    if (container) {


        container.innerHTML = "";



    }



    CTMPATH.Assessment01.initialized = false;



};




/* ==========================================================================
   END OF FILE

   File:

   js/assessment-01.js


   Status:

   STAGE 3 — ASSESSMENT 01 CONTROLLER COMPLETE


   Next:

   STAGE 4 — ASSESSMENT 02
   Vitality™

   ========================================================================== */
