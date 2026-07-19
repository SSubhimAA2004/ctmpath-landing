
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Journey Rules Engine
 * File        : js/rules.js
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

        Logger

    } = window.CTM.services;

    const Store = window.CTM.store;

    /**
     * ============================================================
     * Rule Registry
     * ============================================================
     */

    const registry = new Map();

    /**
     * ============================================================
     * Rules Engine
     * ============================================================
     */

    const Rules = {

        /**
         * --------------------------------------------------------
         * Register Rule
         * --------------------------------------------------------
         */

        register(rule) {

            if (

                !rule ||

                typeof rule !== "object" ||

                !rule.id

            ) {

                return false;

            }

            registry.set(

                rule.id,

                Object.freeze(rule)

            );

            return true;

        },

        /**
         * --------------------------------------------------------
         * Register Multiple Rules
         * --------------------------------------------------------
         */

        registerMany(rules = []) {

            rules.forEach(rule => {

                this.register(rule);

            });

        },

        /**
         * --------------------------------------------------------
         * Get Rule
         * --------------------------------------------------------
         */

        get(id) {

            return registry.get(id);

        },

        /**
         * --------------------------------------------------------
         * Rule Exists
         * --------------------------------------------------------
         */

        has(id) {

            return registry.has(id);

        },

        /**
         * --------------------------------------------------------
         * Remove Rule
         * --------------------------------------------------------
         */

        remove(id) {

            return registry.delete(id);

        },

        /**
         * --------------------------------------------------------
         * Clear Registry
         * --------------------------------------------------------
         */

        clear() {

            registry.clear();

        },

        /**
         * --------------------------------------------------------
         * All Rules
         * --------------------------------------------------------
         */

        all() {

            return [

                ...registry.values()

            ];

        },

        /**
         * --------------------------------------------------------
         * Rules By Scene
         * --------------------------------------------------------
         */

        byScene(sceneNumber) {

            return this.all().filter(rule =>

                rule.scene === sceneNumber

            );

        },

        /**
         * --------------------------------------------------------
         * Execute Rule
         * --------------------------------------------------------
         */

        execute(id) {

            const rule = this.get(id);

            if (!rule) {

                return true;

            }

            if (

                typeof rule.condition !== "function"

            ) {

                return true;

            }

            const snapshot =

                Store.snapshot();

            const passed =

                rule.condition(snapshot);

            if (

                passed &&

                typeof rule.action === "function"

            ) {

                rule.action(snapshot);

            }

            return passed;

        },

        /**
         * --------------------------------------------------------
         * Execute Scene Rules
         * --------------------------------------------------------
         */

        executeScene(sceneNumber) {

            return this.byScene(sceneNumber)

                .every(rule =>

                    this.execute(rule.id)

                );

        },

        /**
         * --------------------------------------------------------
         * Validate Scene
         * --------------------------------------------------------
         */

        validate(sceneNumber) {

            const valid =

                this.executeScene(sceneNumber);

            Logger.info(

                `Scene ${sceneNumber} validation:`,

                valid

            );

            return valid;

        },

        /**
         * --------------------------------------------------------
         * Validate Required Inputs
         * --------------------------------------------------------
         */

        validateRequired(scope = document) {

            if (!scope) {

                return true;

            }

            const requiredFields =

                scope.querySelectorAll(

                    "[data-required]"

                );

            let valid = true;

            requiredFields.forEach(field => {

                let answered = true;

                if (

                    field.matches(

                        'input[type="radio"]'

                    )

                ) {

                    answered =

                        scope.querySelector(

                            `input[name="${field.name}"]:checked`

                        ) !== null;

                }

                else if (

                    field.matches(

                        "input, textarea, select"

                    )

                ) {

                    answered =

                        field.value.trim().length > 0;

                }

                field.classList.toggle(

                    "is-invalid",

                    !answered

                );

                if (!answered) {

                    valid = false;

                }

            });

            return valid;

        },

        /**
         * --------------------------------------------------------
         * Can Continue
         * --------------------------------------------------------
         */

        canContinue(scope = document) {

            return this.validateRequired(scope);

        },

        /**
         * --------------------------------------------------------
         * Validate Current Scene
         * --------------------------------------------------------
         */

        validateCurrentScene() {

            const sceneNumber =

                Store.get(

                    "visitor"

                ).currentScene;

            const sceneElement =

                window.CTM.sceneLoader.currentScene();

            if (!sceneElement) {

                return false;

            }

            const inputsValid =

                this.canContinue(

                    sceneElement

                );

            const rulesValid =

                this.validate(

                    sceneNumber

                );

            return (

                inputsValid &&

                rulesValid

            );

        },

        /**
         * --------------------------------------------------------
         * Update CTA State
         * --------------------------------------------------------
         */

        updateCTA(scope = document) {

            if (!scope) {

                return;

            }

            const nextButton =

                scope.querySelector(

                    "[data-next]"

                );

            if (!nextButton) {

                return;

            }

            nextButton.disabled =

                !this.canContinue(scope);

        },

        /**
         * --------------------------------------------------------
         * Register Validation Events
         * --------------------------------------------------------
         */

        registerValidation() {

            document.addEventListener(

                "input",

                () => {

                    const scene =

                        window.CTM.sceneLoader.currentScene();

                    if (scene) {

                        this.updateCTA(scene);

                    }

                }

            );

            document.addEventListener(

                "change",

                () => {

                    const scene =

                        window.CTM.sceneLoader.currentScene();

                    if (scene) {

                        this.updateCTA(scene);

                    }

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Apply Visibility Rules
         * --------------------------------------------------------
         */

        applyVisibility(scope = document) {

            if (!scope) {

                return;

            }

            scope.querySelectorAll(

                "[data-condition]"

            ).forEach(element => {

                const key =

                    element.dataset.condition;

                const value =

                    Store.getResponse(key);

                element.hidden = !Boolean(value);

            });

        },

        /**
         * --------------------------------------------------------
         * Apply AI Card Rules
         * --------------------------------------------------------
         */

        applyAICards(scope = document) {

            if (!scope) {

                return;

            }

            const cards =

                scope.querySelectorAll(

                    ".ai-card[data-rule]"

                );

            if (!cards.length) {

                return;

            }

            cards.forEach(card => {

                card.hidden = true;

            });

            const scene =

                Store.get("visitor")

                    .currentScene;

            const selected =

                Store.getResponse(

                    `scene${scene}`

                );

            if (!selected) {

                return;

            }

            const active =

                scope.querySelector(

                    `.ai-card[data-rule="${selected}"]`

                );

            if (active) {

                active.hidden = false;

            }

        },

        /**
         * --------------------------------------------------------
         * Apply CTA Rules
         * --------------------------------------------------------
         */

        applyCTA(scope = document) {

            if (!scope) {

                return;

            }

            const buttons =

                scope.querySelectorAll(

                    "[data-cta]"

                );

            if (!buttons.length) {

                return;

            }

            buttons.forEach(button => {

                button.hidden = true;

            });

            const currentScene =

                Store.get("visitor")

                    .currentScene;

            const active =

                scope.querySelector(

                    `[data-cta="scene${currentScene}"]`

                );

            if (active) {

                active.hidden = false;

            }

        },

        /**
         * --------------------------------------------------------
         * Refresh Rules
         * --------------------------------------------------------
         */

        refresh(scope = document) {

            if (!scope) {

                return;

            }

            this.applyVisibility(scope);

            this.applyAICards(scope);

            this.applyCTA(scope);

            this.updateCTA(scope);

        },

        /**
         * --------------------------------------------------------
         * Journey Completion
         * --------------------------------------------------------
         */

        isJourneyComplete() {

            return (

                Store.get(

                    "visitor"

                ).currentScene ===

                window.CTM.config.JOURNEY.LAST_SCENE

            );

        },

        /**
         * --------------------------------------------------------
         * Complete Journey
         * --------------------------------------------------------
         */

        completeJourney() {

            if (

                Store.get(

                    "visitor"

                ).completed

            ) {

                return;

            }

            Store.update(

                "visitor",

                "completed",

                true

            );

            Store.update(

                "journey",

                "completedAt",

                new Date().toISOString()

            );

            document.dispatchEvent(

                new CustomEvent(

                    "ctm:journeyCompleted",

                    {

                        detail:

                            Store.snapshot()

                    }

                )

            );

            Logger.info(

                "Journey completed."

            );

        },

        /**
         * --------------------------------------------------------
         * Evaluate Journey
         * --------------------------------------------------------
         */

        evaluate() {

            if (

                this.isJourneyComplete()

            ) {

                this.completeJourney();

            }

        },

        /**
         * --------------------------------------------------------
         * Register Scene Lifecycle Events
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

                    this.evaluate();

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Register Journey Events
         * --------------------------------------------------------
         */

        registerJourneyEvents() {

            document.addEventListener(

                "ctm:journeyCompleted",

                event => {

                    Logger.info(

                        "Journey Completed",

                        event.detail

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

            this.registerValidation();

            this.registerEvents();

            this.registerJourneyEvents();

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                registeredRules:

                    registry.size,

                currentScene:

                    Store.get(

                        "visitor"

                    ).currentScene,

                completed:

                    Store.get(

                        "visitor"

                    ).completed

            });

        }

    };

    /**
     * ============================================================
     * Public API
     * ============================================================
     */

    const RulesAPI = Object.freeze({

        initialize:
            Rules.initialize.bind(Rules),

        register:
            Rules.register.bind(Rules),

        registerMany:
            Rules.registerMany.bind(Rules),

        get:
            Rules.get.bind(Rules),

        has:
            Rules.has.bind(Rules),

        remove:
            Rules.remove.bind(Rules),

        clear:
            Rules.clear.bind(Rules),

        all:
            Rules.all.bind(Rules),

        byScene:
            Rules.byScene.bind(Rules),

        execute:
            Rules.execute.bind(Rules),

        executeScene:
            Rules.executeScene.bind(Rules),

        validate:
            Rules.validate.bind(Rules),

        validateCurrentScene:
            Rules.validateCurrentScene.bind(Rules),

        refresh:
            Rules.refresh.bind(Rules),

        evaluate:
            Rules.evaluate.bind(Rules),

        health:
            Rules.health.bind(Rules)

    });

    /**
     * ============================================================
     * Register Rules Engine
     * ============================================================
     */

    Object.defineProperty(

        window.CTM,

        "rules",

        {

            value: RulesAPI,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();

