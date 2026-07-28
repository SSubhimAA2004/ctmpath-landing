
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend scoring presentation helper.

   Responsibilities:

   • Receive backend score results.
   • Format score information.
   • Prepare UI display objects.
   • Provide score presentation utilities.

   Does NOT:

   • Calculate scores.
   • Apply scoring rules.
   • Determine diagnosis.
   • Generate recommendations.

   Backend Ownership:

   • Scoring engine
   • Pillar calculations
   • KALA CHAKRA™ engine
   • Diagnosis engine
   • Prescription engine

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   SCORING PRESENTATION SERVICE
   ========================================================================== */


CTMPATH.Scoring = {


    version:

        "1.0",



    initialized:

        false,



    result:

        null



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Scoring.init = function() {


    CTMPATH.Scoring.initialized = true;



};




/* ==========================================================================
   LOAD SCORE RESULT

   Receives backend generated result.

   ========================================================================== */


CTMPATH.Scoring.load = function(result) {


    CTMPATH.Scoring.result = result;



    return true;



};




/* ==========================================================================
   GET TOTAL SCORE

   Display helper only.

   ========================================================================== */


CTMPATH.Scoring.getTotalScore = function() {


    if (

        !CTMPATH.Scoring.result

    ) {


        return 0;



    }



    return (

        CTMPATH.Scoring.result.totalScore ||

        0

    );



};




/* ==========================================================================
   GET PILLAR SCORES

   Returns backend pillar output.

   ========================================================================== */


CTMPATH.Scoring.getPillarScores = function() {


    if (

        !CTMPATH.Scoring.result

    ) {


        return [];



    }



    return (

        CTMPATH.Scoring.result.pillars ||

        []

    );



};




/* ==========================================================================
   FORMAT SCORE

   Presentation formatting.

   ========================================================================== */


CTMPATH.Scoring.formatScore = function(score) {


    const value = Number(score) || 0;



    return value.toFixed(0);



};




/* ==========================================================================
   SCORE PERCENTAGE

   Display conversion only.

   ========================================================================== */


CTMPATH.Scoring.toPercentage = function(score, maximum) {


    if (

        !maximum

    ) {


        return 0;



    }



    return Math.round(

        (

            Number(score) /

            Number(maximum)

        )

        *

        100

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : scoring.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   GET SCORE LEVEL

   Presentation classification only.

   Actual interpretation belongs to backend.

   ========================================================================== */


CTMPATH.Scoring.getScoreLevel = function(score) {


    const value = Number(score) || 0;



    if (value >= 80) {


        return "Exceptional";



    }



    if (value >= 60) {


        return "Strong";



    }



    if (value >= 40) {


        return "Developing";



    }



    return "Foundation";



};




/* ==========================================================================
   PREPARE SCORE SUMMARY

   Creates display-ready object.

   Does NOT alter backend result.

   ========================================================================== */


CTMPATH.Scoring.getSummary = function() {


    if (

        !CTMPATH.Scoring.result

    ) {


        return null;



    }



    return {


        totalScore:

            CTMPATH.Scoring.formatScore(

                CTMPATH.Scoring.getTotalScore()

            ),



        level:

            CTMPATH.Scoring.getScoreLevel(

                CTMPATH.Scoring.getTotalScore()

            ),



        pillars:

            CTMPATH.Scoring.getPillarScores()



    };



};




/* ==========================================================================
   GET PILLAR DISPLAY DATA

   Formats pillar information for UI cards.

   ========================================================================== */


CTMPATH.Scoring.formatPillars = function() {


    const pillars =

        CTMPATH.Scoring.getPillarScores();



    return pillars.map(function(pillar) {


        return {


            name:

                pillar.name || "",



            score:

                CTMPATH.Scoring.formatScore(

                    pillar.score

                ),



            percentage:

                CTMPATH.Scoring.toPercentage(

                    pillar.score,

                    pillar.maximum || 10

                )



        };



    });



};




/* ==========================================================================
   CLEAR SCORE STATE

   ========================================================================== */


CTMPATH.Scoring.reset = function() {


    CTMPATH.Scoring.result = null;



};




/* ==========================================================================
   STATUS

   Internal diagnostic helper.

   ========================================================================== */


CTMPATH.Scoring.status = function() {


    return {


        initialized:

            CTMPATH.Scoring.initialized,



        hasResult:

            Boolean(

                CTMPATH.Scoring.result

            ),



        version:

            CTMPATH.Scoring.version



    };



};




/* ==========================================================================
   END OF FILE

   File:

   js/scoring.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   js/report.js

   ========================================================================== */

