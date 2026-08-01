
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   FILE:
   js/app.js


   VERSION:
   4.3


   LAYER:
   Application Runtime


   RESPONSIBILITY:

   ✓ Application startup
   ✓ Dynamic page loading
   ✓ Resource loading
   ✓ Page lifecycle control
   ✓ Journey navigation


   DOES NOT:

   ✗ Business logic
   ✗ Assessment logic
   ✗ Diagnosis logic
   ✗ Report generation


========================================================================== */



(function(){



"use strict";





/* ==========================================================================
   APPLICATION CONFIGURATION
========================================================================== */


const APP_CONFIG = {


    name:

        "CTM PATH™ MILLIONAIRES™ Guided Journey™",



    version:

        "4.3",



    totalPages:

        7,



    folders:{


        pages:

            "pages/",



        css:

            "css/",



        js:

            "js/"


    },



    elements:{


        app:

            "app"



    }



};









/* ==========================================================================
   APPLICATION STATE
========================================================================== */


const APP_STATE = {


    currentPage:

        1,



    loadedPages:{},



    loadedStyles:{},



    loadedScripts:{},



    initializedPages:{}



};









/* ==========================================================================
   DOM HELPERS
========================================================================== */


function getElement(id){



    return document.getElementById(

        id

    );



}









function getAppContainer(){



    const app =

        getElement(

            APP_CONFIG.elements.app

        );







    if(!app){



        throw new Error(

            "Application container not found."

        );



    }







    return app;



}

 Page Request

      ↓

loadPage(2)

      ↓

pages/page02.html

      ↓

await page02.css

      ↓

await page02.js

      ↓

initializePage(2)

 /* ==========================================================================
   APPLICATION ERROR HANDLER
========================================================================== */


function handleApplicationError(error){



    console.error(



        "CTM PATH™ Runtime Error:",



        error



    );



}









/* ==========================================================================
   PAGE INITIALIZATION
========================================================================== */


function initializePage(pageNumber){



    if(

        APP_STATE.initializedPages[pageNumber]

    ){



        return;


    }







    const initializerName =



        `initPage${String(pageNumber).padStart(2,"0")}`;







    const initializer =



        window[initializerName];







    if(

        typeof initializer === "function"

    ){



        initializer();



        console.log(



            "Page initialized:",



            pageNumber



        );



    }







    APP_STATE.initializedPages[pageNumber] =

        true;



}









/* ==========================================================================
   SAFE PAGE PREPARATION
========================================================================== */


async function preparePage(pageNumber){



    try {



        await loadPage(

            pageNumber

        );







        await loadPageStyle(

            pageNumber

        );







        await loadPageScript(

            pageNumber

        );







        initializePage(

            pageNumber

        );







        return true;



    }



    catch(error){



        handleApplicationError(

            error

        );



        return false;



    }



}









/* ==========================================================================
   APPLICATION STARTUP
========================================================================== */


async function startApplication(){



    try {



        console.log(



            "CTM PATH™ Guided Journey™ Starting..."



        );







        await preparePage(

            APP_STATE.currentPage

        );







        console.log(



            "CTM PATH™ Guided Journey™ Ready"



        );







    }



    catch(error){



        handleApplicationError(

            error

        );



    }



}

 /* ==========================================================================
   GLOBAL PAGE NAVIGATION API
========================================================================== */


window.goToPage = async function(pageNumber){



    try {



        if(



            !pageNumber ||



            pageNumber < 1 ||



            pageNumber > APP_CONFIG.totalPages



        ){



            console.error(



                "Invalid page number:",



                pageNumber



            );



            return;



        }







        console.log(



            "Navigating to page:",



            pageNumber



        );







        await preparePage(

            pageNumber

        );







    }



    catch(error){



        handleApplicationError(

            error

        );



    }



};









/* ==========================================================================
   PUBLIC APPLICATION API
========================================================================== */


window.CTM_APP = {



    start:


        startApplication,



    loadPage:


        loadPage,



    preparePage:


        preparePage,



    goToPage:


        window.goToPage,



    version:


        APP_CONFIG.version



};









/* ==========================================================================
   APPLICATION BOOTSTRAP
========================================================================== */


document.addEventListener(



    "DOMContentLoaded",



    function(){



        startApplication();



    }



);









/* ==========================================================================
   RUNTIME READY
========================================================================== */


console.log(



    "CTM PATH™ Guided Journey™ Runtime Ready",



    APP_CONFIG.version



);









})(); 

