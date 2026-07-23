
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    Screen 01
    Emotion

    Purpose

    • Capture Visitor Emotion
    • Premium Card Interaction
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

        this.cards =
            document.querySelectorAll('.emotion-card');

        this.continueButton =
            document.getElementById('btnContinue');

        this.progressFill =
            document.getElementById('progressFill');

        this.progressPercent =
            document.getElementById('journeyPercent');

        this.restoreSelection();

        this.bindEmotionCards();

        this.bindContinueButton();

    },



    /*==================================================
    RESTORE PREVIOUS SELECTION
    ==================================================*/

    restoreSelection(){

        if(

            !CTM.state ||

            !CTM.state.emotion ||

            !CTM.state.emotion.selected

        ){

            return;

        }

        const value =

            CTM.state.emotion.selected;

        this.cards.forEach(card=>{

            if(card.dataset.value===value){

                card.classList.add('active');

            }

        });

        this.enableContinue();

    },



    /*==================================================
    BIND EMOTION CARDS
    ==================================================*/

    bindEmotionCards(){

        this.cards.forEach(card=>{

            card.addEventListener(

                'click',

                ()=>{

                    this.selectCard(card);

                }

            );

        });

    },



    /*==================================================
    SELECT CARD
    ==================================================*/

    selectCard(card){

        this.cards.forEach(item=>{

            item.classList.remove('active');

        });

        card.classList.add('active');

        CTM.state.emotion.selected =

            card.dataset.value;

        CTM.storage.save();

        this.enableContinue();

        this.animateProgress();

    },



    /*==================================================
    ENABLE CONTINUE
    ==================================================*/

    enableContinue(){

        if(!this.continueButton){

            return;

        }

        this.continueButton.disabled = false;

        this.continueButton.animate(

            [

                {

                    opacity:.35,

                    transform:'translateY(8px)'

                },

                {

                    opacity:1,

                    transform:'translateY(0)'

                }

            ],

            {

                duration:300,

                easing:'ease-out'

            }

        );

    },

    /*==================================================
    ANIMATE PROGRESS
    ==================================================*/

    animateProgress(){

        if(this.progressFill){

            this.progressFill.animate(

                [

                    {

                        transform:'scaleX(.96)',

                        opacity:.80

                    },

                    {

                        transform:'scaleX(1)',

                        opacity:1

                    }

                ],

                {

                    duration:450,

                    easing:'ease-out'

                }

            );

        }

        if(this.progressPercent){

            this.progressPercent.animate(

                [

                    {

                        transform:'scale(.90)',

                        opacity:.70

                    },

                    {

                        transform:'scale(1)',

                        opacity:1

                    }

                ],

                {

                    duration:350,

                    easing:'ease-out'

                }

            );

        }

    },



    /*==================================================
    CONTINUE BUTTON
    ==================================================*/

    bindContinueButton(){

        if(!this.continueButton){

            return;

        }

        this.continueButton.addEventListener(

            'click',

            ()=>{

                if(

                    !CTM.state.emotion.selected

                ){

                    return;

                }

                this.continueJourney();

            }

        );

    },



    /*==================================================
    CONTINUE JOURNEY
    ==================================================*/

    continueJourney(){

        this.continueButton.disabled = true;

        this.continueButton.animate(

            [

                {

                    transform:'scale(1)',

                    opacity:1

                },

                {

                    transform:'scale(.97)',

                    opacity:.85

                },

                {

                    transform:'scale(1)',

                    opacity:1

                }

            ],

            {

                duration:350,

                easing:'ease-in-out'

            }

        );

        setTimeout(()=>{

            CTM.router.next();

        },250);

    },

    /*==================================================
    RESET SCREEN
    ==================================================*/

    reset(){

        this.cards.forEach(card=>{

            card.classList.remove(

                'active'

            );

        });

        if(this.continueButton){

            this.continueButton.disabled = true;

        }

        if(CTM.state.emotion){

            CTM.state.emotion.selected = '';

        }

        CTM.storage.save();

    },



    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        this.cards = null;

        this.continueButton = null;

        this.progressFill = null;

        this.progressPercent = null;

    }

};

