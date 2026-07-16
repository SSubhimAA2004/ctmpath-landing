
/* ==========================================================================
   CTM PATH™ GUIDED JOURNEY™
   JS-01
   APPLICATION ENGINE
   VERSION 1.0
========================================================================== */

"use strict";

/* ==========================================================================
   01. APPLICATION
========================================================================== */

const APP = {

    version : "1.0",

    currentScene : 1,

    totalScenes : 9,

    isTransitioning : false

};

/* ==========================================================================
   02. ENGINE
========================================================================== */

const ENGINE = {

    initialize(){

        SCENES.initialize();

        EVENTS.initialize();

    }

};

/* ==========================================================================
   03. SCENE MANAGER
========================================================================== */

const SCENES = {

    list : [],

    initialize(){

        this.list = [

            ...document.querySelectorAll(

                ".scene"

            )

        ];

        this.show(

            APP.currentScene

        );

    },

    show(

        sceneNumber

    ){

        this.list.forEach(

            scene =>{

                scene.classList.remove(

                    "active"

                );

            }

        );

        const target = document.getElementById(

            "scene" +

            String(sceneNumber)

            .padStart(

                2,

                "0"

            )

        );

        if(

            target

        ){

            target.classList.add(

                "active"

            );

        }

    },

    next(){

        if(

            APP.isTransitioning

        ){

            return;

        }

        if(

            APP.currentScene >=

            APP.totalScenes

        ){

            return;

        }

        APP.currentScene++;

        this.show(

            APP.currentScene

        );

    },

    previous(){

        if(

            APP.isTransitioning

        ){

            return;

        }

        if(

            APP.currentScene <=1

        ){

            return;

        }

        APP.currentScene--;

        this.show(

            APP.currentScene

        );

    }

};

/* ==========================================================================
   04. TIMELINE
========================================================================== */

const TIMELINE = {

    play(){

    },

    stop(){

    }

};

/* ==========================================================================
   05. COMPONENTS
========================================================================== */

const COMPONENTS = {

};

/* ==========================================================================
   06. EVENT BUS
========================================================================== */

const EVENTS = {

    initialize(){

        document.addEventListener(

            "keydown",

            this.keyboard

        );

    },

    keyboard(

        event

    ){

        switch(

            event.key

        ){

            case "ArrowRight":

                SCENES.next();

                break;

            case "ArrowLeft":

                SCENES.previous();

                break;

        }

    }

};

/* ==========================================================================
   07. UTILITIES
========================================================================== */

const UTIL = {

    delay(

        milliseconds

    ){

        return new Promise(

            resolve =>

            setTimeout(

                resolve,

                milliseconds

            )

        );

    }

};

/* ==========================================================================
   08. APPLICATION START
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        ENGINE.initialize();

    }

);


