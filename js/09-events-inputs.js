
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
    Resolve Field Name
    ==================================================*/

    CTM.resolveField = function (element) {

        if (!element) {

            return '';

        }

        return (

            element.dataset.field ||

            element.name ||

            element.id ||

            ''

        ).trim();

    };

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

        const field = CTM.resolveField(element);

        if (!field) {

            return;

        }

        if (!CTM.inputFields.includes(field)) {

            console.warn(

                'Unknown visitor field:',

                field

            );

            return;

        }

        const value = CTM.readInput(element);

        CTM.setVisitor(

            field,

            value

        );

        /*----------------------------------------------
        Keep Name & First Name in Sync
        ----------------------------------------------*/

        if (field === 'firstName') {

            CTM.setVisitor(

                'name',

                value

            );

        }

        if (field === 'name') {

            CTM.setVisitor(

                'firstName',

                value

            );

        }

        if (

            typeof CTM.updatePersonalization ===

            'function'

        ) {

            CTM.updatePersonalization();

        }

    };

    /*==================================================
    Restore Input Values
    ==================================================*/

    CTM.restoreInputs = function () {

        CTM.inputFields.forEach(function (field) {

            const input =

                document.querySelector(

                    `[data-field="${field}"]`

                ) ||

                document.getElementById(field) ||

                document.querySelector(

                    `[name="${field}"]`

                );

            if (!input) {

                return;

            }

            input.value =

                CTM.getVisitor(field) || '';

        });

    };

    /*==================================================
    Email Validation
    ==================================================*/

    CTM.validateEmail = function (value) {

        if (!value) {

            return true;

        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(

            value

        );

    };

    /*==================================================
    Mobile Validation
    ==================================================*/

    CTM.validateMobile = function (value) {

        if (!value) {

            return true;

        }

        return /^[0-9]{10}$/.test(

            value

        );

    };

    /*==================================================
    Validate Input
    ==================================================*/

    CTM.validateInput = function (element) {

        if (!element) {

            return true;

        }

        const field = CTM.resolveField(element);

        const value = CTM.readInput(element);

        element.classList.remove(

            'input-success',

            'input-error'

        );

        let valid = true;

        switch (field) {

            case 'email':

                valid =

                    CTM.validateEmail(value);

                break;

            case 'mobile':

                valid =

                    CTM.validateMobile(value);

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

        if (

            !element.matches(

                'input, textarea, select'

            )

        ) {

            return;

        }

        const field =

            CTM.resolveField(element);

        if (!field) {

            return;

        }

        CTM.updateVisitorField(element);

    };

    /*==================================================
    Blur Event
    ==================================================*/

    CTM.handleBlur = function (event) {

        const element = event.target;

        if (

            !element.matches(

                'input, textarea, select'

            )

        ) {

            return;

        }

        const field =

            CTM.resolveField(element);

        if (!field) {

            return;

        }

        CTM.validateInput(element);

        if (

            typeof CTM.saveState ===

            'function'

        ) {

            CTM.saveState();

        }

    };

    /*==================================================
    Bind Events
    ==================================================*/

    CTM.bindInputs = function () {

        document.removeEventListener(

            'input',

            CTM.handleInput

        );

        document.removeEventListener(

            'blur',

            CTM.handleBlur,

            true

        );

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

    /*==================================================
    Initialize
    ==================================================*/

    CTM.bindInputs();

})();
