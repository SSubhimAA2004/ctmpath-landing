
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Version     : 1.0
   Status      : DEVELOPMENT

   Purpose:
   Frontend API communication layer.

   Responsibilities:

   • Communicate with backend.
   • Send user data.
   • Receive processed results.
   • Standardize requests.

   Does NOT:

   • Render interface.
   • Calculate scores.
   • Generate reports.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};




/* ==========================================================================
   API CONTROLLER
   ========================================================================== */


CTMPATH.API = {


    version:

        "1.0",



    baseURL:

        "",



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.API.init = function(config) {


    if (

        CTMPATH.API.initialized

    ) {


        return;



    }



    if (

        config &&

        config.baseURL

    ) {


        CTMPATH.API.baseURL =

            config.baseURL;



    }



    CTMPATH.API.initialized = true;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   GENERIC REQUEST HANDLER

   Centralizes backend communication.

   ========================================================================== */


CTMPATH.API.request = function(

    endpoint,

    payload

) {


    const url =

        CTMPATH.API.baseURL +

        endpoint;



    return fetch(

        url,

        {


            method:

                "POST",



            headers:

            {


                "Content-Type":

                    "application/json"


            },



            body:

                JSON.stringify(

                    payload || {}

                )


        }

    )

    .then(function(response) {


        return response.json();



    })

    .catch(function(error) {


        CTMPATH.API.handleError(

            error

        );



        throw error;



    });



};




/* ==========================================================================
   ERROR HANDLER

   ========================================================================== */


CTMPATH.API.handleError = function(error) {


    console.error(

        "CTM PATH™ API Error:",

        error

    );



};




/* ==========================================================================
   HEALTH CHECK

   Verifies backend availability.

   ========================================================================== */


CTMPATH.API.healthCheck = function() {


    return CTMPATH.API.request(

        "/health",

        {}

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   REGISTRATION API

   Sends visitor registration payload.

   Backend creates:

   • Visitor ID
   • Profile record
   • Journey session

   ========================================================================== */


CTMPATH.API.registerVisitor = function(

    visitorData

) {


    return CTMPATH.API.request(

        "/register",

        visitorData

    );



};




/* ==========================================================================
   SAVE ASSESSMENT RESPONSE

   Sends individual assessment response.

   Backend handles:

   • Storage
   • Scoring preparation

   ========================================================================== */


CTMPATH.API.saveAssessmentResponse = function(

    responseData

) {


    return CTMPATH.API.request(

        "/assessment/save",

        responseData

    );



};




/* ==========================================================================
   GET KALA CHAKRA™

   Retrieves completed life alignment result.

   Backend provides:

   • 12 pillar scores
   • Alignment data
   • Summary information

   ========================================================================== */


CTMPATH.API.getKalaChakra = function() {


    return CTMPATH.API.request(

        "/kalachakra",

        {}

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   GET DIAGNOSIS™

   Retrieves backend-generated diagnosis.

   Backend provides:

   • Life pattern
   • Strengths
   • Challenges
   • Growth areas

   ========================================================================== */


CTMPATH.API.getDiagnosis = function() {


    return CTMPATH.API.request(

        "/diagnosis",

        {}

    );



};




/* ==========================================================================
   GET PRESCRIPTION™

   Retrieves backend-generated action plan.

   Backend provides:

   • 30 Day Focus
   • 60 Day Growth
   • 90 Day Transformation Plan

   ========================================================================== */


CTMPATH.API.getPrescription = function() {


    return CTMPATH.API.request(

        "/prescription",

        {}

    );



};




/* ==========================================================================
   GET CTA DATA

   Retrieves completion information.

   Backend provides:

   • Visitor identity
   • Journey completion status
   • Next-step information

   ========================================================================== */


CTMPATH.API.getCTAData = function() {


    return CTMPATH.API.request(

        "/cta",

        {}

    );



};




/* ==========================================================================
   DOWNLOAD REPORT REQUEST

   Requests generated report.

   ========================================================================== */


CTMPATH.API.downloadReport = function() {


    return CTMPATH.API.request(

        "/report/download",

        {}

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Continuation: Batch 1E

   ========================================================================== */


/* ==========================================================================
   UPDATE API BASE URL

   Allows environment configuration.

   Supports:

   • Development
   • Testing
   • Production

   ========================================================================== */


CTMPATH.API.setBaseURL = function(

    url

) {


    if (

        typeof url === "string"

    ) {


        CTMPATH.API.baseURL = url;



    }



};




/* ==========================================================================
   GET API STATUS

   Returns current API configuration.

   ========================================================================== */


CTMPATH.API.getStatus = function() {


    return {


        version:

            CTMPATH.API.version,



        baseURL:

            CTMPATH.API.baseURL,



        initialized:

            CTMPATH.API.initialized



    };



};




/* ==========================================================================
   INITIAL API STARTUP

   ========================================================================== */


document.addEventListener(

    "CTMPATH_APP_READY",

    function() {


        CTMPATH.API.init();



    }

);




/* ==========================================================================
   END OF FILE

   File:

   js/api.js


   Status:

   API COMMUNICATION LAYER COMPLETE


   ========================================================================== */

