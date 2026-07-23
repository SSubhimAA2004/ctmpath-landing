
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE
    router.js

    PURPOSE

    Application Router

    RESPONSIBILITIES

    • Application Entry
    • Route Navigation
    • Current Route Detection
    • Browser Navigation
    • Route Validation

    NOTE

    This router controls ONLY page navigation.

    Assessment navigation is handled by

    assessmentEngine.js

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    ROUTER
=============================================================================*/

CTM.router = (function(){

    /*=========================================================================
        ROUTES
    =========================================================================*/

    const ROUTES = {

        landing       : 'pages/landing.html',

        registration  : 'pages/registration.html',

        assessment    : 'pages/assessment.html',

        kaalachakra   : 'pages/kaalachakra.html',

        diagnosis     : 'pages/diagnosis.html',

        prescription  : 'pages/prescription.html',

        completion    : 'pages/completion.html'

    };



    /*=========================================================================
        CURRENT PAGE
    =========================================================================*/

    function current(){

        const path =

            window.location.pathname;

        return path

            .split('/')

            .pop()

            .toLowerCase();

    }



    /*=========================================================================
        IS INDEX
    =========================================================================*/

    function isIndex(){

        const page = current();

        return(

            page === '' ||

            page === 'index.html'

        );

    }



    /*=========================================================================
        ROUTE EXISTS
    =========================================================================*/

    function exists(route){

        return Object.prototype.hasOwnProperty.call(

            ROUTES,

            route

        );

    }



    /*=========================================================================
        GO
    =========================================================================*/

    function go(route){

        if(

            !exists(route)

        ){

            console.error(

                'Unknown Route :',

                route

            );

            return false;

        }

        window.location.assign(

            ROUTES[route]

        );

        return true;

    }



    /*=========================================================================
        REPLACE
    =========================================================================*/

    function replace(route){

        if(

            !exists(route)

        ){

            console.error(

                'Unknown Route :',

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
        START
    =========================================================================*/

    function start(){

        console.log(

            '========================================'

        );

        console.log(

            'CTM PATH™ Router'

        );

        console.log(

            'Current Page :',

            current()

        );

        console.log(

            '========================================'

        );



        /*--------------------------------------------------------------
            APPLICATION ENTRY

            index.html

                ↓

            landing.html

        --------------------------------------------------------------*/

        if(

            isIndex()

        ){

            replace(

                'landing'

            );

            return;

        }

    }



    /*=========================================================================
        BACK
    =========================================================================*/

    function back(){

        window.history.back();

    }



    /*=========================================================================
        FORWARD
    =========================================================================*/

    function forward(){

        window.history.forward();

    }



    /*=========================================================================
        RELOAD
    =========================================================================*/

    function reload(){

        window.location.reload();

    }



    /*=========================================================================
        GET ROUTES
    =========================================================================*/

    function routes(){

        return{

            ...ROUTES

        };

    }



    /*=========================================================================
        INIT
    =========================================================================*/

    function init(){

        console.log(

            'Router Ready'

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

        back,

        forward,

        reload,

        current,

        exists,

        routes

    };



})();

/*=============================================================================
    END OF FILE
=============================================================================*/
