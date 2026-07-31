
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : page01.js
   Version   : 10.0

   Purpose:

   Page 01 Experience Intelligence

   Responsibilities:

   ✓ Initialize Page 01
   ✓ Bind CTA Interaction
   ✓ Update Journey Counter
   ✓ Navigate To Page 02

   Does NOT:

   ✗ Global Routing
   ✗ API Calls
   ✗ Business Logic
   ✗ Application State

   ========================================================================== */



(function(){


"use strict";



/* ==========================================================================
   PAGE CONFIGURATION
========================================================================== */


const PAGE_CONFIG = {


    currentPage: 1,


    totalPages: 7,


    nextPage:

        "page02.html"


};





/* ==========================================================================
   INITIALIZE PAGE
========================================================================== */


function initPage01(){



    updateJourneyIndicator();



    bindJourneyButton();



    activateEntranceAnimation();



}





/* ==========================================================================
   UPDATE JOURNEY COUNTER
========================================================================== */


function updateJourneyIndicator(){



    const counter =

        document.getElementById(

            "journey-counter"

        );



    if(!counter){

        return;

    }



    counter.textContent =


        String(PAGE_CONFIG.currentPage)

            .padStart(2,"0")

        +

        " / "

        +

        String(PAGE_CONFIG.totalPages)

            .padStart(2,"0");



}





/* ==========================================================================
   CTA BUTTON
========================================================================== */


function bindJourneyButton(){



    const button =


        document.getElementById(

            "begin-journey-btn"

        );



    if(!button){

        return;

    }



    button.addEventListener(

        "click",

        startJourney

    );


}





/* ==========================================================================
   START JOURNEY
========================================================================== */


function startJourney(){



    buttonTransition();



    setTimeout(

        function(){


            window.location.href =

                PAGE_CONFIG.nextPage;



        },

        600

    );



}


 /* ==========================================================================
   PREMIUM ENTRANCE ANIMATION
========================================================================== */


function activateEntranceAnimation(){



    const animatedElements =


        document.querySelectorAll(

            ".hero-container, " +

            ".reflection-text, " +

            ".discovery-card, " +

            ".story-highlight, " +

            ".cta-card, " +

            ".privacy-card"

        );



    animatedElements.forEach(

        function(element,index){



            element.style.opacity = "0";



            element.style.transform =

                "translateY(30px)";



            element.style.transition =

                "opacity .8s ease, transform .8s ease";



            setTimeout(

                function(){



                    element.style.opacity = "1";



                    element.style.transform =

                        "translateY(0)";



                },

                120 * index

            );



        }

    );



}







/* ==========================================================================
   BUTTON PREMIUM TRANSITION
========================================================================== */


function buttonTransition(){



    const button =


        document.getElementById(

            "begin-journey-btn"

        );



    if(!button){

        return;

    }



    button.style.transform =

        "scale(.96)";



    button.style.opacity =

        ".8";



}







/* ==========================================================================
   SCROLL REVEAL SUPPORT

   Simple MVP version.
   No external libraries.

========================================================================== */


function enableScrollReveal(){



    const elements =


        document.querySelectorAll(

            ".discovery-card, " +

            ".transformation-item"

        );



    const observer =


        new IntersectionObserver(


            function(entries){



                entries.forEach(

                    function(entry){



                        if(entry.isIntersecting){



                            entry.target.classList.add(

                                "visible"

                            );



                            observer.unobserve(

                                entry.target

                            );



                        }



                    }

                );



            },


            {

                threshold:.15

            }


        );





    elements.forEach(

        function(element){


            observer.observe(element);


        }

    );



}







/* ==========================================================================
   SAFE START
========================================================================== */


document.addEventListener(


    "DOMContentLoaded",


    function(){



        initPage01();



        enableScrollReveal();



    }


);







/* ==========================================================================
   PUBLIC PAGE API

   Minimal exposure only.

========================================================================== */


window.CTM_PAGE01 = {


    init:

        initPage01,


    start:

        startJourney


};



})();

