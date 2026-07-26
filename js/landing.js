
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : landing.js
   Version     : 5.0
   Status      : 🔒 PREMIUM FOUNDATION

   Purpose
   --------------------------------------------------------------------------
   Page 01 — Landing Experience Controller

   Responsibilities
   --------------------------------------------------------------------------
   ✓ Initialize landing page
   ✓ Bind Begin Journey action
   ✓ Start guided journey flow
   ✓ Coordinate shared components

   Does NOT
   --------------------------------------------------------------------------
   ✗ Create UI elements
   ✗ Control global components
   ✗ Handle API calls
   ✗ Manage assessment logic

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



window.CTM.Landing = (() => {



    /* ======================================================================
       MODULE STATE
       ====================================================================== */


    const state = {


        initialized:false


    };




    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    function initialize(){


        if(state.initialized){

            return;

        }


        bindEvents();


        initializeComponents();


        state.initialized = true;


    }




    /* ======================================================================
       COMPONENT INITIALIZATION
       ====================================================================== */


    function initializeComponents(){



        if(

            window.CTM.Header &&

            typeof window.CTM.Header.initialize === "function"

        ){

            window.CTM.Header.initialize();

        }



        if(

            window.CTM.Footer &&

            typeof window.CTM.Footer.initialize === "function"

        ){

            window.CTM.Footer.initialize();

        }



        if(

            window.CTM.Journey &&

            typeof window.CTM.Journey.initialize === "function"

        ){

            window.CTM.Journey.initialize();

        }


    }




    /* ======================================================================
       EVENT BINDING
       ====================================================================== */


    function bindEvents(){


        const button =

            document.querySelector(

                "[data-action='begin-journey']"

            );



        if(!button){

            return;

        }



        button.addEventListener(

            "click",

            beginJourney

        );


    }




    /* ======================================================================
       BEGIN JOURNEY
       ====================================================================== */


    function beginJourney(){



        if(

            window.CTM.Journey &&

            typeof window.CTM.Journey.continueJourney === "function"

        ){

            window.CTM.Journey.continueJourney();

        }



        setTimeout(

            function(){


                window.location.href =

                    "registration.html";


            },

            300

        );


    }




    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {


        initialize


    };



})();





/* ==========================================================================
   AUTO INITIALIZATION
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

   File        : landing.js
   Version     : 5.0
   Status      : 🔒 PREMIUM FOUNDATION

   ========================================================================== */

