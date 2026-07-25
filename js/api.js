
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : js/api.js
   Version     : 2.0
   Status      : Production
   Purpose     : Google Apps Script API Layer

   Responsibilities
   ----------------
   • Backend Communication
   • HTTP Requests
   • Request Validation
   • Response Validation
   • Error Handling

   Does NOT
   --------
   • Manipulate UI
   • Navigate Pages
   • Calculate Scores
   • Modify Application State

========================================================================== */

'use strict';

/* ==========================================================================
   CTM Namespace
========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   API Module
========================================================================== */

CTM.API = (() => {

    /* ======================================================================
       Configuration
    ====================================================================== */

    const CONFIG = {

        WEBAPP_URL:
            'https://script.google.com/macros/s/AKfycby1yF2m7cIXnHh0SqfegiDuxsjdMX6PVcTaSogQ5HFqx3z5CGB3jjN0vCFvQuPV5sBCIw/exec',

        TIMEOUT: 30000,

        CONTENT_TYPE: 'text/plain;charset=utf-8'
    };

    /* ======================================================================
       Utility
    ====================================================================== */

    function buildEnvelope(action, payload = {}) {

        return {

            action,

            timestamp: new Date().toISOString(),

            payload

        };

    }

    /* ======================================================================
       Timeout Wrapper
    ====================================================================== */

    async function fetchWithTimeout(resource, options = {}) {

        const controller = new AbortController();

        const id = setTimeout(() => {

            controller.abort();

        }, CONFIG.TIMEOUT);

        try {

            const response = await fetch(resource, {

                ...options,

                signal: controller.signal

            });

            clearTimeout(id);

            return response;

        }

        catch (error) {

            clearTimeout(id);

            throw error;

        }

    }

    /* ======================================================================
       Core POST Request
    ====================================================================== */

    async function post(action, payload = {}) {

        try {

            const requestBody = buildEnvelope(action, payload);

            console.groupCollapsed(
                `[CTM API] ${action}`
            );

            console.log(
                'Request',
                requestBody
            );

            const response = await fetchWithTimeout(

                CONFIG.WEBAPP_URL,

                {

                    method: 'POST',

                    headers: {

                        'Content-Type': CONFIG.CONTENT_TYPE

                    },

                    body: JSON.stringify(requestBody)

                }

            );

            if (!response.ok) {

                throw new Error(

                    `HTTP ${response.status}`

                );

            }

            const result = await response.json();

            console.log(

                'Response',

                result

            );

            console.groupEnd();

            validateResponse(result);

            return result;

        }

        catch (error) {

            console.error(

                '[CTM API ERROR]',

                error

            );

            return {

                success: false,

                message: error.message,

                data: null

            };

        }

    }

    /* ======================================================================
       Response Validator
    ====================================================================== */

    function validateResponse(result) {

        if (!result) {

            throw new Error(

                'Empty server response.'

            );

        }

        if (typeof result !== 'object') {

            throw new Error(

                'Invalid response format.'

            );

        }

        return true;

    }

               /* ======================================================================
       Visitor Registration
    ====================================================================== */

    async function registerVisitor(visitor) {

        if (!visitor) {

            return {

                success: false,

                message: 'Visitor object is missing.'

            };

        }

        return await post(

            'registerVisitor',

            visitor

        );

    }

    /* ======================================================================
       Update Visitor Profile
    ====================================================================== */

    async function updateVisitor(visitor) {

        if (!visitor || !visitor.visitorId) {

            return {

                success: false,

                message: 'Visitor ID missing.'

            };

        }

        return await post(

            'updateVisitor',

            visitor

        );

    }

    /* ======================================================================
       Save Registration Progress
    ====================================================================== */

    async function saveRegistration(data) {

        return await post(

            'saveRegistration',

            data

        );

    }

    /* ======================================================================
       Save Current Journey State
    ====================================================================== */

    async function saveJourneyState(state) {

        return await post(

            'saveJourneyState',

            state

        );

    }

    /* ======================================================================
       Save Assessment Response
    ====================================================================== */

    async function saveAssessment(data) {

        return await post(

            'saveAssessment',

            data

        );

    }

    /* ======================================================================
       Autosave
    ====================================================================== */

    async function autosave(data) {

        return await post(

            'autosave',

            data

        );

    }

    /* ======================================================================
       Save Kala Chakra
    ====================================================================== */

    async function saveKalaChakra(data) {

        return await post(

            'saveKalaChakra',

            data

        );

    }

    /* ======================================================================
       Generate Diagnosis
    ====================================================================== */

    async function generateDiagnosis(data) {

        return await post(

            'generateDiagnosis',

            data

        );

    }

    /* ======================================================================
       Generate Prescription
    ====================================================================== */

    async function generatePrescription(data) {

        return await post(

            'generatePrescription',

            data

        );

    }

    /* ======================================================================
       Mark Journey Complete
    ====================================================================== */

    async function completeJourney(data) {

        return await post(

            'completeJourney',

            data

        );

    }

    /* ======================================================================
       Load Visitor
    ====================================================================== */

    async function getVisitor(visitorId) {

        return await post(

            'getVisitor',

            {

                visitorId

            }

        );

    }

    /* ======================================================================
       Resume Journey
    ====================================================================== */

    async function resumeJourney(visitorId) {

        return await post(

            'resumeJourney',

            {

                visitorId

            }

        );

    }

    /* ======================================================================
       Health Check
    ====================================================================== */

    async function ping() {

        return await post(

            'ping',

            {}

        );

    }

               /* ======================================================================
       Response Helpers
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
       Retry Helper
    ====================================================================== */

    async function retry(action, payload = {}, attempts = 3) {

        let lastError = null;

        for (let i = 1; i <= attempts; i++) {

            try {

                const result = await post(action, payload);

                if (isSuccess(result)) {

                    return result;

                }

                lastError = result;

            }

            catch (error) {

                lastError = error;

            }

            console.warn(

                `[CTM API] Retry ${i}/${attempts} for ${action}`

            );

            await delay(1000);

        }

        return {

            success: false,

            message:

                lastError?.message ||

                'Request failed after multiple attempts.',

            data: null

        };

    }

    /* ======================================================================
       Delay Utility
    ====================================================================== */

    function delay(milliseconds) {

        return new Promise(resolve => {

            setTimeout(

                resolve,

                milliseconds

            );

        });

    }

    /* ======================================================================
       Logging
    ====================================================================== */

    function logRequest(action, payload) {

        console.groupCollapsed(

            `[CTM API Request] ${action}`

        );

        console.log(

            'Payload',

            payload

        );

        console.groupEnd();

    }

    function logResponse(action, response) {

        console.groupCollapsed(

            `[CTM API Response] ${action}`

        );

        console.log(response);

        console.groupEnd();

    }

    function logError(action, error) {

        console.groupCollapsed(

            `[CTM API Error] ${action}`

        );

        console.error(error);

        console.groupEnd();

    }

    /* ======================================================================
       Public Interface
    ====================================================================== */

    return {

        registerVisitor,

        updateVisitor,

        saveRegistration,

        saveJourneyState,

        saveAssessment,

        autosave,

        saveKalaChakra,

        generateDiagnosis,

        generatePrescription,

        completeJourney,

        getVisitor,

        resumeJourney,

        ping,

        retry,

        isSuccess,

        getMessage,

        getData

    };

})();

