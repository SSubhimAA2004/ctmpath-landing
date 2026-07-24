
/*=============================================================================

    CTM PATH™

    FROM SURVIVAL TO LIVING™

    FILE

    landing.js

    PURPOSE

    Screen 01 Controller

    RESPONSIBILITIES

    • Initialize Landing Page
    • Capture Life Outlook
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



        const options =

            document.querySelectorAll(

                '.life-option'

            );



        if(!button){


            console.warn(

                'Begin Journey button not found.'

            );


            return;


        }



        options.forEach(function(option){


            option.addEventListener(

                'click',

                function(){


                    options.forEach(function(item){

                        item.classList.remove(

                            'selected'

                        );

                    });



                    option.classList.add(

                        'selected'

                    );



                    const emotion =

                        option.dataset.emotion;



                    if(

                        CTM.storage &&

                        CTM.storage.setInitialEmotion

                    ){

                        CTM.storage.setInitialEmotion(

                            emotion

                        );

                    }


                }

            );


        });




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
            Save Completion Status
        --------------------------------------------------*/


        if(

            CTM.storage &&

            CTM.storage.setCompletionStatus

        ){

            CTM.storage.setCompletionStatus(

                'Started'

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
