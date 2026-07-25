
/* ==========================================================================
   CTM PATH™ Guided Journey v5.0

   File        : registration.js
   Version     : 5.2

   Status      : 🔒 FOUNDATION UPDATE

   Purpose     : Registration Controller

                  Owns
                  • Registration Initialization
                  • KYC Form Handling
                  • Data Validation
                  • API Submission
                  • Visitor ID Capture
                  • Journey Navigation

                  Sheet Mapping:
                  HTML Fields
                       ↓
                  Registration Object
                       ↓
                  ApiService
                       ↓
                  Google Apps Script Backend
                       ↓
                  Visitors Sheet

   ========================================================================== */


'use strict';







/* ==========================================================================
   REGISTRATION CONTROLLER
   ========================================================================== */


const Registration = {



    /* ======================================================================
       INITIALIZE MODULE
       ====================================================================== */


    init(){



        this.cacheDOM();



        this.bindEvents();



        this.restoreRegistration();



        this.animatePage();



    },








    /* ======================================================================
       DOM CACHE
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

   id="registration-js-v52-batch-1b"
/* ======================================================================
   EVENT BINDING
   ====================================================================== */


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








/* ======================================================================
   RESTORE SAVED REGISTRATION DATA
   ====================================================================== */


    restoreRegistration(){



        try{





            const saved =

                localStorage.getItem(

                    'ctmRegistration'

                );







            if(!saved){



                return;



            }







            const data =

                JSON.parse(

                    saved

                );








            Object.keys(data).forEach(



                key => {



                    const field =

                        document.getElementById(

                            key

                        );







                    if(field){



                        field.value =

                            data[key];



                    }



                }



            );





        }



        catch(error){





            console.error(



                'Restore Registration Error:',



                error



            );





        }



    },








/* ======================================================================
   VALIDATE FORM
   ====================================================================== */


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

/* ======================================================================
   COLLECT REGISTRATION DATA

   IMPORTANT:
   Keys match Google Sheet headers exactly.

   Sheet:

   FullName
   Email
   Mobile
   District
   State
   ReferralSource
   Language
   Device
   CurrentPage
   CompletionStatus

   ====================================================================== */


    collectData(){



        return {



            FullName:

                this.getValue(

                    'fullName'

                ),






            Email:

                this.getValue(

                    'email'

                ),






            Mobile:

                this.getValue(

                    'mobile'

                ),






            District:

                this.getValue(

                    'district'

                ),






            State:

                this.getValue(

                    'state'

                ),






            ReferralSource:

                this.getValue(

                    'source'

                ),






            Language:

                this.getValue(

                    'language'

                ),






            Device:

                this.getDevice(),






            CurrentPage:

                'Registration',






            CompletionStatus:

                'Registered',






            StartTime:

                new Date().toISOString()



        };



    },








/* ======================================================================
   SAFE FIELD READER
   ====================================================================== */


    getValue(id){



        const element =

            document.getElementById(

                id

            );







        if(!element){



            return '';



        }








        return element.value.trim();



    },








/* ======================================================================
   DEVICE DETECTION
   ====================================================================== */


    getDevice(){



        return /Mobi/i.test(

            navigator.userAgent

        )

        ?

        'Mobile'

        :

        'Desktop';



    },

/* ======================================================================
   SAVE LOCAL REGISTRATION DATA
   ====================================================================== */


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








/* ======================================================================
   SUBMIT REGISTRATION

   Flow:

   Form Submit
        ↓
   Collect KYC
        ↓
   Save Local
        ↓
   ApiService.registerVisitor()
        ↓
   Receive VisitorID
        ↓
   Save VisitorID
        ↓
   Navigate Assessment

   ====================================================================== */


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



                window.ApiService

                &&

                typeof window.ApiService.registerVisitor === 'function'



            ){





                const response =

                    await window.ApiService.registerVisitor(



                        registration



                    );








                console.log(



                    'CTM Registration Response:',



                    response



                );








                if(



                    response

                    &&

                    response.data

                    &&

                    response.data.visitorId



                ){





                    registration.VisitorID =

                        response.data.visitorId;







                    this.saveLocal(



                        registration



                    );





                }







                else if(



                    response

                    &&

                    response.visitorId



                ){





                    registration.VisitorID =

                        response.visitorId;







                    this.saveLocal(



                        registration



                    );





                }





            }



            else{





                console.error(



                    'ApiService.registerVisitor unavailable'



                );





            }





        }





        catch(error){





            console.error(



                'CTM Registration API Error:',



                error



            );





        }








        this.goNext();



    },

/* ======================================================================
   NAVIGATE TO ASSESSMENT PAGE
   ====================================================================== */


    goNext(){



        /*
           Preferred route:
           Router controls journey flow
        */






        if(



            window.Router

            &&

            window.Router.ROUTES



        ){





            window.Router.go(



                window.Router.ROUTES.ASSESSMENT



            );





            return;



        }








        /*
           Fallback:
           Direct navigation
        */





        window.location.href =



            '/pages/assessment.html';





    },








/* ======================================================================
   NAVIGATE BACK TO LANDING
   ====================================================================== */


    goBack(){



        if(



            window.Router

            &&

            window.Router.ROUTES



        ){





            window.Router.go(



                window.Router.ROUTES.LANDING



            );





            return;



        }








        window.location.href =



            '/pages/landing.html';





    },

/* ======================================================================
   PAGE ENTRANCE ANIMATION
   ====================================================================== */


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
   INITIALIZE APPLICATION
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
   END OF FILE


   File        : registration.js


   Version     : 5.2


   Status      : 🔒 FOUNDATION UPDATE


   ========================================================================== */
