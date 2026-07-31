
/* ==========================================================
   CTM PATH™ Guided Journey™
   Version : 1.0
   File    : app.js
   Purpose : Application Bootstrap
   ========================================================== */

'use strict';

/* ==========================================================
   APPLICATION
   ========================================================== */

const App = {

    /* ------------------------------------------------------
       Configuration
       ------------------------------------------------------ */

    version: '1.0.0',

    name: 'CTM PATH™ Guided Journey™',

    initialized: false,

    /* ------------------------------------------------------
       Initialize Application
       ------------------------------------------------------ */

    async init() {

        try {

            console.group(this.name);

            console.info('Initializing application...');

            this.showLoader();

            await this.initializeState();

            await this.loadSharedComponents();

            this.initializeNavigation();

            this.initializeRouter();

            this.hideLoader();

            this.initialized = true;

            console.info('Application initialized successfully.');

            console.groupEnd();

        }

        catch (error) {

            this.handleError(error);

        }

    },

    /* ------------------------------------------------------
       State
       ------------------------------------------------------ */

    async initializeState() {

        if (typeof State !== 'undefined') {

            State.initialize();

        }

    },

    /* ------------------------------------------------------
       Shared Components
       ------------------------------------------------------ */

    async loadSharedComponents() {

        if (typeof UI !== 'undefined') {

            await UI.loadComponent(
                'components/header.html',
                'header-container'
            );

            await UI.loadComponent(
                'components/footer.html',
                'footer-container'
            );

            await UI.loadComponent(
                'components/progress.html',
                'progress-container'
            );

        }

    },

    /* ------------------------------------------------------
       Navigation
       ------------------------------------------------------ */

    initializeNavigation() {

        if (typeof Navigation !== 'undefined') {

            Navigation.initialize();

        }

    },

    /* ------------------------------------------------------
       Router
       ------------------------------------------------------ */

    initializeRouter() {

        if (typeof Router !== 'undefined') {

            Router.start();

        }

    },

    /* ------------------------------------------------------
       Loader
       ------------------------------------------------------ */

    showLoader() {

        if (typeof UI !== 'undefined') {

            UI.showLoader();

        }

    },

    hideLoader() {

        if (typeof UI !== 'undefined') {

            UI.hideLoader();

        }

    },

    /* ------------------------------------------------------
       Global Error Handler
       ------------------------------------------------------ */

    handleError(error) {

        console.error(error);

        if (typeof UI !== 'undefined') {

            UI.hideLoader();

            UI.showToast({

                type: 'error',

                title: 'Application Error',

                message:
                    'Something went wrong while starting the application.'

            });

        }

    }

};

/* ==========================================================
   DOM READY
   ========================================================== */

document.addEventListener(

    'DOMContentLoaded',

    () => {

        App.init();

    }

);

