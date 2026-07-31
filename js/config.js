
/* ==========================================================================
   CTM PATH™ Guided Journey™
   File        : js/config.js
   Version     : 2.0
   Status      : FRAMEWORK FREEZE v2.0
   Author      : CTM PATH™ Architecture

   ==========================================================================
   PURPOSE
   --------------------------------------------------------------------------
   Single source of truth for the entire application.

   This file contains ONLY configuration.

   It MUST NOT contain:

   ✗ Business Logic
   ✗ DOM Manipulation
   ✗ API Calls
   ✗ Event Handlers
   ✗ Validation Logic
   ✗ UI Logic

   ==========================================================================
   RESPONSIBILITIES

   ✓ Brand Configuration
   ✓ Application Configuration
   ✓ Component Manifest
   ✓ Page Manifest
   ✓ Journey Configuration
   ✓ Event Names
   ✓ Route Names
   ✓ API Configuration
   ✓ Storage Configuration
   ✓ Validation Configuration
   ✓ Animation Configuration
   ✓ UI Configuration

   ==========================================================================
*/

'use strict';

window.CTM = window.CTM || {};

class Config {

    #initialized = false;

    init() {

        if (this.#initialized) {
            return;
        }

        this.#initialized = true;

    }

    destroy() {

        this.#initialized = false;

    }

}

/* ==========================================================================
   APPLICATION
========================================================================== */

Config.APP = Object.freeze({

    NAME: 'CTM PATH™ Guided Journey™',

    VERSION: '2.0',

    BUILD: 'Framework Freeze v2.0',

    ENVIRONMENT: 'PRODUCTION',

    DEFAULT_PAGE: 'WELCOME',

    DEFAULT_LANGUAGE: 'ta',

    FALLBACK_LANGUAGE: 'en',

    DEBUG: false,

    AUTO_SCROLL: true,

    CACHE_COMPONENTS: true,

    CACHE_PAGES: true,

    PRELOAD_NEXT_PAGE: true

});

/* ==========================================================================
   BRAND
========================================================================== */

Config.BRAND = Object.freeze({

    NAME: 'CTM PATH™',

    PRODUCT: 'Millionaire Production Path™',

    JOURNEY: 'Guided Journey™',

    TAGLINE: 'Every Dream Has A Path™',

    FOUNDER: 'Healer King Raphael Raj',

    COMPANY: 'CTM PATH™'

});

/* ==========================================================================
   COMPONENT MANIFEST
========================================================================== */

Config.COMPONENTS = Object.freeze({

    HEADER: {

        id: 'header-container',

        path: 'components/header.html'

    },

    FOOTER: {

        id: 'footer-container',

        path: 'components/footer.html'

    },

    PAGE: {

        id: 'page-container'

    }

});

/* ==========================================================================
   JOURNEY
========================================================================== */

Config.JOURNEY = Object.freeze({

    NAME: 'CTM PATH™ Guided Journey™',

    TOTAL_PAGES: 7,

    FIRST_PAGE: 'WELCOME',

    LAST_PAGE: 'CONTINUE',

    SHOW_PROGRESS: true,

    SHOW_COUNTER: true,

    ALLOW_BROWSER_BACK: true,

    AUTO_SAVE: true

});

/* ==========================================================================
   PAGE MANIFEST
   --------------------------------------------------------------------------
   Every page in the application is defined here.

   The Router, Navigation and App modules are completely driven from this
   manifest.

   Adding a new page should only require adding one new object here.
========================================================================== */

