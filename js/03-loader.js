
/*
======================================================================

CTM PATH™ Guided Journey v6.0

File
03-loader.js

Purpose
Screen Loading Engine

Responsibility
• Load HTML screens
• Inject screens into the application
• Update application state
• Restore screen state
• Refresh personalization
• Refresh calculations
• Refresh progress
• Track analytics

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error('CTM Core not initialized.');

        return;

    }

    /*==================================================
    Configuration
    ==================================================*/

    CTM.loader = {

        screenFolder: 'screens/',

        extension: '.html',

        containerId: 'screen-container'

    };

    /*==================================================
    Get Container
    ==================================================*/

    CTM.getScreenContainer = function () {

        return document.getElementById(

            CTM.loader.containerId

        );

    };

    /*==================================================
    Build Screen Path
    ==================================================*/

    CTM.getScreenPath = function (screenId) {

        return (

            CTM.loader.screenFolder +

            screenId +

            CTM.loader.extension

        );

    };

    /*==================================================
    Fetch Screen
    ==================================================*/

    CTM.fetchScreen = async function (screenId) {

        const path =

            CTM.getScreenPath(screenId);

        const response = await fetch(path, {

            cache: 'no-cache'

        });

        if (!response.ok) {

            throw new Error(

                'Unable to load ' + path

            );

        }

        return await response.text();

    };

    /*==================================================
    Inject Screen
    ==================================================*/

    CTM.injectScreen = function (html) {

        const container =

            CTM.getScreenContainer();

        if (!container) {

            throw new Error(

                'Screen container not found.'

            );

        }

        container.innerHTML = html;

    };

    /*==================================================
    After Screen Loaded
    ==================================================*/

    CTM.afterScreenLoaded = function () {

        /*
        Restore Inputs
        */

        if (

            typeof CTM.restoreInputs === 'function'

        ) {

            CTM.restoreInputs();

        }

        /*
        Restore Choices
        */

        if (

            typeof CTM.restoreChoices === 'function'

        ) {

            CTM.restoreChoices();

        }

        /*
        Restore Booking
        */

        if (

            typeof CTM.restoreBooking === 'function'

        ) {

            CTM.restoreBooking();

        }

        /*
        Personalization
        */

        if (

            typeof CTM.refreshPersonalization === 'function'

        ) {

            CTM.refreshPersonalization();

        }

        /*
        Dynamic Text
        */

        if (

            typeof CTM.refreshText === 'function'

        ) {

            CTM.refreshText();

        }

        /*
        Score Engine
        */

        if (

            typeof CTM.refreshScores === 'function'

        ) {

            CTM.refreshScores();

        }

        /*
        Pattern Engine
        */

        if (

            typeof CTM.refreshPatterns === 'function'

        ) {

            CTM.refreshPatterns();

        }

        /*
        Insight Engine
        */

        if (

            typeof CTM.refreshInsights === 'function'

        ) {

            CTM.refreshInsights();

        }

        /*
        Booking Summary
        */

        if (

            typeof CTM.updateBookingSummary === 'function'

        ) {

            CTM.updateBookingSummary();

        }

    };

    /*==================================================
    Update Progress
    ==================================================*/

    CTM.updateJourneyProgress = function (screenId) {

        const number = parseInt(

            screenId.replace('screen', ''),

            10

        );

        if (

            Number.isNaN(number)

        ) {

            return;

        }

        if (

            typeof CTM.setProgress === 'function'

        ) {

            CTM.setProgress(number);

        }

    };

    /*==================================================
    Track Screen
    ==================================================*/

    CTM.trackLoadedScreen = function (screenId) {

        if (

            typeof CTM.trackScreen === 'function'

        ) {

            CTM.trackScreen(screenId);

        }

    };

    /*==================================================
    Load Screen
    ==================================================*/

    CTM.loadScreen = async function (screenId) {

        try {

            CTM.log(

                'Loading',

                screenId

            );

            const html =

                await CTM.fetchScreen(screenId);

            CTM.injectScreen(html);

            if (

                typeof CTM.setCurrentScreen === 'function'

            ) {

                CTM.setCurrentScreen(screenId);

            }

            CTM.updateJourneyProgress(screenId);

            CTM.afterScreenLoaded();

            CTM.trackLoadedScreen(screenId);

            if (

                typeof CTM.saveState === 'function'

            ) {

                CTM.saveState();

            }

            CTM.log(

                screenId,

                'loaded successfully.'

            );

            return true;

        }

        catch (error) {

            console.error(error);

            CTM.showLoaderError(

                screenId,

                error.message

            );

            return false;

        }

    };

    /*==================================================
    Loader Error
    ==================================================*/

    CTM.showLoaderError = function (

        screenId,

        message

    ) {

        const container =

            CTM.getScreenContainer();

        if (!container) {

            return;

        }

        container.innerHTML = `

<section class="screen">

    <div class="container">

        <div class="card">

            <h2>

                Screen Loading Error

            </h2>

            <p>

                Unable to load:

                <strong>${screenId}</strong>

            </p>

            <p>

                ${message}

            </p>

        </div>

    </div>

</section>

`;

    };

    /*==================================================
    Reload Current Screen
    ==================================================*/

    CTM.reloadScreen = async function () {

        return await CTM.loadScreen(

            CTM.getCurrentScreen()

        );

    };

    /*==================================================
    Preload
    ==================================================*/

    CTM.preloadScreen = async function (

        screenId

    ) {

        try {

            await fetch(

                CTM.getScreenPath(screenId),

                {

                    cache: 'force-cache'

                }

            );

        }

        catch (error) {

            console.warn(

                'Preload failed:',

                screenId

            );

        }

    };

})();
