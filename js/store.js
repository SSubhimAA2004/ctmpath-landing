
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * State Store
 * File        : js/store.js
 * Version     : 1.0.0
 * Batch       : 1 of 2
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM || !window.CTM.config) {
        throw new Error("CTM configuration not initialized.");
    }

    /**
     * ------------------------------------------------------------
     * Application State
     * ------------------------------------------------------------
     */

    const STATE = {

        /**
         * --------------------------------------------------------
         * Session
         * --------------------------------------------------------
         */

        session: {

            id: null,

            startedAt: null,

            completedAt: null,

            version: window.CTM.config.APP.VERSION

        },

        /**
         * --------------------------------------------------------
         * Visitor
         * --------------------------------------------------------
         */

        visitor: {

            name: "",

            language: window.CTM.config.LANGUAGE.DEFAULT,

            currentScene: window.CTM.config.SCENES.DEFAULT,

            completed: false

        },

        /**
         * --------------------------------------------------------
         * Journey
         * --------------------------------------------------------
         */

        journey: {

            progress: 0,

            completedScenes: [],

            lastVisitedScene: 1

        },

        /**
         * --------------------------------------------------------
         * Responses
         * --------------------------------------------------------
         */

        responses: {

        },

        /**
         * --------------------------------------------------------
         * Personalization
         * --------------------------------------------------------
         */

        personalization: {

            personality: null,

            recommendation: null,

            observations: []

        },

        /**
         * --------------------------------------------------------
         * Financial Profile
         * --------------------------------------------------------
         */

        financial: {

            currentIncome: null,

            desiredIncome: null,

            confidence: null,

            burden: null,

            dream: null,

            gap: null

        },

        /**
         * --------------------------------------------------------
         * Runtime
         * --------------------------------------------------------
         */

        runtime: {

            loading: false,

            thinking: false,

            initialized: false,

            currentSceneHTML: ""

        }

    };

    /**
     * ------------------------------------------------------------
     * Store API
     * ------------------------------------------------------------
     */

    const Store = {

        /**
         * Return complete state
         */

        getState() {

            return STATE;

        },

        /**
         * Read value
         */

        get(section) {

            return STATE[section];

        },

        /**
         * Replace section
         */

        set(section, value) {

            if (!(section in STATE)) {

                console.warn(`Unknown state section: ${section}`);

                return;

            }

            STATE[section] = value;

        },

        /**
         * Update property
         */

        update(section, property, value) {

            if (!(section in STATE)) return;

            STATE[section][property] = value;

        },

        /**
         * Merge object
         */

        merge(section, values = {}) {

            if (!(section in STATE)) return;

            Object.assign(

                STATE[section],

                values

            );

        }

    };

    /**
     * ------------------------------------------------------------
     * Register
     * ------------------------------------------------------------
     */

    window.CTM.store = Store;

})();

    /**
     * ------------------------------------------------------------
     * Internal Subscribers
     * ------------------------------------------------------------
     */

    const subscribers = [];

    /**
     * ------------------------------------------------------------
     * Deep Clone Helper
     * ------------------------------------------------------------
     */

    function clone(value) {

        return structuredClone(value);

    }

    /**
     * ------------------------------------------------------------
     * Notify Subscribers
     * ------------------------------------------------------------
     */

    function notify(section) {

        subscribers.forEach(callback => {

            callback(

                section,

                clone(STATE[section]),

                clone(STATE)

            );

        });

    }

    /**
     * ------------------------------------------------------------
     * Extend Store API
     * ------------------------------------------------------------
     */

    Object.assign(Store, {

        /**
         * --------------------------------------------------------
         * Safe Snapshot
         * --------------------------------------------------------
         */

        snapshot() {

            return clone(STATE);

        },

        /**
         * --------------------------------------------------------
         * Reset State
         * --------------------------------------------------------
         */

        reset() {

            STATE.session = {

                id: null,

                startedAt: null,

                completedAt: null,

                version: window.CTM.config.APP.VERSION

            };

            STATE.visitor = {

                name: "",

                language: window.CTM.config.LANGUAGE.DEFAULT,

                currentScene: 1,

                completed: false

            };

            STATE.journey = {

                progress: 0,

                completedScenes: [],

                lastVisitedScene: 1

            };

            STATE.responses = {};

            STATE.personalization = {

                personality: null,

                recommendation: null,

                observations: []

            };

            STATE.financial = {

                currentIncome: null,

                desiredIncome: null,

                confidence: null,

                burden: null,

                dream: null,

                gap: null

            };

            STATE.runtime = {

                loading: false,

                thinking: false,

                initialized: false,

                currentSceneHTML: ""

            };

            notify("reset");

        },

        /**
         * --------------------------------------------------------
         * Subscribe
         * --------------------------------------------------------
         */

        subscribe(callback) {

            if (typeof callback !== "function") {

                return;

            }

            subscribers.push(callback);

        },

        /**
         * --------------------------------------------------------
         * Unsubscribe
         * --------------------------------------------------------
         */

        unsubscribe(callback) {

            const index = subscribers.indexOf(callback);

            if (index >= 0) {

                subscribers.splice(index, 1);

            }

        },

        /**
         * --------------------------------------------------------
         * Initialize Session
         * --------------------------------------------------------
         */

        initializeSession() {

            STATE.session.id = crypto.randomUUID();

            STATE.session.startedAt = new Date().toISOString();

            STATE.runtime.initialized = true;

            notify("session");

        },

        /**
         * --------------------------------------------------------
         * Complete Session
         * --------------------------------------------------------
         */

        completeSession() {

            STATE.session.completedAt = new Date().toISOString();

            STATE.visitor.completed = true;

            notify("session");

        },

        /**
         * --------------------------------------------------------
         * Update Helpers
         * --------------------------------------------------------
         */

        setResponse(key, value) {

            STATE.responses[key] = value;

            notify("responses");

        },

        getResponse(key) {

            return STATE.responses[key];

        },

        setFinancial(key, value) {

            STATE.financial[key] = value;

            notify("financial");

        },

        getFinancial(key) {

            return STATE.financial[key];

        },

        /**
         * --------------------------------------------------------
         * Debug
         * --------------------------------------------------------
         */

        debug() {

            if (!window.CTM.config.APP.DEBUG) {

                return;

            }

            console.group("CTM Store");

            console.table(clone(STATE));

            console.groupEnd();

        }

    });

    /**
     * ------------------------------------------------------------
     * Freeze Store API
     * ------------------------------------------------------------
     */

    Object.freeze(Store);

