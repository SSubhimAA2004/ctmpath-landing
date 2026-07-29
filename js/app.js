
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 1.7

   Purpose:

   Frontend application bootstrap controller.

   Responsibilities:

   • Initialize frontend application
   • Remove loading state
   • Prepare UI environment

   IMPORTANT:

   This file does NOT:

   • Load pages dynamically
   • Replace app-content
   • Load components
   • Control navigation routes
   • Handle business logic

   ========================================================================== */





const CTMApp = (() => {



    let initialized = false;





    /* ==========================================================
       APPLICATION INITIALIZATION
       ========================================================== */


    function init(){



        if(initialized){

            return;

        }



        initialized = true;



        removeLoader();



        initializeUI();



    }








    /* ==========================================================
       UI INITIALIZATION
       ========================================================== */


    function initializeUI(){



        /*
            Reserved for future
            frontend initialization.

            Examples:

            - animations
            - accessibility
            - theme setup

        */



        document.documentElement.classList.add(

            "ctm-ready"

        );



    }








    /* ==========================================================
       LOADER CONTROL

       Removes:
       "Preparing your journey..."

       ================================================================= */


    function removeLoader(){



        const loader = document.getElementById(

            "global-loader"

        );



        if(!loader){

            return;

        }





        loader.classList.add(

            "hidden"

        );



    }








    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {


        init,


        removeLoader



    };



})();









/* ==========================================================================
   APPLICATION START
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        CTMApp.init();



    }

);
