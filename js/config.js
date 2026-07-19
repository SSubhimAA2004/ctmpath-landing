
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Configuration Module
 * File        : js/config.js
 * Version     : 1.0.0
 * Status      : Production Freeze
 * Author      : OpenAI + Raphael Raj
 * ============================================================
 */

(() => {
    "use strict";

    /**
     * ------------------------------------------------------------
     * Application Configuration
     * ------------------------------------------------------------
     */

    const CONFIG = Object.freeze({

        APP: Object.freeze({

            NAME: "CTM PATH™ Guided Journey",

            VERSION: "1.0.0",

            BUILD: "Production",

            COPYRIGHT: "© CTM PATH™",

            DEBUG: false

        }),

        /**
         * --------------------------------------------------------
         * Scene Configuration
         * --------------------------------------------------------
         */

        SCENES: Object.freeze({

            TOTAL: 9,

            DEFAULT: 1,

            ROOT: "sceneRoot",

            PATH: "scenes/",

            PREFIX: "scene",

            EXTENSION: ".html",

            FILES: Object.freeze([
                "scene01.html",
                "scene02.html",
                "scene03.html",
                "scene04.html",
                "scene05.html",
                "scene06.html",
                "scene07.html",
                "scene08.html",
                "scene09.html"
            ])

        }),

        /**
         * --------------------------------------------------------
         * Language
         * --------------------------------------------------------
         */

        LANGUAGE: Object.freeze({

            DEFAULT: "ta",

            AVAILABLE: Object.freeze([
                "ta",
                "en"
            ])

        }),

        /**
         * --------------------------------------------------------
         * Browser Storage Keys
         * --------------------------------------------------------
         */

        STORAGE: Object.freeze({

            STATE: "ctmPathState",

            LANGUAGE: "ctmLanguage",

            SESSION: "ctmSession",

            VERSION: "ctmVersion"

        }),

        /**
         * --------------------------------------------------------
         * Timing
         * --------------------------------------------------------
         */

        TIMING: Object.freeze({

            SCENE_TRANSITION: 400,

            SCROLL_DURATION: 350,

            TOAST_DURATION: 3000,

            THINKING_DELAY: 1200,

            MODAL_FADE: 250

        }),

        /**
         * --------------------------------------------------------
         * CSS Classes
         * --------------------------------------------------------
         */

        CLASSES: Object.freeze({

            ACTIVE: "active",

            HIDDEN: "hidden",

            LOADING: "loading",

            DISABLED: "disabled"

        }),

        /**
         * --------------------------------------------------------
         * DOM IDs
         * --------------------------------------------------------
         */

        DOM: Object.freeze({

            ROOT: "sceneRoot",

            HEADER_PROGRESS: "progressBar",

            PROGRESS_TEXT: "progressText",

            LOADING_OVERLAY: "loadingOverlay",

            THINKING_OVERLAY: "thinkingOverlay",

            TOAST_CONTAINER: "toastContainer",

            MODAL_CONTAINER: "modalContainer",

            ERROR_BOUNDARY: "errorBoundary"

        }),

        /**
         * --------------------------------------------------------
         * Journey
         * --------------------------------------------------------
         */

        JOURNEY: Object.freeze({

            FIRST_SCENE: 1,

            LAST_SCENE: 9

        })

    });

    /**
     * ------------------------------------------------------------
     * Global Namespace
     * ------------------------------------------------------------
     */

    window.CTM = window.CTM || {};

    Object.defineProperty(window.CTM, "config", {

        value: CONFIG,

        writable: false,

        configurable: false,

        enumerable: true

    });

})();

