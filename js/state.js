
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v4.0
 * File: js/state.js
 *
 * CENTRAL STATE ENGINE
 *
 * Responsibility
 * ----------------------------------------------------------
 * • Maintain a single source of truth
 * • Store visitor information
 * • Store journey progress
 * • Store responses
 * • Store personalization data
 * • Store analytics
 * • Prepare future Google Sheets integration
 *
 * Engineering Status
 * ----------------------------------------------------------
 * Production Ready
 * Architecture: FROZEN
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   01. INTERNAL APPLICATION STATE
========================================================== */

const state = {

    /* ------------------------------------------------------
       01.01 SYSTEM
    ------------------------------------------------------ */

    system: {

        initialized: false,

        loading: false,

        version: "4.0.0"

    },



    /* ------------------------------------------------------
       01.02 JOURNEY
    ------------------------------------------------------ */

    journey: {

        id: "",

        startedAt: null,

        completedAt: null,

        completed: false

    },



    /* ------------------------------------------------------
       01.03 NAVIGATION
    ------------------------------------------------------ */

    navigation: {

        currentAct: 1,

        currentMoment: 1,

        totalActs: 5,

        totalMoments: 35,

        previousScene: null,

        currentScene: null,

        nextScene: null

    },



    /* ------------------------------------------------------
       01.04 VISITOR
    ------------------------------------------------------ */

    visitor: {

        name: "",

        firstName: "",

        email: "",

        phone: "",

        city: "",

        language: "ta",

        responses: {}

    },



    /* ------------------------------------------------------
       01.05 PERSONALIZATION
    ------------------------------------------------------ */

    personalization: {

        greetingUsed: false,

        tokens: {}

    },



    /* ------------------------------------------------------
       01.06 PROGRESS
    ------------------------------------------------------ */

    progress: {

        percent: 0,

        completedActs: 0,

        completedMoments: 0

    },



    /* ------------------------------------------------------
       01.07 BOOKING
    ------------------------------------------------------ */

    booking: {

        eligible: false,

        requested: false,

        confirmed: false,

        slot: null

    },



    /* ------------------------------------------------------
       01.08 ANALYTICS
    ------------------------------------------------------ */

    analytics: {

        sessionStart: Date.now(),

        lastEvent: null,

        events: []

    }

};



/* ==========================================================
   02. INTERNAL HELPERS
========================================================== */

/* ----------------------------------------------------------
   02.01 DEEP CLONE
---------------------------------------------------------- */

function clone(value) {

    return structuredClone(value);

}



/* ----------------------------------------------------------
   02.02 PATH RESOLVER
---------------------------------------------------------- */

function resolve(path) {

    return path

        .split(".")

        .reduce(

            (object, key) => object?.[key],

            state

        );

}



/* ==========================================================
   03. STATE READERS
========================================================== */

/* ----------------------------------------------------------
   03.01 ENTIRE STATE
---------------------------------------------------------- */

function getState() {

    return clone(state);

}



/* ----------------------------------------------------------
   03.02 PROPERTY
---------------------------------------------------------- */

function get(path = "") {

    if (!path) {

        return getState();

    }

    return resolve(path);

}



/* ==========================================================
   04. STATE WRITERS
========================================================== */

/* ----------------------------------------------------------
   04.01 SET VALUE
---------------------------------------------------------- */

function set(path, value) {

    const keys = path.split(".");

    const last = keys.pop();

    let object = state;

    keys.forEach(key => {

        if (!(key in object)) {

            object[key] = {};

        }

        object = object[key];

    });

    object[last] = value;

    return value;

}



/* ----------------------------------------------------------
   04.02 MERGE OBJECT
---------------------------------------------------------- */

function merge(path, values) {

    const object = get(path);

    if (

        typeof object !== "object" ||

        object === null ||

        Array.isArray(object)

    ) {

        throw new Error(

            `State path '${path}' is not an object.`

        );

    }

    Object.assign(

        object,

        values

    );

    return clone(object);

}



/* ==========================================================
   05. PERSONALIZATION
========================================================== */

/* ----------------------------------------------------------
   05.01 UPDATE FIRST NAME
---------------------------------------------------------- */

function updateName(name) {

    const fullName =

        String(name || "").trim();

    const firstName =

        fullName.split(" ")[0] || "";

    state.visitor.name = fullName;

    state.visitor.firstName = firstName;

    state.personalization.tokens.Name = firstName;

    return firstName;

}



/* ==========================================================
   06. JOURNEY MANAGEMENT
========================================================== */

/* ----------------------------------------------------------
   06.01 START JOURNEY
---------------------------------------------------------- */

function startJourney() {

    state.journey.startedAt = Date.now();

}



/* ----------------------------------------------------------
   06.02 COMPLETE JOURNEY
---------------------------------------------------------- */

function completeJourney() {

    state.journey.completed = true;

    state.journey.completedAt = Date.now();

}



/* ==========================================================
   07. RESET
========================================================== */

/* ----------------------------------------------------------
   07.01 RESET JOURNEY
---------------------------------------------------------- */

function resetJourney() {

    state.navigation.currentAct = 1;

    state.navigation.currentMoment = 1;

    state.navigation.previousScene = null;

    state.navigation.currentScene = null;

    state.navigation.nextScene = null;



    state.progress.percent = 0;

    state.progress.completedActs = 0;

    state.progress.completedMoments = 0;



    state.visitor.responses = {};



    state.booking = {

        eligible: false,

        requested: false,

        confirmed: false,

        slot: null

    };

}



/* ==========================================================
   08. SNAPSHOT
========================================================== */

function snapshot() {

    return getState();

}



/* ==========================================================
   09. PUBLIC API
========================================================== */

window.CTMState = Object.freeze({

    /* Reading */

    getState,

    get,

    snapshot,



    /* Writing */

    set,

    merge,

    updateName,



    /* Journey */

    startJourney,

    completeJourney,

    resetJourney

});

})();
