
/*
======================================================================

CTM PATH™ Guided Journey v6.0

SCREEN 07 — YOUR LIFE NEEDS™

File:
js/screens/screen07.js

Purpose:
Screen 07 Interaction Logic

Responsibility
• Initialize Screen 07
• Display Visitor Name
• Restore Previous Priority Order
• Handle Priority Movement
• Save Visitor Choices
• Continue Journey

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



    /*
    ==================================================
    Screen Configuration
    ==================================================
    */

    CTM.screen07 = {

        id: 'screen07',

        nextScreen: 'screen08'

    };



    /*
    ==================================================
    Default Priority Order
    ==================================================
    */

    const DEFAULT_ORDER = [

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
    Cached DOM
    ==================================================
    */

    const DOM = {

        container : null,

        cards : [],

        nextButton : null,

        visitorName : null

    };



    /*
    ==================================================
    Runtime State
    ==================================================
    */

    const STATE = {

        originalOrder : [],

        currentOrder : []

    };



    /*
    ==================================================
    Initialise Screen
    ==================================================
    */

    CTM.initScreen07 = function () {

        CTM.log(
            'Screen 07 initialized.'
        );

        cacheDOM();

        loadVisitorName();

        restorePriorityOrder();

        renderRanks();

        refreshMoveButtons();

        updateContinueButton();

        bindEvents();

    };



    /*
    ==================================================
    Cache DOM
    ==================================================
    */

    function cacheDOM() {

        DOM.container = document.getElementById(
            'life-needs-list'
        );

        DOM.cards = [

            ...DOM.container.querySelectorAll(
                '.need-card'
            )

        ];

        DOM.nextButton = document.getElementById(
            'screen07-next'
        );

        DOM.visitorName = document.getElementById(
            'visitor-display-name'
        );

    }



    /*
    ==================================================
    Load Visitor Name
    ==================================================
    */

    function loadVisitorName() {

        let visitorName = '';

        if (

            window.CTM_STATE &&

            window.CTM_STATE.visitorName

        ) {

            visitorName =
                window.CTM_STATE.visitorName;

        }

        else {

            visitorName =
                localStorage.getItem(
                    'ctmVisitorName'
                ) || '';

        }

        if (DOM.visitorName) {

            DOM.visitorName.textContent =
                visitorName;

        }

    }

    /*
    ==================================================
    Restore Priority Order
    ==================================================
    */

    function restorePriorityOrder() {

        let savedOrder = null;

        if (

            window.CTM_STATE &&

            window.CTM_STATE.lifeNeeds &&

            Array.isArray(

                window.CTM_STATE.lifeNeeds.order

            )

        ) {

            savedOrder =

                window.CTM_STATE.lifeNeeds.order;

        }

        else {

            const stored =

                localStorage.getItem(

                    'ctmLifeNeeds'

                );

            if (stored) {

                try {

                    const parsed =

                        JSON.parse(stored);

                    if (

                        parsed &&

                        Array.isArray(

                            parsed.order

                        )

                    ) {

                        savedOrder =

                            parsed.order;

                    }

                    else if (

                        Array.isArray(

                            parsed

                        )

                    ) {

                        savedOrder =

                            parsed;

                    }

                }

                catch (error) {

                    console.warn(

                        'Unable to restore life needs.',

                        error

                    );

                }

            }

        }



        if (

            !Array.isArray(

                savedOrder

            )

        ) {

            savedOrder =

                [...DEFAULT_ORDER];

        }



        savedOrder.forEach(

            function (id) {

                const card =

                    DOM.container.querySelector(

                        '.need-card[data-id="' +

                        id +

                        '"]'

                    );

                if (card) {

                    DOM.container.appendChild(

                        card

                    );

                }

            }

        );



        DOM.cards = [

            ...DOM.container.querySelectorAll(

                '.need-card'

            )

        ];



        STATE.originalOrder = [

            ...savedOrder

        ];



        STATE.currentOrder =

            getCurrentOrder();

    }



    /*
    ==================================================
    Get Current Priority Order
    ==================================================
    */

    function getCurrentOrder() {

        return [

            ...DOM.container.querySelectorAll(

                '.need-card'

            )

        ].map(

            function (card) {

                return card.dataset.id;

            }

        );

    }



    /*
    ==================================================
    Render Rank Badges
    ==================================================
    */

    function renderRanks() {

        DOM.cards = [

            ...DOM.container.querySelectorAll(

                '.need-card'

            )

        ];



        DOM.cards.forEach(

            function (

                card,

                index

            ) {

                const badge =

                    card.querySelector(

                        '.need-rank'

                    );

                if (!badge) {

                    return;

                }

                badge.className =

                    'need-rank';

                badge.textContent =

                    index + 1;

                if (index === 0) {

                    badge.classList.add(

                        'rank-1'

                    );

                }

                else if (index === 1) {

                    badge.classList.add(

                        'rank-2'

                    );

                }

                else if (index === 2) {

                    badge.classList.add(

                        'rank-3'

                    );

                }

                else {

                    badge.classList.add(

                        'rank-default'

                    );

                }

            }

        );

    }



    /*
    ==================================================
    Refresh Move Buttons
    ==================================================
    */

    function refreshMoveButtons() {

        DOM.cards.forEach(

            function (

                card,

                index

            ) {

                const upButton =

                    card.querySelector(

                        '.move-up-btn'

                    );

                const downButton =

                    card.querySelector(

                        '.move-down-btn'

                    );

                if (upButton) {

                    upButton.disabled =

                        index === 0;

                }


                if (downButton) {

                    downButton.disabled =

                        index ===

                        DOM.cards.length - 1;

                }

            }

        );

    }



    /*
    ==================================================
    Move Card Up
    ==================================================
    */

    function moveCardUp(card) {

        const previousCard =

            card.previousElementSibling;

        if (!previousCard) {

            return;

        }

        previousCard.before(

            card

        );

        afterPriorityChanged();

    }



    /*
    ==================================================
    Move Card Down
    ==================================================
    */

    function moveCardDown(card) {

        const nextCard =

            card.nextElementSibling;

        if (!nextCard) {

            return;

        }

        nextCard.after(

            card

        );

        afterPriorityChanged();

    }



    /*
    ==================================================
    Priority Changed
    ==================================================
    */

    function afterPriorityChanged() {

        DOM.cards = [

            ...DOM.container.querySelectorAll(

                '.need-card'

            )

        ];



        STATE.currentOrder =

            getCurrentOrder();



        renderRanks();

        refreshMoveButtons();

        animateCards();

        saveLifeNeeds();

        updateContinueButton();

    }



    /*
    ==================================================
    Animate Cards
    ==================================================
    */

    function animateCards() {

        DOM.cards.forEach(

            function(card) {

                card.classList.remove(

                    'updated'

                );

                void card.offsetWidth;

                card.classList.add(

                    'updated'

                );

            }

        );

    }



    /*
    ==================================================
    Save Life Needs
    ==================================================
    */

    function saveLifeNeeds() {

        const payload = {

            order:

                [...STATE.currentOrder],

            topThree:

                STATE.currentOrder.slice(

                    0,

                    3

                ),

            updatedAt:

                Date.now()

        };



        if (!window.CTM_STATE) {

            window.CTM_STATE = {};

        }



        window.CTM_STATE.lifeNeeds =

            payload;



        localStorage.setItem(

            'ctmLifeNeeds',

            JSON.stringify(

                payload

            )

        );

    }



    /*
    ==================================================
    Compare Orders
    ==================================================
    */

    function hasOrderChanged() {

        if (

            STATE.originalOrder.length !==

            STATE.currentOrder.length

        ) {

            return true;

        }



        for (

            let i = 0;

            i <

            STATE.originalOrder.length;

            i++

        ) {

            if (

                STATE.originalOrder[i] !==

                STATE.currentOrder[i]

            ) {

                return true;

            }

        }



        return false;

    }

    /*
    ==================================================
    Update Continue Button
    ==================================================
    */

    function updateContinueButton() {

        if (!DOM.nextButton) {

            return;

        }

        const changed =

            hasOrderChanged();

        DOM.nextButton.disabled =

            !changed;

        DOM.nextButton.setAttribute(

            'aria-disabled',

            String(!changed)

        );

        DOM.nextButton.classList.toggle(

            'enabled',

            changed

        );

        DOM.nextButton.classList.toggle(

            'disabled',

            !changed

        );

    }



    /*
    ==================================================
    Validate Priority Board
    ==================================================
    */

    function validatePriorityBoard() {

        const cards =

            [

                ...DOM.container.querySelectorAll(

                    '.need-card'

                )

            ];



        if (cards.length !== 10) {

            return false;

        }



        const ids =

            cards.map(

                function(card) {

                    return card.dataset.id;

                }

            );



        const uniqueIds =

            new Set(ids);



        return (

            uniqueIds.size ===

            cards.length

        );

    }



    /*
    ==================================================
    Screen Click Handler
    ==================================================
    */

    function handleScreenClick(event) {

        const upButton =

            event.target.closest(

                '.move-up-btn'

            );



        if (upButton) {

            event.preventDefault();

            const card =

                upButton.closest(

                    '.need-card'

                );

            if (card) {

                moveCardUp(

                    card

                );

            }

            return;

        }



        const downButton =

            event.target.closest(

                '.move-down-btn'

            );



        if (downButton) {

            event.preventDefault();

            const card =

                downButton.closest(

                    '.need-card'

                );

            if (card) {

                moveCardDown(

                    card

                );

            }

            return;

        }



        const nextButton =

            event.target.closest(

                '#screen07-next'

            );



        if (!nextButton) {

            return;

        }

        event.preventDefault();

        if (nextButton.disabled) {

            return;

        }

        if (

            !validatePriorityBoard()

        ) {

            console.warn(

                'Priority board validation failed.'

            );

            return;

        }

        saveLifeNeeds();

        CTM.navigate(

            CTM.screen07.nextScreen

        );

    }



    /*
    ==================================================
    Bind Events
    ==================================================
    */

    function bindEvents() {

        document.removeEventListener(

            'click',

            handleScreenClick

        );

        document.addEventListener(

            'click',

            handleScreenClick

        );

    }



    /*
    ==================================================
    Unbind Events
    ==================================================
    */

    function unbindEvents() {

        document.removeEventListener(

            'click',

            handleScreenClick

        );

    }

    /*
    ==================================================
    Screen Loaded Hook

    Called by loader.js

    ==================================================
    */

    CTM.afterScreen07Loaded = function () {

        const screen =

            document.getElementById(

                'screen07'

            );

        if (!screen) {

            return;

        }

        CTM.initScreen07();

    };



    /*
    ==================================================
    Cleanup

    Called before unloading
    Screen 07

    ==================================================
    */

    CTM.destroyScreen07 = function () {

        unbindEvents();

        DOM.container = null;

        DOM.cards = [];

        DOM.nextButton = null;

        DOM.visitorName = null;

    };



    /*
    ==================================================
    Public Refresh

    Optional helper for future use

    ==================================================
    */

    CTM.refreshScreen07 = function () {

        if (!DOM.container) {

            return;

        }

        DOM.cards = [

            ...DOM.container.querySelectorAll(

                '.need-card'

            )

        ];

        STATE.currentOrder =

            getCurrentOrder();

        renderRanks();

        refreshMoveButtons();

        updateContinueButton();

    };



    /*
    ==================================================
    Public Save

    ==================================================
    */

    CTM.saveScreen07 = function () {

        saveLifeNeeds();

    };



    /*
    ==================================================
    Public Validation

    ==================================================
    */

    CTM.validateScreen07 = function () {

        return validatePriorityBoard();

    };



    /*
    ==================================================
    Module Ready

    ==================================================
    */

    CTM.log(

        'Screen 07 module loaded.'

    );



})();


