
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Button Event Manager

Responsibility
• Continue Button
• Back Button
• Skip Button
• Restart Button
• Finish Button
• Booking Button
• Generic Action Buttons

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
    Button Actions
    ==================================================*/

    CTM.buttonActions = {};

    /*==================================================
    Continue
    ==================================================*/

    CTM.buttonActions.continue = async function (button) {

        /*----------------------------------------------
        Synchronize All Visible Inputs
        ----------------------------------------------*/

        document

            .querySelectorAll('[data-field]')

            .forEach(function (input) {

                if (

                    typeof CTM.updateVisitorField ===

                    'function'

                ) {

                    CTM.updateVisitorField(input);

                }

            });

        /*----------------------------------------------
        Persist State
        ----------------------------------------------*/

        if (

            typeof CTM.saveState ===

            'function'

        ) {

            CTM.saveState();

        }

        /*----------------------------------------------
        Refresh Personalization
        ----------------------------------------------*/

        if (

            typeof CTM.updatePersonalization ===

            'function'

        ) {

            CTM.updatePersonalization();

        }

        if (

            typeof CTM.refreshText ===

            'function'

        ) {

            CTM.refreshText();

        }

        /*----------------------------------------------
        Navigate
        ----------------------------------------------*/

        const nextScreen =

            button.dataset.next;

        if (!nextScreen) {

            console.warn(

                'Continue button missing data-next.'

            );

            return;

        }

        await CTM.navigate(nextScreen);

        /*----------------------------------------------
        Refresh After Navigation
        ----------------------------------------------*/

        if (

            typeof CTM.restoreInputs ===

            'function'

        ) {

            CTM.restoreInputs();

        }

        if (

            typeof CTM.updatePersonalization ===

            'function'

        ) {

            CTM.updatePersonalization();

        }

        if (

            typeof CTM.refreshText ===

            'function'

        ) {

            CTM.refreshText();

        }

    };

    /*==================================================
    Back
    ==================================================*/

    CTM.buttonActions.back = async function () {

        await CTM.navigateBack();

        if (

            typeof CTM.restoreInputs ===

            'function'

        ) {

            CTM.restoreInputs();

        }

        if (

            typeof CTM.refreshText ===

            'function'

        ) {

            CTM.refreshText();

        }

    };

    /*==================================================
    Skip
    ==================================================*/

    CTM.buttonActions.skip = async function (button) {

        const nextScreen =

            button.dataset.next;

        if (!nextScreen) {

            console.warn(

                'Skip button missing data-next.'

            );

            return;

        }

        await CTM.navigate(nextScreen);

        if (

            typeof CTM.refreshText ===

            'function'

        ) {

            CTM.refreshText();

        }

    };

    /*==================================================
    Restart
    ==================================================*/

    CTM.buttonActions.restart = async function () {

        if (

            typeof CTM.resetJourney ===

            'function'

        ) {

            CTM.resetJourney();

        }

        if (

            typeof CTM.resetVisitor ===

            'function'

        ) {

            CTM.resetVisitor();

        }

        if (

            typeof CTM.clearState ===

            'function'

        ) {

            CTM.clearState();

        }

        await CTM.navigate(

            'screen01'

        );

        if (

            typeof CTM.refreshText ===

            'function'

        ) {

            CTM.refreshText();

        }

    };

    /*==================================================
    Finish
    ==================================================*/

    CTM.buttonActions.finish = function () {

        if (

            typeof CTM.finishJourney ===

            'function'

        ) {

            CTM.finishJourney();

        }

        if (

            typeof CTM.saveState ===

            'function'

        ) {

            CTM.saveState();

        }

    };

    /*==================================================
    Booking
    ==================================================*/

    CTM.buttonActions.booking = function () {

        if (

            typeof CTM.saveState ===

            'function'

        ) {

            CTM.saveState();

        }

        CTM.log(

            'Booking action triggered.'

        );

    };

    /*==================================================
    Generic Action Dispatcher
    ==================================================*/

    CTM.executeButtonAction = async function (button) {

        const action =

            button.dataset.action;

        if (!action) {

            return;

        }

        const handler =

            CTM.buttonActions[action];

        if (

            typeof handler !==

            'function'

        ) {

            console.warn(

                `Unknown button action: ${action}`

            );

            return;

        }

        await handler(button);

    };

    /*==================================================
    Bind Button Events
    ==================================================*/

    CTM.bindButtons = function () {

        document.addEventListener(

            'click',

            async function (event) {

                const button =

                    event.target.closest(

                        '[data-action]'

                    );

                if (!button) {

                    return;

                }

                event.preventDefault();

                await CTM.executeButtonAction(

                    button

                );

            }

        );

    };

    /*==================================================
    Initialize
    ==================================================*/

    CTM.bindButtons();

})();
