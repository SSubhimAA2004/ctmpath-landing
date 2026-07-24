
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    registration.js

    PURPOSE

    Screen 02 Controller

    RESPONSIBILITIES

    • Validate Registration Form
    • Register Visitor
    • Save Visitor Session
    • Navigate To Assessment

    NOTE

    This file controls only

    Screen 02 behaviour.

=============================================================================*/


'use strict';





/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};





/*=============================================================================
    REGISTRATION MODULE
=============================================================================*/


CTM.registration = (function(){





    /*=========================================================================
        INITIALIZE
    =========================================================================*/


    function init(){


        const form =

            document.getElementById(

                'registrationForm'

            );



        if(!form){

            console.warn(

                'Registration form not found.'

            );

            return;

        }



        form.addEventListener(

            'submit',

            submitForm

        );



        console.log(

            'CTM Registration Ready'

        );

    }





    /*=========================================================================
        SUBMIT FORM
    =========================================================================*/


    async function submitForm(event){


        event.preventDefault();



        const fullName =

            document

                .getElementById(

                    'fullName'

                )

                .value

                .trim();



        const mobile =

            document

                .getElementById(

                    'mobile'

                )

                .value

                .trim();



        const email =

            document

                .getElementById(

                    'email'

                )

                .value

                .trim();



        const district =

            document

                .getElementById(

                    'district'

                )

                .value

                .trim();



        const state =

            document

                .getElementById(

                    'state'

                )

                .value

                .trim();



        if(

            !fullName ||

            !mobile ||

            !district ||

            !state

        ){

            alert(

                'Please complete all required fields.'

            );

            return;

        }



        const emotion =

            CTM.storage

                .getInitialEmotion();



        const startTime =

            CTM.storage

                .getStartTime();



        const device =

            detectDevice();

        /*--------------------------------------------------
            Register Visitor
        --------------------------------------------------*/


        const response =

            await CTM.api.registerVisitor({

                emotion:

                    emotion,

                name:

                    fullName,

                email:

                    email,

                mobile:

                    mobile,

                district:

                    district,

                state:

                    state,

                referralSource:

                    'Website',

                language:

                    'ta',

                device:

                    device

            });



        if(

            !response ||

            !response.success

        ){

            alert(

                response.message ||

                'Unable to register your journey.'

            );

            return;

        }



        /*--------------------------------------------------
            Save Visitor Session
        --------------------------------------------------*/


        CTM.storage.setVisitorId(

            response.visitorId

        );



        CTM.storage.updateVisitor({

            visitorId:

                response.visitorId,

            initialEmotion:

                emotion,

            name:

                fullName,

            email:

                email,

            mobile:

                mobile,

            district:

                district,

            state:

                state,

            language:

                'ta',

            device:

                device

        });



        CTM.storage.setCurrentPage(

            'registration.html'

        );



        CTM.storage.setCompletionStatus(

            'Registered'

        );



        if(startTime){

            CTM.storage.setStartTime(

                startTime

            );

        }



        /*--------------------------------------------------
            Navigate To Assessment
        --------------------------------------------------*/


        CTM.router.go(

            'assessment'

        );

    }





    /*=========================================================================
        DEVICE DETECTION
    =========================================================================*/


    function detectDevice(){

        const userAgent =

            navigator.userAgent

                .toLowerCase();



        if(

            /mobile|android|iphone|ipad/.test(

                userAgent

            )

        ){

            return 'Mobile';

        }



        return 'Desktop';

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

        CTM.registration.init();

    }

);





/*=============================================================================

    END OF FILE

=============================================================================*/
