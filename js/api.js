
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend API communication service.

   Responsibilities:

   • Communicate with Google Apps Script backend.
   • Send validated payloads.
   • Receive backend responses.
   • Handle API-level failures.
   • Maintain consistent request structure.

   Does NOT:

   • Execute business rules.
   • Calculate scores.
   • Generate diagnosis.
   • Generate prescriptions.
   • Modify database records directly.

   Backend Ownership:

   • Visitor lifecycle
   • Assessment storage
   • Scoring engine
   • KALA CHAKRA™ engine
   • Diagnosis engine
   • Prescription engine
   • Report generator

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   API SERVICE OBJECT
   ========================================================================== */


CTMPATH.API = {


    version:

        "1.0",



    endpoint:

        "",



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION

   Backend URL is injected during deployment configuration.

   ========================================================================== */


CTMPATH.API.init = function(config) {


    if (

        config &&

        config.endpoint

    ) {


        CTMPATH.API.endpoint = config.endpoint;


    }



    CTMPATH.API.initialized = true;



};




/* ==========================================================================
   REQUEST HANDLER

   Central transport method.

   ========================================================================== */


CTMPATH.API.request = async function(action, payload) {


    if (

        !CTMPATH.API.initialized

    ) {


        throw new Error(

            "CTM PATH™ API is not initialized."

        );


    }



    const requestBody = {


        action:

            action,



        payload:

            payload || {}



    };



    try {


        const response = await fetch(

            CTMPATH.API.endpoint,

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

                        requestBody

                    )



            }

        );



        const data = await response.json();



        return CTMPATH.API.validateResponse(

            data

        );



    }


    catch(error) {


        return CTMPATH.API.handleError(

            error

        );


    }



};




/* ==========================================================================
   RESPONSE VALIDATION

   Ensures frontend receives expected structure.

   ========================================================================== */


CTMPATH.API.validateResponse = function(response) {


    if (

        !response

    ) {


        throw new Error(

            "Empty response received from backend."

        );


    }



    if (

        response.success === false

    ) {


        throw new Error(

            response.message ||

            "Backend request failed."

        );


    }



    return response;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : api.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   STANDARD API ACTION METHODS

   These methods provide named interfaces for frontend modules.

   They do not implement business logic.

   They only communicate intent to the backend.

   ========================================================================== */



/* ==========================================================================
   VISITOR REGISTRATION

   Backend owns:

   • Visitor ID creation
   • Database persistence
   • Validation rules

   ========================================================================== */


CTMPATH.API.registerVisitor = async function(visitorData) {


    return await CTMPATH.API.request(

        "registerVisitor",

        visitorData

    );


};




/* ==========================================================================
   SAVE ASSESSMENT RESPONSE

   Backend owns:

   • Response persistence
   • Assessment state
   • Validation

   ========================================================================== */


CTMPATH.API.saveAssessmentResponse = async function(data) {


    return await CTMPATH.API.request(

        "saveAssessmentResponse",

        data

    );


};




/* ==========================================================================
   COMPLETE ASSESSMENT

   Backend owns:

   • Final submission
   • Scoring execution
   • KALA CHAKRA™ processing

   ========================================================================== */


CTMPATH.API.completeAssessment = async function(data) {


    return await CTMPATH.API.request(

        "completeAssessment",

        data

    );


};




/* ==========================================================================
   FETCH DIAGNOSIS

   Backend owns:

   • Diagnosis generation
   • Recommendation logic

   ========================================================================== */


CTMPATH.API.getDiagnosis = async function(visitorId) {


    return await CTMPATH.API.request(

        "getDiagnosis",

        {


            visitorId:

                visitorId



        }

    );


};




/* ==========================================================================
   FETCH PRESCRIPTION

   Backend owns:

   • Prescription generation
   • Action planning logic

   ========================================================================== */


CTMPATH.API.getPrescription = async function(visitorId) {


    return await CTMPATH.API.request(

        "getPrescription",

        {


            visitorId:

                visitorId



        }

    );


};




/* ==========================================================================
   GENERATE REPORT

   Backend owns:

   • Report generation
   • PDF creation
   • Drive storage

   ========================================================================== */


CTMPATH.API.generateReport = async function(visitorId) {


    return await CTMPATH.API.request(

        "generateReport",

        {


            visitorId:

                visitorId



        }

    );


};




/* ==========================================================================
   API ERROR HANDLING

   ========================================================================== */


CTMPATH.API.handleError = function(error) {


    console.error(

        "CTM PATH™ API Error:",

        error

    );



    return {


        success:

            false,



        message:

            error.message ||

            "API communication failed."



    };



};




/* ==========================================================================
   GET API STATUS

   Internal diagnostic helper.

   ========================================================================== */


CTMPATH.API.status = function() {


    return {


        initialized:

            CTMPATH.API.initialized,



        endpointConfigured:

            Boolean(

                CTMPATH.API.endpoint

            ),



        version:

            CTMPATH.API.version



    };


};




/* ==========================================================================
   END OF FILE

   File:

   js/api.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   js/storage.js

   ========================================================================== */
