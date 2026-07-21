
/*
======================================================================

CTM PATH™ Guided Journey v6.0

File
20-screen09.js

Purpose
Screen 09 Distance Scale Controller

Responsibility
• Handle dream distance selection
• Manage single selection
• Save response
• Restore selection
• Support dynamic screen loading

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
    Configuration
    ==================================================*/


    CTM.screen09 = {

        question:

            'dreamDistance'

    };





    /*==================================================
    Save Distance Response
    ==================================================*/


    CTM.setDreamDistance = function(value){


        if (!value){

            return;

        }


        CTM.state.responses =

            CTM.state.responses || {};



        CTM.state.responses.dreamDistance = value;



        if (

            typeof CTM.saveState ===

            'function'

        ){

            CTM.saveState();

        }



    };





    /*==================================================
    Select Distance
    ==================================================*/


    CTM.selectDreamDistance = function(button){


        if (!button){

            return;

        }



        const value =

            button.dataset.value;



        if (!value){

            return;

        }





        document

            .querySelectorAll(

                '#screen09 .distance-option,' +

                '#screen09 .scale-group .choice'

            )

            .forEach(function(item){


                item.classList.remove(

                    'selected'

                );


            });





        button.classList.add(

            'selected'

        );





        CTM.setDreamDistance(

            value

        );



        CTM.log(

            'Dream Distance Selected:',

            value

        );


    };


 /*==================================================
Restore Selection
==================================================*/


CTM.restoreDreamDistance = function(){


    if (

        !CTM.state ||

        !CTM.state.responses

    ){

        return;

    }



    const saved =

        CTM.state.responses.dreamDistance;



    if (!saved){

        return;

    }





    const button =

        document.querySelector(

            '#screen09 .distance-option[data-value="' +

            saved +

            '"],' +

            '#screen09 .scale-group .choice[data-value="' +

            saved +

            '"]'

        );



    if (button){


        button.classList.add(

            'selected'

        );


    }



};






/*==================================================
Click Handler
==================================================*/


CTM.handleDreamDistance = function(event){



    const button =

        event.target.closest(

            '#screen09 .distance-option,' +

            '#screen09 .scale-group .choice'

        );



    if (!button){

        return;

    }



    event.preventDefault();



    CTM.selectDreamDistance(

        button

    );



};






/*==================================================
Bind Events

Safe Dynamic Screen Binding

==================================================*/


CTM.bindScreen09 = function(){



    document.removeEventListener(

        'click',

        CTM.handleDreamDistance

    );



    document.addEventListener(

        'click',

        CTM.handleDreamDistance

    );



};






/*==================================================
Screen Loaded Hook
==================================================*/


CTM.afterScreen09Loaded = function(){



    if (

        document.getElementById(

            'screen09'

        )

    ){


        CTM.restoreDreamDistance();


    }



};






/*==================================================
Initialize
==================================================*/


document.addEventListener(

    'DOMContentLoaded',

    function(){


        CTM.bindScreen09();



    }

);



})();

