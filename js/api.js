
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/api.js
   Version     : 2.0

   Status      : 🔒 REGISTRATION ENDPOINT ALIGNMENT


   Purpose:

   Frontend communication layer.


   Responsibilities:

   ✓ Communicate with Google Apps Script API
   ✓ Send visitor registration data
   ✓ Handle responses


   Does NOT:

   ✗ Database operations
   ✗ Assessment logic
   ✗ Business rules


   ========================================================================== */


const API = (() => {





    const CONFIG = {



        /*
            Replace with active
            Google Apps Script Web App URL
        */


        endpoint:


        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"



    };









    /* ==========================================================
       GENERIC REQUEST
       ========================================================== */


    async function request(

        payload

    ){



        const response =

        await fetch(

            CONFIG.endpoint,

            {


                method:

                "POST",



                headers:{


                    "Content-Type":

                    "text/plain;charset=utf-8"


                },



                body:

                JSON.stringify(payload)



            }

        );







        if(!response.ok){



            throw new Error(

                "API request failed"

            );



        }







        return await response.json();



    }









    /* ==========================================================
       REGISTER VISITOR
       ========================================================== */


    async function registerVisitor(

        visitorData

    ){



        const payload = {



            action:

            "registerVisitor",



            data:{



                fullName:

                visitorData.fullName,



                email:

                visitorData.email,



                mobile:

                visitorData.mobile,



                district:

                visitorData.district,



                state:

                visitorData.state,



                language:

                visitorData.language,



                source:

                visitorData.source,



                device:

                visitorData.device



            }



        };







        return await request(

            payload

        );



    }









    return {



        registerVisitor



    };





})();









window.API = API;
