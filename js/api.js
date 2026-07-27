
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/api.js
 Version     : 1.1

 Purpose:
 Frontend API communication layer.

 Responsibilities:
 - Communicate with CTM PATH™ WebApp
 - Create Visitor
 - Handle API responses

 Does NOT:
 - contain business logic
 - calculate scores
 - modify backend

 Status:
 🔒 Frontend API Adapter

==============================================================================
*/


(function () {


    "use strict";





    const CTM_API = {





        /*
        ----------------------------------------------------------------------
            PRODUCTION WEB APP URL
        ----------------------------------------------------------------------
        */


        baseURL:


        "https://script.google.com/macros/s/AKfycbxyteSs7pXpvWGLT0uR0tWU-zcl5zuqIVOOBdQ_YdS1HJcjrGWFO9MN7yiSLqNUZ66RoA/exec",







        /*
        ----------------------------------------------------------------------
            CREATE VISITOR
        ----------------------------------------------------------------------
        */


        createVisitor:

            async function(payload){



                try {



                    const response =

                        await fetch(

                            this.baseURL,

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

                                                "createVisitor",



                                            data:

                                                payload



                                        }

                                    )


                            }

                        );









                    const result =

                        await response.json();








                    console.log(

                        "CTM PATH™ API Response:",

                        result

                    );









                    return result;



                }



                catch(error){



                    console.error(

                        "CTM PATH™ API Error:",

                        error

                    );



                    throw error;



                }



            }






    };









    /*
    ==========================================================================
       GLOBAL EXPORT
    ==========================================================================
    */


    window.CTM_API = CTM_API;





})();

