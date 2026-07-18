

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



/* ==========================================================================
   13. SCENE 02 CONTROLLER
========================================================================== */


/* ==========================================================================
   13.01 SCENE 02 STATE
========================================================================== */

const SCENE02 = {

    /* ==========================================================
       CURRENT FLOW
    ========================================================== */

    currentQuestion : 0,

    totalQuestions : 6,

    initialized : false,

    completed : false,



    /* ==========================================================
       DOM CACHE
    ========================================================== */

    elements : {

        container : null,

        progress : null,

        content : null,

        footer : null,

        nextButton : null,

        previousButton : null

    },



    /* ==========================================================
       USER ANSWERS
    ========================================================== */

    answers : {

        dreamIncome : null,

        currentIncome : null,

        dreams : [],

        financialBurden : null,

        emergencyFund : null,

        financialConfidence : null

    },



    /* ==========================================================
       CALCULATED VALUES
    ========================================================== */

    results : {

        incomeGap : 0,

        confidenceScore : 0,

        burdenScore : 0,

        realityScore : 0

    }

};



/* ==========================================================================
   13.01.01 RESET STATE
========================================================================== */

function resetScene02(){

    SCENE02.currentQuestion = 0;

    SCENE02.initialized = false;

    SCENE02.completed = false;



    SCENE02.answers = {

        dreamIncome : null,

        currentIncome : null,

        dreams : [],

        financialBurden : null,

        emergencyFund : null,

        financialConfidence : null

    };



    SCENE02.results = {

        incomeGap : 0,

        confidenceScore : 0,

        burdenScore : 0,

        realityScore : 0

    };

}



/* ==========================================================================
   13.01.02 SAVE ANSWER
========================================================================== */

function saveScene02Answer(

    key,

    value

){

    if(

        !(key in SCENE02.answers)

    ){

        warn(

            "Unknown Scene02 answer key : " +

            key

        );

        return;

    }



    SCENE02.answers[key] = value;



    log(

        "Scene02 Saved → " +

        key

    );

}



/* ==========================================================================
   13.01.03 GET ANSWER
========================================================================== */

function getScene02Answer(

    key

){

    if(

        !(key in SCENE02.answers)

    ){

        return null;

    }



    return SCENE02.answers[key];

}



/* ==========================================================================
   13.01.04 NEXT QUESTION
========================================================================== */

function nextScene02Question(){

    if(

        SCENE02.currentQuestion <

        SCENE02.totalQuestions - 1

    ){

        SCENE02.currentQuestion++;

    }

}



/* ==========================================================================
   13.01.05 PREVIOUS QUESTION
========================================================================== */

function previousScene02Question(){

    if(

        SCENE02.currentQuestion > 0

    ){

        SCENE02.currentQuestion--;

    }

}



/* ==========================================================================
   13.01.06 CURRENT QUESTION
========================================================================== */

function currentScene02Question(){

    return SCENE02.currentQuestion;

}



/* ==========================================================================
   13.01.07 LAST QUESTION
========================================================================== */

function isLastScene02Question(){

    return (

        SCENE02.currentQuestion ===

        SCENE02.totalQuestions - 1

    );

}



/* ==========================================================================
   13.01.08 FIRST QUESTION
========================================================================== */

function isFirstScene02Question(){

    return (

        SCENE02.currentQuestion === 0

    );

}

/* ==========================================================================
   13.02 QUESTION MASTER
========================================================================== */


/* ==========================================================================
   13.02.01 QUESTIONS
========================================================================== */

