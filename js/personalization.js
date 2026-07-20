
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v4.0
 * File: js/personalization.js
 *
 * PERSONALIZATION ENGINE
 *
 * Responsibility
 * ----------------------------------------------------------
 * • Visitor personalization
 * • Template token replacement
 * • Greeting generation
 * • Future CRM token support
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
   01. DEFAULT TOKENS
========================================================== */

const DEFAULTS = Object.freeze({

    Name: "Friend",

    FullName: "Visitor",

    City: "",

    Email: "",

    Phone: "",

    Language: "ta"

});


/* ==========================================================
   02. VISITOR PROFILE
========================================================== */

function profile() {

    return {

        Name:

            CTMState.get("visitor.firstName") ||

            CTMState.get("visitor.name") ||

            DEFAULTS.Name,



        FullName:

            CTMState.get("visitor.name") ||

            DEFAULTS.FullName,



        City:

            CTMState.get("visitor.city") ||

            DEFAULTS.City,



        Email:

            CTMState.get("visitor.email") ||

            DEFAULTS.Email,



        Phone:

            CTMState.get("visitor.phone") ||

            DEFAULTS.Phone,



        Language:

            CTMState.get("visitor.language") ||

            DEFAULTS.Language

    };

}


/* ==========================================================
   03. UPDATE PROFILE
========================================================== */

function update(values = {}) {

    if (values.name !== undefined) {

        CTMState.updateName(values.name);

    }

    if (values.city !== undefined) {

        CTMState.set(

            "visitor.city",

            values.city

        );

    }

    if (values.email !== undefined) {

        CTMState.set(

            "visitor.email",

            values.email

        );

    }

    if (values.phone !== undefined) {

        CTMState.set(

            "visitor.phone",

            values.phone

        );

    }

    if (values.language !== undefined) {

        CTMState.set(

            "visitor.language",

            values.language

        );

    }

    return profile();

}


/* ==========================================================
   04. TOKEN REPLACEMENT
========================================================== */

function interpolate(text = "") {

    let html = String(text);

    const tokens = profile();

    Object.entries(tokens).forEach(

        ([key, value]) => {

            const expression = new RegExp(

                `\\{\\{\\s*${key}\\s*\\}\\}`,

                "g"

            );

            html = html.replace(

                expression,

                value ?? ""

            );

        }

    );

    return html;

}


/* ==========================================================
   05. HTML PERSONALIZATION
========================================================== */

function personalizeHTML(html = "") {

    return interpolate(html);

}


/* ==========================================================
   06. DOM PERSONALIZATION
========================================================== */

function personalize(root = document) {

    const elements =

        root.querySelectorAll(

            "[data-personalize]"

        );

    elements.forEach(element => {

        element.innerHTML =

            interpolate(

                element.innerHTML

            );

    });

    return elements.length;

}


/* ==========================================================
   07. GREETING
========================================================== */

function greeting() {

    return `Welcome, ${profile().Name}.`;

}


/* ==========================================================
   08. PUBLIC API
========================================================== */

window.CTMPersonalization = Object.freeze({

    profile,

    update,

    interpolate,

    personalizeHTML,

    personalize,

    greeting

});

})();

