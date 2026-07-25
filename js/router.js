
/* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : router.js
   Version     : 1.1
   Status      : 🔒 PREMIUM FOUNDATION

   Purpose     : Application Router

                  Owns
                  • Page Navigation
                  • Route Validation
                  • Journey Progression
                  • Navigation Guards
                  • Startup Route Resolution
                  • Scroll Position Reset

                  Owns NO
                  • UI Rendering
                  • Business Logic
                  • Storage Logic
                  • API Communication

   ========================================================================== */


'use strict';





/* ==========================================================================
   ROUTER
   ========================================================================== */


const Router = (() => {





    /* ======================================================================
       ROUTES
       ====================================================================== */


    const ROUTES = {



        LANDING:

            '/pages/landing.html',





        REGISTRATION:

            '/pages/registration.html',





        ASSESSMENT:

            '/pages/assessment.html',





        KALACHAKRA:

            '/pages/kaalachakra.html',





        DIAGNOSIS:

            '/pages/diagnosis.html',





        PRESCRIPTION:

            '/pages/prescription.html',





        COMPLETION:

            '/pages/completion.html'



    };








    /* ======================================================================
       JOURNEY ORDER
       ====================================================================== */


    const JOURNEY = [



        ROUTES.LANDING,



        ROUTES.REGISTRATION,



        ROUTES.ASSESSMENT,



        ROUTES.KALACHAKRA,



        ROUTES.DIAGNOSIS,



        ROUTES.PRESCRIPTION,



        ROUTES.COMPLETION



    ];








    /* ======================================================================
       CURRENT PAGE
       ====================================================================== */


    function currentPage(){


        return window.location.pathname;


    }

                /* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : router.js
   Version     : 1.1

   ========================================================================== */





    /* ======================================================================
       VALID ROUTE
       ====================================================================== */


    function isValidRoute(page){



        return JOURNEY.includes(

            page

        );



    }








    /* ======================================================================
       PAGE INDEX
       ====================================================================== */


    function pageIndex(page){



        return JOURNEY.indexOf(

            page

        );



    }








    /* ======================================================================
       CAN NAVIGATE
       ====================================================================== */


    function canNavigate(target){





        if(



            !isValidRoute(

                target

            )



        ){



            return false;



        }







        const current =

            currentPage();







        if(



            !isValidRoute(

                current

            )



        ){



            return true;



        }







        return (



            pageIndex(

                target

            )

            <=

            pageIndex(

                current

            )

            + 1



        );





    }








    /* ======================================================================
       NORMALIZE PATH
       
       Ensures consistent navigation paths

       ====================================================================== */


    function normalizePath(path){



        if(!path){



            return ROUTES.LANDING;



        }







        return path.startsWith("/")

            ? path

            : "/" + path;



    }

                /* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : router.js
   Version     : 1.1

   ========================================================================== */






    /* ======================================================================
       GO TO PAGE
       ====================================================================== */


    function go(page){





        const target =

            normalizePath(

                page

            );








        if(



            !canNavigate(

                target

            )



        ){



            console.warn(



                "Navigation blocked:",



                target



            );



            return;



        }








        if(



            window.StorageService

            &&

            typeof window.StorageService.saveCurrentPage === "function"



        ){



            StorageService.saveCurrentPage(

                target

            );



        }








        /*
           Reset scroll position
           Prevents next page opening at old scroll location
        */


        window.scrollTo(



            {

                top:0,

                behavior:"instant"

            }



        );








        window.location.href = target;





    }








    /* ======================================================================
       NEXT PAGE
       ====================================================================== */


    function next(){





        const current =

            currentPage();







        const index =

            pageIndex(

                current

            );







        if(



            index === -1

            ||

            index >= JOURNEY.length - 1



        ){



            return;



        }







        go(



            JOURNEY[index + 1]



        );





    }








    /* ======================================================================
       PREVIOUS PAGE
       ====================================================================== */


    function previous(){





        const current =

            currentPage();







        const index =

            pageIndex(

                current

            );







        if(



            index <= 0



        ){



            return;



        }







        go(



            JOURNEY[index - 1]



        );





    }








    /* ======================================================================
       RESTART JOURNEY
       ====================================================================== */


    function restart(){





        if(



            window.StorageService

            &&

            typeof window.StorageService.resetJourney === "function"



        ){



            StorageService.resetJourney();



        }







        go(



            ROUTES.LANDING



        );





    }

                /* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : router.js
   Version     : 1.1

   ========================================================================== */





    /* ======================================================================
       RESUME JOURNEY
       ====================================================================== */


    function resume(){





        let saved = null;







        if(



            window.StorageService

            &&

            typeof window.StorageService.getCurrentPage === "function"



        ){



            saved =

                StorageService.getCurrentPage();



        }








        if(



            saved

            &&

            isValidRoute(

                saved

            )



        ){



            window.scrollTo(

                0,

                0

            );



            window.location.href = saved;



            return;



        }







        window.location.href =

            ROUTES.LANDING;





    }








    /* ======================================================================
       FIRST PAGE CHECK
       ====================================================================== */


    function isFirstPage(){



        return (

            currentPage()

            ===

            ROUTES.LANDING

        );



    }








    /* ======================================================================
       LAST PAGE CHECK
       ====================================================================== */


    function isLastPage(){



        return (

            currentPage()

            ===

            ROUTES.COMPLETION

        );



    }








    /* ======================================================================
       CURRENT STEP
       ====================================================================== */


    function currentStep(){



        return (

            pageIndex(

                currentPage()

            )

            + 1



        );



    }








    /* ======================================================================
       TOTAL STEPS
       ====================================================================== */


    function totalSteps(){



        return JOURNEY.length;



    }








    /* ======================================================================
       PROGRESS PERCENTAGE
       ====================================================================== */


    function progress(){



        return Math.round(



            (

                currentStep()

                /

                totalSteps()



            )

            *

            100



        );



    }








    /* ======================================================================
       NAVIGATION GUARD
       ====================================================================== */


    function protect(){





        const current =

            currentPage();







        if(



            !isValidRoute(

                current

            )



        ){



            return;



        }







        let saved = null;







        if(



            window.StorageService

            &&

            typeof window.StorageService.getCurrentPage === "function"



        ){



            saved =

                StorageService.getCurrentPage();



        }








        if(!saved){



            return;



        }







        const allowedIndex =

            pageIndex(

                saved

            );







        const currentIndex =

            pageIndex(

                current

            );







        if(



            currentIndex >

            allowedIndex + 1



        ){



            window.scrollTo(

                0,

                0

            );



            window.location.href = saved;



        }



    }

                /* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : router.js
   Version     : 1.1

   ========================================================================== */





    /* ======================================================================
       INITIALIZE ROUTER
       ====================================================================== */


    function init(){





        protect();







        const current =

            currentPage();








        if(



            current === "/"

            ||

            current === "/index.html"



        ){



            resume();



            return;



        }







        if(



            window.StorageService

            &&

            typeof window.StorageService.saveCurrentPage === "function"



        ){



            StorageService.saveCurrentPage(

                current

            );



        }





    }








    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {



        ROUTES,



        JOURNEY,





        init,



        go,



        next,



        previous,



        resume,



        restart,



        protect,





        currentPage,



        currentStep,



        totalSteps,



        progress,





        isValidRoute,



        isFirstPage,



        isLastPage



    };





})();








/* ==========================================================================
   AUTO INITIALIZE
   ========================================================================== */


document.addEventListener(



    "DOMContentLoaded",



    ()=>{



        Router.init();



    }



);








/* ==========================================================================
   GLOBAL EXPORT
   ========================================================================== */


window.Router = Router;








/* ==========================================================================
   End of File


   File :

   router.js


   Version :

   1.1


   Status :

   🔒 PREMIUM FOUNDATION


   ========================================================================== */
