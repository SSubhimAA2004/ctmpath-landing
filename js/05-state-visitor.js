
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Visitor State

Responsibility
• Store visitor profile
• Update visitor information
• Retrieve visitor information

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
    Ensure Visitor Object Exists
    ==================================================*/

    CTM.state.visitor = CTM.state.visitor || {

        id: '',

        name: '',

        firstName: '',

        city: '',

        mobile: '',

        email: ''

    };

    /*==================================================
    Set Visitor Field
    ==================================================*/

    CTM.setVisitor = function (field, value) {

        if (!(field in CTM.state.visitor)) {
            console.warn(`Unknown visitor field: ${field}`);
            return;
        }

        CTM.state.visitor[field] = String(value).trim();

    };

    /*==================================================
    Get Visitor Field
    ==================================================*/

    CTM.getVisitor = function (field) {

        return CTM.state.visitor[field] || '';

    };

    /*==================================================
    Get Complete Visitor
    ==================================================*/

    CTM.getVisitorData = function () {

        return { ...CTM.state.visitor };

    };

    /*==================================================
    Reset Visitor
    ==================================================*/

    CTM.resetVisitor = function () {

        CTM.state.visitor = {

            id: '',

            name: '',

            firstName: '',

            city: '',

            mobile: '',

            email: ''

        };

    };

})();
