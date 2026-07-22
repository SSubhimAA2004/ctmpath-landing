
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 09 — YOUR CHOICE™

File:
js/screens/screen09.js

Purpose
Dynamic Personalisation

Responsibilities

• Initialise Screen
• Render Visitor Name
• Render Dream Orbit
• Sequential Dream Animation
• Navigate to Screen 10

======================================================================
*/

"use strict";

(() => {

    const CTM = window.CTM;

    if (!CTM) return;



    /*==================================================
    Screen Configuration
    ==================================================*/

    CTM.screen09 = {

        id: "screen09",

        nextScreen: "screen10"

    };



    /*==================================================
    Cached DOM
    ==================================================*/

    const DOM = {

        orbit: null,

        next: null,

        visitorNames: []

    };



    /*==================================================
    Dream Icons
    ==================================================*/

    const DREAM_ICONS = {

        home: "🏡",

        family: "👨‍👩‍👧",

        education: "🎓",

        travel: "✈️",

        health: "❤️",

        peace: "😊",

        "financial-freedom": "💰",

        business: "🚀",

        time: "⏰",

        passion: "🎨",

        service: "🤝",

        freedom: "🌍"

    };



    /*==================================================
    Initialise
    ==================================================*/

    CTM.initScreen09 = function () {

        cacheDOM();

        renderVisitorName();

        renderDreamOrbit();

        bindEvents();

    };



    /*==================================================
    Cache DOM
    ==================================================*/

    function cacheDOM() {

        DOM.orbit =

            document.getElementById(

                "dream-orbit"

            );



        DOM.next =

            document.getElementById(

                "screen09-next"

            );



        DOM.visitorNames = [

            ...document.querySelectorAll(

                "#screen09 .visitor-name"

            )

        ];

    }



    /*==================================================
    Render Visitor Name

    One source of truth

    ==================================================*/

    function renderVisitorName() {

        const name =

            window.CTM_STATE?.visitorName ||

            localStorage.getItem(

                "ctmVisitorName"

            ) ||

            "";



        DOM.visitorNames.forEach(

            element => {

                element.textContent = name;

            }

        );

    }



    /*==================================================
    Get Dreams

    Preserve selection order

    ==================================================*/

    function getDreams() {

        if (

            Array.isArray(

                window.CTM_STATE?.dreamLife

            )

        ) {

            return [

                ...window.CTM_STATE.dreamLife

            ];

        }



        try {

            return JSON.parse(

                localStorage.getItem(

                    "ctmDreamLife"

                )

            ) || [];

        }

        catch {

            return [];

        }

    }

    /*==================================================
    Render Dream Orbit

    Preserves Selection Order

    ==================================================*/

    function renderDreamOrbit() {

        if (!DOM.orbit) return;

        DOM.orbit.innerHTML = "";



        const dreams = getDreams();



        if (dreams.length === 0) {

            return;

        }



        /*
        Orbit Geometry
        */

        const orbitSize =

            DOM.orbit.offsetWidth || 360;

        const center = orbitSize / 2;

        const radius = orbitSize * 0.36;



        dreams.forEach((dreamId, index) => {

            const angle =

                (-90 + (360 / dreams.length) * index)

                * Math.PI / 180;



            const x =

                center +

                Math.cos(angle) * radius;



            const y =

                center +

                Math.sin(angle) * radius;



            const node =

                document.createElement("div");



            node.className =

                "dream-node";



            node.dataset.dream =

                dreamId;



            node.innerHTML =

                DREAM_ICONS[dreamId] || "✨";



            node.style.left =

                `${x - 32}px`;



            node.style.top =

                `${y - 32}px`;



            /*
            Floating animation offset
            */

            node.style.animationDelay =

                `${index * 0.35}s`;



            DOM.orbit.appendChild(

                node

            );

        });



        startSequentialPulse();

    }



    /*==================================================
    Sequential Pulse

    Draws attention to the
    visitor's own dreams

    ==================================================*/

    function startSequentialPulse() {

        const nodes =

            DOM.orbit.querySelectorAll(

                ".dream-node"

            );



        if (!nodes.length) {

            return;

        }



        let index = 0;



        function pulseNext() {

            nodes.forEach(node =>

                node.classList.remove(

                    "pulse"

                )

            );



            nodes[index]

                .classList.add(

                    "pulse"

                );



            index++;



            if (

                index >= nodes.length

            ) {

                index = 0;

            }

        }



        pulseNext();



        window.clearInterval(

            CTM.screen09PulseTimer

        );



        CTM.screen09PulseTimer =

            window.setInterval(

                pulseNext,

                900

            );

    }



    /*==================================================
    Continue Journey

    ==================================================*/

    function continueJourney() {

        window.clearInterval(

            CTM.screen09PulseTimer

        );



        CTM.navigate(

            CTM.screen09.nextScreen

        );

    }

     /*==================================================
    Click Handler

    ==================================================*/

    function handleClick(event) {

        const nextButton =

            event.target.closest(

                "#screen09-next"

            );



        if (!nextButton) {

            return;

        }



        event.preventDefault();



        continueJourney();

    }



    /*==================================================
    Bind Events

    ==================================================*/

    function bindEvents() {

        document.removeEventListener(

            "click",

            handleClick

        );



        document.addEventListener(

            "click",

            handleClick

        );

    }



    /*==================================================
    Unbind Events

    ==================================================*/

    function unbindEvents() {

        document.removeEventListener(

            "click",

            handleClick

        );

    }



    /*==================================================
    Refresh Screen

    Called whenever Screen 09
    becomes active again

    ==================================================*/

    CTM.refreshScreen09 = function () {

        cacheDOM();

        renderVisitorName();

        renderDreamOrbit();

    };



    /*==================================================
    Screen Loaded Hook

    Called by Screen Loader

    ==================================================*/

    CTM.afterScreen09Loaded = function () {

        const screen =

            document.getElementById(

                "screen09"

            );



        if (!screen) {

            return;

        }



        CTM.initScreen09();

    };



    /*==================================================
    Validation

    ==================================================*/

    CTM.validateScreen09 = function () {

        return true;

    };



    /*==================================================
    Cleanup

    ==================================================*/

    CTM.destroyScreen09 = function () {

        unbindEvents();



        window.clearInterval(

            CTM.screen09PulseTimer

        );



        DOM.orbit = null;

        DOM.next = null;

        DOM.visitorNames = [];

    };



    /*==================================================
    Module Ready

    ==================================================*/

    CTM.log(

        "Screen 09 module loaded."

    );

})();
