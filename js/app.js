
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 1.1
   Status      : DEVELOPMENT

   Purpose:

   Application bootstrap controller.

   Responsibilities:

   • Start application.
   • Load shared components.
   • Initialize shared systems.
   • Coordinate module loading.
   • Manage global application state.

   Does NOT:

   • Own page-specific behaviour.
   • Calculate scores.
   • Generate reports.

   ========================================================================== */



/* ==========================================================================
   GLOBAL APPLICATION NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};





/* ==========================================================================
   APPLICATION CORE
   ========================================================================== */


CTMPATH.App = {


    version:

        "1.1",



    initialized:

        false,



    currentPage:

        null,



    state:

        {}



};





/* ==========================================================================
   APPLICATION INITIALIZATION
   ========================================================================== */


CTMPATH.App.init = async function() {



    if (

        CTMPATH.App.initialized

    ) {


        return;



    }




    await CTMPATH.App.loadComponents();




    CTMPATH.App.loadModules();




    CTMPATH.App.restoreSession();




    CTMPATH.App.startNavigation();




    CTMPATH.App.initialized = true;



};





/* ==========================================================================
   GLOBAL COMPONENT LOADER

   Loads:

   components/header.html
   components/footer.html

   ========================================================================== */


CTMPATH.App.loadComponents = async function() {



    const components = [



        {

            target:

                "#app-header",

            file:

                "components/header.html"

        },



        {

            target:

                "#app-footer",

            file:

                "components/footer.html"

        }



    ];





    for (

        const component of components

    ) {



        try {



            const response = await fetch(

                component.file

            );




            if (

                !response.ok

            ) {



                throw new Error(

                    "Unable to load " +

                    component.file

                );



            }




            const html = await response.text();




            const container = document.querySelector(

                component.target

            );




            if (

                container

            ) {



                container.innerHTML = html;



            }



        }



        catch(error) {



            console.error(

                "Component loading error:",

                error

            );



        }



    }



};

/* ==========================================================================
   MODULE LOADING

   Initializes shared application systems.

   ========================================================================== */


CTMPATH.App.loadModules = function() {



    const modules = [


        "API",


        "Storage",


        "Navigation",


        "AssessmentEngine",


        "Scoring",


        "Report"



    ];





    modules.forEach(function(moduleName) {



        if (

            CTMPATH[moduleName]

        ) {



            console.log(

                moduleName +

                " initialized"

            );



        }



    });



};





/* ==========================================================================
   SESSION RESTORATION

   Restores visitor journey state.

   ========================================================================== */


CTMPATH.App.restoreSession = function() {



    if (


        CTMPATH.Storage &&


        typeof CTMPATH.Storage.getSession ===

            "function"



    ) {



        CTMPATH.App.state =


            CTMPATH.Storage.getSession()

            || {};



    }



};





/* ==========================================================================
   NAVIGATION START

   Starts journey navigation system.

   ========================================================================== */


CTMPATH.App.startNavigation = function() {



    if (


        CTMPATH.Navigation &&


        typeof CTMPATH.Navigation.init ===

            "function"



    ) {



        CTMPATH.Navigation.init();



    }



};





/* ==========================================================================
   APPLICATION READY EVENT

   ========================================================================== */


CTMPATH.App.ready = function() {



    document.dispatchEvent(


        new CustomEvent(

            "CTMPATH_APP_READY"

        )


    );



};





/* ==========================================================================
   PAGE CHANGE HANDLER

   Receives navigation events.

   ========================================================================== */


CTMPATH.App.onPageChange = function(pageNumber) {



    CTMPATH.App.currentPage = pageNumber;





    document.dispatchEvent(


        new CustomEvent(

            "CTMPATH_PAGE_LOADED",


            {


                detail:


                {


                    page:

                        pageNumber


                }


            }


        )


    );



};





/* ==========================================================================
   GLOBAL ERROR HANDLER

   ========================================================================== */


CTMPATH.App.handleError = function(error) {



    console.error(


        "CTM PATH™ Application Error:",


        error


    );





    document.dispatchEvent(


        new CustomEvent(


            "CTMPATH_APP_ERROR",


            {


                detail:


                {


                    error:

                        error


                }


            }


        )


    );



};

/* ==========================================================================
   APPLICATION RESET

   Clears local journey state.

   ========================================================================== */


CTMPATH.App.reset = function() {



    if (


        CTMPATH.Storage &&


        typeof CTMPATH.Storage.clearSession ===

            "function"



    ) {



        CTMPATH.Storage.clearSession();



    }





    CTMPATH.App.state = {};

    CTMPATH.App.currentPage = null;



};





/* ==========================================================================
   GET APPLICATION STATE

   ========================================================================== */


CTMPATH.App.getState = function() {



    return CTMPATH.App.state;



};





/* ==========================================================================
   UPDATE APPLICATION STATE

   Temporary runtime state.

   Persistent storage handled by storage.js.

   ========================================================================== */


CTMPATH.App.updateState = function(

    key,

    value

) {



    CTMPATH.App.state[key] = value;



};





/* ==========================================================================
   GET CURRENT PAGE

   ========================================================================== */


CTMPATH.App.getCurrentPage = function() {



    return CTMPATH.App.currentPage;



};





/* ==========================================================================
   VERSION INFORMATION

   ========================================================================== */


CTMPATH.App.getVersion = function() {



    return CTMPATH.App.version;



};





/* ==========================================================================
   DOM READY

   Application startup trigger.

   ========================================================================== */


document.addEventListener(


    "DOMContentLoaded",


    async function() {



        try {



            await CTMPATH.App.init();



            CTMPATH.App.ready();



        }



        catch(error) {



            CTMPATH.App.handleError(

                error

            );



        }



    }


);





/* ==========================================================================
   END OF FILE

   File:

   js/app.js


   Status:

   APPLICATION CONTROLLER COMPLETE


   ========================================================================== */
