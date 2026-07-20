
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Journey Progress State

Responsibility
• Track current screen
• Track completed screens
• Calculate completion percentage

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
    Ensure Journey Object Exists
    ==================================================*/

    CTM.state.journey = CTM.state.journey || {

        currentScreen: 1,

        completedScreens: [],

        completion: 0

    };

    /*==================================================
    Set Current Screen
    ==================================================*/

    CTM.setCurrentScreenNumber = function (screenNumber) {

        if (!Number.isInteger(screenNumber)) return;

        CTM.state.journey.currentScreen = screenNumber;

    };

    /*==================================================
    Get Current Screen
    ==================================================*/

    CTM.getCurrentScreenNumber = function () {

        return CTM.state.journey.currentScreen;

    };

    /*==================================================
    Mark Screen Complete
    ==================================================*/

    CTM.completeScreen = function (screenNumber) {

        if (!CTM.state.journey.completedScreens.includes(screenNumber)) {

            CTM.state.journey.completedScreens.push(screenNumber);

        }

        CTM.updateCompletion();

    };

    /*==================================================
    Update Completion
    ==================================================*/

    CTM.updateCompletion = function () {

        const totalScreens = CTM.state.totalScreens || 36;

        const completed = CTM.state.journey.completedScreens.length;

        CTM.state.journey.completion = Math.round(

            (completed / totalScreens) * 100

        );

    };

    /*==================================================
    Get Completion
    ==================================================*/

    CTM.getCompletion = function () {

        return CTM.state.journey.completion;

    };

    /*==================================================
    Reset Journey
    ==================================================*/

    CTM.resetJourney = function () {

        CTM.state.journey = {

            currentScreen: 1,

            completedScreens: [],

            completion: 0

        };

    };

})();
