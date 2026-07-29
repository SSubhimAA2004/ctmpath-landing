
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 1.6

   Purpose:

   Frontend application bootstrap controller.

   Responsibilities:

   • Initialize application shell
   • Control silent loading state
   • Initialize components
   • Start navigation

   Does NOT:

   • Calculate scores
   • Store business data
   • Handle assessments

   ========================================================================== */





const CTMApp = (() => {



    let initialized = false;








    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    function init(){



        if(initialized){

            return;

        }



        initialized = true;



        hideLoader();



        initializeComponents();



    }








    /* ==========================================================
       COMPONENT INITIALIZATION
       ========================================================== */


    function initializeComponents(){



        if(
            typeof CTMNavigation !== "undefined"
        ){

            CTMNavigation.init();

        }



        loadGlobalComponents();



    }








    /* ==========================================================
       GLOBAL COMPONENT LOADER
       ========================================================== */


    function loadGlobalComponents(){



        loadComponent(
            "app-header",
            "components/header.html"
        );



        loadComponent(
            "app-footer",
            "components/footer.html"
        );



    }








    /* ==========================================================
       COMPONENT FETCHER
       ========================================================== */


    function loadComponent(
        elementId,
        filePath
    ){



        const element =
            document.getElementById(
                elementId
            );



        if(!element){

            return;

        }




        fetch(filePath)

        .then(
            response => response.text()
        )

        .then(
            html => {


                element.innerHTML = html;



            }

        )

        .catch(
            error => {


                console.error(
                    "Component loading error:",
                    error
                );


            }
        );



    }








    /* ==========================================================
       SILENT LOADER CONTROL
       ========================================================== */


    function showLoader(){



        const loader =
            document.getElementById(
                "global-loader"
            );



        if(!loader){

            return;

        }



        loader.classList.remove(
            "hidden"
        );



    }







    function hideLoader(){



        const loader =
            document.getElementById(
                "global-loader"
            );



        if(!loader){

            return;

        }



        loader.classList.add(
            "hidden"
        );



    }








    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {


        init,

        showLoader,

        hideLoader


    };



})();







/* ==========================================================================
   APPLICATION START

   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        CTMApp.init();



    }
);
