
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * Cloudflare Pages API Proxy v1.0
 * -----------------------------------------------------------------------------
 * File          : functions/api.js
 * Layer         : Edge Proxy / Transport Bridge
 *
 * -----------------------------------------------------------------------------
 * PURPOSE
 * -----------------------------------------------------------------------------
 *
 * Provides a same-origin API endpoint for the CTM PATH™ frontend.
 *
 * Browser
 *      ↓
 * /api
 *      ↓
 * Cloudflare Pages Function
 *      ↓
 * Google Apps Script Web App
 *
 *
 * Responsibilities:
 *
 *      • Receive frontend API requests
 *      • Forward requests to Google Apps Script
 *      • Return backend JSON response
 *      • Eliminate browser-to-Apps-Script CORS dependency
 *
 *
 * Rules:
 *
 *      • NO business logic
 *      • NO calculations
 *      • NO diagnosis logic
 *      • NO assessment logic
 *      • NO roadmap logic
 *      • NO database logic
 *
 * Google Apps Script remains the backend authority.
 *
 * =============================================================================
 */


"use strict";





/* =============================================================================
 * CONFIGURATION
 * =============================================================================
 */


const APPS_SCRIPT_ENDPOINT =

    "https://script.google.com/macros/s/AKfycbxrgqadtKd3_Bzri2DbCwjp3CWouD3wU_cIqRFgtV-1EHXseRLDSraEQfQP-_F6ZUrFIw/exec";










/* =============================================================================
 * CLOUDFLARE PAGES FUNCTION
 * =============================================================================
 */


/**
 * Handles requests to:
 *
 *      /api
 *
 *
 * @param {Object} context
 *
 * @returns {Response}
 */


export async function onRequest(context) {


    const request =

        context.request;





    try {





        /* =====================================================================
         * OPTIONS
         * =====================================================================
         *
         * Normally unnecessary for same-origin frontend requests.
         *
         * Included so the endpoint remains safe if it is later called
         * cross-origin.
         *
         * =====================================================================
         */


        if (

            request.method === "OPTIONS"

        ) {


            return new Response(

                null,

                {

                    status:

                        204,


                    headers:

                        buildCorsHeaders()

                }

            );


        }










        /* =====================================================================
         * METHOD VALIDATION
         * =====================================================================
         */


        if (

            request.method !== "POST" &&

            request.method !== "GET"

        ) {


            return jsonResponse(

                {

                    success:

                        false,


                    message:

                        "Method not allowed."

                },

                405

            );


        }










        /* =====================================================================
         * GET
         * =====================================================================
         *
         * Primarily useful for deployment / endpoint verification.
         *
         * Query parameters are forwarded to Apps Script.
         *
         * =====================================================================
         */


        if (

            request.method === "GET"

        ) {


            return await forwardGet(

                request

            );


        }










        /* =====================================================================
         * POST
         * =====================================================================
         */


        return await forwardPost(

            request

        );





    }


    catch(error) {





        console.error(

            "CTM PATH™ API Proxy Error:",

            error

        );





        return jsonResponse(

            {

                success:

                    false,


                error:

                    error instanceof Error

                        ? error.message

                        : String(error),


                message:

                    "CTM PATH™ API proxy failed."

            },

            500

        );


    }


}










/* =============================================================================
 * POST FORWARDER
 * =============================================================================
 */


/**
 * Forwards POST request to Google Apps Script.
 *
 * @param {Request} request
 *
 * @returns {Response}
 */


