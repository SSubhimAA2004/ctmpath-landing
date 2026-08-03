
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02a.js
 *
 * VERSION:
 * 4.0
 *
 * PAGE:
 * PAGE 02A — INTRODUCTION + ABOUT YOU™ KYC
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls Page 02A only:
 *
 *      • Scorecard introduction
 *      • LET'S BEGIN transition
 *      • Expanded 16-field KYC
 *      • KYC restoration
 *      • Client-side validation
 *      • Backend registration
 *      • Client identity preservation
 *      • Page 02 session preservation
 *      • Dimension 01 activation
 *      • Navigation to page02b.html
 *
 * =============================================================================
 *
 * IMPORTANT TRANSACTION
 *
 * BEGIN MY SCORECARD™
 *
 *      Validate KYC
 *          ↓
 *      Preserve KYC locally
 *          ↓
 *      CTM_API.register()
 *          ↓
 *      Confirm backend registration
 *          ↓
 *      Preserve returned client identity
 *          ↓
 *      Set current dimension = wealth
 *          ↓
 *      Navigate to page02b.html
 *
 * NEVER navigate to Page 02B if backend registration fails.
 *
 * =============================================================================
 */

'use strict';


(function (window, document) {


    /* =========================================================================
     * CONSTANTS
     * ========================================================================= */


    const PAGE02A = {

        version:
            '4.0',

        nextPage:
            'page02b.html',

        firstDimension:
            'wealth',

        submitting:
            false

    };


    /* =========================================================================
     * DOM REFERENCES
     * ========================================================================= */


    const DOM = {

        introScreen:
            null,

        kycScreen:
            null,

        beginButton:
            null,

        kycForm:
            null,

        submitButton:
            null,

        error:
            null,

        success:
            null

    };


    /* =========================================================================
     * REQUIRED FIELD DEFINITIONS
     * ========================================================================= */


    const FIELD_IDS = [

        'fullName',
        'mobile',
        'email',
        'age',

        'occupation',
        'employerBusiness',
        'dependents',

        'city',
        'district',
        'state',
        'country',
        'pincode',

        'source'

    ];


    const RADIO_FIELDS = [

        'gender',
        'maritalStatus',
        'preferredLanguage'

    ];


    /* =========================================================================
     * UTILITY — SAFE STRING
     * ========================================================================= */


    function cleanString(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return '';

        }


        return String(value).trim();

    }


    /* =========================================================================
     * UTILITY — GET ELEMENT
     * ========================================================================= */


    function getElement(id) {

        return document.getElementById(id);

    }


    /* =========================================================================
     * CACHE DOM
     * ========================================================================= */


    function cacheDom() {

        DOM.introScreen =
            getElement('introScreen');


        DOM.kycScreen =
            getElement('kycScreen');


        DOM.beginButton =
            getElement('beginButton');


        DOM.kycForm =
            getElement('kycForm');


        DOM.submitButton =
            getElement('kycSubmitButton');


        DOM.error =
            getElement('kycError');


        DOM.success =
            getElement('kycSuccess');

    }


    /* =========================================================================
     * DOM CONTRACT CHECK
     * ========================================================================= */


    function validateDomContract() {

        const required = {

            introScreen:
                DOM.introScreen,

            kycScreen:
                DOM.kycScreen,

            beginButton:
                DOM.beginButton,

            kycForm:
                DOM.kycForm,

            submitButton:
                DOM.submitButton,

            kycError:
                DOM.error,

            kycSuccess:
                DOM.success

        };


        const missing = [];


        Object.keys(required).forEach(
            function (key) {

                if (
                    !required[key]
                ) {

                    missing.push(key);

                }

            }
        );


        FIELD_IDS.forEach(
            function (id) {

                if (
                    !getElement(id)
                ) {

                    missing.push(id);

                }

            }
        );


        RADIO_FIELDS.forEach(
            function (name) {

                if (
                    !document.querySelector(
                        'input[name="' +
                        name +
                        '"]'
                    )
                ) {

                    missing.push(name);

                }

            }
        );


        if (
            missing.length
        ) {

            console.error(
                'CTM PATH™ Page 02A DOM contract failure:',
                missing
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
     * SESSION AVAILABILITY
     * ========================================================================= */


    function hasSessionApi() {

        return Boolean(

            window.Page02Session &&

            typeof window.Page02Session.setKyc ===
                'function' &&

            typeof window.Page02Session.setClient ===
                'function' &&

            typeof window.Page02Session.setCurrentDimension ===
                'function'

        );

    }


    /* =========================================================================
     * API AVAILABILITY
     * ========================================================================= */


    function hasRegistrationApi() {

        return Boolean(

            window.CTM_API &&

            typeof window.CTM_API.register ===
                'function'

        );

    }


    /* =========================================================================
     * FEEDBACK
     * ========================================================================= */


    function clearFeedback() {

        if (
            DOM.error
        ) {

            DOM.error.textContent =
                '';

            DOM.error.hidden =
                true;

        }


        if (
            DOM.success
        ) {

            DOM.success.textContent =
                '';

            DOM.success.hidden =
                true;

        }

    }


    function showError(message) {

        if (
            !DOM.error
        ) {

            return;

        }


        DOM.error.textContent =
            cleanString(message) ||
            'Unable to continue. Please check your details and try again.';


        DOM.error.hidden =
            false;


        if (
            DOM.success
        ) {

            DOM.success.hidden =
                true;

        }


        try {

            DOM.error.scrollIntoView({

                behavior:
                    'smooth',

                block:
                    'center'

            });

        }
        catch (error) {

            /* Non-critical UI enhancement. */

        }

    }


    function showSuccess(message) {

        if (
            !DOM.success
        ) {

            return;

        }


        DOM.success.textContent =
            cleanString(message);


        DOM.success.hidden =
            false;


        if (
            DOM.error
        ) {

            DOM.error.hidden =
                true;

        }

    }


    /* =========================================================================
     * SCREEN CONTROL
     * ========================================================================= */


    function showIntro() {

        if (
            DOM.introScreen
        ) {

            DOM.introScreen.hidden =
                false;

            DOM.introScreen.setAttribute(
                'aria-hidden',
                'false'
            );

        }


        if (
            DOM.kycScreen
        ) {

            DOM.kycScreen.hidden =
                true;

            DOM.kycScreen.setAttribute(
                'aria-hidden',
                'true'
            );

        }

    }


    function showKyc() {

        if (
            DOM.introScreen
        ) {

            DOM.introScreen.hidden =
                true;

            DOM.introScreen.setAttribute(
                'aria-hidden',
                'true'
            );

        }


        if (
            DOM.kycScreen
        ) {

            DOM.kycScreen.hidden =
                false;

            DOM.kycScreen.setAttribute(
                'aria-hidden',
                'false'
            );

        }


        clearFeedback();


        window.requestAnimationFrame(
            function () {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        'smooth'

                });

            }
        );

    }


    /* =========================================================================
     * GET RADIO VALUE
     * ========================================================================= */


    function getRadioValue(name) {

        const selected =
            document.querySelector(
                'input[name="' +
                name +
                '"]:checked'
            );


        return selected
            ? cleanString(selected.value)
            : '';

    }


    /* =========================================================================
     * SET RADIO VALUE
     * ========================================================================= */


    function setRadioValue(
        name,
        value
    ) {

        value =
            cleanString(value);


        if (
            !value
        ) {

            return;

        }


        const options =
            document.querySelectorAll(
                'input[name="' +
                name +
                '"]'
            );


        options.forEach(
            function (option) {

                option.checked =
                    cleanString(option.value) ===
                    value;

            }
        );

    }


    /* =========================================================================
     * READ KYC
     * ========================================================================= */


    function readKyc() {

        return {

            fullName:
                cleanString(
                    getElement('fullName').value
                ),

            mobile:
                cleanString(
                    getElement('mobile').value
                ),

            email:
                cleanString(
                    getElement('email').value
                ),

            age:
                cleanString(
                    getElement('age').value
                ),

            gender:
                getRadioValue(
                    'gender'
                ),

            occupation:
                cleanString(
                    getElement('occupation').value
                ),

            employerBusiness:
                cleanString(
                    getElement('employerBusiness').value
                ),

            maritalStatus:
                getRadioValue(
                    'maritalStatus'
                ),

            dependents:
                cleanString(
                    getElement('dependents').value
                ),

            city:
                cleanString(
                    getElement('city').value
                ),

            district:
                cleanString(
                    getElement('district').value
                ),

            state:
                cleanString(
                    getElement('state').value
                ),

            country:
                cleanString(
                    getElement('country').value
                ),

            pincode:
                cleanString(
                    getElement('pincode').value
                ),

            preferredLanguage:
                getRadioValue(
                    'preferredLanguage'
                ),

            source:
                cleanString(
                    getElement('source').value
                )

        };

    }


    /* =========================================================================
     * WRITE KYC
     * ========================================================================= */


    function writeKyc(kyc) {

        if (
            !kyc ||
            typeof kyc !== 'object'
        ) {

            return;

        }


        FIELD_IDS.forEach(
            function (id) {

                const element =
                    getElement(id);


                if (
                    !element
                ) {

                    return;

                }


                if (
                    kyc[id] !== undefined &&
                    kyc[id] !== null
                ) {

                    element.value =
                        cleanString(
                            kyc[id]
                        );

                }

            }
        );


        setRadioValue(
            'gender',
            kyc.gender
        );


        setRadioValue(
            'maritalStatus',
            kyc.maritalStatus
        );


        setRadioValue(
            'preferredLanguage',
            kyc.preferredLanguage
        );

    }


    /* =========================================================================
     * RESTORE EXISTING KYC
     * ========================================================================= */


    function restoreKyc() {

        if (
            !hasSessionApi() ||
            typeof window.Page02Session.getKyc !==
                'function'
        ) {

            return;

        }


        try {

            const kyc =
                window.Page02Session.getKyc();


            writeKyc(
                kyc
            );

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02A KYC restoration failed:',
                error
            );

        }

    }


    /* =========================================================================
     * VALIDATION HELPERS
     * ========================================================================= */


    function markInvalid(element) {

        if (
            element
        ) {

            element.setAttribute(
                'aria-invalid',
                'true'
            );

        }

    }


    function clearInvalidState() {

        const invalid =
            DOM.kycForm.querySelectorAll(
                '[aria-invalid="true"]'
            );


        invalid.forEach(
            function (element) {

                element.removeAttribute(
                    'aria-invalid'
                );

            }
        );

    }


    function focusField(element) {

        if (
            !element
        ) {

            return;

        }


        try {

            element.focus({

                preventScroll:
                    true

            });

        }
        catch (error) {

            element.focus();

        }


        try {

            element.scrollIntoView({

                behavior:
                    'smooth',

                block:
                    'center'

            });

        }
        catch (error) {

            /* Non-critical. */

        }

    }


    /* =========================================================================
     * VALIDATE KYC
     * ========================================================================= */


    function validateKyc(kyc) {

        clearInvalidState();


        /* ---------------------------------------------------------------------
         * FULL NAME
         * ------------------------------------------------------------------ */


        if (
            kyc.fullName.length < 2
        ) {

            const element =
                getElement('fullName');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your full name.'

            };

        }


        /* ---------------------------------------------------------------------
         * MOBILE
         * ------------------------------------------------------------------ */


        const mobileDigits =
            kyc.mobile.replace(
                /\D/g,
                ''
            );


        if (
            mobileDigits.length < 10 ||
            mobileDigits.length > 15
        ) {

            const element =
                getElement('mobile');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter a valid mobile number.'

            };

        }


        /* ---------------------------------------------------------------------
         * EMAIL
         * ------------------------------------------------------------------ */


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                kyc.email
            )
        ) {

            const element =
                getElement('email');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter a valid email address.'

            };

        }


        /* ---------------------------------------------------------------------
         * AGE
         * ------------------------------------------------------------------ */


        const age =
            Number(
                kyc.age
            );


        if (
            !Number.isInteger(age) ||
            age < 18 ||
            age > 100
        ) {

            const element =
                getElement('age');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter a valid age between 18 and 100.'

            };

        }


        /* ---------------------------------------------------------------------
         * GENDER
         * ------------------------------------------------------------------ */


        if (
            !kyc.gender
        ) {

            const element =
                document.querySelector(
                    'input[name="gender"]'
                );


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please select your gender.'

            };

        }


        /* ---------------------------------------------------------------------
         * OCCUPATION
         * ------------------------------------------------------------------ */


        if (
            kyc.occupation.length < 2
        ) {

            const element =
                getElement('occupation');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your occupation.'

            };

        }


        /* ---------------------------------------------------------------------
         * EMPLOYER / BUSINESS
         * ------------------------------------------------------------------ */


        if (
            kyc.employerBusiness.length < 2
        ) {

            const element =
                getElement('employerBusiness');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your employer or business.'

            };

        }


        /* ---------------------------------------------------------------------
         * MARITAL STATUS
         * ------------------------------------------------------------------ */


        if (
            !kyc.maritalStatus
        ) {

            const element =
                document.querySelector(
                    'input[name="maritalStatus"]'
                );


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please select your marital status.'

            };

        }


        /* ---------------------------------------------------------------------
         * DEPENDENTS
         *
         * IMPORTANT:
         * "0" is a valid mandatory selection.
         * ------------------------------------------------------------------ */


        if (
            kyc.dependents === ''
        ) {

            const element =
                getElement('dependents');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please select the number of dependents.'

            };

        }


        /* ---------------------------------------------------------------------
         * CITY
         * ------------------------------------------------------------------ */


        if (
            kyc.city.length < 2
        ) {

            const element =
                getElement('city');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your city.'

            };

        }


        /* ---------------------------------------------------------------------
         * DISTRICT
         * ------------------------------------------------------------------ */


        if (
            kyc.district.length < 2
        ) {

            const element =
                getElement('district');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your district.'

            };

        }


        /* ---------------------------------------------------------------------
         * STATE
         * ------------------------------------------------------------------ */


        if (
            kyc.state.length < 2
        ) {

            const element =
                getElement('state');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your state.'

            };

        }


        /* ---------------------------------------------------------------------
         * COUNTRY
         * ------------------------------------------------------------------ */


        if (
            !kyc.country
        ) {

            const element =
                getElement('country');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please select your country.'

            };

        }


        /* ---------------------------------------------------------------------
         * PINCODE
         *
         * Current Page 02A country selector defaults to India.
         * India therefore requires a six-digit pincode.
         * ------------------------------------------------------------------ */


        if (
            kyc.country === 'India' &&
            !/^[0-9]{6}$/.test(
                kyc.pincode
            )
        ) {

            const element =
                getElement('pincode');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter a valid 6-digit pincode.'

            };

        }


        if (
            kyc.country !== 'India' &&
            !kyc.pincode
        ) {

            const element =
                getElement('pincode');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please enter your postal code.'

            };

        }


        /* ---------------------------------------------------------------------
         * PREFERRED LANGUAGE
         * ------------------------------------------------------------------ */


        if (
            !kyc.preferredLanguage
        ) {

            const element =
                document.querySelector(
                    'input[name="preferredLanguage"]'
                );


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please select your preferred language.'

            };

        }


        /* ---------------------------------------------------------------------
         * SOURCE
         * ------------------------------------------------------------------ */


        if (
            !kyc.source
        ) {

            const element =
                getElement('source');


            markInvalid(element);


            return {

                valid:
                    false,

                element:
                    element,

                message:
                    'Please tell us how you heard about CTM PATH MILLIONAIRES.'

            };

        }


        return {

            valid:
                true,

            element:
                null,

            message:
                ''

        };

    }


    /* =========================================================================
     * NORMALIZE MOBILE FOR BACKEND
     * ========================================================================= */


    function normalizeMobile(value) {

        return cleanString(value)
            .replace(
                /\s+/g,
                ''
            );

    }


    /* =========================================================================
     * BUILD REGISTRATION PAYLOAD
     *
     * IMPORTANT
     *
     * The expanded KYC fields are included here.
     *
     * api.js / backend must subsequently be verified to ensure these fields
     * are forwarded to Google Apps Script and written to Google Sheets.
     * ========================================================================= */


    function buildRegistrationPayload(kyc) {

        return {

            /* -----------------------------------------------------------------
             * CANONICAL CORE REGISTRATION FIELDS
             * ----------------------------------------------------------------- */

            fullName:
                kyc.fullName,

            mobile:
                normalizeMobile(
                    kyc.mobile
                ),

            email:
                kyc.email,

            city:
                kyc.city,

            district:
                kyc.district,

            state:
                kyc.state,

            pincode:
                kyc.pincode,

            source:
                kyc.source,


            /* -----------------------------------------------------------------
             * EXPANDED PAGE 02A KYC
             * ----------------------------------------------------------------- */

            age:
                Number(
                    kyc.age
                ),

            gender:
                kyc.gender,

            occupation:
                kyc.occupation,

            employerBusiness:
                kyc.employerBusiness,

            maritalStatus:
                kyc.maritalStatus,

            dependents:
                kyc.dependents,

            country:
                kyc.country,

            preferredLanguage:
                kyc.preferredLanguage,


            /* -----------------------------------------------------------------
             * JOURNEY METADATA
             * ----------------------------------------------------------------- */

            language:
                kyc.preferredLanguage,

            page:
                2,

            journey:
                'Millionaire Lifestyle Scorecard™',

            device:
                getDeviceType()

        };

    }


    /* =========================================================================
     * DEVICE TYPE
     * ========================================================================= */


    function getDeviceType() {

        const width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            0;


        if (
            width <= 767
        ) {

            return 'mobile';

        }


        if (
            width <= 1100
        ) {

            return 'tablet';

        }


        return 'desktop';

    }


    /* =========================================================================
     * SUBMIT STATE
     * ========================================================================= */


    function setSubmitting(isSubmitting) {

        PAGE02A.submitting =
            Boolean(
                isSubmitting
            );


        if (
            !DOM.submitButton
        ) {

            return;

        }


        DOM.submitButton.disabled =
            PAGE02A.submitting;


        DOM.submitButton.setAttribute(
            'aria-busy',
            PAGE02A.submitting
                ? 'true'
                : 'false'
        );


        const primary =
            DOM.submitButton.querySelector(
                '.button-primary'
            );


        const secondary =
            DOM.submitButton.querySelector(
                '.button-secondary'
            );


        if (
            PAGE02A.submitting
        ) {

            if (
                primary
            ) {

                primary.textContent =
                    'பதிவு செய்கிறோம்...';

            }


            if (
                secondary
            ) {

                secondary.textContent =
                    'CREATING YOUR SCORECARD...';

            }

        }
        else {

            if (
                primary
            ) {

                primary.textContent =
                    'என் Scorecard™-ஐ தொடங்குகிறேன்';

            }


            if (
                secondary
            ) {

                secondary.textContent =
                    'BEGIN MY SCORECARD™';

            }

        }

    }


    /* =========================================================================
     * API RESPONSE HELPERS
     * ========================================================================= */


    function firstValue() {

        for (
            let index = 0;
            index < arguments.length;
            index += 1
        ) {

            const value =
                arguments[index];


            if (
                value !== undefined &&
                value !== null &&
                value !== ''
            ) {

                return value;

            }

        }


        return null;

    }


    function getResponseData(response) {

        if (
            response &&
            response.data &&
            typeof response.data === 'object'
        ) {

            return response.data;

        }


        if (
            response &&
            response.result &&
            typeof response.result === 'object'
        ) {

            return response.result;

        }


        return (
            response &&
            typeof response === 'object'
        )
            ? response
            : {};

    }


    function responseIndicatesFailure(response) {

        if (
            response === false ||
            response === null ||
            response === undefined
        ) {

            return true;

        }


        if (
            typeof response !== 'object'
        ) {

            return false;

        }


        if (
            response.success === false ||
            response.ok === false
        ) {

            return true;

        }


        const data =
            getResponseData(
                response
            );


        if (
            data.success === false ||
            data.ok === false
        ) {

            return true;

        }


        return false;

    }


    function getResponseError(response) {

        const data =
            getResponseData(
                response
            );


        return cleanString(

            firstValue(

                response &&
                response.message,

                response &&
                response.error,

                data &&
                data.message,

                data &&
                data.error

            )

        );

    }


    /* =========================================================================
     * EXTRACT REGISTERED CLIENT
     *
     * Tolerates the common backend response shapes while still requiring
     * an actual backend-generated identity before Page 02B navigation.
     * ========================================================================= */


    function extractClient(
        response,
        kyc
    ) {

        const data =
            getResponseData(
                response
            );


        const clientObject =

            (
                data.client &&
                typeof data.client === 'object'
            )
                ? data.client
                : {};


        const responseClient =

            (
                response &&
                response.client &&
                typeof response.client === 'object'
            )
                ? response.client
                : {};


        const peopleId =
            firstValue(

                clientObject.peopleId,

                responseClient.peopleId,

                data.peopleId,

                data.peopleID,

                data.personId,

                data.id,

                response &&
                response.peopleId,

                response &&
                response.peopleID,

                response &&
                response.personId

            );


        const clientId =
            firstValue(

                clientObject.clientId,

                responseClient.clientId,

                data.clientId,

                data.clientID,

                response &&
                response.clientId,

                response &&
                response.clientID

            );


        const fullName =
            firstValue(

                clientObject.fullName,

                responseClient.fullName,

                data.fullName,

                response &&
                response.fullName,

                kyc.fullName

            );


        return {

            peopleId:
                peopleId
                    ? cleanString(peopleId)
                    : null,

            clientId:
                clientId
                    ? cleanString(clientId)
                    : null,

            fullName:
                cleanString(
                    fullName
                )

        };

    }


    /* =========================================================================
     * VERIFY REGISTERED IDENTITY
     * ========================================================================= */


    function hasBackendIdentity(client) {

        return Boolean(

            client &&

            (
                client.peopleId ||
                client.clientId
            )

        );

    }


    /* =========================================================================
     * REGISTER CLIENT
     * ========================================================================= */


    async function registerClient(payload) {

        if (
            !hasRegistrationApi()
        ) {

            throw new Error(
                'CTM PATH™ registration service is unavailable.'
            );

        }


        /*
         * Promise.resolve() supports both:
         *
         *      CTM_API.register() → Promise
         *
         * and
         *
         *      CTM_API.register() → immediate value
         */


        return await Promise.resolve(

            window.CTM_API.register(
                payload
            )

        );

    }


    /* =========================================================================
     * PRESERVE KYC
     * ========================================================================= */


    function preserveKyc(kyc) {

        if (
            !hasSessionApi()
        ) {

            throw new Error(
                'CTM PATH™ Page 02 session is unavailable.'
            );

        }


        window.Page02Session.setKyc(
            kyc
        );

    }


    /* =========================================================================
     * PRESERVE REGISTERED CLIENT
     * ========================================================================= */


    function preserveClient(client) {

        if (
            !hasSessionApi()
        ) {

            throw new Error(
                'CTM PATH™ Page 02 session is unavailable.'
            );

        }


        window.Page02Session.setClient({

            peopleId:
                client.peopleId,

            clientId:
                client.clientId,

            fullName:
                client.fullName

        });


        /*
         * Page02Session.setClient() itself determines registered status
         * from peopleId/clientId and preserves the legacy identity keys.
         */

    }


    /* =========================================================================
     * ACTIVATE DIMENSION 01
     * ========================================================================= */


    function activateFirstDimension() {

        if (
            !hasSessionApi()
        ) {

            throw new Error(
                'CTM PATH™ Page 02 session is unavailable.'
            );

        }


        const activated =
            window.Page02Session
                .setCurrentDimension(
                    PAGE02A.firstDimension
                );


        if (
            activated !== true
        ) {

            throw new Error(
                'Unable to initialize Dimension 01.'
            );

        }

    }


    /* =========================================================================
     * NAVIGATE TO PAGE 02B
     * ========================================================================= */


    function goToPage02b() {

        window.location.href =
            PAGE02A.nextPage;

    }


    /* =========================================================================
     * BEGIN BUTTON
     * ========================================================================= */


    function handleBeginClick(event) {

        if (
            event
        ) {

            event.preventDefault();

        }


        showKyc();


        /*
         * Restore after screen reveal so browsers can correctly focus
         * controls if necessary.
         */


        restoreKyc();

    }


    /* =========================================================================
     * KYC SUBMIT
     * ========================================================================= */


    async function handleKycSubmit(event) {

        event.preventDefault();


        if (
            PAGE02A.submitting
        ) {

            return;

        }


        clearFeedback();


        /* ---------------------------------------------------------------------
         * CHECK SHARED SESSION
         * ------------------------------------------------------------------ */


        if (
            !hasSessionApi()
        ) {

            console.error(
                'CTM PATH™ Page 02A cannot find Page02Session.',
                window.Page02Session
            );


            showError(
                'CTM PATH™ session could not be started. Please refresh the page and try again.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
         * CHECK REGISTRATION API
         * ------------------------------------------------------------------ */


        if (
            !hasRegistrationApi()
        ) {

            console.error(
                'CTM PATH™ Page 02A cannot find CTM_API.register().',
                window.CTM_API
            );


            showError(
                'Registration service is temporarily unavailable. Please refresh the page and try again.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
         * READ
         * ------------------------------------------------------------------ */


        const kyc =
            readKyc();


        /* ---------------------------------------------------------------------
         * VALIDATE
         * ------------------------------------------------------------------ */


        const validation =
            validateKyc(
                kyc
            );


        if (
            !validation.valid
        ) {

            showError(
                validation.message
            );


            focusField(
                validation.element
            );


            return;

        }


        /* ---------------------------------------------------------------------
         * PRESERVE BEFORE NETWORK REQUEST
         *
         * This prevents loss of completed form data if the backend request
         * fails. It does NOT mark the client registered.
         * ------------------------------------------------------------------ */


        try {

            preserveKyc(
                kyc
            );

        }
        catch (error) {

            console.error(
                'CTM PATH™ Page 02A could not preserve KYC:',
                error
            );


            showError(
                'Your details could not be saved in this session. Please refresh the page and try again.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
         * BUILD BACKEND PAYLOAD
         * ------------------------------------------------------------------ */


        const payload =
            buildRegistrationPayload(
                kyc
            );


        /* ---------------------------------------------------------------------
         * REGISTER
         * ------------------------------------------------------------------ */


        setSubmitting(
            true
        );


        try {

            const response =
                await registerClient(
                    payload
                );


            console.info(
                'CTM PATH™ Page 02A registration response:',
                response
            );


            /* -----------------------------------------------------------------
             * EXPLICIT BACKEND FAILURE
             * -------------------------------------------------------------- */


            if (
                responseIndicatesFailure(
                    response
                )
            ) {

                throw new Error(

                    getResponseError(
                        response
                    ) ||

                    'Registration could not be completed.'

                );

            }


            /* -----------------------------------------------------------------
             * EXTRACT BACKEND IDENTITY
             * -------------------------------------------------------------- */


            const client =
                extractClient(
                    response,
                    kyc
                );


            /* -----------------------------------------------------------------
             * REQUIRE ACTUAL BACKEND ID
             *
             * This is the safety gate preventing Page 02B from opening merely
             * because an HTTP/API call returned something truthy.
             * -------------------------------------------------------------- */


            if (
                !hasBackendIdentity(
                    client
                )
            ) {

                console.error(
                    'CTM PATH™ registration returned no client identity:',
                    response
                );


                throw new Error(
                    'Registration completed without a client ID. Please try again.'
                );

            }


            /* -----------------------------------------------------------------
             * PRESERVE REGISTERED IDENTITY
             * -------------------------------------------------------------- */


            preserveClient(
                client
            );


            /* -----------------------------------------------------------------
             * PRESERVE KYC AGAIN
             *
             * Ensures final normalized KYC and registered identity coexist in
             * the same Page02Session before navigation.
             * -------------------------------------------------------------- */


            preserveKyc(
                kyc
            );


            /* -----------------------------------------------------------------
             * ACTIVATE DIMENSION 01
             * -------------------------------------------------------------- */


            activateFirstDimension();


            /* -----------------------------------------------------------------
             * FINAL SESSION VERIFICATION
             * -------------------------------------------------------------- */


            if (
                typeof window.Page02Session.hasRegisteredClient ===
                    'function' &&
                !window.Page02Session.hasRegisteredClient()
            ) {

                throw new Error(
                    'Registered client identity could not be preserved.'
                );

            }


            /* -----------------------------------------------------------------
             * SUCCESS
             * -------------------------------------------------------------- */


            showSuccess(
                'Your details have been registered. Opening your Scorecard™...'
            );


            /*
             * Short delay lets the success state render and guarantees the
             * sessionStorage writes have completed before the next document
             * starts loading.
             */


            window.setTimeout(
                function () {

                    goToPage02b();

                },
                260
            );

        }
        catch (error) {

            console.error(
                'CTM PATH™ Page 02A registration failed:',
                error
            );


            showError(

                cleanString(
                    error &&
                    error.message
                ) ||

                'We could not register your details. Please try again.'

            );


            setSubmitting(
                false
            );

        }

    }


    /* =========================================================================
     * LIVE FIELD CLEANUP
     * ========================================================================= */


    function handleFieldInput(event) {

        const target =
            event.target;


        if (
            target &&
            target.hasAttribute &&
            target.hasAttribute(
                'aria-invalid'
            )
        ) {

            target.removeAttribute(
                'aria-invalid'
            );

        }


        if (
            DOM.error &&
            !DOM.error.hidden
        ) {

            DOM.error.hidden =
                true;

        }

    }


    /* =========================================================================
     * MOBILE INPUT NORMALIZATION
     * ========================================================================= */


    function normalizeMobileInput() {

        const element =
            getElement('mobile');


        if (
            !element
        ) {

            return;

        }


        /*
         * Keep:
         *
         *      digits
         *      spaces
         *      +
         *      -
         *      parentheses
         *
         * Backend normalization happens at submission.
         */


        element.value =
            element.value.replace(
                /[^0-9+\-()\s]/g,
                ''
            );

    }


    /* =========================================================================
     * PINCODE INPUT NORMALIZATION
     * ========================================================================= */


    function normalizePincodeInput() {

        const country =
            cleanString(
                getElement('country').value
            );


        const element =
            getElement('pincode');


        if (
            !element
        ) {

            return;

        }


        if (
            country === 'India'
        ) {

            element.value =
                element.value
                    .replace(
                        /\D/g,
                        ''
                    )
                    .slice(
                        0,
                        6
                    );

        }

    }


    /* =========================================================================
     * EVENT BINDING
     * ========================================================================= */


    function bindEvents() {

        DOM.beginButton.addEventListener(
            'click',
            handleBeginClick
        );


        DOM.kycForm.addEventListener(
            'submit',
            handleKycSubmit
        );


        DOM.kycForm.addEventListener(
            'input',
            handleFieldInput
        );


        DOM.kycForm.addEventListener(
            'change',
            handleFieldInput
        );


        const mobile =
            getElement('mobile');


        if (
            mobile
        ) {

            mobile.addEventListener(
                'input',
                normalizeMobileInput
            );

        }


        const pincode =
            getElement('pincode');


        if (
            pincode
        ) {

            pincode.addEventListener(
                'input',
                normalizePincodeInput
            );

        }


        const country =
            getElement('country');


        if (
            country
        ) {

            country.addEventListener(
                'change',
                normalizePincodeInput
            );

        }

    }


    /* =========================================================================
     * RESTORE JOURNEY STATE
     * ========================================================================= */


    function restoreJourneyState() {

        if (
            !hasSessionApi()
        ) {

            /*
             * Do not kill Page 02A during initialization.
             *
             * The visitor can still see the intro. Submission will perform
             * the strict dependency check and display a useful error.
             */


            console.error(
                'CTM PATH™ Page 02A initialized without Page02Session.'
            );


            showIntro();


            return;

        }


        restoreKyc();


        /*
         * If a registered client already exists, the visitor may have returned
         * to Page 02A using browser navigation.
         *
         * We intentionally DO NOT auto-forward them. Page 02A remains stable
         * and their KYC is restored.
         */


        showIntro();

    }


    /* =========================================================================
     * INITIALIZE
     * ========================================================================= */


    function initialize() {

        cacheDom();


        if (
            !validateDomContract()
        ) {

            return;

        }


        bindEvents();


        restoreJourneyState();


        console.info(
            'CTM PATH™ Page 02A ready.',
            {

                version:
                    PAGE02A.version,

                session:
                    hasSessionApi(),

                registrationApi:
                    hasRegistrationApi(),

                nextPage:
                    PAGE02A.nextPage,

                firstDimension:
                    PAGE02A.firstDimension

            }
        );

    }


    /* =========================================================================
     * DOM READY
     * ========================================================================= */


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            initialize,
            {
                once:
                    true
            }
        );

    }
    else {

        initialize();

    }


    /* =========================================================================
     * OPTIONAL DEBUG EXPOSURE
     *
     * Useful during Page 02A QA.
     * ========================================================================= */


    window.Page02A = {

        version:
            PAGE02A.version,

        readKyc:
            readKyc,

        validateKyc:
            function () {

                return validateKyc(
                    readKyc()
                );

            },

        buildRegistrationPayload:
            function () {

                return buildRegistrationPayload(
                    readKyc()
                );

            },

        hasSessionApi:
            hasSessionApi,

        hasRegistrationApi:
            hasRegistrationApi,

        showIntro:
            showIntro,

        showKyc:
            showKyc

    };


})(window, document);

