
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/registration.js
 Version     : 1.1

 Page:
 PAGE 02 — REGISTRATION™

 Purpose:
 Visitor registration controller.

 Responsibilities:
 - Capture visitor details
 - Validate form
 - Call shared API layer
 - Store VisitorID
 - Move to Assessment 01™

 Rules:
 - No direct fetch()
 - No backend URLs
 - No scoring logic
 - No assessment logic

 Dependencies:

 js/api.js
 js/storage.js

==============================================================================
*/


(function () {


    "use strict";





    /*
    ==========================================================================
       INITIALIZATION
    ==========================================================================
    */


    function initRegistration(){


        const form =

            document.getElementById(
                "registrationForm"
            );



        if(!form){


            console.warn(

                "CTM PATH™ Registration form not found."

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
       REGISTRATION PROCESS
    ==========================================================================
    */


    async function handleRegistration(event){


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



            const visitorData =

                collectVisitorData();





            if(!validateVisitorData(visitorData)){


                throw new Error(

                    "Please complete all required fields."

                );


            }






            const response =

                await CTM_API.createVisitor(

                    visitorData

                );







            if(

                response &&

                response.success

            ){



                saveVisitor(response);



                moveToAssessment();




            }

            else {



                throw new Error(

                    response.message ||

                    "Registration failed."

                );


            }





        }


        catch(error){



            console.error(

                "CTM PATH™ Registration Error:",

                error

            );



            showMessage(

                error.message

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
       COLLECT FORM DATA
    ==========================================================================
    */


    function collectVisitorData(){



        return {


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
       VALIDATION
    ==========================================================================
    */


    function validateVisitorData(data){



        return (

            data.fullName &&

            data.mobile &&

            data.email &&

            data.district &&

            data.state &&

            data.language &&

            data.source

        );


    }









    /*
    ==========================================================================
       SAVE VISITOR SESSION
    ==========================================================================
    */


    function saveVisitor(response){



        CTM_STORAGE.saveVisitor(

            response

        );



        CTM_STORAGE.saveJourney(

            {


                currentPage:

                    "REGISTRATION",


                visitorID:

                    response.visitorID



            }

        );



    }









    /*
    ==========================================================================
       NAVIGATION
    ==========================================================================
    */


    function moveToAssessment(){



        window.location.href =

            "assessment-01.html";



    }









    /*
    ==========================================================================
       HELPERS
    ==========================================================================
    */


    function getValue(id){



        const element =

            document.getElementById(id);



        return element

            ?

            element.value.trim()

            :

            "";



    }








    function detectDevice(){



        return /Mobi|Android/i.test(

            navigator.userAgent

        )

            ?

            "Mobile"

            :

            "Desktop";



    }








    function setLoading(button, loading){



        if(!button)
            return;





        button.disabled = loading;





        if(loading){


            button.dataset.originalText =

                button.innerHTML;



            button.innerHTML =

                "Processing...";



        }

        else{


            button.innerHTML =

                button.dataset.originalText;



        }


    }








    function showMessage(message){



        alert(message);



    }








    /*
    ==========================================================================
       PAGE READY
    ==========================================================================
    */


    document.addEventListener(

        "DOMContentLoaded",

        initRegistration

    );



})();

