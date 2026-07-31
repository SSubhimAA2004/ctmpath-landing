
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : config.js
   ========================================================== */

'use strict';

/* ==========================================================
   Global Namespace
   ========================================================== */

window.CTM = window.CTM || {};

/* ==========================================================
   Configuration
   ========================================================== */

CTM.Config = Object.freeze({

    APP: Object.freeze({

        NAME: "CTM PATH™ Guided Journey™",

        VERSION: "1.0.0",

        ENVIRONMENT: "production",

        DEFAULT_ROUTE: "welcome",

        LANGUAGE: "en"

    }),

    ROUTES: Object.freeze({

        welcome: "pages/welcome.html",

        discovery: "pages/discovery.html",

        assessment: "pages/assessment.html",

        results: "pages/results.html",

        diagnosis: "pages/diagnosis.html",

        roadmap: "pages/roadmap.html",

        continue: "pages/continue.html"

    }),

    STEPS: Object.freeze({

        welcome: 1,

        discovery: 2,

        assessment: 3,

        results: 4,

        diagnosis: 5,

        roadmap: 6,

        continue: 7

    }),

    COMPONENTS: Object.freeze({

        header: "components/header.html",

        footer: "components/footer.html",

        progress: "components/progress.html",

        loader: "components/loader.html",

        modal: "components/modal.html",

        toast: "components/toast.html"

    }),

    DOM: Object.freeze({

        shell: "application-shell",

        app: "app",

        header: "header-container",

        footer: "footer-container",

        progress: "progress-container",

        loader: "loader-container",

        modal: "modal-container",

        toast: "toast-container"

    }),

    STORAGE: Object.freeze({

        SESSION: "ctm-session",

        JOURNEY: "ctm-journey",

        VISITOR: "ctm-visitor"

    }),

    API: Object.freeze({

        BASE_URL: "",

        TIMEOUT: 30000

    }),

    VALIDATION: Object.freeze({

        NAME_MAX_LENGTH: 100,

        EMAIL_MAX_LENGTH: 150,

        MOBILE_LENGTH: 10

    }),

    UI: Object.freeze({

        TOAST_DURATION: 3000,

        LOADER_DELAY: 200,

        SCROLL_BEHAVIOR: "smooth"

    }),

    FEATURES: Object.freeze({

        DEBUG: false,

        CACHE_COMPONENTS: true,

        AUTO_SAVE: true

    })

});
