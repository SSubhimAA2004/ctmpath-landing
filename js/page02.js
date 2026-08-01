
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page02.js


   VERSION:
   1.0


   PAGE:
   PAGE 02 — FINANCIAL CONFIDENCE DISCOVERY™


   ARCHITECTURE:
   STATIC JOURNEY MODEL


   RESPONSIBILITY:

   ✓ Page interactions
   ✓ CTA tracking
   ✓ Discovery card enhancement


   DOES NOT:

   ✗ Routing
   ✗ Page loading
   ✗ Application management


========================================================================== */



"use strict";









/* ==========================================================================
   PAGE READY
========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        initializePage02();


    }

);









/* ==========================================================================
   PAGE INITIALIZATION
========================================================================== */


function initializePage02(){



    initializeJourneyButton();



    initializeDiscoveryCards();



    enableTouchInteractions();







    console.log(



        "CTM PATH™ Page 02 Ready"



    );



}









/* ==========================================================================
   CTA TRACKING
========================================================================== */


function initializeJourneyButton(){



    const button =

        document.querySelector(

            ".journey-button"

        );







    if(!button){



        return;



    }







    button.addEventListener(



        "click",



        function(){



            if(

                window.CTM_GLOBAL &&

                window.CTM_GLOBAL.track

            ){



                window.CTM_GLOBAL.track(



                    "page02_continue_journey",



                    {


                        page:

                            "02",



                        action:

                            "Discover Money Path"



                    }



                );



            }



        }



    );



}









/* ==========================================================================
   DISCOVERY CARD INTERACTION
========================================================================== */


function initializeDiscoveryCards(){



    const cards =

        document.querySelectorAll(

            ".discovery-card"

        );







    cards.forEach(function(card){



        card.addEventListener(



            "mouseenter",



            function(){



                this.classList.add(

                    "active"

                );



            }



        );







        card.addEventListener(



            "mouseleave",



            function(){



                this.classList.remove(

                    "active"

                );



            }



        );



    });



}

/* ==========================================================================
   MOBILE TOUCH INTERACTION
========================================================================== */


function enableTouchInteractions(){



    const cards =

        document.querySelectorAll(

            ".discovery-card"

        );







    cards.forEach(function(card){



        card.addEventListener(



            "touchstart",



            function(){



                this.classList.add(

                    "active"

                );



            },



            {

                passive:true

            }



        );







        card.addEventListener(



            "touchend",



            function(){



                this.classList.remove(

                    "active"

                );



            },



            {

                passive:true

            }



        );



    });



}









/* ==========================================================================
   REDUCED MOTION SUPPORT
========================================================================== */


function respectMotionPreference(){



    if(



        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches



    ){



        document.documentElement.classList.add(

            "reduce-motion"

        );



    }



}









/* ==========================================================================
   PAGE 02 ENHANCED INITIALIZATION
========================================================================== */


function initializePage02Enhancements(){



    enableTouchInteractions();



    respectMotionPreference();



}









/* ==========================================================================
   PAGE 02 PUBLIC NAMESPACE
========================================================================== */


window.CTM_PAGE02 = {



    version:

        "1.0",



    initialize:

        initializePage02Enhancements



};









/* ==========================================================================
   RUN ENHANCEMENTS
========================================================================== */


initializePage02Enhancements();

