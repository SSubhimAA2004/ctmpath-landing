
/*!
 * ============================================================
 * CTM PATH™ Guided Journey
 * Shared Services
 * File        : js/services.js
 * Version     : 1.0.0
 * Batch       : 1 of 4
 * Status      : Production
 * ============================================================
 */

(() => {

    "use strict";

    if (!window.CTM) {
        throw new Error("CTM namespace not found.");
    }

    if (!window.CTM.config) {
        throw new Error("CTM configuration not initialized.");
    }

    if (!window.CTM.store) {
        throw new Error("CTM store not initialized.");
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

            return [...scope.querySelectorAll(selector)];

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

                behavior: smooth ? "smooth" : "auto"

            });

        }

    };

    /**
     * ============================================================
     * Class Service
     * ============================================================
     */

    const Classes = {

        add(element, className) {

            if (!element) return;

            element.classList.add(className);

        },

        remove(element, className) {

            if (!element) return;

            element.classList.remove(className);

        },

        toggle(element, className, force = null) {

            if (!element) return;

            if (force === null) {

                element.classList.toggle(className);

                return;

            }

            element.classList.toggle(

                className,

                force

            );

        },

        has(element, className) {

            if (!element) return false;

            return element.classList.contains(className);

        }

    };

    /**
     * ============================================================
     * Attribute Service
     * ============================================================
     */

    const Attributes = {

        get(element, name) {

            if (!element) return null;

            return element.getAttribute(name);

        },

        set(element, name, value) {

            if (!element) return;

            element.setAttribute(

                name,

                value

            );

        },

        remove(element, name) {

            if (!element) return;

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

            if (!element) return;

            element.hidden = false;

        },

        hide(element) {

            if (!element) return;

            element.hidden = true;

        }

    };

    /**
     * ============================================================
     * Utility Service
     * ============================================================
     */

    const Utils = {

        delay(ms) {

            return new Promise(resolve => {

                setTimeout(

                    resolve,

                    ms

                );

            });

        },

        clamp(value, min, max) {

            return Math.min(

                Math.max(value, min),

                max

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
     * Register Services
     * ============================================================
     */

    window.CTM.services = {

        DOM,

        Scroll,

        Classes,

        Attributes,

        Visibility,

        Utils

    };

})();

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

            } catch (error) {

                console.error(error);

                return false;

            }

        },

        load(key, fallback = null) {

            try {

                const value = localStorage.getItem(key);

                return value === null
                    ? fallback
                    : JSON.parse(value);

            } catch (error) {

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

            return window.CTM.store.get("visitor").language;

        },

        set(language) {

            const available =

                window.CTM.config.LANGUAGE.AVAILABLE;

            if (!available.includes(language)) {

                return;

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

        },

        restore() {

            const language = Storage.load(

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

        on(target, event, callback, options = false) {

            if (!target) return;

            target.addEventListener(

                event,

                callback,

                options

            );

        },

        off(target, event, callback) {

            if (!target) return;

            target.removeEventListener(

                event,

                callback

            );

        },

        emit(target, name, detail = {}) {

            if (!target) return;

            target.dispatchEvent(

                new CustomEvent(name, {

                    detail

                })

            );

        }

    };

    /**
     * ============================================================
     * Data Binding Service
     * ============================================================
     */

    const Binding = {

        find(key, scope = document) {

            return DOM.queryAll(

                `[data-bind="${key}"]`,

                scope

            );

        },

        set(key, value, scope = document) {

            this.find(

                key,

                scope

            ).forEach(element => {

                element.textContent = value;

            });

        }

    };

    /**
     * ============================================================
     * Dataset Service
     * ============================================================
     */

    const Dataset = {

        get(element, key) {

            if (!element) return null;

            return element.dataset[key];

        },

        set(element, key, value) {

            if (!element) return;

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

            if (value === null || value === undefined) {

                return false;

            }

            if (typeof value === "string") {

                return value.trim().length > 0;

            }

            return true;

        },

        number(value) {

            return !Number.isNaN(Number(value));

        },

        range(value, min, max) {

            const number = Number(value);

            return number >= min && number <= max;

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

            if (!form) return;

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

        }

    };

    /**
     * ============================================================
     * Performance Service
     * ============================================================
     */

    const Performance = {

        mark(name) {

            performance.mark(name);

        },

        measure(name, start, end) {

            try {

                performance.measure(

                    name,

                    start,

                    end

                );

            }

            catch (error) {

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

        }

    };

    /**
     * ============================================================
     * Logger Service
     * ============================================================
     */

    const Logger = {

        info(...args) {

            if (!window.CTM.config.APP.DEBUG) return;

            console.info("[CTM]", ...args);

        },

        warn(...args) {

            console.warn("[CTM]", ...args);

        },

        error(...args) {

            console.error("[CTM]", ...args);

        }

    };

    /**
     * ============================================================
     * Error Service
     * ============================================================
     */

    const Errors = {

        handle(error, context = "") {

            Logger.error(context, error);

            return false;

        }

    };

    /**
     * ============================================================
     * Function Service
     * ============================================================
     */

    const Functions = {

        debounce(callback, delay = 300) {

            let timer;

            return (...args) => {

                clearTimeout(timer);

                timer = setTimeout(() => {

                    callback(...args);

                }, delay);

            };

        },

        throttle(callback, delay = 300) {

            let waiting = false;

            return (...args) => {

                if (waiting) return;

                waiting = true;

                callback(...args);

                setTimeout(() => {

                    waiting = false;

                }, delay);

            };

        }

    };

