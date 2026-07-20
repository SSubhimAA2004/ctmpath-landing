
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Google Apps Script Integration

Responsibility
• Backend Communication
• Save Visitor
• Save Responses
• Save Booking
• Load Visitor
• Health Check
• API Wrapper

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error('CTM core has not been initialized.');

        return;

    }

    /*==================================================
    Configuration
    ==================================================*/

    CTM.api = {

        endpoint: '',

        enabled: false

    };

    /*==================================================
    Configure Endpoint
    ==================================================*/

    CTM.setApiEndpoint = function (url) {

        CTM.api.endpoint = url || '';

        CTM.api.enabled =

            CTM.api.endpoint !== '';

    };

    /*==================================================
    Request
    ==================================================*/

    CTM.apiRequest = async function (

        action,

        payload = {}

    ) {

        if (!CTM.api.enabled) {

            CTM.log(

                'Google Sheets integration disabled.'

            );

            return {

                success: false,

                message: 'Integration disabled.'

            };

        }

        try {

            const response = await fetch(

                CTM.api.endpoint,

                {

                    method: 'POST',

                    headers: {

                        'Content-Type':

                        'application/json'

                    },

                    body: JSON.stringify({

                        action,

                        payload

                    })

                }

            );

            return await response.json();

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                message: error.message

            };

        }

    };

    /*==================================================
    Save Visitor
    ==================================================*/

    CTM.saveVisitor = async function () {

        return await CTM.apiRequest(

            'saveVisitor',

            {

                visitor:

                    CTM.state.visitor

            }

        );

    };

    /*==================================================
    Save Responses
    ==================================================*/

    CTM.saveResponses = async function () {

        return await CTM.apiRequest(

            'saveResponses',

            {

                responses:

                    CTM.state.responses,

                scores:

                    CTM.state.scores

            }

        );

    };

    /*==================================================
    Save Booking
    ==================================================*/

    CTM.saveBookingToSheets = async function () {

        return await CTM.apiRequest(

            'saveBooking',

            {

                booking:

                    CTM.state.booking

            }

        );

    };

    /*==================================================
    Save Journey
    ==================================================*/

    CTM.saveJourney = async function () {

        return await CTM.apiRequest(

            'saveJourney',

            {

                visitor:

                    CTM.state.visitor,

                journey:

                    CTM.state.journey,

                responses:

                    CTM.state.responses,

                scores:

                    CTM.state.scores,

                insights:

                    CTM.state.insights,

                recommendations:

                    CTM.state.recommendations,

                booking:

                    CTM.state.booking,

                analytics:

                    CTM.state.analytics

            }

        );

    };

    /*==================================================
    Load Visitor
    ==================================================*/

    CTM.loadVisitor = async function (

        visitorId

    ) {

        return await CTM.apiRequest(

            'loadVisitor',

            {

                visitorId

            }

        );

    };

    /*==================================================
    Health Check
    ==================================================*/

    CTM.healthCheck = async function () {

        return await CTM.apiRequest(

            'health'

        );

    };

    /*==================================================
    Synchronize
    ==================================================*/

    CTM.sync = async function () {

        return await CTM.saveJourney();

    };

})();
