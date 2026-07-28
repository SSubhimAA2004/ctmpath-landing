
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessmentEngine.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend assessment orchestration engine.

   Responsibilities:

   • Load assessment questions.
   • Render question interface.
   • Capture user selections.
   • Maintain temporary assessment state.
   • Submit responses through API service.

   Does NOT:

   • Calculate scores.
   • Determine pillar results.
   • Generate diagnosis.
   • Generate prescription.
   • Apply business rules.

   Backend Ownership:

   • Assessment persistence
   • Scoring engine
   • KALA CHAKRA™ engine
   • Diagnosis engine
   • Prescription engine

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   ASSESSMENT ENGINE
   ========================================================================== */


CTMPATH.AssessmentEngine = {


    version:

        "1.0",



    initialized:

        false,



    currentAssessment:

        null,



    currentQuestion:

        0,



    responses:

        {}



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.AssessmentEngine.init = function() {


    CTMPATH.AssessmentEngine.initialized = true;



    CTMPATH.AssessmentEngine.restoreState();



};




/* ==========================================================================
   LOAD ASSESSMENT

   Receives assessment configuration from data layer.

   ========================================================================== */


CTMPATH.AssessmentEngine.load = function(config) {


    CTMPATH.AssessmentEngine.currentAssessment = config;



    CTMPATH.AssessmentEngine.currentQuestion = 0;



    CTMPATH.AssessmentEngine.responses = {};



    return true;



};




/* ==========================================================================
   GET CURRENT QUESTION

   ========================================================================== */


CTMPATH.AssessmentEngine.getCurrentQuestion = function() {


    if (

        !CTMPATH.AssessmentEngine.currentAssessment

    ) {


        return null;



    }



    return CTMPATH.AssessmentEngine.currentAssessment.questions[

        CTMPATH.AssessmentEngine.currentQuestion

    ];



};




/* ==========================================================================
   RECORD RESPONSE

   Stores temporary answer selection.

   Final persistence happens through API.

   ========================================================================== */


CTMPATH.AssessmentEngine.recordResponse = function(

    questionId,

    answer

) {


    CTMPATH.AssessmentEngine.responses[

        questionId

    ] = answer;



    CTMPATH.AssessmentEngine.saveState();



    return true;



};




/* ==========================================================================
   MOVE TO NEXT QUESTION

   ========================================================================== */


CTMPATH.AssessmentEngine.nextQuestion = function() {


    if (

        !CTMPATH.AssessmentEngine.currentAssessment

    ) {


        return false;



    }



    const total =

        CTMPATH.AssessmentEngine.currentAssessment.questions.length;



    if (

        CTMPATH.AssessmentEngine.currentQuestion >= total - 1

    ) {


        return false;



    }



    CTMPATH.AssessmentEngine.currentQuestion++;



    return true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : assessmentEngine.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   MOVE TO PREVIOUS QUESTION

   ========================================================================== */


CTMPATH.AssessmentEngine.previousQuestion = function() {


    if (

        CTMPATH.AssessmentEngine.currentQuestion <= 0

    ) {


        return false;



    }



    CTMPATH.AssessmentEngine.currentQuestion--;



    return true;



};




/* ==========================================================================
   GET PROGRESS

   Calculates frontend display progress only.

   Does NOT calculate assessment score.

   ========================================================================== */


CTMPATH.AssessmentEngine.getProgress = function() {


    if (

        !CTMPATH.AssessmentEngine.currentAssessment

    ) {


        return {


            current:

                0,


            total:

                0,


            percentage:

                0



        };


    }



    const total =

        CTMPATH.AssessmentEngine.currentAssessment.questions.length;



    const current =

        CTMPATH.AssessmentEngine.currentQuestion + 1;



    return {


        current:

            current,



        total:

            total,



        percentage:

            Math.round(

                (

                    current /

                    total

                )

                *

                100

            )



    };



};




/* ==========================================================================
   GET RESPONSES

   Returns temporary captured responses.

   ========================================================================== */


CTMPATH.AssessmentEngine.getResponses = function() {


    return CTMPATH.AssessmentEngine.responses;



};




/* ==========================================================================
   SUBMIT ASSESSMENT RESPONSES

   Sends captured responses to backend.

   Backend owns validation and scoring.

   ========================================================================== */


CTMPATH.AssessmentEngine.submit = async function() {


    if (

        !CTMPATH.API ||

        typeof CTMPATH.API.completeAssessment !==

            "function"

    ) {


        throw new Error(

            "Assessment API service unavailable."

        );



    }



    const payload = {


        responses:

            CTMPATH.AssessmentEngine.responses



    };



    const result = await CTMPATH.API.completeAssessment(

        payload

    );



    return result;



};




/* ==========================================================================
   SAVE TEMPORARY STATE

   ========================================================================== */


CTMPATH.AssessmentEngine.saveState = function() {


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.saveProgress ===

            "function"

    ) {


        CTMPATH.Storage.saveProgress(


            {


                question:

                    CTMPATH.AssessmentEngine.currentQuestion,



                responses:

                    CTMPATH.AssessmentEngine.responses



            }


        );



    }



};




/* ==========================================================================
   RESTORE TEMPORARY STATE

   ========================================================================== */


CTMPATH.AssessmentEngine.restoreState = function() {


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.getProgress ===

            "function"

    ) {


        const saved =

            CTMPATH.Storage.getProgress();



        if (

            saved

        ) {


            CTMPATH.AssessmentEngine.currentQuestion =

                saved.question || 0;



            CTMPATH.AssessmentEngine.responses =

                saved.responses || {};



        }



    }



};




/* ==========================================================================
   RESET ASSESSMENT SESSION

   Clears temporary frontend assessment state.

   ========================================================================== */


CTMPATH.AssessmentEngine.reset = function() {


    CTMPATH.AssessmentEngine.currentQuestion = 0;



    CTMPATH.AssessmentEngine.responses = {};



    if (

        CTMPATH.Storage

    ) {


        CTMPATH.Storage.remove(

            "assessmentProgress"

        );



    }



};




/* ==========================================================================
   END OF FILE

   File:

   js/assessmentEngine.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   js/scoring.js

   ========================================================================== */
