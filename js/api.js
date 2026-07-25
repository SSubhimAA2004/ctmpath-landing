
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : js/api.js
   Version     : 7.1
   Status      : PRODUCTION
   Author      : CTM PATH Engineering

   Purpose
   --------------------------------------------------------------------------
   Central communication layer between the Frontend and
   Google Apps Script backend.

   Responsibilities

   ✓ HTTP GET
   ✓ HTTP POST
   ✓ Visitor Registration
   ✓ Visitor Retrieval
   ✓ Assessment Save
   ✓ Kala Chakra Save
   ✓ Journey Completion
   ✓ Diagnosis
   ✓ Prescription
   ✓ Response Validation
   ✓ Retry
   ✓ Logging

   Does NOT

   ✗ Manipulate DOM
   ✗ Navigate Pages
   ✗ Business Logic
   ✗ Local Storage
   ✗ Rendering

========================================================================== */

'use strict';

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   API MODULE
========================================================================== */

(function () {

    const CONFIG = {

        WEBAPP_URL:
            'https://script.google.com/macros/s/AKfycby1yF2m7cIXnHh0SqfegiDuxsjdMX6PVcTaSogQ5HFqx3z5CGB3jjN0vCFvQuPV5sBCIw/exec',

        CONTENT_TYPE:
            'application/json',

        TIMEOUT:
            30000,

        RETRIES:
            2,

        RETRY_DELAY:
            1000

    };

    /* ======================================================================
       ACTION CONSTANTS

       MUST MATCH

       CONFIG.ACTIONS

       INSIDE 01_Config.gs

    ====================================================================== */

    const ACTION = {

        REGISTER_VISITOR:
            'registerVisitor',

        UPDATE_VISITOR:
            'updateVisitor',

        GET_VISITOR:
            'getVisitor',

        SAVE_ASSESSMENT:
            'saveAssessment',

        SAVE_KALA_CHAKRA:
            'saveKalaChakra',

        SAVE_DIAGNOSIS:
            'saveDiagnosis',

        SAVE_PRESCRIPTION:
            'savePrescription',

        COMPLETE_JOURNEY:
            'completeJourney',

        PING:
            'ping'

    };

    /* ======================================================================
       BUILD URL

       Example

       https://xxxxx/exec?action=registerVisitor

    ====================================================================== */

    function buildUrl(action) {

        return (

            CONFIG.WEBAPP_URL +

            '?action=' +

            encodeURIComponent(action)

        );

    }

    /* ======================================================================
       FETCH WITH TIMEOUT

    ====================================================================== */

    async function fetchWithTimeout(

        url,

        options = {}

    ) {

        const controller =

            new AbortController();

        const timer =

            setTimeout(

                function () {

                    controller.abort();

                },

                CONFIG.TIMEOUT

            );

           try {

            const response =

                await fetch(

                    url,

                    {

                        ...options,

                        signal:

                            controller.signal

                    }

                );

            clearTimeout(

                timer

            );

            return response;

        }

        catch (error) {

            clearTimeout(

                timer

            );

            throw error;

        }

    }

    /* ======================================================================
       HTTP POST

       Google Apps Script expects

       POST

       /exec?action=registerVisitor

       BODY

       {
           fullName,
           email,
           mobile,
           district,
           state,
           source,
           language,
           device,
           emotion
       }

    ====================================================================== */

    async function post(

        action,

        payload = {}

    ) {

        const url =

            buildUrl(

                action

            );

        try {

            console.groupCollapsed(

                '[CTM API] ' +

                action

            );

            console.log(

                'POST',

                url

            );

            console.log(

                'Payload',

                payload

            );

            const response =

                await fetchWithTimeout(

                    url,

                    {

                        method:

                            'POST',

                        headers: {

                            'Content-Type':

                                CONFIG.CONTENT_TYPE

                        },

                        body:

                            JSON.stringify(

                                payload

                            )

                    }

                );

            if (

                !response.ok

            ) {

                throw new Error(

                    'HTTP ' +

                    response.status

                );

            }

            const result =

                await response.json();

                   validateResponse(

                result

            );

            console.log(

                'Response',

                result

            );

            console.groupEnd();

            return result;

        }

        catch (error) {

            console.groupEnd();

            console.error(

                '[CTM API]',

                error

            );

            return {

                success: false,

                message:

                    error.message ||

                    'Unknown API error.',

                data: null

            };

        }

    }

    /* ======================================================================
       HTTP GET

       Used For

       • ping()
       • getVisitor()

    ====================================================================== */

    async function get(

        action,

        parameters = {}

    ) {

        const query =

            new URLSearchParams(

                parameters

            );

        const url =

            buildUrl(

                action

            ) +

            '&' +

            query.toString();

        try {

            console.groupCollapsed(

                '[CTM API] ' +

                action

            );

            console.log(

                'GET',

                url

            );

            const response =

                await fetchWithTimeout(

                    url,

                    {

                        method:

                            'GET'

                    }

                );

            if (

                !response.ok

            ) {

                throw new Error(

                    'HTTP ' +

                    response.status

                );

            }

            const result =

                await response.json();

            validateResponse(

                result

            );

            console.log(

                'Response',

                result

            );

            console.groupEnd();

            return result;

        }

        catch (error) {

            console.groupEnd();

            console.error(

                '[CTM API]',

                error

            );

            return {

                success: false,

                message:

                    error.message ||

                    'Unknown API error.',

                data: null

            };

        }

    }

    /* ======================================================================
       RESPONSE VALIDATION

    ====================================================================== */

    function validateResponse(

        response

    ) {

        if (

            response === null ||

            response === undefined

        ) {

            throw new Error(

                'Empty server response.'

            );

        }

        if (

            typeof response !== 'object'

        ) {

            throw new Error(

                'Invalid JSON response.'

            );

        }

        return true;

    }

     /* ======================================================================
       REGISTER VISITOR

       Payload

       {
           fullName,
           email,
           mobile,
           district,
           state,
           source,
           language,
           device,
           emotion
       }

    ====================================================================== */

    async function registerVisitor(data) {

        if (!data) {

            return {

                success: false,

                message:

                    'Registration data missing.'

            };

        }

        return await post(

            ACTION.REGISTER_VISITOR,

            data

        );

    }

    /* ======================================================================
       UPDATE VISITOR

    ====================================================================== */

    async function updateVisitor(data) {

        if (

            !data ||

            !data.visitorId

        ) {

            return {

                success: false,

                message:

                    'Visitor ID missing.'

            };

        }

        return await post(

            ACTION.UPDATE_VISITOR,

            data

        );

    }

    /* ======================================================================
       GET VISITOR

    ====================================================================== */

    async function getVisitor(

        visitorId

    ) {

        if (

            !visitorId

        ) {

            return {

                success: false,

                message:

                    'Visitor ID missing.'

            };

        }

        return await get(

            ACTION.GET_VISITOR,

            {

                visitorId:

                    visitorId

            }

        );

    }

    /* ======================================================================
       SAVE ASSESSMENT

    ====================================================================== */

    async function saveAssessment(data) {

        return await post(

            ACTION.SAVE_ASSESSMENT,

            data || {}

        );

    }

    /* ======================================================================
       SAVE KALA CHAKRA

    ====================================================================== */

    async function saveKalaChakra(data) {

        return await post(

            ACTION.SAVE_KALA_CHAKRA,

            data || {}

        );

    }

     /* ======================================================================
       SAVE DIAGNOSIS
    ====================================================================== */

    async function saveDiagnosis(data) {

        return await post(

            ACTION.SAVE_DIAGNOSIS,

            data || {}

        );

    }

    /* ======================================================================
       SAVE PRESCRIPTION
    ====================================================================== */

    async function savePrescription(data) {

        return await post(

            ACTION.SAVE_PRESCRIPTION,

            data || {}

        );

    }

    /* ======================================================================
       COMPLETE JOURNEY
    ====================================================================== */

    async function completeJourney(data) {

        return await post(

            ACTION.COMPLETE_JOURNEY,

            data || {}

        );

    }

    /* ======================================================================
       PING

       Used during startup to verify backend connectivity.

    ====================================================================== */

    async function ping() {

        return await get(

            ACTION.PING,

            {}

        );

    }

    /* ======================================================================
       SAFE REQUEST

       Executes an async API callback safely and always returns
       a standardized response object.

    ====================================================================== */

    async function safeRequest(callback) {

        try {

            return await callback();

        }

        catch (error) {

            console.error(

                '[CTM API] Safe Request',

                error

            );

            return {

                success: false,

                message:

                    error.message ||

                    'Unexpected API error.',

                data: null

            };

        }

    }

    /* ======================================================================
       RESPONSE HELPERS
    ====================================================================== */

    function isSuccess(response) {

        return (

            response &&

            response.success === true

        );

    }

    function getData(response) {

        return (

            response &&

            response.data

        )

        ? response.data

        : null;

    }

    function getMessage(response) {

        return (

            response &&

            response.message

        )

        ? response.message

        : '';

    }

     /* ======================================================================
       RETRY

       Retries a POST request on transient failures.

    ====================================================================== */

    async function retry(action, payload, maxRetries = CONFIG.RETRIES) {

        let attempt = 0;

        let response = null;

        while (attempt <= maxRetries) {

            response = await post(

                action,

                payload

            );

            if (

                response &&

                response.success === true

            ) {

                return response;

            }

            attempt++;

            if (attempt <= maxRetries) {

                await new Promise(

                    resolve =>

                        setTimeout(

                            resolve,

                            CONFIG.RETRY_DELAY

                        )

                );

            }

        }

        return response;

    }

    /* ======================================================================
       PUBLIC API

    ====================================================================== */

    const API = {

        /* --------------------------------------------------------------
           Visitor
        -------------------------------------------------------------- */

        registerVisitor,

        updateVisitor,

        getVisitor,

        /* --------------------------------------------------------------
           Assessment
        -------------------------------------------------------------- */

        saveAssessment,

        saveKalaChakra,

        saveDiagnosis,

        savePrescription,

        completeJourney,

        /* --------------------------------------------------------------
           Utilities
        -------------------------------------------------------------- */

        ping,

        safeRequest,

        retry,

        isSuccess,

        getData,

        getMessage

    };

    /* ======================================================================
       DIAGNOSTICS

    ====================================================================== */

    API.info = function () {

        console.group(

            'CTM PATH™ API'

        );

        console.table({

            Version: '7.1',

            Backend:

                'Google Apps Script',

            Status:

                'Production',

            Ready:

                API.ready()

        });

        console.groupEnd();

    };

    API.ready = function () {

        return (

            typeof API.registerVisitor === 'function'

        );

    };

    API.testConnection = async function () {

        return await safeRequest(

            function () {

                return ping();

            }

        );

    };

    return API;

})();

