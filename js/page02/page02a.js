
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02a.js
 *
 * VERSION:
 * 3.0
 *
 * PAGE:
 * PAGE 02A — INTRODUCTION + KYC
 *
 * STATUS:
 * PAGE CONTROLLER
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
 *      REGISTER CLIENT
 *        ↓
 *      PRESERVE CLIENT + KYC IN Page02Session
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
 * IMPORTANT
 *
 * THIS FILE:
 *
 *      ✓ controls Page 02A only
 *      ✓ validates KYC
 *      ✓ calls CTM_API.register()
 *      ✓ stores identity in Page02Session
 *      ✓ stores KYC in Page02Session
 *      ✓ navigates to Page 02B
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ contain indicator definitions
 *      ✗ render scorecard questions
 *      ✗ calculate dimension scores
 *      ✗ call CTM_API.saveDiscovery()
 *
 * =============================================================================
 */


'use strict';


(function(window, document){


/* =============================================================================
 * CONFIGURATION
 * =============================================================================
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
        'CONTINUE →'

};


/* =============================================================================
 * DOM CONTRACT
 *
 * page02a.html should expose these IDs.
 *
 * Intro:
 *
 *      #introScreen
 *      #beginButton
 *
 * KYC:
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
 * Feedback:
 *
 *      #kycError
 *      #kycSuccess
 *
 * =============================================================================
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


/* =============================================================================
 * STATE
 * =============================================================================
 */


let isSubmitting =
    false;


/* =============================================================================
 * DOM HELPERS
 * =============================================================================
 */


function getElement(id){

    return (
        document.getElementById(id) ||
        null
    );

}


function getValue(id){

    const element =
        getElement(id);


    if(!element){

        return '';

    }


    return String(
        element.value || ''
    ).trim();

}


/* =============================================================================
 * SHOW / HIDE
 * =============================================================================
 */


function showElement(element){

    if(!element){

        return;

    }


    element.hidden =
        false;


    element.removeAttribute(
        'aria-hidden'
    );

}


function hideElement(element){

    if(!element){

        return;

    }


    element.hidden =
        true;


    element.setAttribute(
        'aria-hidden',
        'true'
    );

}


/* =============================================================================
 * SCROLL
 * =============================================================================
 */


function scrollToTop(){

    window.scrollTo({

        top: 0,

        left: 0,

        behavior: 'smooth'

    });

}


/* =============================================================================
 * MESSAGE SYSTEM
 * =============================================================================
 */


function clearMessages(){

    const error =
        getElement(
            DOM_IDS.error
        );


    const success =
        getElement(
            DOM_IDS.success
        );


    if(error){

        error.textContent =
            '';


        hideElement(
            error
        );

    }


    if(success){

        success.textContent =
            '';


        hideElement(
            success
        );

    }

}


function showError(message){

    clearMessages();


    const error =
        getElement(
            DOM_IDS.error
        );


    if(error){

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


function showSuccess(message){

    clearMessages();


    const success =
        getElement(
            DOM_IDS.success
        );


    if(success){

        success.textContent =
            message;


        showElement(
            success
        );

    }

}


/* =============================================================================
 * INTRO → KYC
 * =============================================================================
 */


function openKyc(){

    const introScreen =
        getElement(
            DOM_IDS.introScreen
        );


    const kycScreen =
        getElement(
            DOM_IDS.kycScreen
        );


    hideElement(
        introScreen
    );


    showElement(
        kycScreen
    );


    scrollToTop();


    window.setTimeout(
        function(){

            const fullName =
                getElement(
                    DOM_IDS.fullName
                );


            if(fullName){

                fullName.focus();

            }

        },
        350
    );

}


/* =============================================================================
 * RESTORE KYC
 * =============================================================================
 */


function restoreKyc(){

    if(
        !window.Page02Session
    ){

        return;

    }


    const kyc =
        window.Page02Session.getKyc();


    if(
        !kyc ||
        typeof kyc !== 'object'
    ){

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
        function(id){

            const element =
                getElement(id);


            const value =
                fields[id];


            if(
                element &&
                value !== undefined &&
                value !== null
            ){

                element.value =
                    value;

            }

        }
    );

}


/* =============================================================================
 * BUILD KYC
 * =============================================================================
 */


function buildKyc(){

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


/* =============================================================================
 * NORMALIZE MOBILE
 * =============================================================================
 */


function normalizeMobile(value){

    let mobile =
        String(
            value || ''
        )
        .replace(
            /\D/g,
            ''
        );


    if(
        mobile.length === 12 &&
        mobile.startsWith('91')
    ){

        mobile =
            mobile.substring(2);

    }


    return mobile;

}


/* =============================================================================
 * NORMALIZE EMAIL
 * =============================================================================
 */


function normalizeEmail(value){

    return String(
        value || ''
    )
    .trim()
    .toLowerCase();

}


/* =============================================================================
 * VALIDATE EMAIL
 * =============================================================================
 */


function isValidEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/* =============================================================================
 * VALIDATE KYC
 * =============================================================================
 */


function validateKyc(kyc){

    if(
        !kyc.fullName ||
        kyc.fullName.length < 2
    ){

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


    if(
        !/^[6-9]\d{9}$/.test(
            mobile
        )
    ){

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


    if(
        !email ||
        !isValidEmail(email)
    ){

        return {

            valid:
                false,

            field:
                DOM_IDS.email,

            message:
                'சரியான மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்.'

        };

    }


    if(
        !kyc.district
    ){

        return {

            valid:
                false,

            field:
                DOM_IDS.district,

            message:
                'உங்கள் மாவட்டத்தை உள்ளிடுங்கள்.'

        };

    }


    if(
        !kyc.state
    ){

        return {

            valid:
                false,

            field:
                DOM_IDS.state,

            message:
                'உங்கள் மாநிலத்தை உள்ளிடுங்கள்.'

        };

    }


    if(
        kyc.pincode &&
        !/^\d{6}$/.test(
            kyc.pincode
        )
    ){

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


/* =============================================================================
 * FOCUS INVALID FIELD
 * =============================================================================
 */


function focusField(id){

    const field =
        getElement(id);


    if(!field){

        return;

    }


    field.focus();


    if(
        typeof field.scrollIntoView ===
        'function'
    ){

        field.scrollIntoView({

            behavior:
                'smooth',

            block:
                'center'

        });

    }

}


/* =============================================================================
 * DEVICE INFORMATION
 * =============================================================================
 */


function getDeviceType(){

    const width =
        window.innerWidth;


    if(width <= 768){

        return 'mobile';

    }


    if(width <= 1024){

        return 'tablet';

    }


    return 'desktop';

}


/* =============================================================================
 * REGISTRATION PAYLOAD
 *
 * Preserves the established backend-compatible registration contract:
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
 * Additional KYC information remains safely in Page02Session.
 *
 * =============================================================================
 */


function buildRegistrationPayload(
    kyc
){

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


/* =============================================================================
 * SUBMIT BUTTON STATE
 * =============================================================================
 */


function setSubmitting(
    submitting
){

    isSubmitting =
        submitting;


    const button =
        getElement(
            DOM_IDS.submitButton
        );


    if(!button){

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


    if(primary){

        if(
            !primary.dataset.defaultText
        ){

            primary.dataset.defaultText =
                primary.textContent.trim();

        }


        primary.textContent =
            submitting
                ? CONFIG.loadingTextTamil
                : primary.dataset.defaultText;

    }


    if(secondary){

        if(
            !secondary.dataset.defaultText
        ){

            secondary.dataset.defaultText =
                secondary.textContent.trim();

        }


        secondary.textContent =
            submitting
                ? CONFIG.loadingTextEnglish
                : secondary.dataset.defaultText;

    }

}


/* =============================================================================
 * EXTRACT REGISTRATION RESULT
 *
 * Handles the common response shapes without coupling Page 02A tightly
 * to one transport wrapper.
 *
 * =============================================================================
 */


function extractClient(
    response,
    kyc
){

    const data =
        (
            response &&
            response.data &&
            typeof response.data === 'object'
        )
            ? response.data
            : (
                response || {}
            );


    const peopleId =
        data.peopleId ||
        data.peopleID ||
        data.personId ||
        data.id ||
        null;


    const clientId =
        data.clientId ||
        data.clientID ||
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


/* =============================================================================
 * RESPONSE SUCCESS CHECK
 * =============================================================================
 */


function registrationSucceeded(
    response
){

    if(!response){

        return false;

    }


    if(
        response.success === false ||
        response.ok === false
    ){

        return false;

    }


    return true;

}


/* =============================================================================
 * SAVE KYC LOCALLY
 * =============================================================================
 */


function preserveKyc(
    kyc
){

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


    window.Page02Session.setKyc(
        normalized
    );


    return normalized;

}


/* =============================================================================
 * NAVIGATE TO DIMENSION 01
 * =============================================================================
 */


function goToDimensionOne(){

    window.Page02Session.setCurrentDimension(
        CONFIG.firstDimension
    );


    window.location.href =
        CONFIG.nextPage;

}


/* =============================================================================
 * REGISTER
 * =============================================================================
 */


async function registerClient(
    kyc
){

    if(
        !window.CTM_API ||
        typeof window.CTM_API.register !==
            'function'
    ){

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


    if(
        !registrationSucceeded(
            response
        )
    ){

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


/* =============================================================================
 * HANDLE KYC SUBMISSION
 * =============================================================================
 */


async function handleKycSubmit(
    event
){

    if(event){

        event.preventDefault();

    }


    if(isSubmitting){

        return;

    }


    clearMessages();


    const kyc =
        buildKyc();


    const validation =
        validateKyc(
            kyc
        );


    if(
        !validation.valid
    ){

        showError(
            validation.message
        );


        focusField(
            validation.field
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * PRESERVE BEFORE NETWORK REQUEST
     *
     * If registration fails because of connectivity, the user does not need
     * to re-enter the KYC information.
     * -------------------------------------------------------------------------
     */


    const normalizedKyc =
        preserveKyc(
            kyc
        );


    setSubmitting(
        true
    );


    try{


        /* ---------------------------------------------------------------------
         * ALREADY REGISTERED
         *
         * Useful when user returns to Page 02A using browser Back.
         * Do not create another backend person unnecessarily.
         * ---------------------------------------------------------------------
         */


        if(
            window.Page02Session.hasRegisteredClient()
        ){

            console.info(
                'CTM PATH™ Page 02A: existing registered client recovered.'
            );


            goToDimensionOne();


            return;

        }


        /* ---------------------------------------------------------------------
         * REGISTER
         * ---------------------------------------------------------------------
         */


        const response =
            await registerClient(
                normalizedKyc
            );


        /* ---------------------------------------------------------------------
         * PRESERVE CLIENT IDENTITY
         * ---------------------------------------------------------------------
         */


        const client =
            extractClient(
                response,
                normalizedKyc
            );


        window.Page02Session.setClient(
            client
        );


        /* ---------------------------------------------------------------------
         * SUCCESS
         * ---------------------------------------------------------------------
         */


        showSuccess(
            'பதிவு வெற்றிகரமாக முடிந்தது.'
        );


        console.info(
            'CTM PATH™ Page 02A registration complete:',
            window.Page02Session.getClient()
        );


        /* ---------------------------------------------------------------------
         * NEXT PAGE
         * ---------------------------------------------------------------------
         */


        goToDimensionOne();


    }
    catch(error){


        console.error(
            'CTM PATH™ Page 02A registration error:',
            error
        );


        showError(
            (
                error &&
                error.message
            ) ||
            'பதிவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
        );


    }
    finally{


        setSubmitting(
            false
        );


    }

}


/* =============================================================================
 * FORM INPUT PERSISTENCE
 *
 * KYC is lightly preserved as the user types.
 * This protects against accidental refresh/navigation.
 *
 * =============================================================================
 */


function preserveFormDraft(){

    const form =
        getElement(
            DOM_IDS.kycForm
        );


    if(!form){

        return;

    }


    form.addEventListener(
        'input',
        function(){

            if(
                !window.Page02Session
            ){

                return;

            }


            window.Page02Session.setKyc(
                buildKyc()
            );

        }
    );

}


/* =============================================================================
 * BIND INTRO
 * =============================================================================
 */


function bindIntro(){

    const button =
        getElement(
            DOM_IDS.beginButton
        );


    if(!button){

        console.warn(
            'CTM PATH™ Page 02A: #beginButton not found.'
        );


        return;

    }


    button.addEventListener(
        'click',
        function(event){

            event.preventDefault();


            openKyc();

        }
    );

}


/* =============================================================================
 * BIND FORM
 * =============================================================================
 */


function bindForm(){

    const form =
        getElement(
            DOM_IDS.kycForm
        );


    if(!form){

        console.warn(
            'CTM PATH™ Page 02A: #kycForm not found.'
        );


        return;

    }


    form.addEventListener(
        'submit',
        handleKycSubmit
    );


    /* -------------------------------------------------------------------------
     * Defensive click binding.
     *
     * The form submit remains canonical, but this protects the journey if
     * markup accidentally gives the CTA type="button".
     * -------------------------------------------------------------------------
     */


    const submitButton =
        getElement(
            DOM_IDS.submitButton
        );


    if(
        submitButton &&
        String(
            submitButton.type
        ).toLowerCase() !==
            'submit'
    ){

        submitButton.addEventListener(
            'click',
            handleKycSubmit
        );

    }

}


/* =============================================================================
 * VERIFY DEPENDENCIES
 * =============================================================================
 */


function verifyDependencies(){

    const missing =
        [];


    if(
        !window.Page02Data
    ){

        missing.push(
            'Page02Data'
        );

    }


    if(
        !window.Page02Session
    ){

        missing.push(
            'Page02Session'
        );

    }


    if(
        !window.CTM_API ||
        typeof window.CTM_API.register !==
            'function'
    ){

        missing.push(
            'CTM_API.register'
        );

    }


    if(
        missing.length
    ){

        console.error(
            'CTM PATH™ Page 02A missing dependencies:',
            missing
        );


        return false;

    }


    return true;

}


/* =============================================================================
 * INITIAL SCREEN STATE
 * =============================================================================
 */


function initializeScreens(){

    const introScreen =
        getElement(
            DOM_IDS.introScreen
        );


    const kycScreen =
        getElement(
            DOM_IDS.kycScreen
        );


    /*
     * Start with intro visible.
     *
     * Existing KYC values are restored but the user still intentionally
     * enters the scorecard journey through the intro CTA.
     */


    showElement(
        introScreen
    );


    hideElement(
        kycScreen
    );

}


/* =============================================================================
 * INITIALIZE
 * =============================================================================
 */


function init(){

    console.info(
        'CTM PATH™ Page 02A initializing...'
    );


    if(
        !verifyDependencies()
    ){

        showError(
            'CTM PATH™ journey could not be initialized.'
        );


        return;

    }


    clearMessages();


    initializeScreens();


    restoreKyc();


    bindIntro();


    bindForm();


    preserveFormDraft();


    console.info(
        'CTM PATH™ Page 02A ready.',
        window.Page02Session.getSummary()
    );

}


/* =============================================================================
 * DOM READY
 * =============================================================================
 */


if(
    document.readyState ===
    'loading'
){

    document.addEventListener(
        'DOMContentLoaded',
        init
    );

}
else{

    init();

}


/* =============================================================================
 * PUBLIC PAGE CONTROLLER
 *
 * Useful for QA from browser console.
 * =============================================================================
 */


window.Page02A = {

    version:
        '3.0',

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
        goToDimensionOne

};


/* =============================================================================
 * END
 * =============================================================================
 *
 * REQUIRED SCRIPT ORDER IN page02a.html:
 *
 *      <script src="../js/api.js"></script>
 *
 *      <script src="../js/page02/page02-data.js"></script>
 *
 *      <script src="../js/page02/page02-session.js"></script>
 *
 *      <script src="../js/page02/page02a.js"></script>
 *
 * JOURNEY:
 *
 *      PAGE 02A
 *      Intro
 *        ↓
 *      KYC
 *        ↓
 *      CTM_API.register()
 *        ↓
 *      Page02Session.setClient()
 *        ↓
 *      Page02Session.setKyc()
 *        ↓
 *      page02b.html
 *
 * NEXT FILE:
 *
 *      pages/page02a.html
 *
 * =============================================================================
 */


})(window, document);

