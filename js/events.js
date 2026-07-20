
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/events.js
 * Responsibility:
 * Centralized DOM event registration and delegation.
 *
 * Engineering Status:
 * Production Build
 * Architecture: FROZEN
 * ==========================================================
 */

(() => {
    "use strict";

    /**
     * --------------------------------------------------------
     * Registered Event Store
     * --------------------------------------------------------
     */

    const listeners = [];

    /**
     * --------------------------------------------------------
     * Register Event Listener
     * --------------------------------------------------------
     */

    function on(target, type, handler, options = false) {

        if (!(target instanceof EventTarget)) {
            throw new Error("Invalid event target.");
        }

        target.addEventListener(type, handler, options);

        listeners.push({
            target,
            type,
            handler,
            options
        });

        return handler;

    }

    /**
     * --------------------------------------------------------
     * Remove Event Listener
     * --------------------------------------------------------
     */

    function off(target, type, handler, options = false) {

        if (!(target instanceof EventTarget)) {
            return;
        }

        target.removeEventListener(type, handler, options);

    }

    /**
     * --------------------------------------------------------
     * Event Delegation
     * --------------------------------------------------------
     */

    function delegate(parent, type, selector, callback) {

        const handler = event => {

            const element = event.target.closest(selector);

            if (!element || !parent.contains(element)) {
                return;
            }

            callback(event, element);

        };

        on(parent, type, handler);

        return handler;

    }

    /**
     * --------------------------------------------------------
     * One-Time Event
     * --------------------------------------------------------
     */

    function once(target, type, handler) {

        const wrapper = event => {

            handler(event);

            off(target, type, wrapper);

        };

        on(target, type, wrapper);

        return wrapper;

    }

    /**
     * --------------------------------------------------------
     * Remove All Registered Events
     * --------------------------------------------------------
     */

    function clear() {

        listeners.forEach(listener => {

            listener.target.removeEventListener(
                listener.type,
                listener.handler,
                listener.options
            );

        });

        listeners.length = 0;

    }

    /**
     * --------------------------------------------------------
     * Dispatch Custom Event
     * --------------------------------------------------------
     */

    function emit(name, detail = {}) {

        document.dispatchEvent(
            new CustomEvent(name, {
                detail
            })
        );

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMEvents = Object.freeze({

        on,

        off,

        once,

        delegate,

        clear,

        emit

    });

})();
