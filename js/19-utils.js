
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Shared Utility Functions

Responsibility
• DOM helpers
• Text helpers
• Class helpers
• Validation helpers

======================================================================
*/

'use strict';

const CTM = window.CTM || {};

/*==================================================
Element Selector
==================================================*/

CTM.$ = function (selector) {

    return document.querySelector(selector);

};

CTM.$$ = function (selector) {

    return document.querySelectorAll(selector);

};


/*==================================================
Element By ID
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
Show / Hide
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
Trim
==================================================*/

CTM.clean = function (value) {

    if (value === null || value === undefined) {

        return '';

    }

    return String(value).trim();

};


/*==================================================
Empty Check
==================================================*/

CTM.isEmpty = function (value) {

    return CTM.clean(value) === '';

};


/*==================================================
Debug Log
==================================================*/

CTM.log = function (...args) {

    console.log('[CTM]', ...args);

};


/*==================================================
Expose
==================================================*/

window.CTM = CTM;
