
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.2
 * File: js/events.js
 * Event Engine
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   CONTINUE BUTTON
========================================================== */

document.addEventListener(

    "click",

    async (event) => {

        const button = event.target.closest(

            "[data-action='continue']"

        );

        if (!button) {

            return;

        }

        event.preventDefault();

        button.disabled = true;

        try {

            await CTMConversation.next();

        }

        finally {

            button.disabled = false;

        }

    }

);

})();

