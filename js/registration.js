
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/registration.js
   Version     : 8.0
   Status      : PREMIUM LAUNCH EDITION

   Responsibilities

   ✓ Initialize registration page
   ✓ Validate form
   ✓ Toggle "Other" source
   ✓ Submit registration
   ✓ Prevent duplicate submissions
   ✓ Preserve existing API contract
   ✓ Dispatch registration-complete event

========================================================================== */

const Registration = (() => {

    let initialized = false;

    let isSubmitting = false;







    function init(){

        if(initialized){

            return;

        }

        const form = document.getElementById(
            "registration-form"
        );

        if(!form){

            return;

        }

        initialized = true;

        bindSubmit(form);

        bindSourceSelector();

    }







    function bindSubmit(form){

        form.addEventListener(
            "submit",
            handleSubmit
        );

        const button = document.getElementById(
            "continue-registration"
        );

        if(button){

            button.addEventListener(
                "click",
                () => {

                    form.requestSubmit();

                }
            );

        }

    }







    function bindSourceSelector(){

        const source = document.getElementById("source");

        const otherGroup = document.getElementById(
            "other-source-group"
        );

        const otherField = document.getElementById(
            "otherSource"
        );

        if(!source || !otherGroup){

            return;

        }

        source.addEventListener(
            "change",
            () => {

                const show =
                    source.value === "Other";

                otherGroup.style.display =
                    show
                    ? "block"
                    : "none";

                if(otherField){

                    otherField.required = show;

                    if(!show){

                        otherField.value = "";

                    }

                }

            }
        );

    }







    async function handleSubmit(event){

        event.preventDefault();

        if(isSubmitting){

            return;

        }

        const data = collectData();

        const validation = validate(data);

        if(!validation.valid){

            showMessage(validation.message);

            focusField(validation.field);

            return;

        }

        isSubmitting = true;

        setLoading(true);

           try{

            const response =
                await API.registerVisitor(data);

            console.log(
                "Registration success:",
                response
            );

            document.dispatchEvent(

                new CustomEvent(
                    "registration-complete",
                    {
                        detail: response
                    }
                )

            );

        }

        catch(error){

            console.error(
                "Registration error:",
                error
            );

            showMessage(

                error.message ||

                "Unable to complete registration. Please try again."

            );

        }

        finally{

            isSubmitting = false;

            setLoading(false);

        }

    }







    /* ==========================================================
       DATA COLLECTION
    ========================================================== */

    function collectData(){

        const source = value("source");

        const otherSource = value("otherSource");

        return{

            fullName:
                value("fullName"),

            email:
                value("email"),

            mobile:
                value("mobile"),

            district:
                value("district"),

            state:
                value("state"),

            language:
                selectedLanguage(),

            source:
                source === "Other"
                    ? otherSource
                    : source,

            device:
                navigator.userAgent

        };

    }







    function value(id){

        const element =
            document.getElementById(id);

        if(!element){

            return "";

        }

        return element.value.trim();

    }







    function selectedLanguage(){

        const selected = document.querySelector(

            "input[name='language']:checked"

        );

        return selected

            ? selected.value

            : "Tamil";

    }







    /* ==========================================================
       VALIDATION
    ========================================================== */

    function validate(data){

        if(!data.fullName){

            return{

                valid:false,

                field:"fullName",

                message:"Please enter your full name."

            };

        }

        if(!data.email){

            return{

                valid:false,

                field:"email",

                message:"Please enter your email address."

            };

        }

        if(!data.mobile){

            return{

                valid:false,

                field:"mobile",

                message:"Please enter your mobile number."

            };

        }

        if(!data.district){

            return{

                valid:false,

                field:"district",

                message:"Please enter your district."

            };

        }

        if(!data.state){

            return{

                valid:false,

                field:"state",

                message:"Please enter your state."

            };

        }

        if(!data.source){

            return{

                valid:false,

                field:"source",

                message:"Please tell us how you discovered CTM PATH™."

            };

        }

        if(!document.getElementById("consent")?.checked){

            return{

                valid:false,

                field:"consent",

                message:"Please accept the consent statement."

            };

        }

        return{

            valid:true

        };

    }







    function focusField(id){

        const field = document.getElementById(id);

        if(!field){

            return;

        }

        field.focus({

            preventScroll:false

        });

        field.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }







    /* ==========================================================
       UI
    ========================================================== */

    function setLoading(state){

        const button = document.getElementById(

            "continue-registration"

        );

        if(!button){

            return;

        }

        button.disabled = state;

        if(state){

            button.innerHTML = `

                <span class="button-tamil">

                    உங்கள் பயணம் உருவாக்கப்படுகிறது...

                </span>

                <span class="button-english">

                    Creating Your Journey™

                </span>

            `;

            return;

        }

        button.innerHTML = `

            <span class="button-tamil">

                என் வாழ்க்கைப் பயணத்தை தொடர்கிறேன்

            </span>

            <span class="button-english">

                Continue My Guided Journey™

            </span>

        `;

    }







    function showMessage(message){

        alert(message);

    }







    return{

        init

    };

})();







window.Registration = Registration;







document.addEventListener(

    "ctm-page-loaded",

    () => {

        Registration.init();

    }

);

/* ==========================================================
   END OF FILE
========================================================== */
