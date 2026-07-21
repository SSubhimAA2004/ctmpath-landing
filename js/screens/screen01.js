
/*
======================================================================

CTM PATH™ Guided Journey v1.0

File
js/screens/screen01.js

Purpose
Screen 01 — The Invitation™ Controller

Responsibility
• Initialize Screen 01
• Start visitor journey
• Handle CTA interaction
• Prepare personalization hooks
• Maintain clean transition

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




    /*==================================================
    Screen Configuration
    ==================================================*/


    CTM.screen01 = {


        id:

            'screen01',


        nextScreen:

            'screen02'


    };





    /*==================================================
    Initialize Screen 01
    ==================================================*/


    CTM.initScreen01 = function(){



        CTM.log(

            'Screen 01 initialized.'

        );



        CTM.startJourney();



        CTM.refreshScreen01();



    };







    /*==================================================
    Screen Refresh
    ==================================================*/


    CTM.refreshScreen01 = function(){



        /*
        Future hooks:

        • Personalised name
        • Visitor greeting
        • Dynamic content

        */


        if (

            typeof CTM.refreshText ===

            'function'

        ){

            CTM.refreshText();


        }



    };







    /*==================================================
    Start Journey Button
    ==================================================*/


    CTM.startScreen01Journey = async function(){



        CTM.startJourney();



        if (

            typeof CTM.saveState ===

            'function'

        ){


            CTM.saveState();


        }



        await CTM.navigate(

            CTM.screen01.nextScreen

        );



    };







    /*==================================================
    Click Handler
    ==================================================*/


    CTM.handleScreen01Click = function(event){



        const button =

            event.target.closest(

                '#screen01 [data-next]'

            );



        if (!button){


            return;


        }



        event.preventDefault();



        CTM.startScreen01Journey();



    };







    /*==================================================
    Bind Events

    Safe dynamic loading support

    ==================================================*/


    CTM.bindScreen01 = function(){



        document.removeEventListener(

            'click',

            CTM.handleScreen01Click

        );



        document.addEventListener(

            'click',

            CTM.handleScreen01Click

        );



    };







    /*==================================================
    Screen Loaded Hook
    ==================================================*/


    CTM.afterScreen01Loaded = function(){



        if (

            document.getElementById(

                'screen01'

            )

        ){



            CTM.initScreen01();



        }



    };







    /*==================================================
    Initialize
    ==================================================*/


    document.addEventListener(

        'DOMContentLoaded',

        function(){



            CTM.bindScreen01();



        }

    );



})();