const SCENE02_QUESTIONS = [

    {

        id : 1,

        key : "dreamIncome",

        type : "currency",

        progress : 1,



        title : {

            ta : "கனவு மாத வருமானம்™",

            en : "Dream Monthly Income™"

        },



        question : {

            ta : "நீங்கள் மாதம் எவ்வளவு வருமானம் பெற விரும்புகிறீர்கள்?",

            en : "What monthly income would you love to earn?"

        },



        placeholder : {

            ta : "உங்கள் கனவு மாத வருமானம்",

            en : "Enter your dream monthly income"

        },



        helper : {

            ta : "உங்கள் வாழ்க்கை இலக்கை நினைத்து பதிலளிக்கவும்.",

            en : "Answer based on the life you truly wish to live."

        },



        validation : {

            required : true,

            minimum : 1000

        }

    },



    {

        id : 2,

        key : "currentIncome",

        type : "currency",

        progress : 2,



        title : {

            ta : "தற்போதைய மாத வருமானம்™",

            en : "Current Monthly Income™"

        },



        question : {

            ta : "தற்போது நீங்கள் மாதம் எவ்வளவு வருமானம் பெறுகிறீர்கள்?",

            en : "What is your current monthly income?"

        },



        placeholder : {

            ta : "தற்போதைய மாத வருமானம்",

            en : "Enter your current monthly income"

        },



        helper : {

            ta : "அண்மைய சராசரி மாத வருமானத்தை பதிவு செய்யுங்கள்.",

            en : "Enter your average current monthly income."

        },



        validation : {

            required : true,

            minimum : 0

        }

    }

];



/* ==========================================================================
   13.02.02 GET QUESTION
========================================================================== */

function getScene02Question(

    index

){

    if(

        index < 0 ||

        index >= SCENE02_QUESTIONS.length

    ){

        return null;

    }



    return SCENE02_QUESTIONS[

        index

    ];

}



/* ==========================================================================
   13.02.03 CURRENT QUESTION
========================================================================== */

function getCurrentScene02Question(){

    return getScene02Question(

        SCENE02.currentQuestion

    );

}

/* ==========================================================================
   13.02.04 QUESTION 3
========================================================================== */

SCENE02_QUESTIONS.push(

    {

        id : 3,

        key : "dreams",

        type : "chips",

        progress : 3,



        title : {

            ta : "தள்ளிப்போன கனவுகள்™",

            en : "Dreams Delayed™"

        },



        question : {

            ta : "பணக் குறைபாடு காரணமாக எந்த கனவுகள் இன்னும் நிறைவேறவில்லை?",

            en : "Which dreams are still waiting because of your financial situation?"

        },



        helper : {

            ta : "உங்களுக்கு பொருந்தும் அனைத்தையும் தேர்ந்தெடுக்கலாம்.",

            en : "Select every dream that applies to you."

        },



        validation : {

            required : true,

            minimumSelections : 1

        },



        multiple : true,



        options : [

            {

                id : "home",

                value : "Own Home",

                ta : "சொந்த வீடு",

                en : "Own Home"

            },

            {

                id : "education",

                value : "Children's Education",

                ta : "குழந்தைகளின் கல்வி",

                en : "Children's Education"

            },

            {

                id : "travel",

                value : "Travel",

                ta : "சுற்றுலா",

                en : "Travel"

            },

            {

                id : "medical",

                value : "Medical Security",

                ta : "மருத்துவ பாதுகாப்பு",

                en : "Medical Security"

            },

            {

                id : "business",

                value : "Business",

                ta : "சொந்த தொழில்",

                en : "Business"

            },

            {

                id : "vehicle",

                value : "Vehicle",

                ta : "வாகனம்",

                en : "Vehicle"

            },

            {

                id : "family",

                value : "Family Security",

                ta : "குடும்ப பாதுகாப்பு",

                en : "Family Security"

            },

            {

                id : "peace",

                value : "Peace of Mind",

                ta : "மன அமைதி",

                en : "Peace of Mind"

            }

        ]

    }

);



/* ==========================================================================
   13.02.05 CHIP HELPERS
========================================================================== */

function getScene02DreamOptions(){

    return SCENE02_QUESTIONS[2].options;

}



/* ==========================================================================
   13.02.06 TOGGLE DREAM
========================================================================== */

function toggleScene02Dream(

    value

){

    const dreams =

        SCENE02.answers.dreams;



    const index =

        dreams.indexOf(

            value

        );



    if(

        index === -1

    ){

        dreams.push(

            value

        );

    }

    else{

        dreams.splice(

            index,

            1

        );

    }

}



/* ==========================================================================
   13.02.07 DREAM SELECTED
========================================================================== */

function scene02DreamSelected(

    value

){

    return SCENE02.answers.dreams.includes(

        value

    );

}



/* ==========================================================================
   13.02.08 DREAM COUNT
========================================================================== */

function scene02DreamCount(){

    return SCENE02.answers.dreams.length;

}

