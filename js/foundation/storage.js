
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    storage.js

    Purpose
    Application Storage Manager

    Responsibilities

    • Save Application State
    • Load Application State
    • Clear Application State
    • Session Management

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.storage = {

    /*==================================================
    STORAGE KEY
    ==================================================*/

    KEY : 'CTM_PATH_STATE',



    /*==================================================
    SAVE
    ==================================================*/

    save(){

        try{

            localStorage.setItem(

                this.KEY,

                JSON.stringify(CTM.state)

            );

            return true;

        }

        catch(error){

            console.error(

                'CTM Storage Save Error',

                error

            );

            return false;

        }

    },



    /*==================================================
    LOAD
    ==================================================*/

    load(){

        try{

            const data = localStorage.getItem(this.KEY);

            if(!data){

                return false;

            }

            const savedState = JSON.parse(data);

            Object.assign(CTM.state,savedState);

            return true;

        }

        catch(error){

            console.error(

                'CTM Storage Load Error',

                error

            );

            return false;

        }

    },



    /*==================================================
    CLEAR
    ==================================================*/

    clear(){

        localStorage.removeItem(this.KEY);

    },



    /*==================================================
    EXISTS
    ==================================================*/

    exists(){

        return localStorage.getItem(this.KEY)!==null;

    },



    /*==================================================
    AUTO SAVE
    ==================================================*/

    autoSave(){

        this.save();

    }

};



/*==================================================
AUTO SAVE

Every 10 Seconds

==================================================*/

setInterval(()=>{

    CTM.storage.autoSave();

},10000);
