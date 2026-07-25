
/* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : js/registration.js
   Version     : 5.0
   Status      : 🔒 PREMIUM FOUNDATION

   Purpose     : Registration Controller

                  Owns
                  • Page Initialization
                  • Form Handling
                  • Validation
                  • Local Storage
                  • API Registration
                  • Navigation
                  • Entrance Animation

                  Owns NO
                  • UI Rendering
                  • Database Logic
                  • Assessment Logic

   ========================================================================== */


(() => {


    "use strict";



    const Registration = {



        /* ==========================================================
           INITIALIZE
           ========================================================== */


        init(){


            this.cacheDOM();


            this.bindEvents();


            this.restoreRegistration();


            this.animatePage();


        },






        /* ==========================================================
           CACHE DOM ELEMENTS
           ========================================================== */


        cacheDOM(){


            this.form =

                document.getElementById(

                    "registrationForm"

                );



            this.backButton =

                document.getElementById(

                    "backButton"

                );



            this.continueButton =

                document.getElementById(

                    "continueButton"

                );


        },






        /* ==========================================================
           EVENT BINDING
           ========================================================== */


        bindEvents(){



            if(this.backButton){


                this.backButton.addEventListener(


                    "click",


                    this.goBack.bind(this)


                );


            }





            if(this.form){


                this.form.addEventListener(


                    "submit",


                    this.submit.bind(this)


                );


            }



        },


       /* ==========================================================
   RESTORE SAVED REGISTRATION
   ========================================================== */


        restoreRegistration(){


            try{


                const savedData = JSON.parse(


                    localStorage.getItem(

                        "ctmRegistration"

                    )

                    ||

                    "{}"


                );




                Object.keys(savedData).forEach(


                    key => {



                        const field =

                            document.getElementById(

                                key

                            );



                        if(field){


                            field.value =

                                savedData[key];


                        }


                    }


                );



            }


            catch(error){



                console.error(


                    "Registration Restore Error",


                    error


                );


            }



        },






        /* ==========================================================
           FORM VALIDATION
           ========================================================== */


        validate(){



            if(!this.form){


                return false;


            }





            if(!this.form.checkValidity()){



                this.form.reportValidity();



                return false;



            }



            return true;



        },






        /* ==========================================================
           COLLECT FORM DATA
           ========================================================== */


        collectData(){



            return {



                fullName:

                    this.getValue(

                        "fullName"

                    ),





                mobile:

                    this.getValue(

                        "mobile"

                    ),





                email:

                    this.getValue(

                        "email"

                    ),





                district:

                    this.getValue(

                        "district"

                    ),





                state:

                    this.getValue(

                        "state"

                    ),





                language:

                    this.getValue(

                        "language"

                    ),





                source:

                    this.getValue(

                        "source"

                    ),





                device:

                    navigator.userAgent,





                timestamp:

                    new Date().toISOString()



            };



        },






        /* ==========================================================
           SAFE FIELD VALUE
           ========================================================== */


        getValue(id){



            const element =

                document.getElementById(

                    id

                );



            return element

                ?

                element.value.trim()

                :

                "";



        },

       /* ==========================================================
   SAVE LOCAL REGISTRATION
   ========================================================== */


        saveLocal(data){


            localStorage.setItem(


                "ctmRegistration",


                JSON.stringify(

                    data

                )


            );





            if(


                window.CTMApp

                &&

                typeof window.CTMApp.setState === "function"


            ){



                window.CTMApp.setState({



                    registration:data



                });



            }



        },







        /* ==========================================================
           SUBMIT REGISTRATION
           ========================================================== */


        async submit(event){



            event.preventDefault();





            if(!this.validate()){



                return;



            }





            const registration =

                this.collectData();





            this.saveLocal(


                registration


            );







            try{





                if(


                    window.API

                    &&

                    typeof window.API.registerVisitor === "function"


                ){





                    const response =

                        await window.API.registerVisitor(


                            registration


                        );







                    if(


                        response

                        &&

                        response.data

                        &&

                        response.data.visitorId


                    ){





                        registration.visitorId =

                            response.data.visitorId;





                        this.saveLocal(


                            registration


                        );



                    }







                }





            }


            catch(error){





                console.error(


                    "Registration API Error",


                    error


                );





            }







            this.goNext();





        },








        /* ==========================================================
           NAVIGATE NEXT
           ========================================================== */


        goNext(){





            if(



                window.Router

                &&

                window.Router.ROUTES



            ){





                window.Router.go(



                    window.Router.ROUTES.ASSESSMENT



                );





            }





            else{





                window.location.href =

                    "assessment.html";





            }





        },








        /* ==========================================================
           NAVIGATE BACK
           ========================================================== */


        goBack(){





            if(



                window.Router

                &&

                window.Router.ROUTES



            ){





                window.Router.go(



                    window.Router.ROUTES.LANDING



                );





            }





            else{





                window.location.href =

                    "landing.html";





            }





        },

       /* ==========================================================
   PAGE ENTRANCE ANIMATION
   ========================================================== */


        animatePage(){



            if(


                window.matchMedia(

                    "(prefers-reduced-motion: reduce)"

                ).matches



            ){



                return;



            }







            const sections = [



                ".progress-section",



                ".hero",



                ".registration-form"



            ];








            sections.forEach(



                (selector,index)=>{





                    const element =

                        document.querySelector(

                            selector

                        );





                    if(!element){



                        return;



                    }








                    element.style.opacity = "0";





                    element.style.transform =

                        "translateY(30px)";








                    element.style.transition =

                        "opacity .70s ease, transform .70s ease";









                    setTimeout(()=>{





                        element.style.opacity = "1";





                        element.style.transform =

                            "translateY(0)";





                    },180 * index);






                }



            );





        }






    };









    /* ==========================================================
       START APPLICATION
       ========================================================== */






    document.addEventListener(



        "DOMContentLoaded",



        ()=>{



            Registration.init();



        }



    );







})();