/* ==========================================================================
   13.02.09 QUESTION 4
========================================================================== */

SCENE02_QUESTIONS.push(

    {

        id : 4,

        key : "financialBurden",

        type : "financialScale",

        progress : 4,



        title : {

            ta : "நிதிச் சுமை™",

            en : "Financial Burden™"

        },



        question : {

            ta : "தற்போதைய நிதிச் சுமை எவ்வளவு உள்ளது?",

            en : "How heavy is your current financial burden?"

        },



        helper : {

            ta : "உங்கள் மனநிலையை பிரதிபலிக்கும் எண்ணை தேர்ந்தெடுக்கவும்.",

            en : "Choose the number that best represents your situation."

        },



        validation : {

            required : true

        },



        scale : {

            minimum : 1,

            maximum : 10,

            defaultValue : 5,



            left : {

                ta : "மிகக் குறைவு",

                en : "Very Low"

            },



            right : {

                ta : "மிக அதிகம்",

                en : "Very High"

            }

        }

    }

);



/* ==========================================================================
   13.02.10 QUESTION 5
========================================================================== */

SCENE02_QUESTIONS.push(

    {

        id : 5,

        key : "emergencyFund",

        type : "optionCard",

        progress : 5,



        title : {

            ta : "அவசரகால நிதி™",

            en : "Emergency Fund™"

        },



        question : {

            ta : "உங்களிடம் அவசரகால சேமிப்பு உள்ளதா?",

            en : "Do you currently have an emergency fund?"

        },



        helper : {

            ta : "ஒரு விருப்பத்தை மட்டும் தேர்ந்தெடுக்கவும்.",

            en : "Select one option."

        },



        validation : {

            required : true

        },



        options : [

            {

                value : "none",

                ta : "இல்லை",

                en : "No Emergency Fund",

                icon : "❌"

            },



            {

                value : "partial",

                ta : "சிறிதளவு உள்ளது",

                en : "Partially Available",

                icon : "⚠️"

            },



            {

                value : "complete",

                ta : "போதுமான சேமிப்பு உள்ளது",

                en : "Fully Available",

                icon : "✅"

            }

        ]

    }

);



/* ==========================================================================
   13.02.11 QUESTION 6
========================================================================== */

SCENE02_QUESTIONS.push(

    {

        id : 6,

        key : "financialConfidence",

        type : "financialScale",

        progress : 6,



        title : {

            ta : "நிதி நம்பிக்கை™",

            en : "Financial Confidence™"

        },



        question : {

            ta : "உங்கள் நிதி எதிர்காலம் குறித்து எவ்வளவு நம்பிக்கை உள்ளது?",

            en : "How confident are you about your financial future?"

        },



        helper : {

            ta : "உங்கள் தற்போதைய உணர்வை பிரதிபலிக்கும் எண்ணை தேர்ந்தெடுக்கவும்.",

            en : "Choose the number that best matches your confidence."

        },



        validation : {

            required : true

        },



        scale : {

            minimum : 1,

            maximum : 10,

            defaultValue : 5,



            left : {

                ta : "நம்பிக்கை இல்லை",

                en : "Not Confident"

            },



            right : {

                ta : "முழு நம்பிக்கை",

                en : "Highly Confident"

            }

        }

    }

);



/* ==========================================================================
   13.02.12 TOTAL QUESTIONS
========================================================================== */

SCENE02.totalQuestions =

    SCENE02_QUESTIONS.length;



/* ==========================================================================
   13.02.13 QUESTION EXISTS
========================================================================== */

function scene02QuestionExists(

    index

){

    return (

        index >= 0 &&

        index < SCENE02.totalQuestions

    );

}



/* ==========================================================================
   13.02.14 LAST QUESTION
========================================================================== */

function scene02IsLastQuestion(){

    return (

        SCENE02.currentQuestion ===

        SCENE02.totalQuestions - 1

    );

}



/* ==========================================================================
   13.02.15 FIRST QUESTION
========================================================================== */

function scene02IsFirstQuestion(){

    return (

        SCENE02.currentQuestion === 0

    );

}

/* ==========================================================================
   13.03 DOM CACHE
========================================================================== */

