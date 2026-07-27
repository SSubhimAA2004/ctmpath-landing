
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : js/components/kaalachakra-dashboard.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   Purpose
   --------------------------------------------------------------------------
   CTM PATH™ 360™
   Kala Chakra™ Dashboard Controller

   Responsibilities

   ✓ Render Overall Score
   ✓ Render Current Pillar
   ✓ Render Pillar Score
   ✓ Render Status
   ✓ Render Progress
   ✓ Render Insight
   ✓ Coordinate Kala Chakra™

   Does NOT

   ✗ Calculate Scores
   ✗ Calculate Status
   ✗ Calculate Progress
   ✗ Contain Business Rules

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.KalaChakraDashboard = (() => {

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

        status : null,

        progressFill : null,

        progress : null,

        insight : null

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

                "[data-current-pillar]"

            );



        elements.pillarScore =

            document.querySelector(

                "[data-pillar-score]"

            );



        elements.status =

            document.querySelector(

                "[data-status]"

            );



        elements.progressFill =

            document.querySelector(

                "[data-progress-fill]"

            );



        elements.progress =

            document.querySelector(

                "[data-progress]"

            );



        elements.insight =

            document.querySelector(

                "[data-insight]"

            );

    }



    /* ======================================================================
       UPDATE
       ====================================================================== */

    function update(model){

        updateOverall(model);

        updatePillar(model);

        updateStatus(model);

        updateProgress(model);

        updateInsight(model);

        updateKalaChakra(model);

    }



    /* ======================================================================
       OVERALL
       ====================================================================== */

    function updateOverall(model){

        if(elements.overallScore){

            elements.overallScore.textContent =

                model.overallScore;

        }

    }



    /* ======================================================================
       PILLAR
       ====================================================================== */

    function updatePillar(model){

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

    function updateStatus(model){

        if(!elements.status){

            return;

        }

        elements.status.className =

            "kd-status kd-status-" +

            model.status.toLowerCase();



        elements.status.textContent =

            model.statusTitle;

    }



    /* ======================================================================
       PROGRESS
       ====================================================================== */

    function updateProgress(model){

        if(elements.progressFill){

            elements.progressFill.style.width =

                model.progressPercent + "%";

        }



        if(elements.progress){

            elements.progress.textContent =

                model.currentPillar +

                " / 12";

        }

    }



    /* ======================================================================
       INSIGHT
       ====================================================================== */

    function updateInsight(model){

        if(elements.insight){

            elements.insight.textContent =

                model.insight;

        }

    }



    /* ======================================================================
       KALA CHAKRA
       ====================================================================== */

    function updateKalaChakra(model){

        if(

            window.CTM.KalaChakra &&

            typeof window.CTM.KalaChakra.update==="function"

        ){

            window.CTM.KalaChakra.update(

                model

            );

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

            status : "learner",

            statusTitle : "LEARNER™",

            progressPercent : 0,

            currentPillar : 1,

            insight :

                "Every meaningful transformation begins with one honest answer."

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

            window.CTM.KalaChakraDashboard &&

            typeof window.CTM.KalaChakraDashboard.initialize === "function"

        ){

            window.CTM.KalaChakraDashboard.initialize();

        }

    }

);



/* ==========================================================================

   END OF FILE

   File        : js/components/kaalachakra-dashboard.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   ========================================================================== */

