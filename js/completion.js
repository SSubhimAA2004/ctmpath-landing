
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    completion.js

    PURPOSE

    Journey Completion &
    Implementation Engine

    RESPONSIBILITIES

    • Load Assessment Results
    • Personalize Completion Page
    • Build Journey Summary
    • Connect Visitor to Implementation

    VERSION

    1.0

=============================================================================*/

'use strict';



/*=============================================================================
    GLOBAL
=============================================================================*/

window.CTM = window.CTM || {};



/*=============================================================================
    COMPLETION
=============================================================================*/

CTM.completion = (function(){

    /*=========================================================================
        STATE
    =========================================================================*/

    const state = {

        result : null

    };



    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        loadResults();

        populateVisitor();

        buildJourneySummary();

        bindEvents();

    }



    /*=========================================================================
        LOAD RESULTS
    =========================================================================*/

    function loadResults(){

        state.result =

            CTM.storage.getAssessmentResult();



        if(

            !state.result

        ){

            console.warn(

                'Assessment results unavailable.'

            );

        }

    }



    /*=========================================================================
        VISITOR
    =========================================================================*/

    function populateVisitor(){

        if(

            !state.result

        ){

            return;

        }



        const visitor =

            document.getElementById(

                'visitorName'

            );



        if(

            visitor

        ){

            visitor.textContent =

                state.result.visitor.name;

        }

    }



    /*=========================================================================
        JOURNEY SUMMARY
    =========================================================================*/

    function buildJourneySummary(){

        if(

            !state.result

        ){

            return;

        }



        const items =

            document.querySelectorAll(

                '.journey-item'

            );



        items.forEach(

            (

                item,

                index

            )=>{

                item.style.animationDelay =

                    (index*0.12)+'s';

            }

        );

    }

    /*=========================================================================
        EVENTS
    =========================================================================*/

    function bindEvents(){

        bindCalendly();

        bindWhatsApp();

        bindEmail();

    }



    /*=========================================================================
        CALENDLY
    =========================================================================*/

    function bindCalendly(){

        const button =

            document.getElementById(

                'btnBookSession'

            );



        if(

            !button

        ){

            return;

        }



        button.addEventListener(

            'click',

            function(){

                logJourneyEvent(

                    'BOOK_IMPLEMENTATION_SESSION'

                );

            }

        );

    }



    /*=========================================================================
        WHATSAPP
    =========================================================================*/

    function bindWhatsApp(){

        const link =

            document.querySelector(

                'a[href^="https://wa.me"]'

            );



        if(

            !link

        ){

            return;

        }



        link.addEventListener(

            'click',

            function(){

                logJourneyEvent(

                    'OPEN_WHATSAPP'

                );

            }

        );

    }



    /*=========================================================================
        EMAIL
    =========================================================================*/

    function bindEmail(){

        const link =

            document.querySelector(

                'a[href^="mailto:"]'

            );



        if(

            !link

        ){

            return;

        }



        link.addEventListener(

            'click',

            function(){

                logJourneyEvent(

                    'SEND_EMAIL'

                );

            }

        );

    }



    /*=========================================================================
        JOURNEY EVENT LOGGER
    =========================================================================*/

    function logJourneyEvent(

        action

    ){

        if(

            !state.result

        ){

            return;

        }



        console.info(

            {

                visitor :

                    state.result.visitor.name,



                action : action,



                timestamp :

                    new Date().toISOString()

            }

        );



        /*
        Future Integration

        Google Analytics

        Google Apps Script

        CRM

        */

    }



    /*=========================================================================
        PUBLIC API
    =========================================================================*/

    return{

        init

    };



})();



/*=============================================================================

    END OF FILE

=============================================================================*/
