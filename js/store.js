
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * State Store
 * File        : js/store.js
 * Version     : 2.0.0
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM || !window.CTM.config) {

        throw new Error(
            "CTM configuration not initialized."
        );

    }

    /**
     * ============================================================
     * Internal Application State
     * ============================================================
     */

    const STATE = {

        session: {

            id: null,

            startedAt: null,

            completedAt: null,

            version: window.CTM.config.APP.VERSION

        },

        visitor: {

            name: "",

            language: window.CTM.config.LANGUAGE.DEFAULT,

            currentScene: window.CTM.config.SCENES.DEFAULT,

            completed: false

        },

        journey: {

            progress: 0,

            completedScenes: [],

            lastVisitedScene:
                window.CTM.config.SCENES.DEFAULT

        },

        responses: {},

        financial: {

            currentIncome: null,

            desiredIncome: null,

            confidence: null,

            burden: null,

            dream: null,

            gap: null

        },

        personalization: {

            personality: null,

            recommendation: null,

            observations: []

        },

        runtime: {

            initialized: false,

            loading: false,

            thinking: false,

            currentSceneHTML: ""

        }

    };

    /**
     * ============================================================
     * Subscribers
     * ============================================================
     */

    const subscribers = [];

    /**
     * ============================================================
     * Clone Helper
     * ============================================================
     */

    function clone(value) {

        if (typeof structuredClone === "function") {

            return structuredClone(value);

        }

        return JSON.parse(

            JSON.stringify(value)

        );

    }

    /**
     * ============================================================
     * Notify Subscribers
     * ============================================================
     */

    function notify(section) {

        const stateCopy = clone(STATE);

        const sectionCopy = clone(

            STATE[section]

        );

        subscribers.forEach(callback => {

            try {

                callback(

                    section,

                    sectionCopy,

                    stateCopy

                );

            }

            catch (error) {

                console.error(error);

            }

        });

    }

    /**
     * ============================================================
     * Store API
     * ============================================================
     */

    const Store = {

        /**
         * --------------------------------------------------------
         * Complete State
         * --------------------------------------------------------
         */

        getState() {

            return STATE;

        },

        /**
         * --------------------------------------------------------
         * Snapshot
         * --------------------------------------------------------
         */

        snapshot() {

            return clone(STATE);

        },

        /**
         * --------------------------------------------------------
         * Read Section
         * --------------------------------------------------------
         */

        get(section) {

            return STATE[section];

        },

        /**
         * --------------------------------------------------------
         * Replace Section
         * --------------------------------------------------------
         */

        set(section, value) {

            if (!(section in STATE)) {

                return false;

            }

            STATE[section] = value;

            notify(section);

            return true;

        },

        /**
         * --------------------------------------------------------
         * Update Property
         * --------------------------------------------------------
         */

        update(

            section,

            property,

            value

        ) {

            if (!(section in STATE)) {

                return false;

            }

            STATE[section][property] = value;

            notify(section);

            return true;

        },

        /**
         * --------------------------------------------------------
         * Merge Object
         * --------------------------------------------------------
         */

        merge(

            section,

            values = {}

        ) {

            if (!(section in STATE)) {

                return false;

            }

            Object.assign(

                STATE[section],

                values

            );

            notify(section);

            return true;

        },

        /**
         * --------------------------------------------------------
         * Subscribe
         * --------------------------------------------------------
         */

        subscribe(callback) {

            if (

                typeof callback !== "function"

            ) {

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

            const index = subscribers.indexOf(

                callback

            );

            if (index >= 0) {

                subscribers.splice(

                    index,

                    1

                );

            }

        },

        /**
         * --------------------------------------------------------
         * Initialize Session
         * --------------------------------------------------------
         */

        initializeSession() {

            STATE.session.id = crypto.randomUUID();

            STATE.session.startedAt =

                new Date().toISOString();

            STATE.runtime.initialized = true;

            notify("session");

        },

        /**
         * --------------------------------------------------------
         * Complete Session
         * --------------------------------------------------------
         */

        completeSession() {

            STATE.session.completedAt =

                new Date().toISOString();

            STATE.visitor.completed = true;

            notify("session");

        },

        /**
         * --------------------------------------------------------
         * Responses
         * --------------------------------------------------------
         */

        setResponse(key, value) {

            STATE.responses[key] = value;

            notify("responses");

        },

        getResponse(key) {

            return STATE.responses[key];

        },

        /**
         * --------------------------------------------------------
         * Financial
         * --------------------------------------------------------
         */

        setFinancial(key, value) {

            STATE.financial[key] = value;

            notify("financial");

        },

        getFinancial(key) {

            return STATE.financial[key];

        },

        /**
         * --------------------------------------------------------
         * Reset
         * --------------------------------------------------------
         */

        reset() {

            STATE.session = {

                id: null,

                startedAt: null,

                completedAt: null,

                version:

                    window.CTM.config.APP.VERSION

            };

            STATE.visitor = {

                name: "",

                language:

                    window.CTM.config.LANGUAGE.DEFAULT,

                currentScene:

                    window.CTM.config.SCENES.DEFAULT,

                completed: false

            };

            STATE.journey = {

                progress: 0,

                completedScenes: [],

                lastVisitedScene:

                    window.CTM.config.SCENES.DEFAULT

            };

            STATE.responses = {};

            STATE.financial = {

                currentIncome: null,

                desiredIncome: null,

                confidence: null,

                burden: null,

                dream: null,

                gap: null

            };

            STATE.personalization = {

                personality: null,

                recommendation: null,

                observations: []

            };

            STATE.runtime = {

                initialized: false,

                loading: false,

                thinking: false,

                currentSceneHTML: ""

            };

            notify("reset");

        },

        /**
         * --------------------------------------------------------
         * Debug
         * --------------------------------------------------------
         */

        debug() {

            if (

                !window.CTM.config.APP.DEBUG

            ) {

                return;

            }

            console.group(

                "CTM Store"

            );

            console.log(

                this.snapshot()

            );

            console.groupEnd();

        }

    };

    /**
     * ============================================================
     * Freeze & Register
     * ============================================================
     */

    Object.freeze(Store);

    Object.defineProperty(

        window.CTM,

        "store",

        {

            value: Store,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();


