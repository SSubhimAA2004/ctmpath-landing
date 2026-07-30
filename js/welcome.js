
/******************************************************************************
 *
 * CTM PATH™ Guided Journey™
 *
 * File        : js/welcome.js
 * Version     : 6.0
 * Status      : Luxury Hero Experience
 *
 * ---------------------------------------------------------------------------
 *
 * RESPONSIBILITIES
 *
 * • Premium hero entrance animation
 * • Scroll reveal animation
 * • Journey card reveal animation
 * • CTA enhancement effects
 * • Guided Journey navigation trigger
 * • Accessibility support
 * • Reduced-motion support
 *
 ******************************************************************************/

"use strict";





/* ============================================================================
   APPLICATION INITIALIZATION
============================================================================ */


document.addEventListener(

    "DOMContentLoaded",

    initializeWelcomePage

);







/* ============================================================================
   GLOBAL STATE
============================================================================ */


let prefersReducedMotion = false;

let revealObserver = null;







/* ============================================================================
   INITIALIZATION
============================================================================ */


function initializeWelcomePage(){


    initializeReducedMotion();


    initializeHero();


    initializeRevealAnimations();


    initializeJourneyCardAnimations();


    initializeCTAEffects();


    initializeJourneyNavigation();



}








/* ============================================================================
   REDUCED MOTION
============================================================================ */


function initializeReducedMotion(){


    prefersReducedMotion =

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches;



}








/* ============================================================================
   HERO ENTRANCE
============================================================================ */


function initializeHero(){


    const hero =

        document.querySelector(

            ".welcome-hero"

        );



    if(!hero){

        return;

    }




    if(prefersReducedMotion){


        hero.classList.add(

            "is-loaded"

        );


        return;


    }




    requestAnimationFrame(function(){


        hero.classList.add(

            "is-loaded"

        );


    });



}








/* ============================================================================
   SCROLL REVEAL
============================================================================ */


function initializeRevealAnimations(){


    const elements =

        document.querySelectorAll(

            ".reveal"

        );



    if(!elements.length){


        return;


    }





    if(prefersReducedMotion){


        elements.forEach(function(element){


            element.classList.add(

                "is-visible"

            );


        });



        return;


    }






    revealObserver =

        new IntersectionObserver(


            handleRevealIntersection,


            {


                root:null,


                rootMargin:

                    "0px 0px -10% 0px",


                threshold:

                    .12


            }


        );







    elements.forEach(function(element){


        revealObserver.observe(

            element

        );


    });



}







function handleRevealIntersection(entries){


    entries.forEach(function(entry){



        if(!entry.isIntersecting){


            return;


        }





        entry.target.classList.add(

            "is-visible"

        );





        if(revealObserver){


            revealObserver.unobserve(

                entry.target

            );


        }



    });



}







/* ============================================================================
   JOURNEY CARD ANIMATIONS
============================================================================ */


function initializeJourneyCardAnimations(){


    const cards =

        document.querySelectorAll(

            ".journey-card"

        );



    if(!cards.length){


        return;


    }






    cards.forEach(function(card,index){



        if(prefersReducedMotion){


            card.classList.add(

                "is-visible"

            );


            return;


        }





        card.style.transitionDelay =


            (index * 120) + "ms";



    });



}







/* ============================================================================
   CTA VISUAL EFFECTS
============================================================================ */


function initializeCTAEffects(){


    const buttons =

        document.querySelectorAll(

            ".primary-button, .btn-primary, .btn-secondary"

        );




    if(!buttons.length){


        return;


    }






    buttons.forEach(function(button){



        button.addEventListener(

            "mouseenter",

            handleButtonEnter

        );




        button.addEventListener(

            "mouseleave",

            handleButtonLeave

        );




        button.addEventListener(

            "focus",

            handleButtonEnter

        );




        button.addEventListener(

            "blur",

            handleButtonLeave

        );



    });



}







function handleButtonEnter(event){



    if(prefersReducedMotion){


        return;


    }




    event.currentTarget.style.transform =


        "translateY(-4px)";



}







function handleButtonLeave(event){


    event.currentTarget.style.transform =

        "";



}


/* ============================================================================
   GUIDED JOURNEY NAVIGATION
============================================================================ */


function initializeJourneyNavigation(){


    const startButton =

        document.getElementById(

            "start-journey"

        );



    if(!startButton){


        return;


    }







    startButton.addEventListener(


        "click",


        handleStartJourney


    );



}







function handleStartJourney(){



    console.log(

        "CTM PATH™ Guided Journey Started"

    );





    /*
       Preferred application router
    */


    if(

        typeof loadScreen === "function"

    ){


        loadScreen(

            "registration"

        );


        return;


    }






    /*
       Alternative navigation handlers
    */


    if(

        typeof navigateTo === "function"

    ){


        navigateTo(

            "registration"

        );


        return;


    }






    if(

        typeof showScreen === "function"

    ){


        showScreen(

            "registration"

        );


        return;


    }






    /*
       Fallback hash navigation
    */


    window.location.hash =

        "registration";



}








/* ============================================================================
   SCROLL TO TOP SUPPORT
============================================================================ */


function scrollWelcomeToTop(){


    window.scrollTo({


        top:

            0,


        behavior:

            prefersReducedMotion

                ? "auto"

                : "smooth"



    });



}







/* ============================================================================
   KEYBOARD ACCESSIBILITY
============================================================================ */


document.addEventListener(

    "keydown",

    function(event){



        if(

            event.key === "Enter"

            &&

            document.activeElement.id ===

                "start-journey"

        ){


            handleStartJourney();


        }



    }

);







/* ============================================================================
   CLEANUP
============================================================================ */


window.addEventListener(


    "beforeunload",


    function(){



        if(revealObserver){


            revealObserver.disconnect();



        }



    }


);







/* ============================================================================
   END OF FILE
============================================================================ */
