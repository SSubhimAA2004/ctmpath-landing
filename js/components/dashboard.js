
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : js/components/dashboard.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   Purpose
   --------------------------------------------------------------------------
   CTM PATH™ 360™
   Life Alignment Dashboard™

   Responsibilities

   ✓ Render Overall Score
   ✓ Render Pillar Score
   ✓ Render Current Status
   ✓ Render Progress
   ✓ Coordinate Kala Chakra™

   Does NOT

   ✗ Calculate Scores
   ✗ Calculate Status
   ✗ Contain Business Rules

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.Dashboard = (() => {

    /* ======================================================================
       STATE
       ====================================================================== */

    const state = {

        initialized : false

    };



    /* ======================================================================
       ELEMENTS
       ====================================================================== */

    const elements = {

        overallScore : null,

        pillarName : null,

        pillarScore : null,

        statusPanel : null,

        statusName : null,

        statusSubtitle : null,

        statusBadge : null,

        progressFill : null,

        progressStep : null

    };



    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function initialize(){

        if(state.initialized){

            return;

        }

        cacheElements();

        state.initialized = true;

    }



    /* ======================================================================
       CACHE
       ====================================================================== */

    function cacheElements(){

        elements.overallScore =

            document.querySelector(

                "[data-overall-score]"

            );



        elements.pillarName =

            document.querySelector(

                "[data-pillar-name]"

            );



        elements.pillarScore =

            document.querySelector(

                "[data-pillar-score]"

            );



        elements.statusPanel =

            document.querySelector(

                "[data-status-panel]"

            );



        elements.statusName =

            document.querySelector(

                "[data-status-name]"

            );



        elements.statusSubtitle =

            document.querySelector(

                "[data-status-subtitle]"

            );



        elements.statusBadge =

            document.querySelector(

                "[data-status-badge]"

            );



        elements.progressFill =

            document.querySelector(

                "[data-progress-fill]"

            );



        elements.progressStep =

            document.querySelector(

                "[data-progress-step]"

            );

    }



    /* ======================================================================
       UPDATE
       ====================================================================== */

    function update(model){

        renderOverall(model);

        renderPillar(model);

        renderStatus(model);

        renderProgress(model);

        renderKalaChakra(model);

    }



    /* ======================================================================
       OVERALL
       ====================================================================== */

    function renderOverall(model){

        if(elements.overallScore){

            elements.overallScore.textContent =

                model.overallScore;

        }

    }



    /* ======================================================================
       PILLAR
       ====================================================================== */

    function renderPillar(model){

        if(elements.pillarName){

            elements.pillarName.textContent =

                model.pillarName;

        }



        if(elements.pillarScore){

            elements.pillarScore.textContent =

                model.pillarScore;

        }

    }



    /* ======================================================================
       STATUS
       ====================================================================== */

    function renderStatus(model){

        if(!elements.statusPanel){

            return;

        }



        elements.statusPanel.classList.remove(

            "status-learner",

            "status-leader",

            "status-legend"

        );



        elements.statusPanel.classList.add(

            "status-" +

            model.status.toLowerCase()

        );



        if(elements.statusName){

            elements.statusName.textContent =

                model.statusTitle;

        }



        if(elements.statusSubtitle){

            elements.statusSubtitle.textContent =

                model.statusSubtitle;

        }



        if(elements.statusBadge){

            elements.statusBadge.textContent =

                model.statusBadge;

        }

    }



    /* ======================================================================
       PROGRESS
       ====================================================================== */

    function renderProgress(model){

        if(elements.progressStep){

            elements.progressStep.textContent =

                model.currentPillar;

        }



        if(elements.progressFill){

            elements.progressFill.style.width =

                model.progressPercent + "%";

        }

    }



    /* ======================================================================
       KALA CHAKRA
       ====================================================================== */

    function renderKalaChakra(model){

        if(

            window.CTM.KalaChakra &&

            typeof window.CTM.KalaChakra.update === "function"

        ){

            window.CTM.KalaChakra.update(model);

        }

    }



    /* ======================================================================
       RESET
       ====================================================================== */

    function reset(){

        update({

            overallScore : 0,

            pillarName : "PURPOSE™",

            pillarScore : 0,

            currentPillar : 1,

            progressPercent : 0,

            status : "learner",

            statusTitle : "LEARNER™",

            statusSubtitle :

                "Your journey has just begun.",

            statusBadge :

                "Emerging"

        });

    }



    /* ======================================================================
       API
       ====================================================================== */

    return{

        initialize,

        update,

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

            window.CTM.Dashboard &&

            typeof window.CTM.Dashboard.initialize==="function"

        ){

            window.CTM.Dashboard.initialize();

        }

    }

);



/* ==========================================================================

   END OF FILE

   File        : js/components/dashboard.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   ========================================================================== */

