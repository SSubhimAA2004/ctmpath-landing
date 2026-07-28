
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessmentEngine.js
   Version     : 1.0
   Status      : DEVELOPMENT

   Purpose:

   Core assessment orchestration engine.


   Responsibilities:

   • Load assessment questions.
   • Render question interface.
   • Capture responses.
   • Manage assessment state.


   Does NOT:

   • Generate diagnosis.
   • Generate prescription.
   • Create reports.


   Backend owns:

   • Final calculations.
   • Diagnosis generation.
   • Prescription generation.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */

window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   ASSESSMENT ENGINE
   ========================================================================== */

CTMPATH.AssessmentEngine =
{


    version:

        "1.0",



    initialized:

        false,



    currentAssessment:

        null,



    responses:

        {}



};



/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.AssessmentEngine.init = function()
{


    if (

        CTMPATH.AssessmentEngine.initialized

    ) {


        return;


    }



    CTMPATH.AssessmentEngine.restoreResponses();



    CTMPATH.AssessmentEngine.bindEvents();



    CTMPATH.AssessmentEngine.initialized = true;


    console.log(
        "AssessmentEngine initialized."
    );


};



/* ==========================================================================
   BIND GLOBAL EVENTS

   Application-level event bindings.

   ========================================================================== */


CTMPATH.AssessmentEngine.bindEvents = function()
{


    console.log(
        "AssessmentEngine events bound."
    );


};



/* ==========================================================================
   LOAD ASSESSMENT

   Receives pillar question set.

   ========================================================================== */


CTMPATH.AssessmentEngine.load = function(

    assessment

) {


    CTMPATH.AssessmentEngine.currentAssessment =

        assessment;



    CTMPATH.AssessmentEngine.render();



};

/* ==========================================================================
   RENDER ASSESSMENT

   Creates question interface.

   Uses:

   • question-card component
   • rating-scale component

   ========================================================================== */


CTMPATH.AssessmentEngine.render = function()
{


    const container = document.getElementById(

        "question-container"

    );



    if (!container)
    {


        return false;


    }



    if (

        !CTMPATH.AssessmentEngine.currentAssessment

    )
    {


        return false;


    }



    container.innerHTML = "";



    CTMPATH.AssessmentEngine.currentAssessment.questions

        .forEach(function(question, index)
        {


            const questionCard =

                CTMPATH.AssessmentEngine.createQuestionCard(

                    question,

                    index + 1

                );



            container.appendChild(

                questionCard

            );


        });



    CTMPATH.AssessmentEngine.bindRatingEvents();



    return true;


};




/* ==========================================================================
   CREATE QUESTION CARD

   Presentation generation only.

   ========================================================================== */


CTMPATH.AssessmentEngine.createQuestionCard = function(

    question,

    number

)
{


    const card = document.createElement(

        "div"

    );



    card.className =

        "question-card";



    card.innerHTML = `


        <div class="question-number">

            Question ${number}

        </div>


        <div class="question-text">

            ${question.text}

        </div>


        <div class="rating-scale">

            ${
                CTMPATH.AssessmentEngine.createRatingScale(

                    question.id

                )
            }

        </div>


    `;



    return card;


};




/* ==========================================================================
   CREATE RATING SCALE

   Generates 1-10 response options.

   Presentation helper only.

   ========================================================================== */


CTMPATH.AssessmentEngine.createRatingScale = function(

    questionId

)
{


    let html = "";



    for (

        let score = 1;

        score <= 10;

        score++

    )
    {


        html += `


            <label class="rating-option">


                <input

                    type="radio"

                    name="${questionId}"

                    value="${score}">


                <span>

                    ${score}

                </span>


            </label>


        `;


    }



    return html;


};

/* ==========================================================================
   BIND RATING EVENTS

   Captures user selections.

   ========================================================================== */


CTMPATH.AssessmentEngine.bindRatingEvents = function()
{


    const options = document.querySelectorAll(

        ".rating-option input"

    );



    options.forEach(function(option)
    {


        option.addEventListener(

            "change",

            function()
            {


                CTMPATH.AssessmentEngine.recordResponse(

                    option.name,

                    option.value

                );


            }

        );


    });


};




/* ==========================================================================
   RECORD RESPONSE

   Stores temporary assessment response.

   ========================================================================== */


CTMPATH.AssessmentEngine.recordResponse = function(

    questionId,

    value

)
{


    CTMPATH.AssessmentEngine.responses[questionId] =

        Number(value);



    CTMPATH.AssessmentEngine.saveResponses();



    document.dispatchEvent(

        new CustomEvent(

            "CTMPATH_RESPONSE_UPDATED",

            {

                detail:

                {

                    questionId:

                        questionId,


                    value:

                        value

                }

            }

        )

    );


};




/* ==========================================================================
   GET RESPONSES

   Returns current assessment answers.

   ========================================================================== */


CTMPATH.AssessmentEngine.getResponses = function()
{


    return CTMPATH.AssessmentEngine.responses;


};




/* ==========================================================================
   SAVE RESPONSES

   Saves temporary assessment state.

   ========================================================================== */


CTMPATH.AssessmentEngine.saveResponses = function()
{


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.saveAssessmentState ===

            "function"

    )
    {


        CTMPATH.Storage.saveAssessmentState(

            CTMPATH.AssessmentEngine.responses

        );


    }


};

/* ==========================================================================
   RESTORE RESPONSES

   Restores unfinished assessment.

   ========================================================================== */


CTMPATH.AssessmentEngine.restoreResponses = function()
{


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.getAssessmentState ===

            "function"

    )
    {


        const savedResponses =

            CTMPATH.Storage.getAssessmentState();



        if (savedResponses)
        {


            CTMPATH.AssessmentEngine.responses =

                savedResponses;


        }


    }


};




/* ==========================================================================
   CLEAR RESPONSES

   Resets current assessment answers.

   ========================================================================== */


CTMPATH.AssessmentEngine.clearResponses = function()
{


    CTMPATH.AssessmentEngine.responses = {};



    CTMPATH.AssessmentEngine.saveResponses();


};




/* ==========================================================================
   COMPLETE ASSESSMENT

   Finalizes current assessment section.

   Backend submission handled separately.

   ========================================================================== */


CTMPATH.AssessmentEngine.complete = function()
{


    const payload =

    {


        assessment:

            CTMPATH.AssessmentEngine.currentAssessment,



        responses:

            CTMPATH.AssessmentEngine.responses



    };



    document.dispatchEvent(

        new CustomEvent(

            "CTMPATH_ASSESSMENT_COMPLETE",

            {

                detail:

                {

                    payload:

                        payload

                }

            }

        )

    );



    return true;


};




/* ==========================================================================
   GET CURRENT ASSESSMENT

   ========================================================================== */


CTMPATH.AssessmentEngine.getCurrentAssessment = function()
{


    return CTMPATH.AssessmentEngine.currentAssessment;


};




/* ==========================================================================
   SET CURRENT ASSESSMENT

   ========================================================================== */


CTMPATH.AssessmentEngine.setCurrentAssessment = function(

    assessment

)
{


    CTMPATH.AssessmentEngine.currentAssessment =

        assessment;



};




/* ==========================================================================
   INITIALIZE ENGINE

   ========================================================================== */


document.addEventListener(

    "CTMPATH_APP_READY",

    function()
    {


        CTMPATH.AssessmentEngine.init();


    }

);

/* ==========================================================================
   END OF FILE

   File:

   js/assessmentEngine.js


   Status:

   ASSESSMENT ENGINE COMPLETE


   ========================================================================== */
