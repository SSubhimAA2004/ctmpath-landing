
/******************************************************************************
 *
 * CTM PATH™ Guided Journey™
 *
 * File        : js/welcome.js
 * Version     : 4.0
 * Status      : Premium Welcome Experience
 *
 * ---------------------------------------------------------------------------
 *
 * RESPONSIBILITIES
 *
 * • Hero entrance animation
 * • Scroll reveal animation
 * • Staggered card reveal
 * • CTA enhancements
 * • Accessibility support
 * • Reduced-motion support
 *
 ******************************************************************************/

"use strict";





/* ============================================================================
   APPLICATION
============================================================================ */

document.addEventListener(

    "DOMContentLoaded",

    initializeWelcomePage

);





/* ============================================================================
   INITIALIZATION
============================================================================ */

function initializeWelcomePage(){

    initializeReducedMotion();

    initializeHero();

    initializeRevealAnimations();

    initializeCardAnimations();

    initializeCTAEffects();

}





/* ============================================================================
   REDUCED MOTION
============================================================================ */

let prefersReducedMotion = false;

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

    if(prefersReducedMotion){

        return;

    }

    const hero =

        document.querySelector(".welcome-hero");

    if(!hero){

        return;

    }

    requestAnimationFrame(function(){

        hero.classList.add("is-loaded");

    });

}

/* ============================================================================
   SCROLL REVEAL
============================================================================ */

let revealObserver = null;

function initializeRevealAnimations(){

    const revealElements =

        document.querySelectorAll(".reveal");

    if(!revealElements.length){

        return;

    }

    if(prefersReducedMotion){

        revealElements.forEach(function(element){

            element.classList.add("is-visible");

        });

        return;

    }

    revealObserver =

        new IntersectionObserver(

            handleRevealIntersection,

            {

                root:null,

                rootMargin:"0px 0px -10% 0px",

                threshold:.12

            }

        );

    revealElements.forEach(function(element){

        revealObserver.observe(element);

    });

}





function handleRevealIntersection(entries){

    entries.forEach(function(entry){

        if(!entry.isIntersecting){

            return;

        }

        entry.target.classList.add("is-visible");

        revealObserver.unobserve(entry.target);

    });

}





/* ============================================================================
   DISCOVERY CARD STAGGER
============================================================================ */

function initializeCardAnimations(){

    const cards =

        document.querySelectorAll(

            ".discovery-card"

        );

    if(!cards.length){

        return;

    }

    cards.forEach(function(card,index){

        card.style.transitionDelay =

            (index * 90) + "ms";

    });

}

/* ============================================================================
   CTA INTERACTIONS
============================================================================ */

function initializeCTAEffects(){

    const buttons =

        document.querySelectorAll(

            ".btn-primary, .btn-secondary"

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

        "translateY(-3px)";

}





function handleButtonLeave(event){

    event.currentTarget.style.transform =

        "";

}





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
