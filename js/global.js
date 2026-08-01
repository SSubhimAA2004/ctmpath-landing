
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/global.js


   VERSION:
   1.0


   ARCHITECTURE:
   STATIC JOURNEY MODEL


   RESPONSIBILITY:

   ✓ Global UI behaviour
   ✓ Accessibility support
   ✓ Shared utilities


   DOES NOT:

   ✗ Page loading
   ✗ Routing
   ✗ SPA logic
   ✗ Business logic


========================================================================== */



"use strict";





/* ==========================================================================
   GLOBAL READY STATE
========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        initializeGlobalRuntime();



    }

);









/* ==========================================================================
   GLOBAL INITIALIZATION
========================================================================== */


function initializeGlobalRuntime(){



    enableSmoothAnchors();



    enableButtonFeedback();



    enableAccessibilityHelpers();







    console.log(



        "CTM PATH™ Global Runtime Ready"



    );



}









/* ==========================================================================
   SMOOTH ANCHOR SUPPORT
========================================================================== */


function enableSmoothAnchors(){



    const links =

        document.querySelectorAll(

            'a[href^="#"]'

        );







    links.forEach(function(link){



        link.addEventListener(

            "click",

            function(event){



                const targetID =

                    this.getAttribute(

                        "href"

                    );







                const target =

                    document.querySelector(

                        targetID

                    );







                if(target){



                    event.preventDefault();



                    target.scrollIntoView({



                        behavior:

                            "smooth",



                        block:

                            "start"



                    });



                }



            }

        );



    });



}

/* ==========================================================================
   BUTTON FEEDBACK SYSTEM
========================================================================== */


function enableButtonFeedback(){



    const buttons =

        document.querySelectorAll(

            "a, button"

        );







    buttons.forEach(function(button){



        button.addEventListener(

            "touchstart",

            function(){



                this.classList.add(

                    "is-active"

                );



            },

            {

                passive:true

            }

        );







        button.addEventListener(

            "touchend",

            function(){



                this.classList.remove(

                    "is-active"

                );



            },

            {

                passive:true

            }

        );



    });



}









/* ==========================================================================
   ACCESSIBILITY HELPERS
========================================================================== */


function enableAccessibilityHelpers(){



    document.addEventListener(



        "keydown",



        function(event){



            if(

                event.key === "Escape"

            ){



                document.activeElement.blur();



            }



        }



    );



}









/* ==========================================================================
   ANALYTICS PLACEHOLDER
========================================================================== */


function trackCTMEvent(

    eventName,

    eventData = {}

){



    console.log(



        "CTM Event:",



        eventName,



        eventData



    );



}









/* ==========================================================================
   GLOBAL PUBLIC UTILITIES
========================================================================== */


window.CTM_GLOBAL = {



    version:

        "1.0",



    track:

        trackCTMEvent



};


