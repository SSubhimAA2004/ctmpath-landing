
/* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : registration.js
   Version     : 5.1

   Status      : 🔒 FOUNDATION UPDATE

   Purpose     : Registration Controller

                  Owns
                  • Page Initialization
                  • Form Handling
                  • Validation
                  • KYC Data Collection
                  • Local Storage
                  • API Registration
                  • Navigation

                  Owns NO
                  • UI Rendering
                  • Database Logic
                  • Assessment Calculation

   ========================================================================== */


'use strict';





/* ==========================================================================
   REGISTRATION CONTROLLER
   ========================================================================== */


const Registration = {



    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    init(){


        this.cacheDOM();


        this.bindEvents();


        this.restoreRegistration();


        this.animatePage();


    },








    /* ======================================================================
       CACHE DOM ELEMENTS
       ====================================================================== */


    cacheDOM(){



        this.form =

            document.getElementById(

                'registrationForm'

            );





        this.backButton =

            document.getElementById(

                'backButton'

            );





        this.continueButton =

            document.getElementById(

                'continueButton'

            );



    },

   /* ==========================================================
   EVENT BINDING
   ========================================================== */


    bindEvents(){



        if(this.backButton){



            this.backButton.addEventListener(



                'click',



                this.goBack.bind(this)



            );



        }








        if(this.form){



            this.form.addEventListener(



                'submit',



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



                    'ctmRegistration'



                )



                ||

                '{}'




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



                'Registration Restore Error:',



                error



            );



        }



    },








/* ==========================================================
   VALIDATE FORM
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
   COLLECT REGISTRATION DATA
   ========================================================== */


    collectData(){



        return {



            fullName:

                this.getValue(

                    'fullName'

                ),






            mobile:

                this.getValue(

                    'mobile'

                ),






            email:

                this.getValue(

                    'email'

                ),






            district:

                this.getValue(

                    'district'

                ),






            state:

                this.getValue(

                    'state'

                ),






            language:

                this.getValue(

                    'language'

                ),






            referralSource:

                this.getValue(

                    'referralSource'

                ),






            device:

                this.getDevice(),






            currentPage:

                'Registration',






            completionStatus:

                'Registered',






            startTime:

                new Date().toISOString()



        };



    },








/* ==========================================================
   SAFE FIELD VALUE
   ========================================================== */


    getValue(id){



        const field =

            document.getElementById(

                id

            );







        return field

            ?

            field.value.trim()

            :

            '';



    },








/* ==========================================================
   DEVICE INFORMATION
   ========================================================== */


    getDevice(){



        return /Mobi/i.test(

            navigator.userAgent

        )

            ?

            'Mobile'

            :

            'Desktop';



    },








/* ==========================================================
   SAVE LOCAL REGISTRATION
   ========================================================== */


    saveLocal(data){



        localStorage.setItem(



            'ctmRegistration',



            JSON.stringify(

                data

            )



        );







        if(



            window.CTM

            &&

            typeof window.CTM.setState === 'function'



        ){



            window.CTM.setState({



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





            /*
               IMPORTANT:
               api.js exports ApiService
               NOT API

               Correct object:
               window.ApiService
            */






            if(



                window.ApiService

                &&

                typeof window.ApiService.registerVisitor === 'function'



            ){





                const response =

                    await window.ApiService.registerVisitor(



                        registration



                    );









                console.log(



                    'Registration Response:',



                    response



                );








                if(



                    response

                    &&

                    response.visitorId



                ){





                    registration.visitorId =

                        response.visitorId;







                    this.saveLocal(



                        registration



                    );





                }







                else if(



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



            else{





                console.warn(



                    'ApiService.registerVisitor not available'



                );





            }





        }





        catch(error){





            console.error(



                'Registration API Error:',



                error



            );





        }








        this.goNext();





    },

   /* ==========================================================
   NAVIGATE TO NEXT PAGE
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



                '/pages/assessment.html';





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



                '/pages/landing.html';





        }





    },

   /* ==========================================================
   PAGE ENTRANCE ANIMATION
   ========================================================== */


    animatePage(){



        if(



            window.matchMedia(



                '(prefers-reduced-motion: reduce)'



            ).matches



        ){



            return;



        }








        const sections = [



            '.progress-section',



            '.hero',



            '.registration-form'



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








                element.style.opacity = '0';





                element.style.transform =

                    'translateY(30px)';








                element.style.transition =

                    'opacity .70s ease, transform .70s ease';








                setTimeout(()=>{





                    element.style.opacity = '1';





                    element.style.transform =

                        'translateY(0)';





                },180 * index);






            }



        );



    }





};








/* ==========================================================================
   INITIALIZE
   ========================================================================== */


document.addEventListener(



    'DOMContentLoaded',



    ()=>{



        Registration.init();



    }



);








/* ==========================================================================
   GLOBAL EXPORT
   ========================================================================== */


window.Registration = Registration;








/* ==========================================================================
   End of File


   File        : registration.js


   Version     : 5.1


   Status      : 🔒 FOUNDATION UPDATE


   ========================================================================== */
