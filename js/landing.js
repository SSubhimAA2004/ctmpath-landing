
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : landing.js
   Version     : 2.1

   Status      : 🔒 LOCKED

   Purpose     : Landing Page Controller

                  Owns
                  • Landing Page Initialization
                  • Begin Journey Button
                  • Journey Reset Trigger
                  • Navigation Trigger

                  Owns NO
                  • Assessment Logic
                  • Storage Logic
                  • API Logic
                  • Business Rules

   ========================================================================== */


'use strict';



/* ==========================================================================
   LANDING CONTROLLER
   ========================================================================== */


const LandingPage = (() => {



    /* ======================================================================
       ELEMENTS
       ====================================================================== */


    let beginButton = null;





    /* ======================================================================
       CACHE DOM
       ====================================================================== */


    function cacheDom(){


        beginButton = document.getElementById(

            'beginJourneyButton'

        );


    }





    /* ======================================================================
       EVENTS
       ====================================================================== */


    function bindEvents(){


        if(

            beginButton

        ){


            beginButton.addEventListener(

                'click',

                startJourney

            );


        }


    }





    /* ======================================================================
       START JOURNEY
       ====================================================================== */


    function startJourney(){


        /*
            A new visitor begins with a clean journey state.

            Application state ownership belongs to CTMApp.
        */


        if(

            window.CTMApp

        ){


            CTMApp.reset();


        }





        if(

            window.Router

        ){


            Router.go(

                Router.ROUTES.REGISTRATION

            );


        }


        else{


            console.error(

                'Router unavailable.'

            );


        }


    }





    /* ======================================================================
       LANDING ANIMATION
       ====================================================================== */


    function animate(){


        document.body.classList.add(

            'landing-loaded'

        );


    }





    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    function init(){


        cacheDom();


        bindEvents();


        animate();



        console.info(

            'CTM PATH™ Landing Page Ready.'

        );


    }





    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {


        init


    };



})();





/* ==========================================================================
   PAGE LOAD
   ========================================================================== */


document.addEventListener(

    'DOMContentLoaded',

    () => {


        LandingPage.init();


    }

);





/* ==========================================================================
   GLOBAL EXPORT
   ========================================================================== */


window.LandingPage = LandingPage;





/* ==========================================================================
   End of File

   File   : landing.js

   Version: 2.1

   Status : 🔒 LOCKED

   ========================================================================== */

