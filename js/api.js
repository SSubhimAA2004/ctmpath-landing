
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : js/api.js
   Version     : 8.0
   Status      : PRODUCTION
   Architecture: LOCKED

   Responsibility
   --------------------------------------------------------------------------
   Single communication layer between the Frontend and
   Google Apps Script.

   UI Modules
          │
          ▼
      CTM.API
          │
          ▼
   Google Apps Script
          │
          ▼
   Google Sheets

   This file SHALL NOT
   -------------------
   ✗ Manipulate DOM
   ✗ Perform validation
   ✗ Contain business logic
   ✗ Access localStorage
   ✗ Navigate screens

========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   API MODULE
========================================================================== */

window.CTM.API = (function () {

    /* ======================================================================
       CONFIGURATION
    ====================================================================== */

    const CONFIG = {

        WEBAPP_URL:
            "https://script.google.com/macros/s/AKfycby1yF2m7cIXnHh0SqfegiDuxsjdMX6PVcTaSogQ5HFqx3z5CGB3jjN0vCFvQuPV5sBCIw/exec",

        TIMEOUT: 30000

    };

    /* ======================================================================
       BACKEND ACTIONS
    ====================================================================== */

    const ACTION = {

        REGISTER_VISITOR: "registerVisitor",

        UPDATE_VISITOR: "updateVisitor",

        GET_VISITOR: "getVisitor",

        SAVE_ASSESSMENT: "saveAssessment",

        SAVE_KALA_CHAKRA: "saveKalaChakra",

        SAVE_DIAGNOSIS: "saveDiagnosis",

        SAVE_PRESCRIPTION: "savePrescription",

        COMPLETE_JOURNEY: "completeJourney",

        PING: "ping"

    };

    /* ======================================================================
       BUILD URL
    ====================================================================== */

    function buildUrl(action) {

        return (
            CONFIG.WEBAPP_URL +
            "?action=" +
            encodeURIComponent(action)
        );

    }

    /* ======================================================================
       FETCH WITH TIMEOUT
    ====================================================================== */

    async function fetchWithTimeout(url, options = {}) {

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {

            controller.abort();

        }, CONFIG.TIMEOUT);

        try {

            const response = await fetch(url, {

                ...options,

                signal: controller.signal

            });

            clearTimeout(timeoutId);

            return response;

        } catch (error) {

            clearTimeout(timeoutId);

            throw error;

        }

    }

                      /* ======================================================================
       HTTP POST
    ====================================================================== */

    async function post(action, payload = {}) {

        const response = await fetchWithTimeout(

            buildUrl(action),

            {

                method: "POST",

headers: {
    "Content-Type": "text/plain;charset=utf-8"
},

                body: JSON.stringify(payload)

            }

        );

        if (!response.ok) {

            throw new Error(

                "HTTP " +

                response.status +

                " " +

                response.statusText

            );

        }

        const result = await response.json();

        if (typeof result !== "object" || result === null) {

            throw new Error(

                "Invalid JSON response from server."

            );

        }

        return result;

    }

    /* ======================================================================
       HTTP GET
    ====================================================================== */

    async function get(action, params = {}) {

        const url = new URL(

            buildUrl(action)

        );

        Object.keys(params).forEach(function (key) {

            const value = params[key];

            if (

                value !== undefined &&

                value !== null &&

                value !== ""

            ) {

                url.searchParams.append(

                    key,

                    value

                );

            }

        });

        const response = await fetchWithTimeout(

            url.toString(),

            {

                method: "GET"

            }

        );

        if (!response.ok) {

            throw new Error(

                "HTTP " +

                response.status +

                " " +

                response.statusText

            );

        }

        const result = await response.json();

        if (typeof result !== "object" || result === null) {

            throw new Error(

                "Invalid JSON response from server."

            );

        }

        return result;

    }

                      /* ======================================================================
       REGISTER VISITOR
    ====================================================================== */

    async function registerVisitor(payload) {

        return await post(

            ACTION.REGISTER_VISITOR,

            payload

        );

    }

    /* ======================================================================
       UPDATE VISITOR
    ====================================================================== */

    async function updateVisitor(payload) {

        return await post(

            ACTION.UPDATE_VISITOR,

            payload

        );

    }

    /* ======================================================================
       GET VISITOR
    ====================================================================== */

    async function getVisitor(visitorId) {

        return await get(

            ACTION.GET_VISITOR,

            {

                visitorId: visitorId

            }

        );

    }

                      /* ======================================================================
       SAVE ASSESSMENT
    ====================================================================== */

    async function saveAssessment(payload) {

        return await post(

            ACTION.SAVE_ASSESSMENT,

            payload

        );

    }

    /* ======================================================================
       SAVE KALA CHAKRA
    ====================================================================== */

    async function saveKalaChakra(payload) {

        return await post(

            ACTION.SAVE_KALA_CHAKRA,

            payload

        );

    }

    /* ======================================================================
       SAVE DIAGNOSIS
    ====================================================================== */

    async function saveDiagnosis(payload) {

        return await post(

            ACTION.SAVE_DIAGNOSIS,

            payload

        );

    }

                      /* ======================================================================
       SAVE PRESCRIPTION
    ====================================================================== */

    async function savePrescription(payload) {

        return await post(

            ACTION.SAVE_PRESCRIPTION,

            payload

        );

    }

    /* ======================================================================
       COMPLETE JOURNEY
    ====================================================================== */

    async function completeJourney(payload) {

        return await post(

            ACTION.COMPLETE_JOURNEY,

            payload

        );

    }

    /* ======================================================================
       PING SERVER
    ====================================================================== */

    async function ping() {

        return await get(

            ACTION.PING

        );

    }

                      /* ======================================================================
       SAFE REQUEST WRAPPER
    ====================================================================== */

    async function safeRequest(request) {

        try {

            const response = await request();

            return response;

        } catch (error) {

            console.error(

                "[CTM API]",

                error

            );

            return {

                success: false,

                message:

                    error.message ||

                    "An unexpected error occurred.",

                data: null

            };

        }

    }

    /* ======================================================================
       PUBLIC API
    ====================================================================== */

    return {

        registerVisitor,

        updateVisitor,

        getVisitor,

        saveAssessment,

        saveKalaChakra,

        saveDiagnosis,

        savePrescription,

        completeJourney,

        ping,

        safeRequest

    };

})();

/* ==========================================================================
   BACKWARD COMPATIBILITY
========================================================================== */

window.ApiService = window.CTM.API;

/* ==========================================================================
   END OF FILE
========================================================================== */
