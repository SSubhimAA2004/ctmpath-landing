
/*
======================================================================

CTM PATH™ Guided Journey v6.0

File
00-core.js

Purpose
Core Application Object

Responsibility
• Create global CTM namespace
• Hold application state
• Shared helper methods
• Common utilities
• Current screen management

======================================================================
*/

'use strict';

(() => {

    if (window.CTM) {
        return;
    }

    const CTM = {};

    /*==================================================
    Application State
    ==================================================*/

    CTM.state = {

        initialized: false,

        currentScreen: null,

        previousScreen: null,

        totalScreens: 36,

        progress: 0,

        answers: {},

        scores: {},

        booking: {},

        user: {}

    };

    /*==================================================
    Initialization
    ==================================================*/

    CTM.markInitialized = function () {

        CTM.state.initialized = true;

    };

    CTM.isInitialized = function () {

        return CTM.state.initialized;

    };

    /*==================================================
    Screen State
    ==================================================*/

    CTM.setCurrentScreen = function (screenId) {

        CTM.state.previousScreen =

            CTM.state.currentScreen;

        CTM.state.currentScreen =

            screenId;

    };

    CTM.getCurrentScreen = function () {

        return CTM.state.currentScreen;

    };

    /*==================================================
    Progress
    ==================================================*/

    CTM.setProgress = function (value) {

        CTM.state.progress = value;

    };

    CTM.getProgress = function () {

        return CTM.state.progress;

    };

    /*==================================================
    User Data
    ==================================================*/

    CTM.setUser = function (key, value) {

        CTM.state.user[key] = value;

    };

    CTM.getUser = function (key) {

        return CTM.state.user[key];

    };

    /*==================================================
    Answers
    ==================================================*/

    CTM.setAnswer = function (key, value) {

        CTM.state.answers[key] = value;

    };

    CTM.getAnswer = function (key) {

        return CTM.state.answers[key];

    };

    /*==================================================
    Scores
    ==================================================*/

    CTM.setScore = function (key, value) {

        CTM.state.scores[key] = value;

    };

    CTM.getScore = function (key) {

        return CTM.state.scores[key];

    };

    /*==================================================
    Booking
    ==================================================*/

    CTM.setBooking = function (key, value) {

        CTM.state.booking[key] = value;

    };

    CTM.getBooking = function (key) {

        return CTM.state.booking[key];

    };

    /*==================================================
    Helpers
    ==================================================*/

    CTM.exists = function (value) {

        return value !== undefined &&
               value !== null;

    };

    CTM.byId = function (id) {

        return document.getElementById(id);

    };

    CTM.qs = function (selector) {

        return document.querySelector(selector);

    };

    CTM.qsa = function (selector) {

        return document.querySelectorAll(selector);

    };

    /*==================================================
    Logging
    ==================================================*/

    CTM.log = function (...args) {

        console.log(

            '[CTM]',

            ...args

        );

    };

    /*==================================================
    Global
    ==================================================*/

    window.CTM = CTM;

})();
