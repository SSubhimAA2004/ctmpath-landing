
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : js/components/rating-scale.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   Purpose
   --------------------------------------------------------------------------
   Premium Rating Scale™

   Responsibilities

   ✓ Handle Rating Selection
   ✓ Maintain Selected State
   ✓ Update Visible Rating
   ✓ Broadcast Rating Events

   Does NOT

   ✗ Calculate Pillar Score
   ✗ Calculate 360 Score
   ✗ Update Dashboard
   ✗ Determine Status

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.RatingScale = (() => {

    /* ======================================================================
       STATE
       ====================================================================== */

    const state = {

        selectedScore : null,

        initialized : false

    };



    /* ======================================================================
       ELEMENTS
       ====================================================================== */

    const elements = {

        chips : [],

        selectedScore : null,

        feedback : null

    };



    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function initialize(){

        if(state.initialized){

            return;

        }

        cacheElements();

        bindEvents();

        state.initialized = true;

    }



    /* ======================================================================
       CACHE
       ====================================================================== */

    function cacheElements(){

        elements.chips = [

            ...document.querySelectorAll(".rating-chip")

        ];



        elements.selectedScore =

            document.querySelector(

                "[data-selected-score]"

            );



        elements.feedback =

            document.querySelector(

                "[data-rating-feedback]"

            );

    }



    /* ======================================================================
       EVENTS
       ====================================================================== */

    function bindEvents(){

        elements.chips.forEach(chip=>{

            chip.addEventListener(

                "click",

                handleSelection

            );

        });

    }



    /* ======================================================================
       SELECT
       ====================================================================== */

    function handleSelection(event){

        const chip = event.currentTarget;

        const score = Number(

            chip.dataset.score

        );

        select(score);

    }



    /* ======================================================================
       SELECT SCORE
       ====================================================================== */

    function select(score){

        state.selectedScore = score;

        updateVisualSelection(score);

        updateScore(score);

        updateFeedback(score);

        dispatch(score);

    }



    /* ======================================================================
       VISUAL
       ====================================================================== */

    function updateVisualSelection(score){

        elements.chips.forEach(chip=>{

            chip.classList.remove("selected");

            if(Number(chip.dataset.score)===score){

                chip.classList.add("selected");

            }

        });

    }



    /* ======================================================================
       SCORE
       ====================================================================== */

    function updateScore(score){

        if(elements.selectedScore){

            elements.selectedScore.textContent = score;

        }

    }



    /* ======================================================================
       FEEDBACK
       ====================================================================== */

    function updateFeedback(score){

        if(!elements.feedback){

            return;

        }

        if(score<=3){

            elements.feedback.textContent =

                "Your awareness is emerging. Every journey begins with a first step.";

            return;

        }

        if(score<=7){

            elements.feedback.textContent =

                "You are developing steadily. Keep building momentum.";

            return;

        }

        elements.feedback.textContent =

            "Excellent. This is already becoming one of your strengths.";

    }



    /* ======================================================================
       EVENT
       ====================================================================== */

    function dispatch(score){

        document.dispatchEvent(

            new CustomEvent(

                "ctm:score-selected",

                {

                    detail : {

                        score : score

                    }

                }

            )

        );

    }



    /* ======================================================================
       API
       ====================================================================== */

    return{

        initialize,

        select,

        getScore(){

            return state.selectedScore;

        }

    };

})();



/* ==========================================================================
   AUTO INITIALIZATION
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        if(

            window.CTM.RatingScale &&

            typeof window.CTM.RatingScale.initialize==="function"

        ){

            window.CTM.RatingScale.initialize();

        }

    }

);

/* ==========================================================================

   END OF FILE

   File        : js/components/rating-scale.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   ========================================================================== */
