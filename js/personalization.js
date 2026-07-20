
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/personalization.js
 * Responsibility:
 * Visitor personalization and token replacement.
 *
 * Engineering Status:
 * Production Build
 * Architecture: FROZEN
 * ==========================================================
 */

(() => {
    "use strict";

    /**
     * --------------------------------------------------------
     * Personalization Tokens
     * --------------------------------------------------------
     */

    const TOKENS = Object.freeze({
        name: "Visitor",
        firstName: "Friend",
        city: "",
        language: "ta"
    });

    /**
     * --------------------------------------------------------
     * Read Visitor Profile
     * --------------------------------------------------------
     */

    function profile() {

        return {
            name: CTMState.get("visitor.name") || TOKENS.name,
            firstName:
                CTMState.get("personalization.firstName") ||
                TOKENS.firstName,
            city: CTMState.get("visitor.city") || TOKENS.city,
            language:
                CTMState.get("visitor.language") ||
                TOKENS.language
        };

    }

    /**
     * --------------------------------------------------------
     * Update Visitor Profile
     * --------------------------------------------------------
     */

    function update(values = {}) {

        if (values.name !== undefined) {
            CTMState.set("visitor.name", values.name);
        }

        if (values.firstName !== undefined) {
            CTMState.set(
                "personalization.firstName",
                values.firstName
            );
        }

        if (values.city !== undefined) {
            CTMState.set("visitor.city", values.city);
        }

        if (values.language !== undefined) {
            CTMState.set(
                "visitor.language",
                values.language
            );
        }

        return profile();

    }

    /**
     * --------------------------------------------------------
     * Replace Template Tokens
     *
     * Supported Tokens:
     * {{name}}
     * {{firstName}}
     * {{city}}
     * {{language}}
     * --------------------------------------------------------
     */

    function interpolate(text = "") {

        const data = profile();

        return String(text)
            .replaceAll("{{name}}", data.name)
            .replaceAll("{{firstName}}", data.firstName)
            .replaceAll("{{city}}", data.city)
            .replaceAll("{{language}}", data.language);

    }

    /**
     * --------------------------------------------------------
     * Personalize HTML Fragment
     * --------------------------------------------------------
     */

    function personalizeHTML(html = "") {

        return interpolate(html);

    }

    /**
     * --------------------------------------------------------
     * Personalize DOM Tree
     * --------------------------------------------------------
     */

    function personalize(root = document) {

        const elements = root.querySelectorAll("[data-personalize]");

        elements.forEach(element => {
            element.innerHTML = interpolate(element.innerHTML);
        });

        return elements.length;

    }

    /**
     * --------------------------------------------------------
     * Greeting
     * --------------------------------------------------------
     */

    function greeting() {

        const user = profile();

        return `Welcome, ${user.firstName}.`;

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMPersonalization = Object.freeze({

        profile,

        update,

        interpolate,

        personalizeHTML,

        personalize,

        greeting

    });

})();
