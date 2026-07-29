
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : welcome.js
   Version     : 2.0

   Page        : 01 - Welcome™

   Purpose:

   Controls first journey entry.

   Responsibilities:

   • Begin Journey button.
   • Navigate visitor to next experience.

   Does NOT:

   • Calculate scores.
   • Store assessment data.
   • Call APIs.

   ========================================================================== */



document.addEventListener(
    "DOMContentLoaded",
    function(){



        const beginButton = document.querySelector(
            ".welcome-start-btn"
        );



        if(!beginButton){

            return;

        }





        beginButton.addEventListener(
            "click",
            function(){



                /*
                --------------------------------------------------------------
                CTM PATH™ Journey Entry

                Next destination:
                Registration Experience

                --------------------------------------------------------------
                */



                window.location.href =
                "registration.html";



            }
        );



    }

);





/* ==========================================================================
   END OF FILE

   File:
   js/welcome.js

   Version:
   CTM PATH™ Welcome Interaction v2.0

   Status:
   COMPLETE 🔒

   ========================================================================== */
