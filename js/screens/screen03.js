
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    Screen 03

    PURPOSE™

    Master Assessment Screen

    Responsibilities

    • Configure Assessment Engine
    • Load Purpose™ Assessment
    • Initialize Screen
    • Destroy Screen

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    SCREEN 03

======================================================================*/

CTM.screen03 = {

    /*==================================================
    INITIALIZE

    ==================================================*/

    init(){

        console.log(

            'Screen03 Initialized'

        );



        CTM.assessmentEngine.init({

            pillar:'purpose',

            screen:'Screen03',

            next:'Screen04'

        });

    },



    /*==================================================
    DESTROY

    ==================================================*/

    destroy(){

        if(

            CTM.assessmentEngine

        ){

            CTM.assessmentEngine.destroy();

        }

    }

};



/*==================================================

AUTO INITIALIZE

==================================================*/

document.addEventListener(

    'DOMContentLoaded',

    ()=>{

        CTM.screen03.init();

    }

);
