
/*=============================================================================

    CTM PATH™

    FROM SURVIVAL TO LIVING™

    FILE

    landing.js

    PURPOSE

    Screen 01 Controller

    RESPONSIBILITIES

    • Initialize Landing Page
    • Handle Begin Journey Action
    • Prepare Visitor Session
    • Navigate To Registration

    NOTE

    This file controls only

    Screen 01 behaviour.

=============================================================================*/


'use strict';





/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};





/*=============================================================================
    LANDING MODULE
=============================================================================*/


CTM.landing = (function(){





    /*=========================================================================
        INITIALIZE

    =========================================================================*/


    function init(){



        const button =

            document.getElementById(

                'beginJourney'

            );



        if(!button){


            console.warn(

                'Begin Journey button not found.'

            );


            return;


        }





        button.addEventListener(

            'click',

            beginJourney

        );



        console.log(

            'CTM Landing Ready'

        );



    }





    /*=========================================================================
        BEGIN JOURNEY

    =========================================================================*/


    function beginJourney(){



        const now =

            new Date()

                .toISOString();





        /*--------------------------------------------------
            Save Journey Start

        --------------------------------------------------*/


        if(

            CTM.storage &&

            CTM.storage.setStartTime

        ){


            CTM.storage.setStartTime(

                now

            );


        }





        /*--------------------------------------------------
            Save Current Page

        --------------------------------------------------*/


        if(

            CTM.storage &&

            CTM.storage.setCurrentPage

        ){


            CTM.storage.setCurrentPage(

                'Screen01'

            );


        }





        /*--------------------------------------------------
            Navigate

        --------------------------------------------------*/


        if(

            CTM.router &&

            CTM.router.go

        ){


            CTM.router.go(

                'registration'

            );


        }



    }





    /*=========================================================================
        PUBLIC API

    =========================================================================*/


    return{


        init


    };



})();





/*=============================================================================
    START

=============================================================================*/


document.addEventListener(

    'DOMContentLoaded',

    function(){


        CTM.landing.init();


    }

);





/*=============================================================================

    END OF FILE

=============================================================================*/
