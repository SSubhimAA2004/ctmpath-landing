
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.2

   Purpose:

   Static page navigation controller.

   Responsibilities:

   • Handle CTA buttons
   • Move user to next journey page
   • Reset scroll position

   IMPORTANT:

   This file does NOT:

   • Load HTML dynamically
   • Replace app-content
   • Fetch pages
   • Control backend logic

   ========================================================================== */





const CTMNavigation = (() => {



    const config = {


        currentPage: 1,


        totalPages: 18



    };








    /* ==========================================================
       INITIALIZE
       ========================================================== */


    function init(){



        bindNavigation();



        updateCounter();



    }








    /* ==========================================================
       BUTTON HANDLER
       ========================================================== */


    function bindNavigation(){



        document.addEventListener(

            "click",

            function(event){



                const button = event.target.closest(

                    "[data-action='next-page']"

                );



                if(!button){

                    return;

                }



                event.preventDefault();



                goNext();



            }

        );



    }








    /* ==========================================================
       NEXT PAGE ROUTING
       ========================================================== */


    function goNext(){



        const nextPage =

            config.currentPage + 1;





        if(nextPage > config.totalPages){


            return;


        }




        /*
            Static routing.

            Page naming convention:

            welcome.html
            registration.html
            assessment-01.html
            etc.

        */



        const routes = [

            "welcome.html",

            "registration.html",

            "assessment-01.html",

            "assessment-02.html",

            "assessment-03.html",

            "assessment-04.html",

            "assessment-05.html",

            "assessment-06.html",

            "assessment-07.html",

            "assessment-08.html",

            "assessment-09.html",

            "assessment-10.html",

            "kala-chakra.html",

            "diagnosis.html",

            "prescription.html",

            "review.html",

            "commitment.html",

            "cta.html"

        ];





        window.location.href = routes[

            nextPage - 1

        ];



    }








    /* ==========================================================
       JOURNEY COUNTER
       ========================================================== */


    function updateCounter(){



        const counter = document.getElementById(

            "journey-counter"

        );



        if(!counter){

            return;

        }




        counter.textContent =


            String(

                config.currentPage

            )

            .padStart(

                2,

                "0"

            )

            +

            " / "

            +

            config.totalPages;



    }








    /* ==========================================================
       SCROLL HELPER
       ========================================================== */


    function scrollTop(){



        window.scrollTo({

            top:0,

            left:0,

            behavior:"smooth"

        });



    }








    return {


        init,


        goNext,


        scrollTop



    };



})();








/* ==========================================================================
   START
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        CTMNavigation.init();



    }

);
