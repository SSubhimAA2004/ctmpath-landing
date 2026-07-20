
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/app.js
 * Responsibility:
 * Application Bootstrap Engine
 *
 * Initializes the application and coordinates
 * startup of all core engines.
 *
 * No business logic.
 * No rendering logic.
 * No journey logic.
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   INTERNAL STATE
========================================================== */

const state = {

    initialized: false,

    started: false

};

/* ==========================================================
   INITIALIZE ENGINES
========================================================== */

async function initialize() {

    if (state.initialized) {

        return;

    }

    CTMRenderer.initialize();

    CTMProgress.reset();

    CTMAnalytics.reset();

    CTMBooking.reset();

    await CTMConversation.start();

    state.initialized = true;

}

/* ==========================================================
   START APPLICATION
========================================================== */

async function start() {

    await initialize();

    await CTMConversation.render();

    state.started = true;

    document.dispatchEvent(

        new CustomEvent(

            "ctm:application-started"

        )

    );

}

/* ==========================================================
   RESTART APPLICATION
========================================================== */

async function restart() {

    CTMProgress.reset();

    CTMAnalytics.reset();

    CTMBooking.reset();

    await CTMConversation.restart();

    await CTMConversation.render();

}

/* ==========================================================
   APPLICATION STATUS
========================================================== */

function current() {

    return {

        initialized:
            state.initialized,

        started:
            state.started,

        conversation:
            CTMConversation.current(),

        progress:
            CTMProgress.current(),

        booking:
            CTMBooking.current(),

        analytics: {

            events:
                CTMAnalytics.count()

        }

    };

}

/* ==========================================================
   APPLICATION READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        try {

            await start();

        }
        catch (exception) {

            console.error(exception);

            CTMRenderer.error(

                exception.message

            );

        }

    }

);

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMApp = Object.freeze({

    start,

    restart,

    current

});

})();
