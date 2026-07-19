
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Application Entry Point
 * File        : js/app.js
 * Version     : 1.0.0
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM) {

        throw new Error(

            "CTM namespace not initialized."

        );

    }

    const {

        Logger,
        Errors

    } = window.CTM.services;

    /**
     * ============================================================
     * Application
     * ============================================================
     */

    const App = {

        /**
         * --------------------------------------------------------
         * Initialize
         * --------------------------------------------------------
         */

        async initialize() {

            try {

                Logger.info(

                    "Initializing application..."

                );

                const started =

                    await window.CTM.bootstrap.start();

                if (!started) {

                    throw new Error(

                        "Bootstrap failed."

                    );

                }

                Logger.info(

                    "Application initialized."

                );

                return true;

            }

            catch (error) {

                Errors.handle(

                    error,

                    "Application"

                );

                return false;

            }

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                application: true,

                version:

                    window.CTM.config.APP.VERSION,

                modules: {

                    config: !!window.CTM.config,

                    store: !!window.CTM.store,

                    services: !!window.CTM.services,

                    components: !!window.CTM.components,

                    sceneLoader: !!window.CTM.sceneLoader,

                    navigation: !!window.CTM.navigation,

                    rules: !!window.CTM.rules,

                    personalization: !!window.CTM.personalization,

                    bootstrap: !!window.CTM.bootstrap

                }

            });

        },

        /**
         * --------------------------------------------------------
         * Start Application
         * --------------------------------------------------------
         */

        async start() {

            return await this.initialize();

        }

    };

    /**
     * ============================================================
     * Auto Start Application
     * ============================================================
     */

    document.addEventListener(

        "DOMContentLoaded",

        async () => {

            await App.initialize();

        }

    );

    /**
     * ============================================================
     * Public API
     * ============================================================
     */

    Object.defineProperty(

        window.CTM,

        "app",

        {

            value: Object.freeze({

                initialize:

                    App.initialize.bind(App),

                health:

                    App.health.bind(App),

                start:

                    App.start.bind(App)

            }),

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();


