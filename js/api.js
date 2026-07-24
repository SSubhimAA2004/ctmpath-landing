
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : api.js
   Version     : 1.0
   Status      : 🔒 LOCKED
   Purpose     : API Service Layer

                  Owns
                  • Google Apps Script Communication
                  • HTTP Requests
                  • Response Processing
                  • Error Handling
                  • Request Validation

                  Owns NO
                  • UI Rendering
                  • DOM Manipulation
                  • Assessment Logic
                  • Business Rules
   ========================================================================== */

'use strict';

/* ==========================================================================
   API SERVICE
   ========================================================================== */

const ApiService = (() => {

    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        WEB_APP_URL: '',

        TIMEOUT: 30000,

        HEADERS: {

            'Content-Type': 'application/json'

        }

    };

    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    function setWebAppUrl(url) {

        CONFIG.WEB_APP_URL = url;

    }

    function getWebAppUrl() {

        return CONFIG.WEB_APP_URL;

    }

    /* ======================================================================
       REQUEST VALIDATION
       ====================================================================== */

    function validateEndpoint(endpoint) {

        if (!endpoint || typeof endpoint !== 'string') {

            throw new Error('Invalid API endpoint.');

        }

    }

    function validatePayload(payload) {

        if (payload === undefined || payload === null) {

            return {};

        }

        return payload;

    }

    /* ======================================================================
       BUILD URL
       ====================================================================== */

    function buildUrl(endpoint) {

        validateEndpoint(endpoint);

        return `${CONFIG.WEB_APP_URL}?action=${encodeURIComponent(endpoint)}`;

    }

    /* ======================================================================
       FETCH WITH TIMEOUT
       ====================================================================== */

    async function fetchWithTimeout(url, options) {

        const controller = new AbortController();

        const timeout = setTimeout(() => {

            controller.abort();

        }, CONFIG.TIMEOUT);

        try {

            const response = await fetch(url, {

                ...options,

                signal: controller.signal

            });

            clearTimeout(timeout);

            return response;

        }

        catch (error) {

            clearTimeout(timeout);

            throw error;

        }

    }

    /* ======================================================================
       HANDLE RESPONSE
       ====================================================================== */

    async function parseResponse(response) {

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        return await response.json();

    }

    /* ======================================================================
       POST
       ====================================================================== */

    async function post(endpoint, payload = {}) {

        validateEndpoint(endpoint);

        payload = validatePayload(payload);

        const response = await fetchWithTimeout(

            buildUrl(endpoint),

            {

                method: 'POST',

                headers: CONFIG.HEADERS,

                body: JSON.stringify(payload)

            }

        );

        return parseResponse(response);

    }

    /* ======================================================================
       GET
       ====================================================================== */

    async function get(endpoint) {

        validateEndpoint(endpoint);

        const response = await fetchWithTimeout(

            buildUrl(endpoint),

            {

                method: 'GET',

                headers: CONFIG.HEADERS

            }

        );

        return parseResponse(response);

    }

    /* ======================================================================
       REGISTER VISITOR
       ====================================================================== */

    async function registerVisitor(visitor) {

        return await post(

            'registerVisitor',

            visitor

        );

    }

    /* ======================================================================
       SAVE ASSESSMENT
       ====================================================================== */

    async function saveAssessment(data) {

        return await post(

            'saveAssessment',

            data

        );

    }

    /* ======================================================================
       SAVE KALA CHAKRA
       ====================================================================== */

    async function saveKalaChakra(data) {

        return await post(

            'saveKalaChakra',

            data

        );

    }

    /* ======================================================================
       SAVE DIAGNOSIS
       ====================================================================== */

    async function saveDiagnosis(data) {

        return await post(

            'saveDiagnosis',

            data

        );

    }

    /* ======================================================================
       SAVE PRESCRIPTION
       ====================================================================== */

    async function savePrescription(data) {

        return await post(

            'savePrescription',

            data

        );

    }

    /* ======================================================================
       COMPLETE JOURNEY
       ====================================================================== */

    async function completeJourney(data) {

        return await post(

            'completeJourney',

            data

        );

    }

    /* ======================================================================
       LOAD VISITOR
       ====================================================================== */

    async function getVisitor(visitorId) {

        return await get(

            `getVisitor&visitorId=${visitorId}`

        );

    }

    /* ======================================================================
       HEALTH CHECK
       ====================================================================== */

    async function ping() {

        return await get('ping');

    }

    /* ======================================================================
       SAFE REQUEST
       ====================================================================== */

    async function safeRequest(callback) {

        try {

            return {

                success: true,

                data: await callback()

            };

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                error: error.message

            };

        }

    }

    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        CONFIG,

        setWebAppUrl,
        getWebAppUrl,

        get,
        post,

        registerVisitor,

        saveAssessment,

        saveKalaChakra,

        saveDiagnosis,

        savePrescription,

        completeJourney,

        getVisitor,

        ping,

        safeRequest

    };

})();

/* ==========================================================================
   End of File

   File : api.js

   Status : 🔒 LOCKED
   ========================================================================== */
