
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Personalization Engine
 * File        : js/personalization.js
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

        DOM,

        Binding,

        Logger

    } = window.CTM.services;

    const Store = window.CTM.store;

    /**
     * ============================================================
     * Personalization Engine
     * ============================================================
     */

    const Personalization = {

        /**
         * --------------------------------------------------------
         * Replace Single Placeholder
         * --------------------------------------------------------
         */

        bind(key, value, scope = document) {

            Binding.set(

                key,

                value,

                scope

            );

        },

        /**
         * --------------------------------------------------------
         * Replace Multiple Placeholders
         * --------------------------------------------------------
         */

        bindAll(scope = document) {

            const state = Store.snapshot();

            /**
             * Visitor
             */

            this.bind(

                "name",

                state.visitor.name || "",

                scope

            );

            /**
             * Financial

             */

            Object.entries(

                state.financial

            ).forEach(([key, value]) => {

                this.bind(

                    key,

                    value ?? "",

                    scope

                );

            });

        },

        /**
         * --------------------------------------------------------
         * Refresh Scene
         * --------------------------------------------------------
         */

        refresh(scope = document) {

            this.bindAll(scope);

        }

    };

    /**
     * ============================================================
     * Register
     * ============================================================
     */

    window.CTM.personalization = Personalization;

})();

        /**
         * --------------------------------------------------------
         * Mentor Messages
         * --------------------------------------------------------
         */

        mentorMessages: {

            default: {

                title:
                    "Let's continue your journey.",

                message:
                    "Every answer you provide helps build a clearer understanding of your current financial journey."

            }

        },

        /**
         * --------------------------------------------------------
         * Show Mentor Message
         * --------------------------------------------------------
         */

        showMentorMessage(id = "default", scope = document) {

            const message =

                this.mentorMessages[id] ||

                this.mentorMessages.default;

            const title = scope.querySelector(

                "[data-mentor-title]"

            );

            const body = scope.querySelector(

                "[data-mentor-message]"

            );

            if (title) {

                title.textContent =

                    message.title;

            }

            if (body) {

                body.textContent =

                    message.message;

            }

        },

        /**
         * --------------------------------------------------------
         * Reflection Message
         * --------------------------------------------------------
         */

        showReflection(scope = document) {

            const element = scope.querySelector(

                "[data-reflection]"

            );

            if (!element) {

                return;

            }

            const scene =

                Store.get(

                    "visitor"

                ).currentScene;

            element.dataset.scene = scene;

        },

        /**
         * --------------------------------------------------------
         * Refresh Mentor Content
         * --------------------------------------------------------
         */

        refreshMentor(scope = document) {

            this.showMentorMessage(

                "default",

                scope

            );

            this.showReflection(scope);

        },

        /**
         * --------------------------------------------------------
         * AI Insight Rendering
         * --------------------------------------------------------
         */

        renderInsights(scope = document) {

            const cards = scope.querySelectorAll(

                ".ai-card"

            );

            if (!cards.length) {

                return;

            }

            cards.forEach(card => {

                card.hidden = true;

            });

            const active = scope.querySelector(

                ".ai-card:not([hidden])"

            );

            if (active) {

                active.classList.add(

                    "active"

                );

            }

        },

        /**
         * --------------------------------------------------------
         * Journey Summary
         * --------------------------------------------------------
         */

        renderSummary(scope = document) {

            const summary = scope.querySelector(

                "[data-summary]"

            );

            if (!summary) {

                return;

            }

            const state = Store.snapshot();

            const visitor = state.visitor;

            summary.textContent =

                visitor.name

                ? `${visitor.name}, you have completed ${visitor.currentScene} of ${window.CTM.config.JOURNEY.LAST_SCENE} steps in your journey.`

                : `You have completed ${visitor.currentScene} of ${window.CTM.config.JOURNEY.LAST_SCENE} steps in your journey.`;

        },

        /**
         * --------------------------------------------------------
         * Personalize Scene
         * --------------------------------------------------------
         */

        personalize(scope = document) {

            this.bindAll(scope);

            this.refreshMentor(scope);

            this.renderInsights(scope);

            this.renderSummary(scope);

        }

        /**
         * --------------------------------------------------------
         * Register Personalization Events
         * --------------------------------------------------------
         */

        registerEvents() {

            document.addEventListener(

                "ctm:afterSceneLoad",

                () => {

                    const scene =

                        window.CTM.sceneLoader.currentScene();

                    if (!scene) {

                        return;

                    }

                    this.refresh(scene);

                }

            );

            document.addEventListener(

                "ctm:journeyCompleted",

                () => {

                    Logger.info(

                        "Journey personalization completed."

                    );

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

        },

        /**
         * --------------------------------------------------------
         * Reset
         * --------------------------------------------------------
         */

        reset() {

            /* Reserved for future extensions */

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                initialized: true,

                currentScene:

                    Store.get(

                        "visitor"

                    ).currentScene,

                visitor:

                    Store.get(

                        "visitor"

                    ).name || "",

                completed:

                    Store.get(

                        "visitor"

                    ).completed

            });

        }

