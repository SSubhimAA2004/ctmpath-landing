
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE
    router.js

    PURPOSE

    Application Router

    RESPONSIBILITIES

    • Navigate Between Pages
    • Read Current Page
    • Redirect
    • Back Navigation

    NOTE

    This router NEVER controls
    assessment questions.

    Assessment navigation belongs to

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

        landing      : 'pages/landing.html',

        registration : 'pages/registration.html',

        assessment   : 'pages/assessment.html',

        lifewheel    : 'pages/lifewheel.html',

        diagnosis    : 'pages/diagnosis.html',

        prescription : 'pages/prescription.html',

        cta          : 'pages/cta.html'

    };



    /*=========================================================================
        CURRENT PAGE
    =========================================================================*/

    function current(){

        const file = window.location.pathname

            .split('/')

            .pop();

        return file;

    }



    /*=========================================================================
        NAVIGATE
    =========================================================================*/

    function go(route){

        if(

            !ROUTES[route]

        ){

            console.error(

                'Unknown Route :',

                route

            );

            return;

        }

        window.location.href =

            ROUTES[route];

    }



    /*=========================================================================
        REPLACE
    =========================================================================*/

    function replace(route){

        if(

            !ROUTES[route]

        ){

            return;

        }

        window.location.replace(

            ROUTES[route]

        );

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
        START
    =========================================================================*/

    function start(){

        console.log(

            'Router Started'

        );

        console.log(

            'Current Page :',

            current()

        );

    }



    /*=========================================================================
        INIT
    =========================================================================*/

    function init(){

        console.log(

            'CTM Router Ready'

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

        routes:ROUTES

    };



})();

/*=============================================================================
    END OF FILE
=============================================================================*/