/* ==========================================================================
   Production Bootstrap
========================================================================== */

/**
 * Initialise API module.
 * Safe to call multiple times.
 */
(function initialiseAPI() {

    console.info(
        '========================================='
    );
    console.info(
        'CTM PATH™ API Layer Initialised'
    );
    console.info(
        'Version : 2.0'
    );
    console.info(
        'Backend : Google Apps Script'
    );
    console.info(
        'Status  : Ready'
    );
    console.info(
        '========================================='
    );

})();

/* ==========================================================================
   Development Utilities
   (Safe to remove in production if desired)
========================================================================== */

CTM.API.testConnection = async function () {

    console.group('CTM API Test');

    try {

        const result = await CTM.API.ping();

        if (CTM.API.isSuccess(result)) {

            console.info(
                '✓ Backend connection successful.'
            );

            console.table(result);

        } else {

            console.warn(
                '⚠ Backend responded with an error.'
            );

            console.table(result);

        }

        return result;

    } catch (error) {

        console.error(
            '✗ Backend connection failed.'
        );

        console.error(error);

        return {

            success: false,

            message: error.message

        };

    } finally {

        console.groupEnd();

    }

};

/* ==========================================================================
   Version Information
========================================================================== */

Object.freeze(

    CTM.API

);

Object.defineProperty(

    CTM.API,

    'VERSION',

    {

        value: '2.0',

        writable: false,

        enumerable: true,

        configurable: false

    }

);

Object.defineProperty(

    CTM.API,

    'BUILD',

    {

        value: '2026.07.25',

        writable: false,

        enumerable: true,

        configurable: false

    }

);

/* ==========================================================================
   End of File
========================================================================== */

/*

CTM PATH™ Guided Journey

File:
js/api.js

Responsibilities
----------------
✓ Google Apps Script Communication
✓ Request Validation
✓ Response Validation
✓ Retry Logic
✓ Error Handling
✓ JSON Transport

Does NOT
---------
✗ Manipulate HTML
✗ Manipulate CSS
✗ Calculate Scores
✗ Navigate Screens
✗ Update UI

Single Responsibility:
API Communication Only

Status:
READY FOR PRODUCTION

*/

