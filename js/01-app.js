
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application Bootstrap

Responsibility
• Initialize Application
• Start Journey
• Load First Screen
• Restore Saved State
• Bind Events
• Initialize Personalization
• Initialize Analytics

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error('CTM Core not found.');

        return;

    }

    /*==================================================
    Configuration
    ==================================================*/

    CTM.config = {

        firstScreen: 'screen01',

        debug: true

    };


    /*==================================================
    Log
    ==================================================*/

    CTM.log = function (...args) {

        if (!CTM.config.debug) {

            return;

        }

        console.log(

            '[CTM]',

            ...args

        );

    };


    /*==================================================
    Restore Session
    ==================================================*/

    CTM.restoreSession = function () {

        if (

            typeof CTM.loadState === 'function'

        ) {

            CTM.loadState();

        }

    };


    /*==================================================
    Bind Global Events
    ==================================================*/

    CTM.bindEvents = function () {

        if (

            typeof CTM.bindButtons === 'function'

        ) {

            CTM.bindButtons();

        }


        if (

            typeof CTM.bindInputs === 'function'

        ) {

            CTM.bindInputs();

        }


        if (

            typeof CTM.bindChoices === 'function'

        ) {

            CTM.bindChoices();

        }

    };


    /*==================================================
    Restore Screen State
    ==================================================*/

    CTM.restoreScreenState = function () {

        if (

            typeof CTM.restoreInputs === 'function'

        ) {

            CTM.restoreInputs();

        }


        if (

            typeof CTM.restoreChoices === 'function'

        ) {

            CTM.restoreChoices();

        }


        if (

            typeof CTM.restoreBooking === 'function'

        ) {

            CTM.restoreBooking();

        }

    };


    /*==================================================
    Refresh UI
    ==================================================*/

    CTM.refreshUI = function () {

        if (

            typeof CTM.refreshText === 'function'

        ) {

            CTM.refreshText();

        }


        if (

            typeof CTM.refreshScores === 'function'

        ) {

            CTM.refreshScores();

        }


        if (

            typeof CTM.refreshPatterns === 'function'

        ) {

            CTM.refreshPatterns();

        }


        if (

            typeof CTM.refreshInsights === 'function'

        ) {

            CTM.refreshInsights();

        }

    };


    /*==================================================
    Load Initial Screen
    ==================================================*/

    CTM.loadInitialScreen = async function () {


        /*
        --------------------------------------------------
        Development / Testing
        URL Hash Priority
        --------------------------------------------------
        */

        const hash =

            window.location.hash.replace('#', '');


        if (

            typeof CTM.isValidScreen === 'function' &&

            CTM.isValidScreen(hash)

        ) {

            await CTM.navigate(hash);

            return;

        }


        /*
        --------------------------------------------------
        Production Landing Page Start
        Always Begin Journey From Screen 01
        --------------------------------------------------
        */

        await CTM.navigate(

            CTM.config.firstScreen

        );


    };


    /*==================================================
    Analytics
    ==================================================*/

    CTM.initializeAnalytics = function () {

        if (

            typeof CTM.startAnalytics === 'function'

        ) {

            CTM.startAnalytics();

        }

    };


    /*==================================================
    Application Start
    ==================================================*/

    CTM.initialize = async function () {


        CTM.log(

            'Initializing CTM PATH™ Guided Journey v6.0'

        );


        CTM.restoreSession();


        CTM.bindEvents();


        CTM.initializeAnalytics();


        await CTM.loadInitialScreen();


        CTM.restoreScreenState();


        CTM.refreshUI();


        if (

            typeof CTM.markInitialized === 'function'

        ) {

            CTM.markInitialized();

        }


        CTM.log(

            'Application Ready.'

        );


    };


    /*==================================================
    DOM Ready
    ==================================================*/

    document.addEventListener(

        'DOMContentLoaded',

        function () {

            CTM.initialize();

        }

    );


})();
