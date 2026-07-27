
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/api.js
 Version     : 1.0

 Purpose:
 Frontend API communication layer.

 Responsibilities:
 - Communicate with CTM PATH™ WebApp
 - Send structured payloads
 - Receive backend responses
 - Handle API errors

 Rules:
 - No UI logic
 - No page navigation
 - No assessment calculations
 - No storage management

==============================================================================
*/


(function () {


    "use strict";



    /*
    ==========================================================================
       CONFIGURATION
    ==========================================================================
    */


    const CTM_API = {


        BASE_URL:

        "https://script.google.com/macros/s/AKfycbxyteSs7pXpvWGLT0uR0tWU-zcl5zuqIVOOBdQ_YdS1HJcjrGWFO9MN7yiSLqNUZ66RoA/exec"



    };







    /*
    ==========================================================================
       CORE REQUEST METHOD
    ==========================================================================
    */


    async function request(payload){



        try {



            const response =

                await fetch(

                    CTM_API.BASE_URL,

                    {


                        method:

                            "POST",


                        headers:

                        {

                            "Content-Type":

                                "application/json"

                        },


                        body:

                            JSON.stringify(payload)



                    }

                );





            const data =

                await response.json();





            return data;



        }



        catch(error){



            console.error(

                "CTM PATH™ API Error:",

                error

            );



            return {


                success:

                    false,


                message:

                    "Unable to connect to server."



            };



        }



    }









    /*
    ==========================================================================
       VISITOR API
    ==========================================================================
    */


    async function createVisitor(visitorData){



        return await request(

            {


                action:

                    "createVisitor",



                ...visitorData



            }

        );



    }







    /*
    ==========================================================================
       FUTURE API METHODS
    ==========================================================================
    */



    async function saveAssessment(data){


        return await request(

            {


                action:

                    "saveAssessment",


                ...data



            }

        );


    }







    async function getJourneyResult(data){


        return await request(

            {


                action:

                    "getJourneyResult",


                ...data



            }

        );


    }








    /*
    ==========================================================================
       EXPOSE API
    ==========================================================================
    */


    window.CTM_API = {


        createVisitor,

        saveAssessment,

        getJourneyResult



    };



})();

