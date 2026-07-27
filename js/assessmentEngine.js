
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : assessmentEngine.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   ==========================================================================
   PURPOSE

   Central Business Rules Engine

   Owns

   ✓ Question Scores
   ✓ Pillar Scores
   ✓ Overall 360 Score
   ✓ Learner™ / Leader™ / Legend™
   ✓ Dashboard Model
   ✓ Kala Chakra Model
   ✓ Reflection Selection

   Does NOT

   ✗ Render UI
   ✗ Manipulate DOM
   ✗ Handle Navigation

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.AssessmentEngine = (() => {

    /* ======================================================================
       CONSTANTS
       ====================================================================== */

    const TOTAL_PILLARS = 12;

    const QUESTIONS_PER_PILLAR = 3;

    const MAX_QUESTION_SCORE = 10;

    const MAX_PILLAR_SCORE = 30;

    const MAX_TOTAL_SCORE = 360;



    /* ======================================================================
       STATUS LEVELS
       ====================================================================== */

    const STATUS = {

        LEARNER : {

            key : "learner",

            title : "LEARNER™",

            badge : "Emerging",

            subtitle :

                "Beginning Your Journey"

        },



        LEADER : {

            key : "leader",

            title : "LEADER™",

            badge : "Growing",

            subtitle :

                "Living With Intention"

        },



        LEGEND : {

            key : "legend",

            title : "LEGEND™",

            badge : "Inspiring",

            subtitle :

                "Living Your Highest Potential"

        }

    };



    /* ======================================================================
       LIFE PILLARS
       ====================================================================== */

    const PILLARS = [

        "Purpose™",

        "Health™",

        "Relationships™",

        "Mind & Emotional Well-Being™",

        "Character™",

        "Growth & Learning™",

        "Career & Contribution™",

        "Financial Stability™",

        "Self-Discipline™",

        "Community™",

        "Systems & Balance™",

        "Legacy™"

    ];



    /* ======================================================================
       INTERNAL STATE
       ====================================================================== */

    const state = {

        currentPillar : 1,

        responses : {},

        pillarScores : new Array(TOTAL_PILLARS).fill(0),

        overallScore : 0

    };



    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function initialize(){

        reset();

    }



    /* ======================================================================
       RESET
       ====================================================================== */

    function reset(){

        state.currentPillar = 1;

        state.responses = {};

        state.pillarScores.fill(0);

        state.overallScore = 0;

    }



    /* ======================================================================
       GET CURRENT PILLAR
       ====================================================================== */

    function getCurrentPillar(){

        return state.currentPillar;

    }



    /* ======================================================================
       SET CURRENT PILLAR
       ====================================================================== */

    function setCurrentPillar(index){

        state.currentPillar =

            Math.max(

                1,

                Math.min(

                    TOTAL_PILLARS,

                    index

                )

            );

    }



    /* ======================================================================
       SAVE RESPONSE

       response format

       {

           q1 : 8,

           q2 : 7,

           q3 : 9

       }

       ====================================================================== */

    function saveResponses(

        pillar,

        response

    ){

        state.responses[pillar] = {

            q1 :

                normalize(response.q1),

            q2 :

                normalize(response.q2),

            q3 :

                normalize(response.q3)

        };



        calculatePillarScore(

            pillar

        );



        calculateOverallScore();

    }

                               
    /* ======================================================================
       NORMALIZE SCORE
       ====================================================================== */

    function normalize(score){

        const value = Number(score) || 0;

        return Math.max(

            1,

            Math.min(

                MAX_QUESTION_SCORE,

                value

            )

        );

    }



    /* ======================================================================
       CALCULATE PILLAR SCORE
       ====================================================================== */

    function calculatePillarScore(pillar){

        const response = state.responses[pillar];

        if(!response){

            return 0;

        }



        const score =

            response.q1 +

            response.q2 +

            response.q3;



        state.pillarScores[pillar - 1] = score;

        return score;

    }



    /* ======================================================================
       CALCULATE OVERALL SCORE
       ====================================================================== */

    function calculateOverallScore(){

        state.overallScore =

            state.pillarScores.reduce(

                (total, score) => total + score,

                0

            );



        return state.overallScore;

    }



    /* ======================================================================
       DETERMINE PILLAR STATUS
       ====================================================================== */

    function determinePillarStatus(score){

        if(score <= 10){

            return STATUS.LEARNER;

        }



        if(score <= 20){

            return STATUS.LEADER;

        }



        return STATUS.LEGEND;

    }



    /* ======================================================================
       DETERMINE OVERALL STATUS
       ====================================================================== */

    function determineOverallStatus(score){

        if(score <= 120){

            return STATUS.LEARNER;

        }



        if(score <= 240){

            return STATUS.LEADER;

        }



        return STATUS.LEGEND;

    }



    /* ======================================================================
       PROGRESS
       ====================================================================== */

    function getProgressPercent(){

        return (

            state.currentPillar /

            TOTAL_PILLARS

        ) * 100;

    }



    /* ======================================================================
       DASHBOARD MODEL
       ====================================================================== */

    function getDashboardModel(){

        const pillarScore =

            state.pillarScores[

                state.currentPillar - 1

            ];



        const status =

            determinePillarStatus(

                pillarScore

            );



        return{

            overallScore :

                state.overallScore,



            pillarName :

                PILLARS[

                    state.currentPillar - 1

                ],



            pillarScore :

                pillarScore,



            currentPillar :

                state.currentPillar,



            progressPercent :

                getProgressPercent(),



            status :

                status.key,



            statusTitle :

                status.title,



            statusBadge :

                status.badge,



            statusSubtitle :

                status.subtitle,



            insight :

                getInsight(status.key)

        };

    }



    /* ======================================================================
       KALA CHAKRA MODEL
       ====================================================================== */

    function getKalaChakraModel(){

        return{

            segments :

                [...state.pillarScores],



            overallScore :

                state.overallScore,



            overallStatus :

                determineOverallStatus(

                    state.overallScore

                )

        };

    }



    /* ======================================================================
       INSIGHT
       ====================================================================== */

    function getInsight(level){

        switch(level){

            case "learner":

                return

                    "Every meaningful transformation begins with awareness.";



            case "leader":

                return

                    "You are steadily aligning your daily choices with your vision.";



            default:

                return

                    "You are living many of your highest values. Continue inspiring others.";

        }

    }



    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return{

        initialize,



        reset,



        saveResponses,



        getCurrentPillar,



        setCurrentPillar,



        getDashboardModel,



        getKalaChakraModel,



        determinePillarStatus,



        determineOverallStatus

    };



})();



/* ==========================================================================

   END OF FILE

   File        : assessmentEngine.js

   Version     : 1.0

   Status      : 🔒 LOCKED

   ========================================================================== */

