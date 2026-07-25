
/* ==========================================================================
   CTM PATH™ Guided Journey v4.0
   File        : js/registration.js
   Version     : 4.0
   Status      : 🔒 LOCKED
   Purpose     : Registration Controller

                  Owns
                  • Registration Initialization
                  • Journey State
                  • Form Validation
                  • Save Registration
                  • Continue Navigation
                  • Back Navigation
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

            this.loadSavedData();

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
           LOAD SAVED DATA
           ========================================================== */

        loadSavedData() {

            try {

                const data = JSON.parse(

                    localStorage.getItem("ctmRegistration") || "{}"

                );

                Object.keys(data).forEach(id => {

                    const field =
                        document.getElementById(id);

                    if (field) {

                        field.value = data[id];

                    }

                });

            }

            catch(error){

                console.error(error);

            }

        },

        /* ==========================================================
           SAVE DATA
           ========================================================== */

        saveData() {

            const data = {

                fullName:

                    document.getElementById("fullName").value.trim(),

                mobile:

                    document.getElementById("mobile").value.trim(),

                email:

                    document.getElementById("email").value.trim(),

                district:

                    document.getElementById("district").value.trim(),

                state:

                    document.getElementById("state").value.trim(),

                language:

                    document.getElementById("language").value,

                source:

                    document.getElementById("source").value

            };

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

            return data;

        },

        /* ==========================================================
           VALIDATION
           ========================================================== */

        validate() {

            if (!this.form.checkValidity()) {

                this.form.reportValidity();

                return false;

            }

            return true;

        },

        /* ==========================================================
           SUBMIT
           ========================================================== */

        async submit(event) {

            event.preventDefault();

            if (!this.validate()) {

                return;

            }

            const data = this.saveData();

            try {

                if (

                    window.API &&

                    typeof window.API.register === "function"

                ){

                    await window.API.register(data);

                }

            }

            catch(error){

                console.error(error);

            }

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
           ANIMATION
           ========================================================== */

        animatePage() {

            if (

                window.matchMedia(

                    "(prefers-reduced-motion: reduce)"

                ).matches

            ){

                return;

            }

            const elements = [

                ".progress-section",

                ".hero",

                ".registration-form"

            ];

            elements.forEach((selector,index)=>{

                const element =

                    document.querySelector(selector);

                if(!element) return;

                element.style.opacity="0";

                element.style.transform="translateY(28px)";

                element.style.transition=

                    "all .70s ease";

                setTimeout(()=>{

                    element.style.opacity="1";

                    element.style.transform="translateY(0)";

                },180*index);

            });

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

