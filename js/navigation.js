
/* ==========================================================
   CTM PATH™ Guided Journey™
   Version : 1.0
   File    : navigation.js
   Purpose : Navigation Controller
   ========================================================== */

'use strict';

/* ==========================================================
   NAVIGATION
   ========================================================== */

const Navigation = {

    /* ------------------------------------------------------
       Initialize
       ------------------------------------------------------ */

    initialize() {

        console.info('Navigation initialized.');

        window.addEventListener(

            'popstate',

            () => {

                this.handleBrowserNavigation();

            }

        );

    },

    /* ------------------------------------------------------
       Navigate
       ------------------------------------------------------ */

    async go(page) {

        try {

            if (!page) return;

            State.app.previousPage =

                State.app.currentPage;

            State.app.currentPage = page;

            history.pushState(

                {

                    page

                },

                '',

                `#${page}`

            );

            if (typeof Router !== 'undefined') {

                await Router.load(page);

            }

        }

        catch (error) {

            console.error(error);

        }

    },

    /* ------------------------------------------------------
       Next Page
       ------------------------------------------------------ */

    next() {

        const nextStep =

            State.journey.currentStep + 1;

        this.go(

            `page0${nextStep}`

        );

    },

    /* ------------------------------------------------------
       Previous Page
       ------------------------------------------------------ */

    previous() {

        if (

            State.app.previousPage

        ) {

            this.go(

                State.app.previousPage

            );

        }

    },

    /* ------------------------------------------------------
       Browser Navigation
       ------------------------------------------------------ */

    handleBrowserNavigation() {

        const hash =

            window.location.hash.replace(

                '#',

                ''

            );

        if (

            hash

            &&

            typeof Router !== 'undefined'

        ) {

            Router.load(hash);

        }

    },

    /* ------------------------------------------------------
       Restart Journey
       ------------------------------------------------------ */

    restart() {

        State.reset();

        this.go('page01');

    }

};

