
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application State

Responsibility
• Maintain global application state
• Track current screen
• Store visitor journey data
• Provide controlled state updates

======================================================================
*/

'use strict';

const CTM = window.CTM || {};

CTM.version = '6.0';

CTM.state = {

    initialized: false,

    currentScreen: 'screen01',

    previousScreen: null,

    totalScreens: 36,

    visitor: {

        id: null,

        name: '',

        firstName: '',

        city: ''

    },

    journey: {

        started: false,

        completed: false,

        progress: 0,

        completion: 0

    },

    responses: {},

    insights: {},

    recommendations: {},

    scores: {

        readiness: 0,

        pattern: null

    }

};


/*==================================================
Get State
==================================================*/

CTM.getState = function () {

    return CTM.state;

};


/*==================================================
Current Screen
==================================================*/

CTM.getCurrentScreen = function () {

    return CTM.state.currentScreen;

};


CTM.setCurrentScreen = function (screenId) {

    CTM.state.previousScreen = CTM.state.currentScreen;

    CTM.state.currentScreen = screenId;

};


/*==================================================
Journey Status
==================================================*/

CTM.startJourney = function () {

    CTM.state.journey.started = true;

};


CTM.finishJourney = function () {

    CTM.state.journey.completed = true;

};


/*==================================================
Progress
==================================================*/

CTM.setProgress = function (screenNumber) {

    CTM.state.journey.progress = screenNumber;

    CTM.state.journey.completion =
        Math.round((screenNumber / CTM.state.totalScreens) * 100);

};


/*==================================================
Initialization
==================================================*/

CTM.markInitialized = function () {

    CTM.state.initialized = true;

};


/*==================================================
Expose
==================================================*/

window.CTM = CTM;
