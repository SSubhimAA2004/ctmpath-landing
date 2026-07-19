
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Navigation Engine
 * File        : js/navigation.js
 * Version     : 2.0.0
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (

        !window.CTM ||

        !window.CTM.config ||

        !window.CTM.store ||

        !window.CTM.services ||

        !window.CTM.sceneLoader ||

        !window.CTM.components

    ) {

        throw new Error(

            "CTM core modules not initialized."

        );

    }

    const {

        Scroll,

        Logger

    } = window.CTM.services;

    const Store = window.CTM.store;

    const SceneLoader = window.CTM.sceneLoader;

    const Components = window.CTM.components;

    /**
     * ============================================================
     * Navigation Engine
     * ============================================================
     */

    const Navigation = {

        /**
         * --------------------------------------------------------
         * Current Scene
         * --------------------------------------------------------
         */

        current() {

            return Store.get(

                "visitor"

            ).currentScene;

        },

        /**
         * --------------------------------------------------------
         * First Scene
         * --------------------------------------------------------
         */

        first() {

            return window.CTM.config.JOURNEY.FIRST_SCENE;

        },

        /**
         * --------------------------------------------------------
         * Last Scene
         * --------------------------------------------------------
         */

        last() {

            return window.CTM.config.JOURNEY.LAST_SCENE;

        },

        /**
         * --------------------------------------------------------
         * Can Move Next
         * --------------------------------------------------------
         */

        canNext() {

            return this.current() < this.last();

        },

        /**
         * --------------------------------------------------------
         * Can Move Previous
         * --------------------------------------------------------
         */

        canPrevious() {

            return this.current() > this.first();

        },

        /**
         * --------------------------------------------------------
         * Navigate To Scene
         * --------------------------------------------------------
         */

        async go(sceneNumber) {

            if (

                sceneNumber < this.first() ||

                sceneNumber > this.last()

            ) {

                return false;

            }

            Components.Loading.show(

                "Loading next step..."

            );

            const success = await SceneLoader.load(

                sceneNumber

            );

            Components.Loading.hide();

            if (!success) {

                return false;

            }

            Scroll.top(false);

            Logger.info(

                `Navigation → Scene ${sceneNumber}`

            );

            return true;

        },

        /**
         * --------------------------------------------------------
         * Next Scene
         * --------------------------------------------------------
         */

        async next() {

            if (!this.canNext()) {

                return false;

            }

            return await this.go(

                this.current() + 1

            );

        },

        /**
         * --------------------------------------------------------
         * Previous Scene
         * --------------------------------------------------------
         */

        async previous() {

            if (!this.canPrevious()) {

                return false;

            }

            return await this.go(

                this.current() - 1

            );

        },

        /**
         * --------------------------------------------------------
         * Restart Journey
         * --------------------------------------------------------
         */

        async restart() {

            Store.reset();

            return await this.go(

                this.first()

            );

        },

        /**
         * --------------------------------------------------------
         * Jump To Scene
         * --------------------------------------------------------
         */

        async jump(sceneNumber) {

            sceneNumber = Number(sceneNumber);

            if (

                Number.isNaN(sceneNumber)

            ) {

                return false;

            }

            return await this.go(

                sceneNumber

            );

        },

        /**
         * --------------------------------------------------------
         * Journey Progress
         * --------------------------------------------------------
         */

        progress() {

            const current = this.current();

            const total = this.last();

            return Object.freeze({

                current,

                total,

                percent: Math.round(

                    (current / total) * 100

                )

            });

        },

        /**
         * --------------------------------------------------------
         * Synchronize Progress UI
         * --------------------------------------------------------
         */

        synchronizeProgress() {

            const progress =

                this.progress();

            Components.ProgressBar.update(

                progress.percent

            );

            Components.ProgressText.update(

                progress.current,

                progress.total

            );

        },

        /**
         * --------------------------------------------------------
         * Browser History
         * --------------------------------------------------------
         */

        updateHistory(sceneNumber) {

            history.replaceState(

                {

                    scene: sceneNumber

                },

                "",

                `#scene${String(sceneNumber).padStart(2, "0")}`

            );

        },

        /**
         * --------------------------------------------------------
         * Restore Scene From URL
         * --------------------------------------------------------
         */

        async restoreFromURL() {

            const hash = window.location.hash;

            if (!hash.startsWith("#scene")) {

                return false;

            }

            const sceneNumber = Number(

                hash.replace("#scene", "")

            );

            if (

                Number.isNaN(sceneNumber)

            ) {

                return false;

            }

            return await this.jump(sceneNumber);

        },

        /**
         * --------------------------------------------------------
         * Register Scene Events
         * --------------------------------------------------------
         */

        registerEvents() {

            document.addEventListener(

                "ctm:afterSceneLoad",

                event => {

                    const scene =

                        event.detail.scene;

                    this.synchronizeProgress();

                    this.updateHistory(scene);

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Register Button Actions
         * --------------------------------------------------------
         */

        registerActions() {

            document.addEventListener(

                "click",

                async event => {

                    const button =

                        event.target.closest("button");

                    if (!button) {

                        return;

                    }

                    if (

                        "next" in button.dataset

                    ) {

                        event.preventDefault();

                        await this.next();

                        return;

                    }

                    if (

                        "prev" in button.dataset

                    ) {

                        event.preventDefault();

                        await this.previous();

                        return;

                    }

                    if (

                        button.dataset.jump

                    ) {

                        event.preventDefault();

                        await this.jump(

                            button.dataset.jump

                        );

                    }

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Register Keyboard Navigation
         * --------------------------------------------------------
         */

        registerKeyboard() {

            document.addEventListener(

                "keydown",

                async event => {

                    if (

                        event.target.matches(

                            "input, textarea, select"

                        )

                    ) {

                        return;

                    }

                    switch (event.key) {

                        case "ArrowRight":

                            await this.next();

                            break;

                        case "ArrowLeft":

                            await this.previous();

                            break;

                    }

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Initialize
         * --------------------------------------------------------
         */

        initialize() {

            this.registerEvents();

            this.registerActions();

            this.registerKeyboard();

            this.synchronizeProgress();

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                currentScene:

                    this.current(),

                progress:

                    this.progress(),

                canNext:

                    this.canNext(),

                canPrevious:

                    this.canPrevious()

            });

        }

    };

    /**
     * ============================================================
     * Public API
     * ============================================================
     */

    const NavigationAPI = Object.freeze({

        initialize:
            Navigation.initialize.bind(Navigation),

        go:
            Navigation.go.bind(Navigation),

        next:
            Navigation.next.bind(Navigation),

        previous:
            Navigation.previous.bind(Navigation),

        jump:
            Navigation.jump.bind(Navigation),

        restart:
            Navigation.restart.bind(Navigation),

        restoreFromURL:
            Navigation.restoreFromURL.bind(Navigation),

        progress:
            Navigation.progress.bind(Navigation),

        synchronizeProgress:
            Navigation.synchronizeProgress.bind(Navigation),

        health:
            Navigation.health.bind(Navigation)

    });

    /**
     * ============================================================
     * Register Navigation
     * ============================================================
     */

    Object.defineProperty(

        window.CTM,

        "navigation",

        {

            value: NavigationAPI,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();

