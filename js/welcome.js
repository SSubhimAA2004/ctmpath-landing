
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/welcome.js
 Version     : 1.3

 Page        : PAGE 01 — WELCOME™

 Purpose:
 Production Welcome page controller.

 Responsibilities:
 - Initialize Welcome CTA
 - Handle journey start
 - Navigate through application router

 Rules:
 - No backend calls
 - No registration logic
 - No assessment logic

 Dependencies:
 - js/app.js

 Status:
 🔒 PAGE 01 Controller Candidate

==============================================================================
*/


(function () {


    "use strict";





    /*
    ==========================================================================
       INITIALIZE
    ==========================================================================
    */


    function initWelcomePage(){



        const button =

            document.getElementById(

                "beginJourneyButton"

            );





        if(!button){



            console.warn(

                "CTM PATH™: Welcome CTA not found."

            );



            return;


        }







        /*
        Prevent duplicate listeners
        */


        if(

            button.dataset.initialized === "true"

        ){


            return;


        }





        button.dataset.initialized = "true";






        button.addEventListener(

            "click",

            handleBeginJourney

        );



    }









    /*
    ==========================================================================
       BEGIN JOURNEY
    ==========================================================================
    */


    function handleBeginJourney(event){



        event.preventDefault();





        const button = event.currentTarget;





        /*
        Premium interaction feedback
        */


        button.classList.add(

            "journey-starting"

        );








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

                        "CTM PATH™ Router unavailable."

                    );


                }





            },

            250

        );



    }









    /*
    ==========================================================================
       AUTO INITIALIZE
       
       Important:
       This file loads dynamically after welcome.html exists.
       Therefore initialize immediately.
    ==========================================================================
    */


    initWelcomePage();



})();

