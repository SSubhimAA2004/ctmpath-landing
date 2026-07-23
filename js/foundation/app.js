
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    Interactive Life Assessment v1.0

    --------------------------------------------------------------------

    File
    app.js

    Purpose
    Application Bootstrap

    Responsibilities

    • Initialize CTM PATH™
    • Restore Previous Session
    • Start Router
    • Initialize Global Events

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.app = {

    /*==================================================
    INITIALIZE APPLICATION
    ==================================================*/

    async init(){

        console.log('========================================');
        console.log('CTM PATH™');
        console.log('FROM SURVIVAL TO LIVING™');
        console.log('Interactive Life Assessment v1.0');
        console.log('========================================');

        /*----------------------------------------------
        Restore Previous Session
        ----------------------------------------------*/

        if(CTM.storage.exists()){

            CTM.storage.load();

            console.log(
                'Previous assessment restored.'
            );

        }

        /*----------------------------------------------
        Initialize Router
        ----------------------------------------------*/

        CTM.router.init();

        /*----------------------------------------------
        Mark Application Ready
        ----------------------------------------------*/

        CTM.state.app.initialized = true;

        console.log(
            'Application Initialized Successfully.'
        );

    },



    /*==================================================
    RESTART ASSESSMENT
    ==================================================*/

    restart(){

        CTM.storage.clear();

        location.reload();

    },



    /*==================================================
    SAVE APPLICATION
    ==================================================*/

    save(){

        CTM.storage.save();

    }

};



/*==================================================
APPLICATION START
==================================================*/

document.addEventListener(

    'DOMContentLoaded',

    () => {

        CTM.app.init();

    }

);
