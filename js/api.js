
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : api.js
   Version     : 6.0
   Status      : PRODUCTION
   Purpose     : Google Apps Script Communication Layer

   Owns
   --------------------------------------------------------------------------
   • Google Apps Script Communication
   • HTTP Requests
   • JSON Serialization
   • Request Validation
   • Response Validation
   • Error Handling
   • Retry Support
   • API Logging

   Owns NO
   --------------------------------------------------------------------------
   • DOM Manipulation
   • Business Logic
   • Navigation
   • Rendering
   • Calculations

   ========================================================================== */

'use strict';

/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   API SERVICE
   ========================================================================== */

CTM.API = (function () {

    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        WEBAPP_URL:
            'https://script.google.com/macros/s/AKfycby1yF2m7cIXnHh0SqfegiDuxsjdMX6PVcTaSogQ5HFqx3z5CGB3jjN0vCFvQuPV5sBCIw/exec',

        TIMEOUT: 30000,

        RETRIES: 2,

        RETRY_DELAY: 1000,

        CONTENT_TYPE: 'application/json'

    };

    /* ======================================================================
       ACTIONS

       MUST MATCH CONFIG.ACTIONS
       INSIDE GOOGLE APPS SCRIPT

       ====================================================================== */

    const ACTIONS = {

        REGISTER_VISITOR: 'registerVisitor',

        UPDATE_VISITOR: 'updateVisitor',

        GET_VISITOR: 'getVisitor',

        SAVE_ASSESSMENT: 'saveAssessment',

        SAVE_KALA_CHAKRA: 'saveKalaChakra',

        SAVE_DIAGNOSIS: 'saveDiagnosis',

        SAVE_PRESCRIPTION: 'savePrescription',

        COMPLETE_JOURNEY: 'completeJourney',

        PING: 'ping'

    };

    /* ======================================================================
       BUILD URL

       Router.gs expects

       ?action=registerVisitor

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

    async function fetchWithTimeout(url, options) {

        const controller = new AbortController();

        const timeout = setTimeout(function () {

            controller.abort();

        }, CONFIG.TIMEOUT);

        try {

            const response = await fetch(

                url,

                {

                    ...options,

                    signal: controller.signal

                }

            );

            clearTimeout(timeout);

            return response;

        }

        catch (error) {

            clearTimeout(timeout);

            throw error;

        }

    }

    /* ======================================================================
       CORE HTTP POST

       Router.gs expects

       POST
       ?action=xxxx

       BODY

       {
          fullName:"",
          email:"",
          ...
       }

       NO WRAPPER OBJECT

       ====================================================================== */

    async function post(action, payload) {

        const url = buildUrl(action);

        logRequest(action, payload);

        try {

            const response = await fetchWithTimeout(

                url,

                {

                    method: 'POST',

                    headers: {

                        'Content-Type':

                            CONFIG.CONTENT_TYPE

                    },

                    body: JSON.stringify(payload || {})

                }

            );

            if (!response.ok) {

                throw new Error(

                    'HTTP ' +

                    response.status

                );

            }

            const result =

                await response.json();

            validateResponse(result);

            logResponse(

                action,

                result

            );

            return result;

        }

        catch (error) {

            logError(

                action,

                error

            );

            return {

                success: false,

                message:

                    error.message,

                data: null

            };

        }

    }

    /* ======================================================================
       CORE HTTP GET
       ====================================================================== */

    async function get(action, parameters) {

        const query =

            new URLSearchParams(

                parameters || {}

            );

        const url =

            buildUrl(action) +

            '&' +

            query.toString();

        try {

            const response =

                await fetchWithTimeout(

                    url,

                    {

                        method: 'GET'

                    }

                );

            if (!response.ok) {

                throw new Error(

                    'HTTP ' +

                    response.status

                );

            }

            const result =

                await response.json();

            validateResponse(result);

            return result;

        }

        catch (error) {

            logError(

                action,

                error

            );

            return {

                success: false,

                message:

                    error.message,

                data: null

            };

        }

    }

    /* ======================================================================
       RESPONSE VALIDATION
       ====================================================================== */

    function validateResponse(result) {

        if (!result) {

            throw new Error(

                'Empty response.'

            );

        }

        if (

            typeof result !== 'object'

        ) {

            throw new Error(

                'Invalid JSON response.'

            );

        }

        return true;

    }

    /* ======================================================================
       LOGGING
       ====================================================================== */

    function logRequest(action, payload) {

        console.groupCollapsed(

            '[CTM API] ' + action

        );

        console.log(

            'Request',

            payload

        );

        console.groupEnd();

    }

    function logResponse(action, response) {

        console.groupCollapsed(

            '[CTM API Response] ' + action

        );

        console.log(response);

        console.groupEnd();

    }

    function logError(action, error) {

        console.groupCollapsed(

            '[CTM API Error] ' + action

        );

        console.error(error);

        console.groupEnd();

    }

               /* ======================================================================
       VISITOR REGISTRATION
       ====================================================================== */

    async function registerVisitor(visitor) {

        if (!visitor) {

            return {

                success: false,

                message: 'Visitor payload missing.'

            };

        }

        return await post(

            ACTIONS.REGISTER_VISITOR,

            visitor

        );

    }

    /* ======================================================================
       UPDATE VISITOR
       ====================================================================== */

    async function updateVisitor(visitor) {

        if (

            !visitor ||

            !visitor.visitorId

        ) {

            return {

                success: false,

                message: 'Visitor ID required.'

            };

        }

        return await post(

            ACTIONS.UPDATE_VISITOR,

            visitor

        );

    }

    /* ======================================================================
       GET VISITOR
       ====================================================================== */

    async function getVisitor(visitorId) {

        if (!visitorId) {

            return {

                success: false,

                message: 'Visitor ID required.'

            };

        }

        return await get(

            ACTIONS.GET_VISITOR,

            {

                visitorId: visitorId

            }

        );

    }

    /* ======================================================================
       SAVE ASSESSMENT
       ====================================================================== */

    async function saveAssessment(data) {

        return await post(

            ACTIONS.SAVE_ASSESSMENT,

            data || {}

        );

    }

    /* ======================================================================
       SAVE KALA CHAKRA
       ====================================================================== */

    async function saveKalaChakra(data) {

        return await post(

            ACTIONS.SAVE_KALA_CHAKRA,

            data || {}

        );

    }

    /* ======================================================================
       SAVE DIAGNOSIS
       ====================================================================== */

    async function saveDiagnosis(data) {

        return await post(

            ACTIONS.SAVE_DIAGNOSIS,

            data || {}

        );

    }

    /* ======================================================================
       SAVE PRESCRIPTION
       ====================================================================== */

    async function savePrescription(data) {

        return await post(

            ACTIONS.SAVE_PRESCRIPTION,

            data || {}

        );

    }

    /* ======================================================================
       COMPLETE JOURNEY
       ====================================================================== */

    async function completeJourney(data) {

        return await post(

            ACTIONS.COMPLETE_JOURNEY,

            data || {}

        );

    }

    /* ======================================================================
       HEALTH CHECK
       ====================================================================== */

    async function ping() {

        return await get(

            ACTIONS.PING,

            {}

        );

    }

    /* ======================================================================
       RESPONSE HELPERS
       ====================================================================== */

    function isSuccess(response) {

        return !!(

            response &&

            response.success === true

        );

    }

    function getMessage(response) {

        if (!response) {

            return '';

        }

        return response.message || '';

    }

    function getData(response) {

        if (!response) {

            return null;

        }

        return response.data || null;

    }

    /* ======================================================================
       SIMPLE RETRY WRAPPER
       ====================================================================== */

    async function retry(action, payload) {

        let attempt = 0;

        let lastResult = null;

        while (

            attempt <= CONFIG.RETRIES

        ) {

            lastResult =

                await post(

                    action,

                    payload

                );

            if (

                isSuccess(lastResult)

            ) {

                return lastResult;

            }

            attempt++;

            await new Promise(function(resolve){

                setTimeout(

                    resolve,

                    CONFIG.RETRY_DELAY

                );

            });

        }

        return lastResult;

    }

               /* ======================================================================
       PUBLIC INTERFACE
       ====================================================================== */

    const API = {

        registerVisitor,

        updateVisitor,

        getVisitor,

        saveAssessment,

        saveKalaChakra,

        saveDiagnosis,

        savePrescription,

        completeJourney,

        ping,

        retry,

        isSuccess,

        getMessage,

        getData

    };

    return API;

})();

