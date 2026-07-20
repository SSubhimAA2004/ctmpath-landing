
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Screen Loader

Responsibility
• Load HTML screens
• Render into screen-root
• Update application state

======================================================================
*/

'use strict';

const CTM = window.CTM || {};

/*==================================================
Load Screen
==================================================*/

CTM.loadScreen = async function (screenId) {

    try {

        const container = CTM.byId('screen-root');

        if (!container) {
            throw new Error('screen-root not found.');
        }

        const response = await fetch(`screens/${screenId}.html`);

        if (!response.ok) {
            throw new Error(`Unable to load ${screenId}.html`);
        }

        const html = await response.text();

        container.innerHTML = html;

        CTM.setCurrentScreen(screenId);

        CTM.setProgress(
            parseInt(
                screenId.replace('screen', ''),
                10
            )
        );

        CTM.log('Loaded:', screenId);

    } catch (error) {

        console.error(error);

        const container = CTM.byId('screen-root');

        if (container) {

            container.innerHTML = `
                <section class="screen">
                    <div class="container">
                        <div class="card">
                            <h3>Unable to load screen.</h3>
                            <p>${error.message}</p>
                        </div>
                    </div>
                </section>
            `;

        }

    }

};


/*==================================================
Reload Current Screen
==================================================*/

CTM.reloadScreen = function () {

    return CTM.loadScreen(
        CTM.getCurrentScreen()
    );

};


/*==================================================
Expose
==================================================*/

window.CTM = CTM;
