
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : js/registration.js
   Version     : 8.0
   Status      : PRODUCTION
   Architecture: LOCKED

   Responsibility
   --------------------------------------------------------------------------
   • Collect Registration (KYC)
   • Validate User Input
   • Build Registration Payload
   • Call CTM.API.registerVisitor()
   • Store Visitor ID
   • Navigate to Screen 02

   This file SHALL NOT

   ✗ Communicate directly with Google Apps Script
   ✗ Call fetch()
   ✗ Know the Web App URL
   ✗ Save directly to Google Sheets
   ✗ Contain Assessment Logic
   ✗ Generate Diagnosis
   ✗ Generate Prescription

========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

window.CTM.Registration = (function () {

    /* ======================================================================
       MODULE STATE
    ====================================================================== */

    let isSubmitting = false;

    /* ======================================================================
       CACHED ELEMENTS
    ====================================================================== */

    const elements = {

        form: null,

        continueButton: null,

        fullName: null,

        email: null,

        mobile: null,

        district: null,

        state: null,

        source: null,

        emotion: null,

        errorBox: null

    };

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function initialize() {

        elements.form =
            document.getElementById("registrationForm");

        elements.continueButton =
            document.getElementById("btnContinue");

        elements.fullName =
            document.getElementById("fullName");

        elements.email =
            document.getElementById("email");

        elements.mobile =
            document.getElementById("mobile");

        elements.district =
            document.getElementById("district");

        elements.state =
            document.getElementById("state");

        elements.source =
            document.getElementById("source");

        elements.emotion =
            document.getElementById("emotion");

        elements.errorBox =
            document.getElementById("registrationError");

        bindEvents();

    }

                               /* ======================================================================
       BIND EVENTS
    ====================================================================== */

    function bindEvents() {

        if (elements.form) {

            elements.form.addEventListener(

                "submit",

                function (event) {

                    event.preventDefault();

                    submitRegistration();

                }

            );

        }

    }

    /* ======================================================================
       VALIDATE
    ====================================================================== */

    function validate() {

        clearError();

        if (!elements.fullName.value.trim()) {

            showError(

                "Please enter your full name."

            );

            elements.fullName.focus();

            return false;

        }

        if (!elements.email.value.trim()) {

            showError(

                "Please enter your email address."

            );

            elements.email.focus();

            return false;

        }

        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (

            !emailPattern.test(

                elements.email.value.trim()

            )

        ) {

            showError(

                "Please enter a valid email address."

            );

            elements.email.focus();

            return false;

        }

        if (!elements.mobile.value.trim()) {

            showError(

                "Please enter your mobile number."

            );

            elements.mobile.focus();

            return false;

        }

        const mobile =

            elements.mobile.value.replace(/\D/g, "");

        if (

            mobile.length < 10

        ) {

            showError(

                "Please enter a valid mobile number."

            );

            elements.mobile.focus();

            return false;

        }

        if (!elements.district.value.trim()) {

            showError(

                "Please select your district."

            );

            elements.district.focus();

            return false;

        }

        if (!elements.state.value.trim()) {

            showError(

                "Please select your state."

            );

            elements.state.focus();

            return false;

        }

        return true;

    }

    /* ======================================================================
       SHOW ERROR
    ====================================================================== */

    function showError(message) {

        if (!elements.errorBox) {

            alert(message);

            return;

        }

        elements.errorBox.textContent =

            message;

        elements.errorBox.style.display =

            "block";

    }

    /* ======================================================================
       CLEAR ERROR
    ====================================================================== */

    function clearError() {

        if (!elements.errorBox) {

            return;

        }

        elements.errorBox.textContent = "";

        elements.errorBox.style.display = "none";

    }

                               /* ======================================================================
       BUILD PAYLOAD
    ====================================================================== */

    function buildPayload() {

        return {

            fullName:

                elements.fullName.value.trim(),

            email:

                elements.email.value.trim(),

            mobile:

                elements.mobile.value.trim(),

            district:

                elements.district.value.trim(),

            state:

                elements.state.value.trim(),

            source:

                elements.source
                    ? elements.source.value.trim()
                    : "",

            language:

                document.documentElement.lang || "en",

            device:

                /Mobi|Android|iPhone|iPad/i.test(

                    navigator.userAgent

                )

                    ? "Mobile"

                    : "Desktop",

            emotion:

                elements.emotion
                    ? elements.emotion.value.trim()
                    : ""

        };

    }

    /* ======================================================================
       LOADING STATE
    ====================================================================== */

    function setLoading(isLoading) {

        isSubmitting = isLoading;

        if (!elements.continueButton) {

            return;

        }

        elements.continueButton.disabled =

            isLoading;

        elements.continueButton.classList.toggle(

            "loading",

            isLoading

        );

        elements.continueButton.textContent =

            isLoading

                ? "Please Wait..."

                : "Continue";

    }

    /* ======================================================================
       SUBMIT REGISTRATION
    ====================================================================== */

    async function submitRegistration() {

        if (isSubmitting) {

            return;

        }

        if (!validate()) {

            return;

        }

        const payload =

            buildPayload();

        setLoading(true);

        clearError();

        const response =

            await CTM.API.safeRequest(

                () =>

                    CTM.API.registerVisitor(

                        payload

                    )

            );

           if (

            response.success &&

            response.data &&

            response.data.visitorId

        ) {

            CTM.state = CTM.state || {};

            CTM.state.visitorId =

                response.data.visitorId;

            CTM.state.registration =

                payload;

            setLoading(false);

            if (

                window.CTM.Router &&

                typeof window.CTM.Router.go === "function"

            ) {

                window.CTM.Router.go(

                    "screen02"

                );

            }

            return;

        }

        setLoading(false);

        showError(

            response.message ||

            "Unable to complete registration."

        );

    }

    /* ======================================================================
       RESET FORM
    ====================================================================== */

    function resetForm() {

        if (

            elements.form &&

            typeof elements.form.reset === "function"

        ) {

            elements.form.reset();

        }

        clearError();

        setLoading(false);

    }

    /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        initialize,

        validate,

        buildPayload,

        submitRegistration,

        resetForm

    };

})();

/* ==========================================================================
   AUTO INITIALIZATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        window.CTM.Registration.initialize();

    }

);

/* ==========================================================================
   END OF FILE
========================================================================== */