async function forwardPost(request) {


    const body =

        await request.text();










    if (

        !body ||

        !body.trim()

    ) {


        return jsonResponse(

            {

                success:

                    false,


                message:

                    "Request body is required."

            },

            400

        );


    }










    /*
     * Validate that the incoming body contains JSON.
     *
     * The proxy does NOT alter the payload.
     */


    try {


        JSON.parse(

            body

        );


    }


    catch(error) {


        return jsonResponse(

            {

                success:

                    false,


                message:

                    "Invalid JSON request body."

            },

            400

        );


    }










    const backendResponse =

        await fetch(

            APPS_SCRIPT_ENDPOINT,

            {

                method:

                    "POST",


                headers:

                    {

                        /*
                         * text/plain avoids browser-style JSON preflight
                         * requirements and remains compatible with
                         * Apps Script e.postData.contents.
                         */

                        "Content-Type":

                            "text/plain;charset=UTF-8"

                    },


                body:

                    body,


                redirect:

                    "follow"

            }

        );










    return await normalizeBackendResponse(

        backendResponse

    );


}










/* =============================================================================
 * GET FORWARDER
 * =============================================================================
 */


/**
 * Forwards GET query parameters to Google Apps Script.
 *
 * @param {Request} request
 *
 * @returns {Response}
 */


async function forwardGet(request) {


    const incomingUrl =

        new URL(

            request.url

        );





    const backendUrl =

        new URL(

            APPS_SCRIPT_ENDPOINT

        );










    incomingUrl.searchParams.forEach(

        function(value, key) {


            backendUrl.searchParams.set(

                key,

                value

            );


        }

    );










    const backendResponse =

        await fetch(

            backendUrl.toString(),

            {

                method:

                    "GET",


                redirect:

                    "follow"

            }

        );










    return await normalizeBackendResponse(

        backendResponse

    );


}










/* =============================================================================
 * BACKEND RESPONSE NORMALIZER
 * =============================================================================
 */


/**
 * Reads the Apps Script response and returns it to the browser.
 *
 * @param {Response} backendResponse
 *
 * @returns {Response}
 */


async function normalizeBackendResponse(

    backendResponse

) {


    const responseText =

        await backendResponse.text();










    /*
     * Apps Script should return JSON.
     *
     * Validate it before returning it to the frontend so that
     * HTML error pages or unexpected responses do not cause
     * confusing response.json() failures inside js/api.js.
     */


    let data;


    try {


        data =

            JSON.parse(

                responseText

            );


    }


    catch(error) {





        console.error(

            "CTM PATH™ Apps Script returned non-JSON response:",

            responseText

        );





        return jsonResponse(

            {

                success:

                    false,


                backendStatus:

                    backendResponse.status,


                message:

                    "CTM PATH™ backend returned an invalid response."

            },

            502

        );


    }










    return jsonResponse(

        data,

        backendResponse.ok

            ? backendResponse.status

            : 502

    );


}










/* =============================================================================
 * JSON RESPONSE
 * =============================================================================
 */


/**
 * Creates standardized JSON response.
 *
 * @param {Object} data
 * @param {number} status
 *
 * @returns {Response}
 */


function jsonResponse(

    data,

    status = 200

) {


    const headers =

        buildCorsHeaders();





    headers.set(

        "Content-Type",

        "application/json;charset=UTF-8"

    );





    headers.set(

        "Cache-Control",

        "no-store"

    );










    return new Response(

        JSON.stringify(

            data

        ),

        {

            status:

                status,


            headers:

                headers

        }

    );


}










/* =============================================================================
 * CORS HEADERS
 * =============================================================================
 */


/**
 * Creates response headers.
 *
 * Same-origin CTM PATH™ requests do not require CORS.
 *
 * These headers also allow the proxy endpoint to behave predictably
 * if called from an alternate CTM PATH™ frontend origin later.
 *
 * @returns {Headers}
 */


function buildCorsHeaders() {


    const headers =

        new Headers();





    headers.set(

        "Access-Control-Allow-Origin",

        "*"

    );





    headers.set(

        "Access-Control-Allow-Methods",

        "GET, POST, OPTIONS"

    );





    headers.set(

        "Access-Control-Allow-Headers",

        "Content-Type"

    );










    return headers;


}





/* =============================================================================
 * END OF FILE
 * =============================================================================
 */
