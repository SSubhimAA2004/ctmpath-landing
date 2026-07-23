
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    Screen 01
    Emotion

    Purpose

    • Capture Visitor Emotion
    • Enable Continue Button
    • Save Selection
    • Navigate to Registration

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.screen01 = {

    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        this.bindEmotionCards();

        this.bindContinueButton();

    },



    /*==================================================
    BIND EMOTION CARDS
    ==================================================*/

    bindEmotionCards(){

        const cards = document.querySelectorAll('.emotion-card');

        cards.forEach(card=>{

            card.addEventListener(

                'click',

                ()=>{

                    cards.forEach(c=>{

                        c.classList.remove('active');

                    });

                    card.classList.add('active');

                    CTM.state.emotion.selected =

                        card.dataset.value;

                    CTM.storage.save();

                    this.enableContinue();

                }

            );

        });

    },



    /*==================================================
    ENABLE CONTINUE
    ==================================================*/

    enableContinue(){

        const button = document.getElementById(

            'btnContinue'

        );

        if(button){

            button.disabled = false;

        }

    },



    /*==================================================
    CONTINUE
    ==================================================*/

    bindContinueButton(){

        const button = document.getElementById(

            'btnContinue'

        );

        if(!button){

            return;

        }

        button.addEventListener(

            'click',

            ()=>{

                CTM.router.next();

            }

        );

    }

};



/*==================================================
AUTO INITIALIZE

==================================================*/

document.addEventListener(

    'DOMContentLoaded',

    ()=>{

        if(

            document.getElementById('screen01')

        ){

            CTM.screen01.init();

        }

    }

);
