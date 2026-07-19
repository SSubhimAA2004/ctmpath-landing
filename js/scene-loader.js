
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Scene Loader Engine
 * File        : js/scene-loader.js
 * Version     : 1.0.0
 * Batch       : 1 of 5
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM) {

        throw new Error("CTM namespace not initialized.");

    }

    const {

        DOM,

        Utils,

        Errors,

        Logger

    } = window.CTM.services;

    const SceneLoader = {

        /**
         * --------------------------------------------------------
         * Cache
         * --------------------------------------------------------
         */

        cache: new Map(),

        /**
         * --------------------------------------------------------
         * Scene Root
         * --------------------------------------------------------
         */

        root: null,

        /**
         * --------------------------------------------------------
         * Initialize
         * --------------------------------------------------------
         */

        initialize() {

            this.root = DOM.get(

                window.CTM.config.SCENES.ROOT

            );

            if (!this.root) {

                throw new Error(

                    "Scene root not found."

                );

            }

        },

        /**
         * --------------------------------------------------------
         * Build Scene Filename
         * --------------------------------------------------------
         */

        file(sceneNumber) {

            const number = String(sceneNumber)

                .padStart(2, "0");

            return (

                window.CTM.config.SCENES.PATH +

                "scene" +

                number +

                window.CTM.config.SCENES.EXTENSION

            );

        },

        /**
         * --------------------------------------------------------
         * Fetch Scene
         * --------------------------------------------------------
         */

        async fetch(sceneNumber) {

            if (

                this.cache.has(sceneNumber)

            ) {

                return this.cache.get(

                    sceneNumber

                );

            }

            const response = await fetch(

                this.file(sceneNumber),

                {

                    cache: "no-cache"

                }

            );

            if (!response.ok) {

                throw new Error(

                    `Unable to load Scene ${sceneNumber}`

                );

            }

            const html = await response.text();

            this.cache.set(

                sceneNumber,

                html

            );

            return html;

        },

        /**
         * --------------------------------------------------------
         * Clear Root
         * --------------------------------------------------------
         */

        clear() {

            if (!this.root) return;

            this.root.innerHTML = "";

        }

    };

    window.CTM.sceneLoader = SceneLoader;

})();

        /**
         * --------------------------------------------------------
         * Inject Scene HTML
         * --------------------------------------------------------
         */

        inject(html) {

            if (!this.root) {

                throw new Error(

                    "Scene root not initialized."

                );

            }

            this.clear();

            this.root.innerHTML = html;

        },

        /**
         * --------------------------------------------------------
         * Load Scene
         * --------------------------------------------------------
         */

        async load(sceneNumber) {

            try {

                const html = await this.fetch(

                    sceneNumber

                );

                this.inject(html);

                window.CTM.store.update(

                    "visitor",

                    "currentScene",

                    sceneNumber

                );

                window.CTM.store.update(

                    "journey",

                    "lastVisitedScene",

                    sceneNumber

                );

                this.initializeComponents();

                Logger.info(

                    `Scene ${sceneNumber} loaded.`

                );

                return true;

            }

            catch (error) {

                Errors.handle(

                    error,

                    "Scene Loader"

                );

                return false;

            }

        },

        /**
         * --------------------------------------------------------
         * Initialize Scene Components
         * --------------------------------------------------------
         */

        initializeComponents() {

            if (

                !window.CTM.components

            ) {

                return;

            }

            window.CTM.components.initialize(

                this.root

            );

        },

        /**
         * --------------------------------------------------------
         * Get Current Scene Element
         * --------------------------------------------------------
         */

        currentScene() {

            return this.root.firstElementChild;

        }

        /**
         * --------------------------------------------------------
         * Lifecycle Hooks
         * --------------------------------------------------------
         */

        hooks: {

            beforeLoad: [],

            afterLoad: []

        },

        /**
         * --------------------------------------------------------
         * Register Hook
         * --------------------------------------------------------
         */

        on(event, callback) {

            if (

                !this.hooks[event] ||

                typeof callback !== "function"

            ) {

                return;

            }

            this.hooks[event].push(callback);

        },

        /**
         * --------------------------------------------------------
         * Execute Hook
         * --------------------------------------------------------
         */

        async execute(event, sceneNumber) {

            if (!this.hooks[event]) {

                return;

            }

            for (const callback of this.hooks[event]) {

                await callback(sceneNumber);

            }

        },

        /**
         * --------------------------------------------------------
         * Dispatch Scene Event
         * --------------------------------------------------------
         */

        dispatch(eventName, sceneNumber) {

            document.dispatchEvent(

                new CustomEvent(

                    eventName,

                    {

                        detail: {

                            scene: sceneNumber

                        }

                    }

                )

            );

        },

        /**
         * --------------------------------------------------------
         * Preload Scene
         * --------------------------------------------------------
         */

        async preload(sceneNumber) {

            if (

                sceneNumber < window.CTM.config.JOURNEY.FIRST_SCENE ||

                sceneNumber > window.CTM.config.JOURNEY.LAST_SCENE

            ) {

                return;

            }

            if (

                this.cache.has(sceneNumber)

            ) {

                return;

            }

            try {

                const html = await this.fetch(

                    sceneNumber

                );

                this.cache.set(

                    sceneNumber,

                    html

                );

                Logger.info(

                    `Scene ${sceneNumber} preloaded.`

                );

            }

            catch (error) {

                Logger.warn(

                    `Unable to preload Scene ${sceneNumber}.`

                );

            }

        },

        /**
         * --------------------------------------------------------
         * Preload Adjacent Scenes
         * --------------------------------------------------------
         */

        async preloadAdjacent(sceneNumber) {

            await Promise.all([

                this.preload(

                    sceneNumber - 1

                ),

                this.preload(

                    sceneNumber + 1

                )

            ]);

        },

        /**
         * --------------------------------------------------------
         * Remove Cached Scene
         * --------------------------------------------------------
         */

        unload(sceneNumber) {

            this.cache.delete(

                sceneNumber

            );

        },

        /**
         * --------------------------------------------------------
         * Clear Cache
         * --------------------------------------------------------
         */

        clearCache() {

            this.cache.clear();

        },

        /**
         * --------------------------------------------------------
         * Cache Information
         * --------------------------------------------------------
         */

        cacheInfo() {

            return {

                size: this.cache.size,

                scenes: [

                    ...this.cache.keys()

                ]

            };

        }

        /**
         * --------------------------------------------------------
         * Reset Loader
         * --------------------------------------------------------
         */

        reset() {

            this.clear();

            this.clearCache();

        },

        /**
         * --------------------------------------------------------
         * Destroy Loader
         * --------------------------------------------------------
         */

        destroy() {

            this.reset();

            this.root = null;

            this.hooks.beforeLoad.length = 0;

            this.hooks.afterLoad.length = 0;

            Logger.info(

                "Scene Loader destroyed."

            );

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                initialized: this.root !== null,

                cachedScenes: this.cache.size,

                currentScene:

                    window.CTM.store

                        .get("visitor")

                        .currentScene,

                rootAvailable:

                    this.root instanceof HTMLElement

            });

        }