/* ==========================================================================
   BACKWARD COMPATIBILITY

   Existing frontend modules (registration.js, assessment.js, etc.)
   currently call:

       window.ApiService.registerVisitor(...)

   Expose the new API through the legacy namespace without requiring
   changes to existing screens.

   ========================================================================== */

window.ApiService = CTM.API;

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

(function initializeAPI() {

    console.info(
        '=================================================='
    );

    console.info(
        'CTM PATH™ API Layer Initialised'
    );

    console.info(
        'Version : 6.0'
    );

    console.info(
        'Status  : READY'
    );

    console.info(
        'Backend : Google Apps Script'
    );

    console.info(
        '=================================================='
    );

})();

/* ==========================================================================
   CONNECTION TEST
   ========================================================================== */

CTM.API.testConnection = async function () {

    console.group(

        'CTM API Connection Test'

    );

    try {

        const response =

            await CTM.API.ping();

        console.log(

            response

        );

        return response;

    }

    catch (error) {

        console.error(

            error

        );

        return {

            success: false,

            message: error.message

        };

    }

    finally {

        console.groupEnd();

    }

};

/* ==========================================================================
   VERSION INFORMATION
   ========================================================================== */

Object.defineProperty(

    CTM.API,

    'VERSION',

    {

        value: '6.0',

        enumerable: true,

        writable: false,

        configurable: false

    }

);

