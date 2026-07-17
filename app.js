

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

/* ==========================================================================
   05.04 TRANSITION ENGINE
========================================================================== */


/* ==========================================================================
   05.04.01 BEGIN TRANSITION
========================================================================== */

function beginTransition(){

    if(

        CTM.presentation.isTransitioning

    ){

        return false;

    }

    CTM.presentation.isTransitioning = true;

    return true;

}



/* ==========================================================================
   05.04.02 END TRANSITION
========================================================================== */

function endTransition(){

    CTM.presentation.isTransitioning = false;

}



/* ==========================================================================
   05.04.03 IS TRANSITIONING
========================================================================== */

function isTransitioning(){

    return CTM.presentation.isTransitioning;

}



/* ==========================================================================
   05.04.04 LOCK TRANSITION
========================================================================== */

function lockTransition(){

    CTM.presentation.isTransitioning = true;

}



/* ==========================================================================
   05.04.05 UNLOCK TRANSITION
========================================================================== */

function unlockTransition(){

    CTM.presentation.isTransitioning = false;

}

/* ==========================================================================
   06. LOGGER ENGINE
========================================================================== */


/* ==========================================================================
   06.01 LOG
========================================================================== */

function log(

    message

){

    if(

        !CTM.config.debug

    ){

        return;

    }

    console.log(

        "[CTM]",

        message

    );

}



/* ==========================================================================
   06.02 WARNING
========================================================================== */

function warn(

    message

){

    if(

        !CTM.config.debug

    ){

        return;

    }

    console.warn(

        "[CTM WARNING]",

        message

    );

}



/* ==========================================================================
   06.03 ERROR
========================================================================== */

function error(

    message,

    details = null

){

    console.error(

        "[CTM ERROR]",

        message

    );

    if(

        details

    ){

        console.error(

            details

        );

    }

}



/* ==========================================================================
   06.04 SUCCESS
========================================================================== */

function success(

    message

){

    if(

        !CTM.config.debug

    ){

        return;

    }

    console.log(

        "%c[CTM SUCCESS] " + message,

        "color:#00D4FF;font-weight:bold;"

    );

}



/* ==========================================================================
   06.05 DIVIDER
========================================================================== */

function divider(){

    if(

        !CTM.config.debug

    ){

        return;

    }

    console.log(

        "------------------------------------------------------------"

    );

}

/* ==========================================================================
   07. SCENE EVENT ENGINE
========================================================================== */


/* ==========================================================================
   07.01 REGISTER SCENE EVENTS
========================================================================== */

function registerSceneEvents(){

    registerNextButton();

    registerPreviousButton();

    initializeScene();

}



/* ==========================================================================
   07.02 REGISTER NEXT BUTTON
========================================================================== */

function registerNextButton(){

    const button =

        document.querySelector(

            ".journey-next-button," +

            ".scene01-button," +

            ".scene02-button," +

            ".scene03-button," +

            ".scene04-button," +

            ".scene05-button," +

            ".scene06-button," +

            ".scene07-button," +

            ".scene08-button," +

            ".scene09-button"

        );

    if(

        !button

    ){

        return;

    }

    button.onclick = nextScene;

}



/* ==========================================================================
   07.03 REGISTER PREVIOUS BUTTON
========================================================================== */

function registerPreviousButton(){

    const button =

        document.querySelector(

            ".journey-previous-button"

        );

    if(

        !button

    ){

        return;

    }

    button.onclick = previousScene;

}



/* ==========================================================================
   07.04 INITIALIZE SCENE
========================================================================== */

function initializeScene(){

    switch(

        CTM.state.currentScene

    ){

        case "scene01":

            initializeScene01();

            break;

        case "scene02":

            initializeScene02();

            break;

        case "scene03":

            initializeScene03();

            break;

        case "scene04":

            initializeScene04();

            break;

        case "scene05":

            initializeScene05();

            break;

        case "scene06":

            initializeScene06();

            break;

        case "scene07":

            initializeScene07();

            break;

        case "scene08":

            initializeScene08();

            break;

        case "scene09":

            initializeScene09();

            break;

    }

}

/* ==========================================================================
   08. SCENE INITIALIZATION ENGINE
========================================================================== */


/* ==========================================================================
   08.01 SCENE 01
========================================================================== */

function initializeScene01(){

    log(

        "Scene 01 initialized."

    );

}



/* ==========================================================================
   08.02 SCENE 02
========================================================================== */

function initializeScene02(){

    log(

        "Scene 02 initialized."

    );

}



/* ==========================================================================
   08.03 SCENE 03
========================================================================== */

function initializeScene03(){

    log(

        "Scene 03 initialized."

    );

}



/* ==========================================================================
   08.04 SCENE 04
========================================================================== */

function initializeScene04(){

    log(

        "Scene 04 initialized."

    );

}



/* ==========================================================================
   08.05 SCENE 05
========================================================================== */

function initializeScene05(){

    log(

        "Scene 05 initialized."

    );

}



/* ==========================================================================
   08.06 SCENE 06
========================================================================== */

function initializeScene06(){

    log(

        "Scene 06 initialized."

    );

}



/* ==========================================================================
   08.07 SCENE 07
========================================================================== */

function initializeScene07(){

    log(

        "Scene 07 initialized."

    );

}



/* ==========================================================================
   08.08 SCENE 08
========================================================================== */

