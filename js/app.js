
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   FILE:
   js/app.js


   VERSION:
   4.1


   LAYER:
   Application Orchestrator


   RESPONSIBILITY:

   ✓ Application boot sequence
   ✓ Dynamic page loading
   ✓ Page resource loading
   ✓ Navigation control
   ✓ Lifecycle management


   DOES NOT:

   ✗ Business logic
   ✗ Assessment calculations
   ✗ Diagnosis logic
   ✗ Roadmap generation


========================================================================== */





(function(){



"use strict";





/* ==========================================================================
   APPLICATION CONFIGURATION
========================================================================== */



const APP_CONFIG = {


    appName:

        "CTM PATH™ MILLIONAIRES™ Guided Journey™",



    version:

        "4.1",



    totalPages:

        7,



    folders:{


        pages:

            "pages/",



        css:

            "css/",



        js:

            "js/",



        components:

            "components/"



    },



    elements:{


        app:

            "app",



        header:

            "global-header",



        footer:

            "global-footer"



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


    return document.getElementById(id);


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

 /* ==========================================================================
   PAGE LOADING ENGINE
========================================================================== */



async function loadPage(pageNumber){



    const app =

        getAppContainer();





    const pageFile =


        `${APP_CONFIG.folders.pages}` +

        `page${String(pageNumber).padStart(2,"0")}.html`;






    try {



        const response =

            await fetch(

                pageFile

            );







        if(!response.ok){



            throw new Error(

                "Unable to load page: " +

                pageNumber

            );



        }







        const html =

            await response.text();







        app.innerHTML = html;







        APP_STATE.currentPage =

            pageNumber;







        APP_STATE.loadedPages[pageNumber] =

            true;







        console.log(


            "Page loaded:",


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
   PAGE RESOURCE CHECK
========================================================================== */



function isPageLoaded(pageNumber){



    return Boolean(

        APP_STATE.loadedPages[pageNumber]

    );



}









/* ==========================================================================
   PAGE TRANSITION HELPER
========================================================================== */



function clearApplication(){



    const app =

        getAppContainer();





    app.innerHTML = "";



}


 /* ==========================================================================
   PAGE STYLE LOADER
========================================================================== */



function loadPageStyle(pageNumber){



    const cssFile =


        `${APP_CONFIG.folders.css}` +

        `page${String(pageNumber).padStart(2,"0")}.css`;







    if(

        APP_STATE.loadedStyles[pageNumber]

    ){



        return;


    }







    const existing =

        document.querySelector(

            `link[data-page-css="${pageNumber}"]`

        );







    if(existing){



        APP_STATE.loadedStyles[pageNumber] =

            true;



        return;


    }







    const link =

        document.createElement(

            "link"

        );







    link.rel =

        "stylesheet";







    link.href =

        cssFile;







    link.dataset.pageCss =

        pageNumber;







    document.head.appendChild(

        link

    );







    APP_STATE.loadedStyles[pageNumber] =

        true;







    console.log(


        "Page CSS loaded:",


        cssFile


    );



}









/* ==========================================================================
   PAGE SCRIPT LOADER
========================================================================== */



function loadPageScript(pageNumber){



    return new Promise(function(resolve,reject){



        if(

            APP_STATE.loadedScripts[pageNumber]

        ){



            resolve();


            return;


        }







        const scriptFile =



            `${APP_CONFIG.folders.js}` +

            `page${String(pageNumber).padStart(2,"0")}.js`;









        const existing =

            document.querySelector(

                `script[data-page-js="${pageNumber}"]`

            );







        if(existing){



            APP_STATE.loadedScripts[pageNumber] =

                true;



            resolve();


            return;


        }







        const script =

            document.createElement(

                "script"

            );







        script.src =

            scriptFile;







        script.dataset.pageJs =

            pageNumber;







        script.onload = function(){



            APP_STATE.loadedScripts[pageNumber] =

                true;



            console.log(


                "Page JS loaded:",


                scriptFile


            );



            resolve();



        };







        script.onerror = function(){



            reject(


                new Error(

                    "Unable to load page script: " +

                    scriptFile

                )


            );



        };







        document.body.appendChild(

            script

        );



    });



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







    const initializer =



        window[

            `initPage${String(pageNumber).padStart(2,"0")}`

        ];







    if(

        typeof initializer === "function"

    ){



        initializer();


    }







    APP_STATE.initializedPages[pageNumber] =

        true;







    console.log(


        "Page initialized:",


        pageNumber


    );



}

 /* ==========================================================================
   APPLICATION ERROR HANDLER
========================================================================== */



function handleApplicationError(error){



    console.error(

        "CTM PATH™ Application Error:",

        error

    );



}









/* ==========================================================================
   APPLICATION START
========================================================================== */



async function startApplication(){



    try {



        console.log(

            "Starting CTM PATH™ Guided Journey™"

        );







        await loadPage(

            APP_STATE.currentPage

        );







        loadPageStyle(

            APP_STATE.currentPage

        );







        await loadPageScript(

            APP_STATE.currentPage

        );







        initializePage(

            APP_STATE.currentPage

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

   Used by:

       Page Modules


   Example:

       window.goToPage(2)

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







        await loadPage(

            pageNumber

        );







        loadPageStyle(

            pageNumber

        );







        await loadPageScript(

            pageNumber

        );







        initializePage(

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



    goToPage:

        window.goToPage,



    version:

        APP_CONFIG.version



};









/* ==========================================================================
   APPLICATION BOOT
========================================================================== */



document.addEventListener(



    "DOMContentLoaded",



    function(){



        startApplication();



    }



);



})(); 

