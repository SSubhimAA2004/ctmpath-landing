
/* ==========================================================
   JS-00
   APPLICATION
========================================================== */

/* ----------------------------------------------------------
   JS-00.01
   Application Object
----------------------------------------------------------- */

const APP = {

    version : "1.0",

    initialized : false,

    scrollPosition : 0,

    currentSection : "",

    animationDuration : 800

};

/* ==========================================================
   JS-01
   CONSTANTS
========================================================== */

/* ----------------------------------------------------------
   JS-01.01
   Selectors
----------------------------------------------------------- */

const SELECTORS = {

    header :

        document.querySelector(

            "#header"

        ),

    menuButton :

        document.querySelector(

            "#menuButton"

        ),

    navigation :

        document.querySelector(

            ".navigation"

        ),

    revealElements :

        document.querySelectorAll(

            ".reveal"

        ),

    hero :

        document.querySelector(

            "#hero"

        )

};

/* ----------------------------------------------------------
   JS-01.02
   Classes
----------------------------------------------------------- */

const CLASSES = {

    active :

        "active",

    scrolled :

        "scrolled"

};

/* ==========================================================
   JS-02
   INITIALIZATION
========================================================== */

/* ----------------------------------------------------------
   JS-02.01
   Initialize Application
----------------------------------------------------------- */

function initializeApplication(){

    APP.initialized = true;

    initializeNavigation();

    initializeHero();

    initializeRevealAnimations();

    registerEvents();

}

/* ----------------------------------------------------------
   JS-02.02
   DOM Ready
----------------------------------------------------------- */

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);

