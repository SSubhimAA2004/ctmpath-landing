
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/analytics.js
 * Responsibility:
 * Analytics Engine
 *
 * Records journey events without affecting
 * application behaviour.
 *
 * No rendering.
 * No navigation.
 * No business logic.
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   INTERNAL STATE
========================================================== */

const state = {

    sessionId:
        CTMUtils.uniqueId("session"),

    sessionStart:
        Date.now(),

    lastEvent: null,

    events: []

};

/* ==========================================================
   BUILD EVENT
========================================================== */

function createEvent(name, moment = null, data = {}) {

    return {

        sessionId:
            state.sessionId,

        timestamp:
            Date.now(),

        event:
            name,

        act:
            moment?.act ??
            CTMState.get("currentAct"),

        moment:
            moment?.id ??
            CTMState.get("currentMoment"),

        data

    };

}

/* ==========================================================
   TRACK
========================================================== */

function track(
    name,
    moment = null,
    data = {}
) {

    const event =
        createEvent(
            name,
            moment,
            data
        );

    state.events.push(event);

    state.lastEvent = event;

    document.dispatchEvent(

        new CustomEvent(

            "ctm:analytics",

            {

                detail: event

            }

        )

    );

    return event;

}

/* ==========================================================
   SESSION
========================================================== */

function session() {

    return {

        id:
            state.sessionId,

        started:
            state.sessionStart,

        duration:
            Date.now() -
            state.sessionStart

    };

}

/* ==========================================================
   EVENTS
========================================================== */

function events() {

    return structuredClone(
        state.events
    );

}

function lastEvent() {

    return state.lastEvent;

}

function count() {

    return state.events.length;

}

/* ==========================================================
   RESET
========================================================== */

function reset() {

    state.sessionId =
        CTMUtils.uniqueId(
            "session"
        );

    state.sessionStart =
        Date.now();

    state.lastEvent = null;

    state.events = [];

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMAnalytics =
Object.freeze({

    track,

    session,

    events,

    lastEvent,

    count,

    reset

});

})();
