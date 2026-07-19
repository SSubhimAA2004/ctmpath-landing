
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Navigation Engine
 * File        : js/navigation.js
 * Version     : 1.0.0
 * Batch       : 1 of 4
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM) {

        throw new Error("CTM namespace not initialized.");

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

            return (

                this.current() <

                this.last()

            );

        },

        /**
         * --------------------------------------------------------
         * Can Move Previous
         * --------------------------------------------------------
         */

        canPrevious() {

            return (

                this.current() >

                this.first()

            );

        },

        /**
         * --------------------------------------------------------
         * Go To Scene
         * --------------------------------------------------------
         */

        async go(sceneNumber) {

            if (

                sceneNumber < this.first() ||

                sceneNumber > this.last()

            ) {

                return false;

            }

            Components.Loading.show();

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

        }

    };

    window.CTM.navigation = Navigation;

})();

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

            window.CTM.store.reset();

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

            return await this.go(

                Number(sceneNumber)

            );

        },

        /**
         * --------------------------------------------------------
         * Current Progress
         * --------------------------------------------------------
         */

        progress() {

            const current = this.current();

            const total = this.last();

            return {

                current,

                total,

                percent: Math.round(

                    (current / total) * 100

                )

            };

        }

        /**
         * --------------------------------------------------------
         * Synchronize Progress UI
         * --------------------------------------------------------
         */

        synchronizeProgress() {

            const progress = this.progress();

            window.CTM.components.ProgressBar.update(

                progress.percent

            );

            window.CTM.components.ProgressText.update(

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

        restoreFromURL() {

            const hash = location.hash.replace(

                "#scene",

                ""

            );

            if (!hash) {

                return;

            }

            const scene = Number(hash);

            if (

                Number.isNaN(scene)

            ) {

                return;

            }

            this.jump(scene);

        },

        /**
         * --------------------------------------------------------
         * Register Internal Events
         * --------------------------------------------------------
         */

        registerEvents() {

            document.addEventListener(

                "ctm:afterSceneLoad",

                event => {

                    this.synchronizeProgress();

                    this.updateHistory(

                        event.detail.scene

                    );

                }

            );

        }

        /**
         * --------------------------------------------------------
         * Register Navigation Actions
         * --------------------------------------------------------
         */

        registerActions() {

            document.addEventListener(

                "click",

                async event => {

                    const button = event.target.closest("button");

                    if (!button) {

                        return;

                    }

                    /**
                     * Next
                     */

                    if (button.dataset.next !== undefined) {

                        event.preventDefault();

                        await this.next();

                        return;

                    }

                    /**
                     * Previous
                     */

                    if (button.dataset.prev !== undefined) {

                        event.preventDefault();

                        await this.previous();

                        return;

                    }

                    /**
                     * Jump
                     */

                    if (button.dataset.jump) {

                        event.preventDefault();

                        await this.jump(

                            Number(

                                button.dataset.jump

                            )

                        );

                        return;

                    }

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Keyboard Navigation
         * --------------------------------------------------------
         */

        registerKeyboard() {

            document.addEventListener(

                "keydown",

                async event => {

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
         * Initialize Navigation
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

                currentScene: this.current(),

                progress: this.progress(),

                canNext: this.canNext(),

                canPrevious: this.canPrevious()

            });

        }

