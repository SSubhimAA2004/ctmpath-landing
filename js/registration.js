
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : registration.js
   Version     : 2.0
   Status      : 🔒 LOCKED
   Purpose     : Registration Page Controller

                  Owns
                  • Registration Form
                  • Client-side Validation
                  • Visitor Object Creation
                  • Storage
                  • Registration API
                  • Navigation

                  Owns NO
                  • Assessment Logic
                  • Diagnosis
                  • Prescription
   ========================================================================== */

'use strict';

/* ==========================================================================
   REGISTRATION CONTROLLER
   ========================================================================== */

const RegistrationPage = (() => {

    /* ======================================================================
       ELEMENTS
       ====================================================================== */

    let form;

    let fullName;

    let mobile;

    let email;

    let district;

    let state;

    let language;

    let referralSource;

    let privacyConsent;

    let backButton;

    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function cacheDom() {

        form = document.getElementById('registrationForm');

        fullName = document.getElementById('fullName');

        mobile = document.getElementById('mobile');

        email = document.getElementById('email');

        district = document.getElementById('district');

        state = document.getElementById('state');

        language = document.getElementById('language');

        referralSource = document.getElementById('referralSource');

        privacyConsent = document.getElementById('privacyConsent');

        backButton = document.getElementById('backButton');

    }

    /* ======================================================================
       EVENTS
       ====================================================================== */

    function bindEvents() {

        form.addEventListener(

            'submit',

            submitRegistration

        );

        backButton.addEventListener(

            'click',

            () => Router.previous()

        );

    }

    /* ======================================================================
       VALIDATION
       ====================================================================== */

    function validate() {

        if (fullName.value.trim() === '') {

            fullName.focus();

            return false;

        }

        if (mobile.value.trim() === '') {

            mobile.focus();

            return false;

        }

        if (email.value.trim() === '') {

            email.focus();

            return false;

        }

        if (district.value.trim() === '') {

            district.focus();

            return false;

        }

        if (state.value.trim() === '') {

            state.focus();

            return false;

        }

        if (language.value === '') {

            language.focus();

            return false;

        }

        if (!privacyConsent.checked) {

            privacyConsent.focus();

            return false;

        }

        return true;

    }

    /* ======================================================================
       VISITOR OBJECT
       ====================================================================== */

    function buildVisitor() {

        return {

            visitorId:

                crypto.randomUUID(),

            registrationDate:

                new Date().toISOString(),

            fullName:

                fullName.value.trim(),

            mobile:

                mobile.value.trim(),

            email:

                email.value.trim(),

            district:

                district.value.trim(),

            state:

                state.value.trim(),

            language:

                language.value,

            referralSource:

                referralSource.value,

            currentPage:

                'registration',

            completionStatus:

                'REGISTERED'

        };

    }

    /* ======================================================================
       SUBMIT
       ====================================================================== */

    async function submitRegistration(event) {

        event.preventDefault();

        if (!validate()) {

            return;

        }

        const visitor = buildVisitor();

        App.setVisitor(visitor);

        App.setJourneyStatus('REGISTERED');

        const response = await ApiService.safeRequest(

            () => ApiService.registerVisitor(visitor)

        );

        if (!response.success) {

            alert(

                'Unable to save your information.\nPlease try again.'

            );

            return;

        }

        Router.next();

    }

    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function init() {

        cacheDom();

        bindEvents();

        console.info(

            'Registration Page Ready.'

        );

    }

    /* ======================================================================
       PUBLIC
       ====================================================================== */

    return {

        init

    };

})();

/* ==========================================================================
   PAGE LOAD
   ========================================================================== */

document.addEventListener(

    'DOMContentLoaded',

    () => {

        RegistrationPage.init();

    }

);

/* ==========================================================================
   End of File

   File : registration.js

   Status : 🔒 LOCKED
   ========================================================================== */
