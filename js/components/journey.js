
/* ==========================================================================

   CTM PATH™ Guided Journey™
   FROM SURVIVAL TO LIVING™

   File        : js/components/journey.js
   Version     : 2.0
   Status      : 🔒 PREMIUM FOUNDATION

   Purpose
   --------------------------------------------------------------------------
   Global Journey Experience Controller

   Responsibilities
   --------------------------------------------------------------------------
   ✓ Initialize journey interactions
   ✓ Manage journey transition helpers
   ✓ Provide reusable journey behaviour
   ✓ Support premium page transitions

   Does NOT
   --------------------------------------------------------------------------
   ✗ Control page routing
   ✗ Handle registration
   ✗ Perform API calls
   ✗ Contain assessment scoring
   ✗ Contain business logic

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};


window.CTM.Journey = (() => {


    /* ======================================================================
       MODULE STATE
       ====================================================================== */


    const state = {

        currentPage: null,

        isTransitioning: false

    };



    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    function initialize(){


        bindEvents();


        revealPage();


    }



    /* ======================================================================
       EVENTS
       ====================================================================== */


    function bindEvents(){


        document.addEventListener(

            "click",

            handleJourneyAction

        );


    }



    /* ======================================================================
       JOURNEY ACTION HANDLER
       ====================================================================== */


    function handleJourneyAction(event){


        const target =

            event.target.closest(

                "[data-journey-action]"

            );


        if(!target){

            return;

        }


        const action =

            target.dataset.journeyAction;



        switch(action){


            case "continue":

                continueJourney();

                break;



            case "previous":

                previousJourney();

                break;



            default:

                break;

        }


    }



    /* ======================================================================
       CONTINUE JOURNEY
       ====================================================================== */


    function continueJourney(){


        if(state.isTransitioning){

            return;

        }


        triggerTransition();


    }



    /* ======================================================================
       PREVIOUS JOURNEY
       ====================================================================== */


    function previousJourney(){


        if(state.isTransitioning){

            return;

        }


        triggerTransition();


    }



    /* ======================================================================
       PAGE TRANSITION
       ====================================================================== */


    function triggerTransition(){


        state.isTransitioning = true;


        document.body.classList.add(

            "journey-transition"

        );


        setTimeout(

            function(){


                document.body.classList.remove(

                    "journey-transition"

                );


                state.isTransitioning = false;


            },

            300

        );


    }



    /* ======================================================================
       PAGE REVEAL
       ====================================================================== */


    function revealPage(){


        requestAnimationFrame(

            function(){


                document.body.classList.add(

                    "journey-ready"

                );


            }

        );


    }



    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {


        initialize,

        continueJourney,

        previousJourney


    };


})();



/* ==========================================================================
   AUTO INITIALIZATION
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        if(

            window.CTM.Journey &&

            typeof window.CTM.Journey.initialize === "function"

        ){

            window.CTM.Journey.initialize();

        }


    }

);



/* ==========================================================================

   END OF FILE

   File        : js/components/journey.js
   Version     : 2.0
   Status      : 🔒 PREMIUM FOUNDATION

   ========================================================================== */

