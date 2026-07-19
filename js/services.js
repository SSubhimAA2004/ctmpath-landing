
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Shared Services
 * File        : js/services.js
 * Version     : 2.0.0
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (

        !window.CTM ||

        !window.CTM.config ||

        !window.CTM.store

    ) {

        throw new Error(

            "CTM core modules not initialized."

        );

    }

    /**
     * ============================================================
     * DOM Service
     * ============================================================
     */

    const DOM = {

        get(id) {

            return document.getElementById(id);

        },

        query(selector, scope = document) {

            return scope.querySelector(selector);

        },

        queryAll(selector, scope = document) {

            return Array.from(

                scope.querySelectorAll(selector)

            );

        }

    };

    /**
     * ============================================================
     * Scroll Service
     * ============================================================
     */

    const Scroll = {

        top(smooth = true) {

            window.scrollTo({

                top: 0,

                behavior:

                    smooth ? "smooth" : "auto"

            });

        }

    };

    /**
     * ============================================================
     * CSS Class Service
     * ============================================================
     */

    const Classes = {

        add(element, className) {

            if (!element) {

                return;

            }

            element.classList.add(className);

        },

        remove(element, className) {

            if (!element) {

                return;

            }

            element.classList.remove(className);

        },

        toggle(

            element,

            className,

            force

        ) {

            if (!element) {

                return;

            }

            if (

                typeof force === "boolean"

            ) {

                element.classList.toggle(

                    className,

                    force

                );

                return;

            }

            element.classList.toggle(

                className

            );

        },

        has(element, className) {

            if (!element) {

                return false;

            }

            return element.classList.contains(

                className

            );

        }

    };

    /**
     * ============================================================
     * Attribute Service
     * ============================================================
     */

    const Attributes = {

        get(element, name) {

            return element

                ? element.getAttribute(name)

                : null;

        },

        set(

            element,

            name,

            value

        ) {

            if (!element) {

                return;

            }

            element.setAttribute(

                name,

                value

            );

        },

        remove(element, name) {

            if (!element) {

                return;

            }

            element.removeAttribute(name);

        }

    };

    /**
     * ============================================================
     * Visibility Service
     * ============================================================
     */

    const Visibility = {

        show(element) {

            if (!element) {

                return;

            }

            element.hidden = false;

        },

        hide(element) {

            if (!element) {

                return;

            }

            element.hidden = true;

        },

        toggle(element) {

            if (!element) {

                return;

            }

            element.hidden = !element.hidden;

        }

    };

    /**
     * ============================================================
     * Utility Service
     * ============================================================
     */

    const Utils = {

        delay(milliseconds) {

            return new Promise(resolve => {

                setTimeout(

                    resolve,

                    milliseconds

                );

            });

        },

        clamp(

            value,

            minimum,

            maximum

        ) {

            return Math.min(

                Math.max(value, minimum),

                maximum

            );

        },

        uuid() {

            return crypto.randomUUID();

        },

        now() {

            return new Date().toISOString();

        }

    };

    /**
     * ============================================================
     * Storage Service
     * ============================================================
     */

    const Storage = {

        save(key, value) {

            try {

                localStorage.setItem(

                    key,

                    JSON.stringify(value)

                );

                return true;

            }

            catch (error) {

                console.error(error);

                return false;

            }

        },

        load(

            key,

            fallback = null

        ) {

            try {

                const value =

                    localStorage.getItem(key);

                return value === null

                    ? fallback

                    : JSON.parse(value);

            }

            catch (error) {

                console.error(error);

                return fallback;

            }

        },

        remove(key) {

            localStorage.removeItem(key);

        },

        clear() {

            localStorage.clear();

        }

    };

    /**
     * ============================================================
     * Language Service
     * ============================================================
     */

    const Language = {

        current() {

            return window.CTM.store.get(

                "visitor"

            ).language;

        },

        set(language) {

            const available =

                window.CTM.config.LANGUAGE.AVAILABLE;

            if (

                !available.includes(language)

            ) {

                return false;

            }

            window.CTM.store.update(

                "visitor",

                "language",

                language

            );

            Storage.save(

                window.CTM.config.STORAGE.LANGUAGE,

                language

            );

            return true;

        },

        restore() {

            const language =

                Storage.load(

                    window.CTM.config.STORAGE.LANGUAGE,

                    window.CTM.config.LANGUAGE.DEFAULT

                );

            this.set(language);

        }

    };

    /**
     * ============================================================
     * Event Service
     * ============================================================
     */

    const Events = {

        on(

            target,

            event,

            callback,

            options = false

        ) {

            if (!target) {

                return;

            }

            target.addEventListener(

                event,

                callback,

                options

            );

        },

        off(

            target,

            event,

            callback

        ) {

            if (!target) {

                return;

            }

            target.removeEventListener(

                event,

                callback

            );

        },

        emit(

            target,

            name,

            detail = {}

        ) {

            if (!target) {

                return;

            }

            target.dispatchEvent(

                new CustomEvent(

                    name,

                    {

                        detail

                    }

                )

            );

        }

    };

    /**
     * ============================================================
     * Data Binding Service
     * ============================================================
     */

    const Binding = {

        find(

            key,

            scope = document

        ) {

            return DOM.queryAll(

                `[data-bind="${key}"]`,

                scope

            );

        },

        set(

            key,

            value,

            scope = document

        ) {

            this.find(

                key,

                scope

            ).forEach(element => {

                element.textContent =

                    value ?? "";

            });

        }

    };

    /**
     * ============================================================
     * Dataset Service
     * ============================================================
     */

    const Dataset = {

        get(

            element,

            key

        ) {

            return element

                ? element.dataset[key]

                : null;

        },

        set(

            element,

            key,

            value

        ) {

            if (!element) {

                return;

            }

            element.dataset[key] = value;

        }

    };

    /**
     * ============================================================
     * Validation Service
     * ============================================================
     */

    const Validation = {

        required(value) {

            if (

                value === null ||

                value === undefined

            ) {

                return false;

            }

            if (

                typeof value === "string"

            ) {

                return value.trim().length > 0;

            }

            return true;

        },

        number(value) {

            return !Number.isNaN(

                Number(value)

            );

        },

        range(

            value,

            minimum,

            maximum

        ) {

            const number =

                Number(value);

            return (

                number >= minimum &&

                number <= maximum

            );

        }

    };

    /**
     * ============================================================
     * Form Service
     * ============================================================
     */

    const Forms = {

        serialize(form) {

            const data = {};

            if (!form) {

                return data;

            }

            const formData = new FormData(form);

            for (const [key, value] of formData.entries()) {

                data[key] = value;

            }

            return data;

        },

        reset(form) {

            if (!form) {

                return;

            }

            form.reset();

        }

    };

    /**
     * ============================================================
     * Query String Service
     * ============================================================
     */

    const Query = {

        get(name) {

            return new URLSearchParams(

                window.location.search

            ).get(name);

        },

        has(name) {

            return new URLSearchParams(

                window.location.search

            ).has(name);

        },

        set(name, value) {

            const url = new URL(

                window.location.href

            );

            url.searchParams.set(

                name,

                value

            );

            window.history.replaceState(

                {},

                "",

                url

            );

        }

    };

    /**
     * ============================================================
     * Performance Service
     * ============================================================
     */

    const Performance = {

        mark(name) {

            if (

                window.performance?.mark

            ) {

                performance.mark(name);

            }

        },

        measure(name, start, end) {

            if (

                !window.performance?.measure

            ) {

                return;

            }

            try {

                performance.measure(

                    name,

                    start,

                    end

                );

            }

            catch {

                /* Ignore */

            }

        }

    };

    /**
     * ============================================================
     * Browser Service
     * ============================================================
     */

    const Browser = {

        online() {

            return navigator.onLine;

        },

        touch() {

            return (

                "ontouchstart" in window ||

                navigator.maxTouchPoints > 0

            );

        },

        mobile() {

            return window.innerWidth < 768;

        },

        desktop() {

            return !this.mobile();

        }

    };

    /**
     * ============================================================
     * Logger Service
     * ============================================================
     */

    const Logger = {

        info(...args) {

            if (

                !window.CTM.config.APP.DEBUG

            ) {

                return;

            }

            console.info(

                "[CTM]",

                ...args

            );

        },

        warn(...args) {

            console.warn(

                "[CTM]",

                ...args

            );

        },

        error(...args) {

            console.error(

                "[CTM]",

                ...args

            );

        }

    };

    /**
     * ============================================================
     * Error Service
     * ============================================================
     */

    const Errors = {

        handle(

            error,

            context = ""

        ) {

            Logger.error(

                context,

                error

            );

            return false;

        }

    };

    /**
     * ============================================================
     * Function Utilities
     * ============================================================
     */

    const Functions = {

        debounce(

            callback,

            delay = 300

        ) {

            let timer = null;

            return (...args) => {

                clearTimeout(timer);

                timer = setTimeout(

                    () => callback(...args),

                    delay

                );

            };

        },

        throttle(

            callback,

            delay = 300

        ) {

            let waiting = false;

            return (...args) => {

                if (waiting) {

                    return;

                }

                waiting = true;

                callback(...args);

                setTimeout(

                    () => {

                        waiting = false;

                    },

                    delay

                );

            };

        }

    };

    /**
     * ============================================================
     * Services Registry
     * ============================================================
     */

    const Services = Object.freeze({

        DOM,

        Scroll,

        Classes,

        Attributes,

        Visibility,

        Utils,

        Storage,

        Language,

        Events,

        Binding,

        Dataset,

        Validation,

        Forms,

        Query,

        Performance,

        Browser,

        Logger,

        Errors,

        Functions

    });

    /**
     * ============================================================
     * Register Services
     * ============================================================
     */

    Object.defineProperty(

        window.CTM,

        "services",

        {

            value: Services,

            writable: false,

            configurable: false,

            enumerable: true

        }

    );

})();

