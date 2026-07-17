
/* ==========================================================================
   CTM PATH™ GUIDED JOURNEY™

   APPLICATION ENGINE

   File       : app.js
   Version    : 3.0

   Status     : FOUNDATION (FROZEN)

   Engineering Standard

   One Application
   One Scene Engine
   One Navigation Engine
   One Input Engine
   One Animation Engine

========================================================================== */

"use strict";



/* ==========================================================================
   00. APPLICATION
========================================================================== */


/* ==========================================================================
   00.01 APPLICATION OBJECT
========================================================================== */

const CTM = {

    app : {

        name : "CTM PATH™ Guided Journey™",

        version : "3.0"

    },



/* ==========================================================================
   00.02 CONFIGURATION
========================================================================== */

    config : {

        debug : true

    },



/* ==========================================================================
   00.03 APPLICATION STATE
========================================================================== */

    state : {

        initialized : false,

        currentScene : null

    },



/* ==========================================================================
   00.04 PRESENTATION STATE
========================================================================== */

    presentation : {

        isTransitioning : false,

        transitionDuration : 600,

        animationDuration : 450,

        wheelEnabled : true,

        keyboardEnabled : true,

        touchEnabled : true

    },



/* ==========================================================================
   00.05 DOM ELEMENTS
========================================================================== */

    elements : {

        app : null,

        journey : null

    }

};

/* ==========================================================================
   01. INITIALIZATION
========================================================================== */


/* ==========================================================================
   01.01 DOM READY
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);



/* ==========================================================================
   01.02 INITIALIZE APPLICATION
========================================================================== */

async function initializeApplication(){

    log(

        CTM.app.name +

        " v" +

        CTM.app.version

    );

    cacheElements();

    verifyFoundation();

    await loadScene(

        SCENES[0]

    );

    registerInputEvents();

    CTM.state.initialized = true;

    log(

        "Foundation initialized."

    );

}



/* ==========================================================================
   01.03 CACHE ELEMENTS
========================================================================== */

function cacheElements(){

    CTM.elements.app =

        document.getElementById(

            "app"

        );

    CTM.elements.journey =

        document.getElementById(

            "journey"

        );

    if(

        CTM.elements.journey

    ){

        CTM.elements.journey.style.opacity = "1";

    }

}



/* ==========================================================================
   01.04 VERIFY FOUNDATION
========================================================================== */

function verifyFoundation(){

    if(

        !CTM.elements.app

    ){

        throw new Error(

            "#app not found."

        );

    }

    if(

        !CTM.elements.journey

    ){

        throw new Error(

            "#journey not found."

        );

    }

}

/* ==========================================================================
   02. SCENE ENGINE
========================================================================== */


/* ==========================================================================
   02.01 SCENE REGISTRY
========================================================================== */

const SCENES = [

    "scene01",

    "scene02",

    "scene03",

    "scene04",

    "scene05",

    "scene06",

    "scene07",

    "scene08",

    "scene09"

];



/* ==========================================================================
   02.02 LOAD SCENE
========================================================================== */

async function loadScene(

    sceneName

){

    try{

        await fadeOutScene();

        const response = await fetch(

            `scenes/${sceneName}.html`

        );

        if(

            !response.ok

        ){

            throw new Error(

                "Unable to load " +

                sceneName

            );

        }

        const html =

            await response.text();

        CTM.elements.journey.innerHTML = html;

        CTM.state.currentScene = sceneName;

        registerSceneEvents();

        await fadeInScene();

        log(

            sceneName +

            " loaded."

        );

    }

    catch(

        error

    ){

        console.error(

            error

        );

    }

    finally{

        endTransition();

    }

}



/* ==========================================================================
   02.03 REGISTER SCENE EVENTS
========================================================================== */

function registerSceneEvents(){

    registerNextButton();

}

/* ==========================================================================
   03. NAVIGATION ENGINE
========================================================================== */


/* ==========================================================================
   03.01 REGISTER NEXT BUTTON
========================================================================== */

function registerNextButton(){

    const button =

        document.querySelector(

            ".journey-next-button"

        );

    if(

        !button

    ){

        return;

    }

    button.addEventListener(

        "click",

        nextScene

    );

}



/* ==========================================================================
   03.02 NEXT SCENE
========================================================================== */

async function nextScene(){

    if(

        !beginTransition()

    ){

        return;

    }

    const index =

        SCENES.indexOf(

            CTM.state.currentScene

        );

    if(

        index === -1

    ){

        endTransition();

        return;

    }

    if(

        index >=

        SCENES.length - 1

    ){

        endTransition();

        return;

    }

    await loadScene(

        SCENES[

            index + 1

        ]

    );

}



/* ==========================================================================
   03.03 PREVIOUS SCENE
========================================================================== */

