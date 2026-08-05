
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   API SERVICE LAYER

   File:

   js/api.js


   Responsibility:

   Frontend
        ↓
   CTM PATH™ API Layer
        ↓
   Cloudflare Pages Function
        ↓
   Google Apps Script WebApp


   Rules:

   ✅ No calculations
   ✅ No diagnosis logic
   ✅ No roadmap logic
   ✅ No report generation logic

   Backend owns intelligence.

============================================================ */


const CTM_API = (function(){


    "use strict";




    /* ============================================================
       CONFIGURATION
    ============================================================ */


    const CONFIG = {


        /*
         * SAME-ORIGIN API ENDPOINT
         *
         * Browser
         *      ↓
         * /api
         *      ↓
         * functions/api.js
         *      ↓
         * Google Apps Script
         *
         *
         * IMPORTANT:
         *
         * Do NOT place the Google Apps Script URL here.
         *
         * The Apps Script endpoint now exists only inside:
         *
         * functions/api.js
         *
         */


        endpoint:


            "/api",




        version:


            "v1"


    };








    /* ============================================================
       GENERIC REQUEST HANDLER
    ============================================================ */


    async function request(

        action,

        payload

    ){


        try {




            /*
             * Build standardized CTM PATH™ request.
             */


            const requestBody = {


                action:


                    action,




                version:


                    CONFIG.version,




                payload:


                    payload || {}


            };








            /*
             * Send request to the SAME-ORIGIN
             * Cloudflare Pages Function.
             *
             * This avoids direct browser communication
             * with Google Apps Script.
             */


            const response = await fetch(


                CONFIG.endpoint,


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

                        ),




                    cache:


                        "no-store"


                }


            );








            /*
             * Read response as text first.
             *
             * This allows us to detect unexpected
             * HTML or malformed proxy responses.
             */


            const responseText =

                await response.text();








            /*
             * Empty response protection.
             */


            if (

                !responseText ||

                !responseText.trim()

            ) {


                throw new Error(

                    "CTM PATH™ server returned an empty response."

                );


            }








            /*
             * Parse JSON safely.
             */


            let result;


            try {


                result = JSON.parse(

                    responseText

                );


            }


            catch(parseError){


                console.error(

                    "CTM API Invalid JSON Response:",

                    responseText

                );




                throw new Error(

                    "CTM PATH™ server returned an invalid response."

                );


            }








            /*
             * HTTP-level failure.
             *
             * Preserve the backend response whenever possible.
             */


            if (

                !response.ok

            ) {


                console.error(

                    "CTM API HTTP Error:",

                    response.status,

                    result

                );




                return {


                    success:


                        false,




                    status:


                        response.status,




                    error:


                        result.error ||

                        result.message ||

                        "API request failed.",




                    message:


                        result.message ||

                        "Unable to complete the CTM PATH™ request.",




                    data:


                        result


                };


            }








            /*
             * Successful HTTP response.
             *
             * Business-level success/failure remains
             * owned by the Apps Script backend.
             */


            return result;


        }




        catch(error){




            console.error(


                "CTM API Request Failed:",


                error


            );








            return {


                success:


                    false,




                error:


                    error && error.message

                        ? error.message

                        : String(error),




                message:


                    "Unable to connect with CTM PATH™ server"


            };


        }


    }








    /* ============================================================
       PAGE 02
       REGISTRATION + FINANCIAL DISCOVERY
    ============================================================ */




    async function register(

        data

    ){


        return request(

            "register",

            data

        );


    }








    async function saveDiscovery(

        data

    ){


        return request(

            "saveMillionaireScorecard",

            data

        );


    }








    /* ============================================================
       PAGE 03
       KALA CHAKRA™ LIFE ASSESSMENT
    ============================================================ */




    async function saveAssessment(

        data

    ){


        return request(

            "saveAssessment",

            data

        );


    }








    /* ============================================================
       PAGE 04
       LIFE ALIGNMENT RESULT
    ============================================================ */




    async function getAlignment(

        data

    ){


        return request(

            "getAlignment",

            data

        );


    }








    /* ============================================================
       PAGE 05
       PERSONAL LIFE DIAGNOSIS™
    ============================================================ */




    async function generateDiagnosis(

        data

    ){


        return request(

            "generateDiagnosis",

            data

        );


    }








    /* ============================================================
       PAGE 06
       PERSONAL TRANSFORMATION PRESCRIPTION™
    ============================================================ */




    async function generateRoadmap(

        data

    ){


        return request(

            "generateRoadmap",

            data

        );


    }








    /* ============================================================
       PAGE 06
       FINAL GUIDED JOURNEY DELIVERY

       Coordinates the backend-owned final workflow:

       ✓ Generate / recover 180-Day Roadmap
       ✓ Generate complete report
       ✓ Generate Google Document
       ✓ Generate PDF
       ✓ Email PDF
       ✓ Return final delivery metadata

       IMPORTANT:

       Frontend does NOT orchestrate these individual backend
       operations.

       JourneyOrchestrator.finalizeJourney() owns the workflow.
    ============================================================ */




    async function finalizeJourney(

        data

    ){


        return request(

            "finalizeJourney",

            data

        );


    }








    /* ============================================================
       PAGE 07
       REPORT GENERATION
    ============================================================ */




    async function generateReport(

        data

    ){


        return request(

            "generateReport",

            data

        );


    }








    /* ============================================================
       PAGE 07
       DOCUMENT GENERATION
    ============================================================ */




    async function generateDocument(

        data

    ){


        return request(

            "generateDocument",

            data

        );


    }








    /* ============================================================
       EMAIL DELIVERY
    ============================================================ */




    async function sendEmail(

        data

    ){


        return request(

            "sendEmail",

            data

        );


    }








    /* ============================================================
       PAGE 07
       DISCOVERY SESSION BOOKING
    ============================================================ */




    async function bookDiscovery(

        data

    ){


        return request(

            "bookDiscovery",

            data

        );


    }








    /* ============================================================
       PAGE 07
       JOURNEY SUMMARY
    ============================================================ */




    async function getJourneySummary(

        data

    ){


        return request(

            "getJourneySummary",

            data

        );


    }








    /* ============================================================
       QA / PREVIEW SERVICES
    ============================================================ */




    async function previewReport(

        data

    ){


        return request(

            "previewReport",

            data

        );


    }








    async function previewRoadmap(

        data

    ){


        return request(

            "previewRoadmap",

            data

        );


    }








    /* ============================================================
       HEALTH CHECK

       Used during deployment testing.

       Flow:

       Browser
            ↓
       /api
            ↓
       Cloudflare Function
            ↓
       Apps Script
            ↓
       JourneyOrchestrator.healthCheck()

    ============================================================ */




    async function healthCheck(){


        return request(

            "healthCheck",

            {}

        );


    }








    /* ============================================================
       PUBLIC API
    ============================================================ */




    return {


        register,


        saveDiscovery,


        saveAssessment,


        getAlignment,


        generateDiagnosis,


        generateRoadmap,


        finalizeJourney,


        generateReport,


        generateDocument,


        sendEmail,


        bookDiscovery,


        getJourneySummary,


        previewReport,


        previewRoadmap,


        healthCheck


    };


})();








/* ============================================================
   BROWSER GLOBAL EXPOSURE

   Page controllers use:

       window.CTM_API

   Explicit exposure guarantees that Page controllers in the
   Guided Journey™ can access the shared API layer through a
   stable browser-global contract.
============================================================ */


window.CTM_API = CTM_API;








/* ============================================================
   API SERVICE READY
============================================================ */


console.info(

    "CTM PATH™ API Service ready.",

    {

        version:

            "v1",

        endpoint:

            "/api",

        register:

            (
                typeof window.CTM_API.register ===
                "function"
            ),

        finalizeJourney:

            (
                typeof window.CTM_API.finalizeJourney ===
                "function"
            )

    }

);

