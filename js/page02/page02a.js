
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02a.js
 *
 * VERSION:
 * 5.1 — CLEAN KYC ENTRY CONTROLLER
 *
 * PAGE:
 * PAGE 02A — INTRODUCTION + ABOUT YOU™ KYC
 *
 * =============================================================================
 *
 * PURPOSE
 * =============================================================================
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
 * ARCHITECTURE
 * =============================================================================
 *
 *      page02a.html
 *             │
 *             ├── page02-data.js
 *             ├── page02-session.js
 *             ├── api.js
 *             └── page02a.js
 *
 *                         │
 *                         ▼
 *
 *                  Page02Session
 *                         │
 *                         ▼
 *                  CTM_API.register()
 *                         │
 *                         ▼
 *                  Backend-generated identity
 *                         │
 *                         ▼
 *                  Dimension 01 = wealth
 *                         │
 *                         ▼
 *                    page02b.html
 *
 * =============================================================================
 *
 * ENGINEERING PRINCIPLES
 * =============================================================================
 *
 *      1. Page 02A owns presentation state only.
 *      2. Page02Session owns journey state.
 *      3. CTM_API owns backend communication.
 *      4. No backend identity is invented client-side.
 *      5. No navigation occurs after failed registration.
 *      6. Existing KYC is restored whenever available.
 *      7. "0" is a valid dependents value.
 *      8. Submit is idempotent while a request is active.
 *      9. All user-facing errors are actionable.
 *     10. Existing JavaScript contracts are preserved.
 *     11. No dependency on component-loader.js.
 *     12. No dependency on global header/footer runtime.
 *
 * =============================================================================
 *
 * CRITICAL TRANSACTION
 * =============================================================================
 *
 *      BEGIN MY SCORECARD™
 *
 *          Validate KYC
 *              ↓
 *          Preserve KYC locally
 *              ↓
 *          CTM_API.register()
 *              ↓
 *          Confirm backend registration
 *              ↓
 *          Preserve returned client identity
 *              ↓
 *          Set current dimension = wealth
 *              ↓
 *          Navigate to page02b.html
 *
 * NEVER navigate to Page 02B if backend registration fails.
 *
 * =============================================================================
 */

'use strict';