Config.PAGES = Object.freeze({

    WELCOME: Object.freeze({

        order: 1,

        route: 'WELCOME',

        title: 'Welcome',

        html: 'pages/welcome.html',

        css: 'css/welcome.css',

        js: 'js/welcome.js',

        controller: 'Welcome'

    }),

    DISCOVERY: Object.freeze({

        order: 2,

        route: 'DISCOVERY',

        title: 'Discovery',

        html: 'pages/discovery.html',

        css: 'css/discovery.css',

        js: 'js/discovery.js',

        controller: 'Discovery'

    }),

    ASSESSMENT: Object.freeze({

        order: 3,

        route: 'ASSESSMENT',

        title: 'Assessment',

        html: 'pages/assessment.html',

        css: 'css/assessment.css',

        js: 'js/assessment.js',

        controller: 'Assessment'

    }),

    RESULTS: Object.freeze({

        order: 4,

        route: 'RESULTS',

        title: 'Results',

        html: 'pages/results.html',

        css: 'css/results.css',

        js: 'js/results.js',

        controller: 'Results'

    }),

    DIAGNOSIS: Object.freeze({

        order: 5,

        route: 'DIAGNOSIS',

        title: 'Diagnosis',

        html: 'pages/diagnosis.html',

        css: 'css/diagnosis.css',

        js: 'js/diagnosis.js',

        controller: 'Diagnosis'

    }),

    ROADMAP: Object.freeze({

        order: 6,

        route: 'ROADMAP',

        title: 'Roadmap',

        html: 'pages/roadmap.html',

        css: 'css/roadmap.css',

        js: 'js/roadmap.js',

        controller: 'Roadmap'

    }),

    CONTINUE: Object.freeze({

        order: 7,

        route: 'CONTINUE',

        title: 'Continue',

        html: 'pages/continue.html',

        css: 'css/continue.css',

        js: 'js/continue.js',

        controller: 'Continue'

    })

});

/* ==========================================================================
   END OF BATCH 1A
   Continue with:
   config.js — Batch 1B
========================================================================== */

CTM.Config = Object.freeze(new Config());

/* ==========================================================================
   ROUTE HELPERS
   --------------------------------------------------------------------------
   Generic route definitions derived from the Page Manifest.
========================================================================== */

Config.ROUTES = Object.freeze({

    WELCOME: 'WELCOME',

    DISCOVERY: 'DISCOVERY',

    ASSESSMENT: 'ASSESSMENT',

    RESULTS: 'RESULTS',

    DIAGNOSIS: 'DIAGNOSIS',

    ROADMAP: 'ROADMAP',

    CONTINUE: 'CONTINUE'

});

/* ==========================================================================
   EVENT BUS
   --------------------------------------------------------------------------
   These event names are shared across every module.
========================================================================== */

Config.EVENTS = Object.freeze({

    /* --------------------------------------------------------------
       Application
    -------------------------------------------------------------- */

    APP_INITIALIZING: 'app:initializing',

    APP_INITIALIZED: 'app:initialized',

    APP_READY: 'app:ready',

    APP_DESTROYED: 'app:destroyed',

    /* --------------------------------------------------------------
       Components
    -------------------------------------------------------------- */

    COMPONENT_LOADING: 'component:loading',

    COMPONENT_LOADED: 'component:loaded',

    COMPONENT_FAILED: 'component:failed',

    /* --------------------------------------------------------------
       Navigation
    -------------------------------------------------------------- */

    NAVIGATION_STARTED: 'navigation:started',

    NAVIGATION_COMPLETED: 'navigation:completed',

    NAVIGATION_CANCELLED: 'navigation:cancelled',

    NAVIGATION_FAILED: 'navigation:failed',

    /* --------------------------------------------------------------
       Router
    -------------------------------------------------------------- */

    PAGE_LOADING: 'page:loading',

    PAGE_LOADED: 'page:loaded',

    PAGE_RENDERED: 'page:rendered',

    PAGE_INITIALIZING: 'page:initializing',

    PAGE_INITIALIZED: 'page:initialized',

    PAGE_DESTROYING: 'page:destroying',

    PAGE_DESTROYED: 'page:destroyed',

    PAGE_CHANGED: 'page:changed',

    /* --------------------------------------------------------------
       Journey
    -------------------------------------------------------------- */

    JOURNEY_STARTED: 'journey:started',

    JOURNEY_COMPLETED: 'journey:completed',

    JOURNEY_RESET: 'journey:reset',

    STEP_CHANGED: 'journey:stepChanged',

    PROGRESS_CHANGED: 'journey:progressChanged',

    /* --------------------------------------------------------------
       State
    -------------------------------------------------------------- */

    STATE_CHANGED: 'state:changed',

    STATE_RESTORED: 'state:restored',

    STATE_RESET: 'state:reset',

    /* --------------------------------------------------------------
       Storage
    -------------------------------------------------------------- */

    STORAGE_SAVED: 'storage:saved',

    STORAGE_LOADED: 'storage:loaded',

    STORAGE_CLEARED: 'storage:cleared',

    /* --------------------------------------------------------------
       Validation
    -------------------------------------------------------------- */

    VALIDATION_STARTED: 'validation:started',

    VALIDATION_COMPLETED: 'validation:completed',

    VALIDATION_FAILED: 'validation:failed',

    /* --------------------------------------------------------------
       API
    -------------------------------------------------------------- */

    API_REQUEST_STARTED: 'api:requestStarted',

    API_REQUEST_COMPLETED: 'api:requestCompleted',

    API_REQUEST_FAILED: 'api:requestFailed',

    /* --------------------------------------------------------------
       UI
    -------------------------------------------------------------- */

    LOADING_STARTED: 'ui:loadingStarted',

    LOADING_COMPLETED: 'ui:loadingCompleted',

    MODAL_OPENED: 'ui:modalOpened',

    MODAL_CLOSED: 'ui:modalClosed',

    TOAST_SHOWN: 'ui:toastShown',

    TOAST_HIDDEN: 'ui:toastHidden',

    /* --------------------------------------------------------------
       Errors
    -------------------------------------------------------------- */

    ERROR_OCCURRED: 'error:occurred'

});

