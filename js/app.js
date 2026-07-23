
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

    This file contains NO business logic.

=============================================================================*/


'use strict';




/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};





/*=============================================================================
    APPLICATION MODULE
=============================================================================*/


CTM.app = (function(){





    /*=========================================================================
        INITIALIZE APPLICATION
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





        /*--------------------------------------------------
            STORAGE INITIALIZATION
        --------------------------------------------------*/


        if(

            CTM.storage &&

            typeof CTM.storage.init === 'function'

        ){


            CTM.storage.init();



        }


        else{


            console.error(

                'CTM Storage Module Missing'

            );


            return;



        }





        /*--------------------------------------------------
            ROUTER INITIALIZATION
        --------------------------------------------------*/


        if(

            CTM.router &&

            typeof CTM.router.init === 'function'

        ){


            CTM.router.init();



            CTM.router.start();



        }


        else{


            console.error(

                'CTM Router Module Missing'

            );


            return;



        }





        console.log(

            'Application Ready.'

        );



    }






    /*=========================================================================
        PUBLIC API
    =========================================================================*/


    return{


        init


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
