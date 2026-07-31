
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   PAGE 01 JAVASCRIPT

   File:
   js/page01.js


   Responsibility:

   • Page interaction only
   • CTA navigation only
   • No business logic

============================================================ */



'use strict';





/* ============================================================
   PAGE INITIALIZATION
============================================================ */



function initPage01(){



    const beginButton =

        document.getElementById(

            "beginJourneyBtn"

        );





    if(!beginButton){


        console.warn(

            "PAGE01 CTA button not found."

        );


        return;


    }







    beginButton.addEventListener(

        "click",

        handleBeginJourney

    );



}









/* ============================================================
   CTA ACTION
============================================================ */



function handleBeginJourney(){



    /*
        Optional analytics hook

        Example:

        CTMAnalytics.track(
            "PAGE01_BEGIN_JOURNEY"
        );

    */





    navigateToNextPage();



}









/* ============================================================
   PAGE NAVIGATION
============================================================ */



function navigateToNextPage(){



    /*
        Uses existing application navigation.

        Does NOT load pages directly.

        app.js remains responsible
        for routing.

    */





    if(

        typeof window.goToPage === "function"

    ){



        window.goToPage(

            2

        );



        return;


    }







    /*
        Fallback

        Used only if global router
        is unavailable.

    */





    window.location.href =

        "page02.html";



}









/* ============================================================
   AUTO INITIALIZATION
============================================================ */



document.addEventListener(

    "DOMContentLoaded",

    initPage01

);

