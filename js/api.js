
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    api.js

    PURPOSE

    Frontend API Connector

    RESPONSIBILITIES

    • Connect Frontend With Backend
    • Send Visitor Data
    • Receive Backend Responses
    • Handle Communication Errors

    NOTE

    This module NEVER handles

    • UI
    • Navigation
    • Storage

    Backend Source:

    Google Apps Script
        ↓
    Google Sheet

=============================================================================*/


'use strict';




/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};





/*=============================================================================
    API MODULE
=============================================================================*/


CTM.api = (function(){





    /*=========================================================================
        CONFIGURATION
    =========================================================================*/


    const API_URL =

        'YOUR_GOOGLE_APPS_SCRIPT_URL';





    /*=========================================================================
        REQUEST

        Common POST Handler

    =========================================================================*/


    async function request(

        action,

        data = {}

    ){


        try{


            const response =

                await fetch(

                    API_URL,

                    {


                        method:'POST',


                        headers:{


                            'Content-Type':

                                'text/plain;charset=utf-8'


                        },


                        body:JSON.stringify({


                            action,


                            data


                        })


                    }

                );



            const result =

                await response.json();



            return result;



        }


        catch(error){


            console.error(

                'CTM API Error',

                error

            );



            return{


                success:false,


                message:

                    error.message


            };


        }


    }



    /*=========================================================================
        PING

        Backend Health Check

    =========================================================================*/


    async function ping(){


        return await request(

            'ping'

        );


    }





    /*=========================================================================
        REGISTER VISITOR

        Creates New Visitor Record

        Google Sheet:

        Visitors Sheet

        Returns:

        VisitorID

    =========================================================================*/


    async function registerVisitor(data){


        return await request(

            'registerVisitor',

            data

        );


    }





    /*=========================================================================
        UPDATE VISITOR

        Updates Existing Visitor Journey

    =========================================================================*/


    async function updateVisitor(data){


        return await request(

            'updateVisitor',

            data

        );


    }





    /*=========================================================================
        GET VISITOR

        Retrieve Visitor Record

    =========================================================================*/


    async function getVisitor(visitorId){


        return await request(

            'getVisitor',

            {


                visitorId


            }

        );


    }





    /*=========================================================================
        CHECK CONNECTION

    =========================================================================*/


    async function isOnline(){


        const result =

            await ping();



        return Boolean(

            result &&

            result.success

        );


    }





    /*=========================================================================
        PUBLIC API

    =========================================================================*/


    return{


        ping,


        registerVisitor,


        updateVisitor,


        getVisitor,


        isOnline


    };



})();



/*=============================================================================

    END OF FILE

=============================================================================*/