/* ==========================================================================
   STORAGE
========================================================================== */

Config.STORAGE = Object.freeze({

    PREFIX: 'CTM_PATH',

    VERSION: '2',

    KEYS: Object.freeze({

        JOURNEY: 'journey',

        USER: 'user',

        DISCOVERY: 'discovery',

        ASSESSMENT: 'assessment',

        RESULTS: 'results',

        DIAGNOSIS: 'diagnosis',

        ROADMAP: 'roadmap',

        SETTINGS: 'settings',

        SESSION: 'session'

    })

});

/* ==========================================================================
   SESSION
========================================================================== */

Config.SESSION = Object.freeze({

    TIMEOUT_MINUTES: 60,

    AUTO_RESTORE: true,

    KEEP_SCROLL_POSITION: false,

    KEEP_PAGE_STATE: true

});

/* ==========================================================================
   API
========================================================================== */

Config.API = Object.freeze({

    BASE_URL: '',

    TIMEOUT: 30000,

    RETRY_COUNT: 2,

    RETRY_DELAY: 1000,

    CACHE_ENABLED: false

});

/* ==========================================================================
   END OF BATCH 1B
   Continue with:
   config.js — Batch 1C
========================================================================== */

/* ==========================================================================
   VALIDATION
========================================================================== */

