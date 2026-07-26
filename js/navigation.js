
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : navigation.js
   Version     : 2.0
   Status      : 🔒 FOUNDATION

   Purpose     : Journey Navigation Engine™

   Owns

      • Page Navigation
      • Assessment Flow
      • Route Resolution
      • Previous / Next Movement

   Owns NO

      • Business Logic
      • API Calls
      • Storage Operations
      • Assessment Rendering

   ========================================================================== */


"use strict";



/* ==========================================================================
   NAVIGATION STATE
   ========================================================================== */


const NavigationState = {


    currentPage:

        null,


    currentSpoke:

        null,


    totalSpokes:

        12


};





/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


function initializeNavigation(){


    NavigationState.currentPage =

        window.location.pathname;


}





/* ==========================================================================
   PAGE NAVIGATION
   ========================================================================== */


/**
 * Navigate to another page
 *
 */


function navigateTo(page){


    if(!page){

        return;

    }


    window.location.href = page;


}





/**
 * Navigate to next assessment spoke
 *
 */


function navigateNextSpoke(currentSpoke){


    const nextSpoke =

        Number(currentSpoke) + 1;



    if(

        nextSpoke >

        NavigationState.totalSpokes

    ){


        navigateTo(

            CTM_CONSTANTS.PAGES.KALA_CHAKRA

        );


        return;


    }



    const pageKey =

        "ASSESSMENT_" +

        String(nextSpoke).padStart(2,"0");



    const nextPage =

        CTM_CONSTANTS.PAGES[pageKey];



    navigateTo(

        nextPage

    );


}





/**
 * Navigate to previous assessment spoke
 *
 */


function navigatePreviousSpoke(currentSpoke){


    const previousSpoke =

        Number(currentSpoke) - 1;



    if(

        previousSpoke < 1

    ){


        navigateTo(

            CTM_CONSTANTS.PAGES.REGISTRATION

        );


        return;


    }



    const pageKey =

        "ASSESSMENT_" +

        String(previousSpoke).padStart(2,"0");



    const previousPage =

        CTM_CONSTANTS.PAGES[pageKey];



    navigateTo(

        previousPage

    );


}





/* ==========================================================
   Continue in Batch 1B
   ========================================================== */

/* ==========================================================================
   JOURNEY FLOW HELPERS
   ========================================================================== */


/**
 * Navigate to a specific assessment spoke
 *
 */


function navigateToAssessmentSpoke(spokeNumber){


    const spoke =

        Number(spokeNumber);



    if(

        spoke < 1

        ||

        spoke > NavigationState.totalSpokes

    ){


        return false;


    }



    const pageKey =

        "ASSESSMENT_" +

        String(spoke).padStart(2,"0");



    const targetPage =

        CTM_CONSTANTS.PAGES[pageKey];



    navigateTo(

        targetPage

    );



    return true;


}





/**
 * Navigate to Kala Chakra™
 *
 */


function navigateToKalaChakra(){


    navigateTo(

        CTM_CONSTANTS.PAGES.KALA_CHAKRA

    );


}





/**
 * Navigate to Diagnosis™
 *
 */


function navigateToDiagnosis(){


    navigateTo(

        CTM_CONSTANTS.PAGES.DIAGNOSIS

    );


}





/**
 * Navigate to Prescription™
 *
 */


function navigateToPrescription(){


    navigateTo(

        CTM_CONSTANTS.PAGES.PRESCRIPTION

    );


}





/**
 * Navigate to Completion
 *
 */


function navigateToCompletion(){


    navigateTo(

        CTM_CONSTANTS.PAGES.COMPLETION

    );


}





/* ==========================================================================
   PAGE IDENTIFICATION
   ========================================================================== */


/**
 * Get current page filename
 *
 */


function getCurrentPage(){


    return window.location.pathname

        .split("/")

        .pop();


}





/**
 * Check if current page is assessment page
 *
 */


function isAssessmentPage(){


    const page =

        getCurrentPage();



    return page.includes(

        "assessment"

    );


}





