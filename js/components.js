
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Component Engine
 * File        : js/components.js
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
        Classes

    } = window.CTM.services;

    /**
     * ============================================================
     * Progress Bar Component
     * ============================================================
     */

    const ProgressBar = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.HEADER_PROGRESS

            );

        },

        update(percent) {

            if (!this.element) return;

            percent = Math.max(

                0,

                Math.min(100, percent)

            );

            this.element.style.width = `${percent}%`;

        }

    };

    /**
     * ============================================================
     * Progress Text Component
     * ============================================================
     */

    const ProgressText = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.PROGRESS_TEXT

            );

        },

        update(current, total) {

            if (!this.element) return;

            this.element.textContent =

                `${current} / ${total}`;

        }

    };

    /**
     * ============================================================
     * Loading Overlay
     * ============================================================
     */

    const Loading = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.LOADING_OVERLAY

            );

        },

        show() {

            if (!this.element) return;

            this.element.hidden = false;

        },

        hide() {

            if (!this.element) return;

            this.element.hidden = true;

        }

    };

    /**
     * ============================================================
     * Thinking Overlay
     * ============================================================
     */

    const Thinking = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.THINKING_OVERLAY

            );

        },

        show() {

            if (!this.element) return;

            this.element.hidden = false;

        },

        hide() {

            if (!this.element) return;

            this.element.hidden = true;

        }

    };

    /**
     * ============================================================
     * Component Manager
     * ============================================================
     */

    const Components = {

        initialize() {

            ProgressBar.initialize();

            ProgressText.initialize();

            Loading.initialize();

            Thinking.initialize();

        }

    };

    /**
     * ============================================================
     * Register
     * ============================================================
     */

    window.CTM.components = {

        ProgressBar,

        ProgressText,

        Loading,

        Thinking,

        initialize: Components.initialize

    };

})();

    /**
     * ============================================================
     * Toast Component
     * ============================================================
     */

    const Toast = {

        container: null,

        initialize() {

            this.container = DOM.get(

                window.CTM.config.DOM.TOAST_CONTAINER

            );

        },

        show(message, type = "info") {

            if (!this.container) return;

            const toast = document.createElement("div");

            toast.className = `toast toast-${type}`;

            toast.textContent = message;

            this.container.appendChild(toast);

            setTimeout(() => {

                toast.remove();

            },

            window.CTM.config.TIMING.TOAST_DURATION);

        }

    };

    /**
     * ============================================================
     * Modal Component
     * ============================================================
     */

    const Modal = {

        container: null,

        initialize() {

            this.container = DOM.get(

                window.CTM.config.DOM.MODAL_CONTAINER

            );

        },

        open(content) {

            if (!this.container) return;

            this.container.innerHTML = "";

            this.container.appendChild(content);

            this.container.hidden = false;

        },

        close() {

            if (!this.container) return;

            this.container.hidden = true;

            this.container.innerHTML = "";

        }

    };

    /**
     * ============================================================
     * Error Banner Component
     * ============================================================
     */

    const ErrorBanner = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.ERROR_BOUNDARY

            );

        },

        show(message) {

            if (!this.element) return;

            this.element.textContent = message;

            this.element.hidden = false;

        },

        hide() {

            if (!this.element) return;

            this.element.hidden = true;

            this.element.textContent = "";

        }

    };

    /**
     * ============================================================
     * Confirmation Dialog
     * ============================================================
     */

    const Confirm = {

        async show(message) {

            return window.confirm(message);

        }

    };

    /**
     * ============================================================
     * Radio Card Component
     * ============================================================
     */

    const RadioCards = {

        initialize(scope = document) {

            const groups = DOM.queryAll(

                ".radio-card",

                scope

            );

            groups.forEach(card => {

                const input = card.querySelector(

                    'input[type="radio"]'

                );

                if (!input) return;

                input.addEventListener(

                    "change",

                    () => {

                        const name = input.name;

                        DOM.queryAll(

                            `input[name="${name}"]`,

                            scope

                        ).forEach(radio => {

                            radio.closest(

                                ".radio-card"

                            )?.classList.remove(

                                "selected"

                            );

                        });

                        card.classList.add(

                            "selected"

                        );

                    }

                );

            });

        }

    };

    /**
     * ============================================================
     * Option Card Component
     * ============================================================
     */

    const OptionCards = {

        initialize(scope = document) {

            DOM.queryAll(

                ".option-card",

                scope

            ).forEach(card => {

                card.addEventListener(

                    "click",

                    () => {

                        const input = card.querySelector(

                            "input"

                        );

                        if (!input) return;

                        input.click();

                    }

                );

            });

        }

    };

    /**
     * ============================================================
     * Question Component
     * ============================================================
     */

    const Questions = {

        initialize(scope = document) {

            DOM.queryAll(

                ".question",

                scope

            ).forEach(question => {

                question.dataset.ready = "true";

            });

        }

    };

    /**
     * ============================================================
     * CTA Buttons
     * ============================================================
     */

    const CTAButtons = {

        initialize(scope = document) {

            DOM.queryAll(

                "[data-next]",

                scope

            ).forEach(button => {

                button.type = "button";

            });

        },

        enable(button) {

            if (!button) return;

            button.disabled = false;

        },

        disable(button) {

            if (!button) return;

            button.disabled = true;

        }

    };

    /**
     * ============================================================
     * AI Card Component
     * ============================================================
     */

    const AICards = {

        show(rule, scope = document) {

            DOM.queryAll(

                ".ai-card",

                scope

            ).forEach(card => {

                card.hidden = true;

            });

            const card = DOM.query(

                `.ai-card[data-rule="${rule}"]`,

                scope

            );

            if (card) {

                card.hidden = false;

            }

        },

        hideAll(scope = document) {

            DOM.queryAll(

                ".ai-card",

                scope

            ).forEach(card => {

                card.hidden = true;

            });

        }

    };

    /**
     * ============================================================
     * Reflection Card Component
     * ============================================================
     */

    const ReflectionCards = {

        initialize(scope = document) {

            DOM.queryAll(

                ".reflection-card",

                scope

            ).forEach(card => {

                card.dataset.ready = "true";

            });

        }

    };

    /**
     * ============================================================
     * Summary Card Component
     * ============================================================
     */

    const SummaryCards = {

        initialize(scope = document) {

            DOM.queryAll(

                ".summary-card",

                scope

            ).forEach(card => {

                card.dataset.ready = "true";

            });

        }

    };

    /**
     * ============================================================
     * Framework Card Component
     * ============================================================
     */

    const FrameworkCards = {

        initialize(scope = document) {

            DOM.queryAll(

                ".framework-card",

                scope

            ).forEach(card => {

                card.dataset.ready = "true";

            });

        }

    };

    /**
     * ============================================================
     * Roadmap Component
     * ============================================================
     */

    const Roadmap = {

        initialize(scope = document) {

            DOM.queryAll(

                ".roadmap-step",

                scope

            ).forEach(step => {

                step.dataset.ready = "true";

            });

        }

    };

    /**
     * ============================================================
     * Offer Card Component
     * ============================================================
     */

    const OfferCards = {

        initialize(scope = document) {

            DOM.queryAll(

                ".offer-card",

                scope

            ).forEach(card => {

                card.dataset.ready = "true";

            });

        }

    };

    /**
     * ============================================================
     * Financial Wheel Component
     * ============================================================
     */

    const FinancialWheel = {

        element: null,

        initialize(scope = document) {

            this.element = DOM.query(

                ".financial-wheel",

                scope

            );

        },

        render(data = {}) {

            if (!this.element) {

                return;

            }

            this.element.dataset.rendered = "true";

            this.element.dataset.values = JSON.stringify(data);

        },

        clear() {

            if (!this.element) {

                return;

            }

            this.element.removeAttribute("data-values");

            this.element.removeAttribute("data-rendered");

        }

    };

    /**
     * ============================================================
     * Component Lifecycle
     * ============================================================
     */

    const Lifecycle = {

        refresh(scope = document) {

            RadioCards.initialize(scope);

            OptionCards.initialize(scope);

            Questions.initialize(scope);

            CTAButtons.initialize(scope);

            ReflectionCards.initialize(scope);

            SummaryCards.initialize(scope);

            FrameworkCards.initialize(scope);

            Roadmap.initialize(scope);

            OfferCards.initialize(scope);

            FinancialWheel.initialize(scope);

        },

        destroy() {

            AICards.hideAll();

            FinancialWheel.clear();

        }

    };

    /**
     * ============================================================
     * Component Registry
     * ============================================================
     */

    const Registry = Object.freeze({

        ProgressBar,

        ProgressText,

        Loading,

        Thinking,

        Toast,

        Modal,

        ErrorBanner,

        Confirm,

        RadioCards,

        OptionCards,

        Questions,

        CTAButtons,

        AICards,

        ReflectionCards,

        SummaryCards,

        FrameworkCards,

        Roadmap,

        OfferCards,

        FinancialWheel

    });

