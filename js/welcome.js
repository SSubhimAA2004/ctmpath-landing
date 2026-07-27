
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/welcome.js
 Version     : 1.2

 Page        : PAGE 01 — WELCOME™

 Purpose:
 Welcome page controller.

 Responsibilities:
 - Initialize Welcome page
 - Handle Begin Journey CTA
 - Load Registration page through app router

 Rules:
 - No backend calls
 - No registration logic
 - No assessment logic
 - Uses CTM_APP router

 Dependencies:
 - js/app.js

==============================================================================
*/


(function () {


    "use strict";





    /*
    ==========================================================================
       INITIALIZATION
    ==========================================================================
    */


    function initWelcomePage() {



        const beginButton =

            document.getElementById(

                "beginJourneyButton"

            );





        if(!beginButton){



            console.warn(

                "CTM PATH™: Begin Journey button not found."

            );



            return;


        }






        beginButton.addEventListener(

            "click",

            beginJourney

        );



    }









    /*
    ==========================================================================
       START JOURNEY
    ==========================================================================
    */


    function beginJourney(){



        if(

            window.CTM_APP &&

            typeof window.CTM_APP.loadPage === "function"

        ){



            window.CTM_APP.loadPage(

                "pages/registration.html"

            );



        }

        else {



            console.error(

                "CTM PATH™: Application router unavailable."

            );



        }



    }









    /*
    ==========================================================================
       PAGE READY
    ==========================================================================
    */


    document.addEventListener(

        "DOMContentLoaded",

        initWelcomePage

    );



})();

