
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Bootstrap Engine
 * File        : js/bootstrap.js
 * Version     : 1.0.0
 * Batch       : 1 of 2
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM) {

        throw new Error("CTM namespace not initialized.");

    }

    const {

        Logger,
        Errors

    } = window.CTM.services;

    /**
     * ============================================================
     * Bootstrap Engine
     * ============================================================
     */

    const Bootstrap = {

        /**
         * --------------------------------------------------------
         * Initialize Store
         * --------------------------------------------------------
         */

        initializeStore() {

            window.CTM.store.initializeSession();

        },

        /**
         * --------------------------------------------------------
         * Initialize Components
         * --------------------------------------------------------
         */

        initializeComponents() {

            window.CTM.components.initialize();

        },

        /**
         * --------------------------------------------------------
         * Initialize Scene Loader
         * --------------------------------------------------------
         */

        initializeSceneLoader() {

            window.CTM.sceneLoader.initialize();

        },

        /**
         * --------------------------------------------------------
         * Initialize Navigation
         * --------------------------------------------------------
         */

        initializeNavigation() {

            window.CTM.navigation.initialize();

        },

        /**
         * --------------------------------------------------------
         * Initialize Rules
         * --------------------------------------------------------
         */

        initializeRules() {

            window.CTM.rules.initialize();

        },

        /**
         * --------------------------------------------------------
         * Initialize Personalization
         * --------------------------------------------------------
         */

        initializePersonalization() {

            window.CTM.personalization.initialize();

        }

    };

    window.CTM.bootstrap = Bootstrap;

})();

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                config: !!window.CTM.config,

                store: !!window.CTM.store,

                services: !!window.CTM.services,

                components: !!window.CTM.components,

                sceneLoader: !!window.CTM.sceneLoader,

                navigation: !!window.CTM.navigation,

                rules: !!window.CTM.rules,

                personalization: !!window.CTM.personalization

            });

        },

        /**
         * --------------------------------------------------------
         * Start Application
         * --------------------------------------------------------
         */

        async start() {

            try {

                Logger.info(

                    "Starting CTM PATH™ Guided Journey..."

                );

                this.initializeStore();

                this.initializeComponents();

                this.initializeSceneLoader();

                this.initializeNavigation();

                this.initializeRules();

                this.initializePersonalization();

                window.CTM.navigation.restoreFromURL();

                await window.CTM.sceneLoader.load(

                    window.CTM.config.SCENES.DEFAULT

                );

                Logger.info(

                    "Application started successfully."

                );

                return true;

            }

            catch (error) {

                Errors.handle(

                    error,

                    "Bootstrap"

                );

                return false;

            }

        }



