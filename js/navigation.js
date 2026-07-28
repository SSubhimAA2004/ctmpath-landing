
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
   • Load journey pages dynamically.
   • Trigger page lifecycle events.
   • Update progress.


   Does NOT:

   • Calculate results.
   • Process assessments.
   • Generate diagnosis.
   • Generate prescription.


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

        "1.1",



    initialized:

        false,



    currentPage:

        1,



    totalPages:

        18,



    pageMap:

    {

        1:
        "pages/welcome.html",


        2:
        "pages/registration.html",


        3:
        "pages/assessment-01.html",


        4:
        "pages/assessment-02.html",


        5:
        "pages/assessment-03.html",


        6:
        "pages/assessment-04.html",


        7:
        "pages/assessment-05.html",


        8:
        "pages/assessment-06.html",


        9:
        "pages/assessment-07.html",


        10:
        "pages/assessment-08.html",


        11:
        "pages/assessment-09.html",


        12:
        "pages/assessment-10.html",


        13:
        "pages/assessment-11.html",


        14:
        "pages/assessment-12.html",


        15:
        "pages/kalachakra.html",


        16:
        "pages/diagnosis.html",


        17:
        "pages/prescription.html",


        18:
        "pages/cta.html"

    }



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

   Dynamic page loader.

   Loads:

   /pages/*.html

   Injects into:

   #app-content

   ========================================================================== */


CTMPATH.Navigation.renderPage = async function(

    pageNumber

)
{


    const container = document.getElementById(

        "app-content"

    );



    if (!container)
    {


        console.error(

            "Application content container not found."

        );


        return false;



    }



    const pageURL =

        CTMPATH.Navigation.pageMap[pageNumber];



    if (!pageURL)
    {


        console.error(

            "Page mapping missing:",

            pageNumber

        );


        return false;



    }



    try

    {


        CTMPATH.Navigation.showLoader();



        const response = await fetch(

            pageURL

        );



        if (!response.ok)
        {


            throw new Error(

                "Unable to load page: " + pageURL

            );


        }



        const html = await response.text();



        container.innerHTML = html;



        CTMPATH.Navigation.hideLoader();



        CTMPATH.Navigation.dispatchPageEvent(

            pageNumber

        );



        return true;



    }

    catch(error)

    {


        CTMPATH.Navigation.hideLoader();



        console.error(

            "Navigation loading error:",

            error

        );



        CTMPATH.Navigation.showError();



        return false;



    }



};




/* ==========================================================================
   LOADING STATE

   ========================================================================== */


CTMPATH.Navigation.showLoader = function()
{


    const loader = document.getElementById(

        "global-loader"

    );



    if (loader)
    {


        loader.classList.remove(

            "hidden"

        );


    }



};




CTMPATH.Navigation.hideLoader = function()
{


    const loader = document.getElementById(

        "global-loader"

    );



    if (loader)
    {


        loader.classList.add(

            "hidden"

        );


    }



};




/* ==========================================================================
   ERROR STATE

   ========================================================================== */


CTMPATH.Navigation.showError = function()
{


    const errorContainer = document.getElementById(

        "error-container"

    );



    if (errorContainer)
    {


        errorContainer.classList.remove(

            "hidden"

        );


        errorContainer.innerHTML =


            "Unable to load this journey step. Please try again.";



    }



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

                        pageNumber,


                    url:

                        CTMPATH.Navigation.pageMap[pageNumber]

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
