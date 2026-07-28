
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : registration.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 2 — REGISTRATION™

   Purpose     :
   Registration page interaction controller.

   Responsibilities:

   • Initialize registration form.
   • Capture user input.
   • Validate required fields.
   • Submit registration payload.
   • Handle backend response.
   • Move visitor into assessment journey.

   Does NOT:

   • Create database records directly.
   • Generate visitor IDs.
   • Apply business rules.
   • Manage assessment scoring.

   Backend Ownership:

   • Visitor creation
   • Data persistence
   • Workflow management

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   REGISTRATION CONTROLLER
   ========================================================================== */


CTMPATH.Registration = {


    version:

        "1.0",



    initialized:

        false,



    form:

        null



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Registration.init = function() {


    if (

        CTMPATH.Registration.initialized

    ) {


        return;



    }



    CTMPATH.Registration.form = document.getElementById(

        "registration-form"

    );



    CTMPATH.Registration.bindEvents();



    CTMPATH.Registration.initialized = true;



};




/* ==========================================================================
   EVENT BINDING
   ========================================================================== */


CTMPATH.Registration.bindEvents = function() {


    if (

        !CTMPATH.Registration.form

    ) {


        return;



    }



    CTMPATH.Registration.form.addEventListener(

        "submit",

        function(event) {


            event.preventDefault();



            CTMPATH.Registration.submit();



        }

    );



    const backButton = document.getElementById(

        "registration-back-btn"

    );



    if (backButton) {


        backButton.addEventListener(

            "click",

            function() {


                CTMPATH.Navigation.previous();



            }

        );


    }



};




/* ==========================================================================
   COLLECT FORM DATA

   Presentation layer extraction only.

   ========================================================================== */


CTMPATH.Registration.collectData = function() {


    const formData = new FormData(

        CTMPATH.Registration.form

    );



    return {


        fullName:

            formData.get(

                "fullName"

            ),



        email:

            formData.get(

                "email"

            ),



        mobile:

            formData.get(

                "mobile"

            ),



        city:

            formData.get(

                "city"

            ),



        district:

            formData.get(

                "district"

            ),



        state:

            formData.get(

                "state"

            ),



        source:

            formData.get(

                "source"

            ),



        language:

            formData.get(

                "language"

            )



    };


};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : registration.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   FRONTEND VALIDATION

   Validates input completeness only.

   Backend remains final authority.

   ========================================================================== */


CTMPATH.Registration.validate = function(data) {


    const requiredFields = [


        "fullName",

        "email",

        "mobile",

        "city",

        "district",

        "state",

        "source",

        "language"



    ];



    for (

        let i = 0;

        i < requiredFields.length;

        i++

    ) {


        const field = requiredFields[i];



        if (

            !data[field]

        ) {


            return {


                valid:

                    false,



                field:

                    field



            };


        }



    }



    return {


        valid:

            true



    };



};




/* ==========================================================================
   SUBMIT REGISTRATION

   Sends registration request through API layer.

   Backend creates visitor record.

   ========================================================================== */


CTMPATH.Registration.submit = async function() {


    const data =

        CTMPATH.Registration.collectData();



    const validation =

        CTMPATH.Registration.validate(

            data

        );



    if (

        !validation.valid

    ) {


        CTMPATH.Registration.showError(

            validation.field

        );



        return false;



    }



    try {


        CTMPATH.App.showLoader();



        const response = await CTMPATH.API.registerVisitor(

            data

        );



        if (

            response &&

            response.success !== false

        ) {


            CTMPATH.Registration.handleSuccess(

                response

            );



        }


        else {


            CTMPATH.Registration.showMessage(

                response.message ||

                "Registration failed."

            );



        }



    }


    catch(error) {


        CTMPATH.Registration.showMessage(

            error.message

        );



    }


    finally {


        CTMPATH.App.hideLoader();



    }



};




/* ==========================================================================
   SUCCESS HANDLER

   Stores backend visitor reference.

   ========================================================================== */


CTMPATH.Registration.handleSuccess = function(response) {


    if (

        response.visitorId &&

        CTMPATH.Storage

    ) {


        CTMPATH.Storage.setVisitorId(

            response.visitorId

        );



    }



    CTMPATH.Navigation.goto(

        3

    );



};




/* ==========================================================================
   DISPLAY ERROR

   Controlled frontend feedback.

   ========================================================================== */


CTMPATH.Registration.showError = function(field) {


    const element = document.getElementById(

        field

    );



    if (element) {


        element.focus();



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : registration.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   MESSAGE DISPLAY

   Provides controlled user feedback.

   ========================================================================== */


CTMPATH.Registration.showMessage = function(message) {


    const container = document.getElementById(

        "error-container"

    );



    if (!container) {


        return;



    }



    container.textContent = message;



    container.classList.remove(

        "hidden"

    );



};




/* ==========================================================================
   RESET FORM

   Clears current registration input.

   ========================================================================== */


CTMPATH.Registration.reset = function() {


    if (

        CTMPATH.Registration.form

    ) {


        CTMPATH.Registration.form.reset();



    }



};




/* ==========================================================================
   PAGE ACTIVATION HANDLER

   Called when registration page loads.

   ========================================================================== */


CTMPATH.Registration.activate = function() {


    CTMPATH.Registration.init();



};




/* ==========================================================================
   PAGE LOADED EVENT LISTENER

   Navigation dispatches:

   CTMPATH_PAGE_LOADED

   ========================================================================== */


document.addEventListener(

    "CTMPATH_PAGE_LOADED",

    function(event) {


        if (

            event.detail &&

            event.detail.page === 2

        ) {


            CTMPATH.Registration.activate();



        }



    }

);




/* ==========================================================================
   DIRECT PAGE LOAD SUPPORT

   Handles standalone loading.

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function() {


        const page = document.getElementById(

            "registration-page"

        );



        if (page) {


            CTMPATH.Registration.activate();



        }



    }

);




/* ==========================================================================
   END OF FILE

   File:

   js/registration.js


   Status:

   STAGE 2 — REGISTRATION™ CONTROLLER COMPLETE


   Next:

   STAGE 3 — ASSESSMENT 01

   ========================================================================== */
