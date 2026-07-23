
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    router.js

    PURPOSE

    Application Router

    RESPONSIBILITIES

    • Define Application Routes
    • Navigate Between Pages
    • Detect Current Page
    • Redirect Entry Page

    NOTE

    This router controls ONLY page navigation.

    Assessment navigation belongs to

    assessmentEngine.js

=============================================================================*/


'use strict';


/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};



/*=============================================================================
    ROUTER MODULE
=============================================================================*/


CTM.router = (function(){



    /*=========================================================================
        ROUTE DEFINITIONS
    =========================================================================*/


    const ROUTES = {


        landing:

            'pages/landing.html',


        registration:

            'pages/registration.html',


        assessment:

            'pages/assessment.html',


        kaalachakra:

            'pages/kaalachakra.html',


        diagnosis:

            'pages/diagnosis.html',


        prescription:

            'pages/prescription.html',


        completion:

            'pages/completion.html'


    };



    /*=========================================================================
        GET CURRENT PAGE
    =========================================================================*/


    function current(){


        const path =

            window.location.pathname;



        const file =

            path

                .split('/')

                .pop();



        return file || 'index.html';


    }



    /*=========================================================================
        CHECK ROUTE EXISTS
    =========================================================================*/


    function exists(route){


        return Object.prototype.hasOwnProperty.call(

            ROUTES,

            route

        );


    }



    /*=========================================================================
        NAVIGATE
    =========================================================================*/


    function go(route){


        if(!exists(route)){


            console.error(

                'CTM Router: Unknown Route',

                route

            );


            return false;


        }



        window.location.href =

            ROUTES[route];



        return true;


    }


    /*=========================================================================
        REPLACE NAVIGATION
    =========================================================================*/


    function replace(route){


        if(!exists(route)){


            console.error(

                'CTM Router: Unknown Route',

                route

            );


            return false;


        }



        window.location.replace(

            ROUTES[route]

        );



        return true;


    }





    /*=========================================================================
        ENTRY CHECK

        Determines whether current page
        is index.html

    =========================================================================*/


    function isEntryPage(){


        const page = current();



        return(

            page === '' ||

            page === 'index.html'

        );


    }





    /*=========================================================================
        START ROUTER

        First application action

        index.html

            ↓

        landing.html

    =========================================================================*/


    function start(){


        console.log(

            '========================================'

        );


        console.log(

            'CTM PATH™ Router Started'

        );


        console.log(

            'Current Page:',

            current()

        );


        console.log(

            '========================================'

        );



        if(

            isEntryPage()

        ){


            replace(

                'landing'

            );


        }


    }





    /*=========================================================================
        BROWSER HISTORY

    =========================================================================*/


    function back(){


        window.history.back();


    }





    function forward(){


        window.history.forward();


    }





    function reload(){


        window.location.reload();


    }





    /*=========================================================================
        GET ALL ROUTES

    =========================================================================*/


    function routes(){


        return{

            ...ROUTES

        };


    }





    /*=========================================================================
        INITIALIZE

    =========================================================================*/


    function init(){


        console.log(

            'CTM PATH™ Router Ready'

        );


    }





    /*=========================================================================
        PUBLIC API

    =========================================================================*/


    return{


        init,

        start,

        go,

        replace,

        current,

        exists,

        routes,

        back,

        forward,

        reload


    };



})();



/*=============================================================================

    END OF FILE

=============================================================================*/


              