function cacheScene02Elements(){

    SCENE02.elements = {

        scene :

            document.getElementById(

                "scene02"

            ),

        questions : [

            document.getElementById("fdQuestion01"),

            document.getElementById("fdQuestion02"),

            document.getElementById("fdQuestion03"),

            document.getElementById("fdQuestion04"),

            document.getElementById("fdQuestion05"),

            document.getElementById("fdQuestion06")

        ],

        analysis :

            document.getElementById(

                "fdAnalysis"

            ),

        dashboard :

            document.getElementById(

                "fdDashboard"

            ),

        progressBar :

            document.getElementById(

                "fdProgressBar"

            ),

        progressText :

            document.getElementById(

                "fdProgressText"

            ),

        btnNext :

            document.querySelectorAll(

                "[data-next]"

            ),

        btnPrevious :

            document.querySelectorAll(

                "[data-previous]"

            )

    };

}


    SCENE02.elements = {

        /* ======================================================
           Scene
        ====================================================== */

        scene :

            document.getElementById(

                "scene02"

            ),

        container :

            document.getElementById(

                "fdQuestionContainer"

            ),



        /* ======================================================
           Questions
        ====================================================== */

        questions : [

            document.getElementById(

                "fdQuestion01"

            ),

            document.getElementById(

                "fdQuestion02"

            ),

            document.getElementById(

                "fdQuestion03"

            ),

            document.getElementById(

                "fdQuestion04"

            ),

            document.getElementById(

                "fdQuestion05"

            ),

            document.getElementById(

                "fdQuestion06"

            )

        ],



        /* ======================================================
           Progress
        ====================================================== */

        progressText :

            document.getElementById(

                "fdProgressText"

            ),

        progressFill :

            document.getElementById(

                "fdProgressFill"

            ),



        /* ======================================================
           Analysis
        ====================================================== */

        analysis :

            document.getElementById(

                "fdAnalysisScreen"

            ),



        /* ======================================================
           Dashboard
        ====================================================== */

        dashboard :

            document.getElementById(

                "fdFinancialDashboard"

            ),



        /* ======================================================
           Dashboard Values
        ====================================================== */

        dreamIncome :

            document.getElementById(

                "fdDreamIncome"

            ),

        currentIncome :

            document.getElementById(

                "fdCurrentIncome"

            ),

        incomeGap :

            document.getElementById(

                "fdIncomeGap"

            ),

        dreamSummary :

            document.getElementById(

                "fdDreamSummary"

            ),

        confidenceSummary :

            document.getElementById(

                "fdConfidenceSummary"

            ),

        realitySummary :

            document.getElementById(

                "fdRealitySummary"

            ),

        realityGauge :

            document.getElementById(

                "fdRealityGauge"

            ),



        /* ======================================================
           Inputs
        ====================================================== */

        dreamIncomeInput :

            document.getElementById(

                "dreamIncome"

            ),

        currentIncomeInput :

            document.getElementById(

                "currentIncome"

            ),



        /* ======================================================
           Question 3
        ====================================================== */

        dreamChipGroup :

            document.getElementById(

                "dreamChipGroup"

            ),



        /* ======================================================
           Question 4
        ====================================================== */

        burdenScale :

            document.getElementById(

                "fdFinancialBurdenScale"

            ),



        /* ======================================================
           Question 5
        ====================================================== */

        emergencyFund :

            document.getElementById(

                "fdEmergencyFundOptions"

            ),



        /* ======================================================
           Question 6
        ====================================================== */

        confidenceScale :

            document.getElementById(

                "fdFinancialConfidenceScale"

            ),



        /* ======================================================
           Navigation Buttons
        ====================================================== */

        btnQ1Continue :

            document.getElementById(

                "btnQ1Continue"

            ),

        btnQ2Previous :

            document.getElementById(

                "btnQ2Previous"

            ),

        btnQ2Continue :

            document.getElementById(

                "btnQ2Continue"

            ),

        btnQ3Previous :

            document.getElementById(

                "btnQ3Previous"

            ),

        btnQ3Continue :

            document.getElementById(

                "btnQ3Continue"

            ),

        btnQ4Previous :

            document.getElementById(

                "btnQ4Previous"

            ),

        btnQ4Continue :

            document.getElementById(

                "btnQ4Continue"

            ),

        btnQ5Previous :

            document.getElementById(

                "btnQ5Previous"

            ),

        btnQ5Continue :

            document.getElementById(

                "btnQ5Continue"

            ),

        btnQ6Previous :

            document.getElementById(

                "btnQ6Previous"

            ),

        btnAnalyse :

            document.getElementById(

                "btnAnalyse"

            ),

        btnScene03 :

            document.getElementById(

                "btnScene03"

            )

    };


