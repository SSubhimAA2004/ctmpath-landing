
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/welcome.js
 Version     : 1.1
 Page        : PAGE 01 — WELCOME™

 Purpose:
 Welcome page controller.

 Responsibilities:
 - Initialize welcome page
 - Handle Begin Journey button
 - Navigate to Registration page

 Rules:
 - No API calls
 - No database interaction
 - No assessment logic

 Flow:

 welcome.html
        |
        ↓
 registration.html

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



        if (!beginButton) {


            console.warn(
                "CTM PATH™: Begin Journey button not found."
            );


            return;

        }





        beginButton.addEventListener(
            "click",
            handleBeginJourney
        );


    }





    /*
    ==========================================================================
       JOURNEY START
    ==========================================================================
    */


    function handleBeginJourney() {


        /*
        Future enhancement:
        Add transition animation here.

        Example:
        Fade out welcome screen
        Then navigate.

        */


        navigateToRegistration();


    }





    /*
    ==========================================================================
       NAVIGATION
    ==========================================================================
    */


    function navigateToRegistration() {


        window.location.href =
            "registration.html";


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

