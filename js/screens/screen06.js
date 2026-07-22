
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 06 — YOUR JOURNEY™

File:
screen06.js

Purpose:
Screen 06 Interaction Logic

Responsibilities:
• Screen initialization
• Navigator interaction
• Journey progression
• Preserve visitor identity

======================================================================
*/


/*==================================================
Screen 06 Initialisation
==================================================*/


function initScreen06() {


    console.log(
        "CTM PATH™ Screen 06 — Your Journey Initialised"
    );



    setupScreen06Navigation();


}





/*==================================================
Screen 06 Navigation
==================================================*/


function setupScreen06Navigation() {


    const journeyButton = document.querySelector(
        "#screen06 .journey-next"
    );



    if (!journeyButton) {

        console.warn(
            "Screen 06 navigator not found"
        );

        return;

    }




    journeyButton.addEventListener(
        "click",
        function() {


            console.log(
                "Screen 06 → Screen 07"
            );



            if (
                typeof CTM !== "undefined" &&
                typeof CTM.navigate === "function"
            ) {


                CTM.navigate(
                    "screen07"
                );


            } else {


                console.error(
                    "CTM Universal Router unavailable"
                );


            }


        }

    );


}





/*==================================================
Auto Initialisation
==================================================*/


document.addEventListener(
    "DOMContentLoaded",
    function() {


        initScreen06();


    }
);
