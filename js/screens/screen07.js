
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 07 — YOUR LIFE NEEDS™

File:
screen07.js

Purpose:
Premium Priority Mover™

Responsibility

• Initialize Screen 07
• Display Visitor Name
• Build Priority Board
• Render Rank Badges
• Initialize Controls
• Support CTM Dynamic Architecture

======================================================================
*/


'use strict';


(() => {



    const CTM = window.CTM;



    if(!CTM){

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


    CTM.screen07 = {

        id:

            'screen07',

        nextScreen:

            'screen08'

    };





    /*
    ==================================================
    Default Life Needs

    Initial Priority Order

    ==================================================
    */


    CTM.defaultLifeNeeds = [

        'income',

        'saving',

        'debt',

        'wealth',

        'plan',

        'family',

        'additional-income',

        'expenses',

        'freedom',

        'peace'

    ];





    /*
    ==================================================
    Initialize Screen

    Called by loader.js

    ==================================================
    */


    CTM.initScreen07 = function(){



        CTM.log(

            'Screen 07 initialized.'

        );



        CTM.loadVisitorGreeting();



        CTM.initializeLifeNeeds();



        CTM.renderRanks();



        CTM.bindScreen07();



    };





    /*
    ==================================================
    Visitor Greeting
    ==================================================
    */


    CTM.loadVisitorGreeting = function(){



        const greeting =

            document.getElementById(

                'visitor-display-name'

            );



        if(!greeting){

            return;

        }



        let visitorName = '';



        if(

            window.CTM_STATE &&

            window.CTM_STATE.visitorName

        ){

            visitorName =

                window.CTM_STATE.visitorName;

        }

        else{

            visitorName =

                localStorage.getItem(

                    'ctmVisitorName'

                ) || '';

        }



        greeting.textContent = visitorName;

    };





    /*
    ==================================================
    Build Initial Priority Order
    ==================================================
    */


    CTM.initializeLifeNeeds = function(){



        if(

            !window.CTM_STATE

        ){

            window.CTM_STATE = {};

        }



        if(

            !Array.isArray(

                window.CTM_STATE.lifeNeeds

            )

        ){

            window.CTM_STATE.lifeNeeds =

                [

                    ...CTM.defaultLifeNeeds

                ];

        }



    };





    /*
    ==================================================
    Render Rank Badges

    Gold
    Silver
    Bronze
    Default

    ==================================================
    */


    CTM.renderRanks = function(){



        const cards =

            document.querySelectorAll(

                '#life-needs-list .need-card'

            );



        cards.forEach(

            function(

                card,

                index

            ){



                const badge =

                    card.querySelector(

                        '.need-rank'

                    );



                if(

                    !badge

                ){

                    return;

                }



                badge.className =

                    'need-rank';



                badge.textContent =

                    index + 1;



                switch(

                    index

                ){

                    case 0:

                        badge.classList.add(

                            'rank-1'

                        );

                        break;



                    case 1:

                        badge.classList.add(

                            'rank-2'

                        );

                        break;



                    case 2:

                        badge.classList.add(

                            'rank-3'

                        );

                        break;



                    default:

                        badge.classList.add(

                            'rank-default'

                        );

                        break;

                }



            }

        );



        CTM.refreshMoveButtons();



    };





    /*
    ==================================================
    Enable / Disable

    ▲ ▼ Buttons

    ==================================================
    */


    CTM.refreshMoveButtons = function(){



        const cards =

            [

                ...document.querySelectorAll(

                    '#life-needs-list .need-card'

                )

            ];



        cards.forEach(

            function(

                card,

                index

            ){



                const up =

                    card.querySelector(

                        '.move-up'

                    );



                const down =

                    card.querySelector(

                        '.move-down'

                    );



                if(

                    up

                ){

                    up.disabled =

                        index === 0;

                }



                if(

                    down

                ){

                    down.disabled =

                        index ===

                        cards.length - 1;

                }



            }

        );



    };

     /*
    ==================================================
    Move Card Up

    ==================================================
    */


    CTM.moveCardUp = function(card){



        const previous =

            card.previousElementSibling;



        if(

            !previous

        ){

            return;

        }



        previous.before(

            card

        );



        CTM.afterPriorityChanged();



    };





    /*
    ==================================================
    Move Card Down

    ==================================================
    */


    CTM.moveCardDown = function(card){



        const next =

            card.nextElementSibling;



        if(

            !next

        ){

            return;

        }



        next.after(

            card

        );



        CTM.afterPriorityChanged();



    };





    /*
    ==================================================
    Priority Changed

    ==================================================
    */


    CTM.afterPriorityChanged = function(){



        CTM.renderRanks();



        CTM.animateCards();



        CTM.saveLifeNeeds();



        CTM.enableContinueButton();



    };





    /*
    ==================================================
    Animate Cards

    ==================================================
    */


    CTM.animateCards = function(){



        const cards =

            document.querySelectorAll(

                '#life-needs-list .need-card'

            );



        cards.forEach(

            function(card){



                card.classList.remove(

                    'updated'

                );



                void card.offsetWidth;



                card.classList.add(

                    'updated'

                );



            }

        );



    };





    /*
    ==================================================
    Save Priority Order

    ==================================================
    */


    CTM.saveLifeNeeds = function(){



        const cards =

            document.querySelectorAll(

                '#life-needs-list .need-card'

            );



        const order = [];



        cards.forEach(

            function(card){



                order.push(

                    card.dataset.id

                );



            }

        );



        if(

            !window.CTM_STATE

        ){

            window.CTM_STATE = {};

        }



        window.CTM_STATE.lifeNeeds =

            order;





        localStorage.setItem(

            'ctmLifeNeeds',

            JSON.stringify(

                order

            )

        );



    };





    /*
    ==================================================
    Enable Continue

    ==================================================
    */


    CTM.enableContinueButton = function(){



        const button =

            document.getElementById(

                'screen07-next'

            );



        if(

            !button

        ){

            return;

        }



        button.disabled =

            false;



        button.classList.remove(

            'disabled'

        );



        button.classList.add(

            'enabled'

        );



    };





    /*
    ==================================================
    Click Handler

    ==================================================
    */


    CTM.handleScreen07Click = function(event){



        const upButton =

            event.target.closest(

                '.move-up'

            );



        if(

            upButton

        ){

            event.preventDefault();



            const card =

                upButton.closest(

                    '.need-card'

                );



            if(

                card

            ){

                CTM.moveCardUp(

                    card

                );

            }



            return;

        }







        const downButton =

            event.target.closest(

                '.move-down'

            );



        if(

            downButton

        ){

            event.preventDefault();



            const card =

                downButton.closest(

                    '.need-card'

                );



            if(

                card

            ){

                CTM.moveCardDown(

                    card

                );

            }



            return;

        }







        const nextButton =

            event.target.closest(

                '#screen07-next'

            );



        if(

            nextButton

        ){

            event.preventDefault();



            if(

                nextButton.disabled

            ){

                return;

            }



            CTM.saveLifeNeeds();



            CTM.navigate(

                CTM.screen07.nextScreen

            );



        }



    };

     /*
    ==================================================
    Restore Saved Priority Order

    ==================================================
    */


    CTM.restoreLifeNeeds = function(){



        let savedOrder = null;



        if(

            window.CTM_STATE &&

            Array.isArray(

                window.CTM_STATE.lifeNeeds

            )

        ){

            savedOrder =

                window.CTM_STATE.lifeNeeds;

        }

        else{

            const stored =

                localStorage.getItem(

                    'ctmLifeNeeds'

                );



            if(

                stored

            ){

                try{

                    savedOrder =

                        JSON.parse(

                            stored

                        );

                }

                catch(error){

                    console.warn(

                        'Unable to restore life needs.',

                        error

                    );

                }

            }

        }



        if(

            !Array.isArray(

                savedOrder

            )

        ){

            return;

        }



        const container =

            document.getElementById(

                'life-needs-list'

            );



        if(

            !container

        ){

            return;

        }



        savedOrder.forEach(

            function(id){



                const card =

                    container.querySelector(

                        '.need-card[data-id="' +

                        id +

                        '"]'

                    );



                if(

                    card

                ){

                    container.appendChild(

                        card

                    );

                }



            }

        );



        CTM.renderRanks();



    };





    /*
    ==================================================
    Bind Events

    ==================================================
    */


    CTM.bindScreen07 = function(){



        document.removeEventListener(

            'click',

            CTM.handleScreen07Click

        );



        document.addEventListener(

            'click',

            CTM.handleScreen07Click

        );



    };





    /*
    ==================================================
    Screen Loaded Hook

    Called by loader.js

    ==================================================
    */


    CTM.afterScreen07Loaded = function(){



        if(

            !document.getElementById(

                'screen07'

            )

        ){

            return;

        }



        CTM.initScreen07();



        CTM.restoreLifeNeeds();



    };





    /*
    ==================================================
    Cleanup

    ==================================================
    */


    CTM.destroyScreen07 = function(){



        document.removeEventListener(

            'click',

            CTM.handleScreen07Click

        );



    };





})();

