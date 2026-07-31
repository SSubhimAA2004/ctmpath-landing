
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   API SERVICE LAYER

   File:
   js/api.js


   Responsibility:

   Frontend
        ↓
   API Layer
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


    endpoint:

    "https://script.google.com/macros/s/AKfycbxrgqadtKd3_Bzri2DbCwjp3CWouD3wU_cIqRFgtV-1EHXseRLDSraEQfQP-_F6ZUrFIw/exec",



    version:

    "v1"


};









/* ============================================================
   GENERIC REQUEST HANDLER
============================================================ */


async function request(action, payload){



    try {



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

                    {


                        action:


                        action,



                        version:


                        CONFIG.version,



                        payload:


                        payload


                    }

                )


            }


        );




        const result =

        await response.json();




        return result;



    }



    catch(error){



        console.error(

            "CTM API Request Failed:",

            error

        );




        return {


            success:false,


            error:error.message,


            message:

            "Unable to connect with CTM PATH™ server"


        };


    }



}









/* ============================================================
   PAGE 02
   FINANCIAL DISCOVERY
============================================================ */



async function saveDiscovery(data){



    return request(

        "saveDiscovery",

        data

    );


}









/* ============================================================
   PAGE 03
   KALA CHAKRA™ LIFE ASSESSMENT
============================================================ */



async function saveAssessment(data){



    return request(

        "saveAssessment",

        data

    );


}









/* ============================================================
   PAGE 04
   LIFE ALIGNMENT RESULT
============================================================ */



async function getAlignment(data){



    return request(

        "getAlignment",

        data

    );


}









/* ============================================================
   PAGE 05
   PERSONAL LIFE DIAGNOSIS™
============================================================ */



async function generateDiagnosis(data){



    return request(

        "generateDiagnosis",

        data

    );


}









/* ============================================================
   PAGE 06
   PERSONAL TRANSFORMATION PRESCRIPTION™
============================================================ */



async function generateRoadmap(data){



    return request(

        "generateRoadmap",

        data

    );


}









/* ============================================================
   PAGE 07
   REPORT GENERATION
============================================================ */



async function generateReport(data){



    return request(

        "generateReport",

        data

    );


}









/* ============================================================
   PAGE 07
   DISCOVERY SESSION BOOKING
============================================================ */



async function bookDiscovery(data){



    return request(

        "bookDiscovery",

        data

    );


}









/* ============================================================
   HEALTH CHECK
   Used during deployment testing
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


    saveDiscovery,


    saveAssessment,


    getAlignment,


    generateDiagnosis,


    generateRoadmap,


    generateReport,


    bookDiscovery,


    healthCheck


};



})();

