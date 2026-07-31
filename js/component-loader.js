
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : component-loader.js
   Version   : 1.0

   Purpose:

   Global Component Loader

   Responsibilities:

   ✓ Load Header
   ✓ Load Footer
   ✓ Inject Shared Components

   Does NOT:

   ✗ Routing
   ✗ Business Logic
   ✗ State Management
   ✗ API Calls

   ========================================================================== */


(function(){


"use strict";



const COMPONENT_PATH = {


    header:

        "components/header.html",


    footer:

        "components/footer.html"


};





/* ==========================================================================
   LOAD COMPONENT
========================================================================== */


async function loadComponent(

    selector,

    file

){



    const container =

        document.querySelector(selector);



    if(!container){

        return;

    }



    try {



        const response =

            await fetch(file);



        if(!response.ok){


            throw new Error(

                "Unable to load "

                + file

            );


        }



        container.innerHTML =

            await response.text();



    }

    catch(error){



        console.error(

            "Component loading failed:",

            error

        );



    }



}







/* ==========================================================================
   LOAD GLOBAL COMPONENTS
========================================================================== */


async function loadGlobalComponents(){



    await loadComponent(

        "#global-header",

        COMPONENT_PATH.header

    );



    await loadComponent(

        "#global-footer",

        COMPONENT_PATH.footer

    );



}







window.CTM_COMPONENTS = {


    load:

        loadGlobalComponents


};



})();

