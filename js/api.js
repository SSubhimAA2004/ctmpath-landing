
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/api.js
   Version     : 2.1

   Status      : REGISTRATION API COMPATIBILITY PATCH


   Purpose:

   Frontend communication layer.


   Responsibilities:

   ✓ Send requests to Google Apps Script
   ✓ Register visitors


   Does NOT:

   ✗ Database operations
   ✗ Business rules
   ✗ Assessment processing


   ========================================================================== */


const API = (() => {





    const CONFIG = {



        endpoint:

        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"



    };









    /* ==========================================================
       GENERIC REQUEST HANDLER
       ========================================================== */


    async function request(payload){



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

                "API connection failed"

            );



        }







        return await response.json();



    }









    /* ==========================================================
       REGISTER VISITOR
       ========================================================== */


    async function registerVisitor(data){



        const payload = {



            action:

            "registerVisitor",



            data:{



                fullName:

                data.fullName,



                email:

                data.email,



                mobile:

                data.mobile,



                district:

                data.district,



                state:

                data.state,



                language:

                data.language,



                source:

                data.source,



                device:

                data.device



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
