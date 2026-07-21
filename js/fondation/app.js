
/*
======================================================================

CTM PATH™ Guided Journey v1.0

File
js/foundation/app.js

Purpose
Application Bootstrap

Responsibility
• Initialize CTM PATH™ application
• Restore saved visitor state
• Load first screen
• Start journey experience
• Bind global systems
• Prepare personalization

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
    Application Configuration
    ==================================================*/


    CTM.config = {


        firstScreen:

            'screen01',



        totalScreens:

            36,



        debug:

            true



    };







    /*==================================================
    Logger
    ==================================================*/


    CTM.log = function(...args){



        if (

            !CTM.config.debug

        ){


            return;


        }



        console.log(

            '[CTM PATH™]',

            ...args

        );


    };







    /*==================================================
    Restore Session
    ==================================================*/


    CTM.restoreSession = function(){



        if (

            typeof CTM.loadState ===

            'function'

        ){


            CTM.loadState();



        }



    };







    /*==================================================
    Initialize Global Events
    ==================================================*/


    CTM.bindEvents = function(){



        CTM.log(

            'Global events ready.'

        );



    };







    /*==================================================
    Load Initial Screen
    ==================================================*/


    CTM.loadInitialScreen = async function(){



        const hash =

            window.location.hash.replace(

                '#',

                ''

            );





        /*
        URL navigation priority

        Example:
        #screen05

        */


        if (

            hash &&

            typeof CTM.isValidScreen ===

            'function' &&

            CTM.isValidScreen(hash)

        ){



            await CTM.navigate(hash);



            return;



        }







        /*
        Fresh visitor

        */


        await CTM.navigate(

            CTM.config.firstScreen

        );



    };







    /*==================================================
    Application Ready State
    ==================================================*/


    CTM.markReady = function(){



        document.body.classList.add(

            'ctm-ready'

        );



        CTM.log(

            'CTM PATH™ Ready.'

        );



    };







    /*==================================================
    Initialize Application
    ==================================================*/


    CTM.initialize = async function(){



        CTM.log(

            'Starting CTM PATH™ Guided Journey'

        );





        CTM.restoreSession();





        CTM.bindEvents();





        await CTM.loadInitialScreen();





        CTM.markReady();





    };







    /*==================================================
    DOM Ready
    ==================================================*/


    document.addEventListener(

        'DOMContentLoaded',

        function(){



            CTM.initialize();



        }

    );



})();
