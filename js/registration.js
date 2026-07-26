
/* ==========================================================================
   CTM PATH™ Guided Journey™
   FROM SURVIVAL TO LIVING™

   File        : js/registration.js
   Version     : 5.0
   Status      : 🔒 PRODUCTION
   Architecture: LOCKED MPA

   Purpose
   --------------------------------------------------------------------------
   Registration Page Controller

   Responsibilities

   ✓ Initialize Registration
   ✓ Validate KYC
   ✓ Build Registration Payload
   ✓ Register Visitor
   ✓ Persist Visitor Session
   ✓ Navigate to Assessment

   Does NOT

   ✗ Perform Assessment
   ✗ Access Google Sheets Directly
   ✗ Perform Business Logic
   ✗ Generate Reports

========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   REGISTRATION MODULE
========================================================================== */

window.CTM.Registration = (() => {

    /* ======================================================================
       MODULE STATE
    ====================================================================== */

    let isSubmitting = false;

    /* ======================================================================
       DOM CACHE
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

        referralSource: null

    };

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function initialize() {

        cacheElements();

        bindEvents();

    }

    /* ======================================================================
       CACHE ELEMENTS
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

        elements.referralSource =
            document.getElementById("referralSource");

    }

    /* ======================================================================
       EVENT BINDING
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
       FIELD VALIDATION
    ====================================================================== */

    function validateRequired(element, message) {

        if (!element) {

            return false;

        }

        const value = element.value.trim();

        if (!value) {

            showError(message);

            element.focus();

            return false;

        }

        return true;

    }

    /* ======================================================================
       MOBILE VALIDATION
    ====================================================================== */

    function validateMobile() {

        const mobile =

            elements.mobile.value.trim();

        if (!/^[0-9]{10}$/.test(mobile)) {

            showError(

                "Please enter a valid 10-digit mobile number."

            );

            elements.mobile.focus();

            return false;

        }

        return true;

    }

    /* ======================================================================
       EMAIL VALIDATION
    ====================================================================== */

    function validateEmail() {

        const email =

            elements.email.value.trim();

        const pattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!pattern.test(email)) {

            showError(

                "Please enter a valid email address."

            );

            elements.email.focus();

            return false;

        }

        return true;

    }

                               /* ======================================================================
       COMPLETE FORM VALIDATION
    ====================================================================== */

    function validateForm() {

        if (

            !validateRequired(

                elements.fullName,

                "Please enter your full name."

            )

        ) {

            return false;

        }

        if (

            !validateRequired(

                elements.mobile,

                "Please enter your mobile number."

            )

        ) {

            return false;

        }

        if (!validateMobile()) {

            return false;

        }

        if (

            !validateRequired(

                elements.email,

                "Please enter your email address."

            )

        ) {

            return false;

        }

        if (!validateEmail()) {

            return false;

        }

        if (

            !validateRequired(

                elements.district,

                "Please enter your district."

            )

        ) {

            return false;

        }

        if (

            !validateRequired(

                elements.state,

                "Please enter your state."

            )

        ) {

            return false;

        }

        if (

            !validateRequired(

                elements.language,

                "Please select your preferred language."

            )

        ) {

            return false;

        }

        if (

            !validateRequired(

                elements.referralSource,

                "Please select your referral source."

            )

        ) {

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

                elements.language.value,

            referralSource:

                elements.referralSource.value,

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
       SHOW ERROR
    ====================================================================== */

    function showError(message) {

        alert(message);

    }

    /* ======================================================================
       SHOW SUCCESS
    ====================================================================== */

    function showSuccess(message) {

        console.log(message);

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

        const payload = buildPayload();

        try {

            const response =

                await CTM.API.safeRequest(

                    () =>

                        CTM.API.registerVisitor(

                            payload

                        )

                );

            if (

                !response ||

                !response.success

            ) {

                throw new Error(

                    response.message ||

                    "Registration failed."

                );

            }

            const visitor =

                response.data || {};

                   /* ==========================================================
               UPDATE APPLICATION STATE
            ========================================================== */

            if (

                window.CTM.App &&

                typeof window.CTM.App.setVisitor === "function"

            ) {

                window.CTM.App.setVisitor(

                    visitor

                );

            }

            /* ==========================================================
               SAVE VISITOR
            ========================================================== */

            if (

                window.StorageService &&

                typeof window.StorageService.saveVisitor === "function"

            ) {

                window.StorageService.saveVisitor(

                    visitor

                );

            }

            /* ==========================================================
               SAVE SESSION
            ========================================================== */

            if (

                window.StorageService &&

                typeof window.StorageService.saveSessionState === "function"

            ) {

                window.StorageService.saveSessionState({

                    visitorId:

                        visitor.visitorId ||

                        null,

                    fullName:

                        payload.fullName,

                    registered: true,

                    registeredAt:

                        new Date().toISOString()

                });

            }

            /* ==========================================================
               SAVE CURRENT PAGE
            ========================================================== */

            if (

                window.StorageService &&

                typeof window.StorageService.saveCurrentPage === "function"

            ) {

                window.StorageService.saveCurrentPage(

                    "assessment"

                );

            }

            /* ==========================================================
               SUCCESS
            ========================================================== */

            showSuccess(

                "Registration completed successfully."

            );

            /* ==========================================================
               NAVIGATE
            ========================================================== */

            window.location.href =

                "assessment.html";

        }

        catch (error) {

            console.error(

                "[CTM Registration]",

                error

            );

            showError(

                error.message ||

                "Unable to complete registration."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /* ======================================================================
       GO BACK
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
