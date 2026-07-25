
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/registration.js
   Version     : 4.0
   Status      : 🔒 LOCKED
   Architecture: Multi-Page Application (MPA)

   Purpose
   --------------------------------------------------------------------------
   Registration Page Controller

   Responsibilities

   ✓ Initialize Registration Page
   ✓ Validate Registration Form
   ✓ Build Registration Payload
   ✓ Submit Visitor Registration
   ✓ Save Visitor Session
   ✓ Navigate to Assessment Page

   Does NOT

   ✗ Perform Assessment
   ✗ Generate Reports
   ✗ Access Google Sheets Directly
   ✗ Contain Business Logic

========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.Registration = (() => {

    /* ======================================================================
       MODULE STATE
    ====================================================================== */

    let isSubmitting = false;

    /* ======================================================================
       DOM ELEMENTS
    ====================================================================== */

    const elements = {

        form: null,

        continueButton: null,

        backButton: null,

        fullName: null,

        mobile: null,

        email: null,

        district: null,

        state: null,

        language: null,

        source: null

    };

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function initialize() {

        cacheElements();

        bindEvents();

    }

    /* ======================================================================
       CACHE DOM
    ====================================================================== */

    function cacheElements() {

        elements.form =
            document.getElementById("registrationForm");

        elements.continueButton =
            document.getElementById("continueButton");

        elements.backButton =
            document.getElementById("backButton");

        elements.fullName =
            document.getElementById("fullName");

        elements.mobile =
            document.getElementById("mobile");

        elements.email =
            document.getElementById("email");

        elements.district =
            document.getElementById("district");

        elements.state =
            document.getElementById("state");

        elements.language =
            document.getElementById("language");

        elements.source =
            document.getElementById("source");

    }

    /* ======================================================================
       BIND EVENTS
    ====================================================================== */

    function bindEvents() {

        if (elements.form) {

            elements.form.addEventListener(

                "submit",

                handleSubmit

            );

        }

        if (elements.backButton) {

            elements.backButton.addEventListener(

                "click",

                goBack

            );

        }

    }

                               /* ======================================================================
       VALIDATE FORM
    ====================================================================== */

    function validateForm() {

        if (!elements.fullName.value.trim()) {

            alert("Please enter your full name.");

            elements.fullName.focus();

            return false;

        }

        if (!elements.mobile.value.trim()) {

            alert("Please enter your mobile number.");

            elements.mobile.focus();

            return false;

        }

        if (!/^[0-9]{10}$/.test(elements.mobile.value.trim())) {

            alert("Please enter a valid 10-digit mobile number.");

            elements.mobile.focus();

            return false;

        }

        if (!elements.email.value.trim()) {

            alert("Please enter your email address.");

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

            alert("Please enter a valid email address.");

            elements.email.focus();

            return false;

        }

        if (!elements.district.value.trim()) {

            alert("Please select your district.");

            elements.district.focus();

            return false;

        }

        if (!elements.state.value.trim()) {

            alert("Please select your state.");

            elements.state.focus();

            return false;

        }

        return true;

    }

    /* ======================================================================
       BUILD PAYLOAD
    ====================================================================== */

    function buildPayload() {

        return {

            fullName:

                elements.fullName.value.trim(),

            mobile:

                elements.mobile.value.trim(),

            email:

                elements.email.value.trim(),

            district:

                elements.district.value.trim(),

            state:

                elements.state.value.trim(),

            language:

                elements.language
                    ? elements.language.value
                    : "ta",

            source:

                elements.source
                    ? elements.source.value.trim()
                    : "",

            device:

                /Android|iPhone|iPad|Mobile/i.test(

                    navigator.userAgent

                )

                    ? "Mobile"

                    : "Desktop"

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

    }

                               /* ======================================================================
       HANDLE SUBMIT
    ====================================================================== */

    async function handleSubmit(event) {

        event.preventDefault();

        if (isSubmitting) {

            return;

        }

        if (!validateForm()) {

            return;

        }

        setLoading(true);

        try {

            const payload = buildPayload();

            const response = await CTM.API.safeRequest(

                () => CTM.API.registerVisitor(payload)

            );

            if (!response.success) {

                throw new Error(

                    response.message ||

                    "Registration failed."

                );

            }

            const visitor = response.data || {};

            /* ==========================================================
               UPDATE APPLICATION STATE
               ========================================================== */

            if (

                window.CTM.App &&

                typeof window.CTM.App.setVisitor === "function"

            ) {

                window.CTM.App.setVisitor(visitor);

            }

            /* ==========================================================
               SAVE LOCAL SESSION
               ========================================================== */

            if (

                window.StorageService &&

                typeof window.StorageService.saveVisitor === "function"

            ) {

                window.StorageService.saveVisitor(visitor);

            }

            if (

                window.StorageService &&

                typeof window.StorageService.saveSessionState === "function"

            ) {

                window.StorageService.saveSessionState({

                    visitorId:

                        visitor.visitorId,

                    registered: true,

                    registeredAt:

                        new Date().toISOString()

                });

            }

            /* ==========================================================
               NEXT PAGE
               ========================================================== */

            window.location.href =

                "assessment.html";

        }

        catch (error) {

            console.error(

                "[Registration]",

                error

            );

            alert(

                error.message ||

                "Unable to complete registration."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /* ======================================================================
       BACK
    ====================================================================== */

    function goBack() {

        window.location.href =

            "landing.html";

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

        setLoading(false);

    }

    /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        initialize,

        validateForm,

        buildPayload,

        handleSubmit,

        resetForm

    };

})();

/* ==========================================================================
   AUTO INITIALIZATION
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        if (

            window.CTM.Registration &&

            typeof window.CTM.Registration.initialize === "function"

        ) {

            window.CTM.Registration.initialize();

        }

    }

);

/* ==========================================================================
   END OF FILE
========================================================================== */
