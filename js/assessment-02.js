
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-02.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 4 — ASSESSMENT 02
                 Vitality™

   Purpose     :
   Vitality™ assessment page controller.

   Responsibilities:

   • Initialize Vitality™ assessment page.
   • Load Vitality™ questions.
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
   VITALITY ASSESSMENT CONTROLLER
   ========================================================================== */


CTMPATH.Assessment02 = {


    version:

        "1.0",



    pillarId:

        "vitality",



    page:

        4,



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Assessment02.init = function() {


    if (

        CTMPATH.Assessment02.initialized

    ) {


        return;



    }



    CTMPATH.Assessment02.loadQuestions();



    CTMPATH.Assessment02.bindEvents();



    CTMPATH.Assessment02.initialized = true;



};




/* ==========================================================================
   LOAD QUESTIONS

   Uses frontend question repository.

   ========================================================================== */


CTMPATH.Assessment02.loadQuestions = function() {


    const assessment =

        CTMPATH.getQuestionsByPillar(

            CTMPATH.Assessment02.pillarId

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

   File        : assessment-02.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   EVENT BINDING

   ========================================================================== */


CTMPATH.Assessment02.bindEvents = function() {


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


                CTMPATH.Assessment02.next();



            }

        );



    }



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Assessment02.previous();



            }

        );



    }



};




/* ==========================================================================
   NEXT ACTION

   Moves to Assessment 03.

   ========================================================================== */


CTMPATH.Assessment02.next = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            5

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PREVIOUS ACTION

   Returns to Purpose™ assessment.

   ========================================================================== */


CTMPATH.Assessment02.previous = function() {


    if (

        CTMPATH.Navigation &&

        typeof CTMPATH.Navigation.goto ===

            "function"

    ) {


        CTMPATH.Navigation.goto(

            3

        );



        return true;



    }



    return false;



};




/* ==========================================================================
   PAGE ACTIVATION

   ========================================================================== */


CTMPATH.Assessment02.activate = function() {


    CTMPATH.Assessment02.init();



};




/* ==========================================================================
   PAGE LOADED EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 4

        ) {


            CTMPATH.Assessment02.activate();



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

            "assessment-02-page"

        );



        if (page) {


            CTMPATH.Assessment02.activate();



        }



    }

);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessment-02.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   QUESTION RENDERING HOOK

   Delegates rendering responsibility to shared assessment layer.

   ========================================================================== */


CTMPATH.Assessment02.render = function() {


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


                ${CTMPATH.Assessment02.createRatingOptions(

                    question.id

                )}


            </div>


        `;



        container.appendChild(

            card

        );



    });



    CTMPATH.Assessment02.bindRatingEvents();



    return true;



};




/* ==========================================================================
   CREATE RATING OPTIONS

   Presentation helper only.

   ========================================================================== */


CTMPATH.Assessment02.createRatingOptions = function(questionId) {


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


CTMPATH.Assessment02.bindRatingEvents = function() {


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

   File        : assessment-02.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   AFTER LOAD REFRESH

   Ensures question interface renders after initialization.

   ========================================================================== */


CTMPATH.Assessment02.refresh = function() {


    CTMPATH.Assessment02.render();



};




/* ==========================================================================
   ASSESSMENT READY EVENT

   ========================================================================== */


document.addEventListener(

    "CTMPATH_ASSESSMENT_READY",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 4

        ) {


            CTMPATH.Assessment02.refresh();



        }



    }

);




/* ==========================================================================
   RESTORE RESPONSES

   Restores temporary frontend selections.

   ========================================================================== */


CTMPATH.Assessment02.restoreResponses = function() {


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


CTMPATH.Assessment02.reset = function() {


    const container = document.getElementById(

        "question-container"

    );



    if (container) {


        container.innerHTML = "";



    }



    CTMPATH.Assessment02.initialized = false;



};




/* ==========================================================================
   END OF FILE

   File:

   js/assessment-02.js


   Status:

   STAGE 4 — ASSESSMENT 02 CONTROLLER COMPLETE


   Next:

   STAGE 5 — ASSESSMENT 03

   Love & Relationships™

   ========================================================================== */
