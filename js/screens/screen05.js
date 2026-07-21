
/*======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 05 — YOUR NAME™

File:
screen05.js

Purpose:
Screen 05 Interaction Logic

Responsibility:
• Screen initialization
• Capture visitor name
• Store visitor identity
• Validate input
• Continue journey

======================================================================*/


'use strict';





/*==================================================
Screen 05 Initialisation
==================================================*/


function initScreen05(){


    const screen05 =

        document.querySelector(

            "#screen05"

        );



    if(!screen05){

        return;

    }



    setupNameCapture();

    setupScreen05Navigation();


}









/*==================================================
Name Capture
==================================================*/


function setupNameCapture(){


    const nameInput =

        document.querySelector(

            "#visitor-name"

        );



    if(!nameInput){

        return;

    }



    nameInput.addEventListener(

        "input",

        function(){


            const visitorName =

                this.value.trim();



            saveVisitorName(

                visitorName

            );


        }

    );


}









/*==================================================
Save Visitor Name
==================================================*/


function saveVisitorName(name){


    if(!name){

        return;

    }



    if(window.CTM_STATE){


        window.CTM_STATE.visitorName = name;


    }


    else{


        localStorage.setItem(

            "ctmVisitorName",

            name

        );


    }


}









/*==================================================
Navigation Setup

SCREEN 05 → SCREEN 06

==================================================*/


function setupScreen05Navigation(){


    const nextButton =

        document.querySelector(

            "#screen05 .journey-next"

        );



    if(!nextButton){

        return;

    }





    nextButton.addEventListener(

        "click",

        async function(){



            const nameInput =

                document.querySelector(

                    "#visitor-name"

                );



            if(!nameInput){

                return;

            }



            const visitorName =

                nameInput.value.trim();





            if(visitorName === ""){


                nameInput.focus();


                return;


            }





            saveVisitorName(

                visitorName

            );






            const nextScreen =

                this.getAttribute(

                    "data-next-screen"

                );






            if(!nextScreen){

                return;

            }





            if(

                typeof CTM !== "undefined" &&

                typeof CTM.navigate === "function"

            ){



                await CTM.navigate(

                    nextScreen

                );



            }



        }

    );


}









/*==================================================
Screen 05 Ready
==================================================*/


document.addEventListener(

    "DOMContentLoaded",

    function(){


        initScreen05();


    }

);