Object.defineProperty(

    CTM.API,

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
   ========================================================================== */

/*
   Freeze the public API surface so that application modules cannot
   accidentally overwrite API methods at runtime.
*/

Object.freeze(CTM.API);

/* ==========================================================================
   DEVELOPMENT HELPERS
   ========================================================================== */

/**
 * Print API information.
 */

CTM.API.info = function () {

    console.group('CTM PATH™ API');

    console.table({

        Version: CTM.API.VERSION,

        Build: CTM.API.BUILD,

        Backend: 'Google Apps Script',

        Status: 'Production',

        Compatibility: 'ApiService + CTM.API'

    });

    console.groupEnd();

};

/**
 * Display configured endpoint.
 */

CTM.API.endpoint = function () {

    console.log(

        'Web App URL:',

        CONFIG.WEBAPP_URL

    );

};

/**
 * Verify API availability.
 */

CTM.API.ready = function () {

    return (

        typeof window.ApiService !== 'undefined' &&

        typeof window.ApiService.registerVisitor === 'function'

    );

};

/* ==========================================================================
   GLOBAL ERROR HANDLER
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
   STARTUP VERIFICATION
   ========================================================================== */

(function verifyStartup() {

    if (CTM.API.ready()) {

        console.info(

            '✓ ApiService compatibility enabled.'

        );

    } else {

        console.warn(

            '⚠ ApiService compatibility not available.'

        );

    }

})();

/* ==========================================================================
   END OF FILE

   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : js/api.js
   Version     : 6.0
   Status      : PRODUCTION

   Responsibilities
   --------------------------------------------------------------------------
   ✓ Google Apps Script Communication
   ✓ GET / POST Requests
   ✓ Registration API
   ✓ Visitor Retrieval
   ✓ Assessment Saving
   ✓ Kala Chakra Saving
   ✓ Diagnosis Saving
   ✓ Prescription Saving
   ✓ Journey Completion
   ✓ Logging
   ✓ Retry Support
   ✓ Response Validation
   ✓ Backward Compatibility

   Compatibility
   --------------------------------------------------------------------------
   Legacy Code

       window.ApiService.registerVisitor()

   Modern Code

       CTM.API.registerVisitor()

   Both interfaces point to the same implementation.

   ========================================================================== */
