
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Version     : 1.0
   Status      : DEVELOPMENT

   Purpose:
   Assessment scoring engine.

   Responsibilities:

   • Calculate pillar scores.
   • Aggregate assessment responses.
   • Prepare score data.

   Does NOT:

   • Generate diagnosis.
   • Generate prescription.
   • Create reports.

   Backend ownership:

   • Final interpretation.
   • Life level classification.
   • Recommendations.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};




/* ==========================================================================
   SCORING CONTROLLER
   ========================================================================== */


CTMPATH.Scoring = {


    version:

        "1.0",



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Scoring.init = function() {


    if (

        CTMPATH.Scoring.initialized

    ) {


        return;



    }



    CTMPATH.Scoring.initialized = true;



};




/* ==========================================================================
   CALCULATE QUESTION TOTAL

   Adds question scores for a pillar.

   ========================================================================== */


CTMPATH.Scoring.calculatePillarScore = function(

    responses

) {


    let total = 0;



    if (

        !responses ||

        !Array.isArray(responses)

    ) {


        return total;



    }



    responses.forEach(function(score) {



        total += Number(score) || 0;



    });



    return total;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   CALCULATE ALL PILLAR SCORES

   Receives pillar response groups.

   Example:

   {
       purpose: [8,7,9],
       health: [6,8,7]
   }

   Returns:

   {
       purpose: 24,
       health: 21
   }

   ========================================================================== */


CTMPATH.Scoring.calculateAllPillars = function(

    pillarResponses

) {


    const scores = {};



    if (

        !pillarResponses

    ) {


        return scores;



    }



    Object.keys(

        pillarResponses

    )

    .forEach(function(pillar) {



        scores[pillar] =

            CTMPATH.Scoring.calculatePillarScore(

                pillarResponses[pillar]

            );



    });



    return scores;



};




/* ==========================================================================
   CALCULATE TOTAL SCORE

   Adds all pillar scores.

   Maximum:

   12 Pillars × 30 = 360

   ========================================================================== */


CTMPATH.Scoring.calculateTotalScore = function(

    pillarScores

) {


    let total = 0;



    if (

        !pillarScores

    ) {


        return total;



    }



    Object.keys(

        pillarScores

    )

    .forEach(function(pillar) {



        total +=

            Number(

                pillarScores[pillar]

            ) || 0;



    });



    return total;



};




/* ==========================================================================
   CALCULATE COMPLETION

   Determines answered question percentage.

   ========================================================================== */


CTMPATH.Scoring.calculateCompletion = function(

    responses,

    totalQuestions

) {


    if (

        !responses ||

        !totalQuestions

    ) {


        return 0;



    }



    const answered =

        Object.keys(responses).length;



    return Math.round(

        (

            answered /

            totalQuestions

        ) * 100

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   NORMALIZE SCORE

   Ensures score values remain
   within valid assessment range.

   Range:

   Minimum: 1
   Maximum: 10

   ========================================================================== */


CTMPATH.Scoring.normalizeScore = function(

    score

) {


    score = Number(score) || 0;



    if (

        score < 1

    ) {


        return 1;



    }



    if (

        score > 10

    ) {


        return 10;



    }



    return score;



};




/* ==========================================================================
   BUILD PILLAR DATA

   Creates structured pillar output.

   Used by:

   • KALA CHAKRA™
   • Backend submission

   ========================================================================== */


CTMPATH.Scoring.buildPillarData = function(

    pillarScores

) {


    const data = [];



    if (

        !pillarScores

    ) {


        return data;



    }



    Object.keys(

        pillarScores

    )

    .forEach(function(pillar) {



        data.push(


            {


                pillar:

                    pillar,



                score:

                    pillarScores[pillar]



            }


        );



    });



    return data;



};




/* ==========================================================================
   PREPARE SCORE PAYLOAD

   Creates standard payload format.

   ========================================================================== */


CTMPATH.Scoring.preparePayload = function(

    responses

) {


    return {


        responses:

            responses || {},



        timestamp:

            new Date().toISOString()



    };



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   GET SCORE STATUS

   Returns scoring engine state.

   ========================================================================== */


CTMPATH.Scoring.getStatus = function() {


    return {


        version:

            CTMPATH.Scoring.version,



        initialized:

            CTMPATH.Scoring.initialized



    };



};




/* ==========================================================================
   VALIDATE RESPONSES

   Ensures assessment responses are usable.

   ========================================================================== */


CTMPATH.Scoring.validateResponses = function(

    responses

) {


    if (

        !responses ||

        typeof responses !== "object"

    ) {


        return false;



    }



    return true;



};




/* ==========================================================================
   SCORE ASSESSMENT

   Creates complete score structure.

   Presentation-independent.

   ========================================================================== */


CTMPATH.Scoring.scoreAssessment = function(

    pillarResponses

) {


    if (

        !CTMPATH.Scoring.validateResponses(

            pillarResponses

        )

    ) {


        return {


            pillars: {},


            total: 0



        };



    }



    const pillarScores =

        CTMPATH.Scoring.calculateAllPillars(

            pillarResponses

        );



    return {


        pillars:

            pillarScores,



        total:

            CTMPATH.Scoring.calculateTotalScore(

                pillarScores

            )



    };



};




/* ==========================================================================
   INITIALIZE SCORING

   ========================================================================== */


document.addEventListener(

    "CTMPATH_APP_READY",

    function() {


        CTMPATH.Scoring.init();



    }

);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Continuation: Batch 1E

   ========================================================================== */


/* ==========================================================================
   SCORE EVENT HANDLER

   Receives completed assessment data.

   Sends score-ready structure forward.

   ========================================================================== */


document.addEventListener(

    "CTMPATH_ASSESSMENT_COMPLETE",

    function(event) {


        if (

            !event.detail ||

            !event.detail.payload

        ) {


            return;



        }



        const payload =

            event.detail.payload;



        const scoreResult =

            CTMPATH.Scoring.scoreAssessment(

                payload.responses

            );



        document.dispatchEvent(

            new CustomEvent(

                "CTMPATH_SCORE_READY",

                {

                    detail:

                    {

                        score:

                            scoreResult

                    }

                }

            )

        );



    }

);




/* ==========================================================================
   CLEAR SCORES

   Resets temporary scoring state.

   ========================================================================== */


CTMPATH.Scoring.clear = function() {


    CTMPATH.Scoring.lastScore = null;



};




/* ==========================================================================
   STORE LAST SCORE

   Temporary runtime storage only.

   ========================================================================== */


CTMPATH.Scoring.setLastScore = function(

    score

) {


    CTMPATH.Scoring.lastScore = score;



};




/* ==========================================================================
   GET LAST SCORE

   ========================================================================== */


CTMPATH.Scoring.getLastScore = function() {


    return CTMPATH.Scoring.lastScore || null;



};




/* ==========================================================================
   END OF FILE

   File:

   js/scoring.js


   Status:

   SCORING ENGINE COMPLETE


   ========================================================================== */
