
/******************************************************************************
 *
 * CTM PATH™ Guided Journey™
 *
 * File        : js/welcome.js
 * Version     : 6.1
 * Status      : Dynamic Component Compatible Welcome Experience
 *
 * ---------------------------------------------------------------------------
 *
 * RESPONSIBILITIES
 *
 * • Premium hero entrance animation
 * • Scroll reveal animation
 * • Journey card animation
 * • CTA enhancement effects
 * • Dynamic CTA navigation
 * • Accessibility support
 * • Reduced-motion support
 *
 ******************************************************************************/

"use strict";







/* ============================================================================
   GLOBAL STATE
============================================================================ */


let prefersReducedMotion = false;

let revealObserver = null;








/* ============================================================================
   APPLICATION INITIALIZATION
============================================================================ */


document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeWelcomePage();

    }

);








/* ============================================================================
   INITIALIZATION
============================================================================ */


function initializeWelcomePage(){


    initializeReducedMotion();


    initializeHero();


    initializeRevealAnimations();


    initializeJourneyCardAnimations();


    initializeCTAEffects();


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







    requestAnimationFrame(


        function(){


            hero.classList.add(

                "is-loaded"

            );


        }


    );


}


/* ============================================================================
   SCROLL REVEAL ANIMATION
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


        elements.forEach(


            function(element){


                element.classList.add(

                    "is-visible"

                );


            }


        );



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

                    0.12


            }


        );







    elements.forEach(


        function(element){


            revealObserver.observe(

                element

            );


        }


    );


}








function handleRevealIntersection(entries){


    entries.forEach(


        function(entry){



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



        }


    );


}








/* ============================================================================
   JOURNEY CARD ANIMATION
============================================================================ */


function initializeJourneyCardAnimations(){


    const cards =

        document.querySelectorAll(

            ".journey-card"

        );



    if(!cards.length){


        return;


    }







    cards.forEach(


        function(card,index){



            if(prefersReducedMotion){


                card.classList.add(

                    "is-visible"

                );


                return;


            }






            card.style.transitionDelay =


                (

                    index * 120

                )

                +

                "ms";



        }


    );



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






    buttons.forEach(


        function(button){



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



        }


    );


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


/*
   IMPORTANT

   CTM PATH™ uses dynamic component loading.

   The welcome screen is injected after the
   main application has already loaded.

   Therefore we use event delegation
   instead of direct button binding.

*/


document.addEventListener(

    "click",

    function(event){



        const startButton =

            event.target.closest(

                "#start-journey"

            );





        if(!startButton){


            return;


        }







        console.log(

            "CTM PATH™ Guided Journey Started"

        );








        /*
           PRIMARY ROUTER
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
           SECONDARY ROUTER
        */


        if(

            typeof navigateTo === "function"

        ){


            navigateTo(

                "registration"

            );


            return;


        }








        /*
           FALLBACK ROUTER
        */


        if(

            typeof showScreen === "function"

        ){


            showScreen(

                "registration"

            );


            return;


        }








        /*
           LAST RESORT

           Keeps browser navigation available
           if router is not loaded.

        */


        window.location.hash =

            "registration";





    }

);








/* ============================================================================
   KEYBOARD ACCESSIBILITY
============================================================================ */


document.addEventListener(

    "keydown",

    function(event){



        if(

            event.key !== "Enter"

        ){


            return;


        }






        const activeElement =

            document.activeElement;







        if(

            activeElement

            &&

            activeElement.id ===

                "start-journey"

        ){


            activeElement.click();


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