async function previousScene(){

    if(

        !beginTransition()

    ){

        return;

    }

    const index =

        SCENES.indexOf(

            CTM.state.currentScene

        );

    if(

        index <= 0

    ){

        endTransition();

        return;

    }

    await loadScene(

        SCENES[

            index - 1

        ]

    );

}



/* ==========================================================================
   03.04 GO TO SCENE
========================================================================== */

async function goToScene(

    sceneNumber

){

    if(

        !beginTransition()

    ){

        return;

    }

    if(

        sceneNumber < 1 ||

        sceneNumber >

        SCENES.length

    ){

        endTransition();

        return;

    }

    await loadScene(

        SCENES[

            sceneNumber - 1

        ]

    );

}

/* ==========================================================================
   04. INPUT ENGINE
========================================================================== */


/* ==========================================================================
   04.01 REGISTER INPUT EVENTS
========================================================================== */

function registerInputEvents(){

    registerMouseWheel();

    registerKeyboard();

    registerTouch();

}



/* ==========================================================================
   04.02 REGISTER MOUSE WHEEL
========================================================================== */

function registerMouseWheel(){

    if(

        !CTM.presentation.wheelEnabled

    ){

        return;

    }

    window.addEventListener(

        "wheel",

        handleMouseWheel,

        {

            passive:true

        }

    );

}



/* ==========================================================================
   04.03 HANDLE MOUSE WHEEL
========================================================================== */

function handleMouseWheel(

    event

){

    if(

        CTM.presentation.isTransitioning

    ){

        return;

    }

    if(

        event.deltaY > 40

    ){

        nextScene();

    }

    else if(

        event.deltaY < -40

    ){

        previousScene();

    }

}



/* ==========================================================================
   04.04 REGISTER KEYBOARD
========================================================================== */

function registerKeyboard(){

    if(

        !CTM.presentation.keyboardEnabled

    ){

        return;

    }

    window.addEventListener(

        "keydown",

        handleKeyboard

    );

}



/* ==========================================================================
   04.05 HANDLE KEYBOARD
========================================================================== */

function handleKeyboard(

    event

){

    if(

        CTM.presentation.isTransitioning

    ){

        return;

    }

    switch(

        event.key

    ){

        case "ArrowRight":

        case "ArrowDown":

        case "PageDown":

        case " ":

            event.preventDefault();

            nextScene();

            break;

        case "ArrowLeft":

        case "ArrowUp":

        case "PageUp":

            event.preventDefault();

            previousScene();

            break;

    }

}



/* ==========================================================================
   04.06 REGISTER TOUCH
========================================================================== */

function registerTouch(){

    if(

        !CTM.presentation.touchEnabled

    ){

        return;

    }

    window.addEventListener(

        "touchstart",

        handleTouchStart,

        {

            passive:true

        }

    );

    window.addEventListener(

        "touchend",

        handleTouchEnd,

        {

            passive:true

        }

    );

}



/* ==========================================================================
   04.07 TOUCH VARIABLES
========================================================================== */

let touchStartY = 0;

let touchEndY = 0;



/* ==========================================================================
   04.08 HANDLE TOUCH START
========================================================================== */

function handleTouchStart(

    event

){

    touchStartY =

        event.changedTouches[0].clientY;

}



/* ==========================================================================
   04.09 HANDLE TOUCH END
========================================================================== */

function handleTouchEnd(

    event

){

    touchEndY =

        event.changedTouches[0].clientY;

    const distance =

        touchStartY -

        touchEndY;

    if(

        Math.abs(

            distance

        ) < 60

    ){

        return;

    }

    if(

        distance > 0

    ){

        nextScene();

    }

    else{

        previousScene();

    }

}

/* ==========================================================================
   05. ANIMATION ENGINE
========================================================================== */


/* ==========================================================================
   05.01 FADE OUT SCENE
========================================================================== */

async function fadeOutScene(){

    const journey =

        CTM.elements.journey;

    if(

        !journey

    ){

        return;

    }

    journey.style.transition =

        `opacity ${

            CTM.presentation.animationDuration

        }ms ease`;

    journey.style.opacity = "0";

    await wait(

        CTM.presentation.animationDuration

    );

}



/* ==========================================================================
   05.02 FADE IN SCENE
========================================================================== */

async function fadeInScene(){

    const journey =

        CTM.elements.journey;

    if(

        !journey

    ){

        return;

    }

    journey.style.opacity = "0";

    requestAnimationFrame(

        () =>{

            journey.style.opacity = "1";

        }

    );

    await wait(

        CTM.presentation.animationDuration

    );

}



/* ==========================================================================
   05.03 WAIT
========================================================================== */

function wait(

    milliseconds

){

    return new Promise(

        resolve =>

            setTimeout(

                resolve,

                milliseconds

            )

    );

}

