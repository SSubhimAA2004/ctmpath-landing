
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02a.js
 *
 * VERSION:
 * 3.1
 *
 * PAGE:
 * PAGE 02A — INTRODUCTION + KYC
 *
 * STATUS:
 * PRODUCTION CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls the first stage of the Millionaire Lifestyle Scorecard™ journey:
 *
 *      INTRO
 *        ↓
 *      KYC
 *        ↓
 *      VALIDATE
 *        ↓
 *      REGISTER CLIENT
 *        ↓
 *      PRESERVE CLIENT + KYC IN Page02Session
 *        ↓
 *      SET DIMENSION 01
 *        ↓
 *      page02b.html
 *
 * =============================================================================
 *
 * DEPENDENCIES
 *
 *      js/api.js
 *      js/page02/page02-data.js
 *      js/page02/page02-session.js
 *
 * =============================================================================
 *
 * ARCHITECTURAL RULES
 *
 * THIS FILE:
 *
 *      ✓ controls Page 02A only
 *      ✓ controls Intro → KYC
 *      ✓ validates KYC
 *      ✓ calls CTM_API.register()
 *      ✓ stores identity in Page02Session
 *      ✓ stores KYC in Page02Session
 *      ✓ sets Dimension 01
 *      ✓ navigates to Page 02B
 *      ✓ preserves KYC draft
 *      ✓ prevents duplicate submissions
 *      ✓ survives non-critical initialization failures
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ load global header/footer
 *      ✗ contain indicator definitions
 *      ✗ render scorecard questions
 *      ✗ calculate dimension scores
 *      ✗ call CTM_API.saveDiscovery()
 *      ✗ control Page 02B
 *
 * =============================================================================
 */


'use strict';


