
/* ==========================================================================
   PAGE STYLE LOADER
========================================================================== */



async function loadPageStyle(pageNumber){



    const cssFile =


        `${APP_CONFIG.folders.css}` +

        `page${String(pageNumber).padStart(2,"0")}.css`;







    if(

        APP_STATE.loadedStyles[pageNumber]

    ){



        return true;


    }







    const existing =

        document.querySelector(

            `link[data-page-css="${pageNumber}"]`

        );







    if(existing){



        APP_STATE.loadedStyles[pageNumber] =

            true;



        return true;


    }







    return new Promise(function(resolve,reject){



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







        link.onload = function(){



            APP_STATE.loadedStyles[pageNumber] =

                true;







            console.log(



                "Page CSS loaded:",



                cssFile



            );







            resolve(true);



        };







        link.onerror = function(){



            console.error(



                "CSS loading failed:",



                cssFile



            );







            reject(



                new Error(

                    "Unable to load CSS: " +

                    cssFile

                )



            );



        };







        document.head.appendChild(

            link

        );



    });



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







        await loadPageStyle(


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
   RESOURCE VALIDATION HELPERS
========================================================================== */



function isResourceLoaded(type,pageNumber){



    if(type === "css"){



        return Boolean(

            APP_STATE.loadedStyles[pageNumber]

        );



    }







    if(type === "js"){



        return Boolean(

            APP_STATE.loadedScripts[pageNumber]

        );



    }







    return false;



}









/* ==========================================================================
   PAGE RUNTIME RESET
========================================================================== */



function resetPageRuntime(){



    APP_STATE.initializedPages = {};



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
   APPLICATION PUBLIC API
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
   APPLICATION READY
========================================================================== */


console.log(


    "CTM PATH™ Guided Journey™ Runtime Ready",

    APP_CONFIG.version


);









})(); 
