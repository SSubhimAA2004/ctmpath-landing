
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Component Engine
 * File        : js/components.js
 * Version     : 2.0.0
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (

        !window.CTM ||

        !window.CTM.config ||

        !window.CTM.services

    ) {

        throw new Error(

            "CTM services not initialized."

        );

    }

    const { DOM } = window.CTM.services;

    /**
     * ============================================================
     * Progress Bar
     * ============================================================
     */

    const ProgressBar = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.HEADER_PROGRESS

            );

        },

        update(percent = 0) {

            if (!this.element) {

                return;

            }

            percent = Math.max(

                0,

                Math.min(100, percent)

            );

            this.element.style.width =

                `${percent}%`;

        }

    };

    /**
     * ============================================================
     * Progress Text
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

            if (!this.element) {

                return;

            }

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

        message: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.LOADING_OVERLAY

            );

            this.message = DOM.get(

                "loadingMessage"

            );

        },

        show(text = "Loading...") {

            if (!this.element) {

                return;

            }

            if (this.message) {

                this.message.textContent = text;

            }

            this.element.hidden = false;

        },

        hide() {

            if (!this.element) {

                return;

            }

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

        message: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.THINKING_OVERLAY

            );

            this.message = DOM.get(

                "thinkingMessage"

            );

        },

        show(text = "Thinking...") {

            if (!this.element) {

                return;

            }

            if (this.message) {

                this.message.textContent = text;

            }

            this.element.hidden = false;

        },

        hide() {

            if (!this.element) {

                return;

            }

            this.element.hidden = true;

        }

    };

    /**
     * ============================================================
     * Toast
     * ============================================================
     */

    const Toast = {

        container: null,

        initialize() {

            this.container = DOM.get(

                window.CTM.config.DOM.TOAST_CONTAINER

            );

        },

        show(

            message,

            type = "info"

        ) {

            if (!this.container) {

                return;

            }

            const toast =

                document.createElement("div");

            toast.className =

                `toast toast-${type}`;

            toast.textContent = message;

            this.container.appendChild(

                toast

            );

            setTimeout(() => {

                toast.remove();

            },

            window.CTM.config.TIMING.TOAST_DURATION);

        }

    };

    /**
     * ============================================================
     * Modal
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

            if (!this.container) {

                return;

            }

            this.container.innerHTML = "";

            this.container.appendChild(

                content

            );

            this.container.hidden = false;

        },

        close() {

            if (!this.container) {

                return;

            }

            this.container.hidden = true;

            this.container.innerHTML = "";

        }

    };

    /**
     * ============================================================
     * Error Boundary
     * ============================================================
     */

    const ErrorBanner = {

        element: null,

        initialize() {

            this.element = DOM.get(

                window.CTM.config.DOM.ERROR_BOUNDARY

            );

        },

        show(message = "An unexpected error occurred.") {

            if (!this.element) {

                return;

            }

            const text = this.element.querySelector(

                "p"

            );

            if (text) {

                text.textContent = message;

            }

            this.element.hidden = false;

        },

        hide() {

            if (!this.element) {

                return;

            }

            this.element.hidden = true;

        }

    };

    /**
     * ============================================================
     * Confirmation Dialog
     * ============================================================
     */

    const Confirm = {

        async show(message) {

            return Promise.resolve(

                window.confirm(message)

            );

        }

    };

    /**
     * ============================================================
     * Radio Cards
     * ============================================================
     */

    const RadioCards = {

        initialize(scope = document) {

            DOM.queryAll(

                ".radio-card",

                scope

            ).forEach(card => {

                const input = card.querySelector(

                    'input[type="radio"]'

                );

                if (!input) {

                    return;

                }

                input.addEventListener(

                    "change",

                    () => {

                        DOM.queryAll(

                            `input[name="${input.name}"]`,

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
     * Option Cards
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

                        const input =

                            card.querySelector(

                                "input"

                            );

                        if (!input) {

                            return;

                        }

                        input.click();

                    }

                );

            });

        }

    };

    /**
     * ============================================================
     * Questions
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

            if (button) {

                button.disabled = false;

            }

        },

        disable(button) {

            if (button) {

                button.disabled = true;

            }

        }

    };

    /**
     * ============================================================
     * AI Cards
     * ============================================================
     */

    const AICards = {

        show(rule, scope = document) {

            this.hideAll(scope);

            const card = DOM.query(

                `.ai-card[data-rule="${rule}"]`,

                scope

            );

            if (card) {

                card.hidden = false;

                card.classList.add("active");

            }

        },

        hideAll(scope = document) {

            DOM.queryAll(

                ".ai-card",

                scope

            ).forEach(card => {

                card.hidden = true;

                card.classList.remove("active");

            });

        }

    };

    /**
     * ============================================================
     * Reflection Cards
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
     * Summary Cards
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
     * Framework Cards
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
     * Roadmap
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
     * Offer Cards
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
     * Financial Wheel
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

        render(values = {}) {

            if (!this.element) {

                return;

            }

            this.element.dataset.rendered = "true";

            this.element.dataset.values =

                JSON.stringify(values);

        },

        clear() {

            if (!this.element) {

                return;

            }

            this.element.removeAttribute(

                "data-rendered"

            );

            this.element.removeAttribute(

                "data-values"

            );

        }

    };

    /**
     * ============================================================
     * Component Lifecycle
     * ============================================================
     */

    const Lifecycle = {

        initializeScene(scope = document) {

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

        destroyScene() {

            AICards.hideAll();

            FinancialWheel.clear();

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

            Toast.initialize();

            Modal.initialize();

            ErrorBanner.initialize();

        },

        refresh(scope = document) {

            Lifecycle.initializeScene(scope);

        },

        destroy() {

            Lifecycle.destroyScene();

        }

    };

    /**
     * ============================================================
     * Register Component Engine
     * ============================================================
     */

    const ComponentAPI = Object.freeze({

        initialize:
            Components.initialize.bind(Components),

        refresh:
            Components.refresh.bind(Components),

        destroy:
            Components.destroy.bind(Components),

        ProgressBar:
            ProgressBar,

        ProgressText:
            ProgressText,

        Loading:
            Loading,

        Thinking:
            Thinking,

        Toast:
            Toast,

        Modal:
            Modal,

        ErrorBanner:
            ErrorBanner,

        Confirm:
            Confirm,

        RadioCards:
            RadioCards,

        OptionCards:
            OptionCards,

        Questions:
            Questions,

        CTAButtons:
            CTAButtons,

        AICards:
            AICards,

        ReflectionCards:
            ReflectionCards,

        SummaryCards:
            SummaryCards,

        FrameworkCards:
            FrameworkCards,

        Roadmap:
            Roadmap,

        OfferCards:
            OfferCards,

        FinancialWheel:
            FinancialWheel

    });

    Object.defineProperty(

        window.CTM,

        "components",

        {

            value: ComponentAPI,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();


