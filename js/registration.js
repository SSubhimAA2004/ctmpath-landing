
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/registration.js
 Version     : 1.0

 Page:
 PAGE 02 — REGISTRATION™

 Purpose:
 Capture visitor details and create CTM VisitorID.

 Responsibilities:
 - Form validation
 - Payload creation
 - API submission
 - Save VisitorID
 - Move visitor forward

 Dependencies:
 - api.js
 - storage.js
 - app.js

 Status:
 🔒 PAGE 02 Runtime Foundation

==============================================================================
*/


(function () {


    "use strict";





    /*
    ==========================================================================
       INITIALIZE
    ==========================================================================
    */


    function initRegistrationPage(){



        console.log(

            "CTM PATH™ Registration Controller Ready."

        );





        const form =

            document.getElementById(

                "registrationForm"

            );





        if(!form){



            console.error(

                "CTM PATH™ Registration form missing."

            );



            return;



        }







        form.addEventListener(

            "submit",

            handleRegistrationSubmit

        );



    }









    /*
    ==========================================================================
       SUBMIT REGISTRATION
    ==========================================================================
    */


    async function handleRegistrationSubmit(event){



        event.preventDefault();





        const button =

            document.getElementById(

                "continueJourneyButton"

            );







        setLoadingState(

            button,

            true

        );









        try {



            const payload = {


                fullName:

                    getValue("fullName"),



                email:

                    getValue("email"),



                mobile:

                    getValue("mobile"),



                district:

                    getValue("district"),



                state:

                    getValue("state"),



                language:

                    getValue("language"),



                source:

                    getValue("source"),



                device:

                    detectDevice()



            };









            console.log(

                "CTM PATH™ Registration Payload:",

                payload

            );









            const response =

                await createVisitor(

                    payload

                );









            if(

                response &&

                response.visitorId

            ){





                saveVisitorData(

                    response

                );









                showSuccess();









                setTimeout(

                    function(){



                        CTM_APP.loadPage(

                            "pages/assessment-01.html"

                        );



                    },

                    1000

                );



            }

            else {



                throw new Error(

                    "Visitor creation failed."

                );


            }





        }

        catch(error){



            console.error(

                "CTM PATH™ Registration Error:",

                error

            );



            showError();



        }

        finally {



            setLoadingState(

                button,

                false

            );


        }



    }









    /*
    ==========================================================================
       GET VALUE
    ==========================================================================
    */


    function getValue(id){



        const element =

            document.getElementById(id);





        return element ?

            element.value.trim()

            :

            "";



    }









    /*
    ==========================================================================
       DEVICE DETECTION
    ==========================================================================
    */


    function detectDevice(){



        if(

            window.innerWidth <= 768

        ){



            return "Mobile";


        }



        return "Desktop";



    }









    /*
    ==========================================================================
       BUTTON STATE
    ==========================================================================
    */


    function setLoadingState(

        button,

        loading

    ){



        if(!button){

            return;

        }







        if(loading){



            button.disabled = true;


            button.innerHTML =

                "Creating Your Journey...";



        }

        else {



            button.disabled = false;


            button.innerHTML =

                `

                தொடருங்கள்

                <br>

                Continue My Journey

                `;



        }



    }









    /*
    ==========================================================================
       SUCCESS
    ==========================================================================
    */


    function showSuccess(){



        console.log(

            "CTM PATH™ Visitor Created Successfully."

        );



    }









    /*
    ==========================================================================
       ERROR
    ==========================================================================
    */


    function showError(){



        alert(

            "Unable to create your journey. Please try again."

        );



    }









    /*
    ==========================================================================
       START
    ==========================================================================
    */


    initRegistrationPage();



})();

