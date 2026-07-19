
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Personalization Engine
 * File        : js/personalization.js
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

        !window.CTM.sceneLoader

    ) {

        throw new Error(

            "CTM core modules not initialized."

        );

    }

    const {

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
         * Bind Single Placeholder
         * --------------------------------------------------------
         */

        bind(

            key,

            value,

            scope = document

        ) {

            Binding.set(

                key,

                value,

                scope

            );

        },

        /**
         * --------------------------------------------------------
         * Bind Visitor Data
         * --------------------------------------------------------
         */

        bindVisitor(scope = document) {

            const visitor =

                Store.get("visitor");

            this.bind(

                "name",

                visitor.name || "",

                scope

            );

            this.bind(

                "language",

                visitor.language || "",

                scope

            );

            this.bind(

                "currentScene",

                visitor.currentScene,

                scope

            );

        },

        /**
         * --------------------------------------------------------
         * Bind Financial Data
         * --------------------------------------------------------
         */

        bindFinancial(scope = document) {

            const financial =

                Store.get("financial");

            Object.entries(

                financial

            ).forEach(

                ([key, value]) => {

                    this.bind(

                        key,

                        value ?? "",

                        scope

                    );

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Bind Entire State
         * --------------------------------------------------------
         */

        bindAll(scope = document) {

            this.bindVisitor(scope);

            this.bindFinancial(scope);

        },

        /**
         * --------------------------------------------------------
         * Refresh Scene
         * --------------------------------------------------------
         */

        refresh(scope = document) {

            if (!scope) {

                return;

            }

            this.bindAll(scope);

            Logger.info(

                "Scene personalized."

            );

        },

        /**
         * --------------------------------------------------------
         * Mentor Messages
         * --------------------------------------------------------
         */

        mentorMessages: Object.freeze({

            default: Object.freeze({

                title:

                    "Let's continue your journey.",

                message:

                    "Every answer you provide helps build a clearer understanding of your current financial journey."

            })

        }),

        /**
         * --------------------------------------------------------
         * Show Mentor Message
         * --------------------------------------------------------
         */

        showMentorMessage(

            id = "default",

            scope = document

        ) {

            if (!scope) {

                return;

            }

            const message =

                this.mentorMessages[id] ||

                this.mentorMessages.default;

            const title =

                scope.querySelector(

                    "[data-mentor-title]"

                );

            const body =

                scope.querySelector(

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

            if (!scope) {

                return;

            }

            const reflection =

                scope.querySelector(

                    "[data-reflection]"

                );

            if (!reflection) {

                return;

            }

            reflection.dataset.scene =

                Store.get(

                    "visitor"

                ).currentScene;

        },

        /**
         * --------------------------------------------------------
         * Refresh Mentor Section
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

            if (!scope) {

                return;

            }

            const cards =

                scope.querySelectorAll(

                    ".ai-card"

                );

            if (!cards.length) {

                return;

            }

            cards.forEach(card => {

                card.classList.remove(

                    "active"

                );

            });

            const active =

                scope.querySelector(

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

            if (!scope) {

                return;

            }

            const summary =

                scope.querySelector(

                    "[data-summary]"

                );

            if (!summary) {

                return;

            }

            const visitor =

                Store.get("visitor");

            const totalScenes =

                window.CTM.config.JOURNEY.LAST_SCENE;

            summary.textContent =

                visitor.name

                    ? `${visitor.name}, you have completed ${visitor.currentScene} of ${totalScenes} steps in your journey.`

                    : `You have completed ${visitor.currentScene} of ${totalScenes} steps in your journey.`;

        },

        /**
         * --------------------------------------------------------
         * Personalize Current Scene
         * --------------------------------------------------------
         */

        personalize(scope = document) {

            if (!scope) {

                return;

            }

            this.bindAll(scope);

            this.refreshMentor(scope);

            this.renderInsights(scope);

            this.renderSummary(scope);

            Logger.info(

                "Scene personalization complete."

            );

        },

        /**
         * --------------------------------------------------------
         * Scene Loaded Event
         * --------------------------------------------------------
         */

        onSceneLoaded() {

            const scene =

                window.CTM.sceneLoader.currentScene();

            if (!scene) {

                return;

            }

            this.personalize(scene);

        },

        /**
         * --------------------------------------------------------
         * Journey Completed Event
         * --------------------------------------------------------
         */

        onJourneyCompleted(event) {

            Logger.info(

                "Journey personalization completed.",

                event.detail

            );

        },

        /**
         * --------------------------------------------------------
         * Register Events
         * --------------------------------------------------------
         */

        registerEvents() {

            document.addEventListener(

                "ctm:afterSceneLoad",

                () => {

                    this.onSceneLoaded();

                }

            );

            document.addEventListener(

                "ctm:journeyCompleted",

                event => {

                    this.onJourneyCompleted(event);

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

            const scene =

                window.CTM.sceneLoader.currentScene();

            if (scene) {

                this.personalize(scene);

            }

            Logger.info(

                "Personalization initialized."

            );

        },

        /**
         * --------------------------------------------------------
         * Reset
         * --------------------------------------------------------
         */

        reset() {

            Logger.info(

                "Personalization reset."

            );

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            const visitor =

                Store.get("visitor");

            return Object.freeze({

                initialized: true,

                currentScene:

                    visitor.currentScene,

                visitor:

                    visitor.name || "",

                completed:

                    visitor.completed,

                language:

                    visitor.language

            });

        }

    };

    /**
     * ============================================================
     * Public API
     * ============================================================
     */

    const PersonalizationAPI = Object.freeze({

        initialize:
            Personalization.initialize.bind(Personalization),

        refresh:
            Personalization.refresh.bind(Personalization),

        personalize:
            Personalization.personalize.bind(Personalization),

        bind:
            Personalization.bind.bind(Personalization),

        bindAll:
            Personalization.bindAll.bind(Personalization),

        reset:
            Personalization.reset.bind(Personalization),

        health:
            Personalization.health.bind(Personalization)

    });

    /**
     * ============================================================
     * Register Personalization Engine
     * ============================================================
     */

    Object.defineProperty(

        window.CTM,

        "personalization",

        {

            value: PersonalizationAPI,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();


