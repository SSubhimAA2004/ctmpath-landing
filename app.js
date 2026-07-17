
/* ==========================================================================
   CTM PATH™ GUIDED JOURNEY™

   FOUNDATION ENGINE

   Version : 1.2
========================================================================== */

"use strict";


/* ==========================================================================
   APPLICATION
========================================================================== */

const CTM = {

    app : {

        name : "CTM PATH™ Guided Journey™",

        version : "1.2"

    },

    config : {

        debug : true

    },

    state : {

        initialized : false,

        currentScene : null

    },

    elements : {

        app : null,

        journey : null

    }

};



/* ==========================================================================
   START APPLICATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);



/* ==========================================================================
   INITIALIZE
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

        "scene01"

    );

    CTM.state.initialized = true;

    log(

        "Foundation initialized."

    );

}



/* ==========================================================================
   CACHE
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

}



/* ==========================================================================
   VERIFY
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
   LOAD SCENE
========================================================================== */

async function loadScene(

    sceneName

){

    const response = await fetch(

        `scenes/${sceneName}`

    );

    if(

        !response.ok

    ){

        throw new Error(

            "Unable to load " +

            sceneName

        );

    }

    const html = await response.text();

    CTM.elements.journey.innerHTML = html;

    CTM.state.currentScene = sceneName;

    log(

        sceneName +

        " loaded."

    );

}



/* ==========================================================================
   LOGGER
========================================================================== */

function log(

    message

){

    if(

        CTM.config.debug

    ){

        console.log(

            message

        );

    }

}

/* ==========================================================================
   NAVIGATION ENGINE
========================================================================== */


/* ==========================================================================
   01. SCENE REGISTRY
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
   02. NEXT SCENE
========================================================================== */

async function nextScene(){

    const index =

        SCENES.indexOf(

            CTM.state.currentScene

        );

    if(

        index >=

        SCENES.length - 1

    ){

        return;

    }

    await loadScene(

        SCENES[

            index + 1

        ]

    );

}


/* ==========================================================================
   03. PREVIOUS SCENE
========================================================================== */

async function previousScene(){

    const index =

        SCENES.indexOf(

            CTM.state.currentScene

        );

    if(

        index <= 0

    ){

        return;

    }

    await loadScene(

        SCENES[

            index - 1

        ]

    );

}


/* ==========================================================================
   04. GOTO SCENE
========================================================================== */

async function goToScene(

    number

){

    if(

        number < 1 ||

        number >

        SCENES.length

    ){

        return;

    }

    await loadScene(

        SCENES[

            number - 1

        ]

    );

}


