
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : api.js
   Version     : 7.0
   Status      : PRODUCTION
   Purpose     : Google Apps Script API Layer

   --------------------------------------------------------------------------
   RESPONSIBILITIES

   ✓ Google Apps Script Communication
   ✓ HTTP GET / POST
   ✓ Registration
   ✓ Assessment Save
   ✓ Kala Chakra Save
   ✓ Diagnosis Save
   ✓ Prescription Save
   ✓ Journey Completion
   ✓ Visitor Retrieval
   ✓ Error Handling
   ✓ Logging

   DOES NOT

   ✗ UI Rendering
   ✗ DOM Manipulation
   ✗ Business Logic
   ✗ Navigation

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
            'https://script.google.com/macros/s/AKfycby1yF2m7cIXnHh0SqfegiDuxsjdMX6PV5sBCIw/exec',

        TIMEOUT: 30000,

        CONTENT_TYPE:
            'application/json'

    };

    /* ======================================================================
       ACTION CONSTANTS

       MUST MATCH

       CONFIG.ACTIONS

       IN 01_Config.gs
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

       https://.../exec?action=registerVisitor

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

        const controller =

            new AbortController();

        const timeout =

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

            clearTimeout(timeout);

            return response;

        }

        catch (error) {

            clearTimeout(timeout);

            throw error;

        }

    }

    /* ======================================================================
       HTTP POST

       IMPORTANT

       Router.gs expects

       ?action=xxxx

       JSON BODY ONLY

    ====================================================================== */

    async function post(action, payload) {

        const url =

            buildUrl(action);

        try {

            console.groupCollapsed(

                '[CTM API] ' +

                action

            );

            console.log(

                'Request',

                payload

            );

            const response =

                await fetchWithTimeout(

                    url,

                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':

                                CONFIG.CONTENT_TYPE

                        },

                        body:

                            JSON.stringify(

                                payload || {}

                            )

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

            console.log(

                'Response',

                result

            );

            console.groupEnd();

            return result;

        }

        catch (error) {

            console.error(

                '[CTM API]',

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
       HTTP GET

       Used for

       • ping
       • getVisitor

    ====================================================================== */

    async function get(action, parameters = {}) {

        const query =

            new URLSearchParams(

                parameters

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

            return await response.json();

        }

        catch (error) {

            console.error(

                '[CTM API]',

                error

            );

            return {

                success: false,

                message:

                    error.message

            };

        }

    }

    /* ======================================================================
       REGISTER VISITOR

       registration.js currently sends

       {
           FullName,
           Email,
           Mobile,
           District,
           State,
           ReferralSource,
           Language,
           Device
       }

       Backend expects

       {
           fullName,
           email,
           mobile,
           district,
           state,
           source,
           language,
           device
       }

       Therefore we translate here.

    ====================================================================== */

    async function registerVisitor(data) {

        if (!data) {

            return {

                success: false,

                message:

                    'Registration data missing.'

            };

        }

        const payload = {

            fullName:

                data.FullName ||

                data.fullName ||

                '',

            email:

                data.Email ||

                data.email ||

                '',

            mobile:

                data.Mobile ||

                data.mobile ||

                '',

            district:

                data.District ||

                data.district ||

                '',

            state:

                data.State ||

                data.state ||

                '',

            source:

                data.ReferralSource ||

                data.source ||

                '',

            language:

                data.Language ||

                data.language ||

                'Tamil',

            device:

                data.Device ||

                data.device ||

                'Desktop',

            emotion:

                data.InitialEmotion ||

                data.emotion ||

                ''

        };

        return await post(

            ACTION.REGISTER_VISITOR,

            payload

        );

    }

    /* ======================================================================
       UPDATE VISITOR
    ====================================================================== */

    async function updateVisitor(data) {

        return await post(

            ACTION.UPDATE_VISITOR,

            data

        );

    }

    /* ======================================================================
       GET VISITOR
    ====================================================================== */

    async function getVisitor(visitorId) {

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

            data

        );

    }

    /* ======================================================================
       SAVE KALA CHAKRA
    ====================================================================== */

    async function saveKalaChakra(data) {

        return await post(

            ACTION.SAVE_KALA_CHAKRA,

            data

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
       HEALTH CHECK
       ====================================================================== */

    async function ping() {

        return await get(

            ACTION.PING

        );

    }

    /* ======================================================================
       SAFE REQUEST

       Used by app.js

       App.startup()

       ApiService.safeRequest(
           () => ApiService.ping()
       );

       ====================================================================== */

    async function safeRequest(callback) {

        try {

            return await callback();

        }

        catch (error) {

            console.error(

                '[CTM API]',

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
       RESPONSE HELPERS
       ====================================================================== */

    function isSuccess(response) {

        return (

            response &&

            response.success === true

        );

    }

    function getData(response) {

        if (

            !response

        ) {

            return null;

        }

        return response.data || null;

    }

    function getMessage(response) {

        if (

            !response

        ) {

            return '';

        }

        return response.message || '';

    }

    /* ======================================================================
       RETRY

       Simple retry helper

       ====================================================================== */

    async function retry(action, payload, retries = 2) {

        let result = null;

        for (

            let i = 0;

            i <= retries;

            i++

        ) {

            result =

                await post(

                    action,

                    payload

                );

            if (

                isSuccess(result)

            ) {

                return result;

            }

            await new Promise(

                resolve =>

                    setTimeout(

                        resolve,

                        1000

                    )

            );

        }

        return result;

    }

     /* ======================================================================
       PUBLIC API
       ====================================================================== */

    const API = {

        /* --------------------------------------------------------------
           Registration
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

    return API;

})();

/* ==========================================================================
   BACKWARD COMPATIBILITY

   Existing project files use

       ApiService.registerVisitor()

   New code may use

       CTM.API.registerVisitor()

   Both point to the same object.

   ========================================================================== */

window.ApiService = window.CTM.API;

/* ==========================================================================
   VERSION
   ========================================================================== */

Object.defineProperty(

    window.CTM.API,

    'VERSION',

    {

        value: '7.0',

        enumerable: true,

        writable: false

    }

);

Object.defineProperty(

    window.CTM.API,

    'BUILD',

    {

        value: '2026.07.25',

        enumerable: true,

        writable: false

    }

);

/* ==========================================================================
   DIAGNOSTICS

   These functions are intentionally defined BEFORE Object.freeze()
   so they remain part of the public API.

   ========================================================================== */

window.CTM.API.info = function () {

    console.group(

        'CTM PATH API'

    );

    console.table({

        Version:

            window.CTM.API.VERSION,

        Build:

            window.CTM.API.BUILD,

        Backend:

            'Google Apps Script',

        Status:

            'Production'

    });

    console.groupEnd();

};

window.CTM.API.ready = function () {

    return (

        typeof window.ApiService !== 'undefined'

        &&

        typeof window.ApiService.registerVisitor === 'function'

    );

};

window.CTM.API.testConnection = async function () {

    return await

        window.ApiService.safeRequest(

            () =>

                window.ApiService.ping()

        );

};

/* ==========================================================================
   PRODUCTION HARDENING
   ========================================================================== */

/*
   Freeze the public API after all methods have been attached.
*/

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
   STARTUP MESSAGE
   ========================================================================== */

(function () {

    console.info(

        '======================================================'

    );

    console.info(

        'CTM PATH™ API Layer Initialised'

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

        '======================================================'

    );

    if (

        window.CTM.API.ready()

    ) {

        console.info(

            '✓ ApiService compatibility enabled.'

        );

    }

    else {

        console.warn(

            '⚠ ApiService compatibility unavailable.'

        );

    }

})();

/* ==========================================================================
   GLOBAL EXPORTS

   Modern

       CTM.API.registerVisitor()

   Legacy

       ApiService.registerVisitor()

   ========================================================================== */

window.ApiService = window.CTM.API;

/* ==========================================================================
   END OF FILE

   ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : api.js
   Version     : 7.0
   Status      : PRODUCTION

   VERIFIED AGAINST

   ✓ 01_Config.gs
   ✓ 02_Utils.gs
   ✓ 03_Database.gs
   ✓ 07_Router.gs
   ✓ 08_Service.gs
   ✓ app.js
   ✓ registration.js

   Registration Flow

   Landing
      ↓
   registration.js
      ↓
   ApiService.registerVisitor()
      ↓
   api.js
      ↓
   POST

      /exec?action=registerVisitor

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

      ↓

   Router.gs

      doPost()

      ↓

   registerVisitor()

      ↓

   saveVisitorRegistration()

      ↓

   Visitors Sheet

   ==========================================================================
*/
