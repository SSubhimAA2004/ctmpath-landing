
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 08 — DREAM LIFE™

File:
js/screens/screen08.js

Purpose:
Screen 08 Interaction Logic

Responsibility
• Initialize Screen 08
• Display Visitor Name
• Handle Multi Selection
• Save Dream Choices
• Restore Previous Choices
• Enable Continue
• Navigate to Screen 09

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error(
            'CTM core has not been initialized.'
        );

        return;

    }



    /*
    ==================================================
    Screen Configuration
    ==================================================
    */

    CTM.screen08 = {

        id: 'screen08',

        nextScreen: 'screen09'

    };



    /*
    ==================================================
    Cached DOM
    ==================================================
    */

    const DOM = {

        cards: [],

        nextButton: null,

        visitorName: null

    };



    /*
    ==================================================
    Runtime State
    ==================================================
    */

    const STATE = {

        selectedDreams: []

    };



    /*
    ==================================================
    Initialize Screen
    ==================================================
    */

    CTM.initScreen08 = function () {

        CTM.log(

            'Screen 08 initialized.'

        );

        cacheDOM();

        loadVisitorName();

        restoreSelections();

        updateContinueButton();

        bindEvents();

    };



    /*
    ==================================================
    Cache DOM
    ==================================================
    */

    function cacheDOM() {

        DOM.cards = [

            ...document.querySelectorAll(

                '#screen08 .dream-card'

            )

        ];



        DOM.nextButton =

            document.getElementById(

                'screen08-next'

            );



        DOM.visitorName =

            document.getElementById(

                'visitor-display-name'

            );

    }



    /*
    ==================================================
    Visitor Greeting
    ==================================================
    */

    function loadVisitorName() {

        let visitorName = '';

        if (

            window.CTM_STATE &&

            window.CTM_STATE.visitorName

        ) {

            visitorName =

                window.CTM_STATE.visitorName;

        }

        else {

            visitorName =

                localStorage.getItem(

                    'ctmVisitorName'

                ) || '';

        }



        if (

            DOM.visitorName

        ) {

            DOM.visitorName.textContent =

                visitorName;

        }

    }

     /*
    ==================================================
    Restore Previous Selections
    ==================================================
    */

    function restoreSelections() {

        let savedSelections = [];



        if (

            window.CTM_STATE &&

            Array.isArray(

                window.CTM_STATE.dreamLife

            )

        ) {

            savedSelections =

                window.CTM_STATE.dreamLife;

        }

        else {

            const stored =

                localStorage.getItem(

                    'ctmDreamLife'

                );



            if (stored) {

                try {

                    savedSelections =

                        JSON.parse(

                            stored

                        );

                }

                catch (error) {

                    savedSelections = [];

                }

            }

        }



        STATE.selectedDreams =

            [...savedSelections];



        DOM.cards.forEach(

            function(card){

                const id =

                    card.dataset.id;



                if (

                    STATE.selectedDreams.includes(

                        id

                    )

                ) {

                    card.classList.add(

                        'selected'

                    );

                }

            }

        );

    }



    /*
    ==================================================
    Toggle Dream Selection
    ==================================================
    */

    function toggleDream(card){

        const id =

            card.dataset.id;



        const index =

            STATE.selectedDreams.indexOf(

                id

            );



        if(index >= 0){

            STATE.selectedDreams.splice(

                index,

                1

            );



            card.classList.remove(

                'selected'

            );

        }

        else{

            STATE.selectedDreams.push(

                id

            );



            card.classList.add(

                'selected'

            );



            animateSelection(

                card

            );

        }



        saveDreamSelections();

        updateContinueButton();

    }



    /*
    ==================================================
    Selection Animation
    ==================================================
    */

    function animateSelection(card){

        card.classList.remove(

            'pulse'

        );



        void card.offsetWidth;



        card.classList.add(

            'pulse'

        );

    }



    /*
    ==================================================
    Save Dream Selections
    ==================================================
    */

    function saveDreamSelections(){

        if(

            !window.CTM_STATE

        ){

            window.CTM_STATE = {};

        }



        window.CTM_STATE.dreamLife =

            [

                ...STATE.selectedDreams

            ];



        localStorage.setItem(

            'ctmDreamLife',

            JSON.stringify(

                STATE.selectedDreams

            )

        );

    }



    /*
    ==================================================
    Continue Button State
    ==================================================
    */

    function updateContinueButton(){

        if(

            !DOM.nextButton

        ){

            return;

        }



        DOM.nextButton.disabled =

            STATE.selectedDreams.length === 0;

    }

     /*
    ==================================================
    Screen Click Handler
    ==================================================
    */

    function handleScreenClick(event){

        const dreamCard =

            event.target.closest(

                '#screen08 .dream-card'

            );



        if(dreamCard){

            event.preventDefault();

            toggleDream(

                dreamCard

            );

            return;

        }



        const nextButton =

            event.target.closest(

                '#screen08-next'

            );



        if(!nextButton){

            return;

        }



        event.preventDefault();



        if(

            nextButton.disabled

        ){

            return;

        }



        saveDreamSelections();



        CTM.navigate(

            CTM.screen08.nextScreen

        );



    }



    /*
    ==================================================
    Bind Events

    Safe Dynamic Loading

    ==================================================
    */

    function bindEvents(){

        document.removeEventListener(

            'click',

            handleScreenClick

        );



        document.addEventListener(

            'click',

            handleScreenClick

        );

    }



    /*
    ==================================================
    Unbind Events

    ==================================================
    */

    function unbindEvents(){

        document.removeEventListener(

            'click',

            handleScreenClick

        );

    }



    /*
    ==================================================
    Screen Loaded Hook

    Called by loader.js

    ==================================================
    */

    CTM.afterScreen08Loaded = function(){

        const screen =

            document.getElementById(

                'screen08'

            );



        if(!screen){

            return;

        }



        CTM.initScreen08();

    };



    /*
    ==================================================
    Cleanup

    ==================================================
    */

    CTM.destroyScreen08 = function(){

        unbindEvents();



        DOM.cards = [];

        DOM.nextButton = null;

        DOM.visitorName = null;



        STATE.selectedDreams = [];

    };



    /*
    ==================================================
    Public Refresh

    ==================================================
    */

    CTM.refreshScreen08 = function(){

        cacheDOM();

        restoreSelections();

        updateContinueButton();

    };



    /*
    ==================================================
    Public Validation

    ==================================================
    */

    CTM.validateScreen08 = function(){

        return (

            STATE.selectedDreams.length > 0

        );

    };



    /*
    ==================================================
    Public Save

    ==================================================
    */

    CTM.saveScreen08 = function(){

        saveDreamSelections();

    };



    /*
    ==================================================
    Module Ready

    ==================================================
    */

    CTM.log(

        'Screen 08 module loaded.'

    );



})();
