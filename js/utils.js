
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/utils.js
 * Responsibility:
 * Shared utility functions used across the application.
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
     * Query Selector Helpers
     * --------------------------------------------------------
     */

    const $ = (selector, scope = document) => scope.querySelector(selector);

    const $$ = (selector, scope = document) =>
        Array.from(scope.querySelectorAll(selector));

    /**
     * --------------------------------------------------------
     * Safe HTML Escape
     * --------------------------------------------------------
     */

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    /**
     * --------------------------------------------------------
     * Delay Helper
     * --------------------------------------------------------
     */

    function wait(milliseconds = 0) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    /**
     * --------------------------------------------------------
     * Generate Unique ID
     * --------------------------------------------------------
     */

    function uniqueId(prefix = "ctm") {
        return `${prefix}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`;
    }

    /**
     * --------------------------------------------------------
     * Clamp Number
     * --------------------------------------------------------
     */

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * --------------------------------------------------------
     * Percentage Calculator
     * --------------------------------------------------------
     */

    function percentage(value, total) {
        if (!total || total <= 0) return 0;
        return Math.round((value / total) * 100);
    }

    /**
     * --------------------------------------------------------
     * Deep Clone
     * --------------------------------------------------------
     */

    function clone(value) {
        return structuredClone(value);
    }

    /**
     * --------------------------------------------------------
     * Debounce
     * --------------------------------------------------------
     */

    function debounce(fn, delay = 250) {
        let timer;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    /**
     * --------------------------------------------------------
     * Scroll Helpers
     * --------------------------------------------------------
     */

    function scrollTop(smooth = true) {
        window.scrollTo({
            top: 0,
            behavior: smooth ? "smooth" : "auto"
        });
    }

    /**
     * --------------------------------------------------------
     * Object Check
     * --------------------------------------------------------
     */

    function isObject(value) {
        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        );
    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMUtils = Object.freeze({
        $,
        $$,
        escapeHTML,
        wait,
        uniqueId,
        clamp,
        percentage,
        clone,
        debounce,
        scrollTop,
        isObject
    });

})();
