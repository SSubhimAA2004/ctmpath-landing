
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend navigation controller for the CTM PATH™ Guided Journey™.

   Responsibilities:

   • Manage page transitions.
   • Track current journey location.
   • Render page containers.
   • Coordinate navigation events.
   • Maintain frontend journey state.

   Does NOT:

   • Validate business completion rules.
   • Calculate assessment scores.
   • Generate diagnosis.
   • Generate prescriptions.
   • Replace backend workflow.

   Backend Ownership:

   • Assessment validation
   • Scoring engine
   • KALA CHAKRA™ calculations
   • Diagnosis engine
   • Prescription engine

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   NAVIGATION SERVICE
   ========================================================================== */


CTMPATH.Navigation = {


    version:

        "1.0",



    initialized:

        false,



    currentPage:

        1,



    totalPages:

        18,



    container:

        null



};




/* ==========================================================================
   LOCKED JOURNEY MAP

   Exactly 18 pages.

   ========================================================================== */


CTMPATH.Navigation.pages = {


    1:

        "welcome.html",


    2:

        "registration.html",


    3:

        "assessment-01.html",


    4:

        "assessment-02.html",


    5:

        "assessment-03.html",


    6:

        "assessment-04.html",


    7:

        "assessment-05.html",


    8:

        "assessment-06.html",


    9:

        "assessment-07.html",


    10:

        "assessment-08.html",


    11:

        "assessment-09.html",


    12:

        "assessment-10.html",


    13:

        "assessment-11.html",


    14:

        "assessment-12.html",


    15:

        "kalachakra.html",


    16:

        "diagnosis.html",


    17:

        "prescription.html",


    18:

        "cta.html"



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Navigation.init = function() {


    CTMPATH.Navigation.container =

        document.getElementById(

            "app-content"

        );



    CTMPATH.Navigation.initialized = true;



};




/* ==========================================================================
   LOAD PAGE

   Loads frontend page content.

   ========================================================================== */


CTMPATH.Navigation.loadPage = async function(pageNumber) {


    if (

        !CTMPATH.Navigation.pages[pageNumber]

    ) {


        console.error(

            "Invalid CTM PATH™ page:",

            pageNumber

        );


        return false;



    }



    try {


        const response = await fetch(

            "pages/" +

            CTMPATH.Navigation.pages[pageNumber]

        );



        const html = await response.text();



        if (

            CTMPATH.Navigation.container

        ) {


            CTMPATH.Navigation.container.innerHTML = html;



        }



        CTMPATH.Navigation.currentPage =

            pageNumber;



        CTMPATH.Navigation.savePosition();



        window.scrollTo(

            {

                top: 0,

                behavior: "smooth"

            }

        );



        return true;



    }


    catch(error) {


        console.error(

            "CTM PATH™ Navigation Error:",

            error

        );



        return false;



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   NEXT PAGE

   Moves user forward through the journey.

   Navigation only.
   Business validation belongs to backend.

   ========================================================================== */


CTMPATH.Navigation.next = function() {


    const nextPage =

        CTMPATH.Navigation.currentPage + 1;



    if (

        nextPage >

        CTMPATH.Navigation.totalPages

    ) {


        return false;



    }



    return CTMPATH.Navigation.loadPage(

        nextPage

    );



};




/* ==========================================================================
   PREVIOUS PAGE

   Moves user backward through the journey.

   ========================================================================== */


CTMPATH.Navigation.previous = function() {


    const previousPage =

        CTMPATH.Navigation.currentPage - 1;



    if (

        previousPage < 1

    ) {


        return false;



    }



    return CTMPATH.Navigation.loadPage(

        previousPage

    );



};




/* ==========================================================================
   GOTO PAGE

   Direct page navigation helper.

   Used internally only.

   ========================================================================== */


CTMPATH.Navigation.goto = function(pageNumber) {


    return CTMPATH.Navigation.loadPage(

        Number(pageNumber)

    );



};




/* ==========================================================================
   SAVE CURRENT POSITION

   Stores temporary journey position.

   ========================================================================== */


CTMPATH.Navigation.savePosition = function() {


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.setCurrentPage ===

            "function"

    ) {


        CTMPATH.Storage.setCurrentPage(

            CTMPATH.Navigation.currentPage

        );



    }



};




/* ==========================================================================
   RESTORE LAST POSITION

   Restores frontend session location.

   ========================================================================== */


CTMPATH.Navigation.restorePosition = function() {


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.getCurrentPage ===

            "function"

    ) {


        const savedPage =

            CTMPATH.Storage.getCurrentPage();



        if (

            savedPage

        ) {


            CTMPATH.Navigation.currentPage =

                Number(savedPage);



        }



    }



};




/* ==========================================================================
   GET CURRENT PAGE INFORMATION

   ========================================================================== */


CTMPATH.Navigation.getCurrent = function() {


    return {


        page:

            CTMPATH.Navigation.currentPage,



        file:

            CTMPATH.Navigation.pages[

                CTMPATH.Navigation.currentPage

            ],



        total:

            CTMPATH.Navigation.totalPages



    };


};




/* ==========================================================================
   PAGE CHANGE EVENT

   Allows page controllers to initialize.

   ========================================================================== */


CTMPATH.Navigation.dispatchPageLoaded = function() {


    const event = new CustomEvent(

        "CTMPATH_PAGE_LOADED",

        {


            detail:


                {


                    page:

                        CTMPATH.Navigation.currentPage



                }



        }

    );



    document.dispatchEvent(

        event

    );



};




/* ==========================================================================
   EXTEND LOAD PAGE WITH EVENT DISPATCH

   ========================================================================== */


const originalLoadPage =

    CTMPATH.Navigation.loadPage;




CTMPATH.Navigation.loadPage = async function(pageNumber) {


    const result = await originalLoadPage(

        pageNumber

    );



    if (

        result

    ) {


        CTMPATH.Navigation.dispatchPageLoaded();



    }



    return result;



};




/* ==========================================================================
   END OF FILE

   File:

   js/navigation.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   js/assessmentEngine.js

   ========================================================================== */

