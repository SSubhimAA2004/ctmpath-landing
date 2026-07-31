
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : events.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class Events {

    #initialized = false;

    #events = new Map();

    init() {

        if (this.#initialized) {

            return;

        }

        this.#initialized = true;

        CTM.Logger.info(

            "Event Bus initialized."

        );

    }

    /* ======================================================
       Register Listener
       ====================================================== */

    on(eventName, callback) {

        if (!this.#events.has(eventName)) {

            this.#events.set(

                eventName,

                []

            );

        }

        this.#events.get(eventName)

            .push(callback);

    }

    /* ======================================================
       Register Once
       ====================================================== */

    once(eventName, callback) {

        const wrapper = (...args) => {

            callback(...args);

            this.off(

                eventName,

                wrapper

            );

        };

        this.on(

            eventName,

            wrapper

        );

    }

    /* ======================================================
       Remove Listener
       ====================================================== */

    off(eventName, callback) {

        if (!this.#events.has(eventName)) {

            return;

        }

        const listeners =

            this.#events

                .get(eventName)

                .filter(

                    listener =>

                        listener !== callback

                );

        this.#events.set(

            eventName,

            listeners

        );

    }

    /* ======================================================
       Emit Event
       ====================================================== */

    emit(eventName, payload = null) {

        if (!this.#events.has(eventName)) {

            return;

        }

        this.#events

            .get(eventName)

            .forEach(listener => {

                try {

                    listener(payload);

                }

                catch (error) {

                    CTM.Logger.error(

                        error

                    );

                }

            });

    }

    /* ======================================================
       Clear Events
       ====================================================== */

    clear() {

        this.#events.clear();

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.clear();

        this.#initialized = false;

    }

}

CTM.Events = Object.freeze(

    new Events()

);

