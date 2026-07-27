
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

                               
