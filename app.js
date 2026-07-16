
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

/* ==========================================================
   JS-03
   NAVIGATION
========================================================== */

/* ----------------------------------------------------------
   JS-03.01
   Initialize Navigation
----------------------------------------------------------- */

function initializeNavigation(){

    updateHeader();

    highlightNavigation();

}

/* ----------------------------------------------------------
   JS-03.02
   Update Header
----------------------------------------------------------- */

function updateHeader(){

    if(

        !SELECTORS.header

    ){

        return;

    }

    if(

        window.scrollY > 40

    ){

        SELECTORS.header.classList.add(

            CLASSES.scrolled

        );

    }

    else{

        SELECTORS.header.classList.remove(

            CLASSES.scrolled

        );

    }

}

/* ----------------------------------------------------------
   JS-03.03
   Highlight Navigation
----------------------------------------------------------- */

function highlightNavigation(){

    const links =

        document.querySelectorAll(

            '.navigation a'

        );

    links.forEach(

        link=>{

            link.addEventListener(

                'click',

                ()=>{

                    links.forEach(

                        item=>item.classList.remove(

                            CLASSES.active

                        )

                    );

                    link.classList.add(

                        CLASSES.active

                    );

                }

            );

        }

    );

}

/* ==========================================================
   JS-04
   HERO
========================================================== */

/* ----------------------------------------------------------
   JS-04.01
   Initialize Hero
----------------------------------------------------------- */

function initializeHero(){

    scrollIndicator();

}

/* ----------------------------------------------------------
   JS-04.02
   Scroll Indicator
----------------------------------------------------------- */

function scrollIndicator(){

    const button =

        document.getElementById(

            "beginJourney"

        );

    if(

        !button

    ){

        return;

    }

    button.addEventListener(

        "click",

        function(

            event

        ){

            event.preventDefault();

            const target =

                document.querySelector(

                    "#story"

                );

            if(

                target

            ){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }

    );

}

/* ==========================================================
   JS-05
   REVEAL ANIMATIONS
========================================================== */

/* ----------------------------------------------------------
   JS-05.01
   Initialize
----------------------------------------------------------- */

function initializeRevealAnimations(){

    revealOnScroll();

}

/* ----------------------------------------------------------
   JS-05.02
   Reveal
----------------------------------------------------------- */

function revealOnScroll(){

    const elements =

        document.querySelectorAll(

            ".reveal"

        );

    elements.forEach(

        element=>{

            const top =

                element.getBoundingClientRect().top;

            if(

                top <

                window.innerHeight - 120

            ){

                element.classList.add(

                    "active"

                );

            }

        }

    );

}

/* ==========================================================
   JS-19
   EVENT REGISTRATION
========================================================== */

/* ----------------------------------------------------------
   JS-19.01
   Register Events
----------------------------------------------------------- */

function registerEvents(){

    window.addEventListener(

        "scroll",

        function(){

            updateHeader();

            revealOnScroll();

        }

    );

}

/* ==========================================================
   JS-16
   UTILITIES
========================================================== */

/* ----------------------------------------------------------
   JS-16.01
   Scroll To Element
----------------------------------------------------------- */

function scrollToElement(

    selector

){

    const element =

        document.querySelector(

            selector

        );

    if(

        !element

    ){

        return;

    }

    element.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}

/* ----------------------------------------------------------
   JS-16.02
   Add Class
----------------------------------------------------------- */

function addClass(

    element,

    className

){

    if(

        element

    ){

        element.classList.add(

            className

        );

    }

}

/* ----------------------------------------------------------
   JS-16.03
   Remove Class
----------------------------------------------------------- */

function removeClass(

    element,

    className

){

    if(

        element

    ){

        element.classList.remove(

            className

        );

    }

}

/* ----------------------------------------------------------
   JS-16.04
   Toggle Class
----------------------------------------------------------- */

function toggleClass(

    element,

    className

){

    if(

        element

    ){

        element.classList.toggle(

            className

        );

    }

}

/* ==========================================================
   JS-17
   ANIMATIONS
========================================================== */

/* ----------------------------------------------------------
   JS-17.01
   Fade In
----------------------------------------------------------- */

function fadeIn(

    element

){

    if(

        !element

    ){

        return;

    }

    element.classList.add(

        "fade-in"

    );

}

/* ----------------------------------------------------------
   JS-17.02
   Reveal All
----------------------------------------------------------- */

function revealAll(){

    document

        .querySelectorAll(

            ".reveal"

        )

        .forEach(

            element=>{

                element.classList.add(

                    "active"

                );

            }

        );

}

/* ==========================================================
   JS-18
   RESPONSIVE
========================================================== */

/* ----------------------------------------------------------
   JS-18.01
   Window Resize
----------------------------------------------------------- */

function handleResize(){

    APP.scrollPosition =

        window.scrollY;

}

/* ----------------------------------------------------------
   JS-18.02
   Orientation Change
----------------------------------------------------------- */

window.addEventListener(

    "resize",

    handleResize

);

/* ==========================================================
   JS-20
   APPLICATION START
========================================================== */

/* ----------------------------------------------------------
   JS-20.01
   Start
----------------------------------------------------------- */

console.log(

    "CTM PATH™ Landing Page v" +

    APP.version +

    " Loaded Successfully."

);



