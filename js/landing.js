
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
    • Enable Journey Button
    • Prepare Visitor Session
    • Navigate To Registration

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
        MODULE VARIABLES
    =========================================================================*/


    let beginButton = null;

    let optionCards = [];

    let selectedEmotion = null;





    /*=========================================================================
        INITIALIZE
    =========================================================================*/


    function init(){


        beginButton =

            document.getElementById(

                'beginJourney'

            );



        optionCards =

            Array.from(

                document.querySelectorAll(

                    '.life-option'

                )

            );



        if(

            !beginButton ||

            optionCards.length === 0

        ){

            console.error(

                'Landing page initialization failed.'

            );

            return;

        }



        initializeOptions();



        beginButton.disabled = true;



        beginButton.addEventListener(

            'click',

            beginJourney

        );



        console.log(

            'CTM Landing Ready'

        );

    }





    /*=========================================================================
        INITIALIZE OPTIONS
    =========================================================================*/


    function initializeOptions(){


        optionCards.forEach(

            function(card){


                card.addEventListener(

                    'click',

                    function(){

                        selectOption(

                            card

                        );

                    }

                );



                card.addEventListener(

                    'keypress',

                    function(event){

                        if(

                            event.key === 'Enter' ||

                            event.key === ' '

                        ){

                            event.preventDefault();

                            selectOption(

                                card

                            );

                        }

                    }

                );


            }

        );

    }

                   /*=========================================================================
        SELECT OPTION
    =========================================================================*/


    function selectOption(card){


        optionCards.forEach(

            function(item){

                item.classList.remove(

                    'selected'

                );

            }

        );



        card.classList.add(

            'selected'

        );



        selectedEmotion =

            card.dataset.emotion;



        /*--------------------------------------------------
            Save Initial Emotion
        --------------------------------------------------*/


        if(

            CTM.storage &&

            CTM.storage.setInitialEmotion

        ){

            CTM.storage.setInitialEmotion(

                selectedEmotion

            );

        }



        /*--------------------------------------------------
            Enable Begin Journey Button
        --------------------------------------------------*/


        beginButton.disabled = false;

    }





    /*=========================================================================
        BEGIN JOURNEY
    =========================================================================*/


    function beginJourney(){


        if(

            !selectedEmotion

        ){

            return;

        }



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

                'landing.html'

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
            Small Premium Delay
        --------------------------------------------------*/


        beginButton.disabled = true;

        beginButton.innerHTML =

            '<span class="button-ta">உங்கள் பயணம் தொடங்குகிறது...</span>' +

            '<span class="button-en">STARTING YOUR JOURNEY...</span>';



        setTimeout(

            navigateToRegistration,

            500

        );

    }

                   /*=========================================================================
        NAVIGATE TO REGISTRATION
    =========================================================================*/


    function navigateToRegistration(){


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
    APPLICATION START
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
