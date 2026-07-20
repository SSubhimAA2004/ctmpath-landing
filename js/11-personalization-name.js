
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Name Personalization Engine

Responsibility
• Replace {Name}
• Replace {FirstName}
• Replace {City}
• Refresh Screen Personalization
• Maintain Dynamic Placeholders

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
    Personalization Tokens
    ==================================================*/

    CTM.nameTokens = {

        '{Name}'      : 'name',

        '{FirstName}' : 'firstName',

        '{City}'      : 'city'

    };

    /*==================================================
    Get Token Value
    ==================================================*/

    CTM.getTokenValue = function (token) {

        const field = CTM.nameTokens[token];

        if (!field) {

            return '';

        }

        return CTM.getVisitor(field);

    };

    /*==================================================
    Replace Tokens
    ==================================================*/

    CTM.replaceTokens = function (text) {

        if (!text) {

            return text;

        }

        let output = text;

        Object.keys(CTM.nameTokens).forEach(function (token) {

            const value = CTM.getTokenValue(token);

            output = output.replaceAll(

                token,

                value || ''

            );

        });

        return output;

    };

    /*==================================================
    Personalize Element
    ==================================================*/

    CTM.personalizeElement = function (element) {

        if (!element) {

            return;

        }

        if (!element.dataset.template) {

            element.dataset.template = element.innerHTML;

        }

        element.innerHTML = CTM.replaceTokens(

            element.dataset.template

        );

    };

    /*==================================================
    Personalize Screen
    ==================================================*/

    CTM.personalizeScreen = function () {

        document

            .querySelectorAll('[data-personalize]')

            .forEach(function (element) {

                CTM.personalizeElement(element);

            });

    };

    /*==================================================
    Refresh
    ==================================================*/

    CTM.refreshPersonalization = function () {

        CTM.personalizeScreen();

    };

    /*==================================================
    Visitor Name Changed
    ==================================================*/

    CTM.updatePersonalization = function () {

        CTM.refreshPersonalization();

        if (typeof CTM.saveState === 'function') {

            CTM.saveState();

        }

    };

})();
