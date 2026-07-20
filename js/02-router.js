
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Screen Navigation

Responsibility
• Navigate between screens
• Listen for navigation button clicks

======================================================================
*/

'use strict';

const CTM = window.CTM || {};

/*==================================================
Navigate
==================================================*/

CTM.navigate = function (screenId) {

    if (!screenId) return;

    CTM.loadScreen(screenId);

};


/*==================================================
Button Events
==================================================*/

CTM.bindNavigation = function () {

    document.addEventListener('click', function (event) {

        const button = event.target.closest('[data-next]');

        if (!button) return;

        event.preventDefault();

        const nextScreen = button.dataset.next;

        CTM.navigate(nextScreen);

    });

};


/*==================================================
Expose
==================================================*/

window.CTM = CTM;
