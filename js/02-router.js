
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application Router

Responsibility
• Handle screen navigation
• Route button requests
• Delegate loading to the Screen Loader

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
    Navigate
    ==================================================*/

    CTM.navigate = async function (screenId) {

        if (!screenId) {

            console.warn('No destination screen specified.');

            return;

        }

        await CTM.loadScreen(screenId);

    };

    /*==================================================
    Previous Screen
    ==================================================*/

    CTM.navigateBack = async function () {

        const previous = CTM.state.previousScreen;

        if (!previous) return;

        await CTM.loadScreen(previous);

    };

    /*==================================================
    Bind Navigation
    ==================================================*/

    CTM.bindNavigation = function () {

        document.addEventListener('click', async function (event) {

            const button = event.target.closest('[data-next]');

            if (!button) return;

            event.preventDefault();

            const nextScreen = button.dataset.next;

            await CTM.navigate(nextScreen);

        });

    };

})();
