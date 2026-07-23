
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    router.js

    Purpose
    Application Navigation Engine

    Responsibilities

    • Navigate Between Screens
    • Previous Screen
    • Next Screen
    • Jump To Screen
    • Track Current Screen
    • Save Progress

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.router = {

    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        CTM.loader.init();

        this.goTo(1);

    },



    /*==================================================
    GO TO SCREEN
    ==================================================*/

    async goTo(screenNumber){

        if(screenNumber < 1){

            screenNumber = 1;

        }

        if(screenNumber > CTM.state.app.totalScreens){

            screenNumber = CTM.state.app.totalScreens;

        }

        CTM.state.app.currentScreen = screenNumber;

        await CTM.loader.load(screenNumber);

        CTM.storage.save();

        console.log(

            `Current Screen : ${screenNumber}`

        );

    },



    /*==================================================
    NEXT
    ==================================================*/

    next(){

        this.goTo(

            CTM.state.app.currentScreen + 1

        );

    },



    /*==================================================
    PREVIOUS
    ==================================================*/

    previous(){

        this.goTo(

            CTM.state.app.currentScreen - 1

        );

    },



    /*==================================================
    RESTART
    ==================================================*/

    restart(){

        CTM.storage.clear();

        location.reload();

    },



    /*==================================================
    COMPLETION
    ==================================================*/

    finish(){

        console.log(

            'Assessment Completed'

        );

        CTM.storage.save();

    },



    /*==================================================
    GET CURRENT SCREEN
    ==================================================*/

    current(){

        return CTM.state.app.currentScreen;

    },



    /*==================================================
    GET TOTAL SCREENS
    ==================================================*/

    total(){

        return CTM.state.app.totalScreens;

    },



    /*==================================================
    FIRST SCREEN
    ==================================================*/

    isFirst(){

        return this.current()===1;

    },



    /*==================================================
    LAST SCREEN
    ==================================================*/

    isLast(){

        return this.current()===this.total();

    }

};
