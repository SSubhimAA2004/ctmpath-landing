
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Journey Analytics

Responsibility
• Track Journey Events
• Track Screen Views
• Track User Actions
• Track Completion
• Maintain Analytics State
• Export Analytics

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
    Analytics State
    ==================================================*/

    CTM.state.analytics = CTM.state.analytics || {

        sessionStart: null,

        sessionEnd: null,

        completed: false,

        screenViews: [],

        buttonClicks: [],

        events: []

    };

    /*==================================================
    Timestamp
    ==================================================*/

    CTM.now = function () {

        return new Date().toISOString();

    };

    /*==================================================
    Session Start
    ==================================================*/

    CTM.startAnalytics = function () {

        if (!CTM.state.analytics.sessionStart) {

            CTM.state.analytics.sessionStart = CTM.now();

        }

    };

    /*==================================================
    Session End
    ==================================================*/

    CTM.finishAnalytics = function () {

        CTM.state.analytics.sessionEnd = CTM.now();

        CTM.state.analytics.completed = true;

    };

    /*==================================================
    Track Event
    ==================================================*/

    CTM.trackEvent = function (

        type,

        value = '',

        metadata = {}

    ) {

        CTM.state.analytics.events.push({

            timestamp: CTM.now(),

            type: type,

            value: value,

            metadata: metadata

        });

    };

    /*==================================================
    Track Screen
    ==================================================*/

    CTM.trackScreen = function (screenId) {

        CTM.state.analytics.screenViews.push({

            screen: screenId,

            viewedAt: CTM.now()

        });

        CTM.trackEvent(

            'screen',

            screenId

        );

    };

    /*==================================================
    Track Button
    ==================================================*/

    CTM.trackButton = function (

        action,

        label = ''

    ) {

        CTM.state.analytics.buttonClicks.push({

            action: action,

            label: label,

            clickedAt: CTM.now()

        });

        CTM.trackEvent(

            'button',

            action,

            {

                label: label

            }

        );

    };

    /*==================================================
    Track Choice
    ==================================================*/

    CTM.trackChoice = function (

        question,

        answer

    ) {

        CTM.trackEvent(

            'choice',

            question,

            {

                answer: answer

            }

        );

    };

    /*==================================================
    Track Input
    ==================================================*/

    CTM.trackInput = function (

        field

    ) {

        CTM.trackEvent(

            'input',

            field

        );

    };

    /*==================================================
    Analytics Summary
    ==================================================*/

    CTM.getAnalyticsSummary = function () {

        return {

            sessionStart:

                CTM.state.analytics.sessionStart,

            sessionEnd:

                CTM.state.analytics.sessionEnd,

            completed:

                CTM.state.analytics.completed,

            screensViewed:

                CTM.state.analytics.screenViews.length,

            buttonClicks:

                CTM.state.analytics.buttonClicks.length,

            events:

                CTM.state.analytics.events.length

        };

    };

    /*==================================================
    Export Analytics
    ==================================================*/

    CTM.exportAnalytics = function () {

        return {

            visitor:

                CTM.state.visitor,

            journey:

                CTM.state.journey,

            scores:

                CTM.state.scores,

            analytics:

                CTM.state.analytics

        };

    };

    /*==================================================
    Reset Analytics
    ==================================================*/

    CTM.resetAnalytics = function () {

        CTM.state.analytics = {

            sessionStart: null,

            sessionEnd: null,

            completed: false,

            screenViews: [],

            buttonClicks: [],

            events: []

        };

    };

})();
