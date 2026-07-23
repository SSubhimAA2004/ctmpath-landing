
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE
    app.js

    PURPOSE

    Application Bootstrap

    RESPONSIBILITIES

    • Initialize Application
    • Initialize Storage
    • Initialize Router
    • Start Application

    NOTE

    This file NEVER contains
    page-specific business logic.

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    APPLICATION
=============================================================================*/

CTM.app = (function(){

    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        console.log(

            '========================================'

        );

        console.log(

            'CTM PATH™'

        );

        console.log(

            'FROM SURVIVAL TO LIVING™'

        );

        console.log(

            'Application Starting...'

        );

        console.log(

            '========================================'

        );

        /*--------------------------------------------------------------
            STORAGE
        --------------------------------------------------------------*/

        if(

            CTM.storage &&

            typeof CTM.storage.init === 'function'

        ){

            CTM.storage.init();

        }

        else{

            console.error(

                'Storage module not found.'

            );

            return;

        }

        /*--------------------------------------------------------------
            ROUTER
        --------------------------------------------------------------*/

        if(

            CTM.router &&

            typeof CTM.router.init === 'function'

        ){

            CTM.router.init();

            CTM.router.start();

        }

        else{

            console.error(

                'Router module not found.'

            );

            return;

        }

        console.log(

            'Application Ready.'

        );

    }



    /*=========================================================================
        VERSION
    =========================================================================*/

    function version(){

        return '1.0';

    }



    /*=========================================================================
        PUBLIC API
    =========================================================================*/

    return{

        init,

        version

    };



})();

/*=============================================================================
    APPLICATION START
=============================================================================*/

document.addEventListener(

    'DOMContentLoaded',

    function(){

        CTM.app.init();

    }

);

/*=============================================================================
    END OF FILE
=============================================================================*/