Config.VALIDATION = Object.freeze({

    NAME: Object.freeze({

        MIN_LENGTH: 2,

        MAX_LENGTH: 100,

        PATTERN: /^[A-Za-zÀ-ÿ\u0B80-\u0BFF\s.'-]+$/u

    }),

    EMAIL: Object.freeze({

        MAX_LENGTH: 254,

        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    }),

    MOBILE: Object.freeze({

        LENGTH: 10,

        PATTERN: /^[6-9]\d{9}$/

    }),

    PINCODE: Object.freeze({

        LENGTH: 6,

        PATTERN: /^\d{6}$/

    }),

    TEXTAREA: Object.freeze({

        MAX_LENGTH: 2000

    })

});

/* ==========================================================================
   UI
========================================================================== */

Config.UI = Object.freeze({

    PAGE_CONTAINER_ID: 'page-container',

    HEADER_CONTAINER_ID: 'header-container',

    FOOTER_CONTAINER_ID: 'footer-container',

    JOURNEY_COUNTER_ID: 'journey-counter',

    LOADING_CONTAINER_ID: 'loading-overlay',

    MODAL_CONTAINER_ID: 'modal-container',

    TOAST_CONTAINER_ID: 'toast-container',

    ACTIVE_CLASS: 'is-active',

    HIDDEN_CLASS: 'is-hidden',

    DISABLED_CLASS: 'is-disabled',

    READY_CLASS: 'is-ready',

    LOADING_CLASS: 'is-loading'

});

/* ==========================================================================
   ANIMATION
========================================================================== */

Config.ANIMATION = Object.freeze({

    PAGE_ENTER_CLASS: 'page-enter',

    PAGE_EXIT_CLASS: 'page-exit',

    FADE_IN_CLASS: 'fade-in',

    FADE_OUT_CLASS: 'fade-out',

    DURATION: Object.freeze({

        FAST: 150,

        NORMAL: 300,

        SLOW: 600

    })

});

/* ==========================================================================
   SCROLL
========================================================================== */

Config.SCROLL = Object.freeze({

    BEHAVIOR: 'smooth',

    TOP: 0,

    LEFT: 0,

    RESTORE_ON_NAVIGATION: false

});

/* ==========================================================================
   LOADER
========================================================================== */

Config.LOADER = Object.freeze({

    SHOW_DELAY: 100,

    MIN_VISIBLE_TIME: 250,

    ENABLE_OVERLAY: true

});

/* ==========================================================================
   TOAST
========================================================================== */

Config.TOAST = Object.freeze({

    DURATION: 3000,

    POSITION: 'bottom-right',

    MAX_VISIBLE: 3

});

/* ==========================================================================
   MODAL
========================================================================== */

Config.MODAL = Object.freeze({

    CLOSE_ON_ESCAPE: true,

    CLOSE_ON_BACKDROP: true,

    LOCK_SCROLL: true

});

/* ==========================================================================
   CACHE
========================================================================== */

Config.CACHE = Object.freeze({

    COMPONENTS: true,

    PAGES: true,

    CSS: true,

    MAX_ITEMS: 25

});

/* ==========================================================================
   END OF BATCH 1C
   Continue with:
   config.js — Batch 1D
========================================================================== */

/* ==========================================================================
   LOGGING
========================================================================== */

Config.LOGGING = Object.freeze({

    ENABLED: true,

    LEVEL: 'INFO',

    TIMESTAMP: true,

    MODULE_PREFIX: true,

    CONSOLE: true,

    MAX_HISTORY: 1000

});

/* ==========================================================================
   NETWORK
========================================================================== */

Config.NETWORK = Object.freeze({

    REQUEST_TIMEOUT: 30000,

    RETRY_COUNT: 2,

    RETRY_DELAY: 1000,

    HEARTBEAT_INTERVAL: 60000

});

/* ==========================================================================
   ACCESSIBILITY
========================================================================== */

Config.ACCESSIBILITY = Object.freeze({

    ENABLE_KEYBOARD_NAVIGATION: true,

    ENABLE_FOCUS_TRAP: true,

    ENABLE_REDUCED_MOTION: true,

    ENABLE_ARIA_UPDATES: true,

    DEFAULT_LANGUAGE: 'ta',

    FALLBACK_LANGUAGE: 'en'

});

/* ==========================================================================
   PERFORMANCE
========================================================================== */

Config.PERFORMANCE = Object.freeze({

    PRELOAD_COMPONENTS: true,

    PRELOAD_NEXT_PAGE: true,

    CACHE_FETCH_REQUESTS: true,

    DEFER_NON_CRITICAL_LOADING: true,

    MAX_COMPONENT_CACHE: 10,

    MAX_PAGE_CACHE: 10

});

/* ==========================================================================
   ERROR MESSAGES
========================================================================== */

Config.ERRORS = Object.freeze({

    UNKNOWN: 'An unexpected error occurred.',

    NETWORK: 'Unable to communicate with the server.',

    PAGE_NOT_FOUND: 'Requested page could not be found.',

    COMPONENT_NOT_FOUND: 'Requested component could not be loaded.',

    CONTROLLER_NOT_FOUND: 'Page controller is unavailable.',

    INVALID_ROUTE: 'Invalid application route.',

    VALIDATION_FAILED: 'Please correct the highlighted information.',

    STORAGE_UNAVAILABLE: 'Local storage is unavailable.',

    API_TIMEOUT: 'The request timed out.',

    SESSION_EXPIRED: 'Your session has expired.'

});

/* ==========================================================================
   SUCCESS MESSAGES
========================================================================== */

Config.SUCCESS = Object.freeze({

    SAVED: 'Saved successfully.',

    LOADED: 'Loaded successfully.',

    UPDATED: 'Updated successfully.',

    COMPLETED: 'Operation completed successfully.'

});

/* ==========================================================================
   CSS
========================================================================== */

Config.CSS = Object.freeze({

    PAGE_STYLESHEET_ID: 'ctm-page-stylesheet',

    THEME_STYLESHEET_ID: 'ctm-theme-stylesheet',

    FOUNDATION_STYLESHEET_ID: 'ctm-foundation-stylesheet',

    RESPONSIVE_STYLESHEET_ID: 'ctm-responsive-stylesheet'

});

/* ==========================================================================
   DOM SELECTORS
========================================================================== */

Config.SELECTORS = Object.freeze({

    PAGE_CONTAINER: '#page-container',

    HEADER_CONTAINER: '#header-container',

    FOOTER_CONTAINER: '#footer-container',

    JOURNEY_COUNTER: '#journey-counter',

    APP_SHELL: '#app-shell'

});

/* ==========================================================================
   DATA ATTRIBUTES
========================================================================== */

Config.DATA = Object.freeze({

    ROUTE: 'data-route',

    PAGE: 'data-page',

    COMPONENT: 'data-component',

    ACTION: 'data-action',

    MODAL: 'data-modal'

});

/* ==========================================================================
   DEFAULTS
========================================================================== */

Config.DEFAULTS = Object.freeze({

    EMPTY_STRING: '',

    EMPTY_ARRAY: Object.freeze([]),

    EMPTY_OBJECT: Object.freeze({}),

    NULL_VALUE: null

});

/* ==========================================================================
   END OF BATCH 1D
   Continue with:
   config.js — Batch 1E
========================================================================== */

/* ==========================================================================
   PAGE HELPERS
   --------------------------------------------------------------------------
   Generic helper methods used by Router, Navigation and App.
========================================================================== */

Config.getPage = function (route) {

    return Config.PAGES[route] || null;

};

Config.getPages = function () {

    return Object.values(Config.PAGES)
        .sort((a, b) => a.order - b.order);

};

Config.getPageByOrder = function (order) {

    return this.getPages().find(
        page => page.order === order
    ) || null;

};

Config.getFirstPage = function () {

    return this.getPage(
        Config.JOURNEY.FIRST_PAGE
    );

};

Config.getLastPage = function () {

    return this.getPage(
        Config.JOURNEY.LAST_PAGE
    );

};

Config.getNextPage = function (route) {

    const current = this.getPage(route);

    if (!current) {
        return null;
    }

    return this.getPageByOrder(
        current.order + 1
    );

};

Config.getPreviousPage = function (route) {

    const current = this.getPage(route);

    if (!current) {
        return null;
    }

    return this.getPageByOrder(
        current.order - 1
    );

};

Config.hasNextPage = function (route) {

    return this.getNextPage(route) !== null;

};

Config.hasPreviousPage = function (route) {

    return this.getPreviousPage(route) !== null;

};

Config.isFirstPage = function (route) {

    const page = this.getPage(route);

    return !!page &&
        page.order === 1;

};

Config.isLastPage = function (route) {

    const page = this.getPage(route);

    return !!page &&
        page.order ===
        Config.JOURNEY.TOTAL_PAGES;

};

/* ==========================================================================
   FREEZE CONFIGURATION
========================================================================== */

Object.freeze(Config);

/* ==========================================================================
   EXPORT SINGLETON
========================================================================== */

CTM.Config = Object.freeze(
    new Config()
);

/* ==========================================================================
   FRAMEWORK FREEZE v2.0

   This configuration file is now the single source of truth for:

   ✓ Application
   ✓ Brand
   ✓ Components
   ✓ Journey
   ✓ Pages
   ✓ Routes
   ✓ Events
   ✓ Storage
   ✓ Session
   ✓ API
   ✓ Validation
   ✓ UI
   ✓ Animation
   ✓ Scroll
   ✓ Loader
   ✓ Toast
   ✓ Modal
   ✓ Cache
   ✓ Logging
   ✓ Network
   ✓ Accessibility
   ✓ Performance
   ✓ Messages
   ✓ CSS
   ✓ Selectors
   ✓ Data Attributes
   ✓ Defaults
   ✓ Page Navigation Helpers

   Router, Navigation and App must NEVER hard-code
   page names or page order. All navigation must be
   derived from this manifest.

   Status:
   FRAMEWORK FREEZE v2.0
   COMPLETE
========================================================================== */


