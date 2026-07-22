
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 05 — YOUR NAME™

File:
screen05.js

Purpose:
Screen 05 Interaction Logic

Responsibility:
• Initialize Screen 05 dynamically
• Capture visitor name
• Store visitor identity
• Validate input
• Continue journey
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


    CTM.screen05 = {


        id:

            'screen05',



        nextScreen:

            'screen06'


    };









    /*
    ==================================================
    Initialize Screen 05

    Called by loader.js

    ==================================================
    */


    CTM.initScreen05 = function(){



        CTM.log(

            'Screen 05 initialized.'

        );



        setupNameCapture();



        CTM.bindScreen05();



    };









    /*
    ==================================================
    Name Capture
    ==================================================
    */


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









    /*
    ==================================================
    Save Visitor Name
    ==================================================
    */


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









    /*
    ==================================================
    Navigation Handler

    SCREEN 05 → SCREEN 06

    ==================================================
    */


    CTM.handleScreen05Click = async function(event){



        const button =


            event.target.closest(


                "#screen05 .journey-next"


            );



        if(!button){


            return;


        }





        event.preventDefault();





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









        await CTM.navigate(


            CTM.screen05.nextScreen


        );



    };









    /*
    ==================================================
    Bind Events

    Safe Dynamic Loading Support

    ==================================================
    */


    CTM.bindScreen05 = function(){



        document.removeEventListener(


            'click',


            CTM.handleScreen05Click


        );





        document.addEventListener(


            'click',


            CTM.handleScreen05Click


        );



    };









    /*
    ==================================================
    Screen Loaded Hook

    Called after HTML injection

    ==================================================
    */


    CTM.afterScreen05Loaded = function(){



        if(


            document.getElementById(


                'screen05'


            )


        ){



            CTM.initScreen05();



        }



    };









})();