(function (window, document) {


    /* =========================================================================
     * 01. PAGE CONSTANTS
     * ========================================================================= */

    const PAGE02A = {

        version:
            '5.1',

        page:
            2,

        pageCode:
            '02A',

        nextPage:
            'page02b.html',

        firstDimension:
            'wealth',

        journey:
            'Millionaire Lifestyle Scorecard™',

        submitting:
            false,

        initialized:
            false

    };


    /* =========================================================================
     * 02. DOM REFERENCES
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
     * 03. REQUIRED FIELD DEFINITIONS
     * =========================================================================
     *
     * 13 standard fields + 3 radio groups = 16 KYC fields.
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
     * 04. SAFE STRING
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
     * 05. SAFE ELEMENT
     * ========================================================================= */

    function getElement(id) {

        if (!id) {

            return null;

        }


        return document.getElementById(id);

    }


    /* =========================================================================
     * 06. DOM CACHE
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
     * 07. DOM CONTRACT VALIDATION
     * ========================================================================= */

    function validateDomContract() {

        const missing = [];


        const requiredDom = {

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


        Object.keys(requiredDom).forEach(
            function (key) {

                if (!requiredDom[key]) {

                    missing.push(key);

                }

            }
        );


        FIELD_IDS.forEach(
            function (id) {

                if (!getElement(id)) {

                    missing.push(id);

                }

            }
        );


        RADIO_FIELDS.forEach(
            function (name) {

                if (
                    !document.querySelector(
                        'input[name="' + name + '"]'
                    )
                ) {

                    missing.push(name);

                }

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
     * 08. SESSION API
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
     * 09. REGISTRATION API
     * ========================================================================= */

    function hasRegistrationApi() {

        return Boolean(

            window.CTM_API &&

            typeof window.CTM_API.register ===
                'function'

        );

    }


    /* =========================================================================
     * 10. FEEDBACK — CLEAR
     * ========================================================================= */

    function clearFeedback() {

        if (DOM.error) {

            DOM.error.textContent =
                '';

            DOM.error.hidden =
                true;

            DOM.error.removeAttribute(
                'role'
            );

        }


        if (DOM.success) {

            DOM.success.textContent =
                '';

            DOM.success.hidden =
                true;

            DOM.success.removeAttribute(
                'role'
            );

        }

    }


    /* =========================================================================
     * 11. FEEDBACK — ERROR
     * ========================================================================= */

    function showError(message) {

        const finalMessage =
            cleanString(message) ||
            'Unable to continue. Please check your details and try again.';


        if (DOM.error) {

            DOM.error.textContent =
                finalMessage;

            DOM.error.hidden =
                false;

            DOM.error.setAttribute(
                'role',
                'alert'
            );

        }


        if (DOM.success) {

            DOM.success.textContent =
                '';

            DOM.success.hidden =
                true;

        }


        scrollToElement(
            DOM.error,
            'center'
        );

    }


    /* =========================================================================
     * 12. FEEDBACK — SUCCESS
     * ========================================================================= */

    function showSuccess(message) {

        if (!DOM.success) {

            return;

        }


        DOM.success.textContent =
            cleanString(message);

        DOM.success.hidden =
            false;

        DOM.success.setAttribute(
            'role',
            'status'
        );


        if (DOM.error) {

            DOM.error.textContent =
                '';

            DOM.error.hidden =
                true;

        }

    }


    /* =========================================================================
     * 13. SCROLL HELPER
     * ========================================================================= */

    function scrollToElement(
        element,
        block
    ) {

        if (!element) {

            return;

        }


        try {

            element.scrollIntoView({

                behavior:
                    'smooth',

                block:
                    block || 'center'

            });

        }
        catch (error) {

            /*
             * Non-critical enhancement.
             */

        }

    }


    /* =========================================================================
     * 14. SCREEN — INTRO
     * ========================================================================= */

    function showIntro() {

        if (DOM.introScreen) {

            DOM.introScreen.hidden =
                false;

            DOM.introScreen.setAttribute(
                'aria-hidden',
                'false'
            );

        }


        if (DOM.kycScreen) {

            DOM.kycScreen.hidden =
                true;

            DOM.kycScreen.setAttribute(
                'aria-hidden',
                'true'
            );

        }


        clearFeedback();

    }


    /* =========================================================================
     * 15. SCREEN — KYC
     * ========================================================================= */

    function showKyc() {

        if (DOM.introScreen) {

            DOM.introScreen.hidden =
                true;

            DOM.introScreen.setAttribute(
                'aria-hidden',
                'true'
            );

        }


        if (DOM.kycScreen) {

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

                    left:
                        0,

                    behavior:
                        'smooth'

                });

            }
        );

    }


    /* =========================================================================
     * 16. RADIO — READ
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
     * 17. RADIO — WRITE
     * ========================================================================= */

    function setRadioValue(
        name,
        value
    ) {

        const normalizedValue =
            cleanString(value);


        if (!normalizedValue) {

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
                    normalizedValue;

            }
        );

    }


    /* =========================================================================
     * 18. KYC — READ
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
     * 19. KYC — WRITE
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


                if (!element) {

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
     * 20. KYC — RESTORE FROM SESSION
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

            const storedKyc =
                window.Page02Session.getKyc();


            if (
                storedKyc &&
                typeof storedKyc === 'object'
            ) {

                writeKyc(
                    storedKyc
                );

            }

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02A KYC restoration failed:',
                error
            );

        }

    }


    /* =========================================================================
     * 21. INVALID STATE — MARK
     * ========================================================================= */

    function markInvalid(element) {

        if (!element) {

            return;

        }


        element.setAttribute(
            'aria-invalid',
            'true'
        );

    }


    /* =========================================================================
     * 22. INVALID STATE — CLEAR
     * ========================================================================= */

    function clearInvalidState() {

        if (!DOM.kycForm) {

            return;

        }


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


    /* =========================================================================
     * 23. FOCUS FIELD
     * ========================================================================= */

    function focusField(element) {

        if (!element) {

            return;

        }


        try {

            element.focus({

                preventScroll:
                    true

            });

        }
        catch (error) {

            try {

                element.focus();

            }
            catch (focusError) {

                /*
                 * Non-critical.
                 */

            }

        }


        scrollToElement(
            element,
            'center'
        );

    }


    /* =========================================================================
     * 24. INVALID RESULT
     * ========================================================================= */

    function invalidResult(
        element,
        message
    ) {

        markInvalid(
            element
        );


        return {

            valid:
                false,

            element:
                element,

            message:
                message

        };

    }


    /* =========================================================================
     * 25. VALIDATE — NAME
     * ========================================================================= */

    function validateFullName(kyc) {

        if (
            kyc.fullName.length < 2
        ) {

            return invalidResult(
                getElement('fullName'),
                'Please enter your full name.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 26. VALIDATE — MOBILE
     * ========================================================================= */

    function validateMobile(kyc) {

        const digits =
            kyc.mobile.replace(
                /\D/g,
                ''
            );


        if (
            digits.length < 10 ||
            digits.length > 15
        ) {

            return invalidResult(
                getElement('mobile'),
                'Please enter a valid mobile number.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 27. VALIDATE — EMAIL
     * ========================================================================= */

    function validateEmail(kyc) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !pattern.test(
                kyc.email
            )
        ) {

            return invalidResult(
                getElement('email'),
                'Please enter a valid email address.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 28. VALIDATE — AGE
     * ========================================================================= */

    function validateAge(kyc) {

        const age =
            Number(
                kyc.age
            );


        if (
            !Number.isInteger(age) ||
            age < 18 ||
            age > 100
        ) {

            return invalidResult(
                getElement('age'),
                'Please enter a valid age between 18 and 100.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 29. VALIDATE — GENDER
     * ========================================================================= */

    function validateGender(kyc) {

        if (kyc.gender) {

            return null;

        }


        return invalidResult(
            document.querySelector(
                'input[name="gender"]'
            ),
            'Please select your gender.'
        );

    }


    /* =========================================================================
     * 30. VALIDATE — OCCUPATION
     * ========================================================================= */

    function validateOccupation(kyc) {

        if (
            kyc.occupation.length < 2
        ) {

            return invalidResult(
                getElement('occupation'),
                'Please enter your occupation.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 31. VALIDATE — EMPLOYER / BUSINESS
     * ========================================================================= */

    function validateEmployerBusiness(kyc) {

        if (
            kyc.employerBusiness.length < 2
        ) {

            return invalidResult(
                getElement('employerBusiness'),
                'Please enter your employer or business.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 32. VALIDATE — MARITAL STATUS
     * ========================================================================= */

    function validateMaritalStatus(kyc) {

        if (kyc.maritalStatus) {

            return null;

        }


        return invalidResult(
            document.querySelector(
                'input[name="maritalStatus"]'
            ),
            'Please select your marital status.'
        );

    }


    /* =========================================================================
     * 33. VALIDATE — DEPENDENTS
     * =========================================================================
     *
     * "0" is valid.
     *
     * Never use:
     *
     *      if (!kyc.dependents)
     *
     * ========================================================================= */

    function validateDependents(kyc) {

        if (
            kyc.dependents === ''
        ) {

            return invalidResult(
                getElement('dependents'),
                'Please select the number of dependents.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 34. VALIDATE — CITY
     * ========================================================================= */

    function validateCity(kyc) {

        if (
            kyc.city.length < 2
        ) {

            return invalidResult(
                getElement('city'),
                'Please enter your city.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 35. VALIDATE — DISTRICT
     * ========================================================================= */

    function validateDistrict(kyc) {

        if (
            kyc.district.length < 2
        ) {

            return invalidResult(
                getElement('district'),
                'Please enter your district.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 36. VALIDATE — STATE
     * ========================================================================= */

    function validateState(kyc) {

        if (
            kyc.state.length < 2
        ) {

            return invalidResult(
                getElement('state'),
                'Please enter your state.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 37. VALIDATE — COUNTRY
     * ========================================================================= */

    function validateCountry(kyc) {

        if (
            !kyc.country
        ) {

            return invalidResult(
                getElement('country'),
                'Please select your country.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 38. VALIDATE — PINCODE
     * ========================================================================= */

    function validatePincode(kyc) {

        const country =
            cleanString(
                kyc.country
            );


        if (
            country === 'India'
        ) {

            if (
                !/^[0-9]{6}$/.test(
                    kyc.pincode
                )
            ) {

                return invalidResult(
                    getElement('pincode'),
                    'Please enter a valid 6-digit pincode.'
                );

            }


            return null;

        }


        if (
            !kyc.pincode
        ) {

            return invalidResult(
                getElement('pincode'),
                'Please enter your postal code.'
            );

        }


        return null;

    }


    /* =========================================================================
     * 39. VALIDATE — LANGUAGE
     * ========================================================================= */

    function validatePreferredLanguage(kyc) {

        if (
            kyc.preferredLanguage
        ) {

            return null;

        }


        return invalidResult(
            document.querySelector(
                'input[name="preferredLanguage"]'
            ),
            'Please select your preferred language.'
        );

    }


    /* =========================================================================
     * 40. VALIDATE — SOURCE
     * ========================================================================= */

    function validateSource(kyc) {

        if (
            kyc.source
        ) {

            return null;

        }


        return invalidResult(
            getElement('source'),
            'Please tell us how you heard about CTM PATH MILLIONAIRES.'
        );

    }


    /* =========================================================================
     * 41. VALIDATE KYC
     * ========================================================================= */

    function validateKyc(kyc) {

        clearInvalidState();


        const validators = [

            validateFullName,

            validateMobile,

            validateEmail,

            validateAge,

            validateGender,

            validateOccupation,

            validateEmployerBusiness,

            validateMaritalStatus,

            validateDependents,

            validateCity,

            validateDistrict,

            validateState,

            validateCountry,

            validatePincode,

            validatePreferredLanguage,

            validateSource

        ];


        for (
            let index = 0;
            index < validators.length;
            index += 1
        ) {

            const result =
                validators[index](
                    kyc
                );


            if (
                result &&
                !result.valid
            ) {

                return result;

            }

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
     * 42. MOBILE NORMALIZATION
     * ========================================================================= */

    function normalizeMobile(value) {

        return cleanString(value)
            .replace(
                /\s+/g,
                ''
            );

    }


    /* =========================================================================
     * 43. DEVICE TYPE
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
     * 44. BUILD REGISTRATION PAYLOAD
     * ========================================================================= */

    function buildRegistrationPayload(kyc) {

        return {

            /*
             * -----------------------------------------------------------------
             * CANONICAL REGISTRATION FIELDS
             * -----------------------------------------------------------------
             */

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


            /*
             * -----------------------------------------------------------------
             * EXPANDED PAGE 02A KYC
             * -----------------------------------------------------------------
             */

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


            /*
             * -----------------------------------------------------------------
             * JOURNEY METADATA
             * -----------------------------------------------------------------
             */

            language:
                kyc.preferredLanguage,

            page:
                PAGE02A.page,

            pageCode:
                PAGE02A.pageCode,

            journey:
                PAGE02A.journey,

            device:
                getDeviceType()

        };

    }


    /* =========================================================================
     * 45. SUBMIT STATE
     * ========================================================================= */

    function setSubmitting(
        isSubmitting
    ) {

        PAGE02A.submitting =
            Boolean(
                isSubmitting
            );


        if (!DOM.submitButton) {

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

            if (primary) {

                primary.textContent =
                    'பதிவு செய்கிறோம்...';

            }


            if (secondary) {

                secondary.textContent =
                    'CREATING YOUR SCORECARD...';

            }


            return;

        }


        if (primary) {

            primary.textContent =
                'என் Scorecard™-ஐ தொடங்குகிறேன்';

        }


        if (secondary) {

            secondary.textContent =
                'BEGIN MY SCORECARD™';

        }

    }


    /* =========================================================================
     * 46. RESPONSE — FIRST VALUE
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


    /* =========================================================================
     * 47. RESPONSE — DATA
     * ========================================================================= */

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


        if (
            response &&
            typeof response === 'object'
        ) {

            return response;

        }


        return {};

    }


    /* =========================================================================
     * 48. RESPONSE — FAILURE DETECTION
     * ========================================================================= */

    function responseIndicatesFailure(
        response
    ) {

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


    /* =========================================================================
     * 49. RESPONSE — ERROR
     * ========================================================================= */

    function getResponseError(
        response
    ) {

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
     * 50. RESPONSE — EXTRACT CLIENT
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
                    ? cleanString(
                        peopleId
                    )
                    : null,

            clientId:
                clientId
                    ? cleanString(
                        clientId
                    )
                    : null,

            fullName:
                cleanString(
                    fullName
                )

        };

    }


    /* =========================================================================
     * 51. BACKEND IDENTITY VALIDATION
     * ========================================================================= */

    function hasBackendIdentity(
        client
    ) {

        return Boolean(

            client &&

            (
                cleanString(
                    client.peopleId
                ) ||

                cleanString(
                    client.clientId
                )
            )

        );

    }


    /* =========================================================================
     * 52. REGISTER CLIENT
     * ========================================================================= */

    async function registerClient(
        payload
    ) {

        if (
            !hasRegistrationApi()
        ) {

            throw new Error(
                'CTM PATH™ registration service is unavailable.'
            );

        }


        return await Promise.resolve(

            window.CTM_API.register(
                payload
            )

        );

    }


    /* =========================================================================
     * 53. PRESERVE KYC
     * ========================================================================= */

    function preserveKyc(
        kyc
    ) {

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
     * 54. PRESERVE CLIENT IDENTITY
     * ========================================================================= */

    function preserveClient(
        client
    ) {

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

    }


    /* =========================================================================
     * 55. ACTIVATE FIRST DIMENSION
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
     * 56. VERIFY REGISTERED SESSION
     * ========================================================================= */

    function verifyRegisteredSession() {

        if (
            !window.Page02Session
        ) {

            return false;

        }


        if (
            typeof window.Page02Session.hasRegisteredClient ===
                'function'
        ) {

            return Boolean(
                window.Page02Session.hasRegisteredClient()
            );

        }


        if (
            typeof window.Page02Session.getClient ===
                'function'
        ) {

            const client =
                window.Page02Session.getClient();


            return Boolean(
                client &&
                (
                    cleanString(
                        client.peopleId
                    ) ||

                    cleanString(
                        client.clientId
                    )
                )
            );

        }


        /*
         * The current Page02Session contract normally provides one of the
         * methods above. If neither exists, do not invent a client identity.
         */

        return false;

    }


    /* =========================================================================
     * 57. NAVIGATE TO PAGE 02B
     * ========================================================================= */

    function goToPage02b() {

        window.location.assign(
            PAGE02A.nextPage
        );

    }


    /* =========================================================================
     * 58. BEGIN BUTTON
     * ========================================================================= */

    function handleBeginClick(
        event
    ) {

        if (event) {

            event.preventDefault();

        }


        if (
            PAGE02A.submitting
        ) {

            return;

        }


        restoreKyc();

        showKyc();


        const firstField =
            getElement('fullName');


        if (firstField) {

            window.setTimeout(
                function () {

                    try {

                        firstField.focus({
                            preventScroll:
                                true
                        });

                    }
                    catch (error) {

                        /*
                         * Non-critical.
                         */

                    }

                },
                220
            );

        }

    }


    /* =========================================================================
     * 59. KYC SUBMIT
     * ========================================================================= */

    async function handleKycSubmit(
        event
    ) {

        if (event) {

            event.preventDefault();

        }


        if (
            PAGE02A.submitting
        ) {

            return;

        }


        clearFeedback();


        /*
         * ---------------------------------------------------------------------
         * SESSION DEPENDENCY
         * ---------------------------------------------------------------------
         */

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


        /*
         * ---------------------------------------------------------------------
         * REGISTRATION DEPENDENCY
         * ---------------------------------------------------------------------
         */

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


        /*
         * ---------------------------------------------------------------------
         * READ KYC
         * ---------------------------------------------------------------------
         */

        const kyc =
            readKyc();


        /*
         * ---------------------------------------------------------------------
         * VALIDATE
         * ---------------------------------------------------------------------
         */

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


        /*
         * ---------------------------------------------------------------------
         * PRESERVE KYC BEFORE NETWORK REQUEST
         * ---------------------------------------------------------------------
         *
         * Protect completed form data if registration fails.
         *
         * This does NOT mark the client as registered.
         */

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


        /*
         * ---------------------------------------------------------------------
         * BUILD PAYLOAD
         * ---------------------------------------------------------------------
         */

        const payload =
            buildRegistrationPayload(
                kyc
            );


        /*
         * ---------------------------------------------------------------------
         * START TRANSACTION
         * ---------------------------------------------------------------------
         */

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


            /*
             * -----------------------------------------------------------------
             * EXPLICIT FAILURE
             * -----------------------------------------------------------------
             */

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


            /*
             * -----------------------------------------------------------------
             * EXTRACT BACKEND IDENTITY
             * -----------------------------------------------------------------
             */

            const client =
                extractClient(
                    response,
                    kyc
                );


            /*
             * -----------------------------------------------------------------
             * HARD SAFETY GATE
             * -----------------------------------------------------------------
             *
             * A successful API call alone is NOT enough.
             *
             * Page 02B requires a real backend-generated identity.
             */

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


            /*
             * -----------------------------------------------------------------
             * PRESERVE REGISTERED IDENTITY
             * -----------------------------------------------------------------
             */

            preserveClient(
                client
            );


            /*
             * -----------------------------------------------------------------
             * PRESERVE FINAL KYC
             * -----------------------------------------------------------------
             */

            preserveKyc(
                kyc
            );


            /*
             * -----------------------------------------------------------------
             * ACTIVATE DIMENSION 01
             * -----------------------------------------------------------------
             */

            activateFirstDimension();


            /*
             * -----------------------------------------------------------------
             * FINAL SESSION VERIFICATION
             * -----------------------------------------------------------------
             */

            if (
                !verifyRegisteredSession()
            ) {

                throw new Error(
                    'Registered client identity could not be preserved.'
                );

            }


            /*
             * -----------------------------------------------------------------
             * SUCCESS
             * -----------------------------------------------------------------
             */

            showSuccess(
                'Your details have been registered. Opening your Scorecard™...'
            );


            /*
             * -----------------------------------------------------------------
             * NAVIGATION
             * -----------------------------------------------------------------
             *
             * Give the browser a short moment to render the success state and
             * complete sessionStorage writes.
             */

            window.setTimeout(
                function () {

                    goToPage02b();

                },
                300
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
     * 60. LIVE FIELD CLEANUP
     * ========================================================================= */

    function handleFieldInput(
        event
    ) {

        const target =
            event &&
            event.target;


        if (
            target &&
            typeof target.removeAttribute ===
                'function' &&
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
     * 61. MOBILE INPUT NORMALIZATION
     * ========================================================================= */

    function normalizeMobileInput() {

        const element =
            getElement('mobile');


        if (!element) {

            return;

        }


        element.value =
            element.value.replace(
                /[^0-9+\-()\s]/g,
                ''
            );

    }


    /* =========================================================================
     * 62. PINCODE INPUT NORMALIZATION
     * ========================================================================= */

    function normalizePincodeInput() {

        const countryElement =
            getElement('country');


        const pincodeElement =
            getElement('pincode');


        if (!pincodeElement) {

            return;

        }


        const country =
            cleanString(
                countryElement &&
                countryElement.value
            );


        if (
            country === 'India'
        ) {

            pincodeElement.value =
                pincodeElement.value
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
     * 63. AGE INPUT NORMALIZATION
     * ========================================================================= */

    function normalizeAgeInput() {

        const element =
            getElement('age');


        if (!element) {

            return;

        }


        const value =
            element.value
                .replace(
                    /\D/g,
                    ''
                );


        element.value =
            value.slice(
                0,
                3
            );

    }


    /* =========================================================================
     * 64. DEPENDENTS INPUT NORMALIZATION
     * ========================================================================= */

    function normalizeDependentsInput() {

        const element =
            getElement('dependents');


        if (!element) {

            return;

        }


        element.value =
            element.value
                .replace(
                    /\D/g,
                    ''
                )
                .slice(
                    0,
                    2
                );

    }


    /* =========================================================================
     * 65. EVENT BINDING
     * ========================================================================= */

    function bindEvents() {

        if (
            DOM.beginButton
        ) {

            DOM.beginButton.addEventListener(
                'click',
                handleBeginClick
            );

        }


        if (
            DOM.kycForm
        ) {

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

        }


        const mobile =
            getElement('mobile');


        if (mobile) {

            mobile.addEventListener(
                'input',
                normalizeMobileInput
            );

        }


        const pincode =
            getElement('pincode');


        if (pincode) {

            pincode.addEventListener(
                'input',
                normalizePincodeInput
            );

        }


        const country =
            getElement('country');


        if (country) {

            country.addEventListener(
                'change',
                normalizePincodeInput
            );

        }


        const age =
            getElement('age');


        if (age) {

            age.addEventListener(
                'input',
                normalizeAgeInput
            );

        }


        const dependents =
            getElement('dependents');


        if (dependents) {

            dependents.addEventListener(
                'input',
                normalizeDependentsInput
            );

        }

    }


    /* =========================================================================
     * 66. RESTORE JOURNEY STATE
     * ========================================================================= */

    function restoreJourneyState() {

        if (
            !hasSessionApi()
        ) {

            /*
             * Intro remains usable.
             *
             * Strict session dependency is checked again at submit time.
             */

            console.warn(
                'CTM PATH™ Page 02A initialized without Page02Session.'
            );


            showIntro();


            return;

        }


        restoreKyc();


        /*
         * Do not automatically redirect a returning visitor.
         *
         * Page 02A remains a stable entry point.
         */

        showIntro();

    }


    /* =========================================================================
     * 67. RESET SUBMIT STATE ON PAGE RESTORE
     * ========================================================================= */

    function restoreSubmitState() {

        PAGE02A.submitting =
            false;


        if (
            DOM.submitButton
        ) {

            DOM.submitButton.disabled =
                false;

            DOM.submitButton.setAttribute(
                'aria-busy',
                'false'
            );

        }

    }


    /* =========================================================================
     * 68. INITIALIZE
     * ========================================================================= */

    function initialize() {

        if (
            PAGE02A.initialized
        ) {

            return;

        }


        cacheDom();


        if (
            !validateDomContract()
        ) {

            PAGE02A.initialized =
                false;

            return;

        }


        restoreSubmitState();


        bindEvents();


        restoreJourneyState();


        PAGE02A.initialized =
            true;


        console.info(
            'CTM PATH™ Page 02A ready.',
            {

                version:
                    PAGE02A.version,

                page:
                    PAGE02A.pageCode,

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
     * 69. BROWSER PAGE SHOW
     * ========================================================================= */

    window.addEventListener(
        'pageshow',
        function () {

            if (
                DOM.submitButton &&
                PAGE02A.submitting
            ) {

                /*
                 * Browser back/forward cache can restore a disabled button.
                 */

                setSubmitting(
                    false
                );

            }

        }
    );


    /* =========================================================================
     * 70. DOM READY
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
     * 71. PUBLIC QA / DEBUG API
     * =========================================================================
     *
     * Safe inspection only.
     *
     * No backend credentials are exposed.
     * No client identity is fabricated.
     * ========================================================================= */

    window.Page02A = {

        version:
            PAGE02A.version,

        page:
            PAGE02A.pageCode,

        nextPage:
            PAGE02A.nextPage,

        firstDimension:
            PAGE02A.firstDimension,

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
            showKyc,

        restoreKyc:
            restoreKyc,

        getDeviceType:
            getDeviceType,

        isSubmitting:
            function () {

                return PAGE02A.submitting;

            },

        isInitialized:
            function () {

                return PAGE02A.initialized;

            }

    };


})(window, document);

