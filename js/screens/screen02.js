
/*
======================================================================

CTM PATH™ Guided Journey v6.0

File
js/screens/screen02.js

Screen
02 — THE GIFT™

Purpose
Screen interaction controller

Responsibilities
• Screen initialization
• Entrance animation
• Continue navigation
• Journey progression

======================================================================
*/


(function(){


"use strict";





/*==================================================
Screen 02 Initializer
==================================================*/


function initScreen02(){



    const screen = document.getElementById(
        "screen02"
    );



    if(!screen){

        return;

    }





    activateEntrance();



    bindContinueButton();



}








/*==================================================
Entrance Animation

==================================================*/


function activateEntrance(){



    const elements = [


        ".moment-label",


        ".screen02-symbol",


        ".screen02-tamil",


        ".screen02-english",


        ".gold-divider",


        ".btn-primary"


    ];





    elements.forEach(function(selector,index){



        const element = document.querySelector(
            "#screen02 " + selector
        );



        if(element){



            element.style.opacity = "0";



            element.style.transform =
                "translateY(30px)";



            setTimeout(function(){



                element.style.transition =
                    "all .8s cubic-bezier(.22,1,.36,1)";



                element.style.opacity =
                    "1";



                element.style.transform =
                    "translateY(0)";



            }, index * 180);



        }



    });



}








/*==================================================
Continue Button

SCREEN 02 → SCREEN 03

==================================================*/


function bindContinueButton(){



    const button = document.getElementById(
        "screen02Continue"
    );



    if(!button){

        return;

    }





    button.addEventListener(
        "click",
        function(){



            navigateToNextScreen();



        }
    );



}








/*==================================================
Navigation Handler

Uses existing CTM PATH router

==================================================*/


function navigateToNextScreen(){



    /*

    Preferred:

    Existing router system

    */



    if(
        typeof window.navigateToScreen === "function"
    ){



        window.navigateToScreen(
            "screen03"
        );



        return;



    }






    /*

    Fallback:

    Hash navigation

    */



    window.location.hash =
        "#screen03";



}








/*==================================================
Auto Start

==================================================*/


document.addEventListener(

    "DOMContentLoaded",

    initScreen02

);





})();
