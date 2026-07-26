
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : landing.js
   Version     : 5.1
   Status      : 🔒 PREMIUM JOURNEY CONTROLLER

   Purpose
   --------------------------------------------------------------------------
   Page 01 — Welcome Experience Controller

   Responsibilities

   ✓ Initialize landing experience
   ✓ Coordinate shared components
   ✓ Handle Begin Journey action
   ✓ Provide smooth journey transition

   Does NOT

   ✗ Render HTML
   ✗ Control styles
   ✗ Handle assessment logic
   ✗ Communicate with APIs

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



window.CTM.Landing = (() => {



    /* ======================================================================
       STATE
       ====================================================================== */


    const state = {


        initialized:false,


        journeyStarted:false


    };





    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    function initialize(){


        if(state.initialized){

            return;

        }



        initializeComponents();


        bindEvents();


        initializeAnimations();



        state.initialized = true;


    }





    /* ======================================================================
       SHARED COMPONENT INITIALIZATION
       ====================================================================== */


    function initializeComponents(){



        const components = [


            window.CTM.Header,


            window.CTM.Footer,


            window.CTM.Journey,


            window.CTM.Progress


        ];



        components.forEach(component => {



            if(

                component &&

                typeof component.initialize === "function"

            ){


                component.initialize();


            }



        });


    }





    /* ======================================================================
       EVENT BINDING
       ====================================================================== */


    function bindEvents(){



        const beginButton =

            document.querySelector(

                "[data-action='begin-journey']"

            );



        if(!beginButton){

            return;

        }




        beginButton.addEventListener(

            "click",

            startJourney

        );



    }





    /* ======================================================================
       BEGIN JOURNEY
       ====================================================================== */


    function startJourney(){



        if(state.journeyStarted){

            return;

        }



        state.journeyStarted = true;



        document.body.classList.add(

            "journey-transition"

        );





        setTimeout(


            function(){


                window.location.href =

                    "registration.html";


            },


            450


        );



    }





    /* ======================================================================
       PREMIUM PAGE BEHAVIOUR
       ====================================================================== */


    function initializeAnimations(){



        const cards =

            document.querySelectorAll(

                ".discovery-card, .life-area-card"

            );



        cards.forEach((card,index)=>{


            card.style.animationDelay =

                `${index * 80}ms`;



        });



    }





    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {



        initialize,


        startJourney



    };



})();






/* ==========================================================================
   AUTO START
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        if(

            window.CTM.Landing &&

            typeof window.CTM.Landing.initialize === "function"

        ){



            window.CTM.Landing.initialize();



        }



    }

);





/* ==========================================================================

   END OF FILE

   File        : js/landing.js

   Version     : 5.1

   Status      : 🔒 PREMIUM JOURNEY CONTROLLER

   ========================================================================== */

