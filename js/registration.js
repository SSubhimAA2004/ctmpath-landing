
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/registration.js
   Version     : 1.0

   Status      : 🔒 REGISTRATION DATA CAPTURE CONTROLLER


   Purpose:

   Manage Page 02 registration experience.


   Responsibilities:

   ✓ Capture visitor details
   ✓ Validate form
   ✓ Prepare registration payload
   ✓ Communicate with API layer


   Does NOT:

   ✗ Backend processing
   ✗ Database operations
   ✗ Assessment logic


   ========================================================================== */


const Registration = (() => {





    let initialized = false;









    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    function init(){



        if(initialized){

            return;

        }



        initialized = true;



        bindForm();



    }









    /* ==========================================================
       FORM BINDING
       ========================================================== */


    function bindForm(){



        const form =

        document.getElementById(

            "registration-form"

        );





        if(!form){

            return;

        }





        form.addEventListener(

            "submit",

            handleSubmit

        );



    }









    /* ==========================================================
       SUBMIT HANDLER
       ========================================================== */


    async function handleSubmit(event){



        event.preventDefault();





        const payload =

        collectData();





        if(!validate(payload)){


            showMessage(

                "Please complete all required fields."

            );


            return;

        }







        setLoading(true);





        try{



            const response =

            await sendRegistration(

                payload

            );





            handleSuccess(

                response

            );



        }



        catch(error){



            console.error(

                "Registration failed:",

                error

            );



            showMessage(

                "Something went wrong. Please try again."

            );



        }



        finally{



            setLoading(false);



        }



    }









    /* ==========================================================
       COLLECT FORM DATA
       ========================================================== */


    function collectData(){



        return {


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

            getLanguage(),



            source:

            getValue("source"),



            device:

            navigator.userAgent



        };



    }









    function getValue(id){



        const element =

        document.getElementById(id);





        return element

        ?

        element.value.trim()

        :

        "";



    }









    function getLanguage(){



        const selected =

        document.querySelector(

            "input[name='language']:checked"

        );





        return selected

        ?

        selected.value

        :

        "Tamil";



    }









    /* ==========================================================
       VALIDATION
       ========================================================== */


    function validate(data){



        return (



            data.fullName &&

            data.email &&

            data.mobile &&

            data.district &&

            data.state



        );



    }









    /* ==========================================================
       API CONNECTION
       ========================================================== */


    async function sendRegistration(

        payload

    ){



        if(

            window.API &&

            API.registerVisitor

        ){



            return await API.registerVisitor(

                payload

            );



        }





        throw new Error(

            "API layer unavailable"

        );



    }









    /* ==========================================================
       SUCCESS
       ========================================================== */


    function handleSuccess(response){



        console.log(

            "Registration successful:",

            response

        );





        document.dispatchEvent(



            new CustomEvent(

                "registration-complete",

                {

                    detail:response

                }

            )



        );



    }









    /* ==========================================================
       UI HELPERS
       ========================================================== */


    function setLoading(state){



        const button =

        document.querySelector(

            ".continue-button"

        );





        if(!button){

            return;

        }





        button.disabled = state;





        button.innerHTML =

        state

        ?

        "Creating Your Journey..."

        :

        "என் பயணத்தை தொடர்கிறேன்<br>Continue My Journey™";



    }









    function showMessage(message){



        alert(message);



    }









    return {



        init



    };





})();









document.addEventListener(

"DOMContentLoaded",

()=>{


    Registration.init();



});
