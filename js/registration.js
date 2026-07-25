
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : registration.js
   Version     : 5.4

   Status      : 🔒 CLEAN MASTER

   Purpose     : Registration Controller

                  Owns
                  • Registration Initialization
                  • KYC Form Handling
                  • Data Collection
                  • API Submission
                  • Visitor ID Capture
                  • Journey Navigation

                  Data Flow

                  registration.html
                         ↓
                  registration.js
                         ↓
                  api.js
                         ↓
                  Google Apps Script API
                         ↓
                  Visitors Sheet

   ========================================================================== */


'use strict';






/* ==========================================================================
   REGISTRATION CONTROLLER
   ========================================================================== */


const Registration = {



    /* ======================================================================
       INITIALIZE
       ====================================================================== */


    init: function(){



        this.cacheDOM();



        this.bindEvents();



        this.restoreRegistration();



        this.animatePage();



    },








    /* ======================================================================
       CACHE DOM ELEMENTS
       ====================================================================== */


    cacheDOM: function(){



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

   
/* ==========================================================================
   EVENT BINDING
   ========================================================================== */


    bindEvents: function(){



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








/* ==========================================================================
   RESTORE SAVED REGISTRATION DATA
   ========================================================================== */


    restoreRegistration: function(){



        try{





            const savedData =

                localStorage.getItem(

                    'ctmRegistration'

                );







            if(!savedData){



                return;



            }








            const data =

                JSON.parse(

                    savedData

                );








            Object.keys(data).forEach(



                function(key){





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



                'CTM Registration Restore Error:',



                error



            );





        }



    },








/* ==========================================================================
   FORM VALIDATION
   ========================================================================== */


    validate: function(){



        if(!this.form){



            return false;



        }








        if(!this.form.checkValidity()){



            this.form.reportValidity();



            return false;



        }








        return true;



    },

   
/* ==========================================================================
   COLLECT REGISTRATION DATA

   Purpose:
   Convert HTML form values into Google Sheet compatible payload.

   Sheet Mapping:

   Timestamp
   VisitorID
   AssessmentDate
   InitialEmotion
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
   PDFSent
   EmailSent
   WheelStatus

   ========================================================================== */


    collectData: function(){



        return {



            Timestamp:

                new Date().toISOString(),






            VisitorID:

                '',






            AssessmentDate:

                new Date().toISOString(),






            InitialEmotion:

                '',






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

                ) || 'Tamil',






            Device:

                this.getDevice(),






            CurrentPage:

                'Registration',






            CompletionStatus:

                'Registered',






            PDFSent:

                'No',






            EmailSent:

                'No',






            WheelStatus:

                'Pending'





        };



    },








/* ==========================================================================
   SAFE FIELD VALUE READER
   ========================================================================== */


    getValue: function(id){



        const element =

            document.getElementById(

                id

            );







        if(!element){



            return '';



        }








        return element.value.trim();



    },








/* ==========================================================================
   DEVICE DETECTION
   ========================================================================== */


    getDevice: function(){



        return /Mobi/i.test(

            navigator.userAgent

        )

        ?



            'Mobile'



        :



            'Desktop';



    },

   
/* ==========================================================================
   SAVE REGISTRATION LOCALLY
   ========================================================================== */


    saveLocal: function(data){



        try{





            localStorage.setItem(



                'ctmRegistration',



                JSON.stringify(

                    data

                )



            );







        }



        catch(error){





            console.error(



                'CTM Local Storage Error:',



                error



            );





        }



    },








/* ==========================================================================
   SUBMIT REGISTRATION

   Flow:

   Form Submit
        ↓
   Validate
        ↓
   Collect KYC Data
        ↓
   Save Local
        ↓
   Send ApiService.registerVisitor()
        ↓
   Receive VisitorID
        ↓
   Update Local Data
        ↓
   Navigate Assessment

   ========================================================================== */


    submit: async function(event){



        event.preventDefault();







        if(!this.validate()){



            return;



        }








        const registrationData =

            this.collectData();








        console.log(



            'CTM Registration Payload:',



            registrationData



        );








        this.saveLocal(

            registrationData

        );








        try{





            if(



                !window.ApiService

                ||

                typeof window.ApiService.registerVisitor !== 'function'



            ){





                throw new Error(



                    'ApiService.registerVisitor() unavailable'



                );





            }








            const response =

                await window.ApiService.registerVisitor(



                    registrationData



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





                registrationData.VisitorID =

                    response.data.visitorId;







            }








            else if(



                response

                &&

                response.visitorId



            ){





                registrationData.VisitorID =

                    response.visitorId;







            }








            this.saveLocal(



                registrationData



            );







        }



        catch(error){





            console.error(



                'CTM Registration Failed:',



                error



            );







            alert(



                'Registration could not be completed. Please try again.'



            );







            return;



        }








        this.goNext();



    },

   
/* ==========================================================================
   NAVIGATE TO ASSESSMENT

   Preferred:
   CTM PATH™ Router

   Fallback:
   Direct page navigation

   ========================================================================== */


    goNext: function(){



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








        window.location.href =



            '/pages/assessment.html';





    },








/* ==========================================================================
   NAVIGATE BACK TO LANDING PAGE
   ========================================================================== */


    goBack: function(){



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

   
/* ==========================================================================
   PAGE ENTRANCE ANIMATION
   ========================================================================== */


    animatePage: function(){



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



            function(selector,index){





                const element =

                    document.querySelector(

                        selector

                    );








                if(!element){



                    return;



                }








                element.style.opacity =

                    '0';







                element.style.transform =

                    'translateY(30px)';








                element.style.transition =

                    'opacity .7s ease, transform .7s ease';








                setTimeout(



                    function(){





                        element.style.opacity =

                            '1';







                        element.style.transform =

                            'translateY(0)';





                    },



                    180 * index



                );






            }



        );



    }



};








/* ==========================================================================
   DOM READY INITIALIZATION
   ========================================================================== */


document.addEventListener(



    'DOMContentLoaded',



    function(){



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


   Version     : 5.4


   Status      : 🔒 CLEAN MASTER


   ========================================================================== */
