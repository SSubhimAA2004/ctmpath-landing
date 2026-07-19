
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Journey Rules Engine
 * File        : js/rules.js
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
     * Journey Rules
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

                !rule.id

            ) {

                return;

            }

            registry.set(

                rule.id,

                Object.freeze(rule)

            );

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

        byScene(scene) {

            return this.all().filter(rule => {

                return rule.scene === scene;

            });

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

            const passed = rule.condition(

                Store.snapshot()

            );

            if (

                passed &&

                typeof rule.action === "function"

            ) {

                rule.action(

                    Store.snapshot()

                );

            }

            return passed;

        },

        /**
         * --------------------------------------------------------
         * Execute Scene Rules
         * --------------------------------------------------------
         */

        executeScene(scene) {

            return this.byScene(scene)

                .every(rule => {

                    return this.execute(

                        rule.id

                    );

                });

        },

        /**
         * --------------------------------------------------------
         * Validate Scene
         * --------------------------------------------------------
         */

        validate(scene) {

            const valid = this.executeScene(

                scene

            );

            Logger.info(

                `Scene ${scene} validation: ${valid}`

            );

            return valid;

        }

    };

    /**
     * ============================================================
     * Register
     * ============================================================
     */

    window.CTM.rules = Rules;

})();

        /**
         * --------------------------------------------------------
         * Validate Required Inputs
         * --------------------------------------------------------
         */

        validateRequired(scope = document) {

            const requiredFields = scope.querySelectorAll(

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

                    answered = scope.querySelector(

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

                if (!answered) {

                    valid = false;

                    field.classList.add(

                        "is-invalid"

                    );

                }

                else {

                    field.classList.remove(

                        "is-invalid"

                    );

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

            return this.validateRequired(

                scope

            );

        },

        /**
         * --------------------------------------------------------
         * Validate Current Scene
         * --------------------------------------------------------
         */

        validateCurrentScene() {

            const scene =

                Store.get(

                    "visitor"

                ).currentScene;

            const sceneElement =

                window.CTM.sceneLoader.currentScene();

            const required =

                this.canContinue(

                    sceneElement

                );

            const rules =

                this.validate(

                    scene

                );

            return required && rules;

        },

        /**
         * --------------------------------------------------------
         * Enable / Disable CTA
         * --------------------------------------------------------
         */

        updateCTA(scope = document) {

            const nextButton = scope.querySelector(

                "[data-next]"

            );

            if (!nextButton) {

                return;

            }

            nextButton.disabled =

                !this.canContinue(

                    scope

                );

        },

        /**
         * --------------------------------------------------------
         * Apply Visibility Rules
         * --------------------------------------------------------
         */

        applyVisibility(scope = document) {

            const blocks = scope.querySelectorAll(

                "[data-condition]"

            );

            blocks.forEach(block => {

                const condition =

                    block.dataset.condition;

                const response =

                    Store.getResponse(condition);

                block.hidden = !Boolean(response);

            });

        },

        /**
         * --------------------------------------------------------
         * Apply AI Card Rules
         * --------------------------------------------------------
         */

        applyAICards(scope = document) {

            const cards = scope.querySelectorAll(

                ".ai-card[data-rule]"

            );

            if (!cards.length) {

                return;

            }

            cards.forEach(card => {

                card.hidden = true;

            });

            const visitor =

                Store.get("visitor");

            const scene = visitor.currentScene;

            const selected =

                Store.getResponse(

                    `scene${scene}`

                );

            const match = scope.querySelector(

                `.ai-card[data-rule="${selected}"]`

            );

            if (match) {

                match.hidden = false;

            }

        },

        /**
         * --------------------------------------------------------
         * Apply CTA Rules
         * --------------------------------------------------------
         */

        applyCTA(scope = document) {

            const buttons = scope.querySelectorAll(

                "[data-cta]"

            );

            if (!buttons.length) {

                return;

            }

            buttons.forEach(button => {

                button.hidden = true;

            });

            const visitor =

                Store.get("visitor");

            const current =

                visitor.currentScene;

            const target = scope.querySelector(

                `[data-cta="scene${current}"]`

            );

            if (target) {

                target.hidden = false;

            }

        },

        /**
         * --------------------------------------------------------
         * Refresh Rules
         * --------------------------------------------------------
         */

        refresh(scope = document) {

            this.applyVisibility(scope);

            this.applyAICards(scope);

            this.applyCTA(scope);

            this.updateCTA(scope);

        },

        /**
         * --------------------------------------------------------
         * Is Journey Complete
         * --------------------------------------------------------
         */

        isJourneyComplete() {

            return (

                Store.get("visitor").currentScene ===

                window.CTM.config.JOURNEY.LAST_SCENE

            );

        },

        /**
         * --------------------------------------------------------
         * Complete Journey
         * --------------------------------------------------------
         */

        completeJourney() {

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

                        detail: Store.snapshot()

                    }

                )

            );

            Logger.info(

                "Journey completed."

            );

        },

        /**
         * --------------------------------------------------------
         * Evaluate Journey State
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
         * Register Journey Lifecycle
         * --------------------------------------------------------
         */

        registerJourneyEvents() {

            document.addEventListener(

                "ctm:afterSceneLoad",

                () => {

                    this.evaluate();

                }

            );

        },

        /**
         * --------------------------------------------------------
         * Refresh Entire Rule Engine
         * --------------------------------------------------------
         */

        refreshAll() {

            const scene =

                window.CTM.sceneLoader.currentScene();

            if (!scene) {

                return;

            }

            this.refresh(scene);

            this.evaluate();

        },

        /**
         * --------------------------------------------------------
         * Reset Rule Engine
         * --------------------------------------------------------
         */

        reset() {

            registry.clear();

        },

        /**
         * --------------------------------------------------------
         * Health Check
         * --------------------------------------------------------
         */

        health() {

            return Object.freeze({

                registeredRules: registry.size,

                currentScene:

                    Store.get(

                        "visitor"

                    ).currentScene,

                completed:

                    Store.get(

                        "visitor"

                    ).completed

            });

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

        }

