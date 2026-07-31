
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : ui.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class UI {

    #initialized = false;

    init() {

        if (this.#initialized) {
            return;
        }

        this.#initialized = true;

        CTM.Logger.info(
            'UI initialized.'
        );

    }

    /* ======================================================
       Loader
       ====================================================== */

    showLoader() {

        document.body.classList.add(
            'loading'
        );

    }

    hideLoader() {

        document.body.classList.remove(
            'loading'
        );

    }

    /* ======================================================
       Toast
       ====================================================== */

    showToast(message) {

        CTM.Events.emit(

            CTM.Config.EVENTS.TOAST_SHOW,

            {

                message

            }

        );

    }

    hideToast() {

        CTM.Events.emit(

            CTM.Config.EVENTS.TOAST_HIDE

        );

    }

    /* ======================================================
       Modal
       ====================================================== */

    showModal(id) {

        const modal = document.getElementById(id);

        if (!modal) {
            return;
        }

        modal.classList.add('active');

    }

    hideModal(id) {

        const modal = document.getElementById(id);

        if (!modal) {
            return;
        }

        modal.classList.remove('active');

    }

    /* ======================================================
       Form Values
       ====================================================== */

    getValue(id) {

        const element = document.getElementById(id);

        return element
            ? element.value
            : '';

    }

    setValue(id, value) {

        const element = document.getElementById(id);

        if (element) {

            element.value = value;

        }

    }

    /* ======================================================
       Enable / Disable
       ====================================================== */

    enable(id) {

        const element = document.getElementById(id);

        if (element) {

            element.disabled = false;

        }

    }

    disable(id) {

        const element = document.getElementById(id);

        if (element) {

            element.disabled = true;

        }

    }

    /* ======================================================
       Scroll
       ====================================================== */

    scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#initialized = false;

    }

}

CTM.UI = Object.freeze(

    new UI()

);

