
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/registration.js
 Version     : 1.1

 Page:
 PAGE 02 — REGISTRATION™

 Purpose:
 Create visitor profile and start journey.

 Dependencies:
 - api.js
 - storage.js
 - app.js

 Status:
 🔒 Runtime Connected

==============================================================================
*/


(function () {


"use strict";





/*
==============================================================================
 INITIALIZATION
==============================================================================
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

            "Registration form not found."

        );


        return;


    }





    form.addEventListener(

        "submit",

        submitRegistration

    );



}









/*
==============================================================================
 SUBMIT REGISTRATION
==============================================================================
*/


async function submitRegistration(event){



    event.preventDefault();





    const button =

        document.getElementById(

            "continueJourneyButton"

        );





    setButtonLoading(

        button,

        true

    );







    try {



        const visitorData = {



            fullName:

                getField("fullName"),



            email:

                getField("email"),



            mobile:

                getField("mobile"),



            district:

                getField("district"),



            state:

                getField("state"),



            language:

                getField("language"),



            source:

                getField("source"),



            device:

                detectDevice()



        };







        console.log(

            "CTM PATH™ Visitor Data:",

            visitorData

        );








        const response =

            await CTM_API.createVisitor(

                visitorData

            );









        if(

            response &&

            response.visitorId

        ){



            saveVisitorSession(

                response,

                visitorData

            );



            showSuccess();



            setTimeout(

                function(){



                    CTM_APP.loadPage(

                        "pages/assessment-01.html"

                    );



                },

                1200

            );



        }

        else {



            throw new Error(

                "Visitor ID not received."

            );


        }






    }

    catch(error){



        console.error(

            "CTM PATH™ Registration Failed:",

            error

        );



        showError();



    }

    finally {



        setButtonLoading(

            button,

            false

        );


    }



}









/*
==============================================================================
 FIELD HELPER
==============================================================================
*/


function getField(id){



    const field =

        document.getElementById(id);





    return field ?

        field.value.trim()

        :

        "";



}









/*
==============================================================================
 DEVICE
==============================================================================
*/


function detectDevice(){



    return window.innerWidth <= 768

        ? "Mobile"

        : "Desktop";



}









/*
==============================================================================
 SESSION STORAGE
==============================================================================
*/


function saveVisitorSession(

    response,

    visitorData

){



    const session = {



        visitorId:

            response.visitorId,



        ...visitorData,



        createdAt:

            new Date().toISOString()



    };







    if(

        window.CTM_STORAGE &&

        typeof window.CTM_STORAGE.save === "function"

    ){



        window.CTM_STORAGE.save(

            "visitor",

            session

        );



    }

    else {



        localStorage.setItem(

            "ctmVisitor",

            JSON.stringify(session)

        );



    }







    console.log(

        "CTM PATH™ Visitor Session Saved:",

        session

    );



}









/*
==============================================================================
 BUTTON STATE
==============================================================================
*/


function setButtonLoading(

    button,

    loading

){



    if(!button){

        return;

    }







    if(loading){



        button.disabled = true;


        button.innerHTML =

        `

        Creating Your Journey...

        `;



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
==============================================================================
 SUCCESS
==============================================================================
*/


function showSuccess(){



    console.log(

        "CTM PATH™ Journey Created Successfully."

    );



}









/*
==============================================================================
 ERROR
==============================================================================
*/


function showError(){



    alert(

        "Unable to start your journey. Please try again."

    );



}









/*
==============================================================================
 START
==============================================================================
*/


initRegistrationPage();



})();