(function (window, document) {


    /* =========================================================================
     * CONFIGURATION
     * =========================================================================
     */


    const CONFIG = {

        nextPage:
            'page02b.html',

        firstDimension:
            'wealth',

        defaultSource:
            'CTM PATH™ Guided Journey™',

        defaultLanguage:
            'ta',

        loadingTextTamil:
            'பதிவு செய்கிறோம்...',

        loadingTextEnglish:
            'PLEASE WAIT',

        defaultButtonTamil:
            'தொடர்கிறேன்',

        defaultButtonEnglish:
            'CONTINUE →',

        registrationSuccessTamil:
            'பதிவு வெற்றிகரமாக முடிந்தது.',

        genericInitializationError:
            'CTM PATH™ journey could not be initialized.',

        genericRegistrationError:
            'பதிவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'

    };


    /* =========================================================================
     * DOM CONTRACT
     * =========================================================================
     *
     * pages/page02a.html must expose:
     *
     * INTRO
     *
     *      #introScreen
     *      #beginButton
     *
     * KYC
     *
     *      #kycScreen
     *      #kycForm
     *
     *      #fullName
     *      #mobile
     *      #email
     *      #city
     *      #district
     *      #state
     *      #pincode
     *
     *      #kycSubmitButton
     *
     * FEEDBACK
     *
     *      #kycError
     *      #kycSuccess
     *
     * =========================================================================
     */


    const DOM_IDS = {

        introScreen:
            'introScreen',

        beginButton:
            'beginButton',

        kycScreen:
            'kycScreen',

        kycForm:
            'kycForm',

        fullName:
            'fullName',

        mobile:
            'mobile',

        email:
            'email',

        city:
            'city',

        district:
            'district',

        state:
            'state',

        pincode:
            'pincode',

        submitButton:
            'kycSubmitButton',

        error:
            'kycError',

        success:
            'kycSuccess'

    };


    /* =========================================================================
     * STATE
     * =========================================================================
     */


    let isSubmitting =
        false;


    let initialized =
        false;


    let introBound =
        false;


    let formBound =
        false;


    let draftPersistenceBound =
        false;


    /* =========================================================================
     * DOM HELPERS
     * =========================================================================
     */


    function getElement(id) {

        return (
            document.getElementById(id) ||
            null
        );

    }


    function getValue(id) {

        const element =
            getElement(id);


        if (!element) {

            return '';

        }


        return String(
            element.value || ''
        ).trim();

    }


    /* =========================================================================
     * SHOW / HIDE
     * =========================================================================
     */


    function showElement(element) {

        if (!element) {

            return;

        }


        element.hidden =
            false;


        element.removeAttribute(
            'aria-hidden'
        );

    }


    function hideElement(element) {

        if (!element) {

            return;

        }


        element.hidden =
            true;


        element.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    /* =========================================================================
     * SCROLL
     * =========================================================================
     */


    function scrollToTop() {

        try {

            window.scrollTo({

                top: 0,

                left: 0,

                behavior: 'smooth'

            });

        }
        catch (error) {

            window.scrollTo(
                0,
                0
            );

        }

    }


    /* =========================================================================
     * MESSAGE SYSTEM
     * =========================================================================
     */


    function clearMessages() {

        const error =
            getElement(
                DOM_IDS.error
            );


        const success =
            getElement(
                DOM_IDS.success
            );


        if (error) {

            error.textContent =
                '';


            hideElement(
                error
            );

        }


        if (success) {

            success.textContent =
                '';


            hideElement(
                success
            );

        }

    }


    function showError(message) {

        clearMessages();


        const error =
            getElement(
                DOM_IDS.error
            );


        if (error) {

            error.textContent =
                message;


            showElement(
                error
            );

        }


        console.error(
            'CTM PATH™ Page 02A:',
            message
        );

    }


    function showSuccess(message) {

        clearMessages();


        const success =
            getElement(
                DOM_IDS.success
            );


        if (success) {

            success.textContent =
                message;


            showElement(
                success
            );

        }

    }


    /* =========================================================================
     * INTRO → KYC
     * =========================================================================
     */


    function openKyc() {

        const introScreen =
            getElement(
                DOM_IDS.introScreen
            );


        const kycScreen =
            getElement(
                DOM_IDS.kycScreen
            );


        if (!kycScreen) {

            console.error(
                'CTM PATH™ Page 02A: #kycScreen not found.'
            );

            return;

        }


        hideElement(
            introScreen
        );


        showElement(
            kycScreen
        );


        clearMessages();


        scrollToTop();


        window.setTimeout(
            function () {

                const fullName =
                    getElement(
                        DOM_IDS.fullName
                    );


                if (fullName) {

                    try {

                        fullName.focus({
                            preventScroll: true
                        });

                    }
                    catch (error) {

                        fullName.focus();

                    }

                }

            },
            350
        );

    }


    /* =========================================================================
     * RESTORE KYC
     * =========================================================================
     */


    function restoreKyc() {

        if (
            !window.Page02Session ||
            typeof window.Page02Session.getKyc !== 'function'
        ) {

            return;

        }


        let kyc;


        try {

            kyc =
                window.Page02Session.getKyc();

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02A: unable to restore KYC.',
                error
            );

            return;

        }


        if (
            !kyc ||
            typeof kyc !== 'object'
        ) {

            return;

        }


        const fields = {

            fullName:
                kyc.fullName,

            mobile:
                kyc.mobile,

            email:
                kyc.email,

            city:
                kyc.city,

            district:
                kyc.district,

            state:
                kyc.state,

            pincode:
                kyc.pincode

        };


        Object.keys(fields).forEach(
            function (id) {

                const element =
                    getElement(id);


                const value =
                    fields[id];


                if (
                    element &&
                    value !== undefined &&
                    value !== null
                ) {

                    element.value =
                        value;

                }

            }
        );

    }


    /* =========================================================================
     * BUILD KYC
     * =========================================================================
     */


    function buildKyc() {

        return {

            fullName:
                getValue(
                    DOM_IDS.fullName
                ),

            mobile:
                getValue(
                    DOM_IDS.mobile
                ),

            email:
                getValue(
                    DOM_IDS.email
                ),

            city:
                getValue(
                    DOM_IDS.city
                ),

            district:
                getValue(
                    DOM_IDS.district
                ),

            state:
                getValue(
                    DOM_IDS.state
                ),

            pincode:
                getValue(
                    DOM_IDS.pincode
                )

        };

    }


    /* =========================================================================
     * NORMALIZE MOBILE
     * =========================================================================
     */


    function normalizeMobile(value) {

        let mobile =
            String(
                value || ''
            )
            .replace(
                /\D/g,
                ''
            );


        if (
            mobile.length === 12 &&
            mobile.startsWith('91')
        ) {

            mobile =
                mobile.substring(2);

        }


        return mobile;

    }


    /* =========================================================================
     * NORMALIZE EMAIL
     * =========================================================================
     */


    function normalizeEmail(value) {

        return String(
            value || ''
        )
        .trim()
        .toLowerCase();

    }


    /* =========================================================================
     * VALIDATE EMAIL
     * =========================================================================
     */


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );

    }


    /* =========================================================================
     * VALIDATE KYC
     * =========================================================================
     */


    function validateKyc(kyc) {

        if (
            !kyc.fullName ||
            kyc.fullName.length < 2
        ) {

            return {

                valid:
                    false,

                field:
                    DOM_IDS.fullName,

                message:
                    'உங்கள் பெயரை உள்ளிடுங்கள்.'

            };

        }


        const mobile =
            normalizeMobile(
                kyc.mobile
            );


        if (
            !/^[6-9]\d{9}$/.test(
                mobile
            )
        ) {

            return {

                valid:
                    false,

                field:
                    DOM_IDS.mobile,

                message:
                    'சரியான 10 இலக்க WhatsApp / Mobile எண்ணை உள்ளிடுங்கள்.'

            };

        }


        const email =
            normalizeEmail(
                kyc.email
            );


        if (
            !email ||
            !isValidEmail(email)
        ) {

            return {

                valid:
                    false,

                field:
                    DOM_IDS.email,

                message:
                    'சரியான மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்.'

            };

        }


        if (!kyc.district) {

            return {

                valid:
                    false,

                field:
                    DOM_IDS.district,

                message:
                    'உங்கள் மாவட்டத்தை உள்ளிடுங்கள்.'

            };

        }


        if (!kyc.state) {

            return {

                valid:
                    false,

                field:
                    DOM_IDS.state,

                message:
                    'உங்கள் மாநிலத்தை உள்ளிடுங்கள்.'

            };

        }


        if (
            kyc.pincode &&
            !/^\d{6}$/.test(
                kyc.pincode
            )
        ) {

            return {

                valid:
                    false,

                field:
                    DOM_IDS.pincode,

                message:
                    'சரியான 6 இலக்க PIN code-ஐ உள்ளிடுங்கள்.'

            };

        }


        return {

            valid:
                true,

            field:
                null,

            message:
                ''

        };

    }


    /* =========================================================================
     * FOCUS INVALID FIELD
     * =========================================================================
     */


    function focusField(id) {

        const field =
            getElement(id);


        if (!field) {

            return;

        }


        try {

            field.focus({
                preventScroll: true
            });

        }
        catch (error) {

            field.focus();

        }


        if (
            typeof field.scrollIntoView ===
            'function'
        ) {

            field.scrollIntoView({

                behavior:
                    'smooth',

                block:
                    'center'

            });

        }

    }


    /* =========================================================================
     * DEVICE INFORMATION
     * =========================================================================
     */


    function getDeviceType() {

        const width =
            window.innerWidth;


        if (width <= 768) {

            return 'mobile';

        }


        if (width <= 1024) {

            return 'tablet';

        }


        return 'desktop';

    }


    /* =========================================================================
     * REGISTRATION PAYLOAD
     * =========================================================================
     *
     * BACKEND CONTRACT:
     *
     *      fullName
     *      email
     *      mobile
     *      district
     *      state
     *      source
     *      language
     *      device
     *
     * city + pincode remain in Page02Session.
     *
     * =========================================================================
     */


    function buildRegistrationPayload(kyc) {

        return {

            fullName:
                kyc.fullName,

            email:
                normalizeEmail(
                    kyc.email
                ),

            mobile:
                normalizeMobile(
                    kyc.mobile
                ),

            district:
                kyc.district,

            state:
                kyc.state,

            source:
                CONFIG.defaultSource,

            language:
                (
                    document.documentElement.lang ||
                    CONFIG.defaultLanguage
                ),

            device:
                getDeviceType()

        };

    }


    /* =========================================================================
     * SUBMIT BUTTON STATE
     * =========================================================================
     */


    function setSubmitting(submitting) {

        isSubmitting =
            submitting;


        const button =
            getElement(
                DOM_IDS.submitButton
            );


        if (!button) {

            return;

        }


        button.disabled =
            submitting;


        button.setAttribute(
            'aria-busy',
            submitting
                ? 'true'
                : 'false'
        );


        const primary =
            button.querySelector(
                '.button-primary'
            );


        const secondary =
            button.querySelector(
                '.button-secondary'
            );


        if (primary) {

            if (
                !primary.dataset.defaultText
            ) {

                primary.dataset.defaultText =
                    primary.textContent.trim();

            }


            primary.textContent =
                submitting
                    ? CONFIG.loadingTextTamil
                    : (
                        primary.dataset.defaultText ||
                        CONFIG.defaultButtonTamil
                    );

        }


        if (secondary) {

            if (
                !secondary.dataset.defaultText
            ) {

                secondary.dataset.defaultText =
                    secondary.textContent.trim();

            }


            secondary.textContent =
                submitting
                    ? CONFIG.loadingTextEnglish
                    : (
                        secondary.dataset.defaultText ||
                        CONFIG.defaultButtonEnglish
                    );

        }

    }


    /* =========================================================================
     * RESPONSE SUCCESS CHECK
     * =========================================================================
     */


    function registrationSucceeded(response) {

        if (!response) {

            return false;

        }


        if (
            response.success === false ||
            response.ok === false
        ) {

            return false;

        }


        return true;

    }


    /* =========================================================================
     * EXTRACT REGISTRATION DATA
     * =========================================================================
     */


    function getResponseData(response) {

        if (
            response &&
            response.data &&
            typeof response.data === 'object'
        ) {

            return response.data;

        }


        return (
            response &&
            typeof response === 'object'
        )
            ? response
            : {};

    }


    /* =========================================================================
     * EXTRACT CLIENT
     * =========================================================================
     */


    function extractClient(response, kyc) {

        const data =
            getResponseData(
                response
            );


        const nestedClient =
            (
                data.client &&
                typeof data.client === 'object'
            )
                ? data.client
                : {};


        const nestedPerson =
            (
                data.person &&
                typeof data.person === 'object'
            )
                ? data.person
                : {};


        const peopleId =
            data.peopleId ||
            data.peopleID ||
            data.personId ||
            nestedClient.peopleId ||
            nestedClient.peopleID ||
            nestedClient.personId ||
            nestedPerson.peopleId ||
            nestedPerson.peopleID ||
            nestedPerson.personId ||
            data.id ||
            nestedClient.id ||
            nestedPerson.id ||
            null;


        const clientId =
            data.clientId ||
            data.clientID ||
            nestedClient.clientId ||
            nestedClient.clientID ||
            nestedClient.id ||
            peopleId ||
            null;


        return {

            peopleId:
                peopleId,

            clientId:
                clientId,

            fullName:
                kyc.fullName

        };

    }


    /* =========================================================================
     * SAVE KYC LOCALLY
     * =========================================================================
     */


    function preserveKyc(kyc) {

        const normalized = {

            fullName:
                kyc.fullName,

            mobile:
                normalizeMobile(
                    kyc.mobile
                ),

            email:
                normalizeEmail(
                    kyc.email
                ),

            city:
                kyc.city,

            district:
                kyc.district,

            state:
                kyc.state,

            pincode:
                kyc.pincode

        };


        if (
            !window.Page02Session ||
            typeof window.Page02Session.setKyc !== 'function'
        ) {

            throw new Error(
                'Page02Session.setKyc() is unavailable.'
            );

        }


        window.Page02Session.setKyc(
            normalized
        );


        return normalized;

    }


    /* =========================================================================
     * SESSION CAPABILITY CHECK
     * =========================================================================
     */


    function sessionReadyForJourney() {

        return Boolean(

            window.Page02Session &&

            typeof window.Page02Session.setKyc ===
                'function' &&

            typeof window.Page02Session.setClient ===
                'function' &&

            typeof window.Page02Session.getClient ===
                'function' &&

            typeof window.Page02Session.hasRegisteredClient ===
                'function' &&

            typeof window.Page02Session.setCurrentDimension ===
                'function'

        );

    }


    /* =========================================================================
     * API CAPABILITY CHECK
     * =========================================================================
     */


    function registrationApiReady() {

        return Boolean(

            window.CTM_API &&

            typeof window.CTM_API.register ===
                'function'

        );

    }


    /* =========================================================================
     * DIMENSION DATA CAPABILITY CHECK
     * =========================================================================
     */


    function dimensionDataReady() {

        return Boolean(

            window.Page02Data &&

            typeof window.Page02Data.getDimensionById ===
                'function'

        );

    }


    /* =========================================================================
     * VERIFY DIMENSION 01
     * =========================================================================
     */


    function verifyFirstDimension() {

        if (!dimensionDataReady()) {

            return false;

        }


        try {

            return Boolean(
                window.Page02Data.getDimensionById(
                    CONFIG.firstDimension
                )
            );

        }
        catch (error) {

            console.error(
                'CTM PATH™ Page 02A: unable to verify Dimension 01.',
                error
            );

            return false;

        }

    }


    /* =========================================================================
     * NAVIGATE TO DIMENSION 01
     * =========================================================================
     */


    function goToDimensionOne() {

        if (!sessionReadyForJourney()) {

            throw new Error(
                'Page02Session is unavailable.'
            );

        }


        if (!verifyFirstDimension()) {

            throw new Error(
                'Dimension 01 could not be initialized.'
            );

        }


        const result =
            window.Page02Session.setCurrentDimension(
                CONFIG.firstDimension
            );


        /*
         * Some session implementations return a value and some simply mutate
         * state. Only an explicit false is treated as failure.
         */

        if (result === false) {

            throw new Error(
                'Unable to activate Dimension 01.'
            );

        }


        console.info(
            'CTM PATH™ Page 02A → Page 02B:',
            {
                dimension:
                    CONFIG.firstDimension,

                destination:
                    CONFIG.nextPage
            }
        );


        window.location.assign(
            CONFIG.nextPage
        );

    }


    /* =========================================================================
     * REGISTER CLIENT
     * =========================================================================
     */


    async function registerClient(kyc) {

        if (!registrationApiReady()) {

            throw new Error(
                'CTM_API.register() is unavailable.'
            );

        }


        const payload =
            buildRegistrationPayload(
                kyc
            );


        console.info(
            'CTM PATH™ Page 02A registration:',
            {
                fullName:
                    payload.fullName,

                district:
                    payload.district,

                state:
                    payload.state,

                source:
                    payload.source
            }
        );


        const response =
            await window.CTM_API.register(
                payload
            );


        if (
            !registrationSucceeded(
                response
            )
        ) {

            const message =
                (
                    response &&
                    (
                        response.message ||
                        response.error
                    )
                ) ||
                'Registration failed.';


            throw new Error(
                message
            );

        }


        return response;

    }


    /* =========================================================================
     * HANDLE KYC SUBMISSION
     * =========================================================================
     */


    async function handleKycSubmit(event) {

        if (event) {

            event.preventDefault();

        }


        if (isSubmitting) {

            return;

        }


        clearMessages();


        const kyc =
            buildKyc();


        const validation =
            validateKyc(
                kyc
            );


        if (!validation.valid) {

            showError(
                validation.message
            );


            focusField(
                validation.field
            );


            return;

        }


        /*
         * The user must be able to enter the KYC screen even if a network
         * dependency is temporarily unavailable.
         *
         * Submission, however, requires the actual journey infrastructure.
         */


        if (!sessionReadyForJourney()) {

            showError(
                'CTM PATH™ session is unavailable. Please refresh and try again.'
            );

            console.error(
                'CTM PATH™ Page 02A session dependency unavailable.'
            );

            return;

        }


        if (!registrationApiReady()) {

            showError(
                'CTM PATH™ registration service is unavailable. Please refresh and try again.'
            );

            console.error(
                'CTM PATH™ Page 02A registration API unavailable.'
            );

            return;

        }


        if (!verifyFirstDimension()) {

            showError(
                'CTM PATH™ scorecard could not be initialized. Please refresh and try again.'
            );

            console.error(
                'CTM PATH™ Page 02A Dimension 01 unavailable:',
                CONFIG.firstDimension
            );

            return;

        }


        /*
         * PRESERVE BEFORE NETWORK REQUEST
         *
         * If connectivity fails, the visitor should not need to re-enter KYC.
         */


        let normalizedKyc;


        try {

            normalizedKyc =
                preserveKyc(
                    kyc
                );

        }
        catch (error) {

            console.error(
                'CTM PATH™ Page 02A KYC persistence error:',
                error
            );


            showError(
                'உங்கள் விவரங்களை சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
            );


            return;

        }


        setSubmitting(
            true
        );


        try {


            /* -----------------------------------------------------------------
             * ALREADY REGISTERED
             *
             * If the visitor comes Back from Page 02B, do not create another
             * backend registration.
             * -----------------------------------------------------------------
             */


            if (
                window.Page02Session.hasRegisteredClient()
            ) {

                console.info(
                    'CTM PATH™ Page 02A: existing registered client recovered.'
                );


                goToDimensionOne();


                return;

            }


            /* -----------------------------------------------------------------
             * REGISTER
             * -----------------------------------------------------------------
             */


            const response =
                await registerClient(
                    normalizedKyc
                );


            /* -----------------------------------------------------------------
             * PRESERVE CLIENT IDENTITY
             * -----------------------------------------------------------------
             */


            const client =
                extractClient(
                    response,
                    normalizedKyc
                );


            window.Page02Session.setClient(
                client
            );


            /* -----------------------------------------------------------------
             * SUCCESS
             * -----------------------------------------------------------------
             */


            showSuccess(
                CONFIG.registrationSuccessTamil
            );


            console.info(
                'CTM PATH™ Page 02A registration complete:',
                window.Page02Session.getClient()
            );


            /* -----------------------------------------------------------------
             * PAGE 02B
             * -----------------------------------------------------------------
             */


            goToDimensionOne();


        }
        catch (error) {


            console.error(
                'CTM PATH™ Page 02A registration error:',
                error
            );


            showError(
                (
                    error &&
                    error.message
                ) ||
                CONFIG.genericRegistrationError
            );


        }
        finally {


            setSubmitting(
                false
            );


        }

    }


    /* =========================================================================
     * FORM INPUT PERSISTENCE
     * =========================================================================
     */


    function preserveFormDraft() {

        if (draftPersistenceBound) {

            return;

        }


        const form =
            getElement(
                DOM_IDS.kycForm
            );


        if (!form) {

            return;

        }


        form.addEventListener(
            'input',
            function () {

                if (
                    !window.Page02Session ||
                    typeof window.Page02Session.setKyc !==
                        'function'
                ) {

                    return;

                }


                try {

                    window.Page02Session.setKyc(
                        buildKyc()
                    );

                }
                catch (error) {

                    /*
                     * Draft persistence is intentionally non-blocking.
                     *
                     * A local persistence failure must never make the form
                     * unusable.
                     */

                    console.warn(
                        'CTM PATH™ Page 02A: draft persistence skipped.',
                        error
                    );

                }

            }
        );


        draftPersistenceBound =
            true;

    }


    /* =========================================================================
     * BIND INTRO
     * =========================================================================
     */


    function bindIntro() {

        if (introBound) {

            return true;

        }


        const button =
            getElement(
                DOM_IDS.beginButton
            );


        if (!button) {

            console.error(
                'CTM PATH™ Page 02A: #beginButton not found.'
            );


            return false;

        }


        button.addEventListener(
            'click',
            function (event) {

                event.preventDefault();


                openKyc();

            }
        );


        introBound =
            true;


        return true;

    }


    /* =========================================================================
     * BIND FORM
     * =========================================================================
     */


    function bindForm() {

        if (formBound) {

            return true;

        }


        const form =
            getElement(
                DOM_IDS.kycForm
            );


        if (!form) {

            console.error(
                'CTM PATH™ Page 02A: #kycForm not found.'
            );


            return false;

        }


        form.addEventListener(
            'submit',
            handleKycSubmit
        );


        /*
         * Defensive fallback:
         *
         * Current canonical markup uses type="submit".
         * If that markup changes accidentally, the button remains functional.
         */


        const submitButton =
            getElement(
                DOM_IDS.submitButton
            );


        if (
            submitButton &&
            String(
                submitButton.type || ''
            ).toLowerCase() !==
                'submit'
        ) {

            submitButton.addEventListener(
                'click',
                handleKycSubmit
            );

        }


        formBound =
            true;


        return true;

    }


    /* =========================================================================
     * DOM CONTRACT CHECK
     * =========================================================================
     */


    function verifyDomContract() {

        const requiredIds = [

            DOM_IDS.introScreen,

            DOM_IDS.beginButton,

            DOM_IDS.kycScreen,

            DOM_IDS.kycForm,

            DOM_IDS.fullName,

            DOM_IDS.mobile,

            DOM_IDS.email,

            DOM_IDS.city,

            DOM_IDS.district,

            DOM_IDS.state,

            DOM_IDS.pincode,

            DOM_IDS.submitButton,

            DOM_IDS.error,

            DOM_IDS.success

        ];


        const missing =
            requiredIds.filter(
                function (id) {

                    return !getElement(id);

                }
            );


        if (missing.length) {

            console.error(
                'CTM PATH™ Page 02A DOM contract failure:',
                missing
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
     * DEPENDENCY REPORT
     * =========================================================================
     */


    function getDependencyReport() {

        return {

            Page02Data:
                Boolean(
                    window.Page02Data
                ),

            Page02Session:
                Boolean(
                    window.Page02Session
                ),

            CTM_API_register:
                registrationApiReady(),

            firstDimension:
                verifyFirstDimension()

        };

    }


    /* =========================================================================
     * VERIFY JOURNEY DEPENDENCIES
     * =========================================================================
     */


    function verifyJourneyDependencies() {

        const report =
            getDependencyReport();


        const missing =
            [];


        if (!report.Page02Data) {

            missing.push(
                'Page02Data'
            );

        }


        if (!report.Page02Session) {

            missing.push(
                'Page02Session'
            );

        }


        if (!report.CTM_API_register) {

            missing.push(
                'CTM_API.register'
            );

        }


        if (
            report.Page02Data &&
            !report.firstDimension
        ) {

            missing.push(
                'Page02Data:' +
                CONFIG.firstDimension
            );

        }


        if (missing.length) {

            console.error(
                'CTM PATH™ Page 02A journey dependencies unavailable:',
                missing
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
     * INITIAL SCREEN STATE
     * =========================================================================
     */


    function initializeScreens() {

        const introScreen =
            getElement(
                DOM_IDS.introScreen
            );


        const kycScreen =
            getElement(
                DOM_IDS.kycScreen
            );


        if (introScreen) {

            showElement(
                introScreen
            );

        }


        if (kycScreen) {

            hideElement(
                kycScreen
            );

        }

    }


    /* =========================================================================
     * INITIALIZE
     * =========================================================================
     */


    function init() {

        if (initialized) {

            return;

        }


        console.info(
            'CTM PATH™ Page 02A initializing...'
        );


        /*
         * ---------------------------------------------------------------------
         * 1. DOM FIRST
         *
         * Page interaction must be established before checking network/business
         * dependencies.
         *
         * This prevents a missing backend dependency from leaving LET'S BEGIN
         * visibly present but completely dead.
         * ---------------------------------------------------------------------
         */


        if (!verifyDomContract()) {

            console.error(
                'CTM PATH™ Page 02A cannot initialize because its DOM contract is incomplete.'
            );


            return;

        }


        initializeScreens();


        /*
         * ---------------------------------------------------------------------
         * 2. BIND INTRO IMMEDIATELY
         * ---------------------------------------------------------------------
         */


        bindIntro();


        /*
         * ---------------------------------------------------------------------
         * 3. BIND FORM
         * ---------------------------------------------------------------------
         */


        bindForm();


        /*
         * ---------------------------------------------------------------------
         * 4. OPTIONAL SESSION RESTORATION
         *
         * Session restoration is useful but must not prevent the user from
         * entering KYC.
         * ---------------------------------------------------------------------
         */


        try {

            restoreKyc();

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02A KYC restore skipped:',
                error
            );

        }


        /*
         * ---------------------------------------------------------------------
         * 5. OPTIONAL DRAFT PERSISTENCE
         * ---------------------------------------------------------------------
         */


        try {

            preserveFormDraft();

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02A draft persistence unavailable:',
                error
            );

        }


        /*
         * ---------------------------------------------------------------------
         * 6. REPORT JOURNEY DEPENDENCIES
         *
         * IMPORTANT:
         *
         * Missing backend/session dependencies do NOT disable Intro → KYC.
         *
         * They are enforced at the point where submission actually requires
         * them.
         * ---------------------------------------------------------------------
         */


        const journeyReady =
            verifyJourneyDependencies();


        if (!journeyReady) {

            console.warn(
                'CTM PATH™ Page 02A UI is active, but registration dependencies are incomplete.'
            );

        }


        clearMessages();


        initialized =
            true;


        let summary =
            null;


        try {

            if (
                window.Page02Session &&
                typeof window.Page02Session.getSummary ===
                    'function'
            ) {

                summary =
                    window.Page02Session.getSummary();

            }

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02A session summary unavailable.',
                error
            );

        }


        console.info(
            'CTM PATH™ Page 02A ready.',
            {
                journeyReady:
                    journeyReady,

                dependencies:
                    getDependencyReport(),

                session:
                    summary
            }
        );

    }


    /* =========================================================================
     * DOM READY
     * =========================================================================
     */


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            init,
            {
                once: true
            }
        );

    }
    else {

        init();

    }


    /* =========================================================================
     * PUBLIC PAGE CONTROLLER
     *
     * Browser QA helpers:
     *
     *      Page02A.getStatus()
     *      Page02A.openKyc()
     *      Page02A.buildKyc()
     *      Page02A.validateKyc(...)
     *      Page02A.goNext()
     * =========================================================================
     */


    window.Page02A = {

        version:
            '3.1',

        init:
            init,

        openKyc:
            openKyc,

        buildKyc:
            buildKyc,

        validateKyc:
            validateKyc,

        submit:
            handleKycSubmit,

        goNext:
            goToDimensionOne,

        getStatus:
            function () {

                return {

                    initialized:
                        initialized,

                    introBound:
                        introBound,

                    formBound:
                        formBound,

                    draftPersistenceBound:
                        draftPersistenceBound,

                    submitting:
                        isSubmitting,

                    dependencies:
                        getDependencyReport(),

                    destination:
                        CONFIG.nextPage,

                    firstDimension:
                        CONFIG.firstDimension

                };

            }

    };


    /* =========================================================================
     * END
     * =========================================================================
     *
     * REQUIRED SCRIPT ORDER IN pages/page02a.html:
     *
     *      <script src="../js/component-loader.js"></script>
     *
     *      [CTM_COMPONENTS.load()]
     *
     *      <script src="../js/global.js"></script>
     *
     *      <script src="../js/api.js"></script>
     *
     *      <script src="../js/page02/page02-data.js"></script>
     *
     *      <script src="../js/page02/page02-session.js"></script>
     *
     *      <script src="../js/page02/page02a.js"></script>
     *
     * -------------------------------------------------------------------------
     *
     * PAGE 02A JOURNEY:
     *
     *      INTRO
     *        ↓
     *      LET'S BEGIN
     *        ↓
     *      KYC
     *        ↓
     *      VALIDATION
     *        ↓
     *      CTM_API.register()
     *        ↓
     *      Page02Session.setClient()
     *        ↓
     *      Page02Session.setKyc()
     *        ↓
     *      Page02Session.setCurrentDimension('wealth')
     *        ↓
     *      page02b.html
     *
     * =========================================================================
     */


})(window, document);

