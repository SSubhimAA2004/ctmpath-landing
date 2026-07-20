
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/conversation.js
 * Batch: 1 of 5
 * Responsibility:
 * Conversation Engine
 *
 * Orchestrates the complete 35-Moment / 5-Act journey.
 *
 * Owns:
 * - Journey
 * - Acts
 * - Moments
 * - Responses
 *
 * Delegates:
 * - Rendering
 * - Navigation
 * - Progress
 * - Analytics
 * - Booking
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   CONFIGURATION
========================================================== */

const TOTAL_ACTS = 5;

const TOTAL_MOMENTS = 35;

/* ==========================================================
   INTERNAL STATE
========================================================== */

const state = {

    journey: {

        initialized: false,

        loading: false,

        completed: false

    },

    act: {

        number: null,

        data: null

    },

    moment: {

        current: null

    },

    responses: {}

};

/* ==========================================================
   JOURNEY MANAGER
========================================================== */

function initialize() {

    state.journey.initialized = true;

}

function isInitialized() {

    return state.journey.initialized;

}

function beginLoading() {

    state.journey.loading = true;

}

function endLoading() {

    state.journey.loading = false;

}

function isLoading() {

    return state.journey.loading;

}

function completeJourney() {

    state.journey.completed = true;

}

function isComplete() {

    return state.journey.completed;

}

/* ==========================================================
   ACT MANAGER
========================================================== */

function actFile(actNumber) {

    return `act${String(actNumber).padStart(2, "0")}`;

}

async function loadAct(actNumber) {

    beginLoading();

    try {

        const data =
            await CTMLoader.loadData(
                actFile(actNumber)
            );

        state.act.number = actNumber;

        state.act.data = data;

        return data;

    }
    finally {

        endLoading();

    }

}

function currentAct() {

    return state.act.number;

}

function currentActData() {

    return state.act.data;

}

/* ==========================================================
   MOMENT MANAGER
========================================================== */

function resolveMoment(momentId) {

    const moments =
        state.act.data?.moments;

    if (!Array.isArray(moments)) {

        return null;

    }

    return moments.find(

        moment => moment.id === momentId

    ) || null;

}

function setMoment(moment) {

    if (!moment) {

        throw new Error(
            "Conversation: Invalid moment."
        );

    }

    state.moment.current = moment;

    return moment;

}

 /* ==========================================================
   CONTINUATION
========================================================== */

function currentMoment() {

    return state.moment.current;

}

async function loadMoment(momentId) {

    const moment =
        resolveMoment(momentId);

    if (!moment) {

        throw new Error(
            `Moment ${momentId} not found.`
        );

    }

    return setMoment(moment);

}

/* ==========================================================
   RESPONSE MANAGER
========================================================== */

function loadResponses() {

    state.responses =
        CTMState.get(
            "visitor.responses"
        ) || {};

    return state.responses;

}

function saveResponse(value) {

    const moment =
        currentMoment();

    if (!moment) {

        throw new Error(
            "Conversation: No active moment."
        );

    }

    state.responses[moment.id] = value;

    CTMState.set(

        "visitor.responses",

        state.responses

    );

    return value;

}

function response(momentId) {

    return state.responses[momentId];

}

/* ==========================================================
   JOURNEY START
========================================================== */

async function start() {

    const act =
        CTMState.get(
            "navigation.currentAct"
        );

    const moment =
        CTMState.get(
            "navigation.currentMoment"
        );

    loadResponses();

    await loadAct(act);

    await loadMoment(moment);

    initialize();

    return currentMoment();

}

/* ==========================================================
   NAVIGATION FOUNDATION
========================================================== */

async function goTo(momentId) {

    const act =
        CTMState.get(
            "navigation.currentAct"
        );

    if (act !== currentAct()) {

        await loadAct(act);

    }

    return loadMoment(momentId);

}

async function nextMoment() {

    CTMNavigation.next();

    return goTo(

        CTMState.get(
            "navigation.currentMoment"
        )

    );

}

/* ==========================================================
   CONTINUATION
========================================================== */

async function previousMoment() {

    CTMNavigation.previous();

    return goTo(

        CTMState.get(
            "navigation.currentMoment"
        )

    );

}

/* ==========================================================
   RENDER COORDINATOR
========================================================== */

async function render() {

    const moment = currentMoment();

    if (!moment) {

        throw new Error(
            "Conversation: No active moment."
        );

    }

    await CTMRenderer.renderMoment(
        moment
    );

    return moment;

}

async function refresh() {

    return render();

}

/* ==========================================================
   PIPELINE HOOKS
========================================================== */

function updateProgress() {

    if (
        window.CTMProgress &&
        typeof CTMProgress.update === "function"
    ) {

        CTMProgress.update(
            currentMoment()
        );

    }

}

function trackAnalytics(eventName) {

    if (
        window.CTMAnalytics &&
        typeof CTMAnalytics.track === "function"
    ) {

        CTMAnalytics.track(
            eventName,
            currentMoment()
        );

    }

}

function bookingCheck() {

    if (!isComplete()) {

        return;

    }

    if (
        window.CTMBooking &&
        typeof CTMBooking.start === "function"
    ) {

        CTMBooking.start();

    }

}

/* ==========================================================
   JOURNEY PIPELINE
========================================================== */

async function continueJourney(value) {

    if (value !== undefined) {

        saveResponse(value);

    }

    trackAnalytics(
        "moment_completed"
    );

    updateProgress();

    const moment =
        await nextMoment();

    await render();

    bookingCheck();

    return moment;

}

async function back() {

    const moment =
        await previousMoment();

    await render();

    return moment;

}

/* ==========================================================
   RESTART
========================================================== */

async function restart() {

    CTMState.resetJourney();

    state.journey = {

        initialized: false,

        loading: false,

        completed: false

    };

    state.act = {

        number: null,

        data: null

    };

    state.moment = {

        current: null

    };

    state.responses = {};

    return start();

}

/* ==========================================================
   SNAPSHOT
========================================================== */

function current() {

    return {

        journey: {

            initialized:
                state.journey.initialized,

            loading:
                state.journey.loading,

            completed:
                state.journey.completed

        },

        act: {

            number:
                state.act.number

        },

        moment:

            state.moment.current,

        responses:

            structuredClone(
                state.responses
            )

    };

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMConversation = Object.freeze({

    /* Journey */

    start,

    restart,

    current,

    isInitialized,

    isLoading,

    isComplete,

    /* Navigation */

    goTo,

    next: nextMoment,

    previous: previousMoment,

    continueJourney,

    back,

    /* Moments */

    currentMoment,

    currentAct,

    currentActData,

    /* Responses */

    saveResponse,

    response,

    /* Rendering */

    render,

    refresh

});

})();

