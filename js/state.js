
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : state.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class State {

    #initialized = false;

    #dirty = false;

    #state = {};

    /* ======================================================
       Initialize
       ====================================================== */

    init() {

        if (this.#initialized) {
            return;
        }

        this.reset();

        this.#initialized = true;

        CTM.Logger.info("Application State initialized.");

    }

    /* ======================================================
       Default State
       ====================================================== */

    #defaultState() {

        return {

            app: {

                initialized: false,

                currentRoute: CTM.Config.APP.DEFAULT_ROUTE,

                previousRoute: null,

                language: CTM.Config.APP.DEFAULT_LANGUAGE

            },

            visitor: {

                id: "",

                fullName: "",

                mobile: "",

                email: "",

                city: "",

                district: "",

                state: "",

                source: "",

                language: "",

                registeredAt: null

            },

            journey: {

                currentStep: 1,

                totalSteps: 18,

                completedSteps: [],

                startedAt: null,

                completedAt: null

            },

            discovery: {

                completed: false,

                answers: {},

                financialConfidence: 0,

                monthlyIncome: 0,

                monthlySavings: 0,

                completedAt: null

            },

            assessment: {

                completed: false,

                responses: {},

                totalScore: 0,

                completedAt: null

            },

            results: {

                lifeAlignmentScore: 0,

                diagnosis: null,

                roadmap: null,

                recommendations: [],

                generatedAt: null

            },

            session: {

                token: "",

                lastSaved: null

            }

        };

    }

    /* ======================================================
       Validation
       ====================================================== */

    #validate(section, value) {

        if (!(section in this.#state)) {

            throw new Error(
                `Unknown state section: ${section}`
            );

        }

        if (value === null) {

            throw new Error(
                `State cannot be null.`
            );

        }

        if (typeof value !== "object") {

            throw new Error(
                `State must be an object.`
            );

        }

    }

    /* ======================================================
       Dirty Flag
       ====================================================== */

    #markDirty() {

        this.#dirty = true;

    }

    clearDirty() {

        this.#dirty = false;

    }

    isDirty() {

        return this.#dirty;

    }

    /* ======================================================
       Read
       ====================================================== */

    get(section) {

        return structuredClone(

            this.#state[section]

        );

    }

    snapshot() {

        return structuredClone(

            this.#state

        );

    }

    /* ======================================================
       Write
       ====================================================== */

    set(section, value) {

        this.#validate(section, value);

        this.#state[section] = structuredClone(value);

        this.#markDirty();

        CTM.Events.emit(

            "state:changed",

            {

                section,

                value: this.get(section)

            }

        );

    }

    update(section, values) {

        this.#validate(section, values);

        Object.assign(

            this.#state[section],

            structuredClone(values)

        );

        this.#markDirty();

        CTM.Events.emit(

            "state:changed",

            {

                section,

                value: this.get(section)

            }

        );

    }

    /* ======================================================
       Reset
       ====================================================== */

    reset() {

        this.#state = this.#defaultState();

        this.clearDirty();

        CTM.Events.emit(

            "state:reset",

            this.snapshot()

        );

    }

    /* ======================================================
       Domain Methods
       ====================================================== */

    getApp() {

        return this.get("app");

    }

    updateApp(values) {

        this.update("app", values);

    }

    getVisitor() {

        return this.get("visitor");

    }

    updateVisitor(values) {

        this.update("visitor", values);

    }

    getJourney() {

        return this.get("journey");

    }

    updateJourney(values) {

        this.update("journey", values);

    }

    getDiscovery() {

        return this.get("discovery");

    }

    updateDiscovery(values) {

        this.update("discovery", values);

    }

    getAssessment() {

        return this.get("assessment");

    }

    updateAssessment(values) {

        this.update("assessment", values);

    }

    getResults() {

        return this.get("results");

    }

    updateResults(values) {

        this.update("results", values);

    }

    getSession() {

        return this.get("session");

    }

    updateSession(values) {

        this.update("session", values);

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#state = {};

        this.#dirty = false;

        this.#initialized = false;

    }

}

CTM.State = Object.freeze(

    new State()

);

