
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   PAGE 01 JAVASCRIPT CONTROLLER

   FROM SURVIVAL TO LIVING™

   Version: 10.0


   Responsibilities:

   ✓ Page Initialization
   ✓ Journey Button Behaviour
   ✓ Smooth UX Enhancements
   ✓ Future Tracking Hooks


   Does NOT:

   ✗ Business Logic
   ✗ Assessment Calculation
   ✗ Global Routing
   ✗ API Processing

========================================================================== */



(function(){



"use strict";





/* ==========================================================================
   PAGE MODULE
========================================================================== */


const CTM_PAGE01 = {





    init(){


        console.log(

            "CTM PATH™ MILLIONAIRES™ Page01 Loaded"

        );



        this.bindJourneyButton();



        this.enableSmoothExperience();



    },








/* ==========================================================================
   JOURNEY BUTTON
========================================================================== */


bindJourneyButton(){



    const button =

        document.querySelector(

            ".journey-button"

        );



    if(!button){

        return;

    }





    button.addEventListener(

        "click",

        function(event){



            /*

            Future:

            - capture visitor intent
            - save journey start time
            - analytics event

            */



            console.log(

                "Journey Started"

            );



        }


    );



},







/* ==========================================================================
   PREMIUM SCROLL EXPERIENCE
========================================================================== */


enableSmoothExperience(){



    document.documentElement.style.scrollBehavior =

        "smooth";



},







/* ==========================================================================
   FUTURE PERSONALISATION HOOK
========================================================================== */


setVisitorContext(data){



    sessionStorage.setItem(

        "CTM_PAGE01_CONTEXT",

        JSON.stringify(data)

    );



}





};







/* ==========================================================================
   EXPOSE PAGE MODULE
========================================================================== */


window.CTM_PAGE01 = CTM_PAGE01;







/* ==========================================================================
   AUTO INITIALIZE
========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        CTM_PAGE01.init();


    }

);





})();
