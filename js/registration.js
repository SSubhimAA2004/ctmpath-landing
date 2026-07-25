
/* ==========================================================================
   CTM PATH™ Guided Journey v4.0
   File        : js/registration.js
   Version     : 4.0
   Status      : 🔒 LOCKED
   Purpose     : Registration Controller

                  Owns
                  • Page Initialization
                  • Restore Saved Registration
                  • Form Validation
                  • Save Registration
                  • API Registration
                  • Navigation
                  • Entrance Animation

   ========================================================================== */

(() => {

    "use strict";

    const Registration = {

        /* ==========================================================
           INITIALIZE
           ========================================================== */

        init() {

            this.cacheDOM();

            this.bindEvents();

            this.restoreRegistration();

            this.animatePage();

        },

        /* ==========================================================
           CACHE DOM
           ========================================================== */

        cacheDOM() {

            this.form =
                document.getElementById("registrationForm");

            this.backButton =
                document.getElementById("backButton");

            this.continueButton =
                document.getElementById("continueButton");

        },

        /* ==========================================================
           EVENTS
           ========================================================== */

        bindEvents() {

            if (this.backButton) {

                this.backButton.addEventListener(

                    "click",

                    this.goBack.bind(this)

                );

            }

            if (this.form) {

                this.form.addEventListener(

                    "submit",

                    this.submit.bind(this)

                );

            }

        },

        /* ==========================================================
           RESTORE LOCAL DATA
           ========================================================== */

        restoreRegistration() {

            try {

                const data = JSON.parse(

                    localStorage.getItem(

                        "ctmRegistration"

                    ) || "{}"

                );

                Object.keys(data).forEach(key => {

                    const field =

                        document.getElementById(key);

                    if (field) {

                        field.value = data[key];

                    }

                });

            }

            catch(error){

                console.error(

                    "Registration Restore Error",

                    error

                );

            }

        },

        /* ==========================================================
           VALIDATE
           ========================================================== */

        validate() {

            if (!this.form.checkValidity()) {

                this.form.reportValidity();

                return false;

            }

            return true;

        },

        /* ==========================================================
           COLLECT FORM
           ========================================================== */

        collectData() {

            return {

                fullName:

                    document
                        .getElementById("fullName")
                        .value
                        .trim(),

                mobile:

                    document
                        .getElementById("mobile")
                        .value
                        .trim(),

                email:

                    document
                        .getElementById("email")
                        .value
                        .trim(),

                district:

                    document
                        .getElementById("district")
                        .value
                        .trim(),

                state:

                    document
                        .getElementById("state")
                        .value
                        .trim(),

                language:

                    document
                        .getElementById("language")
                        .value,

                source:

                    document
                        .getElementById("source")
                        .value,

                device:

                    navigator.userAgent,

                timestamp:

                    new Date().toISOString()

            };

        },

        /* ==========================================================
           SAVE LOCAL
           ========================================================== */

        saveLocal(data) {

            localStorage.setItem(

                "ctmRegistration",

                JSON.stringify(data)

            );

            if (

                window.CTMApp &&

                typeof window.CTMApp.setState === "function"

            ){

                window.CTMApp.setState({

                    registration:data

                });

            }

        },

        /* ==========================================================
           SUBMIT
           ========================================================== */

        async submit(event) {

            event.preventDefault();

            if (!this.validate()) {

                return;

            }

            const registration =

                this.collectData();

            this.saveLocal(

                registration

            );

            try {

                if (

                    window.API &&

                    typeof window.API.register === "function"

                ){

                    const response =

                        await window.API.register(

                            registration

                        );

                    if (

                        response &&

                        response.visitorId

                    ){

                        registration.visitorId =

                            response.visitorId;

                        this.saveLocal(

                            registration

                        );

                    }

                }

            }

            catch(error){

                console.error(

                    "Registration Error",

                    error

                );

            }

            this.goNext();

        },

        /* ==========================================================
           NEXT
           ========================================================== */

        goNext() {

            if (

                window.Router &&

                window.Router.ROUTES

            ){

                window.Router.go(

                    window.Router.ROUTES.ASSESSMENT

                );

            }

        },

        /* ==========================================================
           BACK
           ========================================================== */

        goBack() {

            if (

                window.Router &&

                window.Router.ROUTES

            ){

                window.Router.go(

                    window.Router.ROUTES.LANDING

                );

            }

        },

        /* ==========================================================
           PAGE ANIMATION
           ========================================================== */

        animatePage() {

            if (

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

                    if(!element) return;

                    element.style.opacity="0";

                    element.style.transform=

                        "translateY(30px)";

                    element.style.transition=

                        "opacity .70s ease, transform .70s ease";

                    setTimeout(()=>{

                        element.style.opacity="1";

                        element.style.transform=

                            "translateY(0)";

                    },180*index);

                }

            );

        }

    };

    /* ==========================================================
       START
       ========================================================== */

    document.addEventListener(

        "DOMContentLoaded",

        () => Registration.init()

    );

})();