/* ==========================================================================
   GLOBAL EXPORTS
   ========================================================================== */

window.CTM.API = API;

window.ApiService = window.CTM.API;

/* ==========================================================================
   VERSION INFORMATION
   ========================================================================== */

Object.defineProperty(

    window.CTM.API,

    'VERSION',

    {

        value: '7.1',

        enumerable: true,

        writable: false,

        configurable: false

    }

);

Object.defineProperty(

    window.CTM.API,

    'BUILD',

    {

        value: '2026.07.25',

        enumerable: true,

        writable: false,

        configurable: false

    }

);

/* ==========================================================================
   PRODUCTION HARDENING

   Freeze AFTER all properties and helper methods have been attached.

   ========================================================================== */

Object.freeze(

    window.CTM.API

);

/* ==========================================================================
   GLOBAL ERROR LOGGING

   ========================================================================== */

window.addEventListener(

    'unhandledrejection',

    function (event) {

        console.error(

            '[CTM API] Unhandled Promise Rejection',

            event.reason

        );

    }

);

window.addEventListener(

    'error',

    function (event) {

        console.error(

            '[CTM API] JavaScript Error',

            event.error || event.message

        );

    }

);

/* ==========================================================================
   STARTUP

   ========================================================================== */

(function () {

    console.info(

        '========================================================'

    );

    console.info(

        'CTM PATH™ API INITIALIZED'

    );

    console.info(

        'Version :',

        window.CTM.API.VERSION

    );

    console.info(

        'Build   :',

        window.CTM.API.BUILD

    );

    console.info(

        'Backend : Google Apps Script'

    );

    console.info(

        'Status  : READY'

    );

    console.info(

        '========================================================'

    );

    if (

        window.CTM.API.ready()

    ) {

        console.info(

            '✓ ApiService Ready'

        );

    }

    else {

        console.warn(

            '⚠ ApiService Not Ready'

        );

    }

})();