/* ==========================================================================
   13.04 INITIALIZATION
========================================================================== */

function initializeScene02(){

    if(

        SCENE02.initialized

    ){

        return;

    }



    cacheScene02Elements();



    hideScene02Sections();



    showScene02Question(

        0

    );



    registerScene02Events();



    SCENE02.initialized = true;



    log(

        "Scene02 Ready."

    );

}



/* ==========================================================================
   13.04.01 HIDE ALL
========================================================================== */

function hideScene02Sections(){

    SCENE02.elements.questions.forEach(

        question =>{

            if(

                question

            ){

                question.hidden = true;

            }

        }

    );



    if(

        SCENE02.elements.analysis

    ){

        SCENE02.elements.analysis.hidden = true;

    }



    if(

        SCENE02.elements.dashboard

    ){

        SCENE02.elements.dashboard.hidden = true;

    }

}



/* ==========================================================================
   13.04.02 SHOW QUESTION
========================================================================== */

function showScene02Question(

    index

){

    hideScene02Sections();



    SCENE02.currentQuestion =

        index;



    const question =

        SCENE02.elements.questions[

            index

        ];



    if(

        question

    ){

        question.hidden = false;

    }

}



/* ==========================================================================
   13.04.03 REGISTER EVENTS
========================================================================== */

function registerScene02Events(){

    SCENE02.elements.btnNext.forEach(

        button =>{

            button.addEventListener(

                "click",

                handleScene02Next

            );

        }

    );



    SCENE02.elements.btnPrevious.forEach(

        button =>{

            button.addEventListener(

                "click",

                handleScene02Previous

            );

        }

    );

}



/* ==========================================================================
   13.04.04 PLACEHOLDERS
========================================================================== */

function handleScene02Next(){

    // implemented in Section 13.05

}



function handleScene02Previous(){

    // implemented in Section 13.05

}

/* ==========================================================================
   13.05 NAVIGATION ENGINE
========================================================================== */


/* ==========================================================================
   13.05.01 NEXT
========================================================================== */

function handleScene02Next(){

    if(

        scene02IsLastQuestion()

    ){

        showScene02Analysis();

        return;

    }

    showScene02Question(

        SCENE02.currentQuestion + 1

    );

    updateScene02Progress();

}



/* ==========================================================================
   13.05.02 PREVIOUS
========================================================================== */

function handleScene02Previous(){

    if(

        scene02IsFirstQuestion()

    ){

        return;

    }

    showScene02Question(

        SCENE02.currentQuestion - 1

    );

    updateScene02Progress();

}



/* ==========================================================================
   13.05.03 SHOW ANALYSIS
========================================================================== */

function showScene02Analysis(){

    hideScene02Sections();

    if(

        SCENE02.elements.analysis

    ){

        SCENE02.elements.analysis.hidden = false;

    }

    window.setTimeout(

        showScene02Dashboard,

        1800

    );

}



/* ==========================================================================
   13.05.04 SHOW DASHBOARD
========================================================================== */

function showScene02Dashboard(){

    if(

        SCENE02.elements.analysis

    ){

        SCENE02.elements.analysis.hidden = true;

    }

    if(

        SCENE02.elements.dashboard

    ){

        SCENE02.elements.dashboard.hidden = false;

    }

}



/* ==========================================================================
   13.05.05 UPDATE PROGRESS
========================================================================== */

function updateScene02Progress(){

    const current =

        SCENE02.currentQuestion + 1;

    const percent =

        (

            current /

            SCENE02.totalQuestions

        ) * 100;



    if(

        SCENE02.elements.progressText

    ){

        SCENE02.elements.progressText.textContent =

            "Question " +

            current +

            " of " +

            SCENE02.totalQuestions;

    }



    if(

        SCENE02.elements.progressBar

    ){

        SCENE02.elements.progressBar.style.width =

            percent + "%";

    }

}

