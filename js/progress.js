
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/progress.js
 * Responsibility:
 * Journey Progress Engine
 *
 * Calculates and maintains visitor progress
 * through the 35-Moment Guided Journey.
 *
 * No rendering.
 * No navigation.
 * No business logic.
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   CONFIGURATION
========================================================== */

const TOTAL_MOMENTS = 35;

/* ==========================================================
   INTERNAL STATE
========================================================== */

const state = {

    currentMoment: 0,

    completedMoments: 0,

    remainingMoments: TOTAL_MOMENTS,

    percentage: 0

};

/* ==========================================================
   CALCULATE
========================================================== */

function calculate(moment) {

    const current = Math.min(

        Math.max(Number(moment.id || moment), 1),

        TOTAL_MOMENTS

    );

    state.currentMoment = current;

    state.completedMoments = current;

    state.remainingMoments =
        TOTAL_MOMENTS - current;

    state.percentage = Math.round(

        (current / TOTAL_MOMENTS) * 100

    );

}

/* ==========================================================
   UPDATE
========================================================== */

function update(moment) {

    calculate(moment);

    document.dispatchEvent(

        new CustomEvent(

            "ctm:progress",

            {

                detail: current()

            }

        )

    );

    return current();

}

/* ==========================================================
   CURRENT
========================================================== */

function current() {

    return {

        currentMoment:
            state.currentMoment,

        completedMoments:
            state.completedMoments,

        remainingMoments:
            state.remainingMoments,

        percentage:
            state.percentage

    };

}

/* ==========================================================
   ACCESSORS
========================================================== */

function percentage() {

    return state.percentage;

}

function completed() {

    return state.completedMoments;

}

function remaining() {

    return state.remainingMoments;

}

/* ==========================================================
   RESET
========================================================== */

function reset() {

    state.currentMoment = 0;

    state.completedMoments = 0;

    state.remainingMoments =
        TOTAL_MOMENTS;

    state.percentage = 0;

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMProgress = Object.freeze({

    update,

    current,

    percentage,

    completed,

    remaining,

    reset

});

})();
