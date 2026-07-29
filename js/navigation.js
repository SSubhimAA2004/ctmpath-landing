
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.0

   Purpose:

   Central navigation controller.

   Responsibilities:

   • Manage journey page transitions
   • Load page modules
   • Update journey progress
   • Handle CTA navigation
   • Maintain scroll position

   IMPORTANT:

   No business logic.
   No scoring logic.
   No assessment calculations.

   ========================================================================== */





const CTMNavigation = (() => {



    /* ==========================================================
       JOURNEY CONFIGURATION
       ========================================================== */


    const journey = {


        currentPage: 1,


        totalPages: 18,



        pages: [

            "welcome",

            "registration",

            "assessment-01",

            "assessment-02",

            "assessment-03",

            "assessment-04",

            "assessment-05",

            "assessment-06",

            "assessment-07",

            "assessment-08",

            "assessment-09",

            "assessment-10",

            "kala-chakra",

            "diagnosis",

            "prescription",

            "review",

            "commitment",

            "cta"

        ]


    };








    /* ==========================================================
       INITIALIZE NAVIGATION
       ========================================================== */


    function init(){


        bindNavigationEvents();


        updateJourneyCounter();



    }








    /* ==========================================================
       BUTTON EVENTS
       ========================================================== */


    function bindNavigationEvents(){



        document.addEventListener(
            "click",
            function(event){



                const target = event.target.closest(
                    "[data-action='next-page']"
                );



                if(!target){

                    return;

                }



                event.preventDefault();



                nextPage();



            }
        );



    }








    /* ==========================================================
       NEXT PAGE
       ========================================================== */


    function nextPage(){



        if(
            journey.currentPage >= journey.totalPages
        ){

            return;

        }



        journey.currentPage++;




        loadPage(
            journey.currentPage
        );




    }








    /* ==========================================================
       LOAD PAGE
       ========================================================== */


    function loadPage(pageNumber){



        const pageName =
            journey.pages[
                pageNumber - 1
            ];




        const container =
            document.getElementById(
                "app-content"
            );



        if(!container){

            return;

        }






        fetch(
            `pages/${pageName}.html`
        )

        .then(
            response => response.text()
        )

        .then(
            html => {



                container.innerHTML = html;



                updateJourneyCounter();



                scrollToTop();



                loadPageScript(
                    pageName
                );



            }

        )

        .catch(
            error => {


                console.error(
                    "Page loading error:",
                    error
                );


            }
        );



    }








    /* ==========================================================
       PAGE SCRIPT LOADER
       ========================================================== */


    function loadPageScript(pageName){



        const script =
            document.createElement(
                "script"
            );



        script.src =
            `js/pages/${pageName}.js`;



        script.defer = true;



        document.body.appendChild(
            script
        );



    }








    /* ==========================================================
       JOURNEY COUNTER
       ========================================================== */


    function updateJourneyCounter(){



        const counter =
            document.getElementById(
                "journey-counter"
            );



        if(!counter){

            return;

        }




        counter.textContent =


            String(
                journey.currentPage
            )
            .padStart(2,"0")

            +

            " / "

            +

            journey.totalPages;



    }








    /* ==========================================================
       SCROLL RESET
       ========================================================== */


    function scrollToTop(){



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });



    }








    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {


        init,

        nextPage,

        loadPage,

        scrollToTop


    };



})();







/* ==========================================================================
   AUTO START

   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        CTMNavigation.init();



    }
);
