
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : component-loader.js
   Version   : 2.0

   Status    : PREMIUM COMPONENT LOADER


   Responsibilities:

   ✓ Load Header Component
   ✓ Load Footer Component
   ✓ Inject Shared Components
   ✓ Load Header Controller


   Does NOT:

   ✗ Routing
   ✗ Page Loading
   ✗ Business Logic
   ✗ API Calls
   ✗ Assessment Logic

========================================================================== */


(function(){


"use strict";





/* ==========================================================================
   COMPONENT PATHS
========================================================================== */


const COMPONENT_PATH = {


    header:

        "components/header.html",



    footer:

        "components/footer.html"



};





const SCRIPT_PATH = {


    header:

        "js/header.js"



};









/* ==========================================================================
   LOAD HTML COMPONENT
========================================================================== */


async function loadComponent(

    selector,

    file

){



    const container =

        document.querySelector(selector);



    if(!container){


        console.warn(

            "Component container missing:",

            selector

        );


        return;


    }






    try {



        const response =

            await fetch(file);





        if(!response.ok){



            throw new Error(

                "Unable to load component: "

                +

                file

            );


        }






        container.innerHTML =

            await response.text();





        console.log(

            "Loaded component:",

            file

        );



    }



    catch(error){



        console.error(

            "Component loading failed:",

            error

        );



    }



}









/* ==========================================================================
   LOAD JAVASCRIPT CONTROLLER
========================================================================== */


function loadScript(file){



    return new Promise(

        function(resolve,reject){





            const existing =

                document.querySelector(

                    `script[src="${file}"]`

                );






            if(existing){


                resolve();


                return;


            }






            const script =

                document.createElement(

                    "script"

                );






            script.src = file;



            script.async = false;






            script.onload = function(){



                console.log(

                    "Loaded script:",

                    file

                );



                resolve();



            };








            script.onerror = function(){



                reject(

                    new Error(

                        "Script loading failed: "

                        +

                        file

                    )

                );


            };






            document.body.appendChild(script);



        }

    );



}









/* ==========================================================================
   LOAD GLOBAL COMPONENTS
========================================================================== */


async function loadGlobalComponents(){





    /*
       HEADER
    */


    await loadComponent(

        "#global-header",

        COMPONENT_PATH.header

    );







    /*
       HEADER CONTROLLER
    */


    await loadScript(

        SCRIPT_PATH.header

    );







    /*
       FOOTER
    */


    await loadComponent(

        "#global-footer",

        COMPONENT_PATH.footer

    );






    console.log(

        "CTM PATH™ Global Components Loaded."

    );



}









/* ==========================================================================
   PUBLIC API
========================================================================== */


window.CTM_COMPONENTS = {


    load:

        loadGlobalComponents



};





})();

