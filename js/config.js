
/*!
 * ==========================================================
 * CTM PATH™ Guided Journey
 * File        : js/config.js
 * Version     : 1.0.0
 * Purpose     : Global Configuration
 * Status      : Production
 * ==========================================================
 */

(() => {

    "use strict";

    const CONFIG = Object.freeze({

        APP: {

            NAME: "CTM PATH™ Guided Journey",

            VERSION: "3.0.0",

            AUTHOR: "Raphael Raj",

            COMPANY: "CTM PATH™",

            DEBUG: false

        },

        JOURNEY: {

            ACTS: 5,

            MOMENTS: 35,

            FIRST_ACT: 1,

            LAST_ACT: 5,

            FIRST_MOMENT: 1,

            LAST_MOMENT: 35

        },

        LANGUAGE: {

            DEFAULT: "ta",

            SUPPORTED: [

                "ta",

                "en"

            ]

        },

        UI: {

            ROOT: "#app",

            COMPONENT_FOLDER: "components/",

            DATA_FOLDER: "data/",

            IMAGE_FOLDER: "images/"

        },

        DATA: {

            SETTINGS: "data/settings.json",

            CHOICES: "data/choices.json",

            ACTS: [

                "data/act01.json",

                "data/act02.json",

                "data/act03.json",

                "data/act04.json",

                "data/act05.json"

            ]

        },

        COMPONENTS: {

            MESSAGE: "message.html",

            QUESTION: "question.html",

            CHOICE: "choice.html",

            INPUT: "input.html",

            REFLECTION: "reflection.html",

            INSIGHT: "insight.html",

            LOADING: "loading.html",

            BOOKING: "booking.html",

            COMPLETE: "complete.html"

        },

        STORAGE: {

            PREFIX: "CTM_",

            LANGUAGE: "CTM_LANGUAGE",

            SESSION: "CTM_SESSION"

        },

        ANIMATION: {

            DURATION: 350

        }

    });

    window.CTM = window.CTM || {};

    window.CTM.config = CONFIG;

})();
