
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Utility Functions

Responsibility
• DOM helpers
• Text helpers
• CSS helpers
• Validation helpers

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {
        console.error('CTM core has not been initialized.');
        return;
    }

    /*==================================================
    Query Selector
    ==================================================*/

    CTM.$ = function (selector) {

        return document.querySelector(selector);

    };

    CTM.$$ = function (selector) {

        return document.querySelectorAll(selector);

    };

    /*==================================================
    Get Element By ID
    ==================================================*/

    CTM.byId = function (id) {

        return document.getElementById(id);

    };

    /*==================================================
    Safe Text
    ==================================================*/

    CTM.setText = function (selector, value) {

        const element = CTM.$(selector);

        if (!element) return;

        element.textContent = value;

    };

    /*==================================================
    Safe HTML
    ==================================================*/

    CTM.setHTML = function (selector, value) {

        const element = CTM.$(selector);

        if (!element) return;

        element.innerHTML = value;

    };

    /*==================================================
    Class Helpers
    ==================================================*/

    CTM.addClass = function (selector, className) {

        const element = CTM.$(selector);

        if (!element) return;

        element.classList.add(className);

    };

    CTM.removeClass = function (selector, className) {

        const element = CTM.$(selector);

        if (!element) return;

        element.classList.remove(className);

    };

    CTM.toggleClass = function (selector, className) {

        const element = CTM.$(selector);

        if (!element) return;

        element.classList.toggle(className);

    };

    /*==================================================
    Visibility
    ==================================================*/

    CTM.show = function (selector) {

        const element = CTM.$(selector);

        if (!element) return;

        element.classList.remove('hidden');

    };

    CTM.hide = function (selector) {

        const element = CTM.$(selector);

        if (!element) return;

        element.classList.add('hidden');

    };

    /*==================================================
    String Helpers
    ==================================================*/

    CTM.clean = function (value) {

        return String(value ?? '').trim();

    };

    CTM.isEmpty = function (value) {

        return CTM.clean(value) === '';

    };

    /*==================================================
    Logger
    ==================================================*/

    CTM.log = function (...args) {

        console.log('[CTM]', ...args);

    };

})();
