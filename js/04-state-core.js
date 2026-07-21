
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application State

Responsibility
• Create the global CTM object
• Maintain application state
• Track current screen
• Track journey state

======================================================================
*/

'use strict';

(() => {

    /*
    ==================================================
    Create Global Namespace
    ==================================================
    */

    window.CTM = window.CTM || {};

    const CTM = window.CTM;

    /*
    ==================================================
    Version
    ==================================================
    */

    CTM.version = '6.0';

    /*
    ==================================================
    Application State
    ==================================================
    */

    CTM.state = {

        initialized: false,

        currentScreen: 'screen01',

        previousScreen: null,

        totalScreens: 36,

        visitor: {

            id: '',

            name: '',

            firstName: '',

            city: '',

            mobile: '',

            email: ''

        },

        journey: {

            started: false,

            completed: false,

            progress: 0,

            completion: 0

        },

        /*
        ==================================================
        User Responses
        ==================================================
        */

        responses: {

            /*
            Screen 07
            Multiple Choice
            */

            lifePriorities: []

        },

        /*
        ==================================================
        Insights
        ==================================================
        */

        insights: {},

        /*
        ==================================================
        Recommendations
        ==================================================
        */

        recommendations: {},

        /*
        ==================================================
        Scores
        ==================================================
        */

        scores: {

            readiness: 0,

            pattern: null

        }

    };

    /*
    ==================================================
    State Access
    ==================================================
    */

    CTM.getState = function () {

        return CTM.state;

    };

    /*
    ==================================================
    Current Screen
    ==================================================
    */

    CTM.getCurrentScreen = function () {

        return CTM.state.currentScreen;

    };

    CTM.setCurrentScreen = function (screenId) {

        CTM.state.previousScreen =

            CTM.state.currentScreen;

        CTM.state.currentScreen =

            screenId;

    };

    /*
    ==================================================
    Journey
    ==================================================
    */

    CTM.startJourney = function () {

        CTM.state.journey.started = true;

    };

    CTM.finishJourney = function () {

        CTM.state.journey.completed = true;

    };

    /*
    ==================================================
    Progress
    ==================================================
    */

    CTM.setProgress = function (screenNumber) {

        CTM.state.journey.progress =

            screenNumber;

        CTM.state.journey.completion =

            Math.round(

                (

                    screenNumber /

                    CTM.state.totalScreens

                ) * 100

            );

    };

    /*
    ==================================================
    Reset Responses
    ==================================================
    */

    CTM.resetResponses = function () {

        CTM.state.responses = {

            lifePriorities: []

        };

    };

    /*
    ==================================================
    Reset Journey
    ==================================================
    */

    CTM.resetJourney = function () {

        CTM.state.journey = {

            started: false,

            completed: false,

            progress: 0,

            completion: 0

        };

        CTM.resetResponses();

    };

    /*
    ==================================================
    Initialization
    ==================================================
    */

    CTM.markInitialized = function () {

        CTM.state.initialized = true;

    };

})();
