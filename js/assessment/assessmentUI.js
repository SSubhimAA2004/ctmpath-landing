
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    assessmentUI.js

    Version
    1.0

    Purpose

    Assessment User Interface

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    UI ENGINE

======================================================================*/

CTM.assessmentUI={

    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        this.cards=

            document.querySelectorAll(

                '.question-card'

            );

    },



    /*==================================================
    BIND RATING BUTTONS
    ==================================================*/

    bind(callback){

        document

        .querySelectorAll(

            '.rating-btn'

        )

        .forEach(button=>{

            button.addEventListener(

                'click',

                ()=>{

                    const selector=

                        button.closest(

                            '.rating-selector'

                        );

                    selector

                    .querySelectorAll(

                        '.rating-btn'

                    )

                    .forEach(btn=>{

                        btn.classList.remove(

                            'selected'

                        );

                    });

                    button.classList.add(

                        'selected'

                    );

                    const value=

                        Number(

                            button.dataset.value

                        );

                    callback(

                        selector.id,

                        value

                    );

                }

            );

        });

    },



    /*==================================================
    RESTORE

    Previous Answers

    ==================================================*/

    restore(

        selectorId,

        value

    ){

        const selector=

            document.getElementById(

                selectorId

            );

        if(!selector)

            return;

        selector

        .querySelectorAll(

            '.rating-btn'

        )

        .forEach(button=>{

            button.classList.remove(

                'selected'

            );

            if(

                Number(

                    button.dataset.value

                )===value

            ){

                button.classList.add(

                    'selected'

                );

            }

        });

    },



    /*==================================================
    ENABLE BUTTON
    ==================================================*/

    enableContinue(){

        const button=

            document.getElementById(

                'btnContinue'

            );

        if(button){

            button.disabled=false;

        }

    },



    /*==================================================
    DISABLE BUTTON
    ==================================================*/

    disableContinue(){

        const button=

            document.getElementById(

                'btnContinue'

            );

        if(button){

            button.disabled=true;

        }

    }

};

/*==================================================
END OF FILE
==================================================*/

