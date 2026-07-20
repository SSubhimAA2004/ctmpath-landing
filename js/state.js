
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/state.js
 * Responsibility:
 * Central application state management.
 *
 * Engineering Status:
 * Production Build
 * Architecture: FROZEN
 * ==========================================================
 */

(() => {
    "use strict";

    /**
     * --------------------------------------------------------
     * Internal Application State
     * --------------------------------------------------------
     */

    const state = {

        /**
         * System
         */
        initialized: false,
        loading: false,

        /**
         * Journey
         */
        currentAct: 1,
        currentMoment: 1,
        totalActs: 5,
        totalMoments: 35,

        /**
         * Navigation
         */
        previousScene: null,
        currentScene: null,
        nextScene: null,

        /**
         * Visitor
         */
        visitor: {
            name: "",
            email: "",
            phone: "",
            language: "ta",
            city: "",
            responses: {}
        },

        /**
         * Personalization
         */
        personalization: {
            firstName: "",
            greetingUsed: false
        },

        /**
         * Progress
         */
        progress: {
            percent: 0,
            completedMoments: 0,
            completedActs: 0
        },

        /**
         * Booking
         */
        booking: {
            eligible: false,
            requested: false,
            confirmed: false,
            slot: null
        },

        /**
         * Analytics
         */
        analytics: {
            sessionStart: Date.now(),
            events: [],
            lastEvent: null
        }

    };

    /**
     * --------------------------------------------------------
     * Deep Clone
     * --------------------------------------------------------
     */

    function clone(value) {
        return structuredClone(value);
    }

    /**
     * --------------------------------------------------------
     * Read Entire State
     * --------------------------------------------------------
     */

    function getState() {
        return clone(state);
    }

    /**
     * --------------------------------------------------------
     * Read One Property
     * Example:
     * get("visitor")
     * get("visitor.name")
     * --------------------------------------------------------
     */

    function get(path) {

        if (!path) {
            return getState();
        }

        return path
            .split(".")
            .reduce((obj, key) => obj?.[key], state);

    }

    /**
     * --------------------------------------------------------
     * Update One Property
     * Example:
     * set("visitor.name","Raphael")
     * --------------------------------------------------------
     */

    function set(path, value) {

        const keys = path.split(".");
        const last = keys.pop();

        let target = state;

        keys.forEach(key => {

            if (!(key in target)) {
                target[key] = {};
            }

            target = target[key];

        });

        target[last] = value;

        return value;

    }

    /**
     * --------------------------------------------------------
     * Merge Object
     * --------------------------------------------------------
     */

    function merge(path, values) {

        const current = get(path);

        if (
            typeof current !== "object" ||
            current === null ||
            Array.isArray(current)
        ) {
            throw new Error(`State path "${path}" is not an object.`);
        }

        Object.assign(current, values);

        return clone(current);

    }

    /**
     * --------------------------------------------------------
     * Reset Visitor Journey
     * --------------------------------------------------------
     */

    function resetJourney() {

        state.currentAct = 1;
        state.currentMoment = 1;

        state.progress.percent = 0;
        state.progress.completedActs = 0;
        state.progress.completedMoments = 0;

        state.navigation = {
            previousScene: null,
            currentScene: null,
            nextScene: null
        };

        state.visitor.responses = {};

        state.booking = {
            eligible: false,
            requested: false,
            confirmed: false,
            slot: null
        };

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMState = Object.freeze({

        getState,

        get,

        set,

        merge,

        resetJourney

    });

})();
