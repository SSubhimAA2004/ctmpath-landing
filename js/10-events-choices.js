
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

    CTM.setResponse = function (

        questionId,

        value

    ) {

        if (!questionId) {

            return;

        }

        CTM.state.responses[questionId] = value;

    };

    /*==================================================
    Get Response
    ==================================================*/

    CTM.getResponse = function (

        questionId

    ) {

        return CTM.state.responses[questionId];

    };

    /*==================================================
    Clear Response
    ==================================================*/

    CTM.clearResponse = function (

        questionId

    ) {

        if (!questionId) {

            return;

        }

        delete CTM.state.responses[questionId];

    };

    /*==================================================
    Resolve Choice Group
    Supports both:
    • data-question
    • data-choice-group
    ==================================================*/

    CTM.getChoiceGroup = function (

        choice

    ) {

        if (!choice) {

            return null;

        }

        return (

            choice.dataset.choiceGroup ||

            choice.dataset.question ||

            null

        );

    };

    /*==================================================
    Resolve Selection Mode
    Supports:
    • data-mode="multiple"
    • data-multiple="true"
    ==================================================*/

    CTM.getChoiceMode = function (

        choice

    ) {

        if (!choice) {

            return 'single';

        }

        if (

            choice.dataset.multiple === 'true'

        ) {

            return 'multiple';

        }

        if (

            choice.closest(

                '[data-multiple="true"]'

            )

        ) {

            return 'multiple';

        }

        if (

            choice.dataset.mode

        ) {

            return choice.dataset.mode;

        }

        return 'single';

    };

    /*==================================================
    Get Group Choices
    ==================================================*/

    CTM.getGroupChoices = function (

        group

    ) {

        if (!group) {

            return [];

        }

        return document.querySelectorAll(

            `[data-question="${group}"],

             [data-choice-group="${group}"]`

        );

    };


     /*==================================================
    Single Choice
    ==================================================*/

    CTM.selectChoice = function (

        choice

    ) {

        if (!choice) {

            return;

        }

        const group =

            CTM.getChoiceGroup(choice);

        const value =

            choice.dataset.value;

        if (!group) {

            return;

        }

        CTM.getGroupChoices(group)

            .forEach(function (item) {

                item.classList.remove(

                    'selected'

                );

            });

        choice.classList.add(

            'selected'

        );

        CTM.setResponse(

            group,

            value

        );

        if (

            typeof CTM.saveState ===

            'function'

        ) {

            CTM.saveState();

        }

    };

    /*==================================================
    Multiple Choice
    ==================================================*/

    CTM.toggleChoice = function (

        choice

    ) {

        if (!choice) {

            return;

        }

        const group =

            CTM.getChoiceGroup(choice);

        const value =

            choice.dataset.value;

        if (!group) {

            return;

        }

        let values =

            CTM.getResponse(group);

        if (

            !Array.isArray(values)

        ) {

            values = [];

        }

        const index =

            values.indexOf(value);

        if (

            index >= 0

        ) {

            values.splice(

                index,

                1

            );

            choice.classList.remove(

                'selected'

            );

        }

        else {

            values.push(value);

            choice.classList.add(

                'selected'

            );

        }

        CTM.setResponse(

            group,

            values

        );

        if (

            typeof CTM.saveState ===

            'function'

        ) {

            CTM.saveState();

        }

    };

    /*==================================================
    Rating Choice
    ==================================================*/

    CTM.selectRating = function (

        choice

    ) {

        CTM.selectChoice(

            choice

        );

    };

     /*==================================================
    Restore Choices
    ==================================================*/

    CTM.restoreChoices = function () {

        document

            .querySelectorAll('.choice')

            .forEach(function (choice) {

                const group =

                    CTM.getChoiceGroup(choice);

                if (!group) {

                    return;

                }

                const value =

                    choice.dataset.value;

                const mode =

                    CTM.getChoiceMode(choice);

                const response =

                    CTM.getResponse(group);

                choice.classList.remove(

                    'selected'

                );

                if (

                    mode === 'multiple'

                ) {

                    if (

                        Array.isArray(response) &&

                        response.includes(value)

                    ) {

                        choice.classList.add(

                            'selected'

                        );

                    }

                }

                else {

                    if (

                        response === value

                    ) {

                        choice.classList.add(

                            'selected'

                        );

                    }

                }

            });

    };

    /*==================================================
    Click Handler
    ==================================================*/

    CTM.handleChoice = function (event) {

        const choice =

            event.target.closest('.choice');

        if (!choice) {

            return;

        }

        event.preventDefault();

        const mode =

            CTM.getChoiceMode(choice);

        switch (mode) {

            case 'multiple':

                CTM.toggleChoice(

                    choice

                );

                break;

            case 'rating':

                CTM.selectRating(

                    choice

                );

                break;

            default:

                CTM.selectChoice(

                    choice

                );

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

        const choice =

            event.target.closest('.choice');

        if (!choice) {

            return;

        }

        event.preventDefault();

        CTM.handleChoice({

            target: choice,

            preventDefault() {}

        });

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

