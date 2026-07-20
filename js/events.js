
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.3
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

        if (button.disabled) {

            return;

        }

        button.disabled = true;

        try {

            /* Move to next moment */

            await CTMConversation.next();

            /* Render the new moment */

            await CTMConversation.render();

        }

        catch (error) {

            console.error(error);

        }

        finally {

            button.disabled = false;

        }

    }

);

})();