/**
 * Extract assessment spoke number
 *
 */


function getCurrentAssessmentNumber(){


    const page =

        getCurrentPage();



    const match =

        page.match(

            /assessment-(\d+)/

        );



    if(!match){


        return null;


    }



    return Number(

        match[1]

    );


}





/* ==========================================================================
   BUTTON HANDLERS
   ========================================================================== */


/**
 * Attach navigation button events
 *
 */


function bindNavigationButtons(){


    const nextButton =

        document.getElementById(

            "nextButton"

        );



    const previousButton =

        document.getElementById(

            "previousButton"

        );



    if(nextButton){


        nextButton.addEventListener(

            "click",

            function(){


                const spoke =

                    getCurrentAssessmentNumber();



                navigateNextSpoke(

                    spoke

                );


            }

        );


    }



    if(previousButton){


        previousButton.addEventListener(

            "click",

            function(){


                const spoke =

                    getCurrentAssessmentNumber();



                navigatePreviousSpoke(

                    spoke

                );


            }

        );


    }


}





/* ==========================================================
   Continue in Batch 1C
   ========================================================== */

/* ==========================================================================
   NAVIGATION VALIDATION
   ========================================================================== */


/**
 * Check if next navigation is available
 *
 */


function canNavigateNext(currentSpoke){


    const spoke =

        Number(currentSpoke);



    return (

        spoke >= 1

        &&

        spoke <= NavigationState.totalSpokes

    );


}





/**
 * Check if previous navigation is available
 *
 */


function canNavigatePrevious(currentSpoke){


    const spoke =

        Number(currentSpoke);



    return (

        spoke > 1

    );


}





/**
 * Get next page without navigation
 *
 */


function getNextPage(currentSpoke){


    const nextSpoke =

        Number(currentSpoke) + 1;



    if(

        nextSpoke >

        NavigationState.totalSpokes

    ){


        return CTM_CONSTANTS.PAGES.KALA_CHAKRA;


    }



    const pageKey =

        "ASSESSMENT_" +

        String(nextSpoke).padStart(2,"0");



    return CTM_CONSTANTS.PAGES[pageKey];


}





/**
 * Get previous page without navigation
 *
 */


function getPreviousPage(currentSpoke){


    const previousSpoke =

        Number(currentSpoke) - 1;



    if(

        previousSpoke < 1

    ){


        return CTM_CONSTANTS.PAGES.REGISTRATION;


    }



    const pageKey =

        "ASSESSMENT_" +

        String(previousSpoke).padStart(2,"0");



    return CTM_CONSTANTS.PAGES[pageKey];


}





/* ==========================================================================
   JOURNEY PROGRESS
   ========================================================================== */


/**
 * Calculate journey percentage
 *
 */


function calculateJourneyProgress(spoke){


    const current =

        Number(spoke);



    return Math.round(

        (

            current

            /

            NavigationState.totalSpokes

        )

        *

        100

    );


}





/**
 * Update navigation state
 *
 */


function updateNavigationState(spoke){


    NavigationState.currentSpoke =

        Number(spoke);



    NavigationState.currentPage =

        getCurrentPage();


}





/* ==========================================================================
   AUTO INITIALIZE
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        initializeNavigation();



        if(

            isAssessmentPage()

        ){


            updateNavigationState(

                getCurrentAssessmentNumber()

            );


        }


    }

);





/* ==========================================================================
   PUBLIC API
   ========================================================================== */


const CTMNavigation = {


    goTo:

        navigateTo,


    next:

        navigateNextSpoke,


    previous:

        navigatePreviousSpoke,


    nextPage:

        getNextPage,


    previousPage:

        getPreviousPage,


    currentPage:

        getCurrentPage,


    currentAssessment:

        getCurrentAssessmentNumber,


    progress:

        calculateJourneyProgress


};





Object.freeze(

    CTMNavigation

);





/* ==========================================================================
   END OF FILE

   File    : navigation.js

   Status  : 🔒 FOUNDATION

   ========================================================================== */
