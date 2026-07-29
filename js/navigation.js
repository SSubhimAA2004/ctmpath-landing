
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.0

   Purpose:

   Central journey transition controller.

   Responsibilities:

   ✓ Manage page movement
   ✓ Track current journey position
   ✓ Update progress indicator
   ✓ Handle navigation events


   Does NOT:

   ✗ Assessment logic
   ✗ Scoring logic
   ✗ Backend operations


   ========================================================================== */





const CTMNavigation = (() => {




    const journey = {


        currentPage: 1,


        totalPages: 18



    };







    const routes = [


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


        "assessment-11",


        "assessment-12",


        "kalachakra",


        "diagnosis",


        "prescription",


        "cta"


    ];









    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    function init(){



        bindEvents();



        updateProgress();



    }









    /* ==========================================================
       EVENT MANAGEMENT
       ========================================================== */


    function bindEvents(){



        document.addEventListener(

            "click",

            function(event){



                const nextButton =

                event.target.closest(

                    "[data-action='next']"

                );



                if(nextButton){



                    event.preventDefault();



                    next();



                }





                const previousButton =

                event.target.closest(

                    "[data-action='previous']"

                );



                if(previousButton){



                    event.preventDefault();



                    previous();



                }



            }


        );



    }









    /* ==========================================================
       NEXT PAGE
       ========================================================== */


    function next(){



        if(

            journey.currentPage >=

            journey.totalPages

        ){

            return;

        }




        journey.currentPage++;




        loadPage();



    }









    /* ==========================================================
       PREVIOUS PAGE
       ========================================================== */


    function previous(){



        if(

            journey.currentPage <= 1

        ){

            return;

        }




        journey.currentPage--;




        loadPage();



    }









    /* ==========================================================
       PAGE LOADER
       ========================================================== */


    async function loadPage(){



        const page =

        routes[

            journey.currentPage - 1

        ];





        const container =

        document.getElementById(

            "app-content"

        );



        if(!container){

            return;

        }







        try {



            const response =

            await fetch(

                `pages/${page}.html`

            );






            container.innerHTML =

            await response.text();





            updateProgress();



            scrollTop();



        }



        catch(error){



            console.error(

                "Navigation failed:",

                error

            );



        }



    }









    /* ==========================================================
       JOURNEY PROGRESS
       ========================================================== */


    function updateProgress(){



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

        .padStart(

            2,

            "0"

        )

        +

        " / "

        +

        journey.totalPages;



    }









    /* ==========================================================
       SCROLL RESET
       ========================================================== */


    function scrollTop(){



        window.scrollTo({

            top:0,

            behavior:"smooth"


        });



    }









    return {


        init,


        next,


        previous,


        loadPage



    };



})();









/* ==========================================================================
   START NAVIGATION

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    () => {


        CTMNavigation.init();


    }

);
