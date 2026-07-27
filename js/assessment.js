
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : assessment.js
   Version     : 2.0
   Status      : 🔒 LOCKED

   ==========================================================================
   PURPOSE

   Assessment Page Controller

   Owns

   ✓ Component Initialization
   ✓ Event Wiring
   ✓ Page Navigation
   ✓ Assessment Flow
   ✓ Dashboard Refresh

   Does NOT

   ✗ Business Rules
   ✗ Score Calculations
   ✗ Status Calculations

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.Assessment = (() => {

    /* ======================================================================
       STATE
       ====================================================================== */

    const state = {

        currentQuestion : 1,

        currentPillar : 1,

        answers : {

            q1 : null,

            q2 : null,

            q3 : null

        }

    };



    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function initialize(){

        initializeComponents();

        bindEvents();

        refreshDashboard();

    }



    /* ======================================================================
       COMPONENTS
       ====================================================================== */

    function initializeComponents(){

        window.CTM.RatingScale.initialize();

        window.CTM.KalaChakraDashboard.initialize();

        window.CTM.AssessmentEngine.initialize();

    }



    /* ======================================================================
       EVENTS
       ====================================================================== */

    function bindEvents(){

        document.addEventListener(

            "ctm:score-selected",

            handleRating

        );

    }



    /* ======================================================================
       RATING EVENT
       ====================================================================== */

    function handleRating(event){

        const score =

            event.detail.score;

        saveAnswer(score);

    }



    /* ======================================================================
       SAVE ANSWER
       ====================================================================== */

    function saveAnswer(score){

        switch(state.currentQuestion){

            case 1:

                state.answers.q1 = score;

                break;

            case 2:

                state.answers.q2 = score;

                break;

            case 3:

                state.answers.q3 = score;

                break;

        }

        updateWorkflow();

    }



    /* ======================================================================
       WORKFLOW
       ====================================================================== */

    function updateWorkflow(){

        if(

            state.answers.q1 !== null &&

            state.answers.q2 !== null &&

            state.answers.q3 !== null

        ){

            window.CTM.AssessmentEngine.saveResponses(

                state.currentPillar,

                state.answers

            );

            refreshDashboard();

        }

    }

                             /* ======================================================================
       REFRESH DASHBOARD
       ====================================================================== */

    function refreshDashboard(){

        const model =

            window.CTM.AssessmentEngine

            .getDashboardModel();



        if(

            window.CTM.KalaChakraDashboard &&

            typeof window.CTM.KalaChakraDashboard.update === "function"

        ){

            window.CTM.KalaChakraDashboard.update(

                model

            );

        }

    }



    /* ======================================================================
       NEXT QUESTION
       ====================================================================== */

    function nextQuestion(){

        if(state.currentQuestion < 3){

            state.currentQuestion++;

            return;

        }

    }



    /* ======================================================================
       PREVIOUS QUESTION
       ====================================================================== */

    function previousQuestion(){

        if(state.currentQuestion > 1){

            state.currentQuestion--;

        }

    }



    /* ======================================================================
       NEXT PILLAR
       ====================================================================== */

    function nextPillar(){

        if(state.currentPillar >= 12){

            finishAssessment();

            return;

        }



        state.currentPillar++;

        state.currentQuestion = 1;



        state.answers = {

            q1 : null,

            q2 : null,

            q3 : null

        };



        window.CTM.AssessmentEngine

            .setCurrentPillar(

                state.currentPillar

            );



        refreshDashboard();

    }



    /* ======================================================================
       PREVIOUS PILLAR
       ====================================================================== */

    function previousPillar(){

        if(state.currentPillar <= 1){

            return;

        }



        state.currentPillar--;

        state.currentQuestion = 1;



        window.CTM.AssessmentEngine

            .setCurrentPillar(

                state.currentPillar

            );



        refreshDashboard();

    }



    /* ======================================================================
       COMPLETE
       ====================================================================== */

    function finishAssessment(){

        console.log(

            "Assessment Complete."

        );



        /*
            Phase 2

            Generate Report

            Generate PDF

            Save

            Email

            Redirect
        */

    }



    /* ======================================================================
       RESET
       ====================================================================== */

    function reset(){

        state.currentQuestion = 1;

        state.currentPillar = 1;



        state.answers = {

            q1 : null,

            q2 : null,

            q3 : null

        };



        window.CTM.AssessmentEngine.reset();

        refreshDashboard();

    }



    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return{

        initialize,



        nextQuestion,



        previousQuestion,



        nextPillar,



        previousPillar,



        reset

    };



})();



/* ==========================================================================
   AUTO INITIALIZATION
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        if(

            window.CTM.Assessment &&

            typeof window.CTM.Assessment.initialize==="function"

        ){

            window.CTM.Assessment.initialize();

        }

    }

);



/* ==========================================================================

   END OF FILE

   File        : assessment.js
   Version     : 2.0
   Status      : 🔒 LOCKED

   ========================================================================== */

