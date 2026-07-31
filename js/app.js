
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : app.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class App {

    #initialized = false;

    init() {

        if (this.#initialized) {
            return;
        }

        /* ==============================================
           Foundation
           ============================================== */

        CTM.Config.init();

        CTM.Logger.init();

        CTM.Events.init();

        CTM.State.init();

        CTM.Storage.init();

        CTM.Validation.init();

        CTM.API.init();

        CTM.Services.init();

        CTM.UI.init();

        CTM.Router.init();

        CTM.Navigation.init();

        this.#registerGlobalEvents();

        this.#initialized = true;

        CTM.Logger.info(

            'Application initialized.'

        );

    }

    /* ==============================================
       Start
       ============================================== */

    start() {

        if (!this.#initialized) {

            this.init();

        }

        const app = CTM.State.getApp();

        const startRoute =

            app.currentRoute ||

            CTM.Config.APP.DEFAULT_ROUTE;

        CTM.Router.navigate(

            startRoute

        );

        CTM.Events.emit(

            CTM.Config.EVENTS.APP_STARTED

        );

        CTM.Logger.info(

            'Application started.'

        );

    }

    /* ==============================================
       Restart
       ============================================== */

    restart() {

        this.destroy();

        this.init();

        this.start();

    }

    /* ==============================================
       Global Events
       ============================================== */

    #registerGlobalEvents() {

        window.addEventListener(

            'error',

            event => {

                CTM.Logger.error(

                    'Unhandled Error',

                    event.error

                );

            }

        );

        window.addEventListener(

            'unhandledrejection',

            event => {

                CTM.Logger.error(

                    'Unhandled Promise',

                    event.reason

                );

            }

        );

    }

    /* ==============================================
       Destroy
       ============================================== */

    destroy() {

        CTM.Navigation.destroy();

        CTM.Router.destroy();

        CTM.UI.destroy();

        CTM.Services.destroy();

        CTM.API.destroy();

        CTM.Validation.destroy();

        CTM.Storage.destroy();

        CTM.State.destroy();

        CTM.Events.destroy();

        CTM.Logger.destroy();

        this.#initialized = false;

    }

}

CTM.App = Object.freeze(

    new App()

);

/* ==============================================
   Bootstrap
   ============================================== */

document.addEventListener(

    'DOMContentLoaded',

    () => {

        CTM.App.start();

    }

);

