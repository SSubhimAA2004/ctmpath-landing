
/*
======================================================================

CTM PATH™ Guided Journey v6.0

File
js/screens/screen03.js

Screen
03 — THE DISCOVERY™

Purpose
Screen interaction controller

Responsibilities
• Screen initialization
• Entrance animation
• Continue navigation
• Journey progression

======================================================================
*/


'use strict';



(() => {



const CTM = window.CTM;



if(!CTM){


    console.error(

        "CTM core has not been initialized."

    );


    return;


}









/*==================================================
Screen 03 Initializer

Called automatically by loader.js

CTM.initScreen03()

==================================================*/


CTM.initScreen03 = function(){



    const screen = document.getElementById(

        "screen03"

    );



    if(!screen){


        return;


    }







    activateEntrance();



    bindContinueButton();



};












/*==================================================
Entrance Animation

==================================================*/


function activateEntrance(){



    const elements = [



        ".screen03-symbol",



        ".screen03-tamil",



        ".screen03-english",



        ".gold-divider",



        ".journey-next"



    ];







    elements.forEach(function(selector,index){



        const element = document.querySelector(

            "#screen03 " + selector

        );







        if(element){



            element.style.opacity = "0";



            element.style.transform =

                "translateY(30px)";









            setTimeout(function(){



                element.style.transition =

                    "all .8s cubic-bezier(.22,1,.36,1)";



                element.style.opacity = "1";



                element.style.transform =

                    "translateY(0)";



            }, index * 180);



        }



    });



}















/*==================================================
Journey Continuation

SCREEN 03 → SCREEN 04

==================================================*/


function bindContinueButton(){



    const button = document.getElementById(

        "screen03Continue"

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

Uses CTM Router

==================================================*/


function navigateToNextScreen(){



    if(



        typeof CTM.navigate === "function"



    ){



        CTM.navigate(



            "screen04"



        );



        return;



    }







    console.warn(



        "CTM router unavailable."



    );



}














})();
