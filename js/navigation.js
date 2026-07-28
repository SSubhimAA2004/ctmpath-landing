
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 1.0
   Status      : DEVELOPMENT

   Purpose:

   Global journey navigation controller.


   Responsibilities:

   • Move between journey pages.
   • Manage current page state.
   • Trigger page lifecycle events.
   • Update progress.


   Does NOT:

   • Own page content.
   • Calculate results.
   • Process assessments.


   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */

window.CTMPATH = window.CTMPATH || {};




/* ==========================================================================
   NAVIGATION CONTROLLER
   ========================================================================== */


CTMPATH.Navigation =
{


    version:

        "1.0",



    initialized:

        false,



    currentPage:

        1,



    totalPages:

        18



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Navigation.init = function()
{


    if (

        CTMPATH.Navigation.initialized

    )
    {


        return;



    }



    CTMPATH.Navigation.restorePage();



    CTMPATH.Navigation.bindGlobalEvents();



    /*
    ----------------------------------------------------

    Initial Page Render

    Purpose:

    Load the current journey page immediately after
    application initialization.

    Default:

    Page 01 — Welcome™

    ----------------------------------------------------
    */


    CTMPATH.Navigation.renderPage(

        CTMPATH.Navigation.currentPage

    );



    CTMPATH.Navigation.initialized = true;



};




/* ==========================================================================
   GO TO PAGE

   Main navigation method.

   ========================================================================== */


CTMPATH.Navigation.goto = function(

    pageNumber

)
{


    if (

        pageNumber < 1 ||

        pageNumber > CTMPATH.Navigation.totalPages

    )
    {


        return false;



    }



    CTMPATH.Navigation.currentPage = pageNumber;



    CTMPATH.Navigation.savePage();



    CTMPATH.Navigation.renderPage(

        pageNumber

    );



    return true;



};

/* ==========================================================================
   PAGE RENDERING

   Displays requested journey page.

   ========================================================================== */


CTMPATH.Navigation.renderPage = function(

    pageNumber

)
{


    const pages = document.querySelectorAll(

        ".page"

    );



    pages.forEach(function(page)
    {


        page.style.display = "none";



    });



    const targetPage = document.querySelector(

        `[data-page="${pageNumber}"]`

    );



    if (targetPage)
    {


        targetPage.style.display = "block";



    }



    CTMPATH.Navigation.dispatchPageEvent(

        pageNumber

    );



};




/* ==========================================================================
   PAGE EVENT DISPATCH

   Notifies page controllers.

   ========================================================================== */


CTMPATH.Navigation.dispatchPageEvent = function(

    pageNumber

)
{


    document.dispatchEvent(

        new CustomEvent(

            "CTMPATH_PAGE_LOADED",

            {

                detail:

                {

                    page:

                        pageNumber

                }

            }

        )

    );



};




/* ==========================================================================
   SAVE CURRENT PAGE

   Uses storage layer.

   ========================================================================== */


CTMPATH.Navigation.savePage = function()
{


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.saveCurrentPage ===

            "function"

    )
    {


        CTMPATH.Storage.saveCurrentPage(

            CTMPATH.Navigation.currentPage

        );



    }



};




/* ==========================================================================
   RESTORE PAGE

   Restores visitor journey position.

   ========================================================================== */


CTMPATH.Navigation.restorePage = function()
{


    if (

        CTMPATH.Storage &&

        typeof CTMPATH.Storage.getCurrentPage ===

            "function"

    )
    {


        const savedPage =

            CTMPATH.Storage.getCurrentPage();



        if (savedPage)
        {


            CTMPATH.Navigation.currentPage =

                savedPage;



        }



    }



};

/* ==========================================================================
   NEXT PAGE

   Moves forward one journey step.

   ========================================================================== */


CTMPATH.Navigation.next = function()
{


    const nextPage =

        CTMPATH.Navigation.currentPage + 1;



    return CTMPATH.Navigation.goto(

        nextPage

    );



};




/* ==========================================================================
   PREVIOUS PAGE

   Moves backward one journey step.

   ========================================================================== */


CTMPATH.Navigation.previous = function()
{


    const previousPage =

        CTMPATH.Navigation.currentPage - 1;



    return CTMPATH.Navigation.goto(

        previousPage

    );



};




/* ==========================================================================
   UPDATE PROGRESS

   Updates shared progress component.

   ========================================================================== */


CTMPATH.Navigation.updateProgress = function()
{


    const progressElements = document.querySelectorAll(

        "[data-progress-fill]"

    );



    const percentage =

        (

            CTMPATH.Navigation.currentPage /

            CTMPATH.Navigation.totalPages

        ) * 100;



    progressElements.forEach(function(element)
    {


        element.style.width =

            percentage + "%";



    });



    const counters = document.querySelectorAll(

        "[data-progress-counter]"

    );



    counters.forEach(function(counter)
    {


        counter.textContent =


            CTMPATH.Navigation.currentPage +

            " / " +

            CTMPATH.Navigation.totalPages;



    });



};




/* ==========================================================================
   GLOBAL NAVIGATION EVENTS

   ========================================================================== */


CTMPATH.Navigation.bindGlobalEvents = function()
{


    document.addEventListener(

        "CTMPATH_PAGE_LOADED",

        function()
        {


            CTMPATH.Navigation.updateProgress();



        }

    );



};

/* ==========================================================================
   GET CURRENT PAGE

   Returns active journey location.

   ========================================================================== */


CTMPATH.Navigation.getCurrentPage = function()
{


    return CTMPATH.Navigation.currentPage;



};




/* ==========================================================================
   GET TOTAL PAGES

   Returns journey length.

   ========================================================================== */


CTMPATH.Navigation.getTotalPages = function()
{


    return CTMPATH.Navigation.totalPages;



};




/* ==========================================================================
   IS FIRST PAGE

   ========================================================================== */


CTMPATH.Navigation.isFirstPage = function()
{


    return (

        CTMPATH.Navigation.currentPage === 1

    );



};




/* ==========================================================================
   IS LAST PAGE

   ========================================================================== */


CTMPATH.Navigation.isLastPage = function()
{


    return (

        CTMPATH.Navigation.currentPage ===

        CTMPATH.Navigation.totalPages

    );



};




/* ==========================================================================
   RESET JOURNEY

   Returns visitor to beginning.

   ========================================================================== */


CTMPATH.Navigation.reset = function()
{


    CTMPATH.Navigation.currentPage = 1;



    CTMPATH.Navigation.savePage();



    CTMPATH.Navigation.renderPage(

        1

    );



};

/* ==========================================================================
   NAVIGATION STATUS

   Returns current navigation state.

   ========================================================================== */


CTMPATH.Navigation.getStatus = function()
{


    return {


        version:

            CTMPATH.Navigation.version,



        currentPage:

            CTMPATH.Navigation.currentPage,



        totalPages:

            CTMPATH.Navigation.totalPages,



        initialized:

            CTMPATH.Navigation.initialized



    };



};




/* ==========================================================================
   INITIALIZE ON APPLICATION READY

   ========================================================================== */


document.addEventListener(

    "CTMPATH_APP_READY",

    function()
    {


        CTMPATH.Navigation.init();



    }

);




/* ==========================================================================
   END OF FILE

   File:

   js/navigation.js


   Status:

   NAVIGATION CONTROLLER COMPLETE


   ========================================================================== */
