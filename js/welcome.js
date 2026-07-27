
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/welcome.js
 Version     : 1.4

 Page        : PAGE 01 — WELCOME™

 Purpose:
 Production Welcome page controller.

 Responsibilities:
 - Activate Begin Journey CTA
 - Navigate through CTM_APP router
 - Support dynamically loaded pages

 Rules:
 - No backend calls
 - No registration logic
 - No assessment logic

 Architecture:
 - Compatible with app.js dynamic loader

 Status:
 🔒 PAGE 01 Navigation Fix

==============================================================================
*/


(function () {


    "use strict";



    /*
    ==========================================================================
       INITIALIZATION
    ==========================================================================
    */


    function initWelcomePage(){



        console.log(

            "CTM PATH™ Welcome Controller Ready."

        );



    }








    /*
    ==========================================================================
       EVENT DELEGATION
       
       Works with dynamically injected HTML
    ==========================================================================
    */


    document.addEventListener(

        "click",

        function(event){



            const button =

                event.target.closest(

                    "#beginJourneyButton"

                );





            if(!button){


                return;


            }





            event.preventDefault();





            startJourney();



        }



    );









    /*
    ==========================================================================
       START JOURNEY
    ==========================================================================
    */


    function startJourney(){



        const button =

            document.getElementById(

                "beginJourneyButton"

            );





        if(button){



            button.classList.add(

                "journey-starting"

            );


        }







        setTimeout(

            function(){





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

                        "CTM PATH™: Router unavailable."

                    );



                }





            },

            200

        );



    }









    /*
    ==========================================================================
       START CONTROLLER
    ==========================================================================
    */


    initWelcomePage();



})();

