
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application Storage

Responsibility
• Save Application State
• Load Application State
• Clear Saved State
• Session Persistence
• Local Storage Wrapper

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
    Configuration
    ==================================================*/

    CTM.storage = {

        key: 'CTM_PATH_GUIDED_JOURNEY_V6'

    };

    /*==================================================
    Storage Available
    ==================================================*/

    CTM.storageAvailable = function () {

        try {

            const test = '__ctm_test__';

            localStorage.setItem(test, test);

            localStorage.removeItem(test);

            return true;

        }

        catch (error) {

            console.warn('Local Storage unavailable.');

            return false;

        }

    };

    /*==================================================
    Save State
    ==================================================*/

    CTM.saveState = function () {

        if (!CTM.storageAvailable()) {

            return false;

        }

        try {

            const state = JSON.stringify(CTM.state);

            localStorage.setItem(

                CTM.storage.key,

                state

            );

            CTM.log('State saved.');

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    };

    /*==================================================
    Load State
    ==================================================*/

    CTM.loadState = function () {

        if (!CTM.storageAvailable()) {

            return false;

        }

        try {

            const data = localStorage.getItem(

                CTM.storage.key

            );

            if (!data) {

                return false;

            }

            const savedState = JSON.parse(data);

            CTM.state = {

                ...CTM.state,

                ...savedState

            };

            CTM.log('State restored.');

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    };

    /*==================================================
    Clear State
    ==================================================*/

    CTM.clearState = function () {

        if (!CTM.storageAvailable()) {

            return;

        }

        localStorage.removeItem(

            CTM.storage.key

        );

        CTM.log('Saved state cleared.');

    };

    /*==================================================
    Auto Save
    ==================================================*/

    CTM.autoSave = function () {

        return CTM.saveState();

    };

    /*==================================================
    Before Unload
    ==================================================*/

    window.addEventListener(

        'beforeunload',

        function () {

            CTM.autoSave();

        }

    );

})();
