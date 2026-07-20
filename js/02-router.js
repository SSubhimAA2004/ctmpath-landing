
/*
======================================================================

CTM PATH™ Guided Journey v6.0

File
02-router.js

Purpose
Application Router

Responsibility
• Handle screen navigation
• Validate navigation requests
• Delegate loading to Screen Loader
• Prevent duplicate navigation
• Maintain browser history
• Update application state

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error('CTM Core has not been initialized.');

        return;

    }

    /*==================================================
    Navigation Lock
    ==================================================*/

    let isNavigating = false;

    /*==================================================
    Validate Screen
    ==================================================*/

    CTM.isValidScreen = function (screenId) {

        if (!screenId) {

            return false;

        }

        return /^screen\d{2}$/.test(screenId);

    };

    /*==================================================
    Navigate
    ==================================================*/

    CTM.navigate = async function (screenId) {

        if (!CTM.isValidScreen(screenId)) {

            console.warn(

                'Invalid screen:',

                screenId

            );

            return false;

        }

        if (isNavigating) {

            return false;

        }

        if (

            CTM.getCurrentScreen() === screenId

        ) {

            return true;

        }

        isNavigating = true;

        try {

            await CTM.loadScreen(screenId);

            history.replaceState(

                {

                    screen: screenId

                },

                '',

                '#' + screenId

            );

            return true;

        }

        catch (error) {

            console.error(

                error

            );

            return false;

        }

        finally {

            isNavigating = false;

        }

    };

    /*==================================================
    Previous Screen
    ==================================================*/

    CTM.navigateBack = async function () {

        const previous =

            CTM.state.previousScreen;

        if (!previous) {

            return;

        }

        await CTM.navigate(previous);

    };

    /*==================================================
    Next Screen
    ==================================================*/

    CTM.navigateNext = async function () {

        const current =

            CTM.getCurrentScreen();

        const number =

            parseInt(

                current.replace('screen', ''),

                10

            );

        if (

            number >= CTM.state.totalScreens

        ) {

            return;

        }

        const next =

            'screen' +

            String(number + 1).padStart(2, '0');

        await CTM.navigate(next);

    };

    /*==================================================
    Bind Navigation
    ==================================================*/

    CTM.bindNavigation = function () {

        document.addEventListener(

            'click',

            async function (event) {

                const button =

                    event.target.closest(

                        '[data-next]'

                    );

                if (!button) {

                    return;

                }

                event.preventDefault();

                const nextScreen =

                    button.dataset.next;

                await CTM.navigate(

                    nextScreen

                );

            }

        );

    };

    /*==================================================
    Browser History
    ==================================================*/

    window.addEventListener(

        'popstate',

        async function (event) {

            if (

                event.state &&

                event.state.screen

            ) {

                await CTM.navigate(

                    event.state.screen

                );

            }

        }

    );

    /*==================================================
    Initialize Router
    ==================================================*/

    document.addEventListener(

        'DOMContentLoaded',

        function () {

            CTM.bindNavigation();

        }

    );

})();
