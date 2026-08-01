
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page01.js


   VERSION:
   1.0


   PAGE:
   PAGE 01 — WELCOME JOURNEY


   ARCHITECTURE:
   STATIC JOURNEY MODEL


   RESPONSIBILITY:

   ✓ Page 01 interactions
   ✓ CTA tracking
   ✓ Discovery card behaviour


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



        initializePage01();



    }



);









/* ==========================================================================
   PAGE 01 INITIALIZATION
========================================================================== */


function initializePage01(){



    initializeJourneyButton();



    initializeDiscoveryCards();







    console.log(



        "CTM PATH™ Page 01 Ready"



    );



}









/* ==========================================================================
   PRIMARY JOURNEY BUTTON
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



            trackCTMEvent(



                "page01_begin_journey",



                {


                    page:

                        "01",



                    action:

                        "Begin Millionaire Journey"



                }



            );



        }



    );



}









/* ==========================================================================
   DISCOVERY CARDS
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
   MOBILE TOUCH CARD SUPPORT
========================================================================== */


function enableMobileCardInteraction(){



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
   PAGE 01 ENHANCED INITIALIZATION
========================================================================== */


function initializePage01Enhancements(){



    enableMobileCardInteraction();



    respectMotionPreference();



}









/* ==========================================================================
   PAGE 01 PUBLIC NAMESPACE
========================================================================== */


window.CTM_PAGE01 = {



    version:

        "1.0",



    initialize:

        initializePage01Enhancements



};









/* ==========================================================================
   RUN PAGE ENHANCEMENTS
========================================================================== */


initializePage01Enhancements();

