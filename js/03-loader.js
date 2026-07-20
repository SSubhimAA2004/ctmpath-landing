
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Screen Loader

Responsibility
• Load HTML screens
• Render into screen-root
• Update current screen
• Update progress

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
    Screen Root
    ==================================================*/

    CTM.screenRoot = function () {

        return CTM.byId('screen-root');

    };

    /*==================================================
    Load Screen
    ==================================================*/

    CTM.loadScreen = async function (screenId) {

        try {

            const root = CTM.screenRoot();

            if (!root) {
                throw new Error('screen-root not found.');
            }

            CTM.log('Loading:', screenId);

            const response = await fetch(`screens/${screenId}.html`);

            if (!response.ok) {

                throw new Error(
                    `Unable to load ${screenId}.html`
                );

            }

            const html = await response.text();

            root.innerHTML = html;

            CTM.setCurrentScreen(screenId);

            const number = parseInt(

                screenId.replace('screen', ''),

                10

            );

            if (!isNaN(number)) {

                CTM.setProgress(number);

            }

            CTM.log('Loaded:', screenId);

        }

        catch (error) {

            console.error(error);

            const root = CTM.screenRoot();

            if (!root) return;

            root.innerHTML = `

                <section class="screen">

                    <div class="container">

                        <div class="card">

                            <h2>Screen Loading Error</h2>

                            <p>${error.message}</p>

                        </div>

                    </div>

                </section>

            `;

        }

    };

    /*==================================================
    Reload Current Screen
    ==================================================*/

    CTM.reloadCurrentScreen = function () {

        return CTM.loadScreen(

            CTM.getCurrentScreen()

        );

    };

})();
