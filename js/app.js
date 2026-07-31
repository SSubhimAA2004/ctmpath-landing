
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : app.js
   Version   : 2.0

   Status    : WORKING MVP ORCHESTRATOR

   Responsibilities:

   ✓ Bootstrap Application
   ✓ Load Global Components
   ✓ Detect Current Page
   ✓ Start Page Module

   Does NOT:

   ✗ Business Logic
   ✗ API Calls
   ✗ Database
   ✗ Complex Routing
   ✗ State Management

   ========================================================================== */


(function(){


"use strict";



/* ==========================================================================
   APPLICATION CONFIGURATION
========================================================================== */


const APP_CONFIG = {


    defaultPage:

        "pages/page01.html",



    defaultScript:

        "js/page01.js"



};







/* ==========================================================================
   APPLICATION START
========================================================================== */


async function startApplication(){



    console.log(

        "CTM PATH™ MILLIONAIRES™ starting..."

    );



    await loadGlobalComponents();



    await loadCurrentPage();



    initializePage();



    console.log(

        "CTM PATH™ MILLIONAIRES™ ready."

    );



}







/* ==========================================================================
   LOAD GLOBAL COMPONENTS
========================================================================== */


async function loadGlobalComponents(){



    if(

        window.CTM_COMPONENTS &&

        typeof window.CTM_COMPONENTS.load ===

        "function"

    ){



        await window.CTM_COMPONENTS.load();



    }



}







/* ==========================================================================
   LOAD CURRENT PAGE
========================================================================== */


async function loadCurrentPage(){



    const app =

        document.getElementById(

            "app"

        );



    if(!app){

        return;

    }





    const page =

        APP_CONFIG.defaultPage;





    const response =

        await fetch(page);





    if(!response.ok){



        throw new Error(

            "Page loading failed"

        );



    }





    const html =

        await response.text();





    app.innerHTML = html;



}


 /* ==========================================================================
   LOAD PAGE SCRIPT
========================================================================== */


async function loadPageScript(){



    const scriptPath =

        APP_CONFIG.defaultScript;



    return new Promise(

        function(resolve,reject){



            const existing =

                document.querySelector(

                    `script[src="${scriptPath}"]`

                );



            if(existing){


                resolve();


                return;


            }





            const script =

                document.createElement(

                    "script"

                );





            script.src = scriptPath;



            script.async = false;





            script.onload = function(){



                resolve();



            };





            script.onerror = function(){



                reject(

                    new Error(

                        "Page script failed: "

                        +

                        scriptPath

                    )

                );



            };





            document.body.appendChild(

                script

            );



        }

    );



}







/* ==========================================================================
   INITIALIZE PAGE MODULE
========================================================================== */


function initializePage(){



    if(

        window.CTM_PAGE01 &&

        typeof window.CTM_PAGE01.init ===

        "function"

    ){



        window.CTM_PAGE01.init();



    }



}







/* ==========================================================================
   APPLICATION ERROR HANDLING
========================================================================== */


function handleApplicationError(error){



    console.error(

        "CTM PATH™ Application Error:",

        error

    );



    const app =

        document.getElementById(

            "app"

        );



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
   START APPLICATION
========================================================================== */


document.addEventListener(


    "DOMContentLoaded",


    async function(){



        try {



            await startApplication();



            await loadPageScript();



            console.log(

                "Page module loaded."

            );



        }


        catch(error){



            handleApplicationError(

                error

            );



        }



    }


);







/* ==========================================================================
   PUBLIC MVP API
========================================================================== */


window.CTM_APP = {


    start:

        startApplication,


    loadPage:

        loadCurrentPage


};



})();

