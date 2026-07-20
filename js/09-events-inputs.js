
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Input Event Manager

Responsibility
• Text Input Events
• Email Input Events
• Mobile Input Events
• Live Validation
• Visitor State Synchronization
• Auto Save

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
    Supported Visitor Fields
    ==================================================*/

    CTM.inputFields = [

        'name',

        'firstName',

        'city',

        'mobile',

        'email'

    ];

    /*==================================================
    Read Input Value
    ==================================================*/

    CTM.readInput = function (element) {

        if (!element) {

            return '';

        }

        return element.value.trim();

    };

    /*==================================================
    Update Visitor State
    ==================================================*/

    CTM.updateVisitorField = function (element) {

        if (!element) {

            return;

        }

        const field = element.dataset.field;

        if (!field) {

            return;

        }

        if (!CTM.inputFields.includes(field)) {

            console.warn('Unknown visitor field:', field);

            return;

        }

        CTM.setVisitor(

            field,

            CTM.readInput(element)

        );

    };

    /*==================================================
    Restore Input Values
    ==================================================*/

    CTM.restoreInputs = function () {

        CTM.inputFields.forEach(function (field) {

            const input = document.querySelector(

                `[data-field="${field}"]`

            );

            if (!input) {

                return;

            }

            input.value = CTM.getVisitor(field);

        });

    };

    /*==================================================
    Email Validation
    ==================================================*/

    CTM.validateEmail = function (value) {

        if (!value) {

            return true;

        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    };

    /*==================================================
    Mobile Validation
    ==================================================*/

    CTM.validateMobile = function (value) {

        if (!value) {

            return true;

        }

        return /^[0-9]{10}$/.test(value);

    };

    /*==================================================
    Validate Input
    ==================================================*/

    CTM.validateInput = function (element) {

        if (!element) {

            return true;

        }

        const field = element.dataset.field;

        const value = CTM.readInput(element);

        element.classList.remove(

            'input-success',

            'input-error'

        );

        let valid = true;

        switch (field) {

            case 'email':

                valid = CTM.validateEmail(value);

                break;

            case 'mobile':

                valid = CTM.validateMobile(value);

                break;

        }

        element.classList.add(

            valid

                ? 'input-success'

                : 'input-error'

        );

        return valid;

    };

    /*==================================================
    Input Event
    ==================================================*/

    CTM.handleInput = function (event) {

        const element = event.target;

        if (!element.matches('[data-field]')) {

            return;

        }

        CTM.updateVisitorField(element);

    };

    /*==================================================
    Blur Event
    ==================================================*/

    CTM.handleBlur = function (event) {

        const element = event.target;

        if (!element.matches('[data-field]')) {

            return;

        }

        CTM.validateInput(element);

        if (typeof CTM.saveState === 'function') {

            CTM.saveState();

        }

    };

    /*==================================================
    Bind Events
    ==================================================*/

    CTM.bindInputs = function () {

        document.addEventListener(

            'input',

            CTM.handleInput

        );

        document.addEventListener(

            'blur',

            CTM.handleBlur,

            true

        );

    };

})();
