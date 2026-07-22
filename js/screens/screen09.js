
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 09 — YOUR CHOICE™

File:
js/screens/screen09.js

Purpose
Dynamic Life Visualisation

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) return;



    /*==================================================
    Screen Configuration
    ==================================================*/

    CTM.screen09 = {

        id: 'screen09',

        nextScreen: 'screen10'

    };



    /*==================================================
    Cached DOM
    ==================================================*/

    const DOM = {

        visitorName : null,

        visitorNameTa : null,

        visitorNameEn : null,

        dreamOrbit : null,

        nextButton : null

    };



    /*==================================================
    Dream Icon Map
    ==================================================*/

    const DREAMS = {

        home                 : "🏡",

        family               : "👨‍👩‍👧",

        education            : "🎓",

        travel               : "✈️",

        health               : "❤️",

        peace                : "😊",

        "financial-freedom"  : "💰",

        business             : "🚀",

        time                 : "⏰",

        passion              : "🎨",

        service              : "🤝",

        freedom              : "🌍"

    };



    /*==================================================
    Initialise
    ==================================================*/

    CTM.initScreen09 = function(){

        cacheDOM();

        loadVisitorName();

        buildDreamOrbit();

        bindEvents();

    };



    /*==================================================
    Cache DOM
    ==================================================*/

    function cacheDOM(){

        DOM.visitorName =

            document.getElementById(

                'visitor-name'

            );



        DOM.visitorNameTa =

            document.getElementById(

                'visitor-name-ta'

            );



        DOM.visitorNameEn =

            document.getElementById(

                'visitor-name-en'

            );



        DOM.dreamOrbit =

            document.getElementById(

                'dream-orbit'

            );



        DOM.nextButton =

            document.getElementById(

                'screen09-next'

            );

    }



    /*==================================================
    Visitor Name
    ==================================================*/

    function loadVisitorName(){

        let name = '';



        if(

            window.CTM_STATE &&

            window.CTM_STATE.visitorName

        ){

            name =

                window.CTM_STATE.visitorName;

        }

        else{

            name =

                localStorage.getItem(

                    'ctmVisitorName'

                ) || '';

        }



        if(DOM.visitorName){

            DOM.visitorName.textContent =

                name;

        }



        if(DOM.visitorNameTa){

            DOM.visitorNameTa.textContent =

                name + "...";

        }



        if(DOM.visitorNameEn){

            DOM.visitorNameEn.textContent =

                name + "...";

        }

    }



    /*==================================================
    Build Dream Orbit
    ==================================================*/

    function buildDreamOrbit(){

        if(!DOM.dreamOrbit){

            return;

        }



        DOM.dreamOrbit.innerHTML = '';



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

                catch(e){

                    dreams = [];

                }

            }

        }

        /*==============================================
        Build Orbit Nodes
        ==============================================*/

        const total = dreams.length;

        if(total === 0){

            return;

        }



        const radius = 128;

        const center = 170;



        dreams.forEach(function(id,index){

            const angle =

                (

                    (Math.PI * 2)

                    / total

                ) * index

                -

                (Math.PI / 2);



            const x =

                center +

                Math.cos(angle)

                * radius;



            const y =

                center +

                Math.sin(angle)

                * radius;



            const node =

                document.createElement(

                    "div"

                );



            node.className =

                "dream-node";



            node.textContent =

                DREAMS[id] || "✨";



            node.style.left =

                (x - 31) + "px";



            node.style.top =

                (y - 31) + "px";



            node.style.animationDelay =

                (index * .25) + "s";



            DOM.dreamOrbit.appendChild(

                node

            );

        });

    }



    /*==============================================
    Continue Journey
    ==============================================*/

    function continueJourney(){

        CTM.navigate(

            CTM.screen09.nextScreen

        );

    }



    /*==============================================
    Click Handler
    ==============================================*/

    function handleClick(event){

        const next =

            event.target.closest(

                "#screen09-next"

            );



        if(!next){

            return;

        }



        event.preventDefault();



        continueJourney();

    }



    /*==============================================
    Event Binding
    ==============================================*/

    function bindEvents(){

        document.removeEventListener(

            "click",

            handleClick

        );



        document.addEventListener(

            "click",

            handleClick

        );

    }



    function unbindEvents(){

        document.removeEventListener(

            "click",

            handleClick

        );

    }



    /*==============================================
    Screen Loaded Hook
    ==============================================*/

    CTM.afterScreen09Loaded = function(){

        if(

            document.getElementById(

                "screen09"

            )

        ){

            CTM.initScreen09();

        }

    };



    /*==============================================
    Refresh
    ==============================================*/

    CTM.refreshScreen09 = function(){

        cacheDOM();

        loadVisitorName();

        buildDreamOrbit();

    };



    /*==============================================
    Cleanup
    ==============================================*/

    CTM.destroyScreen09 = function(){

        unbindEvents();



        DOM.visitorName = null;

        DOM.visitorNameTa = null;

        DOM.visitorNameEn = null;

        DOM.dreamOrbit = null;

        DOM.nextButton = null;

    };



    /*==============================================
    Validation
    ==============================================*/

    CTM.validateScreen09 = function(){

        return true;

    };



    /*==============================================
    Module Ready
    ==============================================*/

    CTM.log(

        "Screen 09 module loaded."

    );



})();
