
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    screen03.js

    Version
    2.0

    Screen 03

    PURPOSE™

    Purpose

    Configuration file for the
    Master Assessment Engine.

    Responsibilities

    • Configure Purpose™ Assessment
    • Initialize Assessment Engine
    • Handle Screen Lifecycle
    • Cleanup Resources

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    SCREEN 03

======================================================================*/

CTM.screen03 = {

    /*==================================================
    CONFIGURATION
    ==================================================*/

    config:{

        pillar:'purpose',

        screen:'Screen03',

        next:'Screen04'

    },



    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        console.log(

            '==================================='

        );

        console.log(

            'CTM PATH™'

        );

        console.log(

            'Screen03 Initialized'

        );

        console.log(

            'Purpose™ Assessment'

        );

        console.log(

            '==================================='

        );



        if(

            !window.CTM

        ){

            console.error(

                'CTM namespace not found.'

            );

            return;

        }



        if(

            !CTM.assessmentEngine

        ){

            console.error(

                'Assessment Engine not loaded.'

            );

            return;

        }



        if(

            !CTM.assessmentQuestions

        ){

            console.error(

                'assessmentQuestions.js not loaded.'

            );

            return;

        }



        if(

            !CTM.assessmentScoring

        ){

            console.error(

                'assessmentScoring.js not loaded.'

            );

            return;

        }



        if(

            !CTM.assessmentUI

        ){

            console.error(

                'assessmentUI.js not loaded.'

            );

            return;

        }



        try{

            CTM.assessmentEngine.init(

                this.config

            );

        }

        catch(error){

            console.error(

                'Unable to initialize Screen03.',

                error

            );

            alert(

                'Unable to load the assessment. Please refresh the page.'

            );

        }

    },



    /*==================================================
    REFRESH

    ==================================================*/

    refresh(){

        if(

            CTM.assessmentEngine

        ){

            CTM.assessmentEngine.destroy();

            CTM.assessmentEngine.init(

                this.config

            );

        }

    },



    /*==================================================
    DESTROY

    ==================================================*/

    destroy(){

        console.log(

            'Destroying Screen03'

        );



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
