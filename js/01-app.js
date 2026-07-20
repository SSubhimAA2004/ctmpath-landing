
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Application Bootstrap

Responsibility
• Start the application
• Initialize state
• Bind navigation
• Load the first screen

======================================================================
*/

'use strict';

const CTM = window.CTM || {};

/*==================================================
Initialize Application
==================================================*/

CTM.initialize = async function () {

    try {

        CTM.log('--------------------------------');
        CTM.log('CTM PATH™ Guided Journey v6.0');
        CTM.log('Initializing...');
        CTM.log('--------------------------------');

        CTM.markInitialized();

        CTM.bindNavigation();

        await CTM.loadScreen('screen01');

        CTM.log('Application Ready');

    }

    catch (error) {

        console.error(error);

    }

};


/*==================================================
Application Start
==================================================*/

document.addEventListener(

    'DOMContentLoaded',

    function () {

        CTM.initialize();

    }

);


/*==================================================
Expose
==================================================*/

window.CTM = CTM;
