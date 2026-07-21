
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Name Personalization Engine

Responsibility
• Capture Visitor Details
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
    Get Visitor
    ==================================================*/

    CTM.getVisitor = CTM.getVisitor || function(field){

        const visitor = CTM.state?.visitor || {};

        return visitor[field] || '';

    };

    /*==================================================
    Set Visitor
    ==================================================*/

    CTM.setVisitor = CTM.setVisitor || function(field,value){

        CTM.state = CTM.state || {};

        CTM.state.visitor = CTM.state.visitor || {};

        CTM.state.visitor[field] = value;

    };

    /*==================================================
    Capture Name
    ==================================================*/

    CTM.captureVisitorName = function(){

        const input = document.getElementById('firstName');

        if(!input){

            return;

        }

        const value = input.value.trim();

        if(!value){

            return;

        }

        CTM.setVisitor('firstName',value);

        CTM.setVisitor('name',value);

        if(typeof CTM.saveState === 'function'){

            CTM.saveState();

        }

    };

    /*==================================================
    Get Token Value
    ==================================================*/

    CTM.getTokenValue = function(token){

        const field = CTM.nameTokens[token];

        if(!field){

            return '';

        }

        return CTM.getVisitor(field);

    };

    /*==================================================
    Replace Tokens
    ==================================================*/

    CTM.replaceTokens = function(text){

        if(!text){

            return text;

        }

        let output = text;

        Object.keys(CTM.nameTokens).forEach(function(token){

            output = output.replaceAll(

                token,

                CTM.getTokenValue(token)

            );

        });

        return output;

    };

    /*==================================================
    Personalize Element
    ==================================================*/

    CTM.personalizeElement = function(element){

        if(!element){

            return;

        }

        if(!element.dataset.template){

            element.dataset.template = element.innerHTML;

        }

        element.innerHTML = CTM.replaceTokens(

            element.dataset.template

        );

    };

    /*==================================================
    Personalize Screen
    ==================================================*/

    CTM.personalizeScreen = function(){

        document

            .querySelectorAll('[data-personalize]')

            .forEach(function(element){

                CTM.personalizeElement(element);

            });

    };

    /*==================================================
    Refresh
    ==================================================*/

    CTM.refreshPersonalization = function(){

        CTM.personalizeScreen();

    };

    /*==================================================
    Update
    ==================================================*/

    CTM.updatePersonalization = function(){

        CTM.captureVisitorName();

        CTM.refreshPersonalization();

    };

    /*==================================================
    Auto Bind
    ==================================================*/

    document.addEventListener(

        'input',

        function(event){

            if(event.target.id === 'firstName'){

                CTM.captureVisitorName();

            }

        }

    );

})();
