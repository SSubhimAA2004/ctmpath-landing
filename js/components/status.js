
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : js/components/status.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   Purpose
   --------------------------------------------------------------------------
   Premium Status Card™

   Responsibilities

   ✓ Render Status Card
   ✓ Render Pillar Score
   ✓ Render Badge
   ✓ Render Encouragement

   Does NOT

   ✗ Calculate Scores
   ✗ Determine Status
   ✗ Contain Business Rules

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.Status = (() => {

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

        card : null,

        statusName : null,

        statusSubtitle : null,

        pillarScore : null,

        badge : null,

        badgeText : null,

        message : null

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

        elements.card =

            document.querySelector(

                ".status-card-component"

            );



        elements.statusName =

            document.querySelector(

                "[data-status-name]"

            );



        elements.statusSubtitle =

            document.querySelector(

                "[data-status-subtitle]"

            );



        elements.pillarScore =

            document.querySelector(

                "[data-pillar-score]"

            );



        elements.badge =

            document.querySelector(

                "[data-status-badge]"

            );



        elements.badgeText =

            elements.badge ?

            elements.badge.querySelector(

                ".status-text"

            ) : null;



        elements.message =

            document.querySelector(

                "[data-status-message]"

            );

    }



    /* ======================================================================
       UPDATE
       ====================================================================== */

    function update(data){

        if(!elements.card){

            return;

        }



        clearStatusClasses();



        elements.card.classList.add(

            "status-" +

            data.status.toLowerCase()

        );



        if(elements.statusName){

            elements.statusName.textContent =

                data.title;

        }



        if(elements.statusSubtitle){

            elements.statusSubtitle.textContent =

                data.subtitle;

        }



        if(elements.pillarScore){

            elements.pillarScore.textContent =

                data.score;

        }



        if(elements.badgeText){

            elements.badgeText.textContent =

                data.badge;

        }



        if(elements.message){

            elements.message.textContent =

                data.message;

        }

    }



    /* ======================================================================
       CLEAR
       ====================================================================== */

    function clearStatusClasses(){

        elements.card.classList.remove(

            "status-learner",

            "status-leader",

            "status-legend"

        );

    }



    /* ======================================================================
       RESET
       ====================================================================== */

    function reset(){

        update({

            status : "learner",

            title : "LEARNER™",

            subtitle :

                "Your journey has just begun.",

            score : 0,

            badge : "Emerging",

            message :

                "Complete all three questions to discover your current alignment."

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

            window.CTM.Status &&

            typeof window.CTM.Status.initialize==="function"

        ){

            window.CTM.Status.initialize();

        }

    }

);



/* ==========================================================================

   END OF FILE

   File        : js/components/status.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   ========================================================================== */
