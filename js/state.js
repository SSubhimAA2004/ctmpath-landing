
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : state.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class State {

    #initialized = false;

    #state = {};

    init() {

        if (this.#initialized) {
            return;
        }

        this.reset();

        this.#initialized = true;

        CTM.Logger.info("Application state initialized.");

    }

    /* ======================================================
       Reset State
       ====================================================== */

    reset() {

        this.#state = {

            app: {

                initialized: false,

                currentRoute: CTM.Config.APP.DEFAULT_ROUTE,

                previousRoute: null,

                language: CTM.Config.APP.LANGUAGE

            },

            visitor: {

                id: "",

                fullName: "",

                mobile: "",

                email: "",

                city: "",

                district: "",

                state: ""

            },

            journey: {

                currentStep: 1,

                completedSteps: [],

                startedAt: null,

                completedAt: null

            },

            discovery: {

            },

            assessment: {

                responses: {},

                totalScore: 0,

                completed: false

            },

            results: {

                diagnosis: null,

                roadmap: null,

                alignment: null

            },

            session: {

                token: "",

                lastSaved: null

            }

        };

    }

    /* ======================================================
       Generic Get
       ====================================================== */

    get(section) {

        return structuredClone(this.#state[section]);

    }

    /* ======================================================
       Generic Set
       ====================================================== */

    set(section, value) {

        if (!(section in this.#state)) {

            throw new Error(

                `Unknown state section: ${section}`

            );

        }

        this.#state[section] = structuredClone(value);

    }

    /* ======================================================
       Generic Update
       ====================================================== */

    update(section, values) {

        if (!(section in this.#state)) {

            throw new Error(

                `Unknown state section: ${section}`

            );

        }

        Object.assign(

            this.#state[section],

            structuredClone(values)

        );

    }

    /* ======================================================
       Snapshot
       ====================================================== */

    snapshot() {

        return structuredClone(this.#state);

    }

    /* ======================================================
       Domain Methods
       ====================================================== */

    getApp() {

        return this.get("app");

    }

    getVisitor() {

        return this.get("visitor");

    }

    setVisitor(visitor) {

        this.set("visitor", visitor);

    }

    getJourney() {

        return this.get("journey");

    }

    setJourney(journey) {

        this.set("journey", journey);

    }

    getAssessment() {

        return this.get("assessment");

    }

    updateAssessment(values) {

        this.update(

            "assessment",

            values

        );

    }

    getResults() {

        return this.get("results");

    }

    setResults(results) {

        this.set(

            "results",

            results

        );

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#state = {};

        this.#initialized = false;

    }

}

CTM.State = Object.freeze(

    new State()

);

