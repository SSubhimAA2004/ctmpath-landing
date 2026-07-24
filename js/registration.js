
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
    • Continue Journey

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
        MODULE VARIABLES
    =========================================================================*/


    let registrationForm = null;

    let submitButton = null;

    let isSubmitting = false;





    /*=========================================================================
        INITIALIZE
    =========================================================================*/


    function init(){


        registrationForm =

            document.getElementById(

                'registrationForm'

            );



        submitButton =

            document.getElementById(

                'continueJourney'

            );



        if(

            !registrationForm ||

            !submitButton

        ){

            console.error(

                'Registration form not found.'

            );

            return;

        }



        initializeValidation();



        registrationForm.addEventListener(

            'submit',

            submitForm

        );



        console.log(

            'CTM Registration Ready'

        );

    }





    /*=========================================================================
        INITIALIZE VALIDATION
    =========================================================================*/


    function initializeValidation(){


        const fields =

            registrationForm.querySelectorAll(

                'input'

            );



        fields.forEach(

            function(field){


                field.addEventListener(

                    'blur',

                    function(){

                        validateField(

                            field

                        );

                    }

                );



                field.addEventListener(

                    'input',

                    function(){

                        clearValidation(

                            field

                        );

                    }

                );


            }

        );

    }

                        /*=========================================================================
        SUBMIT FORM
    =========================================================================*/


    async function submitForm(event){


        event.preventDefault();



        if(

            isSubmitting

        ){

            return;

        }



        if(

            !validateForm()

        ){

            return;

        }



        isSubmitting = true;



        setLoadingState(

            true

        );



        try{



            const visitor =

                collectFormData();




            /*--------------------------------------------------
                Register Visitor
            --------------------------------------------------*/


            const response =

                await CTM.api.registerVisitor({

                    emotion:

                        visitor.initialEmotion,

                    name:

                        visitor.fullName,

                    email:

                        visitor.email,

                    mobile:

                        visitor.mobile,

                    district:

                        visitor.district,

                    state:

                        visitor.state,

                    referralSource:

                        'Website',

                    language:

                        'ta',

                    device:

                        visitor.device

                });



            if(

                !response ||

                !response.success

            ){

                throw new Error(

                    response.message ||

                    'Registration failed.'

                );

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

                    visitor.initialEmotion,

                name:

                    visitor.fullName,

                email:

                    visitor.email,

                mobile:

                    visitor.mobile,

                district:

                    visitor.district,

                state:

                    visitor.state,

                language:

                    'ta',

                device:

                    visitor.device

            });



            CTM.storage.setCurrentPage(

                'registration.html'

            );



            CTM.storage.setCompletionStatus(

                'Registered'

            );



            if(

                CTM.storage.getStartTime()

            ){

                CTM.storage.setStartTime(

                    CTM.storage.getStartTime()

                );

            }



            await new Promise(

                function(resolve){

                    setTimeout(

                        resolve,

                        600

                    );

                }

            );



            CTM.router.go(

                'assessment'

            );



        }

        catch(error){



            console.error(

                error

            );



            alert(

                error.message ||

                'Unable to continue your journey.'

            );



            setLoadingState(

                false

            );



            isSubmitting = false;

        }

    }

                        /*=========================================================================
        COLLECT FORM DATA
    =========================================================================*/


    function collectFormData(){


        return{

            initialEmotion:

                CTM.storage.getInitialEmotion(),


            fullName:

                document

                    .getElementById(

                        'fullName'

                    )

                    .value

                    .trim(),


            mobile:

                document

                    .getElementById(

                        'mobile'

                    )

                    .value

                    .trim(),


            email:

                document

                    .getElementById(

                        'email'

                    )

                    .value

                    .trim(),


            district:

                document

                    .getElementById(

                        'district'

                    )

                    .value

                    .trim(),


            state:

                document

                    .getElementById(

                        'state'

                    )

                    .value

                    .trim(),


            device:

                detectDevice()

        };

    }





    /*=========================================================================
        FORM VALIDATION
    =========================================================================*/


    function validateForm(){


        const fields =

            registrationForm.querySelectorAll(

                'input[required]'

            );



        let valid = true;

        let firstInvalid = null;



        fields.forEach(

            function(field){


                if(

                    !validateField(

                        field

                    )

                ){

                    valid = false;



                    if(

                        !firstInvalid

                    ){

                        firstInvalid =

                            field;

                    }

                }


            }

        );



        if(

            firstInvalid

        ){

            firstInvalid.focus();

            firstInvalid.scrollIntoView({

                behavior:'smooth',

                block:'center'

            });

        }



        return valid;

    }





    /*=========================================================================
        VALIDATE FIELD
    =========================================================================*/


    function validateField(field){


        const value =

            field.value.trim();



        if(

            field.hasAttribute(

                'required'

            ) &&

            value === ''

        ){

            showValidation(

                field,

                'This field is required.'

            );

            return false;

        }



        if(

            field.type === 'email' &&

            value !== ''

        ){

            const pattern =

                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



            if(

                !pattern.test(

                    value

                )

            ){

                showValidation(

                    field,

                    'Please enter a valid email address.'

                );

                return false;

            }

        }



        if(

            field.id === 'mobile'

        ){

            const digits =

                value.replace(

                    /\D/g,

                    ''

                );



            if(

                digits.length < 10

            ){

                showValidation(

                    field,

                    'Please enter a valid WhatsApp number.'

                );

                return false;

            }

        }



        clearValidation(

            field

        );



        return true;

    }





    /*=========================================================================
        SHOW VALIDATION
    =========================================================================*/


    function showValidation(

        field,

        message

    ){


        field.classList.add(

            'input-error'

        );



        let feedback =

            field.parentNode.querySelector(

                '.validation-message'

            );



        if(

            !feedback

        ){

            feedback =

                document.createElement(

                    'div'

                );



            feedback.className =

                'validation-message';



            field.parentNode.appendChild(

                feedback

            );

        }



        feedback.textContent =

            message;

    }

                        /*=========================================================================
        CLEAR VALIDATION
    =========================================================================*/


    function clearValidation(field){


        field.classList.remove(

            'input-error'

        );



        const feedback =

            field.parentNode.querySelector(

                '.validation-message'

            );



        if(

            feedback

        ){

            feedback.remove();

        }

    }





    /*=========================================================================
        LOADING STATE
    =========================================================================*/


    function setLoadingState(isLoading){


        const fields =

            registrationForm.querySelectorAll(

                'input, button'

            );



        fields.forEach(

            function(field){

                field.disabled =

                    isLoading;

            }

        );



        if(

            isLoading

        ){

            submitButton.dataset.original =

                submitButton.innerHTML;



            submitButton.innerHTML =

                '<span class="button-ta">உங்கள் பயணம் தயார் செய்யப்படுகிறது...</span>' +

                '<span class="button-en">PREPARING YOUR JOURNEY...</span>';



            submitButton.classList.add(

                'loading'

            );

        }

        else{

            if(

                submitButton.dataset.original

            ){

                submitButton.innerHTML =

                    submitButton.dataset.original;

            }



            submitButton.classList.remove(

                'loading'

            );

        }

    }





    /*=========================================================================
        DEVICE DETECTION
    =========================================================================*/


    function detectDevice(){


        const ua =

            navigator.userAgent.toLowerCase();



        if(

            /mobile|android|iphone|ipad/.test(

                ua

            )

        ){

            return 'Mobile';

        }



        if(

            /tablet/.test(

                ua

            )

        ){

            return 'Tablet';

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
