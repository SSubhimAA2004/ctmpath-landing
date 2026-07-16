
/* ==========================================================================
   CTM PATH™ GUIDED JOURNEY™

   FOUNDATION
   APPLICATION ENGINE

   File      : app.js
   Version   : 1.0

   ========================================================================== */


/* ==========================================================================
   GLOBAL APPLICATION
   ========================================================================== */

const CTM = {

    app : {

        name : "CTM PATH™ Guided Journey™",

        version : "1.0"

    },

    config : {

        debug : true

    },

    state : {

        initialized : false

    }

};


/* ==========================================================================
   START APPLICATION
   ========================================================================== */

CTM.start = function(){

    if(

        CTM.config.debug

    ){

        console.log(

            CTM.app.name +
            " v" +
            CTM.app.version

        );

    }

    CTM.cache();

    CTM.verify();

    CTM.initialize();

};


/* ==========================================================================
   CACHE DOM
   ========================================================================== */

CTM.cache = function(){

    CTM.app.element = document.getElementById(

        "app"

    );

    CTM.app.journey = document.getElementById(

        "journey"

    );

};


/* ==========================================================================
   VERIFY FOUNDATION
   ========================================================================== */

CTM.verify = function(){

    if(

        !CTM.app.element

    ){

        console.error(

            "Application container (#app) not found."

        );

        return false;

    }

    if(

        !CTM.app.journey

    ){

        console.error(

            "Journey container (#journey) not found."

        );

        return false;

    }

    return true;

};


/* ==========================================================================
   INITIALIZE
   ========================================================================== */

CTM.initialize = function(){

    CTM.state.initialized = true;

    if(

        CTM.config.debug

    ){

        console.log(

            "Foundation initialized."

        );

    }

};


/* ==========================================================================
   APPLICATION READY
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        CTM.start();

    }

);