function initializeScene08(){

    log(

        "Scene 08 initialized."

    );

}



/* ==========================================================================
   08.09 SCENE 09
========================================================================== */

function initializeScene09(){

    log(

        "Scene 09 initialized."

    );

}

/* ==========================================================================
   09. UTILITY ENGINE
========================================================================== */


/* ==========================================================================
   09.01 GET ELEMENT
========================================================================== */

function $(

    selector

){

    return document.querySelector(

        selector

    );

}



/* ==========================================================================
   09.02 GET ELEMENTS
========================================================================== */

function $$(

    selector

){

    return document.querySelectorAll(

        selector

    );

}



/* ==========================================================================
   09.03 ADD CLASS
========================================================================== */

function addClass(

    element,

    className

){

    if(

        !element

    ){

        return;

    }

    element.classList.add(

        className

    );

}



/* ==========================================================================
   09.04 REMOVE CLASS
========================================================================== */

function removeClass(

    element,

    className

){

    if(

        !element

    ){

        return;

    }

    element.classList.remove(

        className

    );

}



/* ==========================================================================
   09.05 TOGGLE CLASS
========================================================================== */

function toggleClass(

    element,

    className

){

    if(

        !element

    ){

        return;

    }

    element.classList.toggle(

        className

    );

}



/* ==========================================================================
   09.06 SHOW ELEMENT
========================================================================== */

function show(

    element

){

    if(

        !element

    ){

        return;

    }

    element.style.display = "";

}



/* ==========================================================================
   09.07 HIDE ELEMENT
========================================================================== */

function hide(

    element

){

    if(

        !element

    ){

        return;

    }

    element.style.display = "none";

}



/* ==========================================================================
   09.08 SCROLL TO TOP
========================================================================== */

function scrollToTop(){

    window.scrollTo({

        top:0,

        left:0,

        behavior:"smooth"

    });

}



/* ==========================================================================
   09.09 SAFE PARSE INTEGER
========================================================================== */

function toInteger(

    value,

    fallback = 0

){

    const number =

        parseInt(

            value,

            10

        );

    return Number.isNaN(

        number

    )

        ? fallback

        : number;

}



/* ==========================================================================
   09.10 SAFE PARSE FLOAT
========================================================================== */

function toFloat(

    value,

    fallback = 0

){

    const number =

        parseFloat(

            value

        );

    return Number.isNaN(

        number

    )

        ? fallback

        : number;

}

/* ==========================================================================
   10. SAFETY & ERROR RECOVERY
========================================================================== */


/* ==========================================================================
   10.01 SAFE LOAD SCENE
========================================================================== */

async function safeLoadScene(

    sceneName

){

    try{

        await loadScene(

            sceneName

        );

    }

    catch(

        exception

    ){

        error(

            "Scene load failed.",

            exception

        );

        unlockTransition();

    }

}



/* ==========================================================================
   10.02 SAFE EXECUTE
========================================================================== */

function safeExecute(

    callback

){

    try{

        callback();

    }

    catch(

        exception

    ){

        error(

            "Unexpected application error.",

            exception

        );

    }

}



/* ==========================================================================
   10.03 FILE EXISTS
========================================================================== */

async function fileExists(

    path

){

    try{

        const response =

            await fetch(

                path,

                {

                    method:"HEAD"

                }

            );

        return response.ok;

    }

    catch{

        return false;

    }

}



/* ==========================================================================
   10.04 RESET APPLICATION
========================================================================== */

async function resetApplication(){

    unlockTransition();

    CTM.state.currentScene = null;

    await loadScene(

        SCENES[0]

    );

}



/* ==========================================================================
   10.05 APPLICATION HEALTH
========================================================================== */

function applicationHealthy(){

    return (

        CTM.elements.app !== null &&

        CTM.elements.journey !== null &&

        CTM.state.initialized

    );

}



/* ==========================================================================
   10.06 ASSERT
========================================================================== */

function assert(

    condition,

    message

){

    if(

        condition

    ){

        return;

    }

    throw new Error(

        message

    );

}

/* ==========================================================================
   11. APPLICATION CLEANUP ENGINE
========================================================================== */


/* ==========================================================================
   11.01 REGISTER SCENE EVENTS
========================================================================== */

function registerSceneEvents(){

    registerNextButton();

    registerPreviousButton();

    initializeScene();

    scrollToTop();

}

/* ==========================================================================
   12. APPLICATION FREEZE
========================================================================== */


/* ==========================================================================
   12.01 APPLICATION READY
========================================================================== */

function applicationReady(){

    return (

        CTM.state.initialized &&

        CTM.state.currentScene !== null &&

        applicationHealthy()

    );

}



/* ==========================================================================
   12.02 APPLICATION INFORMATION
========================================================================== */

function applicationInformation(){

    return {

        application :

            CTM.app.name,

        version :

            CTM.app.version,

        currentScene :

            CTM.state.currentScene,

        initialized :

            CTM.state.initialized

    };

}



/* ==========================================================================
   12.03 DEBUG INFORMATION
========================================================================== */

function debugApplication(){

    if(

        !CTM.config.debug

    ){

        return;

    }

    divider();

    console.table(

        applicationInformation()

    );

    divider();

}



/* ==========================================================================
   12.04 FREEZE COMPLETE
========================================================================== */

log(

    "Application Engine v3.0 Ready."

);

