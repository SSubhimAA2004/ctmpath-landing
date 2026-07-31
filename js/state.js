
/* ==========================================================
   CTM PATH™ Guided Journey™
   Version : 1.0
   File    : state.js
   Purpose : Global Application State
   ========================================================== */

'use strict';

/* ==========================================================
   STATE MANAGER
   ========================================================== */

const State = {

    /* ------------------------------------------------------
       Application State
       ------------------------------------------------------ */

    app: {

        initialized: false,

        version: '1.0.0',

        currentPage: 'page01',

        previousPage: null,

        language: 'en',

        loading: false

    },

    /* ------------------------------------------------------
       Journey Progress
       ------------------------------------------------------ */

    journey: {

        currentStep: 1,

        totalSteps: 7,

        completedSteps: [],

        startedAt: null,

        completedAt: null

    },

    /* ------------------------------------------------------
       Visitor
       ------------------------------------------------------ */

    visitor: {

        id: '',

        fullName: '',

        mobile: '',

        email: '',

        city: '',

        state: ''

    },

    /* ------------------------------------------------------
       Financial Discovery
       ------------------------------------------------------ */

    discovery: {

        financialConfidence: null,

        monthlyIncome: null,

        dreamIncome: null,

        challenges: []

    },

    /* ------------------------------------------------------
       Assessment
       ------------------------------------------------------ */

    assessment: {

        responses: {},

        totalScore: 0,

        completed: false

    },

    /* ------------------------------------------------------
       Results
       ------------------------------------------------------ */

    results: {

        lifeAlignment: null,

        diagnosis: null,

        roadmap: null

    },

    /* ------------------------------------------------------
       Session
       ------------------------------------------------------ */

    session: {

        token: '',

        lastSaved: null

    },

    /* ======================================================
       INITIALIZE
       ====================================================== */

    initialize() {

        this.journey.startedAt = new Date().toISOString();

        this.app.initialized = true;

        console.info('State initialized.');

    },

    /* ======================================================
       GET VALUE
       ====================================================== */

    get(path) {

        return path.split('.').reduce(

            (object, key) => object?.[key],

            this

        );

    },

    /* ======================================================
       SET VALUE
       ====================================================== */

    set(path, value) {

        const keys = path.split('.');

        const lastKey = keys.pop();

        const target = keys.reduce(

            (object, key) => object[key],

            this

        );

        target[lastKey] = value;

    },

    /* ======================================================
       UPDATE
       ====================================================== */

    update(path, values) {

        const target = this.get(path);

        Object.assign(target, values);

    },

    /* ======================================================
       RESET
       ====================================================== */

    reset() {

        this.app.currentPage = 'page01';

        this.app.previousPage = null;

        this.journey.currentStep = 1;

        this.journey.completedSteps = [];

        this.discovery = {

            financialConfidence: null,

            monthlyIncome: null,

            dreamIncome: null,

            challenges: []

        };

        this.assessment.responses = {};

        this.assessment.totalScore = 0;

        this.assessment.completed = false;

        this.results.lifeAlignment = null;

        this.results.diagnosis = null;

        this.results.roadmap = null;

    },

    /* ======================================================
       COMPLETE STEP
       ====================================================== */

    completeStep(step) {

        if (

            !this.journey.completedSteps.includes(step)

        ) {

            this.journey.completedSteps.push(step);

        }

        this.journey.currentStep = step + 1;

    },

    /* ======================================================
       EXPORT
       ====================================================== */

    export() {

        return JSON.parse(

            JSON.stringify(this)

        );

    }

};

