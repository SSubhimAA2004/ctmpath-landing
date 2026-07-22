
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 06 — YOUR JOURNEY™

File:
screen06.js

Purpose:
Screen 06 Interaction Logic

Responsibility:
• Initialize Screen 06 dynamically
• Maintain emotional journey progression
• Handle navigator interaction
• Continue journey to Screen 07
• Support CTM Dynamic Loader Architecture

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


    CTM.screen06 = {


        id:

            'screen06',



        nextScreen:

            'screen07'


    };









    /*
    ==================================================
    Initialize Screen 06

    Called by loader.js

    ==================================================
    */


    CTM.initScreen06 = function(){



        CTM.log(

            'Screen 06 initialized.'

        );



        CTM.bindScreen06();



    };









    /*
    ==================================================
    Navigation Handler

    SCREEN 06 → SCREEN 07

    ==================================================
    */


    CTM.handleScreen06Click = async function(event){



        const button =


            event.target.closest(


                "#screen06 .journey-next"


            );



        if(!button){


            return;


        }





        event.preventDefault();





        await CTM.navigate(


            CTM.screen06.nextScreen


        );



    };









    /*
    ==================================================
    Bind Events

    Safe Dynamic Loading Support

    ==================================================
    */


    CTM.bindScreen06 = function(){



        document.removeEventListener(


            'click',


            CTM.handleScreen06Click


        );





        document.addEventListener(


            'click',


            CTM.handleScreen06Click


        );



    };









    /*
    ==================================================
    Screen Loaded Hook

    Called after HTML injection

    ==================================================
    */


    CTM.afterScreen06Loaded = function(){



        if(


            document.getElementById(


                'screen06'


            )


        ){



            CTM.initScreen06();



        }



    };









})();
