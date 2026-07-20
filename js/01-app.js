
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application Bootstrap

Responsibility
• Initialize the application
• Bind navigation
• Load the first screen

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
    Initialize
    ==================================================*/

    CTM.initialize = async function () {

        try {

            CTM.log('========================================');
            CTM.log('CTM PATH™ Guided Journey v6.0');
            CTM.log('Application Starting...');
            CTM.log('========================================');

            CTM.markInitialized();

            CTM.bindNavigation();

            await CTM.loadScreen('screen01');

            CTM.log('Application Ready.');

        }

        catch (error) {

            console.error('Application Initialization Failed');

            console.error(error);

        }

    };

    /*==================================================
    DOM Ready
    ==================================================*/

    document.addEventListener(

        'DOMContentLoaded',

        async function () {

            await CTM.initialize();

        }

    );

})();
