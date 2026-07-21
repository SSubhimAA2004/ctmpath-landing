
/*======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 04 — YOUR PERMISSION™

File:
screen04.js

Purpose:
Screen 04 Interaction Logic

Responsibility:
• Screen initialization
• Permission interaction
• Journey navigation
• Screen transition handling

======================================================================*/


/*==================================================
Screen 04 Initialisation
==================================================*/

function initScreen04(){


    const screen04 =
        document.querySelector("#screen04");


    if(!screen04){

        return;

    }



    setupScreen04Navigation();


}



/*==================================================
Navigation Setup
==================================================*/

function setupScreen04Navigation(){


    const nextButton =
        document.querySelector(
            "#screen04 .journey-next"
        );



    if(!nextButton){

        return;

    }



    nextButton.addEventListener(
        "click",
        function(){


            const nextScreen =
                this.getAttribute(
                    "data-next-screen"
                );



            if(nextScreen){

                navigateToScreen(nextScreen);

            }


        }

    );


}



/*==================================================
Screen 04 Ready
==================================================*/

document.addEventListener(
    "DOMContentLoaded",
    function(){


        initScreen04();


    }
);
