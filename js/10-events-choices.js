
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Choice Event Manager

Responsibility
• Single Choice Selection
• Multiple Choice Selection
• Rating Selection
• Response State Synchronization
• Choice Restoration
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
    Ensure Responses Object
    ==================================================*/

    CTM.state.responses = CTM.state.responses || {};

    /*==================================================
    Save Response
    ==================================================*/

    CTM.setResponse = function (questionId, value) {

        if (!questionId) {

            return;

        }

        CTM.state.responses[questionId] = value;

    };

    /*==================================================
    Get Response
    ==================================================*/

    CTM.getResponse = function (questionId) {

        return CTM.state.responses[questionId];

    };

    /*==================================================
    Single Choice
    ==================================================*/

    CTM.selectChoice = function (choice) {

        if (!choice) {

            return;

        }

        const questionId = choice.dataset.question;

        const value = choice.dataset.value;

        if (!questionId) {

            return;

        }

        document
            .querySelectorAll(
                `[data-question="${questionId}"]`
            )
            .forEach(function (item) {

                item.classList.remove('selected');

            });

        choice.classList.add('selected');

        CTM.setResponse(

            questionId,

            value

        );

        if (typeof CTM.saveState === 'function') {

            CTM.saveState();

        }

    };

    /*==================================================
    Multiple Choice
    ==================================================*/

    CTM.toggleChoice = function (choice) {

        if (!choice) {

            return;

        }

        const questionId = choice.dataset.question;

        const value = choice.dataset.value;

        if (!questionId) {

            return;

        }

        let values = CTM.getResponse(questionId);

        if (!Array.isArray(values)) {

            values = [];

        }

        const index = values.indexOf(value);

        if (index >= 0) {

            values.splice(index, 1);

            choice.classList.remove('selected');

        }

        else {

            values.push(value);

            choice.classList.add('selected');

        }

        CTM.setResponse(

            questionId,

            values

        );

        if (typeof CTM.saveState === 'function') {

            CTM.saveState();

        }

    };

    /*==================================================
    Rating Choice
    ==================================================*/

    CTM.selectRating = function (choice) {

        CTM.selectChoice(choice);

    };

    /*==================================================
    Restore Choices
    ==================================================*/

    CTM.restoreChoices = function () {

        document

            .querySelectorAll('[data-question]')

            .forEach(function (choice) {

                const questionId =

                    choice.dataset.question;

                const value =

                    choice.dataset.value;

                const mode =

                    choice.dataset.mode || 'single';

                const response =

                    CTM.getResponse(questionId);

                choice.classList.remove('selected');

                if (

                    mode === 'multiple' &&

                    Array.isArray(response) &&

                    response.includes(value)

                ) {

                    choice.classList.add('selected');

                }

                if (

                    mode !== 'multiple' &&

                    response === value

                ) {

                    choice.classList.add('selected');

                }

            });

    };

    /*==================================================
    Click Handler
    ==================================================*/

    CTM.handleChoice = function (event) {

        const choice = event.target.closest('.choice');

        if (!choice) {

            return;

        }

        event.preventDefault();

        const mode =

            choice.dataset.mode || 'single';

        switch (mode) {

            case 'multiple':

                CTM.toggleChoice(choice);

                break;

            case 'rating':

                CTM.selectRating(choice);

                break;

            default:

                CTM.selectChoice(choice);

                break;

        }

    };

    /*==================================================
    Keyboard Support
    ==================================================*/

    CTM.handleChoiceKeyboard = function (event) {

        if (

            event.key !== 'Enter' &&

            event.key !== ' '

        ) {

            return;

        }

        const choice = event.target.closest('.choice');

        if (!choice) {

            return;

        }

        event.preventDefault();

        choice.click();

    };

    /*==================================================
    Bind Events
    ==================================================*/

    CTM.bindChoices = function () {

        document.addEventListener(

            'click',

            CTM.handleChoice

        );

        document.addEventListener(

            'keydown',

            CTM.handleChoiceKeyboard

        );

    };

})();
