
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/registration.js
 Version     : 1.0
 Page        : PAGE 02 — REGISTRATION™

 Purpose:
 Visitor registration controller.

 Responsibilities:
 - Validate registration form
 - Create visitor payload
 - Call CTM PATH™ API
 - Store VisitorID
 - Navigate to Assessment

 Rules:
 - No scoring logic
 - No assessment logic
 - No duplicate registration engine

==============================================================================
*/


(function () {


    "use strict";



    /*
    ==========================================================================
       CONFIGURATION
    ==========================================================================
    */


    const CTM_API_URL =

        "https://script.google.com/macros/s/AKfycbxyteSs7pXpvWGLT0uR0tWU-zcl5zuqIVOOBdQ_YdS1HJcjrGWFO9MN7yiSLqNUZ66RoA/exec";






    /*
    ==========================================================================
       INITIALIZATION
    ==========================================================================
    */


    function initRegistrationPage() {


        const form =

            document.getElementById(
                "registrationForm"
            );



        if (!form) {


            console.warn(
                "CTM PATH™: Registration form not found."
            );


            return;

        }



        form.addEventListener(
            "submit",
            handleRegistration
        );


    }







    /*
    ==========================================================================
       FORM SUBMISSION
    ==========================================================================
    */


    async function handleRegistration(event) {


        event.preventDefault();




        const button =

            document.getElementById(
                "startAssessmentButton"
            );



        setLoading(
            button,
            true
        );





        try {


            const payload =
                buildVisitorPayload();




            const response =
                await createVisitor(
                    payload
                );





            if (
                response &&
                response.success
            ) {



                saveVisitorSession(
                    response
                );



                navigateToAssessment();



            } else {


                throw new Error(
                    response.message ||
                    "Registration failed"
                );


            }



        }


        catch(error){



            console.error(
                "CTM PATH™ Registration Error:",
                error
            );



            showError(
                "Unable to complete registration. Please try again."
            );



        }


        finally{


            setLoading(
                button,
                false
            );


        }


    }







    /*
    ==========================================================================
       BUILD PAYLOAD
    ==========================================================================
    */


    function buildVisitorPayload(){



        return {


            action:
                "createVisitor",



            fullName:

                getValue(
                    "fullName"
                ),



            email:

                getValue(
                    "email"
                ),



            mobile:

                getValue(
                    "mobile"
                ),



            district:

                getValue(
                    "district"
                ),



            state:

                getValue(
                    "state"
                ),



            language:

                getValue(
                    "language"
                ),



            source:

                getValue(
                    "source"
                ),



            device:

                detectDevice()



        };


    }








    /*
    ==========================================================================
       API CALL
    ==========================================================================
    */


    async function createVisitor(payload){



        const response =

            await fetch(
                CTM_API_URL,
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
                            payload
                        )


                }
            );



        return await response.json();


    }









    /*
    ==========================================================================
       SESSION STORAGE
    ==========================================================================
    */


    function saveVisitorSession(response){



        localStorage.setItem(

            "ctmVisitor",

            JSON.stringify(
                response
            )

        );


    }









    /*
    ==========================================================================
       NAVIGATION
    ==========================================================================
    */


    function navigateToAssessment(){



        window.location.href =

            "assessment-01.html";


    }









    /*
    ==========================================================================
       HELPERS
    ==========================================================================
    */


    function getValue(id){



        return document

            .getElementById(id)

            .value

            .trim();



    }







    function detectDevice(){



        if(
            /Mobi|Android/i.test(
                navigator.userAgent
            )
        ){

            return "Mobile";

        }


        return "Desktop";


    }







    function setLoading(
        button,
        loading
    ){



        if(!button)
            return;



        button.disabled =
            loading;



        if(loading){


            button.dataset.text =
                button.innerHTML;



            button.innerHTML =

                "Processing...";


        }

        else{


            button.innerHTML =

                button.dataset.text;


        }



    }







    function showError(message){



        alert(message);



    }







    /*
    ==========================================================================
       PAGE READY
    ==========================================================================
    */


    document.addEventListener(

        "DOMContentLoaded",

        initRegistrationPage

    );



})();