/* ==========================================================================
   13.05.06 INITIAL PROGRESS
========================================================================== */

function initializeScene02Progress(){

    SCENE02.currentQuestion = 0;

    updateScene02Progress();

}



/* ==========================================================================
   13.05.07 START SCENE
========================================================================== */

function startScene02(){

    hideScene02Sections();

    showScene02Question(

        0

    );

    initializeScene02Progress();

}



/* ==========================================================================
   13.05.08 SHOW QUESTION
========================================================================== */

function showScene02Question(

    index

){

    if(

        !scene02QuestionExists(

            index

        )

    ){

        return;

    }



    hideScene02Sections();



    SCENE02.currentQuestion =

        index;



    const question =

        SCENE02.elements.questions[

            index

        ];



    if(

        question

    ){

        question.hidden = false;

    }



    updateScene02Progress();

}



/* ==========================================================================
   13.05.09 HIDE ANALYSIS
========================================================================== */

function hideScene02Analysis(){

    if(

        SCENE02.elements.analysis

    ){

        SCENE02.elements.analysis.hidden = true;

    }

}



/* ==========================================================================
   13.05.10 HIDE DASHBOARD
========================================================================== */

function hideScene02Dashboard(){

    if(

        SCENE02.elements.dashboard

    ){

        SCENE02.elements.dashboard.hidden = true;

    }

}


/* ==========================================================================
   13.04.03 REGISTER EVENTS
========================================================================== */

function registerScene02Events(){

    /* ======================================================
       Question 1
    ====================================================== */

    if(

        SCENE02.elements.dreamIncomeInput

    ){

        SCENE02.elements.dreamIncomeInput.addEventListener(

            "input",

            handleDreamIncomeInput

        );

    }



    if(

        SCENE02.elements.btnQ1Continue

    ){

        SCENE02.elements.btnQ1Continue.addEventListener(

            "click",

            handleScene02Next

        );

    }



    /* ======================================================
       Question 2
    ====================================================== */

    if(

        SCENE02.elements.currentIncomeInput

    ){

        SCENE02.elements.currentIncomeInput.addEventListener(

            "input",

            handleCurrentIncomeInput

        );

    }



    if(

        SCENE02.elements.btnQ2Previous

    ){

        SCENE02.elements.btnQ2Previous.addEventListener(

            "click",

            handleScene02Previous

        );

    }



    if(

        SCENE02.elements.btnQ2Continue

    ){

        SCENE02.elements.btnQ2Continue.addEventListener(

            "click",

            handleScene02Next

        );

    }



    /* ======================================================
       Question 3
    ====================================================== */

    document

        .querySelectorAll(

            "#dreamChipGroup .fd-chip"

        )

        .forEach(

            chip =>{

                chip.addEventListener(

                    "click",

                    handleDreamChipClick

                );

            }

        );



    SCENE02.elements.btnQ3Previous.addEventListener(

        "click",

        handleScene02Previous

    );



    SCENE02.elements.btnQ3Continue.addEventListener(

        "click",

        handleScene02Next

    );



    /* ======================================================
       Question 4
    ====================================================== */

    SCENE02.elements.btnQ4Previous.addEventListener(

        "click",

        handleScene02Previous

    );



    SCENE02.elements.btnQ4Continue.addEventListener(

        "click",

        handleScene02Next

    );



    /* ======================================================
       Question 5
    ====================================================== */

    document

        .querySelectorAll(

            "#fdEmergencyFundOptions .fd-option-card"

        )

        .forEach(

            option =>{

                option.addEventListener(

                    "click",

                    handleEmergencyFundSelection

                );

            }

        );



    SCENE02.elements.btnQ5Previous.addEventListener(

        "click",

        handleScene02Previous

    );



    SCENE02.elements.btnQ5Continue.addEventListener(

        "click",

        handleScene02Next

    );



    /* ======================================================
       Question 6
    ====================================================== */

    SCENE02.elements.btnQ6Previous.addEventListener(

        "click",

        handleScene02Previous

    );



    SCENE02.elements.btnAnalyse.addEventListener(

        "click",

        handleScene02Next

    );



    /* ======================================================
       Dashboard
    ====================================================== */

    SCENE02.elements.btnScene03.addEventListener(

        "click",

        handleScene03Transition

    );

}

