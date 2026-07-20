
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v4.0
 * File: js/events.js
 *
 * Responsibility:
 * UI Event Engine
 *
 * Handles:
 * 01. Continue Button
 * 02. Input Validation
 * 03. Enter Key Submission
 *
 * Engineering Status:
 * Production Build
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   01. CONTINUE BUTTON
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

            const input = document.getElementById("ctm-input");

            if (input) {

                CTMState.set(

                    "visitor.name",

                    input.value.trim()

                );

            }

            await CTMConversation.next();

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

/* ==========================================================
   02. INPUT VALIDATION
========================================================== */

document.addEventListener(

    "input",

    (event) => {

        const input = event.target;

        if (!input.matches("#ctm-input")) {

            return;

        }

        const button = document.querySelector(

            "[data-action='continue']"

        );

        if (!button) {

            return;

        }

        button.disabled =

            input.value.trim().length === 0;

    }

);

/* ==========================================================
   03. ENTER KEY SUPPORT
========================================================== */

document.addEventListener(

    "keydown",

    async (event) => {

        if (event.key !== "Enter") {

            return;

        }

        const input = event.target;

        if (!input.matches("#ctm-input")) {

            return;

        }

        event.preventDefault();

        const button = document.querySelector(

            "[data-action='continue']"

        );

        if (!button || button.disabled) {

            return;

        }

        button.click();

    }

);

})();
