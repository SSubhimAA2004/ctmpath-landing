
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/registration.js
   Version     : 1.1

   Status      : FRAGMENT FORM ACTIVATION PATCH


   Purpose:

   Controls Page 02 registration experience.


   Responsibilities:

   ✓ Capture visitor details
   ✓ Validate form
   ✓ Send registration request


   Does NOT:

   ✗ Database operations
   ✗ Assessment logic


   ========================================================================== */


const Registration = (() => {



    let initialized = false;









    function init(){



        if(initialized){

            return;

        }



        const form =

        document.getElementById(

            "registration-form"

        );





        if(!form){

            return;

        }



        initialized = true;



        bindSubmit(form);



    }









    function bindSubmit(form){



        form.addEventListener(

            "submit",

            handleSubmit

        );



        const button =

        document.getElementById(

            "continue-registration"

        );





        if(button){



            button.addEventListener(

                "click",

                ()=>{


                    form.requestSubmit();



                }

            );



        }



    }









    async function handleSubmit(event){



        event.preventDefault();





        const data =

        collectData();





        if(!validate(data)){



            showMessage(

                "Please complete all required fields."

            );



            return;

        }







        setLoading(true);





        try {



            const response =

            await API.registerVisitor(

                data

            );





            console.log(

                "Registration success:",

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



        catch(error){



            console.error(

                "Registration error:",

                error

            );



            showMessage(

                "Unable to complete registration."

            );



        }



        finally {



            setLoading(false);



        }



    }









    function collectData(){



        return {



            fullName:

            value("fullName"),



            email:

            value("email"),



            mobile:

            value("mobile"),



            district:

            value("district"),



            state:

            value("state"),



            language:

            selectedLanguage(),



            source:

            value("source"),



            device:

            navigator.userAgent



        };



    }









    function value(id){



        const element =

        document.getElementById(id);





        return element

        ?

        element.value.trim()

        :

        "";



    }









    function selectedLanguage(){



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









    function validate(data){



        return (

            data.fullName &&

            data.email &&

            data.mobile &&

            data.district &&

            data.state

        );



    }









    function setLoading(state){



        const button =

        document.getElementById(

            "continue-registration"

        );





        if(!button){

            return;

        }





        button.disabled = state;





        if(state){



            button.innerHTML =

            "Creating Your Journey...";



        }

        else {



            button.innerHTML =

            `

            என் பயணத்தை தொடர்கிறேன்

            <br>

            <span>

            Continue My Journey™

            </span>

            `;



        }



    }









    function showMessage(message){



        alert(message);



    }









    return {



        init



    };



})();









window.Registration = Registration;









document.addEventListener(

    "ctm-page-loaded",

    ()=>{


        Registration.init();


    }

);
