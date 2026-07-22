
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 09 — YOUR CHOICE™

File:
js/screens/screen09.js

Purpose:
Screen 09 Interaction Logic

Responsibility
• Initialize Screen 09
• Display Visitor Name
• Display Selected Dream Icons
• Personalize Conversation
• Continue to Screen 10

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

    CTM.screen09 = {

        id: 'screen09',

        nextScreen: 'screen10'

    };



    /*
    ==================================================
    Cached DOM
    ==================================================
    */

    const DOM = {

        visitorName : null,

        dreamIcons : null,

        nextButton : null

    };



    /*
    ==================================================
    Dream Icon Map
    ==================================================
    */

    const DREAM_ICONS = {

        home : '🏡',

        family : '👨‍👩‍👧',

        education : '🎓',

        travel : '✈️',

        health : '❤️',

        peace : '😊',

        "financial-freedom" : '💰',

        business : '🚀',

        time : '⏰',

        passion : '🎨',

        service : '🤝',

        freedom : '🌍'

    };



    /*
    ==================================================
    Initialize Screen
    ==================================================
    */

    CTM.initScreen09 = function(){

        CTM.log(

            'Screen 09 initialized.'

        );

        cacheDOM();

        loadVisitorName();

        renderDreamIcons();

        bindEvents();

    };



    /*
    ==================================================
    Cache DOM
    ==================================================
    */

    function cacheDOM(){

        DOM.visitorName =

            document.getElementById(

                'visitor-display-name'

            );



        DOM.dreamIcons =

            document.getElementById(

                'dream-icons'

            );



        DOM.nextButton =

            document.getElementById(

                'screen09-next'

            );

    }



    /*
    ==================================================
    Visitor Greeting
    ==================================================
    */

    function loadVisitorName(){

        let visitorName = '';



        if(

            window.CTM_STATE &&

            window.CTM_STATE.visitorName

        ){

            visitorName =

                window.CTM_STATE.visitorName;

        }

        else{

            visitorName =

                localStorage.getItem(

                    'ctmVisitorName'

                ) || '';

        }



        if(

            DOM.visitorName

        ){

            DOM.visitorName.textContent =

                visitorName;

        }

    }



    /*
    ==================================================
    Render Dream Icons
    ==================================================
    */

    function renderDreamIcons(){

        if(

            !DOM.dreamIcons

        ){

            return;

        }

        DOM.dreamIcons.innerHTML = '';



        let dreams = [];



        if(

            window.CTM_STATE &&

            Array.isArray(

                window.CTM_STATE.dreamLife

            )

        ){

            dreams =

                window.CTM_STATE.dreamLife;

        }

        else{

            const stored =

                localStorage.getItem(

                    'ctmDreamLife'

                );

            if(stored){

                try{

                    dreams =

                        JSON.parse(

                            stored

                        );

                }

                catch(error){

                    dreams = [];

                }

            }

        }



        dreams

            .slice(0,4)

            .forEach(

                function(id){

                    const icon =

                        document.createElement(

                            'span'

                        );

                    icon.textContent =

                        DREAM_ICONS[id] || '✨';

                    DOM.dreamIcons.appendChild(

                        icon

                    );

                }

            );

    }

     /*
    ==================================================
    Continue Journey

    SCREEN 09 → SCREEN 10

    ==================================================
    */

    function continueJourney(){

        CTM.navigate(

            CTM.screen09.nextScreen

        );

    }



    /*
    ==================================================
    Screen Click Handler

    ==================================================
    */

    function handleScreenClick(event){

        const nextButton =

            event.target.closest(

                '#screen09-next'

            );



        if(

            !nextButton

        ){

            return;

        }



        event.preventDefault();



        continueJourney();

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

    Called after HTML Injection

    ==================================================
    */

    CTM.afterScreen09Loaded = function(){

        if(

            document.getElementById(

                'screen09'

            )

        ){

            CTM.initScreen09();

        }

    };



    /*
    ==================================================
    Refresh Screen

    ==================================================
    */

    CTM.refreshScreen09 = function(){

        cacheDOM();

        loadVisitorName();

        renderDreamIcons();

    };



    /*
    ==================================================
    Validation

    ==================================================
    */

    CTM.validateScreen09 = function(){

        return true;

    };



    /*
    ==================================================
    Cleanup

    ==================================================
    */

    CTM.destroyScreen09 = function(){

        unbindEvents();

        DOM.visitorName = null;

        DOM.dreamIcons = null;

        DOM.nextButton = null;

    };



    /*
    ==================================================
    Module Ready

    ==================================================
    */

    CTM.log(

        'Screen 09 module loaded.'

    );



})();
