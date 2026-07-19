
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Scene Loader Engine
 * File        : js/scene-loader.js
 * Version     : 2.0.0
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (

        !window.CTM ||

        !window.CTM.config ||

        !window.CTM.services ||

        !window.CTM.store

    ) {

        throw new Error(

            "CTM core modules not initialized."

        );

    }

    const {

        DOM,

        Logger,

        Errors,

        Events

    } = window.CTM.services;

    /**
     * ============================================================
     * Scene Loader
     * ============================================================
     */

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
         * Lifecycle Hooks
         * --------------------------------------------------------
         */

        hooks: {

            beforeLoad: [],

            afterLoad: []

        },

        /**
         * --------------------------------------------------------
         * Initialize
         * --------------------------------------------------------
         */

        initialize() {

            this.root = DOM.get(

                window.CTM.config.DOM.ROOT

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

            const number =

                String(sceneNumber)

                    .padStart(2, "0");

            return (

                window.CTM.config.SCENES.PATH +

                window.CTM.config.SCENES.PREFIX +

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

            const html =

                await response.text();

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

            if (!this.root) {

                return;

            }

            this.root.innerHTML = "";

        },

        /**
         * --------------------------------------------------------
         * Inject Scene
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

        }

        /**
         * --------------------------------------------------------
         * Execute Hooks
         * --------------------------------------------------------
         */

        async executeHooks(event, sceneNumber) {

            if (!this.hooks[event]) {

                return;

            }

            for (const callback of this.hooks[event]) {

                await callback(sceneNumber);

            }

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
         * Dispatch Event
         * --------------------------------------------------------
         */

        dispatch(eventName, sceneNumber) {

            Events.emit(

                document,

                eventName,

                {

                    scene: sceneNumber

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Load Scene
         * --------------------------------------------------------
         */

        async load(sceneNumber) {

            try {

                await this.executeHooks(

                    "beforeLoad",

                    sceneNumber

                );

                this.dispatch(

                    "ctm:beforeSceneLoad",

                    sceneNumber

                );

                const html =

                    await this.fetch(sceneNumber);

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

                if (

                    window.CTM.components

                ) {

                    window.CTM.components.refresh(

                        this.root

                    );

                }

                await this.executeHooks(

                    "afterLoad",

                    sceneNumber

                );

                this.dispatch(

                    "ctm:afterSceneLoad",

                    sceneNumber

                );

                this.preloadAdjacent(

                    sceneNumber

                );

                Logger.info(

                    `Scene ${sceneNumber} loaded.`

                );

                return true;

            }

            catch (error) {

                Errors.handle(

                    error,

                    "SceneLoader"

                );

                return false;

            }

        },

        /**
         * --------------------------------------------------------
         * Current Scene Element
         * --------------------------------------------------------
         */

        currentScene() {

            return this.root

                ? this.root.firstElementChild

                : null;

        }

        /**
         * --------------------------------------------------------
         * Preload Scene
         * --------------------------------------------------------
         */

        async preload(sceneNumber) {

            if (

                sceneNumber <

                window.CTM.config.JOURNEY.FIRST_SCENE ||

                sceneNumber >

                window.CTM.config.JOURNEY.LAST_SCENE

            ) {

                return;

            }

            if (

                this.cache.has(sceneNumber)

            ) {

                return;

            }

            try {

                await this.fetch(sceneNumber);

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

            this.cache.delete(sceneNumber);

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

            return Object.freeze({

                size: this.cache.size,

                scenes: [

                    ...this.cache.keys()

                ]

            });

        },

        /**
         * --------------------------------------------------------
         * Reset
         * --------------------------------------------------------
         */

        reset() {

            this.clear();

            this.clearCache();

        },

        /**
         * --------------------------------------------------------
         * Destroy
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

                initialized:

                    this.root instanceof HTMLElement,

                cachedScenes:

                    this.cache.size,

                currentScene:

                    window.CTM.store

                        .get("visitor")

                        .currentScene,

                rootAvailable:

                    this.root !== null

            });

        }

    };

    /**
     * ============================================================
     * Public API
     * ============================================================
     */

    const SceneLoaderAPI = Object.freeze({

        initialize:
            SceneLoader.initialize.bind(SceneLoader),

        load:
            SceneLoader.load.bind(SceneLoader),

        preload:
            SceneLoader.preload.bind(SceneLoader),

        preloadAdjacent:
            SceneLoader.preloadAdjacent.bind(SceneLoader),

        currentScene:
            SceneLoader.currentScene.bind(SceneLoader),

        on:
            SceneLoader.on.bind(SceneLoader),

        reset:
            SceneLoader.reset.bind(SceneLoader),

        destroy:
            SceneLoader.destroy.bind(SceneLoader),

        clearCache:
            SceneLoader.clearCache.bind(SceneLoader),

        cacheInfo:
            SceneLoader.cacheInfo.bind(SceneLoader),

        health:
            SceneLoader.health.bind(SceneLoader)

    });

    /**
     * ============================================================
     * Register Scene Loader
     * ============================================================
     */

    Object.defineProperty(

        window.CTM,

        "sceneLoader",

        {

            value: SceneLoaderAPI,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();


