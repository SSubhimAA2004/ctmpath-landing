
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


'use strict';



/*==================================================
Screen 04 Initialisation

Called by loader.js

==================================================*/


CTM.initScreen04 = function(){


    const screen04 =

        document.querySelector("#screen04");



    if(!screen04){

        return;

    }



    setupScreen04Navigation();


};







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

        async function(){


            const nextScreen =

                this.getAttribute(

                    "data-next-screen"

                );



            if(!nextScreen){

                return;

            }




            /*
            CTM PATH™ Universal Router

            router.js

            CTM.navigate(screenId)

            */


            if(

                typeof CTM.navigate === "function"

            ){


                await CTM.navigate(

                    nextScreen

                );


            }



        }

    );


}
