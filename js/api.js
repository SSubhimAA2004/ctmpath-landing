
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   API SERVICE LAYER

   File:
   js/api.js


   Responsibility:

   Frontend
        ↓
   Google Apps Script WebApp


   NO:
   - Calculations
   - Diagnosis logic
   - Roadmap logic
   - Report generation


============================================================ */



const CTM_API = (function(){


"use strict";



/* ============================================================
   CONFIGURATION
============================================================ */


const CONFIG = {


    endpoint:

    "YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL",



    version:

    "v1"


};








/* ============================================================
   GENERIC REQUEST
============================================================ */


async function request(action,payload){



    try {



        const response =

        await fetch(

            CONFIG.endpoint,

            {


                method:"POST",


                headers:{


                    "Content-Type":

                    "application/json"


                },


                body:

                JSON.stringify({


                    action:action,


                    version:

                    CONFIG.version,


                    payload:payload


                })


            }

        );




        return await response.json();



    }



    catch(error){



        console.error(

            "CTM API Error:",

            error

        );



        return {


            success:false,


            message:

            "Connection failed"


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
   LIFE ASSESSMENT
============================================================ */


async function saveAssessment(data){



    return request(

        "saveAssessment",

        data

    );


}









/* ============================================================
   PAGE 04
   LIFE ALIGNMENT
============================================================ */


async function getAlignment(data){



    return request(

        "getAlignment",

        data

    );


}









/* ============================================================
   PAGE 05
   PERSONAL DIAGNOSIS
============================================================ */


async function generateDiagnosis(data){



    return request(

        "generateDiagnosis",

        data

    );


}









/* ============================================================
   PAGE 06
   TRANSFORMATION ROADMAP
============================================================ */


async function generateRoadmap(data){



    return request(

        "generateRoadmap",

        data

    );


}









/* ============================================================
   PAGE 07
   REPORT
============================================================ */


async function generateReport(data){



    return request(

        "generateReport",

        data

    );


}









/* ============================================================
   PAGE 07
   DISCOVERY SESSION
============================================================ */


async function bookDiscovery(data){



    return request(

        "bookDiscovery",

        data

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

    bookDiscovery


};



})();

