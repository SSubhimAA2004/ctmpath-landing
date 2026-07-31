
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : app.js
   Version   : 4.0

   Status    : PREMIUM PAGE MODULE ORCHESTRATOR

   Responsibilities:

   ✓ Bootstrap Application
   ✓ Load Global Header/Footer
   ✓ Detect Current Page URL
   ✓ Load Page HTML
   ✓ Load Page CSS
   ✓ Load Page JavaScript
   ✓ Initialize Page Module


   Does NOT:

   ✗ Business Logic
   ✗ API Calls
   ✗ Database
   ✗ Assessment Logic
   ✗ Report Generation

========================================================================== */


(function(){

"use strict";



/* ==========================================================================
   CONFIGURATION
========================================================================== */


const APP_CONFIG = {


    defaultPage:

        1,


    totalPages:

        7,


    folders:{


        pages:"pages/",


        css:"css/",


        js:"js/"


    }


};





/* ==========================================================================
   START APPLICATION
========================================================================== */


async function startApplication(){


    console.log(
        "CTM PATH™ MILLIONAIRES™ Starting..."
    );



    await loadGlobalComponents();



    const pageNumber =
        detectCurrentPage();



    console.log(
        "Loading Page:",
        pageNumber
    );



    await loadPage(pageNumber);



    loadPageStyle(pageNumber);



    await loadPageScript(pageNumber);



    initializePage(pageNumber);



    console.log(
        "CTM PATH™ MILLIONAIRES™ Ready."
    );


}






/* ==========================================================================
   DETECT CURRENT PAGE
========================================================================== */


function detectCurrentPage(){


    const filename =
        window.location.pathname
        .split("/")
        .pop();



    const match =
        filename.match(/page(\d+)/);



    if(match){


        const page =
            Number(match[1]);



        if(
            page >=1 &&
            page <= APP_CONFIG.totalPages
        ){

            return page;

        }


    }



    return APP_CONFIG.defaultPage;


}






/* ==========================================================================
   LOAD GLOBAL COMPONENTS
========================================================================== */


async function loadGlobalComponents(){


    if(

        window.CTM_COMPONENTS &&

        typeof window.CTM_COMPONENTS.load === "function"

    ){


        await window.CTM_COMPONENTS.load();


    }


}







/* ==========================================================================
   LOAD PAGE HTML
========================================================================== */


async function loadPage(pageNumber){


    const app =
        document.getElementById("app");



    if(!app){

        throw new Error(
            "Application container missing"
        );

    }




    const file =

        `${APP_CONFIG.folders.pages}page${String(pageNumber).padStart(2,"0")}.html`;




    const response =
        await fetch(file);



    if(!response.ok){


        throw new Error(
            "Unable to load "+file
        );


    }




    app.innerHTML =
        await response.text();


}






/* ==========================================================================
   LOAD PAGE CSS
========================================================================== */


function loadPageStyle(pageNumber){


    const cssFile =

        `${APP_CONFIG.folders.css}page${String(pageNumber).padStart(2,"0")}.css`;



    if(
        document.querySelector(
            `link[href="${cssFile}"]`
        )
    ){

        return;

    }



    const link =
        document.createElement("link");



    link.rel =
        "stylesheet";



    link.href =
        cssFile;



    document.head.appendChild(link);


}






/* ==========================================================================
   LOAD PAGE JAVASCRIPT
========================================================================== */


function loadPageScript(pageNumber){


    return new Promise(
        function(resolve,reject){



            const jsFile =

                `${APP_CONFIG.folders.js}page${String(pageNumber).padStart(2,"0")}.js`;




            const script =
                document.createElement("script");



            script.src =
                jsFile;



            script.async =
                false;




            script.onload =
                resolve;




            script.onerror =
                function(){


                    reject(
                        new Error(
                            "Page JS failed: "+jsFile
                        )
                    );


                };



            document.body.appendChild(script);


        }

    );


}






/* ==========================================================================
   INITIALIZE PAGE MODULE
========================================================================== */


function initializePage(pageNumber){


    const moduleName =

        `CTM_PAGE${String(pageNumber).padStart(2,"0")}`;




    if(

        window[moduleName] &&

        typeof window[moduleName].init === "function"

    ){


        window[moduleName].init();


        console.log(
            moduleName,
            "Initialized"
        );


    }



}






/* ==========================================================================
   ERROR HANDLER
========================================================================== */


function handleApplicationError(error){


    console.error(
        "CTM PATH™ Error:",
        error
    );



    const app =
        document.getElementById("app");



    if(app){


        app.innerHTML = `

        <section class="error-screen">

            <h1>
                Something went wrong.
            </h1>


            <p>
                Please refresh and try again.
            </p>


        </section>

        `;


    }


}






/* ==========================================================================
   BOOT
========================================================================== */


document.addEventListener(

"DOMContentLoaded",

async function(){


    try{


        await startApplication();


    }

    catch(error){


        handleApplicationError(error);


    }


});


/* ==========================================================================
   PUBLIC API
========================================================================== */


window.CTM_APP = {


    start:startApplication,


    loadPage:loadPage


};



})();

