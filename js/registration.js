
/* ==========================================================================
   CTM PATH™ Guided Journey
   FROM SURVIVAL TO LIVING™

   File        : registration.js
   Version     : 6.0
   Status      : PRODUCTION

   Purpose

   Owns
   --------------------------------------------------------------------------
   ✓ Registration Page
   ✓ Form Validation
   ✓ KYC Collection
   ✓ API Submission
   ✓ Visitor ID Capture
   ✓ Local Storage
   ✓ Journey Navigation

   Owns NO
   --------------------------------------------------------------------------
   ✗ Assessment
   ✗ Google Sheets
   ✗ Business Logic
   ✗ Scoring

========================================================================== */

'use strict';

/* ==========================================================================
   REGISTRATION CONTROLLER
========================================================================== */

const Registration = {

    form: null,

    backButton: null,

    continueButton: null,

    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.restoreRegistration();

        this.animatePage();

    },

    /* ======================================================================
       CACHE DOM
    ====================================================================== */

    cacheDOM() {

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

    /* ======================================================================
       EVENTS
    ====================================================================== */

    bindEvents() {

        if (this.backButton) {

            this.backButton.addEventListener(

                'click',

                this.goBack.bind(this)

            );

        }

        if (this.form) {

            this.form.addEventListener(

                'submit',

                this.submit.bind(this)

            );

        }

    },

    /* ======================================================================
       VALIDATE
    ====================================================================== */

    validate() {

        if (!this.form) {

            return false;

        }

        if (

            !this.form.checkValidity()

        ) {

            this.form.reportValidity();

            return false;

        }

        return true;

    },

    /* ======================================================================
       SAFE VALUE
    ====================================================================== */

    value(id) {

        const field =

            document.getElementById(id);

        if (!field) {

            return '';

        }

        return field.value.trim();

    },

    /* ======================================================================
       DEVICE
    ====================================================================== */

    getDevice() {

        return /Mobi/i.test(

            navigator.userAgent

        )

        ? 'Mobile'

        : 'Desktop';

    },

       /* ======================================================================
       COLLECT REGISTRATION DATA

       Backend Contract
       ----------------------------------------------------------------------
       Matches 08_Service.gs

       {
           fullName,
           email,
           mobile,
           district,
           state,
           source,
           language,
           device,
           emotion
       }

    ====================================================================== */

    collectData() {

        return {

            fullName:

                this.value(

                    'fullName'

                ),

            email:

                this.value(

                    'email'

                ),

            mobile:

                this.value(

                    'mobile'

                ),

            district:

                this.value(

                    'district'

                ),

            state:

                this.value(

                    'state'

                ),

            source:

                this.value(

                    'source'

                ),

            language:

                this.value(

                    'language'

                ) ||

                'Tamil',

            device:

                this.getDevice(),

            emotion:

                localStorage.getItem(

                    'ctmInitialEmotion'

                ) ||

                ''

        };

    },

    /* ======================================================================
       SAVE LOCAL REGISTRATION

       Stores only the information required by the frontend.

    ====================================================================== */

    saveLocal(data) {

        try {

            localStorage.setItem(

                'ctmRegistration',

                JSON.stringify(data)

            );

        }

        catch (error) {

            console.error(

                'Registration Storage Error',

                error

            );

        }

    },

    /* ======================================================================
       RESTORE REGISTRATION
    ====================================================================== */

    restoreRegistration() {

        try {

            const saved =

                localStorage.getItem(

                    'ctmRegistration'

                );

            if (!saved) {

                return;

            }

            const data =

                JSON.parse(saved);

            [

                'fullName',

                'email',

                'mobile',

                'district',

                'state',

                'source',

                'language'

            ].forEach(

                function (id) {

                    const field =

                        document.getElementById(id);

                    if (

                        field &&

                        data[id] !== undefined

                    ) {

                        field.value =

                            data[id];

                    }

                }

            );

        }

        catch (error) {

            console.error(

                'Registration Restore Error',

                error

            );

        }

    },

       /* ======================================================================
       SUBMIT REGISTRATION
       ====================================================================== */

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

        this.setLoading(true);

        try {

            const response =

                await ApiService.registerVisitor(

                    registration

                );

            console.log(

                'Registration Response',

                response

            );

            if (

                !response ||

                response.success !== true

            ) {

                throw new Error(

                    response?.message ||

                    'Registration failed.'

                );

            }

            /* ----------------------------------------------------------
               Visitor ID returned by GAS
            ---------------------------------------------------------- */

            const visitorId =

                response.data?.visitorId ||

                response.visitorId ||

                '';

            if (!visitorId) {

                throw new Error(

                    'Visitor ID not returned.'

                );

            }

            registration.visitorId =

                visitorId;

            this.saveLocal(

                registration

            );

            /* ----------------------------------------------------------
               Update Application State
            ---------------------------------------------------------- */

            if (

                window.CTMApp &&

                typeof CTMApp.setVisitor === 'function'

            ) {

                CTMApp.setVisitor(

                    registration

                );

            }

            /* ----------------------------------------------------------
               Navigate
            ---------------------------------------------------------- */

            this.goNext();

        }

        catch (error) {

            console.error(

                'Registration Error',

                error

            );

            alert(

                error.message ||

                'Unable to complete registration.'

            );

        }

        finally {

            this.setLoading(false);

        }

    },

    /* ======================================================================
       BUTTON STATE
       ====================================================================== */

    setLoading(isLoading) {

        if (!this.continueButton) {

            return;

        }

        this.continueButton.disabled =

            isLoading;

        if (isLoading) {

            this.continueButton.innerHTML =

                'Please Wait...';

        }

        else {

            this.continueButton.innerHTML =

                'Continue';

        }

    },

       /* ======================================================================
       NAVIGATE TO ASSESSMENT
    ====================================================================== */

    goNext() {

        if (

            window.Router &&

            window.Router.ROUTES

        ) {

            Router.go(

                Router.ROUTES.ASSESSMENT

            );

            return;

        }

        window.location.href =

            '/pages/assessment.html';

    },

    /* ======================================================================
       BACK TO LANDING
    ====================================================================== */

    goBack() {

        if (

            window.Router &&

            window.Router.ROUTES

        ) {

            Router.go(

                Router.ROUTES.LANDING

            );

            return;

        }

        window.location.href =

            '/pages/landing.html';

    },

    /* ======================================================================
       PAGE ANIMATION
    ====================================================================== */

    animatePage() {

        if (

            window.matchMedia(

                '(prefers-reduced-motion: reduce)'

            ).matches

        ) {

            return;

        }

        const sections = [

            '.progress-section',

            '.hero',

            '.registration-form'

        ];

        sections.forEach(

            function (

                selector,

                index

            ) {

                const element =

                    document.querySelector(

                        selector

                    );

                if (!element) {

                    return;

                }

                element.style.opacity = '0';

                element.style.transform =

                    'translateY(25px)';

                element.style.transition =

                    'all .6s ease';

                setTimeout(

                    function () {

                        element.style.opacity = '1';

                        element.style.transform =

                            'translateY(0)';

                    },

                    index * 180

                );

            }

        );

    }

};

/* ==========================================================================
   INITIALIZE
========================================================================== */

document.addEventListener(

    'DOMContentLoaded',

    function () {

        Registration.init();

    }

);

/* ==========================================================================
   GLOBAL EXPORT
========================================================================== */

window.Registration = Registration;

/* ==========================================================================
   END OF FILE

   CTM PATH™ Guided Journey

   File        : registration.js
   Version     : 6.0
   Status      : PRODUCTION

   VERIFIED AGAINST

   ✓ api.js
   ✓ app.js
   ✓ router.js
   ✓ 07_Router.gs
   ✓ 08_Service.gs
   ✓ 03_Database.gs

   Registration Flow

   Landing
        ↓
   Registration Form
        ↓
   collectData()
        ↓
   {
       fullName,
       email,
       mobile,
       district,
       state,
       source,
       language,
       device,
       emotion
   }
        ↓
   ApiService.registerVisitor()
        ↓
   Google Apps Script
        ↓
   Visitor ID Returned
        ↓
   Local Storage
        ↓
   Assessment Page

========================================================================== */
