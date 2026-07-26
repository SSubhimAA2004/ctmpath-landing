
/* ==========================================================================

   CTM PATH™ Guided Journey™
   FROM SURVIVAL TO LIVING™

   File        : js/components/progress.js
   Version     : 2.0
   Status      : 🔒 PREMIUM FOUNDATION

   Purpose
   --------------------------------------------------------------------------
   Global Journey Progress Component Controller

   Responsibilities
   --------------------------------------------------------------------------
   ✓ Initialize Progress Component
   ✓ Update journey progress display
   ✓ Update progress bar state
   ✓ Update current journey moment
   ✓ Maintain reusable progress behaviour

   Does NOT
   --------------------------------------------------------------------------
   ✗ Calculate assessment scores
   ✗ Control page navigation
   ✗ Perform API calls
   ✗ Contain business logic

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};


window.CTM.Progress = (() => {


    /* ======================================================================
       MODULE STATE
       ====================================================================== */


    const elements = {

        container: null,

        fill: null,

        count: null,

        title: null

    };


    let currentStep = 1;

    let totalSteps = 18;



    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    function initialize(){


        cacheElements();


        update();


    }



    /* ======================================================================
       CACHE DOM ELEMENTS
       ====================================================================== */


    function cacheElements(){


        elements.container =

            document.querySelector(

                ".progress-system"

            );


        if(!elements.container){

            return;

        }


        elements.fill =

            elements.container.querySelector(

                "[data-progress-fill]"

            );


        elements.count =

            elements.container.querySelector(

                "[data-progress-count]"

            );


        elements.title =

            elements.container.querySelector(

                "[data-progress-title]"

            );


    }



    /* ======================================================================
       SET PROGRESS
       ====================================================================== */


    function setProgress(step, total = 18){


        currentStep = step;

        totalSteps = total;


        update();


    }



    /* ======================================================================
       UPDATE UI
       ====================================================================== */


    function update(){


        if(!elements.container){

            return;

        }


        const percentage =

            ((currentStep - 1) / (totalSteps - 1)) * 100;



        if(elements.fill){


            elements.fill.style.width =

                `${percentage}%`;


        }



        if(elements.count){


            elements.count.textContent =

                `${String(currentStep).padStart(2,"0")} / ${String(totalSteps).padStart(2,"0")}`;


        }


        if(elements.container.querySelector("[data-progress-fill]")){


            elements.container

                .querySelector("[data-progress-fill]")

                .parentElement

                .setAttribute(

                    "aria-valuenow",

                    Math.round(percentage)

                );


        }


    }



    /* ======================================================================
       SET JOURNEY TITLE
       ====================================================================== */


    function setTitle(title){


        if(!elements.title){

            return;

        }


        elements.title.textContent = title;


    }



    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {


        initialize,

        setProgress,

        setTitle,

        update


    };


})();



/* ==========================================================================
   AUTO INITIALIZATION
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        if(

            window.CTM.Progress &&

            typeof window.CTM.Progress.initialize === "function"

        ){

            window.CTM.Progress.initialize();

        }


    }

);



/* ==========================================================================

   END OF FILE

   File        : js/components/progress.js
   Version     : 2.0
   Status      : 🔒 PREMIUM FOUNDATION

   ========================================================================== */

