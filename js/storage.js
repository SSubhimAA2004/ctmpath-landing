
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : storage.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class Storage {

    #initialized = false;

    #storageKey = '';

    #stateChangedHandler = null;

    /* ======================================================
       Initialize
       ====================================================== */

    init() {

        if (this.#initialized) {
            return;
        }

        this.#storageKey =
            `${CTM.Config.APP.NAME}_${CTM.Config.APP.VERSION}`;

        if (!this.isAvailable()) {

            CTM.Logger.warn(
                'Local Storage is unavailable.'
            );

            return;
        }

        this.#stateChangedHandler = () => {

            if (CTM.State.isDirty()) {
                this.save();
            }

        };

        CTM.Events.on(
            CTM.Config.EVENTS.STATE_CHANGED,
            this.#stateChangedHandler
        );

        this.load();

        this.#initialized = true;

        CTM.Logger.info(
            'Storage initialized.'
        );

    }

    /* ======================================================
       Availability
       ====================================================== */

    isAvailable() {

        try {

            const key = '__ctm_test__';

            localStorage.setItem(key, key);

            localStorage.removeItem(key);

            return true;

        }
        catch {

            return false;

        }

    }

    /* ======================================================
       Save
       ====================================================== */

    save() {

        if (!this.isAvailable()) {
            return false;
        }

        try {

            const payload = {

                version: CTM.Config.APP.VERSION,

                savedAt: new Date().toISOString(),

                state: CTM.State.snapshot()

            };

            localStorage.setItem(

                this.#storageKey,

                JSON.stringify(payload)

            );

            CTM.State.updateSession({

                lastSaved: payload.savedAt

            });

            CTM.State.clearDirty();

            CTM.Logger.debug(

                'Application state saved.'

            );

            return true;

        }
        catch (error) {

            CTM.Logger.error(

                'Storage save failed.',

                error

            );

            return false;

        }

    }

    /* ======================================================
       Load
       ====================================================== */

    load() {

        if (!this.exists()) {
            return false;
        }

        try {

            const raw = localStorage.getItem(

                this.#storageKey

            );

            const payload = JSON.parse(raw);

            if (

                payload.version !==

                CTM.Config.APP.VERSION

            ) {

                CTM.Logger.warn(

                    'Saved version mismatch.'

                );

                return false;

            }

            Object.entries(payload.state)

                .forEach(

                    ([section, value]) => {

                        CTM.State.set(

                            section,

                            value

                        );

                    }

                );

            CTM.State.clearDirty();

            CTM.Logger.info(

                'Application state restored.'

            );

            return true;

        }
        catch (error) {

            CTM.Logger.error(

                'Storage load failed.',

                error

            );

            return false;

        }

    }

    /* ======================================================
       Exists
       ====================================================== */

    exists() {

        return (

            localStorage.getItem(

                this.#storageKey

            ) !== null

        );

    }

    /* ======================================================
       Clear
       ====================================================== */

    clear() {

        if (!this.isAvailable()) {
            return;
        }

        localStorage.removeItem(

            this.#storageKey

        );

        CTM.Logger.info(

            'Saved session cleared.'

        );

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        if (this.#stateChangedHandler) {

            CTM.Events.off(

                CTM.Config.EVENTS.STATE_CHANGED,

                this.#stateChangedHandler

            );

        }

        this.#stateChangedHandler = null;

        this.#initialized = false;

    }

}

CTM.Storage = Object.freeze(

    new Storage()

);

