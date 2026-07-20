
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/booking.js
 * Responsibility:
 * Discovery Session Booking Engine
 *
 * Manages the booking state and coordinates
 * the transition from the Guided Journey to
 * the booking experience.
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

    started: false,

    completed: false,

    bookingData: null

};

/* ==========================================================
   START
========================================================== */

function start() {

    state.started = true;

    document.dispatchEvent(

        new CustomEvent(
            "ctm:booking-started"
        )

    );

    return state.started;

}

/* ==========================================================
   SAVE
========================================================== */

function save(data = {}) {

    state.bookingData = {

        ...state.bookingData,

        ...data

    };

    return current();

}

/* ==========================================================
   COMPLETE
========================================================== */

function complete(data = {}) {

    save(data);

    state.completed = true;

    document.dispatchEvent(

        new CustomEvent(

            "ctm:booking-completed",

            {

                detail: current()

            }

        )

    );

    return current();

}

/* ==========================================================
   STATUS
========================================================== */

function current() {

    return {

        started:
            state.started,

        completed:
            state.completed,

        booking:
            structuredClone(
                state.bookingData
            )

    };

}

function isStarted() {

    return state.started;

}

function isCompleted() {

    return state.completed;

}

/* ==========================================================
   RESET
========================================================== */

function reset() {

    state.started = false;

    state.completed = false;

    state.bookingData = null;

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMBooking = Object.freeze({

    start,

    save,

    complete,

    current,

    isStarted,

    isCompleted,

    reset

});

})();
